<?php
/**
 * Demo Generator Script
 * 
 * This script renders all PHP pages and exports them as static HTML
 * with proper paths for GitHub viewing.
 */

// Configuration
$baseUrl = 'http://localhost:8848'; // Your local server URL
$outputDir = 'demo';
$pages = [
    'index.php' => 'index.html',
    'form-components.php' => 'form-components.html', 
    'ui-components.php' => 'ui-components.html',
    'layout-components.php' => 'layout-components.html',
    'marketing-components.php' => 'marketing-components.html',
    'admin-components.php' => 'admin-components.html',
    'components-showcase.php' => 'components-showcase.html'
];

echo "🚀 Starting demo generation...\n";

// Create demo directory if it doesn't exist
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

foreach ($pages as $phpFile => $htmlFile) {
    if (!file_exists($phpFile)) {
        echo "⚠️  Skipping $phpFile (file not found)\n";
        continue;
    }
    
    echo "📄 Processing $phpFile → $htmlFile\n";
    
    // Capture the rendered output
    ob_start();
    include $phpFile;
    $content = ob_get_clean();
    
    // Fix paths for GitHub viewing
    $content = fixPaths($content);
    
    // Write to demo directory
    $outputPath = $outputDir . '/' . $htmlFile;
    file_put_contents($outputPath, $content);
    
    echo "✅ Generated $outputPath\n";
}

echo "🎉 Demo generation complete!\n";

/**
 * Fix asset paths for GitHub viewing
 */
function fixPaths($html) {
    // Fix CSS paths
    $html = preg_replace('/href="style\.css(\?[^"]*)?"/i', 'href="../style.css"', $html);
    
    // Fix JS paths
    $html = preg_replace('/src="main\.js"/i', 'src="../main.js"', $html);
    
    // Fix component JS paths
    $html = preg_replace('/src="components\/([^"]+)"/i', 'src="../components/$1"', $html);
    
    // Remove version parameters
    $html = preg_replace('/\?v=\d+/i', '', $html);
    
    // Fix any other relative paths that might break
    $html = str_replace('href="/', 'href="../', $html);
    $html = str_replace('src="/', 'src="../', $html);
    
    // Add generation timestamp
    $timestamp = date('Y-m-d H:i:s');
    $html = str_replace('</head>', "    <!-- Generated: $timestamp -->\n</head>", $html);
    
    return $html;
}
?>