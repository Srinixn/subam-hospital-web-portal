@echo off
echo ===================================================
echo  Demo Hospital Website - Setup and Test Script
echo ===================================================
echo.

REM 1. Install dependencies
echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed.
    pause
    exit /b %errorlevel%
)
echo.

REM 2. Setup backend .env if not exists
echo [2/4] Setting up environment files...
if not exist backend\.env (
    if exist "backend\.env copy" (
        copy "backend\.env copy" "backend\.env"
        echo Created backend\.env from template.
    ) else (
        echo PORT=4000 > backend\.env
        echo NODE_ENV=development >> backend\.env
        echo DB_HOST=localhost >> backend\.env
        echo DB_PORT=3306 >> backend\.env
        echo DB_USER=root >> backend\.env
          echo DB_PASSWORD=your_mysql_password >> backend\.env
        echo DB_NAME=demo_hospital >> backend\.env
        echo SESSION_SECRET=change-this-to-a-random-64-char-string >> backend\.env
        echo CORS_ORIGIN=http://localhost:3000,http://localhost:3001 >> backend\.env
        echo Created new backend\.env file.
    )
    echo [ACTION REQUIRED] Please verify the database credentials in backend\.env match your local MySQL configuration.
) else (
    echo backend\.env already exists.
)
echo.

REM 3. Create database, run migrations, and seed
echo [3/4] Initializing database...
echo Creating/checking database...
call npm run createdb --workspace=backend
if %errorlevel% neq 0 (
    echo [ERROR] Database creation failed. Verify your MySQL server is running and credentials in backend\.env are correct.
    pause
    exit /b %errorlevel%
)

echo Running migrations...
call npm run migrate --workspace=backend
if %errorlevel% neq 0 (
    echo [ERROR] Migrations failed.
    pause
    exit /b %errorlevel%l̥
)

echo Seeding database...
call npm run seed --workspace=backend
if %errorlevel% neq 0 (
    echo [ERROR] Seeding failed.
    pause
    exit /b %errorlevel%
)
echo.

REM 4. Ask user to start application
echo [4/4] Setup complete!
echo.
echo Admin default credentials:
echo   Email:    admin@example.com
echo   Password: Demo@2026
echo.
set /p START_APP="Do you want to start the application (Frontend, Admin, and Backend) now? (y/n): "
if /i "%START_APP%"=="y" (
    echo Starting Backend...
    start cmd /k "npm run dev:backend"
    echo Starting Frontend...
    start cmd /k "npm run dev:frontend"
    echo Starting Admin Panel...
    start cmd /k "npm run dev:admin"
    echo.
    echo All servers are starting in separate terminal windows.
    echo - Frontend: http://localhost:3000
    echo - Admin Panel: http://localhost:5173
    echo - Backend API: http://localhost:4000
) else (
    echo To start the servers later, run:
    echo   npm run dev:backend
    echo   npm run dev:frontend
    echo   npm run dev:admin
)
echo.
pause
