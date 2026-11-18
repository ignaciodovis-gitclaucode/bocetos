# ==========================================================
#  Arma un boceto casi automático a partir de la tienda Tiendanube
#  actual de un prospecto: productos, fotos, descripciones, categorías
#  y captura para el "antes y después". Después generá los mockups.
#  Uso (desde esta carpeta, en PowerShell):
#     .\importar.ps1 https://sutienda.mitiendanube.com carpeta-cliente
#  Después solo falta: logo, colores (marca.css) y revisar textos.
# ==========================================================
param(
  [Parameter(Mandatory = $true)][string]$Url,
  [Parameter(Mandatory = $true)][string]$Carpeta
)
$ErrorActionPreference = "Stop"
$raiz = $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Falta Node.js (https://nodejs.org)" }

if (-not (Test-Path (Join-Path $raiz $Carpeta))) { & (Join-Path $raiz "nuevo-boceto.ps1") $Carpeta | Out-Null }

node (Join-Path $raiz "_base\importar.js") $Url $Carpeta
if ($LASTEXITCODE -ne 0) { throw "No se pudo importar la tienda." }

# regenera páginas y la vista previa con el nombre real
& (Join-Path $raiz "nuevo-boceto.ps1") $Carpeta -SoloPaginas | Out-Null
Write-Host ""
Write-Host "Siguiente:" -ForegroundColor Green
Write-Host "  1) Poné el logo en .\$Carpeta\img\logo.png y en datos.js: logo: `"img/logo.png`""
Write-Host "  2) Cambiá los colores en .\$Carpeta\marca.css"
Write-Host "  3) Revisá textos de portada, WhatsApp e Instagram en .\$Carpeta\datos.js"
Write-Host "  4) .\nuevo-boceto.ps1 $Carpeta -SoloPaginas   (actualiza la vista previa)"
Write-Host "  5) .\mockups.ps1 $Carpeta                       (imágenes para mandar)"
