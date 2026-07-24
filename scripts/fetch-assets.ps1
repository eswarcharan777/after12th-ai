# ═══════════════════════════════════════════════════════════════════════
# Downloads real biology diagrams (Wikimedia Commons — free-license)
# and molecule renderings (PubChem — US Govt public domain) into
# public/diagrams and public/molecules so they ship with our own build.
#
# Run once from the project root:
#     powershell -ExecutionPolicy Bypass -File scripts/fetch-assets.ps1
# ═══════════════════════════════════════════════════════════════════════

$ErrorActionPreference = 'Stop'
$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36 After12thAI/1.0'

$diagrams = @{
  'animal-cell.png'    = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Animal_cell_structure_en.svg/1024px-Animal_cell_structure_en.svg.png'
  'plant-cell.png'     = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Plant_cell_structure_svg-en.svg/1024px-Plant_cell_structure_svg-en.svg.png'
  'heart.png'          = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Diagram_of_the_human_heart_%28cropped%29.svg/900px-Diagram_of_the_human_heart_%28cropped%29.svg.png'
  'nephron.png'        = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Physiology_of_Nephron.png/900px-Physiology_of_Nephron.png'
  'neuron.png'         = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Neuron.svg/1024px-Neuron.svg.png'
  'dna.png'            = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/DNA_chemical_structure.svg/800px-DNA_chemical_structure.svg.png'
  'eye.png'            = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Schematic_diagram_of_the_human_eye_en.svg/1024px-Schematic_diagram_of_the_human_eye_en.svg.png'
  'brain.png'          = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/1311_Brain_Stem.jpg/900px-1311_Brain_Stem.jpg'
  'small-intestine.png'= 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Blausen_0817_SmallIntestine_Anatomy.png/900px-Blausen_0817_SmallIntestine_Anatomy.png'
  'respiratory.png'    = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Respiratory_system_complete_en.svg/700px-Respiratory_system_complete_en.svg.png'
  'digestive.png'      = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Digestive_system_diagram_en.svg/700px-Digestive_system_diagram_en.svg.png'
  'mitochondrion.png'  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mitochondrion_structure.svg/1024px-Mitochondrion_structure.svg.png'
}

# PubChem CIDs — public domain molecule renderings.
$molecules = @{
  'water.png'    = 962
  'methane.png'  = 297
  'ammonia.png'  = 222
  'co2.png'      = 280
  'benzene.png'  = 241
  'ethanol.png'  = 702
  'glucose.png'  = 5793
  'sulfuric.png' = 1118
  'nh4.png'      = 223
  'aspirin.png'  = 2244
  'caffeine.png' = 2519
  'ethene.png'   = 6325
}

function DL($url, $dest) {
  Write-Host "→ $dest" -ForegroundColor Cyan
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UserAgent $UA -MaximumRedirection 5 -TimeoutSec 30
    $size = (Get-Item $dest).Length
    if ($size -lt 5000) {
      Write-Host "  ! only $size bytes — likely a block page. Removing." -ForegroundColor Yellow
      Remove-Item $dest
    } else {
      Write-Host "  ✓ $([math]::Round($size/1KB,1)) KB" -ForegroundColor Green
    }
  } catch {
    Write-Host "  ✗ FAILED: $_" -ForegroundColor Red
  }
}

Write-Host "`n=== Downloading biology diagrams into public/diagrams/ ===`n" -ForegroundColor Magenta
New-Item -ItemType Directory -Force -Path 'public\diagrams' | Out-Null
foreach ($e in $diagrams.GetEnumerator()) {
  DL $e.Value "public\diagrams\$($e.Key)"
}

Write-Host "`n=== Downloading molecule structures into public/molecules/ ===`n" -ForegroundColor Magenta
New-Item -ItemType Directory -Force -Path 'public\molecules' | Out-Null
foreach ($e in $molecules.GetEnumerator()) {
  $url = "https://pubchem.ncbi.nlm.nih.gov/image/imagefly.cgi?cid=$($e.Value)&width=500&height=500"
  DL $url "public\molecules\$($e.Key)"
}

Write-Host "`n=== Done. Now commit: ===" -ForegroundColor Green
Write-Host "    git add public/diagrams public/molecules" -ForegroundColor White
Write-Host "    git commit -m `"assets: bundle real biology diagrams and molecule renders`"" -ForegroundColor White
Write-Host "    git push origin main`n" -ForegroundColor White
