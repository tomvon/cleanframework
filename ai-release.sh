#!/bin/bash

# Clean Framework AI Release Script
# Streamlined for AI assistant usage

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get release type from argument
RELEASE_TYPE=$1
RELEASE_NOTES=$2

if [ -z "$RELEASE_TYPE" ]; then
    echo "Usage: ./ai-release.sh [patch|minor|major] \"Release notes\""
    exit 1
fi

echo "========================================="
echo "   Clean Framework AI Release"
echo "========================================="

# 1. Check working directory
echo -e "\n${BLUE}→ Checking git status...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠ Uncommitted changes found. Committing...${NC}"
    git add -A
    git commit -m "Pre-release updates" || true
fi

# 2. Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}Current version: v${CURRENT_VERSION}${NC}"

# 3. Bump version
echo -e "\n${BLUE}→ Bumping version (${RELEASE_TYPE})...${NC}"
case $RELEASE_TYPE in
    patch|minor|major)
        NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version | sed 's/v//')
        ;;
    *)
        echo -e "${RED}✗ Invalid release type. Use: patch, minor, or major${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}New version: v${NEW_VERSION}${NC}"

# 4. Run build
echo -e "\n${BLUE}→ Building project...${NC}"
./build.sh
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

# 5. Update README CDN links
echo -e "\n${BLUE}→ Updating CDN links...${NC}"
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/@v[0-9]*\.[0-9]*\.[0-9]*/@v${NEW_VERSION}/g" README.md
else
    # Linux
    sed -i "s/@v[0-9]*\.[0-9]*\.[0-9]*/@v${NEW_VERSION}/g" README.md
fi
echo -e "${GREEN}✓ README updated${NC}"

# 6. Update CHANGELOG
echo -e "\n${BLUE}→ Updating CHANGELOG...${NC}"
DATE=$(date +%Y-%m-%d)

# Create temporary file with new entry
cat > CHANGELOG.tmp <<EOF
# Changelog

All notable changes to Clean Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [${NEW_VERSION}] - ${DATE}
EOF

# Add release notes if provided
if [ -n "$RELEASE_NOTES" ]; then
    echo "$RELEASE_NOTES" >> CHANGELOG.tmp
else
    echo "### Changed" >> CHANGELOG.tmp
    echo "- Updates and improvements" >> CHANGELOG.tmp
fi

echo "" >> CHANGELOG.tmp

# Append rest of changelog, skipping until we find a version header
awk '/^## \[[0-9]+\.[0-9]+\.[0-9]+\]/{flag=1} flag' CHANGELOG.md >> CHANGELOG.tmp

# Update version comparison links
echo "" >> CHANGELOG.tmp
echo "[Unreleased]: https://github.com/tomvon/cleanframework/compare/v${NEW_VERSION}...HEAD" >> CHANGELOG.tmp
echo "[${NEW_VERSION}]: https://github.com/tomvon/cleanframework/compare/v${CURRENT_VERSION}...v${NEW_VERSION}" >> CHANGELOG.tmp

# Keep other version links (but avoid duplicates)
grep '^\[[0-9]' CHANGELOG.md | grep -v "^\[${NEW_VERSION}\]" | grep -v '^\[Unreleased\]' | sort -u >> CHANGELOG.tmp || true

mv CHANGELOG.tmp CHANGELOG.md
echo -e "${GREEN}✓ CHANGELOG updated${NC}"

# 7. Commit release
echo -e "\n${BLUE}→ Committing release...${NC}"
git add -A
if [ -n "$RELEASE_NOTES" ]; then
    git commit -m "Release v${NEW_VERSION}

${RELEASE_NOTES}"
else
    git commit -m "Release v${NEW_VERSION}

Updates and improvements"
fi

# 8. Create tag
echo -e "\n${BLUE}→ Creating tag v${NEW_VERSION}...${NC}"
if [ -n "$RELEASE_NOTES" ]; then
    git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}

${RELEASE_NOTES}"
else
    git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"
fi

# 9. Summary
echo ""
echo "========================================="
echo -e "${GREEN}   ✓ Release v${NEW_VERSION} Ready!${NC}"
echo "========================================="
echo ""
echo "Changes:"
echo "  • Version: v${CURRENT_VERSION} → v${NEW_VERSION}"
echo "  • Type: ${RELEASE_TYPE}"
echo "  • Files updated: package.json, README.md, CHANGELOG.md"
echo "  • Tag created: v${NEW_VERSION}"
echo ""
echo -e "${YELLOW}Next step:${NC}"
echo -e "${GREEN}git push && git push --tags${NC}"
echo ""
echo "CDN URLs for v${NEW_VERSION}:"
echo "  CSS: https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v${NEW_VERSION}/cleanframework.min.css"
echo "  JS:  https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v${NEW_VERSION}/cleanframework.min.js"
echo ""
echo "GitHub Release: https://github.com/tomvon/cleanframework/releases/new?tag=v${NEW_VERSION}"