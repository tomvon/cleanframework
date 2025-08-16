<?php
/**
 * Clean Framework - Admin Components
 * Components designed for admin interfaces, CMS, and CRM systems
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin', 'active' => true],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];

// Sample data for components
$sidebar_config = [
    'brand' => [
        'name' => 'Admin Panel',
        'icon' => 'fas fa-cog',
        'url' => '#'
    ],
    'user' => [
        'name' => 'Sarah Johnson',
        'role' => 'Super Admin',
        'avatar' => null,
        'url' => '#'
    ],
    'sections' => [
        [
            'title' => 'Main',
            'items' => [
                [
                    'label' => 'Dashboard',
                    'title' => 'View system overview and key metrics',
                    'icon' => 'fas fa-tachometer-alt',
                    'url' => '#dashboard',
                    'active' => true
                ],
                [
                    'label' => 'Analytics',
                    'title' => 'Advanced analytics and insights (Pro feature)',
                    'icon' => 'fas fa-chart-bar',
                    'url' => '#analytics',
                    'badge' => [
                        'text' => 'Pro',
                        'type' => 'primary'
                    ]
                ],
                [
                    'label' => 'Reports',
                    'title' => 'Generate and view detailed reports',
                    'icon' => 'fas fa-chart-line',
                    'url' => '#reports'
                ]
            ]
        ],
        [
            'title' => 'Management',
            'items' => [
                [
                    'label' => 'Users',
                    'title' => 'Manage user accounts and permissions (243 users)',
                    'icon' => 'fas fa-users',
                    'url' => '#users',
                    'badge' => [
                        'text' => '243',
                        'type' => 'secondary'
                    ]
                ],
                [
                    'label' => 'Products',
                    'title' => 'Manage product catalog and inventory',
                    'icon' => 'fas fa-box',
                    'url' => '#products'
                ],
                [
                    'label' => 'Orders',
                    'title' => 'Process and track customer orders (12 pending)',
                    'icon' => 'fas fa-shopping-cart',
                    'url' => '#orders',
                    'badge' => [
                        'text' => '12',
                        'type' => 'warning'
                    ]
                ],
                [
                    'label' => 'Customers',
                    'title' => 'View and manage customer relationships',
                    'icon' => 'fas fa-user-friends',
                    'url' => '#customers'
                ]
            ]
        ],
        [
            'title' => 'Settings',
            'items' => [
                [
                    'label' => 'General',
                    'title' => 'Configure general system settings',
                    'icon' => 'fas fa-cog',
                    'url' => '#settings'
                ],
                [
                    'label' => 'Security',
                    'title' => 'Manage security and access controls',
                    'icon' => 'fas fa-shield-alt',
                    'url' => '#security'
                ],
                [
                    'label' => 'Billing',
                    'title' => 'Manage billing and payment settings',
                    'icon' => 'fas fa-credit-card',
                    'url' => '#billing'
                ]
            ]
        ]
    ]
];

// Dashboard data
$dashboard_config = [
    'cards' => [
        [
            'title' => 'Total Revenue',
            'value' => '$124,563',
            'change' => [
                'value' => '+14.2%',
                'type' => 'positive'
            ],
            'icon' => 'fas fa-dollar-sign',
            'icon_type' => 'success',
            'description' => 'Compared to last month'
        ],
        [
            'title' => 'Active Users',
            'value' => '8,425',
            'change' => [
                'value' => '+21.5%',
                'type' => 'positive'
            ],
            'icon' => 'fas fa-users',
            'icon_type' => 'primary',
            'description' => 'Currently online: 342'
        ],
        [
            'title' => 'New Orders',
            'value' => '156',
            'change' => [
                'value' => '-3.2%',
                'type' => 'negative'
            ],
            'icon' => 'fas fa-shopping-bag',
            'icon_type' => 'warning',
            'description' => 'In the last 24 hours'
        ],
        [
            'title' => 'Support Tickets',
            'value' => '23',
            'change' => [
                'value' => '+2',
                'type' => 'neutral'
            ],
            'icon' => 'fas fa-ticket-alt',
            'icon_type' => 'danger',
            'description' => 'Awaiting response'
        ]
    ],
    'progress_cards' => [
        [
            'title' => 'Server Load',
            'value' => '42',
            'total' => '100',
            'percentage' => 42,
            'icon' => 'fas fa-server',
            'icon_type' => 'primary'
        ],
        [
            'title' => 'Memory Usage',
            'value' => '8.2',
            'total' => '16',
            'percentage' => 51,
            'icon' => 'fas fa-memory',
            'icon_type' => 'success'
        ]
    ]
];

// Include dashboard functions
include 'components/dashboard/dashboard.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Components - Clean Framework</title>
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
    <style>
        .admin-section {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--foreground);
        }
        
        .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 0.375rem;
            background: var(--background);
            color: var(--foreground);
            font-size: 0.875rem;
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
        }
    </style>
</head>
<body class="has-sidebar">
    <?php include 'components/header/header.php'; ?>
    
    <!-- Sidebar -->
    <?php 
    $sidebar = $sidebar_config;
    include 'components/sidebar/sidebar.php'; 
    ?>
    
    <!-- Main Content -->
    <div class="main-content">

    <!-- Page Header -->
    <section class="hero hero-small">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Admin Components</h1>
                <p class="hero-description">Professional components for admin panels, dashboards, and management systems</p>
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


    <!-- Sidebar Component Description -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Sidebar Navigation</h2>
            <p class="text-center">The sidebar navigation is active on this page - see it on the left side!</p>
            
            <div class="cards">
                <div class="card">
                    <h3>Live Sidebar Example</h3>
                    <p>This page demonstrates a real-world implementation of the sidebar component. The sidebar you see on the left is fully functional and includes:</p>
                    <ul>
                        <li><strong>Brand section</strong> - "Admin Panel" with icon and built-in toggle button</li>
                        <li><strong>Navigation sections</strong> - Organized menu items grouped by category</li>
                        <li><strong>Badges</strong> - Notification counts and status indicators</li>
                        <li><strong>User profile</strong> - Fixed at the bottom with avatar and role</li>
                        <li><strong>Compact mode</strong> - Click the toggle button in the sidebar header to switch modes</li>
                    </ul>
                </div>
                
                
                <div class="card">
                    <h3>Implementation</h3>
                    <p>To use the sidebar in your project:</p>
                    <ol>
                        <li>Add <code>class="has-sidebar"</code> to your body tag</li>
                        <li>Include the sidebar component after your header</li>
                        <li>Wrap your main content in a <code>&lt;div class="main-content"&gt;</code></li>
                        <li>The sidebar will automatically adjust for mobile devices</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>

    <!-- Dashboard Cards -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Dashboard Cards</h2>
            <p class="text-center">Metric cards with icons, trends, progress bars, and mini charts</p>
            
            <!-- Standard Metric Cards -->
            <div class="dashboard-section">
                <div class="dashboard-section-header">
                    <h3 class="dashboard-section-title">Metric Cards</h3>
                </div>
                
                <div class="dashboard-grid">
                    <?php foreach ($dashboard_config['cards'] as $card): ?>
                        <?= renderDashboardCard($card) ?>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <!-- Progress Cards -->
            <div class="dashboard-section">
                <div class="dashboard-section-header">
                    <h3 class="dashboard-section-title">Progress Cards</h3>
                </div>
                
                <div class="dashboard-grid">
                    <?php foreach ($dashboard_config['progress_cards'] as $card): ?>
                        <?= renderProgressCard($card) ?>
                    <?php endforeach; ?>
                    
                    <!-- Additional progress examples -->
                    <?= renderProgressCard([
                        'title' => 'Project Completion',
                        'value' => '72',
                        'total' => '100',
                        'percentage' => 72,
                        'icon' => 'fas fa-tasks',
                        'icon_type' => 'success'
                    ]) ?>
                    
                    <?= renderProgressCard([
                        'title' => 'Disk Space',
                        'value' => '92.5',
                        'total' => '100',
                        'percentage' => 92,
                        'icon' => 'fas fa-hdd',
                        'icon_type' => 'danger'
                    ]) ?>
                </div>
            </div>
            
            <!-- Chart Cards -->
            <div class="dashboard-section">
                <div class="dashboard-section-header">
                    <h3 class="dashboard-section-title">Mini Chart Cards</h3>
                </div>
                
                <div class="dashboard-grid">
                    <?= renderChartCard([
                        'title' => 'Daily Sales',
                        'value' => '$4,329',
                        'chart_data' => [30, 45, 60, 80, 65, 75, 90],
                        'icon' => 'fas fa-chart-line',
                        'icon_type' => 'primary'
                    ]) ?>
                    
                    <?= renderChartCard([
                        'title' => 'Page Views',
                        'value' => '28.5K',
                        'chart_data' => [20, 30, 25, 40, 35, 50, 45],
                        'icon' => 'fas fa-eye',
                        'icon_type' => 'success'
                    ]) ?>
                    
                    <?= renderChartCard([
                        'title' => 'Conversions',
                        'value' => '342',
                        'chart_data' => [15, 25, 20, 30, 35, 28, 40],
                        'icon' => 'fas fa-bullseye',
                        'icon_type' => 'warning'
                    ]) ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Quick Stats</h2>
            <p class="text-center">Compact statistics for space-efficient dashboards</p>
            
            <div class="dashboard-quick-stats">
                <div class="dashboard-quick-stat">
                    <div class="dashboard-quick-stat-value">1,234</div>
                    <div class="dashboard-quick-stat-label">Total Sales</div>
                </div>
                <div class="dashboard-quick-stat">
                    <div class="dashboard-quick-stat-value">567</div>
                    <div class="dashboard-quick-stat-label">New Users</div>
                </div>
                <div class="dashboard-quick-stat">
                    <div class="dashboard-quick-stat-value">89%</div>
                    <div class="dashboard-quick-stat-label">Satisfaction</div>
                </div>
                <div class="dashboard-quick-stat">
                    <div class="dashboard-quick-stat-value">4.8</div>
                    <div class="dashboard-quick-stat-label">Avg Rating</div>
                </div>
                <div class="dashboard-quick-stat">
                    <div class="dashboard-quick-stat-value">24</div>
                    <div class="dashboard-quick-stat-label">Active Now</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Data Grid -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Data Grid</h2>
            <p class="text-center">Advanced data table with sorting, filtering, bulk actions, and inline editing</p>
            
            <?php include 'components/datagrid/datagrid.php'; ?>
        </div>
    </section>

    <!-- Search & Filters -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Search & Filters</h2>
            <p class="text-center">Advanced search with autocomplete, filters, saved searches, and multiple variants</p>
            
            <?php include 'components/search/search.php'; ?>
        </div>
    </section>

    <!-- Activity Feed -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Activity Feed</h2>
            <p class="text-center">Timeline for activity logs, notifications, and updates with filtering and real-time features</p>
            
            <?php include 'components/activity/activity.php'; ?>
        </div>
    </section>

    <!-- File Manager -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">File Manager</h2>
            <p class="text-center">Drag-and-drop file uploads with progress tracking, file management, and preview functionality</p>
            
            <?php include 'components/filemanager/filemanager.php'; ?>
        </div>
    </section>

    </div> <!-- End main-content -->
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Clean Framework. Built with semantic HTML and component-based CSS.</p>
        </div>
    </footer>

    <!-- Component JavaScript files -->
    <script src="components/navigation/navigation.js"></script>
    <script src="components/dropdown/dropdown.js"></script>
    <script src="components/sidebar/sidebar.js"></script>
    <script src="components/dashboard/dashboard.js"></script>
    <script src="components/datagrid/datagrid.js"></script>
    <script src="components/search/search.js"></script>
    <script src="components/activity/activity.js"></script>
    <script src="components/filemanager/filemanager.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
    
</body>
</html>