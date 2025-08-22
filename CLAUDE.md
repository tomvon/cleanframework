# Claude AI Development Instructions

## Welcome to Human-AI Collaborative Development

This document contains instructions for AI assistants working on Clean Framework—**the first CSS framework explicitly designed for human-AI partnership**.

Clean Framework was created through human-AI collaboration and embodies principles that make AI assistance more effective:

- **Semantic class names** that AI can understand and predict
- **Component isolation** that prevents unintended side effects
- **Predictable patterns** that enable confident AI modifications
- **Self-documenting code** that needs no translation layer

As an AI assistant, you're not just using this framework—you're working with a framework built specifically to optimize our collaboration.

## Quick Commands

When the user says **"ready for release"**, follow the Release Workflow below.

## Release Workflow

### When User Says: "ready for release"

1. **First, check current status:**
```bash
git status
git diff --stat
```

2. **Ask the user:**
```
What type of release is this?
- patch (bug fixes only) 
- minor (new features, backward compatible)
- major (breaking changes)

Please also provide a brief summary of the changes.
```

3. **Based on their response, execute:**

#### For PATCH Release (bug fixes):
```bash
# 1. Ensure working directory is clean
git add -A
git commit -m "Pre-release updates"

# 2. Bump version
npm version patch --no-git-tag-version

# 3. Run build
./build.sh

# 4. Update README CDN links
# Replace @v1.0.x with new version in README.md

# 5. Update CHANGELOG.md
# Move items from [Unreleased] to new version section

# 6. Commit release
git add -A
git commit -m "Release vX.X.X

- Brief summary of changes"

# 7. Create tag
git tag -a vX.X.X -m "Release vX.X.X"

# 8. Show user the commands to push
echo "Ready to push! Run:"
echo "git push && git push --tags"
```

#### For MINOR Release (new features):
Same as patch, but use `npm version minor --no-git-tag-version`

#### For MAJOR Release (breaking changes):
Same as patch, but use `npm version major --no-git-tag-version`

## Development Guidelines

### Component Development

When adding a new component:

1. **Create component files:**
   - `components/[name]/_[name].scss` - Styles
   - `components/[name]/[name].js` - JavaScript (if needed)
   - `components/[name]/[name].php` - Demo snippet

2. **Update main files:**
   - Add `@use 'components/[name]/[name]';` to `style.scss`
   - Add initialization to `main.js` if component has JS
   - Add to `build-js.js` component list

3. **Update documentation:**
   - Add to `COMPONENTS.md` with examples
   - Add to appropriate demo page (form/ui/layout/marketing/admin)
   - Update README.md component list

### Code Standards

- **CSS Classes**: Semantic names only (`.modal`, not `.modal-wrapper-container`)
- **No utility classes**: Never add `.hidden`, `.text-center`, etc.
- **Component states**: Use `.component-state` pattern (`.modal-open`, `.dropdown-active`)
- **JavaScript**: Progressive enhancement, event delegation preferred
- **Accessibility**: ARIA labels, keyboard navigation, focus management

### Testing Before Release

Always verify before marking "ready for release":

1. **Build runs successfully:**
```bash
./build.sh
```

2. **No console errors in demos:**
```bash
# Check each demo page in browser
# Open DevTools console
# Verify no errors
```

3. **CSS validates:**
```bash
# Minified CSS should be ~140KB
ls -lh cleanframework.min.css
```

4. **JS validates:**
```bash
# Combined JS should be ~90KB  
ls -lh cleanframework.min.js
```

## Common Tasks

### Add a Bug Fix
1. Make the fix in appropriate component file
2. Test in demo
3. Update CHANGELOG.md [Unreleased] section
4. Say "ready for release" and choose "patch"

### Add a New Feature
1. Implement feature in component
2. Update documentation
3. Add to demo page
4. Update CHANGELOG.md [Unreleased] section
5. Say "ready for release" and choose "minor"

### Breaking Change
1. Implement change
2. Update all affected demos
3. Add migration notes to CHANGELOG.md
4. Say "ready for release" and choose "major"

## Release Checklist

Before any release, ensure:

- [ ] All changes committed
- [ ] Build runs without errors
- [ ] Demos work correctly
- [ ] CHANGELOG.md updated
- [ ] Version number bumped
- [ ] CDN links in README updated
- [ ] Git tag created
- [ ] Ready to push to GitHub

## CDN URL Patterns

After release, these URLs will work:

```html
<!-- Latest (auto-updates) -->
@latest

<!-- Specific version (recommended) -->
@v1.0.1

<!-- Major version (gets latest minor/patch) -->
@1

<!-- Branch (for testing) -->
@branch-name
```

## Semantic Versioning Rules

- **1.0.0 → 1.0.1** (PATCH): Bug fixes, typos, small CSS tweaks
- **1.0.0 → 1.1.0** (MINOR): New components, new features, new options
- **1.0.0 → 2.0.0** (MAJOR): Breaking changes, renamed classes, removed features

## Post-Release

After pushing to GitHub:

1. Create GitHub Release: https://github.com/tomvon/cleanframework/releases/new
2. Select the new tag
3. Add release notes from CHANGELOG.md
4. Publish release

## Emergency Rollback

If something goes wrong:

```bash
# Delete local tag
git tag -d vX.X.X

# Delete remote tag (if pushed)
git push origin :refs/tags/vX.X.X

# Reset version in package.json
npm version X.X.X --no-git-tag-version

# Revert commits
git reset --hard HEAD~1
```

## AI Context

When working on Clean Framework, remember:

1. **This is a semantic CSS framework** - No utility classes ever
2. **Components are self-contained** - Each component in its own folder
3. **Progressive enhancement** - CSS works without JS
4. **Accessibility first** - ARIA, keyboard nav, focus states
5. **Version everything** - Every release gets a tag
6. **Document changes** - Update CHANGELOG.md for every change
7. **Test before release** - Run build.sh and check demos

## Quick Reference

```bash
# Start local server
php -S localhost:8848

# Build everything
./build.sh

# Run specific build
npm run build:css
npm run build:js
npm run build:demos

# Check current version
node -p "require('./package.json').version"

# See recent commits
git log --oneline -10

# Check tag history
git tag -l
```