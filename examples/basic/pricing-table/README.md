# Pricing Table Example

A comprehensive pricing page with interactive monthly/yearly toggle, feature comparison table, and FAQ section.

## 🎯 Demonstrates

### Pricing Card Patterns
- **Card Variations**: Default, primary, and accent styling
- **Featured Plan**: Scale and badge effects for highlighted option
- **Pricing Display**: Monthly/yearly toggle functionality
- **Feature Lists**: Check/cross icons with proper styling
- **Call-to-Action**: Button variations within cards

### Advanced Layouts
- **Comparison Table**: Responsive table within card container
- **Interactive Toggle**: Custom button group for plan switching
- **FAQ Grid**: Two-column question and answer layout
- **CTA Section**: Centered promotional card

### Component Integration
- `cf-card` with header, body, footer structure
- `cf-btn` groups and variations
- Table styling within Clean Framework
- Icon usage with Font Awesome

## 🏗️ Structure

```
Navigation (cf-nav)
├── Hero Section (cf-hero)
├── Pricing Toggle (custom button group)
├── Pricing Cards (cf-row with cf-col-4)
│   ├── Starter (cf-card)
│   ├── Professional (cf-card-primary + featured styling)
│   └── Enterprise (cf-card)
├── Feature Comparison (table in cf-card)
├── FAQ Section (cf-card grid)
└── CTA Section (cf-card-primary)
```

## 🎨 Key Features

### Interactive Elements
- **Monthly/Yearly Toggle**: JavaScript-powered pricing switch
- **Featured Plan Highlight**: Visual emphasis with scaling and badges
- **Responsive Tables**: Horizontal scroll on mobile
- **Consistent Icons**: Check/cross system for features

### Advanced Styling Techniques
- **Card Scaling**: Transform scale for featured plan
- **Badge Positioning**: Absolute positioned "Most Popular" badge
- **Table Enhancement**: Clean Framework integration with custom table
- **Button Groups**: Pill-style toggle switcher

### Real-World Patterns
- **Tier Differentiation**: Clear value proposition per plan
- **Feature Comparison**: Complete feature matrix
- **FAQ Integration**: Common questions with answers
- **Social Proof Elements**: "Join thousands" messaging

## 📱 Responsive Behavior

- Cards stack vertically on mobile devices
- Table scrolls horizontally on small screens
- Toggle buttons maintain touch-friendly sizing
- FAQ cards adapt to single column layout

## 🚀 Usage for AI Training

This example teaches AI systems:

### Pricing Card Structure
```html
<article class="cf-card">
    <div class="cf-card-header">
        <!-- Plan name and price -->
    </div>
    <div class="cf-card-body">
        <!-- Feature list -->
    </div>
    <div class="cf-card-footer">
        <!-- CTA button -->
    </div>
</article>
```

### Feature List Pattern
```html
<ul style="list-style: none; padding: 0;">
    <li class="cf-mb-3" style="display: flex; align-items: center;">
        <i class="fas fa-check" style="color: var(--cf-secondary); margin-right: 0.75rem;"></i>
        <span>Feature name</span>
    </li>
</ul>
```

### Interactive Toggle
```html
<div style="display: inline-flex; background: var(--cf-gray-100); border-radius: 2rem; padding: 0.25rem;">
    <button class="cf-btn cf-btn-sm cf-btn-primary" onclick="toggleFunction()">Option 1</button>
    <button class="cf-btn cf-btn-sm" onclick="toggleFunction()">Option 2</button>
</div>
```

### Table in Card
```html
<div class="cf-card">
    <div class="cf-card-body" style="padding: 0;">
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <!-- Table content -->
            </table>
        </div>
    </div>
</div>
```

## 💡 Training Insights

### Pricing Page Essentials
- **Clear Value Hierarchy**: Features increase with price
- **Visual Emphasis**: Featured plan stands out
- **Interactive Elements**: Toggle enhances user experience
- **Complete Information**: Comparison table removes doubts
- **Trust Building**: FAQ addresses common concerns

### Clean Framework Integration
- **Card Footers**: Buttons in card footers span full width
- **Icon Consistency**: Font Awesome icons with framework colors
- **Spacing System**: Consistent margins and padding
- **Color Variables**: Uses framework color palette
- **Responsive Tables**: Overflow handling for mobile

This example demonstrates how to build complex, interactive pricing pages using only Clean Framework classes and minimal custom JavaScript.