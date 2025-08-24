# Claude AI Development Instructions

## AI-Constraining Framework Architecture

Clean Framework uses an **AI-constraining approach** rather than relying on AI to remember rules. The framework actively prevents common AI mistakes through:

- **CSS-based inline style protection** with visual warnings
- **Template-embedded AI instructions** in component files  
- **Copy-paste patterns** in AI-README.md to prevent improvisation
- **Progressive complexity management** that shields AI from overwhelming context

**Key Point**: This framework constrains AI behavior to prevent mistakes, rather than hoping AI remembers best practices.

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

Clean Framework uses AI-constraining architecture. Follow these rules:

1. **NEVER use inline styles** - Framework CSS will show visual warnings
2. **NEVER add custom CSS classes** - Use only Clean Framework semantic classes
3. **NEVER implement theme toggles or mobile menus** - Already built-in and automatic
4. **USE AI-README.md copy-paste templates** - Don't improvise new patterns
5. **ONLY modify text content** - Component structure is locked
6. **READ component template comments** - They contain AI-specific constraints
7. **Test in browser** - Visual warnings appear when rules are violated

The framework prevents AI mistakes rather than relying on AI memory.

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