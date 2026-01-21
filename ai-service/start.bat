@echo off
echo ========================================
echo   AI SERVICE STARTUP
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Check if dependencies are installed
echo Checking dependencies...
pip show transformers >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
    echo.
)

REM Check system
echo Checking system resources...
python check_system.py
echo.

REM Ask to continue
set /p continue="Continue to start AI service? (y/n): "
if /i not "%continue%"=="y" (
    echo Cancelled.
    pause
    exit /b
)

echo.
echo ========================================
echo   STARTING AI SERVICE
echo ========================================
echo.
echo Model: Qwen/Qwen2.5-Coder-3B-Instruct
echo Port: 7000
echo.
echo First time will take 5-10 minutes to download model.
echo Please wait...
echo.

REM Start service
python main.py

pause
