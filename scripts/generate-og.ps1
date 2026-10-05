# Generates public/og.png (1200x630) social share card.
# Run once (or after rebranding): powershell -File scripts\generate-og.ps1
Add-Type -AssemblyName System.Drawing

$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.Color]::FromArgb(255, 9, 9, 11),
  [System.Drawing.Color]::FromArgb(255, 24, 24, 27),
  90
)
$g.FillRectangle($bg, $rect)

$amber = [System.Drawing.Color]::FromArgb(255, 250, 204, 21)
$amberBrush = New-Object System.Drawing.SolidBrush($amber)
$amberPen = New-Object System.Drawing.Pen($amber, 6)

# Top accent bar
$g.FillRectangle($amberBrush, 0, 0, $w, 8)

# Left accent rule next to the title
$g.FillRectangle($amberBrush, 64, 152, 8, 250)

$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 250, 250, 250))
$zinc300 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 212, 212, 216))
$zinc400 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 161, 161, 170))
$zinc500 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 113, 113, 122))
$zinc800 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 39, 39, 42))

$fontTitle = New-Object System.Drawing.Font("Segoe UI", 46, [System.Drawing.FontStyle]::Bold)
$fontRole = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular)
$fontStack = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$fontLabel = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$fontUrl = New-Object System.Drawing.Font("Consolas", 14, [System.Drawing.FontStyle]::Regular)

$g.DrawString("PORTFOLIO", $fontLabel, $amberBrush, 90, 118)
$g.DrawString("Tristan Vegas", $fontTitle, $white, 88, 158)
$g.DrawString("Web Developer | Full-Stack | Data Analyst", $fontRole, $zinc300, 90, 252)
$g.DrawString("React - Node.js - Laravel - SQL - IT Data Analysis", $fontStack, $zinc400, 90, 306)
$g.DrawString("Camarines Sur, Philippines | Open to opportunities", $fontStack, $zinc500, 90, 348)

# Divider + footer
$g.FillRectangle($zinc800, 90, 512, 1020, 2)
$g.DrawString("tristan-portfolio-v1.vercel.app", $fontUrl, $zinc400, 90, 540)
$g.DrawString("github.com/vegastristan1  |  linkedin.com/in/tristan-vegas", $fontUrl, $zinc500, 90, 574)

$out = Join-Path $PSScriptRoot "..\public\og.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

$fontTitle.Dispose(); $fontRole.Dispose(); $fontStack.Dispose(); $fontLabel.Dispose(); $fontUrl.Dispose()
$amberBrush.Dispose(); $amberPen.Dispose(); $white.Dispose(); $zinc300.Dispose(); $zinc400.Dispose(); $zinc500.Dispose(); $zinc800.Dispose()
$bg.Dispose(); $g.Dispose(); $bmp.Dispose()

Write-Host "Wrote $((Resolve-Path $out).Path)"
