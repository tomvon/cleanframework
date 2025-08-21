<?php
/**
 * Clean Framework - Main Landing Page
 * Organized showcase of framework capabilities
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home', 'active' => true],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];

// Component categories
$component_categories = [
    [
        'title' => 'Form Components',
        'description' => 'Complete form elements with built-in validation and accessibility features.',
        'icon' => 'fas fa-edit',
        'url' => 'form-components.php',
        'components' => ['Text inputs', 'Multi-step forms', 'File uploads', 'Validation', 'Input groups', 'Form layouts']
    ],
    [
        'title' => 'UI Components',
        'description' => 'Interactive components with consistent behavior and styling.',
        'icon' => 'fas fa-cube',
        'url' => 'ui-components.php',
        'components' => ['Buttons', 'Modals', 'Dropdowns', 'Tables', 'Tabs', 'Alerts', 'Tooltips', 'Badges']
    ],
    [
        'title' => 'Layout Components',
        'description' => 'Structural components for content organization and layout.',
        'icon' => 'fas fa-th-large',
        'url' => 'layout-components.php',
        'components' => ['Cards', 'Accordions', 'Breadcrumbs', 'Progress bars', 'Pricing tables']
    ],
    [
        'title' => 'Marketing Components',
        'description' => 'Conversion-focused components for landing pages and marketing sites.',
        'icon' => 'fas fa-rocket',
        'url' => 'marketing-components.php',
        'components' => ['Hero sections', 'Features', 'Testimonials', 'CTA sections', 'Stats counters']
    ],
    [
        'title' => 'Admin Components',
        'description' => 'Professional components for admin panels, dashboards, and content management systems.',
        'icon' => 'fas fa-cog',
        'url' => 'admin-components.php',
        'components' => ['Sidebar navigation', 'Dashboard cards', 'Data grids', 'Activity feeds', 'File managers', 'Search bars']
    ]
];

// Framework features
$framework_features = [
    [
        'icon' => 'fas fa-code',
        'title' => 'Semantic HTML',
        'description' => 'Intuitive class names that describe what they do. Write what you mean.',
        'details' => ['Human-readable class names', 'Self-documenting markup', 'AI-friendly patterns']
    ],
    [
        'icon' => 'fas fa-feather-alt',
        'title' => 'Lightweight',
        'description' => 'Fast loading with minimal overhead. Your users will notice the difference.',
        'details' => ['129KB minified CSS', 'Zero dependencies', 'Pure CSS & vanilla JS']
    ],
    [
        'icon' => 'fas fa-puzzle-piece',
        'title' => 'Modular Design',
        'description' => 'Independent components that work together seamlessly or stand alone.',
        'details' => ['Modular architecture', 'Independent components', 'Easy to maintain']
    ],
    [
        'icon' => 'fas fa-mobile-alt',
        'title' => 'Responsive',
        'description' => 'Mobile-first design that adapts beautifully to any screen size.',
        'details' => ['Touch-friendly interactions', 'Flexible layouts', 'Progressive enhancement']
    ],
    [
        'icon' => 'fas fa-universal-access',
        'title' => 'Accessible',
        'description' => 'Built with accessibility in mind, ensuring your content reaches everyone.',
        'details' => ['WCAG 2.1 compliant', 'Screen reader friendly', 'Keyboard navigation']
    ],
    [
        'icon' => 'fas fa-palette',
        'title' => 'Theme Support',
        'description' => 'Built-in dark mode with automatic system preference detection.',
        'details' => ['System preference detection', 'Manual theme toggle', 'Custom color schemes']
    ]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clean Framework - Semantic CSS Framework</title>
    <meta name="description" content="Clean Framework: A semantic, component-based CSS framework. No utility pollution, just clean code that makes sense.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="style.css?v=<?= time() ?>">
    <script>
        // Prevent theme flash by setting theme before CSS loads
        (function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            if (savedTheme === 'system') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', savedTheme);
            }
        })();
    </script>
</head>
<body>
    <?php include 'components/header/header.php'; ?>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Clean Framework</h1>
                <p class="hero-subtitle">Semantic CSS for modern web development</p>
                <p class="hero-description">
                    A component-based CSS framework with intuitive class names and clean, maintainable code.
                </p>
                <div class="hero-buttons">
                    <a href="#examples" class="button primary large">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        See It Work
                    </a>
                    <a href="components-showcase.php" class="button secondary large">
                        <i class="fas fa-rocket" aria-hidden="true"></i>
                        All Components
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section">
        <div class="container">
            <div class="features-section">
                <div class="features-header">
                    <h2>Why Clean Framework?</h2>
                    <p>Semantic components that make development faster and maintenance easier</p>
                </div>
                
                <div class="features-grid features-grid-3">
                    <?php foreach($framework_features as $feature): ?>
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="<?= $feature['icon'] ?>" aria-hidden="true"></i>
                            </div>
                            <div class="feature-content">
                                <h3 class="feature-title"><?= $feature['title'] ?></h3>
                                <p class="feature-description"><?= $feature['description'] ?></p>
                                <ul class="feature-details">
                                    <?php foreach($feature['details'] as $detail): ?>
                                        <li><i class="fas fa-check" aria-hidden="true"></i> <?= $detail ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Component Categories -->
    <section id="examples" class="section">
        <div class="container">
            <div class="section-header">
                <h2>Explore Components</h2>
                <p>Browse our organized collection of components by category</p>
            </div>
            
            <div class="features-cards">
                <?php foreach($component_categories as $category): ?>
                    <div class="feature-card">
                        <div class="feature-card-header">
                            <div class="feature-icon">
                                <i class="<?= $category['icon'] ?>" aria-hidden="true"></i>
                            </div>
                            <h3 class="feature-title"><?= $category['title'] ?></h3>
                        </div>
                        <div class="feature-card-content">
                            <p class="feature-description"><?= $category['description'] ?></p>
                            
                            <ul class="feature-details">
                                <?php foreach(array_slice($category['components'], 0, 6) as $component): ?>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> <?= $component ?></li>
                                <?php endforeach; ?>
                            </ul>
                            
                            <div class="card-actions">
                                <a href="<?= $category['url'] ?>" class="button primary">
                                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                                    View Components
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="section">
        <div class="container">
            <div class="stats-section">
                <div class="stats-header">
                    <h2>Built for Performance</h2>
                    <p>Numbers that matter</p>
                </div>
                
                <div class="stats-cards">
                    <div class="stat-card">
                        <div class="stat-card-icon">
                            <i class="fas fa-file-code" aria-hidden="true"></i>
                        </div>
                        <div class="stat-card-content">
                            <div class="stat-value">
                                <span class="stat-number" data-value="18">0</span>
                                <span class="stat-suffix">kb</span>
                            </div>
                            <h3 class="stat-label">CSS Size</h3>
                            <p class="stat-description">Minified and gzipped</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-icon">
                            <i class="fas fa-cubes" aria-hidden="true"></i>
                        </div>
                        <div class="stat-card-content">
                            <div class="stat-value">
                                <span class="stat-number" data-value="25">0</span>
                                <span class="stat-suffix">+</span>
                            </div>
                            <h3 class="stat-label">Components</h3>
                            <p class="stat-description">Ready to use</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-icon">
                            <i class="fas fa-feather-alt" aria-hidden="true"></i>
                        </div>
                        <div class="stat-card-content">
                            <div class="stat-value">
                                <span class="stat-number" data-value="0">0</span>
                                <span class="stat-suffix"></span>
                            </div>
                            <h3 class="stat-label">Dependencies</h3>
                            <p class="stat-description">Pure CSS & JS</p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-card-icon">
                            <i class="fas fa-tachometer-alt" aria-hidden="true"></i>
                        </div>
                        <div class="stat-card-content">
                            <div class="stat-value">
                                <span class="stat-number" data-value="100">0</span>
                                <span class="stat-suffix">/100</span>
                            </div>
                            <h3 class="stat-label">Lighthouse</h3>
                            <p class="stat-description">Perfect score</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section">
        <div class="container">
            <div class="cta-section cta-gradient cta-centered">
                <div class="cta-content">
                    <h2 class="cta-title">Start Building Today</h2>
                    <p class="cta-subtitle">Join developers building with semantic, maintainable CSS</p>
                    <p class="cta-description">
                        Clean, semantic components with intuitive class names. Built for developers who value maintainable code.
                    </p>
                    
                    <div class="cta-buttons">
                        <a href="components-showcase.php" class="button primary large">
                            <i class="fas fa-rocket" aria-hidden="true"></i>
                            View Full Showcase
                        </a>
                        <a href="#examples" class="button secondary-white large">
                            <i class="fas fa-cube" aria-hidden="true"></i>
                            Browse Components
                        </a>
                    </div>
                    
                    <ul class="cta-features">
                        <li><i class="fas fa-check" aria-hidden="true"></i> No build process required</li>
                        <li><i class="fas fa-check" aria-hidden="true"></i> Copy and paste ready</li>
                        <li><i class="fas fa-check" aria-hidden="true"></i> Fully responsive</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Clean Framework. Built with semantic HTML and component-based CSS.</p>
        </div>
    </footer>

    <!-- Component JavaScript files -->
    <script src="components/navigation/navigation.js"></script>
    <script src="components/stats/stats.js"></script>
    <script src="components/features/features.js"></script>
    <script src="components/cta/cta.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>