# AI Implementation Guide: Clean Framework

This guide helps AI systems understand how to use Clean Framework when building projects. It contains patterns, conventions, and best practices for generating Clean Framework code.

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
.cf-btn-primary                   /* Primary variant */
.cf-btn-secondary                 /* Secondary variant */
.cf-btn-outline                   /* Outline variant */
.cf-btn-sm                        /* Size modifier */
.cf-btn-lg                        /* Large size modifier */
.cf-btn.cf-loading                /* Loading state */
.cf-btn-interactive-shake         /* Shake animation on hover */
.cf-btn-interactive-pulse         /* Pulse animation on hover */

/* Forms */
.cf-form-group                    /* Form group container */
.cf-form-input                    /* Input element */
.cf-form-label                    /* Label element */
.cf-form-textarea                 /* Textarea element */
.cf-form-select                   /* Select element */
.cf-form-node                     /* Multi-step form section */
.cf-form-node-active              /* Active form step */

/* File Upload */
.cf-file-upload                   /* File upload container */
.cf-file-upload-area              /* Drag/drop area */
.cf-file-upload-icon              /* Upload icon */
.cf-file-upload-text              /* Main text */
.cf-file-upload-hint              /* Hint text */
.cf-file-preview                  /* Preview container */
.cf-file-item                     /* Individual file item */
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
    <div class="cf-form-group">
        <label class="cf-form-label">Select</label>
        <select class="cf-form-select">
            <option>Option 1</option>
            <option>Option 2</option>
        </select>
    </div>
    <div class="cf-form-group">
        <label class="cf-form-label">Message</label>
        <textarea class="cf-form-textarea" placeholder="Enter message"></textarea>
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

## 📝 Typography System

Clean Framework includes comprehensive typography styles:

### Typography Elements
```html
<!-- Headings with proper hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Rich text elements -->
<p>Paragraph with <strong>bold</strong> and <em>italic</em> text.</p>

<!-- Lists -->
<ul>
    <li>Unordered list item</li>
    <li>Nested support
        <ul>
            <li>Nested item</li>
        </ul>
    </li>
</ul>

<ol>
    <li>Ordered list item</li>
    <li>With proper numbering</li>
</ol>

<!-- Blockquotes -->
<blockquote>
    <p>Quoted content with proper styling.</p>
    <cite>Source Name</cite>
</blockquote>

<!-- Definition lists -->
<dl>
    <dt>Term</dt>
    <dd>Definition with proper spacing and indentation.</dd>
</dl>

<!-- Code blocks -->
<div class="cf-code">
    <button class="cf-code-copy" onclick="copyCode(this)">Copy</button>
    <pre>const example = 'code';
console.log(example);</pre>
</div>

<!-- Inline code -->
<p>Use <code class="cf-code-inline">cf-btn</code> for buttons.</p>
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
           <div class="cf-col-4"><!-- 33% width with padding --></div>
           <div class="cf-col-8"><!-- 67% width with padding --></div>
       </div>
   </div>
   ```
   
   **Note**: All numbered columns (cf-col-1 through cf-col-12) include horizontal padding for proper spacing.

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
<!-- Modal (place outside of flex containers) -->
<div class="cf-modal" id="myModal">
    <div class="cf-modal-content">
        <div class="cf-modal-header">
            <h3 class="cf-modal-title">Modal Title</h3>
            <button class="cf-modal-close" onclick="closeModal('myModal')">&times;</button>
        </div>
        <div class="cf-modal-body">
            <p>Modal content</p>
        </div>
    </div>
</div>

<!-- Interactive Buttons -->
<div class="cf-btn-interactive-wrapper">
    <button class="cf-btn cf-btn-interactive-shake">Shake Effect</button>
    <button class="cf-btn cf-btn-interactive-pulse">Pulse Effect</button>
</div>

<!-- File Upload with JavaScript API -->
<div class="cf-file-upload" id="myUpload">
    <input type="file" multiple accept="image/*,.pdf">
    <div class="cf-file-upload-area">
        <i class="cf-file-upload-icon fas fa-cloud-upload-alt"></i>
        <div class="cf-file-upload-text">Click to upload or drag and drop</div>
        <div class="cf-file-upload-hint">PNG, JPG, PDF up to 10MB</div>
    </div>
</div>

<script>
// File Upload API
const upload = document.getElementById('myUpload');

// Listen for file selection
cfFileUpload.onFileSelected(upload, function(files) {
    // Handle files - upload to server, etc.
});

// Get selected files
const files = cfFileUpload.getFiles(upload);

// Clear all files
cfFileUpload.clearFiles(upload);
</script>

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

## 🎯 Common AI Pitfalls to Avoid

### Modal Placement
```html
<!-- WRONG: Modal inside card/flex container -->
<div class="cf-card">
    <div class="cf-modal">...</div>
</div>

<!-- CORRECT: Modal at body level -->
<body>
    <div class="cf-modal">...</div>
</body>
```

