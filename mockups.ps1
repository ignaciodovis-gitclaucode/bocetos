# ==========================================================
#  Genera imágenes de mockup (compu + celular) de un boceto.
#  Uso (desde esta carpeta, en PowerShell):
#     .\mockups.ps1 farmaciakogel
#  Crea la carpeta  farmaciakogel\mockups\  con, para cada diseño:
#     <diseño>-combo.png   compu + celular (1600x1000)  -> WhatsApp, propuesta, PDF
#     <diseño>-post.png    celular vertical (1080x1350) -> Instagram / historias
# ==========================================================
param(
  [Parameter(Mandatory = $true)][string]$Carpeta,
  [string[]]$Disenos = @("editorial", "catalogo", "minimal")
)
$ErrorActionPreference = "Stop"
$raiz = $PSScriptRoot
if (-not (Test-Path (Join-Path $raiz $Carpeta))) { throw "No existe la carpeta '$Carpeta'" }

$nav = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $nav) { throw "No encontré Edge ni Chrome instalados." }

$salida = Join-Path $raiz "$Carpeta\mockups"
New-Item -ItemType Directory -Force $salida | Out-Null
$perfil = Join-Path $env:TEMP "bocetos-mockups-perfil"
if (Test-Path $perfil) { Remove-Item $perfil -Recurse -Force -ErrorAction SilentlyContinue }   # sin caché vieja
$base = ([Uri](Join-Path $raiz "_base\mockup.html")).AbsoluteUri

$formatos = @(@{ f = "combo"; w = 1600; h = 1000 }, @{ f = "post"; w = 1080; h = 1350 })
foreach ($d in $Disenos) {
  if (-not (Test-Path (Join-Path $raiz "$Carpeta\$d\index.html"))) { continue }
  foreach ($fm in $formatos) {
    $png = Join-Path $salida "$d-$($fm.f).png"
    $url = "$($base)?c=$Carpeta&d=$d&f=$($fm.f)"
    if (Test-Path $png) { Remove-Item $png }
    $argumentos = @("--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
      "`"--user-data-dir=$perfil`"", "--force-device-scale-factor=1", "--window-size=$($fm.w),$($fm.h)",
      "--virtual-time-budget=15000", "`"--screenshot=$png`"", "`"$url`"")
    Start-Process -FilePath $nav -ArgumentList $argumentos -Wait -WindowStyle Hidden `
      -RedirectStandardError (Join-Path $env:TEMP "bocetos-mockups.log")
    if (Test-Path $png) { Write-Host "  ok  $Carpeta\mockups\$d-$($fm.f).png" -ForegroundColor Green }
    else { Write-Host "  error  $d-$($fm.f)" -ForegroundColor Red }
  }
}
Write-Host ""
Write-Host "Listo: imágenes en .\$Carpeta\mockups" -ForegroundColor Green
