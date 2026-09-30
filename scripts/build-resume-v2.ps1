# Rebuilds the V2 resume files into public/ from scripts/resume-v2.html.
#   PDF  : Microsoft Edge headless print-to-pdf
#   DOCX : Microsoft Word opens the HTML and saves as .docx
# Run: powershell -ExecutionPolicy Bypass -File scripts\build-resume-v2.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$html = Join-Path $PSScriptRoot 'resume-v2.html'
$outDir = Join-Path $root 'public'
$pdfPath = Join-Path $outDir 'resume-v2.pdf'
$docxPath = Join-Path $outDir 'Resume-Tristan-Vegas-v2.docx'
$tmpDocx = Join-Path $outDir '_wdout.docx'

$edge = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge not found (needed for PDF export).' }

if (Test-Path $pdfPath) { Remove-Item $pdfPath -Force }
$profileDir = Join-Path $env:TEMP 'edge-pdf-profile'
& $edge --headless --disable-gpu --no-first-run --no-default-browser-check `
    "--user-data-dir=$profileDir" --no-pdf-header-footer `
    "--print-to-pdf=$pdfPath" "file:///$($html -replace '\\', '/')" | Out-Null
Start-Sleep 2
if (-not (Test-Path $pdfPath)) { throw 'PDF export failed.' }
Write-Output "CREATED: $pdfPath ($((Get-Item $pdfPath).Length) bytes)"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $doc = $word.Documents.Open($html, $false, $true)
    if (Test-Path $tmpDocx) { Remove-Item $tmpDocx -Force }
    $doc.SaveAs2($tmpDocx, 16)
    $doc.Close($false)
}
finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
if (Test-Path $docxPath) { Remove-Item $docxPath -Force }
Move-Item $tmpDocx $docxPath -Force
Write-Output "CREATED: $docxPath ($((Get-Item $docxPath).Length) bytes)"
