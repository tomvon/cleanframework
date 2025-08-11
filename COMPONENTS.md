# Clean Framework Component Guide

Everything you need to know about Clean Framework components. Copy, paste, customize, ship.

## Table of Contents

- [Form Components](#form-components)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Marketing Components](#marketing-components)

---

## Form Components

### Basic Form

Forms that don't make users want to quit your website.

```html
<form class="form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" class="form-control" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" class="form-control" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" class="form-control" rows="4"></textarea>
  </div>
  
  <button type="submit" class="button primary">Submit</button>
</form>
```

### Multi-Step Form

Break long forms into bite-sized pieces. Your users will thank you.

```html
<form class="form-multi">
  <div class="form-steps">
    <div class="step active" data-step="1">
      <span class="step-number">1</span>
      <span class="step-label">Personal</span>
    </div>
    <div class="step" data-step="2">
      <span class="step-number">2</span>
      <span class="step-label">Details</span>
    </div>
  </div>
  
  <div class="form-pages">
    <div class="form-page active" data-page="1">
      <!-- Step 1 fields -->
    </div>
    <div class="form-page" data-page="2">
      <!-- Step 2 fields -->
    </div>
  </div>
  
  <div class="form-navigation">
    <button type="button" class="button secondary" data-prev>Previous</button>
    <button type="button" class="button primary" data-next>Next</button>
  </div>
</form>
```

### Input Types

All HTML5 input types are supported with consistent styling:

- Text inputs: `text`, `email`, `password`, `tel`, `url`, `search`
- Date/time inputs: `date`, `time`, `datetime-local`, `month`, `week`
- Numeric inputs: `number`, `range`
- File inputs: `file`
- Selection inputs: `select`, `checkbox`, `radio`
- Other: `color`, `textarea`

### Validation States

```html
<!-- Valid state -->
<div class="form-group success">
  <label for="valid">Valid Input</label>
  <input type="text" id="valid" class="form-control" value="Valid data">
  <small class="form-feedback">✓ Looks good!</small>
</div>

<!-- Error state -->
<div class="form-group error">
  <label for="invalid">Invalid Input</label>
  <input type="email" id="invalid" class="form-control" value="not-an-email">
  <small class="form-feedback">✗ Please enter a valid email</small>
</div>

<!-- Warning state -->
<div class="form-group warning">
  <label for="warning">Warning Input</label>
  <input type="password" id="warning" class="form-control" value="weak">
  <small class="form-feedback">⚠ Password is weak</small>
</div>
```

---

## UI Components

### Buttons

Buttons that look like buttons and act like buttons. Revolutionary!

```html
<!-- Variants -->
<button class="button primary">Primary</button>
<button class="button secondary">Secondary</button>
<button class="button success">Success</button>
<button class="button warning">Warning</button>
<button class="button danger">Danger</button>

<!-- Sizes -->
<button class="button primary small">Small</button>
<button class="button primary">Regular</button>
<button class="button primary large">Large</button>

<!-- With icons -->
<button class="button primary">
  <i class="fas fa-rocket"></i> Launch
</button>

<!-- Disabled state -->
<button class="button primary" disabled>Disabled</button>
```

### Modal

Pop-ups that don't make users hate your website.

```html
<!-- Trigger -->
<button class="button primary" data-modal="my-modal">Open Modal</button>

<!-- Modal structure -->
<div class="modal" id="my-modal">
  <div class="modal-dialog">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button class="modal-close" aria-label="Close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Modal content goes here.</p>
    </div>
    <div class="modal-footer">
      <button class="button secondary" data-dismiss>Cancel</button>
      <button class="button primary">Save Changes</button>
    </div>
  </div>
</div>
```

### Dropdown

Menus that actually drop down when you click them.

```html
<div class="dropdown">
  <button class="dropdown-toggle">
    Options <i class="fas fa-chevron-down"></i>
  </button>
  <div class="dropdown-menu">
    <a href="#" class="dropdown-item">Action 1</a>
    <a href="#" class="dropdown-item">Action 2</a>
    <div class="dropdown-divider"></div>
    <a href="#" class="dropdown-item">Separated Action</a>
  </div>
</div>
```

### Table

Data tables that work on mobile. Yes, really.

```html
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td><span class="badge success">Active</span></td>
      <td>
        <button class="button small primary">Edit</button>
      </td>
    </tr>
  </tbody>
</table>

<!-- With pagination -->
<div class="table-pagination">
  <button class="button small secondary" disabled>Previous</button>
  <span class="pagination-info">Page 1 of 5</span>
  <button class="button small secondary">Next</button>
</div>
```

### Tabs

Organize content without making users think too hard.

```html
<div class="tabs">
  <div class="tab-list" role="tablist">
    <button class="tab active" role="tab" data-tab="tab1">Tab 1</button>
    <button class="tab" role="tab" data-tab="tab2">Tab 2</button>
    <button class="tab" role="tab" data-tab="tab3">Tab 3</button>
  </div>
  
  <div class="tab-panels">
    <div class="tab-panel active" id="tab1" role="tabpanel">
      <p>Tab 1 content</p>
    </div>
    <div class="tab-panel" id="tab2" role="tabpanel">
      <p>Tab 2 content</p>
    </div>
    <div class="tab-panel" id="tab3" role="tabpanel">
      <p>Tab 3 content</p>
    </div>
  </div>
</div>
```

### Alert/Toast

Tell users what happened without being annoying about it.

```html
<!-- Static alerts -->
<div class="alert success">
  <i class="fas fa-check-circle"></i>
  <span>Operation completed successfully!</span>
</div>

<div class="alert error">
  <i class="fas fa-times-circle"></i>
  <span>An error occurred.</span>
</div>

<!-- Toast notifications (JavaScript) -->
<script>
showToast('Message sent!', 'success');
showToast('Please try again.', 'error');
</script>
```

### Tooltip

Helpful hints that appear exactly when and where you need them.

```html
<button class="button primary" 
        data-tooltip="This is helpful information"
        data-tooltip-position="top">
  Hover Me
</button>

<!-- Available positions: top, bottom, left, right -->
```

### Badge

Little labels that add just the right amount of visual flair.

```html
<!-- Status badges -->
<span class="badge">Default</span>
<span class="badge primary">Primary</span>
<span class="badge success">Success</span>
<span class="badge warning">Warning</span>
<span class="badge danger">Danger</span>

<!-- With counts -->
<span class="badge primary">Messages <span class="badge-count">5</span></span>
```

---

## Layout Components

### Cards

Perfect little boxes for your content.

```html
<!-- Basic card -->
<div class="card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-content">Card content goes here.</p>
</div>

<!-- With icon -->
<div class="card">
  <div class="card-icon">
    <i class="fas fa-rocket"></i>
  </div>
  <h3 class="card-title">Feature</h3>
  <p class="card-content">Description of the feature.</p>
</div>

<!-- With image -->
<div class="card">
  <img src="image.jpg" alt="Card image" class="card-image">
  <div class="card-body">
    <h3 class="card-title">Image Card</h3>
    <p class="card-content">Content below the image.</p>
    <button class="button primary">Action</button>
  </div>
</div>

<!-- Card grid -->
<div class="cards">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

### Pricing

Pricing tables with featured plans.

```html
<div class="pricing">
  <div class="pricing-card">
    <h3 class="pricing-name">Starter</h3>
    <div class="pricing-price">$9<span class="pricing-period">/month</span></div>
    <p class="pricing-description">Perfect for individuals</p>
    <ul class="pricing-features">
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li class="disabled">Premium Feature</li>
    </ul>
    <button class="button secondary">Get Started</button>
  </div>
  
  <div class="pricing-card featured">
    <div class="pricing-badge">Most Popular</div>
    <h3 class="pricing-name">Pro</h3>
    <div class="pricing-price">$29<span class="pricing-period">/month</span></div>
    <p class="pricing-description">Best for teams</p>
    <ul class="pricing-features">
      <li>All Starter features</li>
      <li>Premium Feature</li>
      <li>Priority Support</li>
    </ul>
    <button class="button primary">Get Started</button>
  </div>
</div>
```

### Accordion

Collapsible content sections.

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false">
      Section 1
      <i class="accordion-icon fas fa-chevron-down"></i>
    </button>
    <div class="accordion-content">
      <p>Content for section 1</p>
    </div>
  </div>
  
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false">
      Section 2
      <i class="accordion-icon fas fa-chevron-down"></i>
    </button>
    <div class="accordion-content">
      <p>Content for section 2</p>
    </div>
  </div>
</div>
```

### Breadcrumb

Navigation hierarchy indicator.

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li class="active">Current Page</li>
  </ol>
</nav>
```

### Progress Bar

Visual progress indicators.

```html
<!-- Basic progress -->
<div class="progress">
  <div class="progress-bar" style="width: 70%">
    <span class="progress-label">70%</span>
  </div>
</div>

<!-- With variants -->
<div class="progress">
  <div class="progress-bar success" style="width: 100%">
    <span class="progress-label">Complete</span>
  </div>
</div>

<!-- Animated (with JS) -->
<div class="progress" data-progress="75">
  <div class="progress-bar primary">
    <span class="progress-label">0%</span>
  </div>
</div>
```

---

## Marketing Components

### Hero

Landing page hero sections.

```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to Our Site</h1>
      <p class="hero-description">
        A compelling description of your product or service.
      </p>
      <div class="hero-buttons">
        <button class="button primary large">Get Started</button>
        <button class="button secondary large">Learn More</button>
      </div>
    </div>
  </div>
</section>

<!-- Small hero variant -->
<section class="hero hero-small">
  <div class="container">
    <h1 class="hero-title">Page Title</h1>
    <p class="hero-description">Page description</p>
  </div>
</section>
```

### Features

Multiple layouts for showcasing features.

```html
<!-- Grid layout -->
<div class="features features-grid">
  <div class="feature">
    <div class="feature-icon">
      <i class="fas fa-rocket"></i>
    </div>
    <h3 class="feature-title">Fast Performance</h3>
    <p class="feature-description">Lightning fast load times.</p>
  </div>
  <!-- More features... -->
</div>

<!-- Alternating layout -->
<div class="features features-alternating">
  <div class="feature">
    <div class="feature-image">
      <img src="feature1.jpg" alt="Feature 1">
    </div>
    <div class="feature-content">
      <h3 class="feature-title">Feature Title</h3>
      <p class="feature-description">Detailed feature description.</p>
      <button class="button primary">Learn More</button>
    </div>
  </div>
  <!-- More features... -->
</div>
```

### Testimonials

Customer reviews and social proof.

```html
<div class="testimonials">
  <h2 class="testimonials-title">What Our Customers Say</h2>
  
  <div class="testimonials-grid">
    <div class="testimonial">
      <div class="testimonial-rating">
        ⭐⭐⭐⭐⭐
      </div>
      <blockquote class="testimonial-content">
        "This product changed our business!"
      </blockquote>
      <cite class="testimonial-author">
        <img src="avatar.jpg" alt="Jane Doe">
        <div>
          <div class="testimonial-name">Jane Doe</div>
          <div class="testimonial-title">CEO, Company</div>
        </div>
      </cite>
    </div>
    <!-- More testimonials... -->
  </div>
</div>
```

### Call-to-Action (CTA)

Conversion-focused sections.

```html
<!-- Simple CTA -->
<div class="cta">
  <h2 class="cta-title">Ready to Get Started?</h2>
  <p class="cta-description">Join thousands of satisfied customers.</p>
  <button class="button primary large">Start Free Trial</button>
</div>

<!-- Split CTA -->
<div class="cta cta-split">
  <div class="cta-content">
    <h2 class="cta-title">Boost Your Productivity</h2>
    <p class="cta-description">Try our tool risk-free for 30 days.</p>
  </div>
  <div class="cta-actions">
    <button class="button primary large">Get Started</button>
  </div>
</div>

<!-- Boxed CTA -->
<div class="cta cta-boxed">
  <h2 class="cta-title">Limited Time Offer</h2>
  <p class="cta-description">Get 50% off your first month.</p>
  <button class="button primary large">Claim Offer</button>
</div>
```

### Stats/Counters

Animated statistics display.

```html
<div class="stats">
  <h2 class="stats-title">Our Impact</h2>
  
  <div class="stats-cards">
    <div class="stat-card" data-count="10000">
      <div class="stat-number">0</div>
      <div class="stat-label">Happy Customers</div>
    </div>
    
    <div class="stat-card" data-count="99.9" data-suffix="%">
      <div class="stat-number">0%</div>
      <div class="stat-label">Uptime</div>
    </div>
    
    <div class="stat-card" data-count="24" data-suffix="/7">
      <div class="stat-number">0/7</div>
      <div class="stat-label">Support</div>
    </div>
  </div>
</div>
```

---

## Theming

Clean Framework supports automatic dark mode with CSS custom properties:

```css
/* Light theme (default) */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --card: #ffffff;
  --card-foreground: #171717;
  --primary: #0ea5e9;
  --primary-foreground: #ffffff;
  /* ... more variables ... */
}

/* Dark theme */
[data-theme="dark"] {
  --background: #0a0a0a;
  --foreground: #ededed;
  --card: #171717;
  --card-foreground: #ededed;
  --primary: #38bdf8;
  --primary-foreground: #003d5c;
  /* ... more variables ... */
}
```

## JavaScript Enhancement

All components work without JavaScript, but some include optional enhancements:

- **Forms**: Multi-step navigation, validation
- **Modals**: Open/close functionality
- **Dropdowns**: Toggle behavior
- **Tables**: Sorting, pagination
- **Tabs**: Tab switching
- **Accordions**: Expand/collapse
- **Tooltips**: Positioning and show/hide
- **Progress**: Animation on scroll
- **Stats**: Count-up animation

## Accessibility

All components follow ARIA guidelines:

- Proper semantic HTML elements
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus management for interactive elements
- Screen reader friendly markup

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

For live examples of all components, visit the demo pages:

- [Form Components](https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/form-components.html)
- [UI Components](https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/ui-components.html)
- [Layout Components](https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/layout-components.html)
- [Marketing Components](https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/marketing-components.html)
- [Complete Showcase](https://htmlpreview.github.io/?https://github.com/tomvon/cleanframework/blob/master/demo/components-showcase.html)