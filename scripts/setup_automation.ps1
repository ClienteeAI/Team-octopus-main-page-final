# --- CONFIGURATION ---
$TaskName = "Octopus_Blog_Robot"
$ActionTask = "c:\Users\pleva\OneDrive\Desktop\Antigravity\Octopus main page\run_daily.bat"
$WorkingDirectory = "c:\Users\pleva\OneDrive\Desktop\Antigravity\Octopus main page"

# --- CHECK IF TASK EXISTS ---
$existingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "Odebírám starou úlohu '$TaskName'..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# --- DEFINE ACTION, TRIGGER AND SETTINGS ---
Write-Host "Vytvářím automatizaci pro Octopus Blog Robota..." -ForegroundColor Cyan

$Action = New-ScheduledTaskAction -Execute $ActionTask -WorkingDirectory $WorkingDirectory
$Trigger = New-ScheduledTaskTrigger -Daily -At 9:00am

# Settings: StartWhenAvailable ensures it runs if the computer was off
$Settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -Compatibility Win8

# --- REGISTER THE TASK ---
Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger `
    -Settings $Settings `
    -Description "Automaticky generuje HR blog články pro Octopus každý den v 9:00 ráno." `
    -Force

Write-Host ""
Write-Host "====================================================" -ForegroundColor Green
Write-Host "✅ ÚSPĚCH: Automatizace byla nastavena!" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host "Robot se nyní spustí každý den v 9:00 ráno."
Write-Host "Pokud bude v tu dobu počítač vypnutý, robot se spustí hned po zapnutí."
Write-Host ""
Write-Host "Můžete zavřít toto okno."
pause