### Button Variants
```html
<!-- WRONG: Using non-existent classes -->
<button class="cf-btn-blue">Button</button>

<!-- CORRECT: Use framework variants -->
<button class="cf-btn cf-btn-primary">Button</button>
```

### Grid Columns
```html
<!-- All columns include padding automatically -->
<div class="cf-col-4"><!-- Has padding: 0 var(--cf-spacing-md) --></div>
```

## 📄 Complete Page Template

### Basic HTML Structure
Always use this template as your starting point:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/clean-framework.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="cf-nav">
        <div class="cf-container">
            <div class="cf-nav-container">
                <a href="#" class="cf-nav-brand">Your Brand</a>
                <button class="cf-nav-toggle" onclick="toggleNav()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="cf-nav-menu">
                    <li><a href="#" class="cf-nav-link active">Home</a></li>
                    <li><a href="#" class="cf-nav-link">About</a></li>
                    <li><a href="#" class="cf-nav-link">Services</a></li>
                    <li><a href="#" class="cf-nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="cf-hero">
        <div class="cf-container">
            <h1 class="cf-hero-title">Your Hero Title</h1>
            <p class="cf-hero-subtitle">Your compelling subtitle</p>
            <div class="cf-mt-4">
                <a href="#" class="cf-btn cf-btn-outline cf-btn-lg">Primary Action</a>
                <a href="#" class="cf-btn cf-btn-outline cf-btn-lg">Secondary Action</a>
            </div>
        </div>
    </section>

    <!-- Content Sections -->
    <section class="cf-section">
        <div class="cf-container">
            <h2 class="cf-text-center cf-mb-4">Section Title</h2>
            <div class="cf-row">
                <div class="cf-col-4">
                    <article class="cf-card">
                        <div class="cf-card-header">
                            <h3 class="cf-card-title">Card Title</h3>
                        </div>
                        <div class="cf-card-body">
                            <p>Card content goes here.</p>
                        </div>
                    </article>
                </div>
                <!-- Repeat for more cards -->
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="cf-section">
        <div class="cf-container">
            <div class="cf-row">
                <div class="cf-col-6">
                    <h2>Contact Us</h2>
                    <form>
                        <div class="cf-form-group">
                            <label class="cf-form-label">Name</label>
                            <input type="text" class="cf-form-input" placeholder="Your name">
                        </div>
                        <div class="cf-form-group">
                            <label class="cf-form-label">Email</label>
                            <input type="email" class="cf-form-input" placeholder="your@email.com">
                        </div>
                        <div class="cf-form-group">
                            <label class="cf-form-label">Message</label>
                            <textarea class="cf-form-textarea" placeholder="Your message"></textarea>
                        </div>
                        <button type="submit" class="cf-btn cf-btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@master/clean-framework.js"></script>
</body>
</html>
```

### Key Template Rules:
1. **Always include Font Awesome** for icons
2. **Use semantic HTML** elements (`nav`, `section`, `article`)
3. **Wrap content** in `.cf-container` and `.cf-row`
4. **Include JavaScript** before closing body tag
5. **NO custom CSS needed** - use framework classes only

## 🎨 Available Utility Classes

### Spacing (Margins & Padding)
```css
.cf-mt-1, .cf-mt-2, .cf-mt-3, .cf-mt-4, .cf-mt-5    /* margin-top */
.cf-mb-1, .cf-mb-2, .cf-mb-3, .cf-mb-4, .cf-mb-5    /* margin-bottom */
.cf-ml-1, .cf-ml-2, .cf-ml-3, .cf-ml-4, .cf-ml-5    /* margin-left */
.cf-mr-1, .cf-mr-2, .cf-mr-3, .cf-mr-4, .cf-mr-5    /* margin-right */
.cf-pt-1, .cf-pt-2, .cf-pt-3, .cf-pt-4, .cf-pt-5    /* padding-top */
.cf-pb-1, .cf-pb-2, .cf-pb-3, .cf-pb-4, .cf-pb-5    /* padding-bottom */
```

### Text Utilities
```css
.cf-text-center     /* text-align: center */
.cf-text-left       /* text-align: left */
.cf-text-right      /* text-align: right */
.cf-text-bold       /* font-weight: bold */
.cf-text-normal     /* font-weight: normal */
.cf-text-light      /* font-weight: light */

/* Font sizes */
.cf-text-xs, .cf-text-sm, .cf-text-base, .cf-text-lg, .cf-text-xl, .cf-text-2xl, .cf-text-3xl, .cf-text-4xl

/* Colors */
.cf-text-primary, .cf-text-secondary, .cf-text-danger, .cf-text-warning, .cf-text-info, .cf-text-muted, .cf-text-dark, .cf-text-light

/* Icons */
.cf-icon-sm, .cf-icon-base, .cf-icon-lg, .cf-icon-xl, .cf-icon-2xl, .cf-icon-3xl

/* Lists */
.cf-list-none, .cf-list-unstyled
```

### Layout Utilities
```css
.cf-container       /* Main container with max-width */
.cf-row            /* Flex row container */
.cf-col-1 to .cf-col-12  /* Column widths */
.cf-section        /* Section spacing */
```

### Component Classes (DO NOT INVENT NEW ONES)
```css
/* Navigation */
.cf-nav, .cf-nav-container, .cf-nav-brand, .cf-nav-menu, .cf-nav-link, .cf-nav-toggle

