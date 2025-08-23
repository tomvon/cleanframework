# Clean Framework - Architecture Guide

## Component-Based Architecture

Clean Framework uses a modular, component-based architecture with PHP includes, SCSS modules, and optional JavaScript enhancements.

## Directory Structure

```
cleanframework/
├── index.php                 # Main page (uses components)
├── style.scss               # Main SCSS file (imports components)  
├── style.css                # Compiled CSS (auto-generated - DO NOT EDIT)
├── style.min.css            # Minified CSS (auto-generated - DO NOT EDIT)
├── main.js                  # Main JavaScript coordinator
├── build.sh                 # Demo build script
├── img/                     # Sample images
├── demo/                    # Generated static demos
└── components/
    ├── layout/
    │   └── _layout.scss     # Foundation variables & utilities
    ├── typography/
    │   └── _typography.scss # Typography styles
    ├── buttons/
    │   └── _buttons.scss    # Button styles
    ├── header/
    │   ├── header.php       # Header component
    │   └── _header.scss     # Header styles
    ├── navigation/
    │   ├── navigation.php   # Navigation component
    │   ├── navigation.js    # Navigation JavaScript (theme, mobile nav)
    │   └── _navigation.scss # Navigation styles
    ├── sidebar/
    │   ├── sidebar.php      # Sidebar component
    │   ├── sidebar.js       # Sidebar JavaScript
    │   └── _sidebar.scss    # Sidebar styles
    ├── hero/
    │   ├── hero.php         # Hero component
    │   └── _hero.scss       # Hero styles
    ├── cards/
    │   ├── cards.php        # Cards component
    │   └── _cards.scss      # Cards styles
    ├── form/
    │   ├── form.php         # Form component
    │   ├── form-multi.php   # Multi-step form
    │   ├── form.js          # Form JavaScript (validation, UI)
    │   └── _form.scss       # Form styles
    ├── pricing/
    │   ├── pricing.php      # Pricing component
    │   └── _pricing.scss    # Pricing styles
    ├── modal/
    │   ├── modal.php        # Modal component
    │   ├── modal.js         # Modal JavaScript
    │   └── _modal.scss      # Modal styles
    ├── dropdown/
    │   ├── dropdown.php     # Dropdown component
    │   ├── dropdown.js      # Dropdown JavaScript
    │   └── _dropdown.scss   # Dropdown styles
    ├── table/
    │   ├── table.php        # Table component
    │   ├── table.js         # Table JavaScript
    │   └── _table.scss      # Table styles
    ├── tabs/
    │   ├── tabs.php         # Tabs component
    │   ├── tabs.js          # Tabs JavaScript
    │   └── _tabs.scss       # Tabs styles
    ├── accordion/
    │   ├── accordion.php    # Accordion component
    │   ├── accordion.js     # Accordion JavaScript
    │   └── _accordion.scss  # Accordion styles
    ├── alert/
    │   ├── alert.php        # Alert component
    │   ├── alert.js         # Alert JavaScript
    │   └── _alert.scss      # Alert styles
    ├── badge/
    │   ├── badge.php        # Badge component
    │   ├── badge.js         # Badge JavaScript
    │   └── _badge.scss      # Badge styles
    ├── breadcrumb/
    │   ├── breadcrumb.php   # Breadcrumb component
    │   ├── breadcrumb.js    # Breadcrumb JavaScript
    │   └── _breadcrumb.scss # Breadcrumb styles
    ├── progress/
    │   ├── progress.php     # Progress component
    │   ├── progress.js      # Progress JavaScript
    │   └── _progress.scss   # Progress styles
    ├── tooltip/
    │   ├── tooltip.php      # Tooltip component
    │   ├── tooltip.js       # Tooltip JavaScript
    │   └── _tooltip.scss    # Tooltip styles
    ├── search/
    │   ├── search.php       # Search component
    │   ├── search.js        # Search JavaScript
    │   └── _search.scss     # Search styles
    ├── features/
    │   ├── features.php     # Features component
    │   ├── features.js      # Features JavaScript
    │   └── _features.scss   # Features styles
    ├── testimonials/
    │   ├── testimonials.php # Testimonials component
    │   ├── testimonials.js  # Testimonials JavaScript
    │   └── _testimonials.scss # Testimonials styles
    ├── cta/
    │   ├── cta.php          # Call-to-action component
    │   ├── cta.js           # CTA JavaScript
    │   └── _cta.scss        # CTA styles
    ├── stats/
    │   ├── stats.php        # Statistics component
    │   ├── stats.js         # Statistics JavaScript
    │   └── _stats.scss      # Statistics styles
    ├── dashboard/
    │   ├── dashboard.php    # Dashboard component
    │   ├── dashboard.js     # Dashboard JavaScript
    │   └── _dashboard.scss  # Dashboard styles
    ├── datagrid/
    │   ├── datagrid.php     # Data grid component
    │   ├── datagrid.js      # Data grid JavaScript
    │   └── _datagrid.scss   # Data grid styles
    ├── filemanager/
    │   ├── filemanager.php  # File manager component
    │   ├── filemanager.js   # File manager JavaScript
    │   └── _filemanager.scss # File manager styles
    ├── activity/
    │   ├── activity.php     # Activity feed component
    │   ├── activity.js      # Activity JavaScript
    │   └── _activity.scss   # Activity styles
    ├── comparison/
    │   └── _comparison.scss # Comparison table styles
    ├── marketing/
    │   └── _marketing.scss  # Marketing section styles
    ├── faq/                 # NEW: FAQ Component
    │   ├── faq.php          # FAQ accordion
    │   ├── faq.js           # FAQ JavaScript
    │   └── _faq.scss        # FAQ styles
    ├── logos/               # NEW: Logo Cloud Component
    │   ├── logos.php        # Client/partner logos
    │   └── _logos.scss      # Logo cloud styles
    ├── team/                # NEW: Team Component
    │   ├── team.php         # Team member showcase
    │   └── _team.scss       # Team styles
    └── banner/              # NEW: Banner Component
        ├── banner.php       # Promotional banners
        ├── banner.js        # Banner JavaScript
        └── _banner.scss     # Banner styles
```

