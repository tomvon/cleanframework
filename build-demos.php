<?php
/**
 * Advanced Demo Builder
 * 
 * Fetches fully rendered pages from local server and converts them
 * to static HTML with proper GitHub paths.
 */

// Configuration
$localServer = 'http://localhost:8848';
$outputDir = 'demo';

// Pages to export
$pages = [
    '' => 'index.html',  // index.php (root)
    'form-components.php' => 'form-components.html',
    'ui-components.php' => 'ui-components.html', 
    'layout-components.php' => 'layout-components.html',
    'marketing-components.php' => 'marketing-components.html',
    'admin-components.php' => 'admin-components.html',
    'components-showcase.php' => 'components-showcase.html'
];

echo "🚀 Building demos from $localServer\n";
echo "📁 Output directory: $outputDir\n\n";

// Ensure output directory exists
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
    echo "📂 Created $outputDir directory\n";
}

// Track success/failures
$success = 0;
$failures = 0;

foreach ($pages as $sourcePage => $outputFile) {
    $url = $localServer . '/' . $sourcePage;
    $outputPath = $outputDir . '/' . $outputFile;
    
    echo "🌐 Fetching: $url\n";
    
    // Fetch the rendered page
    $context = stream_context_create([
        'http' => [
            'timeout' => 30,
            'user_agent' => 'CleanFramework Demo Builder'
        ]
    ]);
    
    $html = @file_get_contents($url, false, $context);
    
    if ($html === false) {
        echo "❌ Failed to fetch $url\n";
        $failures++;
        continue;
    }
    
    // Process and fix the HTML
    $processedHtml = processHtml($html);
    
    // Write to file
    $result = file_put_contents($outputPath, $processedHtml);
    
    if ($result === false) {
        echo "❌ Failed to write $outputPath\n";
        $failures++;
    } else {
        echo "✅ Generated: $outputPath (" . formatBytes(strlen($processedHtml)) . ")\n";
        $success++;
    }
    
    echo "\n";
}

echo "🎉 Demo build complete!\n";
echo "✅ Success: $success files\n";
echo "❌ Failures: $failures files\n";

if ($failures > 0) {
    echo "\n⚠️  Some files failed to generate. Check that your local server is running at $localServer\n";
    exit(1);
}

/**
 * Process HTML for GitHub compatibility
 */
function processHtml($html) {
    // Generate cache-busting timestamp - using date format for htmlpreview.github.io compatibility
    $cacheBuster = date('YmdHis');
    
    // Fix stylesheet paths with cache busting - using simple format
    $html = preg_replace('/href=["\']style\.css(\?[^"\']*)?["\']/i', "href=\"../style.css?$cacheBuster\"", $html);
    
    // Fix main.js path with cache busting
    $html = preg_replace('/src=["\']main\.js["\']/i', "src=\"../main.js?$cacheBuster\"", $html);
    
    // Fix component paths with cache busting  
    $html = preg_replace('/src=["\']components\/([^"\']+)["\']/i', "src=\"../components/$1?$cacheBuster\"", $html);
    
    // Fix any absolute paths that might break
    $html = preg_replace('/href=["\']\/([^"\']+)["\']/i', "href=\"../$1\"", $html);
    $html = preg_replace('/src=["\']\/([^"\']+)["\']/i', "src=\"../$1\"", $html);
    
    // Add Font Awesome CDN if not present
    if (strpos($html, 'font-awesome') === false) {
        $faLink = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">';
        $html = str_replace('</head>', "    $faLink\n</head>", $html);
    }
    
    // Add generation info
    $timestamp = date('Y-m-d H:i:s T');
    $comment = "    <!-- Generated: $timestamp by CleanFramework Demo Builder (cache: $cacheBuster) -->\n";
    $html = str_replace('</head>', $comment . '</head>', $html);
    
    // Add cache-busting meta tag to help with browser caching
    $metaTag = '    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">' . "\n";
    $metaTag .= '    <meta http-equiv="Pragma" content="no-cache">' . "\n";  
    $metaTag .= '    <meta http-equiv="Expires" content="0">' . "\n";
    $html = str_replace('</head>', $metaTag . '</head>', $html);
    
    // Clean up any remaining localhost references
    $html = str_replace('http://localhost:8848/', '../', $html);
    $html = str_replace('//localhost:8848/', '../', $html);
    
    return $html;
}

/**
 * Format bytes for display
 */
function formatBytes($size, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB'];
    $base = log($size, 1024);
    return round(pow(1024, $base - floor($base)), $precision) . ' ' . $units[floor($base)];
}
?>