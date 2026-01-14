$s = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -Uri 'http://127.0.0.1:8000/api/csrf/' -WebSession $s -UseBasicParsing
$login = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/login/' -Method Post -Body (ConvertTo-Json @{username='machad0'; password='1234'}) -ContentType 'application/json' -WebSession $s -UseBasicParsing
Write-Output "Login response:"
$login | ConvertTo-Json -Depth 4 | Write-Output
$hab = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/habits/' -Method Get -WebSession $s -UseBasicParsing
Write-Output "Habits response:" 
$hab | ConvertTo-Json -Depth 4 | Write-Output
Write-Output "Cookies:"
$s.Cookies.GetCookies('http://127.0.0.1') | ForEach-Object { $_.Name + '=' + $_.Value }
