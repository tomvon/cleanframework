# AI Development Guidelines for Clean Framework

## 🎯 Purpose
This document is for AI assistants working on developing and maintaining Clean Framework itself. It contains critical guidelines and principles that must be followed when modifying the framework, documentation, or demo pages.

**Note**: This is different from `AI_README.md`, which is for AI assistants helping users implement Clean Framework in their projects.

## 🏗️ Core Development Principles

### 1. Always Dogfood
**CRITICAL**: Clean Framework must use its own components everywhere possible.
- ✅ Documentation page MUST use Clean Framework classes
- ✅ Demo page MUST showcase all framework features
- ✅ Code examples MUST use `cf-code` blocks with copy functionality
- ❌ NEVER use custom CSS when framework classes exist
- ❌ NEVER use inline styles

### 2. Maintain Consistency
- Every new component must follow the `.cf-[component]` naming convention
- All interactive components need corresponding JavaScript in `clean-framework.js`
- Use CSS variables for all colors, spacing, and sizing
- Maintain the signature left-border accent pattern on cards

### 3. Documentation Synchronization
When making ANY changes to the framework:
1. Update `clean-framework.css` with the new styles
2. Update `clean-framework-demo.html` to showcase the feature
3. Update `documentation.html` with usage examples
4. Update `README.md` if it's a major feature
5. Update `AI_README.md` with AI-specific guidance
6. Run visual checks on both light and dark modes

## 📋 Development Checklist

### Before Making Changes
- [ ] Read recent commits to understand current state
- [ ] Check all existing components to avoid duplication
- [ ] Verify the change aligns with framework philosophy

### When Adding New Components
- [ ] Follow the existing naming convention exactly
- [ ] Add to appropriate section in CSS file
- [ ] Include all necessary variants and states
- [ ] Add responsive behavior
- [ ] Test in both light and dark modes
- [ ] Add demo to `clean-framework-demo.html`
- [ ] Document in `documentation.html`
- [ ] Update `AI_README.md` with usage patterns

### When Fixing Issues
- [ ] Identify root cause (not just symptoms)
- [ ] Check if fix affects other components
- [ ] Test across different screen sizes
- [ ] Verify dark mode compatibility
- [ ] Update relevant documentation

### After Making Changes
- [ ] All files are synchronized
- [ ] No broken examples in documentation
- [ ] Demo page renders correctly
- [ ] Both themes work properly
- [ ] No console errors

## 🚨 Common Issues and Solutions

### Modal Positioning
- **Issue**: Modals appearing inside card containers
- **Solution**: Always place modals at body level, outside flex containers
- **Prevention**: Add comments in demo files warning about placement

### Button Styling Conflicts
- **Issue**: Multiple button classes causing style conflicts
- **Solution**: Base `.cf-btn` should have default styles, variants override
- **Prevention**: Test all button combinations in demo

### Grid Spacing
- **Issue**: Grid columns missing padding
- **Solution**: All numbered columns (cf-col-1 through cf-col-12) must include padding
- **Prevention**: Use consistent padding variables

### Typography Inheritance
- **Issue**: Nested elements not inheriting proper styles
- **Solution**: Define styles at appropriate specificity levels
- **Prevention**: Test deeply nested content structures

## 🎨 Design System Rules

### Color Usage
- Primary actions: `var(--cf-primary)`
- Success states: `var(--cf-secondary)`
- Destructive actions: `var(--cf-danger)`
- Warnings: `var(--cf-warning)`
- Information: `var(--cf-info)`

### Spacing System
- Use only defined spacing variables
- Maintain consistent component padding
- Follow the spacing scale (xs, sm, md, lg, xl, 2xl)

### Component Patterns
- Cards: Always have left border accent
- Buttons: Transform on hover with subtle shadow
- Forms: Consistent padding and focus states
- Modals: Centered with backdrop, smooth transitions

## 📝 Code Style Guidelines

### CSS Organization
```css
/* Section header with clear separation */
/* ========================================
   SECTION NAME
   ======================================== */

/* Base component */
.cf-component {
    /* Layout properties first */
    display: flex;
    position: relative;
    
    /* Box model */
    padding: var(--cf-spacing-md);
    margin: 0;
    
    /* Visual properties */
    background: var(--cf-white);
    color: var(--cf-dark);
    
    /* Typography */
    font-size: var(--cf-font-size-base);
    
    /* Transitions last */
    transition: var(--cf-transition);
}

/* Variants follow base */
.cf-component-variant { }

/* States come last */
.cf-component:hover { }
```

### JavaScript Patterns
```javascript
// Function names clearly indicate purpose
window.toggleComponent = function(componentId) {
    const component = document.getElementById(componentId);
    if (component) {
        component.classList.toggle('active');
    }
};

// Always handle edge cases
// Always prevent default behaviors when needed
// Always clean up (remove listeners, restore states)
```

## 🔄 Version Control Guidelines

