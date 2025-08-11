# Clean Framework Philosophy

## The Challenge

CSS frameworks should simplify development, not complicate it. Yet many frameworks lead to HTML like this:

```html
<!-- Complex utility chains -->
<div class="cf-row cf-row-tight cf-equal-height cf-mb-4">
  <div class="cf-col-4 cf-p-2 cf-mx-auto">
    <div class="cf-card cf-card-full cf-card-interactive cf-badge-primary cf-mb-2">
```

This approach creates maintenance challenges and requires extensive framework-specific knowledge.

## Our Approach

Clean means HTML that communicates structure clearly:

```html
<!-- Semantic and readable -->
<div class="hero">
  <h1>Welcome</h1>
  <p>Simple and semantic.</p>
</div>

<div class="cards">
  <div class="card">
    <h3>Feature One</h3>
    <p>Just content.</p>
  </div>
</div>
```

## Core Principles

- **Semantic HTML** - Classes that describe content structure and meaning
- **Intuitive naming** - `.cards`, `.card`, `.hero`, `.nav` map to UI concepts  
- **Focused scope** - 15 essential components, not hundreds of utilities
- **Tool-friendly** - Predictable patterns that work with AI and automation
- **Human-readable** - Code that remains clear to developers over time

## Implementation

1. **15 semantic components** - Cover essential UI patterns without bloat
2. **500 lines of CSS** - Efficient, focused codebase
3. **Consistent patterns** - Predictable structure across all components
4. **Zero configuration** - Include CSS and start building

## Success Metrics

- AI can generate correct HTML without documentation
- Developers can understand markup structure at a glance  
- Designers can interpret layout from HTML alone
- Development is faster than utility-based approaches

These principles guide every design decision.

## The Test

Show someone your HTML without the CSS. If they can understand the page structure and content organization, the semantic approach is working.

---

**Clean Framework: Semantic HTML architecture for modern web development.**