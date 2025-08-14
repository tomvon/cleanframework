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

// Update README.md with cache-busted links
echo "📝 Updating README.md with cache-busted links\n";
updateReadmeLinks();

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
    
    // Fix navigation links from .php to .html for GitHub demos
    $html = preg_replace('/href=["\']([^"\']*?)\.php["\']/i', 'href="$1.html"', $html);
    
    // Fix specific navigation patterns that might use relative paths
    $html = preg_replace('/href=["\']index\.html["\']/i', 'href="index.html"', $html);
    
    // Fix image paths for GitHub - convert relative img/ paths to GitHub raw content URLs
    $html = preg_replace('/src=["\']img\/([^"\']+)["\']/i', 'src="https://raw.githubusercontent.com/tomvon/cleanframework/master/img/$1"', $html);
    
    // Add Font Awesome CDN if not present
    if (strpos($html, 'font-awesome') === false) {
        $faLink = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">';
        $html = str_replace('</head>', "    $faLink\n</head>", $html);
    }
    
    // Remove prepros development script
    $html = preg_replace('/<script src="[^"]*__prepros\.js"><\/script>\s*/i', '', $html);
    
    // Add theme prevention script early in <head> - more robust version
    $themeScript = '    <script>
        // FOUC prevention - set theme immediately
        (function() {
            try {
                const savedTheme = localStorage.getItem(\'theme\');
                const systemPrefersDark = window.matchMedia && window.matchMedia(\'(prefers-color-scheme: dark)\').matches;
                
                let themeToApply = \'light\'; // default
                
                if (savedTheme === \'dark\') {
                    themeToApply = \'dark\';
                } else if (savedTheme === \'system\' || !savedTheme) {
                    themeToApply = systemPrefersDark ? \'dark\' : \'light\';
                }
                
                if (themeToApply === \'dark\') {
                    document.documentElement.setAttribute(\'data-theme\', \'dark\');
                } else {
                    document.documentElement.removeAttribute(\'data-theme\');
                }
            } catch (e) {
                // Fallback to light theme if localStorage fails
                document.documentElement.removeAttribute(\'data-theme\');
            }
        })();
    </script>' . "\n";
    
    // Remove any existing theme scripts (more comprehensive)
    $html = preg_replace('/<script>\s*\/\/ (Set theme|FOUC prevention|Prevent theme flash).*?<\/script>\s*/s', '', $html);
    
    // Insert theme script immediately after <head>
    $html = str_replace('<head>', "<head>\n$themeScript", $html);
    
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
 * Update README.md with cache-busted demo links
 */
function updateReadmeLinks() {
    $readmePath = 'README.md';
    $cacheBuster = date('YmdHis');
    
    if (!file_exists($readmePath)) {
        echo "⚠️  README.md not found\n";
        return;
    }
    
    $readme = file_get_contents($readmePath);
    
    // First remove any existing cache busters to avoid duplicates  
    $readme = preg_replace('/\?[0-9]{14}(\?[0-9]{14})*/i', '', $readme);
    
    // Update all htmlpreview.github.io links with cache busting
    $readme = preg_replace(
        '/https:\/\/htmlpreview\.github\.io\/\?https:\/\/github\.com\/tomvon\/cleanframework\/blob\/master\/demo\/([^)?\s]+)\.html/i',
        "https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/$1.html?$cacheBuster",
        $readme
    );
    
    // Also update any direct GitHub links to demos
    $readme = preg_replace(
        '/https:\/\/github\.com\/tomvon\/cleanframework\/blob\/master\/demo\/([^)?\s]+)\.html/i',
        "https://github.com/tomvon/cleanframework/blob/master/demo/$1.html?$cacheBuster",
        $readme
    );
    
    file_put_contents($readmePath, $readme);
    echo "✅ Updated README.md with cache buster: $cacheBuster\n";
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