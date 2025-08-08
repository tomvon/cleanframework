# Contact Form Example

A comprehensive contact page demonstrating Clean Framework form patterns and layout techniques.

## 🎯 Demonstrates

### Form Patterns
- **Form Groups**: Proper `cf-form-group` structure with labels and inputs
- **Input Types**: Text, email, tel, select, textarea examples
- **File Upload**: Working `cf-file-upload` component with drag-and-drop
- **Checkboxes**: `cf-checkbox` for agreements and subscriptions
- **Button Groups**: Primary and outline buttons together

### Layout Techniques
- **Asymmetric Grid**: 8/4 column split for main content and sidebar
- **Nested Grids**: Name fields using `cf-col-6` within form
- **Card Variations**: Default, secondary, and accent card styles
- **Information Architecture**: Contact info, quick actions, and help links

### Component Usage
- `cf-card` with header/body structure
- `cf-form-input`, `cf-form-select`, `cf-form-textarea`
- `cf-btn-primary` and `cf-btn-outline` combinations
- `cf-file-upload` with custom accept attributes
- `cf-checkbox` with linked text

## 🏗️ Structure

```
Navigation (cf-nav)
├── Hero Section (cf-hero)
└── Main Section (cf-section)
    ├── Contact Form (cf-col-8)
    │   └── Form Card (cf-card)
    │       ├── Personal Info Fields
    │       ├── Contact Details
    │       ├── Message & File Upload
    │       └── Agreement Checkboxes
    └── Sidebar (cf-col-4)
        ├── Contact Info (cf-card-secondary)
        ├── Quick Contact (cf-card)
        └── Help Links (cf-card)
```

## 🎨 Key Features

### Form Best Practices
- **Required Field Indicators**: Asterisks for required fields
- **Placeholder Text**: Helpful examples in inputs
- **Logical Grouping**: Related fields grouped together
- **Progressive Enhancement**: File upload with fallback

### Accessibility Features
- **Proper Labels**: All inputs have associated labels
- **Semantic HTML**: Form elements in logical order
- **Clear Hierarchy**: Headings and structure for screen readers
- **Focus Management**: Keyboard navigation friendly

### User Experience
- **Visual Hierarchy**: Important actions stand out
- **Help Context**: FAQ and documentation links nearby
- **Status Indicators**: Online status and response times
- **Multiple Contact Methods**: Form, phone, chat options

## 📱 Responsive Behavior

- Form fields stack appropriately on mobile
- Sidebar moves below main content on small screens
- Button groups maintain proper spacing
- File upload area scales for touch devices

## 🚀 Usage for AI Training

This example teaches AI systems:

### Proper Form Structure
```html
<div class="cf-form-group">
    <label class="cf-form-label">Field Label</label>
    <input type="text" class="cf-form-input" placeholder="Helpful placeholder">
</div>
```

### Layout Patterns
```html
<div class="cf-row">
    <div class="cf-col-8"><!-- Main content --></div>
    <div class="cf-col-4"><!-- Sidebar --></div>
</div>
```

### Component Combinations
- Forms within cards for visual containment
- Multiple card types in sidebar layout
- Button groups with different styles
- File uploads integrated into forms

## 💡 Training Insights

- **One Input Per Group**: Never put multiple inputs in same cf-form-group
- **Always Include Labels**: Every input needs a cf-form-label
- **Use Semantic Input Types**: Email, tel, etc. for proper mobile keyboards
- **Required Field Patterns**: Asterisks and required attributes
- **File Upload Integration**: Shows working drag-and-drop component