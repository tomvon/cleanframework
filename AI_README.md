# AI Developer Guide: Clean Framework

This guide is designed to help AI systems understand, work with, and enhance the Clean Framework effectively.

## 🤖 Framework Philosophy for AI Systems

Clean Framework was designed with AI-assisted development in mind. Every class name, component structure, and design pattern follows predictable, semantic conventions that AI systems can easily understand and generate.

### Core AI-Friendly Principles

1. **Semantic Class Names**: Every class clearly describes its purpose
   - `cf-card` = card component
   - `cf-btn-primary` = primary button variant
   - `cf-form-group` = form element container

2. **Consistent Naming Patterns**: All classes follow predictable conventions
   - Base component: `.cf-component`
   - Variants: `.cf-component-variant`  
   - States: `.cf-component.cf-active`
   - Utilities: `.cf-utility-value`

3. **Semantic HTML Structure**: Markup tells a story about content, not appearance

## 📋 Class Naming Convention Reference

### Component Structure Pattern
```css
.cf-[component]                    /* Base component */
.cf-[component]-[variant]          /* Component variant */
.cf-[component]-[element]          /* Child element */
.cf-[component].cf-[state]         /* Component state */
```

### Examples
```css
/* Cards */
.cf-card                          /* Base card */
.cf-card-secondary                /* Secondary variant */
.cf-card-header                   /* Card header element */
.cf-card.cf-interactive           /* Interactive state */

/* Buttons */
.cf-btn                           /* Base button */
.cf-btn-outline                   /* Outline variant */
.cf-btn-sm                        /* Size modifier */
.cf-btn.cf-loading                /* Loading state */

/* Forms */
.cf-form-group                    /* Form group container */
.cf-form-input                    /* Input element */
.cf-form-label                    /* Label element */
.cf-form-node                     /* Multi-step form section */
```

## 🏗️ Component Architecture

### HTML Structure Patterns

#### Standard Card Pattern
```html
<div class="cf-card [variant]">
    <div class="cf-card-header">
        <h3 class="cf-card-title">Title</h3>
    </div>
    <div class="cf-card-body">
        <p>Content</p>
    </div>
</div>
```

#### Form Pattern
```html
<form class="cf-form">
    <div class="cf-form-group">
        <label class="cf-form-label">Label Text</label>
        <input type="text" class="cf-form-input" placeholder="Placeholder">
    </div>
    <button type="submit" class="cf-btn cf-btn-primary">Submit</button>
</form>
```

#### Navigation Pattern
```html
<nav class="cf-nav">
    <div class="cf-container">
        <div class="cf-nav-container">
            <a href="#" class="cf-nav-brand">Brand</a>
            <ul class="cf-nav-menu">
                <li><a href="#" class="cf-nav-link [active]">Link</a></li>
            </ul>
        </div>
    </div>
</nav>
```

## 🎨 Design System Variables

All visual aspects are controlled by CSS custom properties. When generating components, reference these variables:

### Color Variables
```css
--cf-primary: #667eea;           /* Primary brand color */
--cf-secondary: #48bb78;         /* Secondary/success color */
--cf-danger: #f56565;            /* Error/danger color */
--cf-warning: #ed8936;           /* Warning color */
--cf-info: #4299e1;              /* Info color */
```

### Spacing Variables
```css
--cf-spacing-xs: 0.25rem;        /* 4px */
--cf-spacing-sm: 0.5rem;         /* 8px */
--cf-spacing-md: 1rem;           /* 16px */
--cf-spacing-lg: 1.5rem;         /* 24px */
--cf-spacing-xl: 2rem;           /* 32px */
--cf-spacing-2xl: 3rem;          /* 48px */
```

### Typography Variables
```css
--cf-font-size-sm: 0.875rem;     /* 14px */
--cf-font-size-base: 1rem;       /* 16px */
--cf-font-size-lg: 1.125rem;     /* 18px */
--cf-font-size-xl: 1.25rem;      /* 20px */
--cf-font-size-2xl: 1.5rem;      /* 24px */
--cf-font-size-3xl: 2rem;        /* 32px */
--cf-font-size-4xl: 2.5rem;      /* 40px */
```

## 🧩 Component Generation Guidelines

### When generating new components:

1. **Use semantic HTML first**
   ```html
   <!-- Good -->
   <article class="cf-card">
       <header class="cf-card-header">
           <h2 class="cf-card-title">Article Title</h2>
       </header>
       <section class="cf-card-body">
           <p>Article content...</p>
       </section>
   </article>
   
   <!-- Avoid -->
   <div class="cf-card">
       <div class="cf-card-header">
           <div class="cf-card-title">Article Title</div>
       </div>
   </div>
   ```

2. **Follow the signature design pattern**
   - Cards automatically get left-border accents
   - Use `.cf-card-secondary`, `.cf-card-danger`, etc. for color variants
   - No manual border styling needed

3. **Use layout utilities**
   ```html
   <div class="cf-container">
       <div class="cf-row">
           <div class="cf-col-4"><!-- 33% width --></div>
           <div class="cf-col-8"><!-- 67% width --></div>
       </div>
   </div>
   ```

