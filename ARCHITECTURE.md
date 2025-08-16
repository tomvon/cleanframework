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
├── main.js                  # Main JavaScript file
├── img/                     # Sample images
├── archive/                 # Original Clean Framework files
└── components/
    ├── layout/
    │   └── _layout.scss     # Foundation variables & utilities
    ├── typography/
    │   └── _typography.scss # Typography styles
    ├── header/
    │   ├── header.php       # Header component
    │   └── _header.scss     # Header styles
    ├── navigation/
    │   ├── navigation.php   # Navigation component
    │   ├── navigation.js    # Navigation JavaScript
    │   └── _navigation.scss # Navigation styles
    ├── hero/
    │   ├── hero.php         # Hero component
    │   └── _hero.scss       # Hero styles
    ├── cards/
    │   ├── cards.php        # Cards component
    │   └── _cards.scss      # Cards styles
    ├── buttons/
    │   └── _buttons.scss    # Button styles
    ├── form/
    │   ├── form.php         # Form component
    │   ├── form-multi.php   # Multi-step form
    │   ├── form.js          # Form JavaScript
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
    └── table/
        ├── table.php        # Table component
        ├── table.js         # Table JavaScript
        └── _table.scss      # Table styles
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

**Option 1: Prepros Import/Concatenation**
Create an `assets/js/build.js` file:
```javascript
// @prepros-prepend components/navigation/navigation.js
// @prepros-prepend components/form/form.js
// @prepros-prepend main.js
```

**Option 2: Simple Build Script**
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

## Best Practices

1. **Keep components focused** - One responsibility per component
2. **Use semantic class names** - `.hero`, `.cards`, `.nav` 
3. **Accept data via PHP variables** - Makes components reusable
4. **Progressive JavaScript** - Enhance, don't require
5. **SCSS organization** - One file per component
6. **Consistent naming** - Same name for folder, files, and CSS classes

This architecture scales from simple static sites to complex applications while maintaining the core Clean Framework principles of semantic HTML and component-based CSS.