## How It Works

### 1. SCSS Compilation
- `style.scss` imports all component SCSS files using `@use`
- Prepros automatically compiles to `style.css`
- Each component has its own `_componentname.scss` file

### 2. PHP Components
- Each component has a `.php` file with reusable markup
- Components accept data variables for dynamic content
- Components are included in `index.php` as needed

### 3. JavaScript (Optional)
- Component-specific JS in individual files
- `main.js` coordinates all components
- For Prepros concatenation, create a main file that imports others

## Usage Examples

### Using a Component in PHP

```php
<?php
// Set up component data
$hero_title = 'Welcome';
$hero_subtitle = 'This is clean.';
$hero_buttons = [
    ['url' => '#', 'label' => 'Get Started', 'type' => 'primary']
];

// Include the component
include 'components/hero/hero.php';
?>
```

### Adding a New Component

1. **Create the directory**: `components/newcomponent/`

2. **Create the SCSS file**: `components/newcomponent/_newcomponent.scss`
```scss
.newcomponent {
    // Component styles here
}
```

3. **Add to main SCSS**: In `style.scss`:
```scss
@use 'components/newcomponent';
```

4. **Compile CSS**: Always compile after changes:
```bash
sass style.scss style.css
sass --style=compressed style.scss style.min.css
```

## ⚠️ Critical Development Rules

### DO NOT Edit Compiled Files

**NEVER edit these files directly:**
- ❌ `style.css` - Auto-generated from SCSS
- ❌ `style.min.css` - Auto-generated minified version

**Always edit these files:**
- ✅ `style.scss` - Main SCSS file
- ✅ `components/[name]/_[name].scss` - Component SCSS files

### Why This Matters

When you run `sass style.scss style.css`, it overwrites the compiled CSS file with the SCSS source. Any manual edits to the CSS file will be **permanently lost**.

### Correct Workflow

1. Edit SCSS files in `components/` directory
2. Compile: `sass style.scss style.css`
3. Minify: `sass --style=compressed style.scss style.min.css`
4. Test changes
5. Commit SCSS files (not compiled CSS)

4. **Create PHP component** (if needed): `components/newcomponent/newcomponent.php`
```php
<div class="newcomponent">
    <h3><?= $title ?? 'Default Title' ?></h3>
    <p><?= $content ?? 'Default content' ?></p>
</div>
```

