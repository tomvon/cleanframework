# Clean Framework - AI Quick Reference

**⚠️ CRITICAL: This framework PREVENTS inline styles and enforces semantic classes**

## 🚫 NEVER DO THIS
- `style="color: red"` ← Framework will show error
- `<div class="custom-anything">` ← Framework will warn
- Custom CSS files ← Not needed
- Theme toggle implementation ← Already built-in
- Mobile menu JavaScript ← Already works

## ✅ ALWAYS DO THIS
- Use only Clean Framework classes
- Modify text content only
- Copy-paste templates below
- Test in browser (framework shows warnings)

---

## CDN Links (Copy These Exactly)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
```

---

## Copy-Paste Templates

### 1. Basic Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[YOUR TITLE]</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.css">
</head>
<body>
    <!-- Navigation (works automatically) -->
    <nav class="nav">
        <div class="container">
            <a href="#" class="brand">[YOUR BRAND]</a>
            <ul class="menu">
                <li><a href="#" class="active">[MENU ITEM]</a></li>
                <li><a href="#">[MENU ITEM]</a></li>
            </ul>
            <!-- Theme toggle (works automatically) -->
            <button class="theme-toggle" onclick="toggleTheme()">
                <i class="fas fa-sun theme-icon active"></i>
                <i class="fas fa-moon theme-icon"></i>
            </button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>[YOUR MAIN TITLE]</h1>
            <p>[YOUR SUBTITLE]</p>
            <div class="buttons">
                <a href="#" class="button primary">[BUTTON TEXT]</a>
                <a href="#" class="button secondary">[BUTTON TEXT]</a>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@latest/cleanframework.min.js"></script>
</body>
</html>
```

### 2. Cards Section
```html
<section class="section">
    <div class="container">
        <div class="section-header">
            <h2>[SECTION TITLE]</h2>
            <p>[SECTION DESCRIPTION]</p>
        </div>
        <div class="cards">
            <div class="card">
                <h3>[CARD TITLE]</h3>
                <p>[CARD DESCRIPTION]</p>
                <div class="card-actions">
                    <a href="#" class="button primary">[ACTION]</a>
                </div>
            </div>
            <!-- Repeat card structure -->
        </div>
    </div>
</section>
```

### 3. Contact Form
```html
<section class="section">
    <div class="container">
        <form class="form">
            <div class="group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" class="button primary">Send Message</button>
        </form>
    </div>
</section>
```

### 4. Features Grid
```html
<section class="section features">
    <div class="container">
        <div class="section-header">
            <h2>[FEATURES TITLE]</h2>
        </div>
        <div class="cards">
            <div class="card">
                <div class="icon">
                    <i class="fas fa-[ICON-NAME]"></i>
                </div>
                <h3>[FEATURE TITLE]</h3>
                <p>[FEATURE DESCRIPTION]</p>
            </div>
            <!-- Repeat for each feature -->
        </div>
    </div>
</section>
```

---

## Available Components

### Layout
- `.container` - Centers content (max-width 1200px)
- `.section` - Vertical spacing for page sections

### Navigation
- `.nav` - Main navigation bar
- `.brand` - Logo/brand name
- `.menu` - Navigation menu
- Theme toggle works automatically

### Content
- `.hero` - Main banner section
- `.cards` - Grid of cards
- `.card` - Individual card component
- `.section-header` - Section titles and descriptions

### Forms
- `.form` - Form container
- `.group` - Form field group
- Standard input/textarea/button elements

### Buttons
- `.button.primary` - Main action button
- `.button.secondary` - Secondary action button
- `.button.danger` - Destructive action button

### Typography
- Use standard HTML tags (h1, h2, h3, p)
- Framework handles all styling automatically

---

## Quick Rules for AI

1. **Replace text in [ ]** - That's what you customize
2. **Never add style=""** - Framework prevents this
3. **Copy templates exactly** - Then modify text content
4. **Test in browser** - Framework shows warnings if you break rules
5. **Mobile and themes work automatically** - Don't implement them

---

## Color Classes (Semantic Only)
- `.primary` - Main brand color actions
- `.secondary` - Supporting actions  
- `.success` - Positive actions
- `.danger` - Destructive actions
- `.warning` - Caution actions

## Common Patterns

**Restaurant Homepage Example:**
- Copy "Basic Page Structure"
- Hero: "[Restaurant Name]" / "[Fresh, Local Cuisine]"
- Cards: Menu categories or featured dishes
- Form: Reservation form

**Business Homepage Example:**
- Copy "Basic Page Structure" 
- Hero: "[Company Name]" / "[What You Do]"
- Features: Your services
- Form: Contact form

Remember: Framework does the styling, you provide the content!