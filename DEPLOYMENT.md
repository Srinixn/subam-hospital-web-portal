# Subam Hospital Chatbot — Production Deployment Checklist

This document details the environment configuration, security hardening, and deployment procedures for the hospital website chatbot system.

---

## 1. Environment Variable Checklist

Ensure the following variables are set in your production `.env` file on the backend server. Do not commit `.env` files to git.

```ini
PORT=4000
NODE_ENV=production

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=subam_db_user          # Hardened, non-root user
DB_PASSWORD=SecurePasswordHere
DB_NAME=subam_hospital

# Session Secret (random 64-char string)
SESSION_SECRET=a_very_long_cryptographically_secure_random_string

# CORS (Allowed domains)
CORS_ORIGIN=https://subamhospital.com,https://admin.subamhospital.com

# Chatbot / RAG
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
EMERGENCY_PHONE=+91 90922 25481

# JWT Configuration
JWT_SECRET=another_very_long_cryptographically_secure_random_string
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Logging
LOG_LEVEL=info
```

---

## 2. Directory & Permission Hardening

For security, the upload directory must have restricted permissions, allowing the web server to read/write but preventing execution of arbitrary uploaded files.

```bash
# Create the uploads directory if not exists
mkdir -p /var/www/subam-hospital/backend/uploads/tickets

# Restrict permissions: Owner (node/app user) gets read/write/execute, others get nothing or read-only
chmod 750 /var/www/subam-hospital/backend/uploads/tickets

# Ensure the app runs under a non-root user (e.g., node)
chown -R node:node /var/www/subam-hospital
```

---

## 3. PM2 Process Manager Configuration

Using PM2 keeps the Node.js application running continuously, restarts it on crash, and logs stdout/stderr.

Create an `ecosystem.config.cjs` file in the root or backend directory:

```javascript
module.exports = {
  apps: [
    {
      name: 'subam-backend',
      script: './dist/index.js',
      instances: 'max',       // Run in cluster mode to use all CPU cores
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production'
      },
      max_memory_restart: '1G',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      time: true
    }
  ]
};
```

Command to start:
```bash
# Build the TypeScript files
npm run build --workspace=backend

# Start the server via PM2
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

---

## 4. Nginx Reverse Proxy (TLS 1.3 Setup)

Configure Nginx as a reverse proxy to handle SSL termination, rate-limiting at the network layer, and security headers.

Example Nginx server block (`/etc/nginx/sites-available/subamhospital.com`):

```nginx
# Rate limiting definitions at the zone level
limit_req_zone $binary_remote_addr zone=chat_limit_zone:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=form_limit_zone:10m rate=5r/h;

server {
    listen 80;
    listen [::]:80;
    server_name subamhospital.com www.subamhospital.com;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name subamhospital.com www.subamhospital.com;

    # SSL Certs (Auto-managed by Let's Encrypt Certbot)
    ssl_certificate /etc/letsencrypt/live/subamhospital.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/subamhospital.com/privkey.pem;

    # Hardened TLS Settings (TLS 1.3 Only, Strong Ciphers)
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com; connect-src 'self' https://api.openai.com;" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Frontend Static Build
    location / {
        root /var/www/subam-hospital/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Admin Portal Static Build
    location /admin {
        alias /var/www/subam-hospital/admin/dist;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # Backend API Proxied
    location /api {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Max upload size for attachments
        client_max_body_size 5M;
    }

    # Specifically Rate Limit the Chatbot Endpoint
    location /api/chat/message {
        limit_req zone=chat_limit_zone burst=5 nodelay;
        proxy_pass http://127.0.0.1:4000;
        # Include normal proxy headers...
    }

    # Rate Limit Form Submission
    location /api/chat/ticket {
        limit_req zone=form_limit_zone burst=2 nodelay;
        proxy_pass http://127.0.0.1:4000;
        client_max_body_size 5M;
    }
}
```

---

## 5. MySQL Hardening & Optimization

To comply with HIPAA and GDPR standards, follow these database security steps:

### A. Dedicated DB User (Least Privilege)
Never run the application using the `root` MySQL user. Create a dedicated user with permissions restricted to the specific database.

```sql
CREATE USER 'subam_db_user'@'localhost' IDENTIFIED BY 'SecurePasswordHere';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, CREATE TEMPORARY TABLES, CREATE VIEW, SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, EVENT, TRIGGER ON `subam_hospital`.* TO 'subam_db_user'@'localhost';
FLUSH PRIVILEGES;
```

### B. Encryption at Rest (Optional but Recommended)
Enable InnoDB tablespace encryption for HIPAA:
```ini
# Add to your my.cnf / my.ini file:
early-plugin-load=keyring_file.so
keyring_file_data=/var/lib/mysql-keyring/keyring
default_table_encryption=ON
```

---

## 6. SSL Certificate (Let's Encrypt)

Generate free, auto-renewing SSL certificates using Certbot:

```bash
# Install Certbot and Nginx plugin
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain SSL Certificate and automatically configure Nginx redirects
sudo certbot --nginx -d subamhospital.com -d www.subamhospital.com

# Verify auto-renewal cronjob is running
sudo systemctl status certbot.timer
```

---

## 7. Backups and Disaster Recovery

### Daily Backups
Create a cron task to perform a daily database dump, compress it, and upload it to secure, encrypted offsite storage.

Example backup script (`/opt/backup-db.sh`):
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y-%m-%d_%H%M%S)
DB_NAME="subam_hospital"

# Create a compressed dump
mysqldump -u subam_db_user -p'SecurePasswordHere' --single-transaction --quick --lock-tables=false $DB_NAME | gzip > "$BACKUP_DIR/$DB_NAME-$DATE.sql.gz"

# Keep only 30 days of local backups
find $BACKUP_DIR -type f -mtime +30 -name "*.sql.gz" -delete
```

Set up Cron:
```bash
# run daily at 2:00 AM
0 2 * * * /bin/bash /opt/backup-db.sh
```

---

## 8. Real-time Monitoring & Alerting

1. **Uptime Monitoring**: Set up a status check (e.g., UptimeRobot, Pingdom) targeting `/api/health`.
2. **Log Monitoring**: Use a log collector or check Winston combined logs regularly (`/var/www/subam-hospital/backend/logs/combined.log`).
3. **PM2 Monitoring**: Use `pm2 monit` on the server terminal to inspect CPU and Memory usage in real-time.
