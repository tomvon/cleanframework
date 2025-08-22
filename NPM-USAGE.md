# NPM Installation & Usage Guide

Clean Framework is now fully optimized for NPM distribution, making it easy to integrate into modern build systems and workflows.

## Installation

```bash
npm install cleanframework
```

## Usage Methods

### Method 1: Import Built CSS (Recommended)

For most projects, import the pre-built CSS:

```javascript
// Import CSS in your main JavaScript file
import 'cleanframework/dist/cleanframework.css';

// Or import minified version for production
import 'cleanframework/dist/cleanframework.min.css';
```

### Method 2: Import SCSS for Customization

For advanced users who want to customize themes or variables:

```scss
// Import the source SCSS in your main stylesheet
@use 'cleanframework/style.scss';

// Override CSS custom properties
:root {
  --primary: #your-brand-color;
  --background: #your-background;
}
```

### Method 3: Component-Specific Imports

Import individual component styles:

```scss
// Import specific components only
@use 'cleanframework/components/cards/cards';
@use 'cleanframework/components/buttons/buttons';
@use 'cleanframework/components/navigation/navigation';
```

### Method 4: JavaScript Components

Clean Framework includes interactive JavaScript components:

```javascript
// Import and initialize all components
import CleanFramework from 'cleanframework';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  CleanFramework.init();
});

// Or initialize specific components
if (window.Navigation) {
  window.Navigation.init();
}
```

## Build System Integration

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
```

### Vite

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'cleanframework/style.scss';`
      }
    }
  }
};
```

### Next.js

```javascript
// pages/_app.js
import 'cleanframework/dist/cleanframework.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Nuxt.js

```javascript
// nuxt.config.js
export default {
  css: [
    'cleanframework/dist/cleanframework.css'
  ]
};
```

## Available Files

After installation, you'll have access to:

```
node_modules/cleanframework/
├── dist/
│   ├── cleanframework.css          # Development CSS
│   ├── cleanframework.min.css      # Production CSS
│   ├── cleanframework.js           # Development JS
│   └── cleanframework.min.js       # Production JS
├── components/                     # Source SCSS/JS files
├── style.scss                      # Main SCSS entry point
└── package.json
```

## Development vs Production

**Development:**
```javascript
import 'cleanframework/dist/cleanframework.css';
import 'cleanframework/dist/cleanframework.js';
```

**Production:**
```javascript
import 'cleanframework/dist/cleanframework.min.css';
import 'cleanframework/dist/cleanframework.min.js';
```

## TypeScript Support

While Clean Framework is written in vanilla JavaScript, it works perfectly with TypeScript projects:

```typescript
// types/cleanframework.d.ts
declare global {
  interface Window {
    CleanFramework: any;
    Navigation: any;
    Forms: any;
    // Add other component types as needed
  }
}

export {};
```

## CDN Alternative

If you prefer not to use NPM, Clean Framework is also available via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cleanframework@latest/dist/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/npm/cleanframework@latest/dist/cleanframework.min.js"></script>
```

## Framework Integration Examples

### React

```jsx
import 'cleanframework/dist/cleanframework.css';

function App() {
  return (
    <div className="container">
      <nav className="navigation">
        <div className="navigation-brand">My App</div>
      </nav>
      
      <main className="hero">
        <h1 className="hero-title">Welcome</h1>
        <p className="hero-subtitle">Built with Clean Framework</p>
        <button className="button button-primary">Get Started</button>
      </main>
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div class="container">
    <nav class="navigation">
      <div class="navigation-brand">My App</div>
    </nav>
    
    <main class="hero">
      <h1 class="hero-title">Welcome</h1>
      <p class="hero-subtitle">Built with Clean Framework</p>
      <button class="button button-primary">Get Started</button>
    </main>
  </div>
</template>

<style>
@import 'cleanframework/dist/cleanframework.css';
</style>
```

### Svelte

```svelte
<style>
  @import 'cleanframework/dist/cleanframework.css';
</style>

<div class="container">
  <nav class="navigation">
    <div class="navigation-brand">My App</div>
  </nav>
  
  <main class="hero">
    <h1 class="hero-title">Welcome</h1>
    <p class="hero-subtitle">Built with Clean Framework</p>
    <button class="button button-primary">Get Started</button>
  </main>
</div>
```

## Publishing to NPM

For maintainers, to publish updates:

```bash
# Update version and publish
npm version patch  # or minor/major
npm publish

# The prepublishOnly script automatically runs the build
```

## Benefits of NPM Installation

✅ **Version Management**: Semantic versioning with `npm update`  
✅ **Build Integration**: Works with all modern bundlers  
✅ **Tree Shaking**: Import only what you need  
✅ **Source Maps**: Available for debugging  
✅ **Type Safety**: TypeScript declaration support  
✅ **Dependency Tracking**: Managed through package.json  
✅ **Automated Updates**: Use `npm outdated` to check for updates  

This NPM integration maintains Clean Framework's philosophy of semantic, AI-friendly CSS while making it accessible to modern development workflows.