#!/usr/bin/env node

/**
 * Clean Framework Component Generator
 * Automatically creates new components with proper integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for console output
const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

function getComponentName() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        log('Usage: node create-component.js <component-name> [options]', 'red');
        log('Example: node create-component.js timeline', 'yellow');
        log('Options:', 'blue');
        log('  --no-js     Skip JavaScript file', 'blue');
        log('  --no-php    Skip PHP template file', 'blue');
        log('  --type=ui   Component type (ui, layout, marketing, admin)', 'blue');
        process.exit(1);
    }
    return args[0].toLowerCase();
}

function getOptions() {
    const args = process.argv.slice(3);
    const options = {
        includeJS: true,
        includePHP: true,
        type: 'ui'
    };
    
    args.forEach(arg => {
        if (arg === '--no-js') options.includeJS = false;
        if (arg === '--no-php') options.includePHP = false;
        if (arg.startsWith('--type=')) {
            options.type = arg.split('=')[1];
        }
    });
    
    return options;
}

function validateComponentName(name) {
    // Check if component already exists
    if (fs.existsSync(`components/${name}`)) {
        log(`✗ Component '${name}' already exists!`, 'red');
        process.exit(1);
    }
    
    // Validate naming convention
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
        log('✗ Component name must be lowercase with hyphens (e.g., "my-component")', 'red');
        process.exit(1);
    }
}

function createComponentDirectory(name) {
    const dir = `components/${name}`;
    fs.mkdirSync(dir, { recursive: true });
    log(`✓ Created directory: ${dir}`, 'green');
}

function generateCSS(name, type) {
    const className = name;
    const componentName = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const cssContent = `/* ${componentName} Component */
/* ${getComponentDescription(type)} */

.${className} {
    /* Base component styles */
    position: relative;
    
    /* Use CSS custom properties for theming */
    background: var(--background);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    
    /* Component states */
    &.${className}-active {
        background: var(--primary);
        color: var(--primary-foreground);
    }
    
    &.${className}-disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    
    /* Component variants */
    &.${className}-large {
        padding: 1.5rem;
        font-size: 1.125rem;
    }
    
    &.${className}-small {
        padding: 0.5rem;
        font-size: 0.875rem;
    }
    
    /* Responsive design */
    @media (max-width: 640px) {
        padding: 0.75rem;
    }
}

/* Component-specific elements */
.${className}-header {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--foreground);
}

.${className}-content {
    line-height: 1.6;
    color: var(--muted-foreground);
}

.${className}-footer {
    margin-top: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
}`;

    const filePath = `components/${name}/${name}.css`;
    fs.writeFileSync(filePath, cssContent);
    log(`✓ Created CSS: ${filePath}`, 'green');
}

function generatePHP(name) {
    const componentName = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const phpContent = `<?php
// ${componentName} Component Demo
?>

<div class="${name}">
    <div class="${name}-header">
        ${componentName} Title
    </div>
    <div class="${name}-content">
        This is a sample ${name} component. Replace this content with your actual component markup.
    </div>
    <div class="${name}-footer">
        Component footer content
    </div>
</div>

<!-- Component variants -->
<div class="${name} ${name}-large">
    <div class="${name}-header">Large ${componentName}</div>
    <div class="${name}-content">Large variant of the component.</div>
</div>

<div class="${name} ${name}-small">
    <div class="${name}-header">Small ${componentName}</div>
    <div class="${name}-content">Small variant of the component.</div>
</div>`;

    const filePath = `components/${name}/${name}.php`;
    fs.writeFileSync(filePath, phpContent);
    log(`✓ Created PHP template: ${filePath}`, 'green');
}

function generateJS(name) {
    const componentName = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    const jsContent = `/**
 * ${componentName} Component
 * Provides interactive functionality for ${name} components
 */

