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

## URL Patterns Reference

### CDN Links (jsdelivr)
Use `@latest` - automatically points to newest release:
```html
<!-- ✅ CORRECT - Auto-updates with new releases -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/clean-framework.js"></script>

<!-- ❌ WRONG - Don't use specific versions in docs -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v1.0.0/clean-framework.css">
```

### HTML Preview Links (GitHub Raw)
Use specific release tag - GitHub raw doesn't support `@latest`:
```
✅ CORRECT - Use actual release tag
https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/v1.0.0/examples/basic/contact-form/index.html

❌ WRONG - GitHub doesn't recognize @latest
https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/latest/examples/basic/contact-form/index.html
```

## Files That Auto-Update vs Manual Update

### ✅ Auto-Update (Use @latest - No manual changes needed)
- `README.md` - CDN installation instructions
- `AI_README.md` - Page templates 
- `documentation.html` - Code examples
- `examples/*/index.html` - All example HTML files

### 📝 Manual Update Required (Use specific release tag)
- `examples/README.md` - HTML Preview links must use `v1.0.0`, `v1.1.0`, etc.

## Release Checklist

When creating a new release:

1. **✅ Auto-updates (no action needed):**
   - CDN links automatically point to new release
   - All examples automatically get latest framework

2. **📝 Manual update required:**
   ```bash
   # Update HTML Preview URLs to new release
   sed -i 's/v1.0.0/v1.1.0/g' examples/README.md
   git add examples/README.md
   git commit -m "Update HTML Preview URLs to v1.1.0"
   ```

## Benefits of This Approach

- ✅ **Automatic updates** - `@latest` always gets newest release
- ✅ **No cache issues** - Releases create new URLs  
- ✅ **Version control** - Users can pin to specific versions if needed
- ✅ **Professional** - Follows standard practice for CDN libraries
- ✅ **Mostly automatic** - Only HTML Preview links need manual updates