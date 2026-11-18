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
  [switch]$SoloPaginas,
  [string]$UrlBase = "https://ignaciodovis-gitclaucode.github.io/bocetos"   # dirección donde se publican los bocetos
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
<script src="../../_base/agencia.js"></script>
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

# ---------- Datos de la marca (leídos de datos.js y marca.css) ----------
$datosTxt = [IO.File]::ReadAllText((Join-Path $dest "datos.js"), [Text.Encoding]::UTF8)
$marcaTxt = [IO.File]::ReadAllText((Join-Path $dest "marca.css"), [Text.Encoding]::UTF8)
function Dato($clave) { $m = [regex]::Match($datosTxt, "(?m)^\s*$($clave):\s*`"([^`"]*)`""); if ($m.Success) { $m.Groups[1].Value } else { "" } }
function Color($var, $defecto) { $m = [regex]::Match($marcaTxt, "--$($var):\s*(#[0-9a-fA-F]{6})"); if ($m.Success) { $m.Groups[1].Value } else { $defecto } }
$nombre = Dato "nombre"; if (-not $nombre) { $nombre = $Carpeta }
$bajada = Dato "bajada"
$logo = Dato "logo"
$cOscuro = Color "c-oscuro" "#2b2b2b"
$cDetalle = Color "c-detalle" (Color "c-acento" "#c0843d")

# ---------- Imagen de vista previa (la que muestra WhatsApp al compartir el link) ----------
Add-Type -AssemblyName System.Drawing
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
$fondo = [System.Drawing.ColorTranslator]::FromHtml($cOscuro)
$detalle = [System.Drawing.ColorTranslator]::FromHtml($cDetalle)
$g.Clear($fondo)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(28, $detalle))), 760, -260, 760, 760)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(18, 255, 255, 255))), -200, 380, 520, 520)
# tarjeta blanca con el logo
$card = New-Object System.Drawing.Drawing2D.GraphicsPath
$cx = 80; $cy = 165; $cs = 300; $r = 40
$card.AddArc($cx, $cy, $r, $r, 180, 90); $card.AddArc($cx + $cs - $r, $cy, $r, $r, 270, 90)
$card.AddArc($cx + $cs - $r, $cy + $cs - $r, $r, $r, 0, 90); $card.AddArc($cx, $cy + $cs - $r, $r, $r, 90, 90); $card.CloseFigure()
$g.FillPath([System.Drawing.Brushes]::White, $card)
$rutaLogo = if ($logo) { Join-Path $dest $logo } else { "" }
if ($rutaLogo -and (Test-Path $rutaLogo)) {
  $L = New-Object System.Drawing.Bitmap $rutaLogo; $L.SetResolution(96, 96)
  $max = $cs - 60; $s = [Math]::Min($max / $L.Width, $max / $L.Height)
  $lw = [int]($L.Width * $s); $lh = [int]($L.Height * $s)
  $g.DrawImage($L, [int]($cx + ($cs - $lw) / 2), [int]($cy + ($cs - $lh) / 2), $lw, $lh); $L.Dispose()
} else {
  $fI = New-Object System.Drawing.Font "Segoe UI", 110, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat; $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
  $g.DrawString($nombre.Substring(0, 1).ToUpper(), $fI, (New-Object System.Drawing.SolidBrush $fondo), (New-Object System.Drawing.RectangleF $cx, $cy, $cs, $cs), $sf)
}
# textos
$tx = 440; $ancho = 690
$f1 = New-Object System.Drawing.Font "Segoe UI Semibold", 26, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("PROPUESTA DE TIENDA ONLINE", $f1, (New-Object System.Drawing.SolidBrush $detalle), $tx, 190)
$tam = 84
do { $f2 = New-Object System.Drawing.Font "Segoe UI", $tam, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel); $tam -= 4 } while ($g.MeasureString($nombre, $f2).Width -gt $ancho -and $tam -gt 40)
$g.DrawString($nombre, $f2, [System.Drawing.Brushes]::White, $tx - 4, 228)
$f3 = New-Object System.Drawing.Font "Segoe UI", 28, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
if ($bajada) { $g.DrawString($bajada, $f3, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(215, 255, 255, 255))), (New-Object System.Drawing.RectangleF $tx, 350, $ancho, 80)) }
$f4 = New-Object System.Drawing.Font "Segoe UI Semibold", 24, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString("2 diseños para elegir  ·  Navegala como si fuera real  →", $f4, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(170, 255, 255, 255))), $tx, 440)
$jpg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]88)
$bmp.Save((Join-Path $dest "vista-previa.jpg"), $jpg, $ep); $g.Dispose(); $bmp.Dispose()

# ---------- Página de presentación de la propuesta (la que le mandás al prospecto) ----------
$enc = { param($s) [System.Net.WebUtility]::HtmlEncode($s) }
$urlCliente = "$($UrlBase.TrimEnd('/'))/$Carpeta/"
$titulo = & $enc "Propuesta de tienda online para $nombre"
$desc = & $enc "Mirá cómo podría verse la tienda online de ${nombre}: dos diseños con tu marca y tus productos, listos para navegar."
$version = Get-Date -Format "yyyyMMddHHmm"
$propuesta = @"
<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>$titulo</title>
<meta name="description" content="$desc">
<meta property="og:type" content="website">
<meta property="og:title" content="$titulo">
<meta property="og:description" content="$desc">
<meta property="og:url" content="$urlCliente">
<meta property="og:image" content="${urlCliente}vista-previa.jpg?v=$version">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="marca.css">
<link rel="stylesheet" href="../_base/propuesta.css">
</head>
<body>
<div id="app"></div>
<script src="datos.js"></script>
<script src="../_base/agencia.js"></script>
<script src="../_base/propuesta.js"></script>
</body>
</html>
"@
[IO.File]::WriteAllText((Join-Path $dest "index.html"), $propuesta, $utf8)

Write-Host ""
Write-Host "Listo: boceto en .\$Carpeta" -ForegroundColor Green
if (-not $SoloPaginas) {
  Write-Host "  1) Poné el logo y las fotos en .\$Carpeta\img (JPG de ~1000px de lado)"
  Write-Host "  2) Editá .\$Carpeta\marca.css  (colores y tipografías)"
  Write-Host "  3) Editá .\$Carpeta\datos.js   (nombre, categorías, productos, textos)"
  Write-Host "  4) Abrí .\$Carpeta\index.html para ver la propuesta"
}