window.${componentName} = {
    init() {
        this.bindEvents();
        console.log('✓ ${componentName} component initialized');
    },

    bindEvents() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            // Handle ${name} clicks
            if (e.target.closest('.${name}')) {
                this.handle${componentName}Click(e.target.closest('.${name}'));
            }
            
            // Handle ${name} button clicks
            if (e.target.closest('.${name}-button')) {
                this.handle${componentName}Action(e.target.closest('.${name}-button'));
            }
        });
        
        // Handle other events as needed
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.${name}')) {
                this.handleKeydown(e);
            }
        });
    },

    handle${componentName}Click(element) {
        // Toggle active state
        element.classList.toggle('${name}-active');
        
        // Emit custom event
        element.dispatchEvent(new CustomEvent('${name}:click', {
            detail: { element },
            bubbles: true
        }));
    },

    handle${componentName}Action(button) {
        const ${name}Element = button.closest('.${name}');
        const action = button.dataset.action;
        
        switch (action) {
            case 'toggle':
                this.toggle${componentName}(${name}Element);
                break;
            case 'close':
                this.close${componentName}(${name}Element);
                break;
            default:
                console.warn('Unknown ${name} action:', action);
        }
    },

    toggle${componentName}(element) {
        element.classList.toggle('${name}-active');
    },

    close${componentName}(element) {
        element.classList.remove('${name}-active');
        element.style.display = 'none';
    },

    // Public API methods
    show(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = '';
            element.classList.add('${name}-active');
        }
    },

    hide(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.close${componentName}(element);
        }
    },

    handleKeydown(e) {
        // Handle keyboard interactions
        if (e.key === 'Escape') {
            this.close${componentName}(e.target.closest('.${name}'));
        }
    }
};`;

    const filePath = `components/${name}/${name}.js`;
    fs.writeFileSync(filePath, jsContent);
    log(`✓ Created JavaScript: ${filePath}`, 'green');
}

function updateMainCSS(name) {
    const stylePath = 'main.css';
    const content = fs.readFileSync(stylePath, 'utf8');
    const newImport = `@import "components/${name}/${name}.css";`;
    
    // Find the last @import and add after it
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('@import "components/')) {
            lastImportIndex = i;
        }
    }
    
    if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, newImport);
        fs.writeFileSync(stylePath, lines.join('\n'));
        log(`✓ Updated ${stylePath}`, 'green');
    } else {
        log(`⚠ Please manually add: ${newImport} to ${stylePath}`, 'yellow');
    }
}

function updateBuildJS(name, includeJS) {
    if (!includeJS) return;
    
    const buildPath = 'build-js.js';
    const content = fs.readFileSync(buildPath, 'utf8');
    const componentFile = `'components/${name}/${name}.js',`;
    
    // Find the component files array and add the new component
    const lines = content.split('\n');
    let arrayEndIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("'components/") && lines[i].includes(".js',")) {
            arrayEndIndex = i;
        }
    }
    
    if (arrayEndIndex !== -1) {
        // Insert before the last component
        lines.splice(arrayEndIndex + 1, 0, `        ${componentFile}`);
        
        // Also update the components array in the initialization
        const componentName = name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("'DataGrid', 'Search', 'Activity', 'FileManager', 'FAQ', 'Banner'")) {
                lines[i] = lines[i].replace("'Banner'", `'Banner', '${componentName}'`);
                break;
            }
        }
        
        fs.writeFileSync(buildPath, lines.join('\n'));
        log(`✓ Updated ${buildPath}`, 'green');
    } else {
        log(`⚠ Please manually add ${componentFile} to ${buildPath}`, 'yellow');
    }
}

function updateMainJS(name, includeJS) {
    if (!includeJS) return;
    
    const mainPath = 'main.js';
    const content = fs.readFileSync(mainPath, 'utf8');
    const componentName = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    const initCode = `    
    // Initialize ${componentName} component
    if (window.${componentName}) {
        window.${componentName}.init();
    }`;
    
    // Find the last component initialization and add after it
    const lines = content.split('\n');
    let lastInitIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('window.') && lines[i].includes('.init()')) {
            lastInitIndex = i;
        }
    }
    
    if (lastInitIndex !== -1) {
        lines.splice(lastInitIndex + 2, 0, initCode);
        fs.writeFileSync(mainPath, lines.join('\n'));
        log(`✓ Updated ${mainPath}`, 'green');
    } else {
        log(`⚠ Please manually add initialization code to ${mainPath}`, 'yellow');
    }
}

function runBuild() {
    try {
        log('\n→ Running build process...', 'blue');
        execSync('npm run build', { stdio: 'pipe' });
        log('✓ Build completed successfully', 'green');
    } catch (error) {
        log('⚠ Build had issues. Please run npm run build manually to check.', 'yellow');
    }
}

function getComponentDescription(type) {
    const descriptions = {
        ui: 'Interactive UI component for user interfaces',
        layout: 'Layout component for page structure',
        marketing: 'Marketing component for promotional content',
        admin: 'Admin component for dashboard interfaces'
    };
    return descriptions[type] || 'Reusable component';
}

function showUsageInstructions(name, options) {
    const componentName = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    log('\n' + '='.repeat(50), 'blue');
    log(`   ${componentName} Component Created!`, 'bold');
    log('='.repeat(50), 'blue');
    
    log('\nFiles created:', 'blue');
    log(`  • components/${name}/${name}.css`, 'green');
    if (options.includePHP) log(`  • components/${name}/${name}.php`, 'green');
    if (options.includeJS) log(`  • components/${name}/${name}.js`, 'green');
    
    log('\nIntegration files updated:', 'blue');
    log('  • main.css', 'green');
    if (options.includeJS) {
        log('  • build-js.js', 'green');
        log('  • main.js', 'green');
    }
    
    log('\nUsage in HTML:', 'blue');
    log(`  <div class="${name}">`, 'yellow');
    log(`    <div class="${name}-header">Title</div>`, 'yellow');
    log(`    <div class="${name}-content">Content</div>`, 'yellow');
    log('  </div>', 'yellow');
    
    if (options.includeJS) {
        log('\nJavaScript API:', 'blue');
        const jsName = name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
        log(`  ${jsName}.show('.${name}')`, 'yellow');
        log(`  ${jsName}.hide('.${name}')`, 'yellow');
    }
    
    log('\nNext steps:', 'blue');
    log('  1. Customize the CSS styles for your needs', 'yellow');
    if (options.includePHP) log('  2. Update the PHP template with your markup', 'yellow');
    if (options.includeJS) log('  3. Add your JavaScript functionality', 'yellow');
    log('  4. Test the component in your demo pages', 'yellow');
    log('  5. Add to COMPONENTS.md documentation', 'yellow');
    
    log('\n🚀 Component ready to use!', 'green');
}

// Main execution
function main() {
    const componentName = getComponentName();
    const options = getOptions();
    
    log(`Creating component: ${componentName}`, 'blue');
    
    validateComponentName(componentName);
    createComponentDirectory(componentName);
    
    generateCSS(componentName, options.type);
    
    if (options.includePHP) {
        generatePHP(componentName);
    }
    
    if (options.includeJS) {
        generateJS(componentName);
    }
    
    updateMainCSS(componentName);
    updateBuildJS(componentName, options.includeJS);
    updateMainJS(componentName, options.includeJS);
    
    runBuild();
    showUsageInstructions(componentName, options);
}

// Run the generator
main();