/* Hero */
.cf-hero, .cf-hero-title, .cf-hero-subtitle

/* Cards */
.cf-card, .cf-card-header, .cf-card-body, .cf-card-footer, .cf-card-title
.cf-card-primary, .cf-card-secondary, .cf-card-accent

/* Buttons */
.cf-btn, .cf-btn-primary, .cf-btn-secondary, .cf-btn-outline, .cf-btn-sm, .cf-btn-lg

/* Forms */
.cf-form-group, .cf-form-label, .cf-form-input, .cf-form-textarea, .cf-form-select

/* File Upload */
.cf-file-upload, .cf-file-upload-area, .cf-file-upload-icon, .cf-file-upload-text

/* Modals */
.cf-modal, .cf-modal-content, .cf-modal-header, .cf-modal-body, .cf-modal-title

/* Grid */
.cf-grid, .cf-grid-2, .cf-grid-3, .cf-grid-4
```

**IMPORTANT**: Only use classes listed above. Do not create or use classes like:
- `cf-bg-light` (doesn't exist)
- `cf-hero-image` (doesn't exist) 
- `cf-card-icon` (doesn't exist)
- `cf-footer` (doesn't exist)
- `cf-social-icons` (doesn't exist)

## 🚨 Critical Mistakes to Avoid

### ❌ WRONG Examples:
```html
<!-- Don't create custom CSS -->
<style>
:root { --primary-color: #667eea; }
.btn-primary { background: var(--primary-color) !important; }
</style>

<!-- Don't use non-existent classes -->
<div class="cf-bg-light">...</div>        <!-- cf-bg-light doesn't exist -->
<div class="cf-hero-image">...</div>      <!-- cf-hero-image doesn't exist -->
<div class="cf-card-icon">...</div>       <!-- cf-card-icon doesn't exist -->

<!-- Don't break HTML structure -->
<div class="cf-nav-container">            <!-- Missing <nav> wrapper -->
    <a href="#" class="cf-nav-brand">Brand</a>
</nav>                                    <!-- Closes tag that was never opened -->

<!-- Don't use wrong form structure -->
<div class="cf-form-group">
    <input class="cf-form-input">         <!-- Missing label -->
    <input class="cf-form-input">         <!-- Multiple inputs in one group -->
</div>
```

### ✅ CORRECT Examples:
```html
<!-- Use framework colors through existing classes -->
<button class="cf-btn cf-btn-primary">Primary</button>
<button class="cf-btn cf-btn-secondary">Secondary</button>

<!-- Use existing utility classes -->
<div class="cf-text-center cf-mt-4 cf-mb-3">Centered with spacing</div>

<!-- Proper HTML structure -->
<nav class="cf-nav">
    <div class="cf-container">
        <div class="cf-nav-container">
            <!-- nav content -->
        </div>
    </div>
</nav>

<!-- Correct form structure -->
<div class="cf-form-group">
    <label class="cf-form-label">Name</label>
    <input type="text" class="cf-form-input">
</div>
<div class="cf-form-group">
    <label class="cf-form-label">Email</label>
    <input type="email" class="cf-form-input">
</div>
```

## 📚 Learning Resources

### Primary References (Read These First!)
- **Examples Library**: `examples/` - **START HERE** for real-world implementations
- **Basic Examples**: `examples/basic/` - Landing pages, forms, pricing tables
- **AI Implementation Guide**: This document for patterns and conventions

### Additional Resources
- **Main Documentation**: `README.md`
- **Component Showcase**: `clean-framework-demo.html`
- **Interactive Documentation**: `documentation.html`
- **Framework File**: `clean-framework.css` (Complete framework)
- **JavaScript**: `clean-framework.js` (Interactive functionality)

## 🏗️ Examples Library (CRITICAL FOR AI)

The `examples/` directory contains complete, working implementations that show proper Clean Framework usage:

### Why Examples Matter for AI
- **Real Patterns**: Shows actual component combinations, not just isolated components
- **Context Learning**: Demonstrates how components work together in complete pages
- **Training Data**: Designed specifically for AI pattern recognition
- **No Custom CSS**: Pure Clean Framework implementations

### Available Examples
- **examples/basic/landing-page/** - Complete startup homepage with hero, features, pricing
- **examples/basic/contact-form/** - Advanced form patterns with file upload
- **examples/basic/pricing-table/** - Interactive pricing with monthly/yearly toggle

### How to Use Examples
1. **Study the HTML structure** - See how components nest and combine
2. **Read the README files** - Understand the patterns being demonstrated  
3. **Copy proven patterns** - Use these as templates for your own implementations
4. **Follow the conventions** - These examples show the "right way" to use Clean Framework

---

This framework is designed to be predictable and intuitive for AI systems while maintaining human readability and maintainability. Every design decision prioritizes clarity and consistency over cleverness.