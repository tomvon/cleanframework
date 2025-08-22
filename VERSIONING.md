# Versioning Guide for Clean Framework

Clean Framework follows [Semantic Versioning](https://semver.org/) (SemVer) for releases.

## Version Format: MAJOR.MINOR.PATCH

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes that require users to update their code
- **MINOR** (1.0.0 → 1.1.0): New features or components, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, minor improvements, documentation updates

## Release Process

### Quick Release Commands

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm run version:patch

# For new features (1.0.0 → 1.1.0)
npm run version:minor

# For breaking changes (1.0.0 → 2.0.0)
npm run version:major
```

### Interactive Release Process

Use the release script for a guided release with release notes:

```bash
chmod +x release.sh
./release.sh
```

This script will:
1. Check for uncommitted changes
2. Show recent commits since last release
3. Let you choose version type (patch/minor/major/custom)
4. Prompt for release notes
5. Run the build process
6. Update CDN links in README
7. Update CHANGELOG.md
8. Create a git commit and tag
9. Provide next steps for pushing to GitHub

## When to Use Each Version Type

### Patch Version (x.x.1)
Use for:
- Bug fixes
- Performance improvements
- Documentation updates
- Minor CSS tweaks that don't change component behavior
- Security patches

Examples:
- Fixed dropdown menu z-index issue
- Improved modal animation performance
- Updated README documentation
- Fixed typo in button hover state

### Minor Version (x.1.0)
Use for:
- New components added
- New features to existing components
- New theme variations
- New JavaScript functionality
- Style improvements (non-breaking)

Examples:
- Added new FAQ component
- Added dark mode support
- New animation options for modals
- Added data-attribute configuration options

### Major Version (2.0.0)
Use for:
- Breaking changes to class names
- Removed components or features
- Major architectural changes
- Changes requiring users to update their HTML
- Dropping browser support

Examples:
- Renamed .cards to .card-grid
- Removed deprecated .panel component
- Changed from float to flexbox layout
- Required data attributes instead of classes

## CDN Versioning

After releasing, users can access specific versions via CDN:

### Specific Version (Recommended for Production)
```html
<!-- Locked to version 1.0.1 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v1.0.1/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v1.0.1/cleanframework.min.js"></script>
```

### Latest Version (Auto-updates)
```html
<!-- Always gets the latest version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
```

### Major Version Range
```html
<!-- Gets latest 1.x.x version (no breaking changes) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@1/cleanframework.min.css">
```

## Git Workflow

### Regular Development (No Version Change)
```bash
# Make changes
git add .
git commit -m "Fix: dropdown menu positioning"
git push
```

### Creating a Release
```bash
# Option 1: Use release script
./release.sh

# Option 2: Manual process
npm version patch  # Updates package.json
./build.sh         # Builds minified files
git add .
git commit -m "Release v1.0.1"
git tag -a v1.0.1 -m "Bug fixes and improvements"
git push && git push --tags
```

### GitHub Release

After pushing tags, create a GitHub Release:

1. Go to https://github.com/tomvon/cleanframework/releases
2. Click "Draft a new release"
3. Choose your tag (e.g., v1.0.1)
4. Title: "v1.0.1 - Bug Fixes"
5. Add release notes from CHANGELOG.md
6. Publish release

## Best Practices

1. **Always test before releasing** - Run the build and test all demos
2. **Update CHANGELOG.md** - Document all changes for users
3. **Use descriptive commit messages** - Help users understand changes
4. **Don't skip versions** - Go from 1.0.0 to 1.0.1, not to 1.0.5
5. **Tag every release** - Makes it easy to reference specific versions
6. **Update documentation** - If adding features, update COMPONENTS.md

## Version History

Check CHANGELOG.md for complete version history and release notes.