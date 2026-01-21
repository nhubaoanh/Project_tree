@echo off
echo ========================================
echo   FREE UP MEMORY
echo ========================================
echo.
echo Current RAM usage:
wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value
echo.
echo ========================================
echo   CLOSING UNNECESSARY APPS
echo ========================================
echo.

REM Close common memory-hungry apps
echo Closing Chrome...
taskkill /F /IM chrome.exe 2>nul
if %errorlevel% equ 0 (echo   ✓ Chrome closed) else (echo   - Chrome not running)

echo Closing Edge...
taskkill /F /IM msedge.exe 2>nul
if %errorlevel% equ 0 (echo   ✓ Edge closed) else (echo   - Edge not running)

echo Closing Docker...
taskkill /F /IM "Docker Desktop.exe" 2>nul
if %errorlevel% equ 0 (echo   ✓ Docker closed) else (echo   - Docker not running)

echo Closing Spotify...
taskkill /F /IM Spotify.exe 2>nul
if %errorlevel% equ 0 (echo   ✓ Spotify closed) else (echo   - Spotify not running)

echo Closing Discord...
taskkill /F /IM Discord.exe 2>nul
if %errorlevel% equ 0 (echo   ✓ Discord closed) else (echo   - Discord not running)

echo Closing Slack...
taskkill /F /IM slack.exe 2>nul
if %errorlevel% equ 0 (echo   ✓ Slack closed) else (echo   - Slack not running)

echo.
echo ========================================
echo   CLEARING MEMORY CACHE
echo ========================================
echo.

REM Clear standby memory (requires admin)
echo Clearing standby memory...
powershell -Command "Clear-RecycleBin -Force -ErrorAction SilentlyContinue"

echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo RAM after cleanup:
wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value
echo.
echo Press any key to check system...
pause >nul

python check_system.py

echo.
echo ========================================
echo If Available RAM > 3GB, you can start AI service:
echo   python main.py
echo ========================================
pause
