@echo off
for /r %%a in (*.txt) do (
     for /f "tokens=2 delims=[]" %%b in ("%%~na") do ren "%%a" [%%b].txt
     )
pause