## 🔧 Advanced Component Patterns

### Multi-Step Forms
```html
<div class="cf-form-container">
    <div class="cf-form-progress">
        <div class="cf-form-progress-bar">
            <div class="cf-form-progress-fill" style="width: 33%"></div>
        </div>
    </div>
    
    <div class="cf-form-node cf-form-node-active">
        <div class="cf-form-node-header">
            <h3 class="cf-form-node-title">Step Title</h3>
            <p class="cf-form-node-description">Step description</p>
        </div>
        <!-- Form fields -->
        <div class="cf-form-navigation">
            <div class="cf-form-nav-left">
                <button class="cf-btn cf-btn-outline">Previous</button>
            </div>
            <div class="cf-form-nav-right">
                <button class="cf-btn">Next</button>
            </div>
        </div>
    </div>
</div>
```

### Interactive Components
```html
<!-- Modal -->
<div class="cf-modal" id="myModal">
    <div class="cf-modal-content">
        <div class="cf-modal-header">
            <h3 class="cf-modal-title">Modal Title</h3>
            <button class="cf-modal-close">&times;</button>
        </div>
        <div class="cf-modal-body">
            <p>Modal content</p>
        </div>
    </div>
</div>

<!-- Tabs -->
<div class="cf-tabs">
    <div class="cf-tab-nav">
        <button class="cf-tab active">Tab 1</button>
        <button class="cf-tab">Tab 2</button>
    </div>
    <div class="cf-tab-content active">Content 1</div>
    <div class="cf-tab-content">Content 2</div>
</div>
```

## 📐 Grid Systems

### Standard CSS Grid
```html
<div class="cf-grid cf-grid-3">  <!-- 3 columns -->
    <div class="cf-card">Item 1</div>
    <div class="cf-card">Item 2</div>
    <div class="cf-card">Item 3</div>
</div>
```

### Advanced Subgrid Layouts
```html
<!-- Article with sidebar -->
<div class="cf-grid-article">
    <main class="cf-grid-article-main">
        <header class="cf-card">Header</header>
        <article class="cf-card">Main Content</article>
    </main>
    <aside class="cf-grid-article-sidebar">
        <div class="cf-card">Sidebar Item</div>
    </aside>
</div>

<!-- Magazine layout -->
<div class="cf-grid-magazine">
    <article class="cf-grid-magazine-hero">Hero Content</article>
    <article class="cf-grid-magazine-feature">Feature</article>
    <div class="cf-grid-magazine-secondary">
        <article class="cf-card">Secondary 1</article>
        <article class="cf-card">Secondary 2</article>
    </div>
</div>
```

## 🎯 AI Generation Best Practices

### DO:
- Use semantic HTML elements (`article`, `section`, `header`, `nav`)
- Reference CSS variables in custom styles
- Follow the `.cf-component-element` naming pattern
- Use existing utility classes before creating new ones
- Include proper ARIA attributes for accessibility

### DON'T:
- Create inline styles (use CSS variables instead)
- Use non-semantic div/span elements when semantic options exist
- Invent new naming patterns (stick to the convention)
- Duplicate existing component functionality
- Forget the signature left-border on card-like components

## 🔍 Testing Generated Components

### Validation Checklist:
1. **Semantic HTML**: Does the markup tell a content story?
2. **Accessibility**: Are ARIA labels and roles included?
3. **Responsiveness**: Does it work on mobile/tablet/desktop?
4. **Design Consistency**: Does it match the framework aesthetic?
5. **Class Naming**: Do class names follow the convention?

### Browser Compatibility
- Supports modern browsers with graceful fallbacks
- CSS Grid with Subgrid fallbacks included
- Uses CSS custom properties (IE11+ support)

## 🚀 Extending the Framework

### Adding New Components:
1. Follow the existing naming convention
2. Use CSS custom properties for theming
3. Include consistent design elements (accents, shadows)
4. Provide responsive behavior
5. Add proper documentation

### Example New Component:
```css
/* New component following framework patterns */
.cf-notification {
    background: var(--cf-white);
    border-radius: var(--cf-border-radius);
    box-shadow: var(--cf-shadow);
    padding: var(--cf-spacing-lg);
    position: relative;
    overflow: hidden;
}

.cf-notification::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--cf-border-width);
    background: var(--cf-info);
}

.cf-notification-success::before { background: var(--cf-secondary); }
.cf-notification-danger::before { background: var(--cf-danger); }
.cf-notification-warning::before { background: var(--cf-warning); }
```

## 📚 Learning Resources

- **Main Documentation**: `README.md`
- **Component Showcase**: `clean-framework-demo.html`
- **Framework File**: `clean-framework.css` (Complete framework)
- **Examples**: All demo HTML shows proper usage patterns

---

This framework is designed to be predictable and intuitive for AI systems while maintaining human readability and maintainability. Every design decision prioritizes clarity and consistency over cleverness.