# Clean Framework - The Manifesto

## What Went Wrong

We built exactly what we set out to destroy: another utility-first framework polluted with hundreds of classes. We turned semantic HTML into this:

```html
<!-- This is NOT clean -->
<div class="cf-row cf-row-tight cf-equal-height cf-mb-4">
  <div class="cf-col-4 cf-p-2 cf-mx-auto">
    <div class="cf-card cf-card-full cf-card-interactive cf-badge-primary cf-mb-2">
```

This is Tailwind with a `cf-` prefix. This is the opposite of clean.

## What Clean Actually Means

Clean means HTML that reads like English:

```html
<!-- This IS clean -->
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

## The Real Vision

- **Semantic HTML first** - Structure that tells a story
- **Component-based CSS** - `.cards`, `.card`, `.hero`, `.nav`  
- **No utility pollution** - Maybe 15 classes total
- **AI-friendly patterns** - Predictable and obvious
- **Human-readable code** - No mental translation required

## What We Build

1. **~15 semantic components** - Not 800+ utility classes
2. **~500 lines of CSS** - Not 4,600 lines
3. **Obvious patterns** - AI can predict without training
4. **Beautiful defaults** - It just works out of the box

## Success Metrics

- Can AI generate correct HTML without seeing the CSS?
- Does the HTML tell the story of the content?
- Would a designer understand the structure?
- Is it faster than vanilla CSS?

If the answer to any is "no", we've failed again.

## The Test

The ultimate test: Show someone the HTML without the CSS. Can they understand what the page is supposed to look like? If yes, we've succeeded.

---

**Clean Framework v2: Semantic HTML. Component CSS. No Bullshit.**