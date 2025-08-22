#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function buildJS() {
    console.log('Building Clean Framework JavaScript...');
    
    // Component files in order (matching main.js initialization order)
    const componentFiles = [
        'components/navigation/navigation.js',
        'components/form/form.js',
        'components/dropdown/dropdown.js',
        'components/modal/modal.js',
        'components/table/table.js',
        'components/tabs/tabs.js',
        'components/alert/alert.js',
        'components/accordion/accordion.js',
        'components/tooltip/tooltip.js',
        'components/breadcrumb/breadcrumb.js',
        'components/badge/badge.js',
        'components/progress/progress.js',
        'components/testimonials/testimonials.js',
        'components/features/features.js',
        'components/cta/cta.js',
        'components/stats/stats.js',
        'components/sidebar/sidebar.js',
        'components/dashboard/dashboard.js',
        'components/datagrid/datagrid.js',
        'components/search/search.js',
        'components/activity/activity.js',
        'components/filemanager/filemanager.js',
        'components/faq/faq.js',
        'components/banner/banner.js'
    ];
    
    let combinedJS = `/**
 * Clean Framework - Combined JavaScript
 * Version: ${new Date().toISOString().split('T')[0]}
 * 
 * This file contains all component JavaScript modules.
 * For production use, include cleanframework.min.js instead.
 */

`;
    
    // Read and combine all component files
    for (const file of componentFiles) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const componentName = path.basename(file, '.js');
            combinedJS += `\n// ========== ${componentName.toUpperCase()} Component ==========\n`;
            combinedJS += content;
            combinedJS += '\n';
        } else {
            console.warn(`Warning: ${file} not found`);
        }
    }
    
    // Add initialization code
    combinedJS += `
// ========== Initialize All Components ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all available components
    const components = [
        'Navigation', 'Forms', 'Dropdown', 'Modal', 'Table', 'Tabs', 
        'Alerts', 'Accordion', 'Tooltip', 'Breadcrumb', 'Badge', 'Progress',
        'Testimonials', 'Features', 'CTA', 'Stats', 'Sidebar', 'Dashboard',
        'DataGrid', 'Search', 'Activity', 'FileManager', 'FAQ', 'Banner'
    ];
    
    components.forEach(component => {
        if (window[component] && typeof window[component].init === 'function') {
            try {
                window[component].init();
                console.log(\`✓ \${component} initialized\`);
            } catch (error) {
                console.error(\`Error initializing \${component}:\`, error);
            }
        }
    });
});
`;
    
    // Write unminified version
    fs.writeFileSync('cleanframework.js', combinedJS);
    console.log('✓ Created cleanframework.js');
    
    // Create minified version
    try {
        const minified = await minify(combinedJS, {
            compress: {
                drop_console: false, // Keep console logs for debugging
                drop_debugger: true,
                dead_code: true,
                unused: true
            },
            mangle: {
                reserved: ['Navigation', 'Forms', 'Dropdown', 'Modal', 'Table', 'Tabs', 
                          'Alerts', 'Accordion', 'Tooltip', 'Breadcrumb', 'Badge', 
                          'Progress', 'Testimonials', 'Features', 'CTA', 'Stats', 
                          'Sidebar', 'Dashboard', 'DataGrid', 'Search', 'Activity', 
                          'FileManager', 'FAQ', 'Banner'] // Preserve component names
            },
            format: {
                comments: false
            }
        });
        
        if (minified.code) {
            // Add minimal header to minified version
            const minifiedWithHeader = `/* Clean Framework JS - ${new Date().toISOString().split('T')[0]} - https://github.com/tomvon/cleanframework */\n${minified.code}`;
            fs.writeFileSync('cleanframework.min.js', minifiedWithHeader);
            
            // Calculate size savings
            const originalSize = Buffer.byteLength(combinedJS, 'utf8');
            const minifiedSize = Buffer.byteLength(minifiedWithHeader, 'utf8');
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
            
            console.log(`✓ Created cleanframework.min.js (${(minifiedSize / 1024).toFixed(1)}KB, ${savings}% smaller)`);
        }
    } catch (error) {
        console.error('Error minifying JavaScript:', error);
        process.exit(1);
    }
}

// Run the build
buildJS().catch(console.error);