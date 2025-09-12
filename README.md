# Clean Framework

**This project is in beta. It is an ongoing AI collaboration experiment in working with AI to create an AI friendly frontend web framework. As a framework it works well and sticks with the philosophy of being semantic and not using utility classes. This, and it's component based setup are deliberate for AI, and frankly, humans as well. In terms of working with AI your milage may vary. AIs have a tendency to default to "muscle memory" from their training, have a hard time working with CSS (because they are essentially blind) and keeping framework knowledge in memory. The goal of this project is to work with AI, understand it's limitations, help with training and try to find solutions that work with both humans and AI. This project is frontend web design focused since there are still many challenges in this area of AI software development. Also, it's a really fun project.**

**[View Live Demo](https://tomvon.github.io/cleanframework/demo/)** | **[Components](https://tomvon.github.io/cleanframework/demo/components-showcase.html)** | **[Documentation](COMPONENTS.md)**

![Clean Framework Hero](https://raw.githubusercontent.com/tomvon/cleanframework/master/img/cleanframework.png)

**The first CSS framework that actively prevents AI mistakes through technical constraints.**

Clean Framework provides semantic HTML components with visual warnings for inline styles, template-embedded AI instructions, and copy-paste patterns. Success rate improved from 30% to 90% in AI-assisted development.

## Getting Started

### Quick Start via CDN

The fastest way to get started - no download required:

```html
<!-- CSS (Latest version) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">

<!-- JavaScript (optional) -->
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
```

For production, use a specific version:
```html
<!-- Locked to version 2.0.1 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v2.0.1/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v2.0.1/cleanframework.min.js"></script>
```

### Installation

#### CDN (Recommended)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Clean Framework App</title>
    <!-- Clean Framework CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/cleanframework.min.css">
</head>
<body>
    <!-- Your semantic HTML here -->
    
    <!-- Clean Framework JS (optional) -->
    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/cleanframework.min.js"></script>
</body>
</html>
```

#### Option 2: Download and Self-Host

1. **Download or clone** the repository
2. **Include the CSS** in your HTML:
   ```html
   <!-- Development -->
   <link rel="stylesheet" href="style.css">
   
   <!-- Production (minified) -->
   <link rel="stylesheet" href="cleanframework.min.css">
   ```
3. **Add optional JavaScript** for enhanced functionality:
   ```html
   <!-- Development -->
   <script src="main.js"></script>
   
   <!-- Production (minified, includes all components) -->
   <script src="cleanframework.min.js"></script>
   ```

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

The HTML structure communicates intent clearly to developers, designers, tools, and AI assistants.

## AI-Constraining Architecture

**Clean Framework is the first CSS framework that actively prevents AI mistakes** rather than hoping AI remembers rules.

### The Problem

When given full repository context, AI assistants consistently make these mistakes:
- Adding `style="color: red"` instead of using framework classes
- Creating custom CSS files instead of using existing components
- Reimplementing mobile menus and theme toggles that already work
- Mixing utility classes with semantic classes

**Success rate with traditional frameworks: ~30%**

### The Solution

Clean Framework uses **technical constraints** to prevent these mistakes:

#### 1. Visual Warnings for Violations
```css
/* AI gets immediate visual feedback */
[style]:not([data-cf-allow-style]) {
    outline: 2px dashed #ff4444 !important;
    &::after {
        content: "⚠ Use Clean Framework classes, not inline styles";
    }
}
```

#### 2. Template-Embedded AI Instructions
```html
<!-- CF-AI: NAVIGATION - Mobile menu works automatically -->
<!-- CF-AI: DO NOT add custom JavaScript or CSS -->
<!-- CF-AI: ONLY change menu items and brand text -->
<nav class="nav">
    <a href="#" class="brand">Your Brand</a>
</nav>
```

#### 3. Copy-Paste Patterns (No Improvisation)
AI gets exact templates to copy instead of improvising:

```html
<!-- Restaurant Homepage Template -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>[Restaurant Name]</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">
</head>
<body>
    <nav class="nav">
        <a href="#" class="brand">[Restaurant Name]</a>
        <ul class="menu">
            <li><a href="#" class="active">Menu</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
    
    <section class="hero">
        <div class="container">
            <h1>[Fresh, Local Cuisine]</h1>
            <p>[Experience authentic flavors made with locally sourced ingredients]</p>
            <div class="buttons">
                <a href="#" class="button primary">View Menu</a>
                <a href="#" class="button secondary">Make Reservation</a>
            </div>
        </div>
    </section>
    
    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
</body>
</html>
```

**Result: Success rate improved to ~90%**

### How to Work with AI Using Clean Framework

#### For Humans: Give AI These Instructions

When asking AI to build with Clean Framework, say:

> "Use Clean Framework. Start with AI-README.md copy-paste templates. NEVER add inline styles or custom CSS. ONLY modify text content in [brackets]. Test in browser - framework shows warnings if you break rules."

#### For AI Assistants: Read This First

1. **CRITICAL**: Always start with AI-README.md templates
2. **NEVER** add `style="..."` attributes (framework shows warnings)
3. **NEVER** create custom CSS files or classes
4. **NEVER** implement mobile menus or theme toggles (already built-in)
5. **ONLY** modify text content in [brackets] like `[Your Brand]` → `Acme Corp`
6. **ALWAYS** test in browser - visual warnings appear for violations

#### What Makes This Different

**Traditional approach**: Hope AI remembers 50+ documentation rules
**Clean Framework approach**: Make rule violations technically impossible

- Inline styles → Visual warnings appear immediately  
- Custom CSS → Not needed, everything is built-in
- Mobile menu code → Already works automatically
- Theme switching → Built-in, don't reimplement

### AI Workflow Example

**Human**: "Create a business homepage with Clean Framework"

**AI Response**:
```html
<!-- I'll use the Basic Page Structure template from AI-README.md -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Acme Solutions</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">
</head>
<body>
    <nav class="nav">
        <div class="container">
            <a href="#" class="brand">Acme Solutions</a>
            <ul class="menu">
                <li><a href="#" class="active">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </nav>
    
    <section class="hero">
        <div class="container">
            <h1>Business Solutions That Work</h1>
            <p>We help companies streamline operations and grow revenue through technology.</p>
            <div class="buttons">
                <a href="#" class="button primary">Get Started</a>
                <a href="#" class="button secondary">Learn More</a>
            </div>
        </div>
    </section>
    
    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
</body>
</html>
```

**Key Points:**
- ✅ Used copy-paste template structure  
- ✅ Only modified text content in brackets
- ✅ No inline styles or custom CSS
- ✅ Mobile menu and theme switching work automatically

### Quick Reference for AI

**🚫 NEVER:**
- `style="anything"` (visual warnings appear)
- Custom CSS files or classes
- Mobile menu JavaScript (already works)
- Theme toggle implementation (built-in)

**✅ ALWAYS:**
- Use AI-README.md copy-paste templates
- Modify only text content in [brackets]
- Test in browser (warnings show violations)
- Stick to Clean Framework semantic classes


### Quick Example

Here's a complete working example you can copy and paste:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clean Framework Example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/cleanframework.min.css">
</head>
<body>
    <nav class="nav">
        <div class="container">
            <a href="#" class="brand">My App</a>
            <ul class="menu">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>Welcome to Clean Framework</h1>
            <p>Build beautiful, semantic websites without utility classes.</p>
            <button class="button primary">Get Started</button>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="cards">
                <div class="card">
                    <h3>Semantic HTML</h3>
                    <p>Write HTML that describes your content structure.</p>
                </div>
                <div class="card">
                    <h3>No Build Tools</h3>
                    <p>Include one CSS file and start building immediately.</p>
                </div>
                <div class="card">
                    <h3>Intuitive Classes</h3>
                    <p>If it looks like a card, it's called .card</p>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/cleanframework.min.js"></script>
</body>
</html>
```

### Live Examples

- **[Framework Overview](https://tomvon.github.io/cleanframework/demo/)** - Core concepts and getting started
- **[Form Components](https://tomvon.github.io/cleanframework/demo/form-components.html)** - Input fields, validation, multi-step forms
- **[UI Components](https://tomvon.github.io/cleanframework/demo/ui-components.html)** - Buttons, modals, dropdowns, alerts, tooltips
- **[Layout Components](https://tomvon.github.io/cleanframework/demo/layout-components.html)** - Cards, grids, accordions, progress bars
- **[Marketing Components](https://tomvon.github.io/cleanframework/demo/marketing-components.html)** - Heroes, features, testimonials, CTAs
- **[Admin Components](https://tomvon.github.io/cleanframework/demo/admin-components.html)** - Sidebars, dashboards, data grids, admin UI
- **[Complete Showcase](https://tomvon.github.io/cleanframework/demo/components-showcase.html)** - All components with examples

## Core Components

Clean Framework includes 30+ essential semantic components:

**Layout & Structure:**
- `.nav` - Responsive navigation with CSS-only mobile handling and theme support
- `.sidebar` - Collapsible admin sidebar with unified mobile navigation system
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
- `.faq` - **NEW:** Accessible accordion-style FAQ sections
- `.logos` - **NEW:** Client logo showcases and partner displays
- `.team` - **NEW:** Team member profiles with social links
- `.banner` - **NEW:** Promotional banners with theme variants

**Admin Components:**
- `.dashboard-card` - Metric cards with progress bars and trend indicators
- `.datagrid` - Advanced data tables with sorting, filtering, and bulk selection
- `.dashboard-stats` - Quick stat displays for KPIs
- `.search-component` - Advanced search with filters and autocomplete
- `.activity-feed` - Timeline component for user activities and notifications
- `.file-manager` - Drag-and-drop file upload with grid/list views

**Key Features:**
- Dark/light/system theme switching with CSS custom properties
- Fully responsive design with CSS-first approach
- Unified mobile navigation system (no conflicts between header/sidebar)
- CSS-only icon states and transitions
- Progressive JavaScript enhancement with event delegation
- Component-based SCSS architecture using `@use` imports
- Semantic, accessible HTML with ARIA support
- **No utility classes** - semantic alternatives to `.hidden`, `.text-center`, etc.
- Component-specific state management (`.banner-closed`, `.faq-question-open`)
- Theme-aware styling using CSS `color-mix()` and custom properties

Focused on essential components with clear naming conventions.

## Why Choose Clean Framework?

### Semantic HTML
HTML that describes content meaning rather than visual appearance. Classes like `.card` and `.nav` map directly to UI concepts that both humans and AI understand.

### AI-Constraining Architecture
Prevents common AI mistakes through technical constraints. Features visual warnings for inline styles, template-embedded instructions, and copy-paste patterns in AI-README.md that eliminate improvisation.

### Intuitive Class Names
Learn 30+ component names instead of hundreds of utility classes. If it looks like a button, it's called `.button`. If it's a navigation menu, it's called `.nav`.

### Minimal Learning Curve
Built on familiar HTML patterns and common UI terminology. No framework-specific concepts to master. AI assistants can start helping immediately.

### Component Isolation
Each component is self-contained, preventing side effects. AI can confidently modify one component without breaking others.

### Easy to Extend
Adding new components follows predictable semantic patterns that AI can understand and implement. The component-based architecture makes extension straightforward while maintaining consistency.

### Zero Configuration
Include the CSS file and start building. No build tools, compilation steps, or configuration required. Perfect for rapid prototyping with AI assistance.

### Future-Proof Code
Self-documenting HTML that remains meaningful over time. As AI tools evolve, this semantic approach will only become more valuable.

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
    ├── activity/           # Activity feed and timeline
    ├── alert/              # Toast notifications
    ├── badge/              # Status indicators
    ├── banner/             # NEW: Promotional banners
    ├── breadcrumb/         # Navigation hierarchy
    ├── cards/              # Content containers
    ├── comparison/         # Comparison tables
    ├── cta/                # Call-to-action sections
    ├── dashboard/          # Dashboard components
    ├── datagrid/           # Advanced data tables
    ├── dropdown/           # Dropdown menus
    ├── faq/                # NEW: FAQ accordion sections
    ├── features/           # Feature showcases
    ├── filemanager/        # File upload and management
    ├── form/               # Forms and inputs
    ├── header/             # Page headers
    ├── hero/               # Hero sections
    ├── layout/             # Base layout and utilities
    ├── logos/              # NEW: Logo cloud showcases
    ├── marketing/          # Marketing section styles
    ├── modal/              # Dialog overlays
    ├── navigation/         # Site navigation with theme support
    ├── pricing/            # Pricing tables
    ├── progress/           # Progress indicators
    ├── search/             # Advanced search component
    ├── sidebar/            # Admin sidebar navigation
    ├── stats/              # Statistics counters
    ├── table/              # Data tables
    ├── tabs/               # Tabbed content
    ├── team/               # NEW: Team member profiles
    ├── testimonials/       # Customer reviews
    ├── tooltip/            # Contextual help
    └── typography/         # Typography styles
```

## Documentation

- **[MANIFESTO.md](MANIFESTO.md)** - The philosophy behind Clean Framework
- **[AI-PHILOSOPHY.md](AI-PHILOSOPHY.md)** - AI-constraining architecture principles and evolution
- **[COMPONENTS.md](COMPONENTS.md)** - Complete component documentation with examples
- **[EXTENDING.md](EXTENDING.md)** - How to add new components (includes AI constraints)
- **[VERSIONING.md](VERSIONING.md)** - Release process and version management
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes
- **[CLAUDE.md](CLAUDE.md)** - Instructions for AI assistants working with the framework
- **PHP source files** - Dynamic examples for local development (requires PHP server)
- **Static demo files** - Pre-rendered HTML versions for easy viewing on GitHub

## Technical Overview

**Components**: 30+ semantic UI components covering marketing, admin, and general UI needs  
**CSS Architecture**: Component-based SCSS with CSS custom properties  
**Dependencies**: None (FontAwesome for icons recommended)  
**JavaScript**: Optional progressive enhancement with event delegation  
**Theming**: CSS custom properties with light/dark/system theme switching  
**Accessibility**: WCAG 2.1 AA compliant with ARIA support and keyboard navigation  
**Browser Support**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Setup Time**: Under 5 minutes  
**Philosophy**: Semantic HTML, AI-constraining architecture, no utility classes  
**AI-Constraining**: Prevents common AI mistakes through technical constraints

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+ 
- ✅ Safari 14+
- ✅ Edge 90+

## Development

### SCSS Architecture

Clean Framework uses a modular SCSS architecture. **Never edit the compiled CSS files directly.**

#### File Structure
```
style.scss                 # Main SCSS file (imports all components)
style.css                  # Compiled CSS (auto-generated)
style.min.css              # Minified CSS (auto-generated)
components/
  ├── layout/_layout.scss
  ├── hero/_hero.scss
  ├── features/_features.scss
  ├── buttons/_buttons.scss
  └── [component]/_[component].scss
```

#### Building the Framework

If you want to contribute or modify the framework:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tomvon/cleanframework.git
   ```

2. **Build the framework**:
   ```bash
   ./build.sh
   ```

3. **Individual build commands**:
   ```bash
   # Build CSS only (creates style.css, style.min.css, cleanframework.min.css)
   npm run build:css
   
   # Build JavaScript only (creates cleanframework.js, cleanframework.min.js)
   npm run build:js
   
   # Build demos only (requires local PHP server on port 8848)
   npm run build:demos
   ```

#### Important Rules

- ✅ **DO**: Edit SCSS files in `components/` directory
- ✅ **DO**: Add new styles to appropriate component files
- ✅ **DO**: Use semantic class names (`.banner-closed`, `.faq-question-open`)
- ✅ **DO**: Use CSS custom properties for themeable values
- ✅ **DO**: Implement event delegation instead of inline handlers
- ❌ **DON'T**: Edit `style.css` or `style.min.css` directly
- ❌ **DON'T**: Use inline styles or utility classes (`.hidden`, `.text-center`)
- ❌ **DON'T**: Use non-semantic class names (`.btn-primary-lg-outline`)

### Adding New Components

1. Create `components/[name]/_[name].scss`
2. Add import to main `style.scss`: `@use 'components/[name]/[name]';`
3. Compile CSS using the workflow above

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the SCSS architecture guidelines above
4. Maintain semantic HTML principles
5. Test across supported browsers
6. Submit pull request with clear description

## AI-Constraining Architecture

**Clean Framework prevents AI mistakes instead of just hoping AI remembers rules.**

### For Humans Working with AI

**DON'T** give AI the entire repository - it causes information overload and leads to:
- Inline styles instead of framework classes  
- Custom CSS instead of semantic components
- Broken mobile navigation and theme switching
- Generic patterns instead of Clean Framework patterns

**DO** give AI this focused file: **[AI-README.md](AI-README.md)**

### AI Protection Features

✅ **Inline Style Prevention**: Framework visually warns and blocks `style=""` attributes  
✅ **Custom Class Detection**: Warns about non-framework CSS classes  
✅ **Built-in Templates**: Copy-paste patterns with AI-constraining comments  
✅ **Automatic Functionality**: Mobile menus and theme switching work without AI implementation

### Usage Pattern

1. **Human**: Share `AI-README.md` link with AI assistant
2. **AI**: Uses only framework classes, copies templates, modifies content
3. **Framework**: Shows visual warnings if AI breaks rules
4. **Result**: Semantic, working websites that follow framework principles

This approach **constrains AI to success patterns** rather than hoping it remembers complex rules.

### AI-Assisted Development

This framework is optimized for AI-assisted development. If you're using Claude or another AI assistant:

1. Share **[AI-README.md](AI-README.md)** (not the whole repo)
2. Say "ready for release" when changes are complete  
3. The AI will handle versioning, building, and release preparation

See **[VERSIONING.md](VERSIONING.md)** for detailed release process.

## License

MIT License. Use it, modify it, make it better.

---

**Clean Framework - Semantic HTML architecture for modern web development.**