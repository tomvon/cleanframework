# Landing Page Example

A complete startup landing page showcasing essential Clean Framework patterns.

## 🎯 Demonstrates

### Core Patterns
- **Navigation**: Standard `cf-nav` with responsive toggle and theme switcher
- **Hero Section**: `cf-hero` with proper title, subtitle, and button styling
- **Card Grids**: `cf-row` and `cf-col-*` layout with card variations
- **Forms**: Proper `cf-form-group` structure with labels and inputs
- **Typography**: Semantic headings, paragraphs, and lists

### Component Usage
- `cf-card` with header, body, and footer sections
- `cf-card-primary` and `cf-card-secondary` variants
- `cf-btn-outline` buttons in hero
- `cf-btn-primary` for call-to-action buttons
- `cf-form-input`, `cf-form-select` for form elements

### Layout Techniques
- `cf-container` for content width management
- `cf-row` and `cf-col-*` for responsive grid layouts
- `cf-section` for consistent vertical spacing
- `cf-text-center` for centered content
- Utility classes: `cf-mb-*`, `cf-mt-*` for spacing

## 🏗️ Structure

```
Navigation (cf-nav)
├── Hero Section (cf-hero)
├── Features (cf-section with cf-card grid)
├── Stats & Testimonial (mixed layout)
├── Pricing (cf-card grid with variants)
├── Contact Form (cf-form in cf-card)
└── Footer (cf-section with dark styling)
```

## 🎨 Key Features

- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Dark Mode Ready**: Uses CSS custom properties for theming
- **Semantic HTML**: Proper use of `nav`, `section`, `article` elements
- **Accessibility**: ARIA labels and semantic structure
- **Clean Framework Philosophy**: No custom CSS, uses only framework classes

## 📱 Responsive Behavior

- Navigation collapses to hamburger menu on mobile
- Card grids stack on smaller screens
- Form maintains proper spacing across devices
- Typography scales appropriately

## 🚀 Usage for AI Training

This example shows AI systems:
- How to structure a complete page with Clean Framework
- Proper class combinations and nesting
- Real-world content patterns (not lorem ipsum)
- Component variations and when to use them
- Semantic HTML structure with Clean Framework classes

## 💡 Pattern Notes

- Cards use signature left-border accent automatically
- Buttons inherit proper hover states and transitions  
- Forms follow one-input-per-group pattern
- Color variants use framework CSS variables
- Spacing uses consistent utility classes