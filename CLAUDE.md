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

1. Run `git status` and `git diff --stat`, and `npm test` (must print OK).
2. Ask: patch (bug fixes), minor (new features, backward compatible) or major (breaking), plus a one-line summary.
3. Move the `[Unreleased]` items in `CHANGELOG.md` under a new version heading and commit everything.
4. Run `npm version <patch|minor|major>`. It rebuilds the bundles, updates the pinned `@vX.Y.Z` CDN links in README.md and AI-README.md, commits and tags.
5. Tell the user to run `git push --follow-tags` (never push for them).

CI (`.github/workflows/build.yml`) fails if the committed `cleanframework.min.*` files don't match the source.

## Development Guidelines

### Component Development

When adding a new component:

1. **Create component files:**
   - `components/[name]/[name].css` - Styles (plain CSS, native nesting, no preprocessor)
   - `components/[name]/[name].js` - JavaScript (if needed)
   - `components/[name]/[name].php` - Demo snippet

2. **Update main files:**
   - Add `@import "components/[name]/[name].css";` to `main.css`
   - Add initialization to `main.js` if component has JS
   - Add to `build-js.js` component list
   - Or run `npm run create-component`, which does all of the above

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
npm run build
```

2. **No console errors in demos:**
```bash
# Check each demo page in browser
# Open DevTools console
# Verify no errors
```

3. **CSS validates:**
```bash
# Minified CSS should be ~115KB
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

## CDN URL Patterns

After release, these URLs will work:

```html
<!-- Latest: don't use, it picks up breaking changes -->
@latest

<!-- Specific version (recommended) -->
@v1.0.1

<!-- Major version (gets latest minor/patch) -->
@1

<!-- Branch (for testing) -->
@branch-name
```

## Semantic Versioning Rules

- **PATCH**: bug fixes, typos, small CSS tweaks
- **MINOR**: new components, features, options
- **MAJOR**: breaking changes, renamed classes, removed features

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
npm run build

# Run specific build
npm run build:css
npm run build:js
npm run build:demos  # needs php -S localhost:8848

# Test (build + sanity checks)
npm test

# Check current version
node -p "require('./package.json').version"

# See recent commits
git log --oneline -10

# Check tag history
git tag -l
```