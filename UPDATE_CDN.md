# Release Process

Clean Framework uses GitHub releases and `@latest` CDN references for automatic updates.

## Creating a New Release

### 1. Prepare for Release
```bash
# Ensure all changes are committed
git status

# Verify examples work with current framework
open examples/basic/*/index.html
```

### 2. Create Release Tag
```bash
# Create and push a new tag
git tag v1.0.0
git push origin v1.0.0
```

### 3. Create GitHub Release
Go to GitHub → Releases → "Create a new release":
- **Tag**: v1.0.0 (or your version)
- **Title**: "Clean Framework v1.0.0"
- **Description**: List major changes/fixes
- **Assets**: GitHub will automatically include source code

### 4. Verify CDN Update
Wait 5-10 minutes, then test:
```bash
curl -I https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.css
```

## CDN References

All documentation uses `@latest` which automatically points to the newest release:

```html
<!-- Always gets the latest release -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.js"></script>
```

## Version Strategy

- **Major versions** (v2.0.0): Breaking changes
- **Minor versions** (v1.1.0): New features, major fixes
- **Patch versions** (v1.0.1): Bug fixes, small improvements

## Emergency CDN Purge

If needed, purge specific files:
```bash
curl -X POST https://purge.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.css
curl -X POST https://purge.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.js
```

## Benefits of This Approach

- ✅ **Automatic updates** - `@latest` always gets newest release
- ✅ **No cache issues** - Releases create new URLs
- ✅ **Version control** - Users can pin to specific versions if needed
- ✅ **Professional** - Follows standard practice for CDN libraries