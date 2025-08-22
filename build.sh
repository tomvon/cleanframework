#!/bin/bash

# Clean Framework Build Script
# This script prepares all assets for GitHub deployment

echo "========================================="
echo "   Clean Framework Build Process"
echo "========================================="

# Check for required tools
echo "→ Checking dependencies..."

if ! command -v sass &> /dev/null; then
    echo "✗ sass is not installed. Please install it:"
    echo "  npm install -g sass"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed."
    exit 1
fi

if ! command -v php &> /dev/null; then
    echo "✗ PHP is not installed."
    exit 1
fi

echo "✓ All dependencies found"

# Step 1: Build CSS
echo ""
echo "→ Building CSS files..."
sass style.scss style.css
if [ $? -eq 0 ]; then
    echo "✓ Created style.css"
else
    echo "✗ Failed to create style.css"
    exit 1
fi

sass --style=compressed style.scss cleanframework.min.css
if [ $? -eq 0 ]; then
    # Get file sizes
    CSS_SIZE=$(du -h style.css | cut -f1)
    MIN_CSS_SIZE=$(du -h cleanframework.min.css | cut -f1)
    echo "✓ Created cleanframework.min.css ($MIN_CSS_SIZE vs $CSS_SIZE original)"
else
    echo "✗ Failed to create cleanframework.min.css"
    exit 1
fi

# Also create minified style.min.css for backward compatibility
sass --style=compressed style.scss style.min.css
if [ $? -eq 0 ]; then
    echo "✓ Created style.min.css (backward compatibility)"
fi

# Step 2: Build JavaScript
echo ""
echo "→ Building JavaScript files..."
node build-js.js
if [ $? -ne 0 ]; then
    echo "✗ JavaScript build failed"
    exit 1
fi

# Step 3: Build demos (only if local server is running)
echo ""
echo "→ Building demo files..."

# Check if local server is running
if curl -s http://localhost:8848/ > /dev/null 2>&1; then
    php build-demos.php
    if [ $? -eq 0 ]; then
        echo "✓ Demo files built successfully"
    else
        echo "⚠ Demo build had issues but continuing..."
    fi
else
    echo "ℹ Skipping demo build (local server not running)"
    echo "  To build demos, run: php -S localhost:8848"
fi

# Step 4: Create a build info file
echo ""
echo "→ Creating build info..."
BUILD_DATE=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
BUILD_VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "dev")

cat > build-info.json <<EOF
{
  "version": "$BUILD_VERSION",
  "date": "$BUILD_DATE",
  "files": {
    "css": ["style.css", "style.min.css", "cleanframework.min.css"],
    "js": ["main.js", "cleanframework.js", "cleanframework.min.js"]
  }
}
EOF

echo "✓ Build info created (version: $BUILD_VERSION)"

# Step 5: Summary
echo ""
echo "========================================="
echo "   Build Complete!"
echo "========================================="
echo ""
echo "Generated files:"
echo "  CSS:"
echo "    • style.css (development)"
echo "    • style.min.css (minified, legacy)"
echo "    • cleanframework.min.css (minified, recommended)"
echo "  JavaScript:"
echo "    • cleanframework.js (combined, development)"
echo "    • cleanframework.min.js (combined & minified)"
echo ""
echo "To use in production:"
echo "  <link rel=\"stylesheet\" href=\"cleanframework.min.css\">"
echo "  <script src=\"cleanframework.min.js\"></script>"
echo ""
echo "Ready to commit and push to GitHub! 🚀"