@echo off
echo ==========================================
echo   Octopus Blog Robot - Daily Runner
echo ==========================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python neni nainstalovan. Prosim nainstalujte Python z python.org.
    pause
    exit /b
)

:: Check for .env
if not exist .env (
    echo [WARNING] Soubor .env neexistuje. Vytvarim ho z .env.example...
    copy .env.example .env
    echo [IMPORTANT] Prosim vlozte svuj OPENAI_API_KEY do souboru .env !
)

:: Install requirements
echo [1/2] Instaluji potrebne knihovny...
pip install -r scripts/requirements.txt --quiet

:: Run the script
echo [2/2] Spoustim Blog Robota...
python scripts/blog_robot.py

echo.
echo ==========================================
echo   Hotovo! Zmacknete libovolnou klavesu.
echo ==========================================
pause