### Commit Messages
- Be specific about what changed
- Reference the component affected
- Mention if docs were updated

Examples:
- ✅ "Fix modal positioning issue when inside flex containers"
- ✅ "Add interactive button animations (shake, pulse)"
- ✅ "Update typography system with blockquote and list styles"
- ❌ "Fix stuff"
- ❌ "Update CSS"

### Testing Before Commit
1. Open demo page in browser
2. Test all affected components
3. Toggle between light/dark modes
4. Check mobile responsiveness
5. Verify documentation examples work

## 🐛 Debugging Tips

### CSS Issues
- Use browser DevTools to inspect computed styles
- Check CSS variable inheritance
- Verify selector specificity
- Look for conflicting rules

### JavaScript Issues
- Check console for errors
- Verify event listeners are attached
- Test state management
- Ensure proper cleanup

### Cross-browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Check CSS Grid support and fallbacks
- Verify JavaScript compatibility

## 📚 Resources

### Internal Files
- `clean-framework.css` - The complete framework
- `clean-framework.js` - Interactive functionality
- `clean-framework-demo.html` - Component showcase
- `documentation.html` - Usage documentation
- `README.md` - Public documentation
- `AI_README.md` - AI implementation guide

### Key Sections to Understand
1. CSS Variables (top of CSS file)
2. Base reset and typography
3. Component structure patterns
4. Responsive breakpoints
5. Dark mode implementation

## 🚀 Extending the Framework

Clean Framework is a work in progress and should continuously evolve. When adding new components:

### Adding New Components:
1. **Follow the existing naming convention** exactly
2. **Use CSS custom properties** for all theming
3. **Include consistent design elements** (signature accents, shadows, spacing)
4. **Provide responsive behavior** with proper breakpoints
5. **Add proper documentation** to all relevant files
6. **Test thoroughly** in both light and dark modes

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
    margin: var(--cf-spacing-md) 0;
}

/* Signature left border accent */
.cf-notification::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--cf-border-width);
    background: var(--cf-info);
}

/* Variants following the pattern */
.cf-notification-success::before { background: var(--cf-secondary); }
.cf-notification-danger::before { background: var(--cf-danger); }
.cf-notification-warning::before { background: var(--cf-warning); }

/* Interactive states */
.cf-notification-dismissible {
    padding-right: calc(var(--cf-spacing-lg) + 2rem);
}

.cf-notification-close {
    position: absolute;
    top: var(--cf-spacing-sm);
    right: var(--cf-spacing-sm);
    background: transparent;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--cf-gray-600);
    transition: var(--cf-transition);
}

.cf-notification-close:hover {
    color: var(--cf-gray-900);
}
```

### Documentation Requirements:
When adding components, update ALL of these files:
1. **clean-framework.css** - Add the component styles
2. **clean-framework-demo.html** - Show the component in action
3. **documentation.html** - Add usage documentation with examples
4. **AI_README.md** - Add class names to the reference lists
5. **README.md** - Update "What's Included" if it's a major addition
6. **examples/** - Create or update examples that demonstrate the new component

## 📁 Examples Library Management

The examples library is critical for AI training and must be maintained alongside framework development.

### Examples Workflow
1. **New Framework Features** → Always create example usage
2. **Framework Issues Found** → Check if examples expose the issue
3. **Examples Issues Found** → Fix in framework, not with custom CSS
4. **Pattern Discovery** → Document in examples for future reference

### When Adding New Examples:
- [ ] Create complete HTML page (no lorem ipsum)
- [ ] Write detailed README.md explaining patterns
- [ ] Use ONLY Clean Framework classes (no custom CSS)
- [ ] Include proper semantic HTML structure
- [ ] Test in both light and dark modes
- [ ] Update examples/README.md with new entry
- [ ] Add to AI_README.md learning resources

### Examples Categories:
- **examples/basic/** - Fundamental patterns (landing, contact, pricing)
- **examples/business/** - Real business sites (SaaS, agency, restaurant)
- **examples/ecommerce/** - Online store patterns (catalog, cart, product)
- **examples/applications/** - App-like interfaces (dashboard, profile, admin)
- **examples/components/** - Advanced component combinations

### Dogfooding Through Examples:
If examples can't be built with Clean Framework classes alone, the framework is incomplete. Examples should:
- ✅ Expose framework limitations
- ✅ Drive new component development  
- ✅ Validate framework completeness
- ❌ Never use custom CSS workarounds

## ⚠️ Never Forget

1. **Dogfood everything** - If Clean Framework can do it, use Clean Framework
2. **Document everything** - Undocumented features don't exist
3. **Test everything** - Both themes, all screen sizes
4. **Keep it clean** - Follow the established patterns
5. **Synchronize files** - All documentation must match implementation
6. **Framework evolves** - Clean Framework is always a work in progress

---

Remember: Clean Framework is designed to be predictable and consistent. Every decision should reinforce these qualities. When in doubt, choose the approach that maintains consistency with existing patterns.