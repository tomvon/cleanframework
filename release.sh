#!/bin/bash

# Clean Framework Release Script
# This script manages versioning and releases

set -e

echo "========================================="
echo "   Clean Framework Release Manager"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if working directory is clean
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}✗ Working directory is not clean. Please commit or stash changes first.${NC}"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "Current version: ${GREEN}v${CURRENT_VERSION}${NC}"

# Show recent commits since last tag
echo ""
echo "Recent commits since last release:"
echo "-----------------------------------"
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Ask for version type
echo ""
echo "What type of release is this?"
echo "  1) Patch (bug fixes)         - v1.0.0 → v1.0.1"
echo "  2) Minor (new features)      - v1.0.0 → v1.1.0"
echo "  3) Major (breaking changes)  - v1.0.0 → v2.0.0"
echo "  4) Custom version"
echo "  0) Cancel"
echo ""
read -p "Select release type (0-4): " RELEASE_TYPE

case $RELEASE_TYPE in
    1)
        VERSION_TYPE="patch"
        NEW_VERSION=$(npm version patch --no-git-tag-version | sed 's/v//')
        ;;
    2)
        VERSION_TYPE="minor"
        NEW_VERSION=$(npm version minor --no-git-tag-version | sed 's/v//')
        ;;
    3)
        VERSION_TYPE="major"
        NEW_VERSION=$(npm version major --no-git-tag-version | sed 's/v//')
        ;;
    4)
        read -p "Enter custom version (e.g., 1.2.3): " CUSTOM_VERSION
        # Validate version format
        if [[ ! $CUSTOM_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo -e "${RED}✗ Invalid version format. Use x.y.z format${NC}"
            exit 1
        fi
        NEW_VERSION=$CUSTOM_VERSION
        npm version $NEW_VERSION --no-git-tag-version > /dev/null
        VERSION_TYPE="custom"
        ;;
    0)
        echo "Release cancelled."
        exit 0
        ;;
    *)
        echo -e "${RED}✗ Invalid selection${NC}"
        exit 1
        ;;
esac

echo -e "\nNew version will be: ${GREEN}v${NEW_VERSION}${NC}"

# Ask for release notes
echo ""
echo "Enter release notes (press Enter twice when done):"
RELEASE_NOTES=""
while IFS= read -r line; do
    [[ -z "$line" ]] && break
    RELEASE_NOTES="${RELEASE_NOTES}${line}\n"
done

# Confirm release
echo ""
echo "========================================="
echo "Release Summary:"
echo "  Version: v${CURRENT_VERSION} → v${NEW_VERSION}"
echo "  Type: ${VERSION_TYPE}"
if [[ -n "$RELEASE_NOTES" ]]; then
    echo "  Notes:"
    echo -e "    ${RELEASE_NOTES}" | sed 's/^/    /'
fi
echo "========================================="
echo ""
read -p "Proceed with release? (y/N): " CONFIRM

if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
    echo "Release cancelled."
    # Revert version change
    git checkout -- package.json package-lock.json 2>/dev/null
    exit 0
fi

# Run the build
echo ""
echo "→ Building project..."
./build.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed. Release cancelled.${NC}"
    git checkout -- package.json package-lock.json 2>/dev/null
    exit 1
fi

# Update CDN links in README
echo ""
echo "→ Updating CDN links in README..."
sed -i.bak "s/@master/@v${NEW_VERSION}/g" README.md
sed -i.bak "s/@v[0-9]*\.[0-9]*\.[0-9]*/@v${NEW_VERSION}/g" README.md
rm README.md.bak

# Create CHANGELOG entry if file exists
if [ -f "CHANGELOG.md" ]; then
    echo ""
    echo "→ Updating CHANGELOG..."
    
    # Create temporary file with new entry
    cat > CHANGELOG.tmp <<EOF
# Changelog

## [${NEW_VERSION}] - $(date +%Y-%m-%d)

${RELEASE_NOTES}

EOF
    
    # Append existing changelog without the first line
    tail -n +2 CHANGELOG.md >> CHANGELOG.tmp 2>/dev/null || true
    mv CHANGELOG.tmp CHANGELOG.md
fi

# Commit all changes
echo ""
echo "→ Committing release..."
git add -A
git commit -m "Release v${NEW_VERSION}

${RELEASE_NOTES}"

# Create tag
echo "→ Creating tag v${NEW_VERSION}..."
if [[ -n "$RELEASE_NOTES" ]]; then
    git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}

${RELEASE_NOTES}"
else
    git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"
fi

echo ""
echo -e "${GREEN}✓ Release v${NEW_VERSION} created successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Push to GitHub:     git push && git push --tags"
echo "  2. Create GitHub Release: https://github.com/tomvon/cleanframework/releases/new"
echo ""
echo "CDN URLs for this version:"
echo "  CSS: https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v${NEW_VERSION}/cleanframework.min.css"
echo "  JS:  https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v${NEW_VERSION}/cleanframework.min.js"
echo ""
echo "Latest CDN URLs (auto-updates):"
echo "  CSS: https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css"
echo "  JS:  https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"