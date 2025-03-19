$imageMap = @{
    "Bak Chor Mee.jpg" = "bak-chor-mee.jpg"
    "Bak Kut Teh.jpg" = "bak-kut-teh.jpg"
    "Beef Rendang.jpg" = "beef-rendang.jpg"
    "Char Kway Teow.jpg" = "char-kway-teow.jpg"
    "Chicken Curry Bee Hoon.jpg" = "curry-chicken-bee-hoon.jpg"
    "Chili Crab.jpg" = "chili-crab.jpg"
    "Claypot Rice.jpg" = "claypot-rice.jpg"
    "Fish Head Curry.jpg" = "fish-head-curry.jpg"
    "Fried Carrot Cake.jpg" = "fried-carrot-cake.jpg"
    "Hainanese Chicken Rice.png" = "hainanese-chicken-rice.jpg"
    "Hokkien Mee.jpg" = "hokkien-mee.jpg"
    "Laksa.jpg" = "laksa.jpg"
    "Mee Siam.jpg" = "mee-siam.jpg"
    "Nasi Lemak.jpg" = "nasi-lemak.jpg"
    "Oyster Omelette.jpg" = "oyster-omelette.jpg"
    "Roti Prata.jpg" = "roti-prata.jpg"
    "Sambal Stingray.jpg" = "sambal-stingray.jpg"
    "Satay.jpg" = "satay.jpg"
    "Wanton Mee.jpg" = "wanton-mee.jpg"
    "Yong Tau Foo.jpg" = "yong-tau-foo.jpg"
}

foreach ($pair in $imageMap.GetEnumerator()) {
    $sourcePath = Join-Path -Path "public\meals" -ChildPath $pair.Key
    $destPath = Join-Path -Path "public\meals" -ChildPath $pair.Value
    
    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "Copied $($pair.Key) to $($pair.Value)"
    }
    else {
        Write-Host "Source file not found: $sourcePath"
    }
} 