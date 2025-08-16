<?php
/**
 * Clean Framework - Marketing Components
 * Homepage elements designed for conversion and engagement
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing', 'active' => true],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];

// Hero data
$hero_title = 'Clean Framework';
$hero_subtitle = 'Semantic HTML. Component CSS. No utility pollution.';
$hero_buttons = [
    ['url' => '#', 'label' => 'Get Started', 'type' => 'primary'],
    ['url' => '#', 'label' => 'Learn More', 'type' => 'secondary']
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketing Components - Clean Framework</title>
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
                <h1 class="hero-title">Marketing Components</h1>
                <p class="hero-description">The building blocks that actually convert visitors into customers</p>
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

    <!-- Hero Sections -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Hero Sections</h2>
            <p class="text-center">First impressions that actually impress</p>
        </div>
    </section>
    
    <!-- Example Hero -->
    <?php include 'components/hero/hero.php'; ?>

    <!-- Features -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Feature Sections</h2>
            <p class="text-center">Show off what makes your product special</p>
            <?php include 'components/features/features.php'; ?>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Testimonials</h2>
            <p class="text-center">Let your happy customers do the selling for you</p>
            <?php include 'components/testimonials/testimonials.php'; ?>
        </div>
    </section>

    <!-- Stats/Counters -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Stats & Counters</h2>
            <p class="text-center">Big numbers that make your business look impressive</p>
            <?php include 'components/stats/stats.php'; ?>
        </div>
    </section>

    <!-- Call-to-Action Sections -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Call-to-Action Sections</h2>
            <p class="text-center">The final push that turns visitors into customers</p>
            <?php include 'components/cta/cta.php'; ?>
        </div>
    </section>

    <!-- Marketing Examples -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Marketing Layouts</h2>
            <p class="text-center">Proven patterns that actually work</p>
            
            <div class="layout-examples">
                <!-- Value Proposition -->
                <div class="section-header">
                    <h3>Value Proposition</h3>
                    <p>Clear benefit-focused messaging</p>
                </div>
                
                <div class="value-proposition">
                    <h4 class="value-title">Save 10 Hours Per Week</h4>
                    <p class="value-description">
                        Clean Framework eliminates the complexity of utility classes, letting you focus on building features instead of fighting CSS.
                    </p>
                    <div class="buttons">
                        <button class="button primary large">Start Saving Time</button>
                        <button class="button secondary large">See How It Works</button>
                    </div>
                </div>

                <!-- Before/After -->
                <div class="section-header">
                    <h3>Before & After Comparison</h3>
                    <p>Show the transformation</p>
                </div>
                
                <div class="comparison">
                    <div class="comparison-item">
                        <div class="comparison-badge before">
                            ❌ Before
                        </div>
                        <h4 class="comparison-title">Complex Utility Classes</h4>
                        <code class="comparison-code">
                            &lt;div class="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"&gt;
                        </code>
                        <ul class="comparison-features">
                            <li>Hard to read</li>
                            <li>Not semantic</li>
                            <li>Difficult to maintain</li>
                        </ul>
                    </div>
                    
                    <div class="comparison-item">
                        <div class="comparison-badge after">
                            ✅ After
                        </div>
                        <h4 class="comparison-title">Clean Semantic Classes</h4>
                        <code class="comparison-code">
                            &lt;button class="button primary"&gt;
                        </code>
                        <ul class="comparison-features">
                            <li>Easy to understand</li>
                            <li>Semantic meaning</li>
                            <li>Simple to maintain</li>
                        </ul>
                    </div>
                </div>

                <!-- Social Proof -->
                <div class="section-header">
                    <h3>Social Proof Bar</h3>
                    <p>Build trust with user statistics</p>
                </div>
                
                <div class="social-proof">
                    <p class="social-proof-intro">
                        Trusted by developers worldwide
                    </p>
                    <div class="social-proof-stats">
                        <div class="social-proof-stat">
                            <span class="stat-number">10,000+</span>
                            <span class="stat-label">Downloads</span>
                        </div>
                        <div class="social-proof-stat">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">GitHub Stars</span>
                        </div>
                        <div class="social-proof-stat">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Contributors</span>
                        </div>
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
    <script src="components/features/features.js"></script>
    <script src="components/testimonials/testimonials.js"></script>
    <script src="components/stats/stats.js"></script>
    <script src="components/cta/cta.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>