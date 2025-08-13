# Demo Build Process

## Problem
The static HTML demo files in `/demo/` were getting out of sync with the actual PHP components, creating a maintenance nightmare.

## Solution
Automated demo generation that:
1. Fetches fully rendered pages from your local PHP server
2. Automatically fixes paths for GitHub viewing
3. Ensures demos always match the actual PHP output

## Usage

### Quick Build
```bash
# Start your local server
php -S localhost:8848

# Build demos (in another terminal)
./build.sh
```

### Manual Build
```bash
# Start local server
php -S localhost:8848

# Generate demos
php build-demos.php

# Review and commit
git add demo/
git commit -m "Update demos with latest changes"
git push
```

## What It Does

1. **Fetches Live Pages**: Gets the actual rendered HTML from your local server
2. **Fixes Paths**: Converts local paths to GitHub-compatible relative paths
3. **Adds Dependencies**: Ensures Font Awesome and other CDN resources are included
4. **Cleans Output**: Removes cache-busting parameters and localhost references

## Files Generated

- `demo/index.html` - Main framework overview
- `demo/form-components.html` - Form examples  
- `demo/ui-components.html` - UI component examples
- `demo/layout-components.html` - Layout examples
- `demo/marketing-components.html` - Marketing components
- `demo/admin-components.html` - Admin panel components
- `demo/components-showcase.html` - Complete component showcase

## Benefits

✅ **Always Accurate**: Demos match PHP output exactly  
✅ **No Manual Sync**: Automated path fixing  
✅ **GitHub Compatible**: Works with htmlpreview.github.io  
✅ **Fast**: Rebuilds all demos in seconds  
✅ **Reliable**: Error handling and validation  

## Troubleshooting

**"Local server not found"**
- Make sure `php -S localhost:8848` is running
- Check that the port 8848 is available

**"Failed to fetch"**
- Ensure all PHP files exist and are working
- Check for PHP errors in your local server

**"Demos look broken"**
- Verify paths are correct in generated HTML
- Check that CSS/JS files exist in the repository