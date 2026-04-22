@echo off
cd /d "c:\Users\pleva\OneDrive\Desktop\Antigravity\Octopus main page"
echo [%date% %time%] Spouštím Blog Robota... >> scripts\blog_log.txt
py scripts\blog_robot.py >> scripts\blog_log.txt 2>&1
echo [%date% %time%] Hotovo. >> scripts\blog_log.txt
