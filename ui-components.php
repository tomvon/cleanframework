<?php
/**
 * Clean Framework - UI Components
 * Interactive elements and user interface components
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components', 'active' => true],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI Components - Clean Framework</title>
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
                <h1 class="hero-title">UI Components</h1>
                <p class="hero-description">Interactive elements with consistent behavior and professional styling</p>
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

    <!-- Buttons -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Buttons</h2>
            <p class="text-center">Multiple button styles and states for different actions</p>
            
            <div class="buttons">
                <button class="button primary">Primary Button</button>
                <button class="button secondary">Secondary Button</button>
                <button class="button success">Success Button</button>
                <button class="button warning">Warning Button</button>
                <button class="button danger">Danger Button</button>
            </div>

            <div class="buttons">
                <button class="button primary large">
                    <i class="fas fa-rocket" aria-hidden="true"></i>
                    Large Button
                </button>
                <button class="button secondary">
                    <i class="fas fa-download" aria-hidden="true"></i>
                    Regular Button
                </button>
                <button class="button primary small">Small Button</button>
            </div>

            <div class="buttons">
                <button class="button primary" disabled>Disabled Primary</button>
                <button class="button secondary" disabled>Disabled Secondary</button>
            </div>
        </div>
    </section>

    <!-- Alerts -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Alerts & Toasts</h2>
            <p class="text-center">User notifications for success, error, warning, and info messages</p>
            
            <div class="buttons">
                <button class="button primary" onclick="showToast('Operation completed successfully!', 'success')">
                    <i class="fas fa-check-circle" aria-hidden="true"></i> Success Alert
                </button>
                <button class="button secondary" onclick="showToast('Here is some helpful information.', 'info')">
                    <i class="fas fa-info-circle" aria-hidden="true"></i> Info Alert
                </button>
                <button class="button warning" onclick="showToast('Please review your settings.', 'warning')">
                    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i> Warning Alert
                </button>
                <button class="button danger" onclick="showToast('Something went wrong!', 'error')">
                    <i class="fas fa-times-circle" aria-hidden="true"></i> Error Alert
                </button>
            </div>
        </div>
    </section>

    <!-- Modals -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Modals</h2>
            <p class="text-center">Accessible dialog windows for forms, confirmations, and content</p>
            <?php include 'components/modal/modal.php'; ?>
        </div>
    </section>

    <!-- Dropdowns -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Dropdowns</h2>
            <p class="text-center">Versatile dropdown menus for navigation and actions</p>
            <?php include 'components/dropdown/dropdown.php'; ?>
        </div>
    </section>

    <!-- Tables -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Tables</h2>
            <p class="text-center">Responsive data tables with sorting, filtering, and pagination</p>
            <?php include 'components/table/table.php'; ?>
        </div>
    </section>

    <!-- Tabs -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Tabs</h2>
            <p class="text-center">Clean tabbed interfaces for content organization</p>
            <?php include 'components/tabs/tabs.php'; ?>
        </div>
    </section>

    <!-- Tooltips -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Tooltips</h2>
            <p class="text-center">Contextual information that appears on hover or focus</p>
            <?php include 'components/tooltip/tooltip.php'; ?>
        </div>
    </section>

    <!-- Badges -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Badges</h2>
            <p class="text-center">Status indicators, labels, and tags for content categorization</p>
            <?php include 'components/badge/badge.php'; ?>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Clean Framework. Built with semantic HTML and component-based CSS.</p>
        </div>
    </footer>

    <!-- Component JavaScript files -->
    <script src="components/navigation/navigation.js"></script>
    <script src="components/modal/modal.js"></script>
    <script src="components/dropdown/dropdown.js"></script>
    <script src="components/table/table.js"></script>
    <script src="components/tabs/tabs.js"></script>
    <script src="components/alert/alert.js"></script>
    <script src="components/tooltip/tooltip.js"></script>
    <script src="components/badge/badge.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>