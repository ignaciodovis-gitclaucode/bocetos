# ==========================================================
#  Crea un boceto nuevo para un prospecto.
#  Uso (desde esta carpeta, en PowerShell):
#     .\nuevo-boceto.ps1 nombre-carpeta "Nombre de la Marca"
#  Ej:  .\nuevo-boceto.ps1 la-esquina "La Esquina Deco"
#
#  Para regenerar solo las páginas HTML de un boceto existente
#  (por ejemplo después de mejorar la base):
#     .\nuevo-boceto.ps1 ohlala -SoloPaginas
# ==========================================================
param(
  [Parameter(Mandatory = $true)][string]$Carpeta,
  [string]$Marca = "",
  [switch]$SoloPaginas
)
$ErrorActionPreference = "Stop"
$raiz = $PSScriptRoot
$dest = Join-Path $raiz $Carpeta
$utf8 = New-Object System.Text.UTF8Encoding $false

if (-not $SoloPaginas) {
  if ($Carpeta -notmatch '^[a-z0-9-]+$') { throw "Usá solo minúsculas, números y guiones para la carpeta (ej: la-esquina)" }
  if (Test-Path $dest) { throw "Ya existe la carpeta '$Carpeta'" }
  if (-not $Marca) { $Marca = $Carpeta }
  Copy-Item (Join-Path $raiz "_base\nuevo") $dest -Recurse
  $datos = Join-Path $dest "datos.js"
  [IO.File]::WriteAllText($datos, ([IO.File]::ReadAllText($datos)).Replace("NOMBRE DE LA MARCA", $Marca), $utf8)
} elseif (-not (Test-Path $dest)) { throw "No existe la carpeta '$Carpeta'" }

# Páginas de la tienda (mismo esqueleto para los dos diseños)
$tienda = @'
<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Tienda online</title>
<link rel="stylesheet" href="../marca.css">
<link rel="stylesheet" href="../../_base/motor.css">
<link rel="stylesheet" href="../../_base/DISENO/estilo.css">
</head>
<body data-pagina="PAGINA">
<div id="cabecera"></div>
<main id="principal"></main>
<div id="pie"></div>
<script src="../datos.js"></script>
<script src="../../_base/motor.js"></script>
<script src="../../_base/DISENO/tienda.js"></script>
</body>
</html>
'@
foreach ($d in "editorial", "catalogo") {
  New-Item -ItemType Directory -Force (Join-Path $dest $d) | Out-Null
  foreach ($p in @(@("index", "inicio"), @("categoria", "categoria"), @("producto", "producto"))) {
    [IO.File]::WriteAllText((Join-Path $dest "$d\$($p[0]).html"), $tienda.Replace("DISENO", $d).Replace("PAGINA", $p[1]), $utf8)
  }
}

# Página de presentación de la propuesta (la que le mandás al prospecto)
$propuesta = @'
<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Propuesta de tienda online</title>
<link rel="stylesheet" href="marca.css">
<link rel="stylesheet" href="../_base/propuesta.css">
</head>
<body>
<div id="app"></div>
<script src="datos.js"></script>
<script src="../_base/propuesta.js"></script>
</body>
</html>
'@
[IO.File]::WriteAllText((Join-Path $dest "index.html"), $propuesta, $utf8)

Write-Host ""
Write-Host "Listo: boceto en .\$Carpeta" -ForegroundColor Green
if (-not $SoloPaginas) {
  Write-Host "  1) Poné el logo y las fotos en .\$Carpeta\img (JPG de ~1000px de lado)"
  Write-Host "  2) Editá .\$Carpeta\marca.css  (colores y tipografías)"
  Write-Host "  3) Editá .\$Carpeta\datos.js   (nombre, categorías, productos, textos)"
  Write-Host "  4) Abrí .\$Carpeta\index.html para ver la propuesta"
}
