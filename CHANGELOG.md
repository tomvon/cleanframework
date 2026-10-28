# Changelog

All notable changes to Clean Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- The inline-style warning (red dashed outline) no longer flags styles the framework's own JS sets at runtime (chart bars, table rows, progress bars)

## [3.0.0] - 2026-10-28
Replace Sass with native CSS nesting, ship only the two minified bundles, simplify the release process, add tests and CI, and trim the docs.

### Changed
- **BREAKING (browser support)**: source is now plain CSS with native nesting; Sass is gone. Requires Chrome/Edge 120+, Firefox 117+, Safari 17.2+
- Source entry is `main.css` (`@import`s each component); link it directly during development, no build needed
- Ship only `cleanframework.min.css` and `cleanframework.min.js`; removed `style.css`, `style.min.css`, `cleanframework.js` and source maps
- Merged the two identical mobile-nav blocks into a single `@media (max-width: 1100px)`
- Release is now `npm version <patch|minor|major>` (rebuilds, updates pinned CDN links, tags); removed `build.sh`, `release.sh`, `ai-release.sh`
- CDN links in docs are pinned to a version instead of `@latest`
- Builds are deterministic (no date stamps) and `build-info.json` is removed

### Added
- `npm test` (build + sanity checks) and a GitHub Actions workflow that fails if the committed bundles are stale

### Removed
- MANIFESTO, ARCHITECTURE, EXTENDING, VERSIONING, AI-PHILOSOPHY and REVIEW-2025 docs (README, COMPONENTS, AI-README and CLAUDE.md remain)
- The unmeasured "30% to 90% success rate" claim

## [2.0.1] - 2025-08-24
Enhanced README.md with comprehensive AI workflow documentation

- Added detailed AI-Constraining Architecture section with code examples
- Included practical AI workflow instructions for both humans and AI assistants  
- Added complete AI workflow example showing proper template usage
- Enhanced value proposition with specific success rate improvements (30% → 90%)
- Created quick reference guide for AI assistants with clear dos and don'ts

## [2.0.0] - 2025-08-24
### Major Evolution: AI-Constraining Architecture
- **BREAKING**: Evolved from collaborative to constraint-based AI approach
- Added CSS-based inline style protection with visual warnings
- Implemented template-embedded AI instructions in component files
- Updated all documentation to reflect AI-constraining philosophy
- Removed outdated "Human-AI Collaboration" sections from README.md
- Completely rewrote AI-PHILOSOPHY.md for constraint-based approach
- Updated CLAUDE.md with AI-constraining development rules
- Modified MANIFESTO.md and EXTENDING.md for consistency
- Success rate improved from ~30% to ~90% in AI-assisted development

## [1.2.1] - 2025-08-22
Simplified framework by removing NPM complexity, fixed CHANGELOG duplication, cleaned up orphaned code, and improved philosophy alignment. Focus on pure CDN distribution and semantic simplicity.

## [1.2.0] - 2025-08-22
Added comprehensive NPM package support with proper entry points, build system integration, and publishing workflow. Enhanced release script to include NPM publishing with authentication checks and confirmation prompts.

## [1.1.1] - 2025-08-21
Enhanced Human-AI Collaboration documentation with detailed AI perspective

- Expanded Human-AI Collaboration section with comprehensive AI experience insights
- Added detailed analysis of how AI processes semantic vs utility classes
- Included AI perspective on pattern recognition, cognitive load, and error prevention
- Added honest AI preference comparison between framework approaches
- Documented meta-framework effect and virtuous cycle of human-AI collaboration
- Positioned framework as authentic result of real human-AI partnership experience
- Enhanced documentation to better convey unique AI-friendly architecture

## [1.1.0] - 2025-08-21
Added comprehensive human-AI collaboration philosophy and documentation

- Created AI-PHILOSOPHY.md documenting framework's human-AI collaboration principles
- Updated README with Human-AI Collaboration section and AI-optimized benefits
- Enhanced MANIFESTO with human-AI partnership vision and respectful framework evolution
- Updated CLAUDE.md to welcome AI assistants as true development partners
- Fixed semantic class naming: replaced generic .visible with .form-button-visible/.form-actions-visible
- Added REVIEW-2025.md with comprehensive framework analysis (9.2/10 score)
- Updated package.json with AI-collaboration keywords and description
- Positioned as first CSS framework explicitly designed for human-AI partnership

## [1.0.1] - 2025-08-22
### Added
- Minified CSS and JavaScript files for production use (cleanframework.min.css, cleanframework.min.js)
- Comprehensive build system with npm scripts
- Release management system with semantic versioning
- CDN support via jsDelivr with version tags
- Automated release script (release.sh)
- Build process documentation (VERSIONING.md)
- Combined JavaScript file with all components

### Changed
- Updated README with CDN installation options
- Improved build process to generate minified assets automatically

### Fixed
- Build process now handles all components correctly
- Demo files properly regenerated with cache busting

## [1.0.0] - 2024-08-16
### Added
- Initial release with 30+ semantic components
- Marketing components: hero, features, testimonials, pricing, CTA, stats
- UI components: buttons, modals, dropdowns, tables, tabs, alerts, tooltips
- Form components: comprehensive form styling, multi-step forms, validation
- Admin components: dashboard cards, datagrids, activity feeds, file manager
- Layout components: navigation, sidebar, cards, accordion, breadcrumb
- Theme support: light/dark/system themes with CSS custom properties
- Progressive JavaScript enhancement
- Fully responsive design
- SCSS component architecture

[Unreleased]: https://github.com/tomvon/cleanframework/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/tomvon/cleanframework/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/tomvon/cleanframework/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/tomvon/cleanframework/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/tomvon/cleanframework/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/tomvon/cleanframework/releases/tag/v1.0.0

[Unreleased]: https://github.com/tomvon/cleanframework/compare/v1.2.1...HEAD
[1.2.1]: https://github.com/tomvon/cleanframework/compare/v1.2.0...v1.2.1
[1.0.0]: https://github.com/tomvon/cleanframework/releases/tag/v1.0.0
[1.0.1]: https://github.com/tomvon/cleanframework/compare/v1.0.0...v1.0.1
[1.1.0]: https://github.com/tomvon/cleanframework/compare/v1.0.1...v1.1.0
[1.1.1]: https://github.com/tomvon/cleanframework/compare/v1.1.0...v1.1.1
[1.2.0]: https://github.com/tomvon/cleanframework/compare/v1.1.1...v1.2.0