5. **Create JavaScript** (if needed): `components/newcomponent/newcomponent.js`
```javascript
window.NewComponent = {
    init: () => {
        // Component initialization
    }
};
```

6. **Initialize in main.js**:
```javascript
if (window.NewComponent) {
    window.NewComponent.init();
}
```

## Prepros Setup

### For SCSS:
- Prepros automatically compiles `style.scss` → `style.css`
- Uses `@use` for modern SCSS imports
- Includes autoprefixer and source maps

### For JavaScript Concatenation:
Two approaches:

**Build Script Approach**
Create `build-js.sh`:
```bash
#!/bin/bash
cat components/navigation/navigation.js \
    components/form/form.js \
    main.js > compiled.js
```

## Benefits of This Architecture

### ✅ **Modular & Maintainable**
- Each component is self-contained
- Easy to update individual components
- Clear separation of concerns

### ✅ **Reusable Components** 
- Components accept data parameters
- Same component used across multiple pages
- DRY principle enforced

### ✅ **Modern Build Process**
- SCSS with modern `@use` syntax
- Automatic compilation with Prepros
- Source maps for debugging

### ✅ **Progressive Enhancement**
- CSS works without JavaScript
- JavaScript adds enhancements
- Components gracefully degrade

### ✅ **Developer Experience**
- Intuitive file organization
- Easy to find and modify components
- Clear data flow from PHP → HTML

## Recent Improvements (2024)

### Framework Cleanup & Semantic Patterns
- **Removed all utility classes** (`.hidden`, `.text-center`, etc.) in favor of semantic alternatives
- **Eliminated inline styles** - All styling through semantic CSS classes
- **Standardized state management** - Component-specific semantic classes like `.banner-closed`, `.file-view-hidden`
- **Event delegation patterns** - Replaced inline `onclick` handlers with proper event delegation
- **Global function cleanup** - Organized JavaScript exports and reduced global pollution

### New Marketing Components
- **FAQ Component** - Accessible accordion-style Q&A
- **Logo Cloud** - Client/partner logo showcase
- **Team Component** - Team member profiles with grid layout
- **Banner Component** - Promotional banners with theme variants

### Enhanced JavaScript Architecture
- **Component initialization** - Unified `main.js` coordinator pattern
- **Mobile navigation** - Unified MobileNav system for consistent mobile UX
- **Theme management** - Light/dark/system theme switching with proper persistence
- **Semantic state classes** - Component-specific hidden/filtered states

### CSS Custom Properties Integration
- **Theme-aware colors** - All components use CSS variables for proper theme support
- **Dynamic styling** - `data-*` attributes with CSS selectors instead of inline styles
- **Color mixing** - Advanced color-mix() functions for theme variants

## Best Practices

1. **Keep components focused** - One responsibility per component
2. **Use semantic class names** - `.hero`, `.cards`, `.nav` 
3. **Semantic state management** - Use `.component-state-hidden` instead of `.hidden`
4. **Accept data via PHP variables** - Makes components reusable
5. **Progressive JavaScript** - Enhance, don't require
6. **Event delegation** - Avoid inline handlers, use component-scoped event delegation
7. **SCSS organization** - One file per component
8. **Consistent naming** - Same name for folder, files, and CSS classes
9. **CSS custom properties** - Use variables for all themeable values
10. **Avoid utility classes** - Build semantic, component-specific styles

## Framework Philosophy Enforcement

### ❌ Avoid These Patterns
- Utility classes (`.hidden`, `.text-center`, `.flex`)
- Inline styles (`style="display: none"`)
- Global onclick handlers (`onclick="someFunction()"`)
- CSS-in-JS or style-in-attributes patterns
- Non-semantic class names (`.btn-primary-lg-outline`)

### ✅ Embrace These Patterns  
- Semantic component classes (`.banner`, `.faq-question`, `.team-member`)
- Component-specific state classes (`.banner-closed`, `.faq-question-open`)
- Event delegation with semantic selectors
- CSS custom properties for themeable values
- Progressive enhancement with graceful degradation

This architecture scales from simple static sites to complex applications while maintaining the core Clean Framework principles of semantic HTML, component-based CSS, and clean JavaScript patterns.