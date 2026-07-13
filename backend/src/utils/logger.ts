// ─────────────────────────────────────────────
//  Winston logger configuration
//  Provides structured logging with PII stripping
//  in production mode and separate file transports.
// ─────────────────────────────────────────────
import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.resolve(__dirname, '../../logs');

/**
 * Strip common PII patterns from log messages.
 * Applied automatically in production to prevent
 * accidental PHI/PII leakage into log files.
 */
const piiStripFormat = winston.format((infoObj) => {
  const info = infoObj as any;
  if (typeof info.message === 'string') {
    // Email addresses
    info.message = info.message.replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '[EMAIL_REDACTED]',
    );
    // Phone numbers (Indian +91 and general patterns)
    info.message = info.message.replace(
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g,
      '[PHONE_REDACTED]',
    );
    // Aadhaar numbers (12 digits, optionally spaced)
    info.message = info.message.replace(
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
      '[AADHAAR_REDACTED]',
    );
  }
  return info;
});

/**
 * Shared log format: timestamp + level + message + optional metadata.
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  ...(process.env.NODE_ENV === 'production' ? [piiStripFormat()] : []),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level.toUpperCase()}] ${stack || message}${metaStr}`;
  }),
);

/**
 * Console format: colorized for development readability.
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  }),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Console — always active
    new winston.transports.Console({
      format: consoleFormat,
    }),
    // Error log file — errors only
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error',
      maxsize: 5_242_880, // 5MB
      maxFiles: 5,
    }),
    // Combined log file — all levels
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'combined.log'),
      maxsize: 10_485_760, // 10MB
      maxFiles: 5,
    }),
  ],
  // Don't exit on unhandled errors
  exitOnError: false,
});

export default logger;
