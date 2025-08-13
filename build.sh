#!/bin/bash

echo "🧼 CleanFramework Demo Builder"
echo "============================="
echo ""

# Check if local server is running
echo "🔍 Checking local server..."
if curl -s http://localhost:8848/ > /dev/null; then
    echo "✅ Local server is running"
else
    echo "❌ Local server not found at http://localhost:8848"
    echo "   Please start your local PHP server first:"
    echo "   php -S localhost:8848"
    exit 1
fi

echo ""

# Run the demo builder
echo "🚀 Building demos..."
php build-demos.php

echo ""
echo "📝 Don't forget to:"
echo "   1. Review the generated demo files"
echo "   2. Commit the changes: git add demo/ && git commit -m 'Update demos'"
echo "   3. Push to GitHub: git push"