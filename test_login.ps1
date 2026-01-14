$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -Uri 'http://127.0.0.1:8000/api/csrf/' -WebSession $session
$response = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/login/' -Method Post -Body (ConvertTo-Json @{username='teste1'; password='teste1'}) -ContentType 'application/json' -WebSession $session
$response | ConvertTo-Json -Depth 4
$session.Cookies.GetCookies('http://127.0.0.1') | ForEach-Object { $_.Name + '=' + $_.Value }
