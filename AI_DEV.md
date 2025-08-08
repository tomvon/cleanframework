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

## ⚠️ Never Forget

1. **Dogfood everything** - If Clean Framework can do it, use Clean Framework
2. **Document everything** - Undocumented features don't exist
3. **Test everything** - Both themes, all screen sizes
4. **Keep it clean** - Follow the established patterns
5. **Synchronize files** - All documentation must match implementation

---

Remember: Clean Framework is designed to be predictable and consistent. Every decision should reinforce these qualities. When in doubt, choose the approach that maintains consistency with existing patterns.