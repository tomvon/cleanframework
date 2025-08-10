# Clean Framework v2

**Semantic HTML. Component CSS. No Bullshit.**

Clean Framework v2 is a complete rewrite focused on semantic HTML patterns and component-based CSS. No utility pollution. No complexity. Just clean, predictable code that works.

## The Problem

Modern CSS frameworks have gone insane:

```html
<!-- This is NOT clean -->
<div class="flex flex-col lg:flex-row gap-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
```

This is utility pollution. This is mental overhead. This is the opposite of clean.

## The Solution

Semantic HTML that reads like English:

```html
<!-- This IS clean -->
<div class="cards">
  <div class="card">
    <h3>Simple Feature</h3>
    <p>Just write what you mean.</p>
  </div>
</div>
```

## Core Components

Clean Framework v2 includes essential semantic components:

**Layout & Structure:**
- `.nav` - Navigation bars with theme support
- `.hero` - Hero sections with call-to-action
- `.section` - Page sections
- `.container` - Content containers
- `.footer` - Page footers

**Content & UI:**
- `.cards` / `.card` - Card grid containers and individual cards
- `.buttons` / `.button` - Button containers and individual buttons
- `.form` - Form containers with comprehensive field styling
- `.modal` - Modal dialogs and overlays
- `.dropdown` - Dropdown menus and selects
- `.table` - Data tables with sorting and pagination

**Features:**
- Dark/light/system theme switching
- Multi-step forms with validation
- Responsive design across all components
- Component-based SCSS architecture

That's it. No `.btn-outline-secondary-lg-hover-active` nonsense.

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="nav">
        <div class="container">
            <a href="#" class="brand">Your Brand</a>
            <ul class="menu">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>Welcome</h1>
            <p>This is clean.</p>
            <div class="buttons">
                <button class="button primary">Get Started</button>
                <button class="button secondary">Learn More</button>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="cards">
                <div class="card">
                    <h3>Feature One</h3>
                    <p>Simple and semantic.</p>
                </div>
                <div class="card">
                    <h3>Feature Two</h3>
                    <p>No mental translation required.</p>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Your Company</p>
        </div>
    </footer>
    
    <script src="main.js"></script>
</body>
</html>
```

## Why Clean v2?

### ✅ Semantic HTML
HTML that tells the story of your content, not your styling choices.

### ✅ Component-Based CSS  
`.cards`, `.card`, `.nav` - components that make sense.

### ✅ AI-Friendly
Predictable patterns that AI can generate without framework-specific training.

### ✅ Minimal Footprint
~500 lines of CSS. No bloat. Fast loading.

### ✅ Beautiful Defaults
It just works out of the box. No configuration needed.

### ✅ Human Readable
Show someone the HTML without CSS - they'll understand the structure.

## The Test

The ultimate test: **Show someone your HTML without the CSS.** Can they understand what the page is supposed to look like? 

If yes, you're using Clean Framework correctly.  
If no, you're probably overcomplicating it.

## Examples

- **[index.php](index.php)** - Complete landing page showing all components

## Browser Support

- Chrome 90+
- Firefox 88+ 
- Safari 14+
- Edge 90+

## License

MIT License. Use it, abuse it, make it better.

---

**Clean Framework v2 - Because your HTML should tell a story, not solve a puzzle.**