# Clean Framework

A semantic CSS framework with 30+ components and no utility classes. Class names say what something is (`.card`, `.nav`, `.modal`), not how it looks. Built to be easy for humans and AI assistants to write correctly.

Beta, and an ongoing experiment in working with AI on frontend code.

**[Live Demo](https://tomvon.github.io/cleanframework/demo/)** | **[Components](COMPONENTS.md)** | **[AI-README](AI-README.md)** | **[Changelog](CHANGELOG.md)**

![Clean Framework Hero](https://raw.githubusercontent.com/tomvon/cleanframework/master/img/cleanframework.png)

## Use it

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v3.0.2/cleanframework.min.css">
<script src="https://cdn.jsdelivr.net/gh/tomvon/cleanframework@v3.0.2/cleanframework.min.js"></script>
```

The JavaScript is optional (mobile menu, theme toggle, modals, tabs and so on). Pin a version; `@latest` will pick up breaking changes.

Requires native CSS nesting: Chrome/Edge 120+, Firefox 117+, Safari 17.2+.

## Working with AI

Give your AI assistant **[AI-README.md](AI-README.md)**, not the whole repo. It has copy-paste templates, and the CSS shows a red warning on any element with an inline `style=""`, so mistakes are visible straight away.

## Develop

Plain CSS with native nesting, no preprocessor. Each component lives in `components/<name>/` and `main.css` imports them all, so link `main.css` and refresh while you work.

```bash
npm install
npm run build          # builds cleanframework.min.css and .min.js
npm test               # build + sanity checks (also runs in CI)
npm run create-component
php -S localhost:8848  # view the demo pages
```

Edit the files in `components/`, never the built `*.min.*` files. Release with `npm version patch|minor|major` then `git push --follow-tags`.

## License

MIT
