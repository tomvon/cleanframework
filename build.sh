#!/bin/bash

echo "Building Clean Framework demos..."

# Check if local server is running
if ! curl -s http://localhost:8848/ > /dev/null; then
    echo "Please start your local PHP server: php -S localhost:8848"
    exit 1
fi

# Run the demo builder
php build-demos.php