<?php
/**
 * Clean Framework - Layout Components
 * Structural elements and content organization components
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout', 'active' => true],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];

// Sample card data
$cards = [
    [
        'icon' => 'fas fa-code',
        'title' => 'Semantic HTML',
        'content' => 'HTML that tells a story. No mental translation required. Just write what you mean.'
    ],
    [
        'icon' => 'fas fa-rocket',
        'title' => 'Lightning Fast',
        'content' => '500 lines of CSS. No bloat. No complexity. Just beautiful, fast websites.'
    ],
    [
        'icon' => 'fas fa-robot',
        'title' => 'AI-Friendly',
        'content' => 'Predictable patterns that AI can understand without training. Perfect for modern development.'
    ]
];

// Image cards
$image_cards = [
    [
        'image' => 'img/samples/pexels-earano-1330219.jpg',
        'title' => 'Beautiful Design',
        'content' => 'Clean, modern layouts that look great on any device. Every detail crafted with care.',
        'button' => ['url' => '#', 'label' => 'Learn More', 'type' => 'primary']
    ],
    [
        'image' => 'img/samples/pexels-fabianwiktor-994605.jpg',
        'title' => 'Developer Experience',
        'content' => 'Write less code, build more features. Intuitive patterns that make sense.',
        'button' => ['url' => '#', 'label' => 'Get Started', 'type' => 'secondary']
    ]
];

// Pricing data
$pricing_plans = [
    [
        'name' => 'Starter',
        'price' => 9,
        'period' => '/month',
        'description' => 'Perfect for individuals',
        'featured' => false,
        'features' => [
            'Up to 3 projects',
            'Basic support',
            'Export to PDF',
            ['text' => 'Advanced analytics', 'disabled' => true]
        ],
        'button' => [
            'label' => 'Get Started',
            'url' => '#',
            'type' => 'secondary'
        ]
    ],
    [
        'name' => 'Professional',
        'price' => 29,
        'period' => '/month',
        'description' => 'Best for small teams',
        'featured' => true,
        'badge' => 'Most Popular',
        'features' => [
            'Unlimited projects',
            'Priority support',
            'Export to PDF & Excel',
            'Advanced analytics'
        ],
        'button' => [
            'label' => 'Get Started',
            'url' => '#',
            'type' => 'primary'
        ]
    ]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout Components - Clean Framework</title>
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

    <!-- Page Header -->
    <section class="hero hero-small">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Layout Components</h1>
                <p class="hero-description">Structural components for content organization and layout</p>
                <div class="hero-buttons">
                    <a href="index.php" class="button secondary">
                        <i class="fas fa-arrow-left" aria-hidden="true"></i>
                        Back to Home
                    </a>
                    <a href="components-showcase.php" class="button primary">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        All Components
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Cards -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Cards</h2>
                <p>Perfect little boxes for your content</p>
            </div>
            <?php include 'components/cards/cards.php'; ?>
        </div>
    </section>

    <!-- Image Cards -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Image Cards</h2>
                <p>Cards with pictures that don't break your layout</p>
            </div>
            <?php $cards = $image_cards; include 'components/cards/cards.php'; ?>
        </div>
    </section>

    <!-- Pricing -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Pricing Tables</h2>
                <p>Professional pricing tables with clear layouts</p>
            </div>
            <?php include 'components/pricing/pricing.php'; ?>
        </div>
    </section>

    <!-- Accordion -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Accordions</h2>
                <p>Collapsible content sections for better organization</p>
            </div>
            <?php include 'components/accordion/accordion.php'; ?>
        </div>
    </section>

    <!-- Breadcrumbs -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Breadcrumbs</h2>
                <p>Help users navigate your site structure</p>
            </div>
            <?php include 'components/breadcrumb/breadcrumb.php'; ?>
        </div>
    </section>

    <!-- Progress Bars -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Progress Bars</h2>
                <p>Show progress without making users guess</p>
            </div>
            <?php include 'components/progress/progress.php'; ?>
        </div>
    </section>

    <!-- Layout Examples -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2>Grid Layouts</h2>
                <p>Grids that actually make sense</p>
            </div>
            
            <div class="layout-examples">
                <div class="section-header">
                    <h3>Two Column Layout</h3>
                </div>
                
                <div class="layout-grid layout-two-column">
                    <div class="layout-column">
                        <h4>Left Column</h4>
                        <p>This is the left column content. Perfect for main content or primary information.</p>
                    </div>
                    <div class="layout-column">
                        <h4>Right Column</h4>
                        <p>This is the right column content. Great for sidebars or secondary information.</p>
                    </div>
                </div>

                <div class="section-header">
                    <h3>Three Column Layout</h3>
                </div>
                
                <div class="layout-grid layout-auto-fit">
                    <div class="layout-column">
                        <h4>Column 1</h4>
                        <p>First column content.</p>
                    </div>
                    <div class="layout-column">
                        <h4>Column 2</h4>
                        <p>Second column content.</p>
                    </div>
                    <div class="layout-column">
                        <h4>Column 3</h4>
                        <p>Third column content.</p>
                    </div>
                </div>

                <div class="section-header">
                    <h3>Container & Sections</h3>
                </div>
                
                <div class="layout-container-example">
                    <div class="layout-container-inner">
                        <h4>Container Example</h4>
                        <p>This demonstrates the container component with max-width and automatic centering. Perfect for maintaining readable line lengths and consistent layouts across different screen sizes.</p>
                    </div>
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
    <script src="components/accordion/accordion.js"></script>
    <script src="components/breadcrumb/breadcrumb.js"></script>
    <script src="components/progress/progress.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>