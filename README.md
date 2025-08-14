# Clean Framework

**[View Live Demo](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/index.html?v=20250814)** | **[Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/components-showcase.html?v=20250814)** | **[Documentation](COMPONENTS.md)**

**Semantic HTML. Readable CSS.**

Clean Framework provides semantic HTML components with intuitive class names. No cryptic abbreviations or utility classes to memorize.

## The Challenge

Utility-first frameworks result in HTML like this:

```html
<!-- Complex utility chains -->
<div class="flex flex-col lg:flex-row gap-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
```

This approach works but requires memorizing hundreds of class names and creates maintenance challenges.

## Clean Framework Approach

Write HTML that describes content structure:

```html
<!-- Semantic and clear -->
<div class="cards">
  <div class="card">
    <h3>Feature Title</h3>
    <p>Feature description.</p>
  </div>
</div>
```

The HTML structure communicates intent clearly to developers, designers, and tools.

## Getting Started

### Installation

1. **Download or clone** the repository
2. **Include the CSS** in your HTML:
   ```html
   <link rel="stylesheet" href="style.css">
   ```
3. **Add optional JavaScript** for enhanced functionality:
   ```html
   <script src="main.js"></script>
   ```
4. **Start building** with semantic HTML patterns

### Live Examples

- **[Framework Overview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/index.html?v=20250814)** - Core concepts and getting started
- **[Form Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/form-components.html?v=20250814)** - Input fields, validation, multi-step forms
- **[UI Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/ui-components.html?v=20250814)** - Buttons, modals, dropdowns, alerts, tooltips
- **[Layout Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/layout-components.html?v=20250814)** - Cards, grids, accordions, progress bars
- **[Marketing Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/marketing-components.html?v=20250814)** - Heroes, features, testimonials, CTAs
- **[Admin Components](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/admin-components.html?v=20250814)** - Sidebars, dashboards, data grids, admin UI
- **[Complete Showcase](https://htmlpreview.github.io/?https://raw.githubusercontent.com/tomvon/cleanframework/master/demo/components-showcase.html?v=20250814)** - All components with examples

## Core Components

Clean Framework includes 25+ essential semantic components:

**Layout & Structure:**
- `.nav` - Responsive navigation with CSS-only mobile handling and theme support
- `.hero` - Hero sections with call-to-action
- `.section` - Page sections
- `.container` - Content containers
- `.footer` - Page footers
- `.cards` / `.card` - Card layouts and containers
- `.accordion` - Collapsible content sections
- `.breadcrumb` - Navigation hierarchy

**Forms & Inputs:**
- `.form` - Form containers with comprehensive field styling
- `.form-multi` - Multi-step forms with progress tracking
- All HTML5 input types with consistent styling
- Validation states and error handling

**UI Components:**
- `.buttons` / `.button` - Button containers and variants
- `.modal` - Modal dialogs and overlays
- `.dropdown` - Dropdown menus and navigation
- `.table` - Data tables with sorting and pagination
- `.tabs` - Tabbed content organization
- `.alert` / `.toast` - Notifications and alerts
- `.tooltip` - Contextual help tooltips
- `.badge` - Status indicators and labels
- `.progress` - Progress bars and loading states

**Marketing Components:**
- `.testimonials` - Customer reviews with ratings
- `.features` - Feature showcases with multiple layouts
- `.cta` - Call-to-action sections
- `.stats` - Animated statistics and counters
- `.pricing` - Pricing tables and plans

**Admin Components:**
- `.sidebar` - Collapsible sidebar with unified mobile navigation
- `.dashboard-card` - Metric cards with charts
- `.datagrid` - Advanced data tables
- `.dashboard-stats` - Quick stat displays
- More admin components in development

**Key Features:**
- Dark/light/system theme switching
- Fully responsive design with CSS-first approach
- Unified mobile navigation system (no conflicts)
- CSS-only icon states and transitions
- Progressive JavaScript enhancement
- Component-based SCSS architecture
- Semantic, accessible HTML

Focused on essential components with clear naming conventions.

## Quick Start

## Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clean Framework Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="nav">
        <div class="container">
            <a href="#" class="brand">Brand</a>
            <ul class="menu">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Application Title</h1>
                <p class="hero-description">Clear, concise description of purpose.</p>
                <div class="hero-buttons">
                    <button class="button primary">Primary Action</button>
                    <button class="button secondary">Secondary Action</button>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="cards">
                <div class="card">
                    <h3 class="card-title">Feature</h3>
                    <p class="card-content">Feature description.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Company Name</p>
        </div>
    </footer>
    
    <script src="main.js"></script>
</body>
</html>
```

## Why Choose Clean Framework?

### Semantic HTML
HTML that describes content meaning rather than visual appearance. Classes like `.card` and `.nav` map directly to UI concepts.

### Intuitive Class Names
Learn 15 component names instead of hundreds of utility classes. If it looks like a button, it's called `.button`.

### Minimal Learning Curve
Built on familiar HTML patterns and common UI terminology. No framework-specific concepts to master.

### Focused Scope
15 essential components in 500 lines of CSS. Covers common use cases without unnecessary complexity.

### Zero Configuration
Include the CSS file and start building. No build tools, compilation steps, or configuration required.

### Maintainable Code
Self-documenting HTML that remains readable months later. Reduces cognitive load during development.

## The Test

**Core Principle**: HTML structure should be self-explanatory. Good markup tells the content story without requiring CSS knowledge.


## Project Structure

```
cleanframework/
├── README.md                 # This file
├── MANIFESTO.md             # Framework philosophy 
├── COMPONENTS.md            # Detailed component documentation
├── demo/                    # Static HTML demos (GitHub compatible)
│   ├── index.html           # Main landing page demo
│   ├── form-components.html # Form components demo
│   ├── ui-components.html   # UI components demo
│   ├── layout-components.html # Layout components demo
│   ├── marketing-components.html # Marketing components demo
│   └── components-showcase.html # Complete showcase demo
├── index.php                # Landing page (PHP source)
├── form-components.php      # Form components (PHP source)
├── ui-components.php        # UI components (PHP source)
├── layout-components.php    # Layout components (PHP source)
├── marketing-components.php # Marketing components (PHP source)
├── components-showcase.php  # All components (PHP source)
├── style.css               # Compiled CSS (use this in production)
├── style.scss              # Main SCSS source file
├── main.js                 # Progressive JavaScript enhancements
└── components/             # Modular component architecture
    ├── accordion/          # Collapsible content sections
    ├── alert/              # Toast notifications
    ├── badge/              # Status indicators
    ├── breadcrumb/         # Navigation hierarchy
    ├── cards/              # Content containers
    ├── cta/                # Call-to-action sections
    ├── dropdown/           # Dropdown menus
    ├── features/           # Feature showcases
    ├── footer/             # Page footers
    ├── form/               # Forms and inputs
    ├── header/             # Page headers
    ├── hero/               # Hero sections
    ├── modal/              # Dialog overlays
    ├── navigation/         # Site navigation
    ├── pricing/            # Pricing tables
    ├── progress/           # Progress indicators
    ├── stats/              # Statistics counters
    ├── table/              # Data tables
    ├── tabs/               # Tabbed content
    ├── testimonials/       # Customer reviews
    └── tooltip/            # Contextual help
```

## Documentation

- **[MANIFESTO.md](MANIFESTO.md)** - The philosophy behind Clean Framework
- **[COMPONENTS.md](COMPONENTS.md)** - Complete component documentation with examples
- **PHP source files** - Dynamic examples for local development (requires PHP server)
- **Static demo files** - Pre-rendered HTML versions for easy viewing on GitHub

## Technical Overview

**Components**: 20+ semantic UI components  
**CSS Size**: 500 lines of compiled CSS  
**Dependencies**: None  
**JavaScript**: Optional progressive enhancement  
**Theming**: CSS custom properties with automatic dark mode  
**Accessibility**: WCAG 2.1 AA compliant with ARIA support  
**Browser Support**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Setup Time**: Under 5 minutes

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+ 
- ✅ Safari 14+
- ✅ Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Maintain semantic HTML principles
4. Test across supported browsers
5. Submit pull request with clear description

## License

MIT License. Use it, modify it, make it better.

---

**Clean Framework - Semantic HTML architecture for modern web development.**