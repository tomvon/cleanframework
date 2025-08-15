<?php
/**
 * Simple Demo Builder
 * Fetches PHP pages from local server and converts to static HTML
 */

$localServer = 'http://localhost:8848';
$outputDir = 'demo';

$pages = [
    '' => 'index.html',
    'form-components.php' => 'form-components.html',
    'ui-components.php' => 'ui-components.html', 
    'layout-components.php' => 'layout-components.html',
    'marketing-components.php' => 'marketing-components.html',
    'admin-components.php' => 'admin-components.html',
    'components-showcase.php' => 'components-showcase.html'
];

echo "Building demos from $localServer\n\n";

// Ensure output directory exists
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

foreach ($pages as $sourcePage => $outputFile) {
    $url = $localServer . '/' . $sourcePage;
    $outputPath = $outputDir . '/' . $outputFile;
    
    echo "Fetching: $url\n";
    
    // Fetch the page
    $html = @file_get_contents($url);
    
    if ($html === false) {
        echo "❌ Failed to fetch $url\n";
        continue;
    }
    
    // Remove prepros script injection
    $html = preg_replace('/<script[^>]*prepros[^>]*>.*?<\/script>/is', '', $html);
    
    // Fix navigation links from .php to .html
    $html = preg_replace('/href="([^"]*?)\.php"/i', 'href="$1.html"', $html);
    
    // Fix CSS/JS paths to use parent directory
    $html = preg_replace('/href="(style\.css|style\.min\.css)(\?[^"]*)?"/i', 'href="../$1"', $html);
    $html = preg_replace('/src="(main\.js)(\?[^"]*)?"/i', 'src="../$1"', $html);
    $html = preg_replace('/src="(components\/[^"]+)(\?[^"]*)?"/i', 'src="../$1"', $html);
    
    // Fix image paths for GitHub
    $html = preg_replace('/src="img\/([^"]+)"/i', 'src="../img/$1"', $html);
    
    // Save the file
    file_put_contents($outputPath, $html);
    $size = round(filesize($outputPath) / 1024, 2);
    echo "✅ Generated: $outputPath ($size KB)\n";
}

echo "\n✨ Build complete!\n";
?>