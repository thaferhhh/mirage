@echo off
title Mirage Travel - Local Server Starter
echo ===================================================
echo   Mirage Travel & Tourism - Digital Architecture
echo ===================================================
echo.

:: Check for node_modules
if not exist "node_modules\" (
    echo [!] node_modules not found. Installing dependencies...
    call npm install
)

:: Ensure Prisma Client is generated
echo [!] Ensuring Prisma Client is generated...
call npx prisma generate

:: Ask if user wants to seed the database (optional)
set /p seed="Do you want to reset/seed the database? (y/n): "
if /I "%seed%"=="y" (
    echo [!] Seeding database...
    call npx prisma db execute --file prisma/seed_data.sql
    call npx prisma db execute --file prisma/seed_data_2.sql
)

echo.
echo [!] Starting Mirage Server (Webpack Mode for stability)...
echo [!] Access your site at: http://localhost:3000
echo.

:: Start the server with webpack to avoid Turbopack engine issues
call npx next dev --webpack

pause
