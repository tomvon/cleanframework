<?php
/**
 * Clean Framework - Example Page
 * Component-based architecture with PHP includes
 */


// Page data
$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms'],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components', 'active' => true]
];

// Sidebar configuration for admin components demo
$sidebar_config = [
    'brand' => [
        'name' => 'Component Demo',
        'icon' => 'fas fa-cube',
        'url' => '#'
    ],
    'user' => [
        'name' => 'Demo User',
        'role' => 'Admin',
        'avatar' => null,
        'url' => '#'
    ],
    'sections' => [
        [
            'title' => 'Components',
            'items' => [
                [
                    'label' => 'Forms',
                    'icon' => 'fas fa-edit',
                    'url' => '#forms',
                    'active' => false
                ],
                [
                    'label' => 'UI Components',
                    'icon' => 'fas fa-layer-group',
                    'url' => '#ui-components',
                    'active' => false
                ],
                [
                    'label' => 'Layout',
                    'icon' => 'fas fa-th-large',
                    'url' => '#layout',
                    'active' => false
                ],
                [
                    'label' => 'Marketing',
                    'icon' => 'fas fa-rocket',
                    'url' => '#marketing',
                    'active' => false
                ],
                [
                    'label' => 'Admin',
                    'icon' => 'fas fa-cog',
                    'url' => '#admin',
                    'active' => false
                ]
            ]
        ]
    ]
];

$hero_title = 'Clean Framework';
$hero_subtitle = 'Semantic HTML. Component CSS. No utility pollution.';
$hero_buttons = [
    ['url' => '#', 'label' => 'Get Started', 'type' => 'primary'],
    ['url' => '#', 'label' => 'Learn More', 'type' => 'secondary']
];

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

// Image-based cards for showcasing
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
    ],
    [
        'image' => 'img/samples/pexels-george-desipris-801857.jpg',
        'title' => 'Performance First',
        'content' => 'Optimized for speed and efficiency. Your users will thank you.',
        'button' => ['url' => '#', 'label' => 'View Demo', 'type' => 'primary']
    ]
];

$form_fields = [
    [
        'name' => 'name',
        'label' => 'Your Name',
        'type' => 'text',
        'placeholder' => 'John Doe',
        'required' => true
    ],
    [
        'name' => 'email',
        'label' => 'Email Address',
        'type' => 'email',
        'placeholder' => 'john@example.com',
        'required' => true
    ],
    [
        'name' => 'message',
        'label' => 'Message',
        'type' => 'textarea',
        'placeholder' => 'Tell us what you think...',
        'required' => true
    ]
];

$submit_label = 'Send Message';

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
            ['text' => 'Advanced analytics', 'disabled' => true],
            ['text' => 'Priority support', 'disabled' => true]
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
            'Advanced analytics',
            'Team collaboration'
        ],
        'button' => [
            'label' => 'Get Started',
            'url' => '#',
            'type' => 'primary'
        ]
    ],
    [
        'name' => 'Enterprise',
        'price' => 99,
        'period' => '/month',
        'description' => 'For large organizations',
        'featured' => false,
        'features' => [
            'Everything in Professional',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee',
            'Advanced security'
        ],
        'button' => [
            'label' => 'Contact Sales',
            'url' => '#',
            'type' => 'secondary'
        ]
    ]
];

// Multi-step form data
$form_steps = [
    [
        'title' => 'Personal Information',
        'description' => 'Tell us about yourself',
        'label' => 'Personal',
        'fields' => [
            [
                'name' => 'first_name',
                'label' => 'First Name',
                'type' => 'text',
                'placeholder' => 'John',
                'value' => 'John',
                'required' => true
            ],
            [
                'name' => 'last_name',
                'label' => 'Last Name',
                'type' => 'text',
                'placeholder' => 'Doe',
                'value' => 'Smith',
                'required' => true
            ],
            [
                'name' => 'email',
                'label' => 'Email Address',
                'type' => 'email',
                'placeholder' => 'john@example.com',
                'value' => 'john.smith@example.com',
                'required' => true
            ],
            [
                'name' => 'phone',
                'label' => 'Phone Number',
                'type' => 'tel',
                'placeholder' => '(555) 123-4567',
                'value' => '(555) 987-6543'
            ],
            [
                'name' => 'birth_date',
                'label' => 'Date of Birth',
                'type' => 'date',
                'value' => '1990-05-15'
            ]
        ]
    ],
    [
        'title' => 'Preferences & Settings',
        'description' => 'Customize your experience',
        'label' => 'Preferences',
        'fields' => [
            [
                'name' => 'experience_level',
                'label' => 'Experience Level',
                'type' => 'range',
                'min' => 1,
                'max' => 10,
                'value' => 7,
                'help' => 'Rate your experience from beginner (1) to expert (10)'
            ],
            [
                'name' => 'budget',
                'label' => 'Budget Range',
                'type' => 'number',
                'min' => 1000,
                'max' => 100000,
                'step' => 500,
                'placeholder' => '10000',
                'value' => '15000'
            ],
            [
                'name' => 'brand_color',
                'label' => 'Preferred Brand Color',
                'type' => 'color',
                'value' => '#10B981'
            ],
            [
                'name' => 'services',
                'label' => 'Services Interested In',
                'type' => 'checkbox',
                'value' => ['web-design', 'web-dev', 'consulting'],
                'options' => [
                    'web-design' => 'Web Design',
                    'web-dev' => 'Web Development',
                    'mobile-app' => 'Mobile App Development',
                    'consulting' => 'Technical Consulting',
                    'maintenance' => 'Ongoing Maintenance'
                ]
            ]
        ]
    ],
    [
        'title' => 'Project Details',
        'description' => 'Tell us about your project',
        'label' => 'Project',
        'fields' => [
            [
                'name' => 'project_type',
                'label' => 'Primary Project Type',
                'type' => 'radio',
                'required' => true,
                'value' => 'redesign',
                'options' => [
                    'new-website' => 'Brand New Website',
                    'redesign' => 'Website Redesign',
                    'mobile-app' => 'Mobile Application',
                    'web-app' => 'Web Application',
                    'ecommerce' => 'E-commerce Store'
                ]
            ],
            [
                'name' => 'timeline',
                'label' => 'Desired Timeline',
                'type' => 'select',
                'required' => true,
                'value' => '2-3-months',
                'options' => [
                    '' => 'Select timeline',
                    '1-2-weeks' => '1-2 weeks',
                    '1-month' => '1 month',
                    '2-3-months' => '2-3 months',
                    '3-6-months' => '3-6 months',
                    'flexible' => 'Flexible'
                ]
            ],
            [
                'name' => 'project_description',
                'label' => 'Project Description',
                'type' => 'textarea',
                'placeholder' => 'Tell us more about your project goals, target audience, and specific requirements...',
                'value' => 'We need to redesign our existing website to make it more modern and user-friendly. The current site feels outdated and doesn\'t reflect our brand properly. We\'re looking for a clean, professional design that showcases our services effectively and improves conversion rates.',
                'required' => true
            ]
        ]
    ],
    [
        'title' => 'Additional Information',
        'description' => 'Final details and attachments',
        'label' => 'Extras',
        'fields' => [
            [
                'name' => 'company_website',
                'label' => 'Current Website (if any)',
                'type' => 'url',
                'placeholder' => 'https://example.com',
                'value' => 'https://mycompany.com'
            ],
            [
                'name' => 'project_files',
                'label' => 'Project Files or References',
                'type' => 'file',
                'accept' => '.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip',
                'help' => 'Upload any relevant documents, wireframes, or reference materials'
            ],
            [
                'name' => 'additional_notes',
                'label' => 'Additional Notes',
                'type' => 'textarea',
                'placeholder' => 'Any other information we should know?',
                'value' => 'We would like to maintain our current branding colors but are open to suggestions for improvement. Mobile responsiveness is very important to us as most of our traffic comes from mobile devices.'
            ],
            [
                'name' => 'newsletter',
                'label' => 'Communication Preferences',
                'type' => 'checkbox',
                'value' => ['newsletter', 'updates'],
                'options' => [
                    'newsletter' => 'Subscribe to our newsletter',
                    'updates' => 'Receive project updates via email',
                    'marketing' => 'Receive marketing communications'
                ]
            ]
        ]
    ],
    [
        'title' => 'Advanced Input Types',
        'description' => 'Showcase all form input capabilities',
        'label' => 'Advanced',
        'fields' => [
            [
                'name' => 'search_query',
                'label' => 'Search Query',
                'type' => 'search',
                'placeholder' => 'Search for anything...',
                'value' => 'clean framework'
            ],
            [
                'name' => 'password',
                'label' => 'Password',
                'type' => 'password',
                'placeholder' => 'Enter secure password',
                'value' => 'mysecurepassword123'
            ],
            [
                'name' => 'appointment_time',
                'label' => 'Appointment Time',
                'type' => 'time',
                'value' => '14:30'
            ],
            [
                'name' => 'deadline_datetime',
                'label' => 'Project Deadline',
                'type' => 'datetime-local',
                'value' => '2024-12-01T09:00'
            ],
            [
                'name' => 'project_week',
                'label' => 'Start Week',
                'type' => 'week',
                'value' => '2024-W45'
            ],
            [
                'name' => 'launch_month',
                'label' => 'Launch Month',
                'type' => 'month',
                'value' => '2024-12'
            ]
        ]
    ],
    [
        'title' => 'Interactive Components',
        'description' => 'Advanced UI components and interactions',
        'label' => 'Interactive',
        'fields' => [
            [
                'name' => 'satisfaction_rating',
                'label' => 'Satisfaction Rating',
                'type' => 'star-rating',
                'max' => 5,
                'value' => 4
            ],
            [
                'name' => 'email_notifications',
                'label' => 'Enable Email Notifications',
                'type' => 'toggle',
                'value' => true
            ],
            [
                'name' => 'skills_multiselect',
                'label' => 'Technical Skills',
                'type' => 'select',
                'multiple' => true,
                'value' => ['javascript', 'php', 'css'],
                'options' => [
                    'html' => 'HTML',
                    'css' => 'CSS',
                    'javascript' => 'JavaScript',
                    'php' => 'PHP',
                    'python' => 'Python',
                    'react' => 'React',
                    'vue' => 'Vue.js',
                    'nodejs' => 'Node.js'
                ]
            ],
            [
                'name' => 'hourly_rate',
                'label' => 'Hourly Rate',
                'type' => 'input-group',
                'prefix' => '$',
                'suffix' => '/hr',
                'input_type' => 'number',
                'value' => '75',
                'min' => 10,
                'max' => 500
            ],
            [
                'name' => 'project_files_enhanced',
                'label' => 'Project Files (Drag & Drop)',
                'type' => 'file-upload-area',
                'accept' => '.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.sketch,.fig',
                'help' => 'Drag files here or click to browse. Supports documents, images, and design files.'
            ]
        ]
    ]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Components Showcase - Clean Framework</title>
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
<body class="has-sidebar">
    <?php include 'components/header/header.php'; ?>
    
    <!-- Sidebar -->
    <?php 
    $sidebar = $sidebar_config;
    include 'components/sidebar/sidebar.php'; 
    ?>
    
    <!-- Main Content -->
    <div class="main-content">

    <?php include 'components/hero/hero.php'; ?>

    <!-- Forms Section -->
    <section id="forms" class="section">
        <div class="container">
            <h2 class="text-center">Forms</h2>
            <p class="text-center text-muted">Form components with built-in validation and accessibility</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Multi-Step Form</h3>
            <p class="text-center">Complex forms broken down into manageable steps</p>
            <?php include 'components/form/form-multi.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Contact Form</h3>
            <p class="text-center">Simple contact form with validation</p>
            <?php include 'components/form/form.php'; ?>
        </div>
    </section>

    <!-- UI Components Section -->
    <section id="ui-components" class="section">
        <div class="container">
            <h2 class="text-center">UI Components</h2>
            <p class="text-center text-muted">Interactive elements with consistent behavior and styling</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Modals</h2>
            <p class="text-center">Accessible dialog windows for forms and content</p>
            <?php include 'components/modal/modal.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Dropdowns</h2>
            <p class="text-center">Versatile dropdown menus for navigation and actions</p>
            <?php include 'components/dropdown/dropdown.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Data Tables</h2>
            <p class="text-center">Responsive data tables with sorting and filtering</p>
            <?php include 'components/table/table.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Tabs</h2>
            <p class="text-center">Organize content without overwhelming users</p>
            <?php include 'components/tabs/tabs.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Alerts & Notifications</h3>
            <p class="text-center">Interactive notifications for success, info, warning, and error messages</p>
            
            <div class="buttons">
                <button class="button primary" onclick="showToast('Operation completed successfully!', 'success')">
                    <i class="fas fa-check-circle"></i> Success Alert
                </button>
                <button class="button secondary" onclick="showToast('Here is some helpful information.', 'info')">
                    <i class="fas fa-info-circle"></i> Info Alert
                </button>
                <button class="button warning" onclick="showToast('Please review your settings.', 'warning')">
                    <i class="fas fa-exclamation-triangle"></i> Warning Alert
                </button>
                <button class="button danger" onclick="showToast('Something went wrong!', 'error')">
                    <i class="fas fa-times-circle"></i> Error Alert
                </button>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Tooltips</h3>
            <p class="text-center">Contextual help and information on hover or focus</p>
            <?php include 'components/tooltip/tooltip.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Badges</h3>
            <p class="text-center">Labels, status indicators, and tags for categorization</p>
            <?php include 'components/badge/badge.php'; ?>
        </div>
    </section>

    <!-- Layout Section -->
    <section id="layout" class="section">
        <div class="container">
            <h2 class="text-center">Layout</h2>
            <p class="text-center text-muted">Structural components for content organization</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Cards</h3>
            <p class="text-center">Perfect little boxes for your content</p>
            <?php include 'components/cards/cards.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Image Cards</h3>
            <p class="text-center">Real examples, not just pretty mockups</p>
            <?php $cards = $image_cards; include 'components/cards/cards.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Pricing Tables</h3>
            <p class="text-center">No hidden fees, no surprises, no PhD required to understand</p>
            <?php include 'components/pricing/pricing.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Accordion</h3>
            <p class="text-center">Collapsible content sections for organizing information</p>
            <?php include 'components/accordion/accordion.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Breadcrumbs</h3>
            <p class="text-center">Navigation hierarchy showing location in site structure</p>
            <?php include 'components/breadcrumb/breadcrumb.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Progress Bars</h3>
            <p class="text-center">Visual indicators for completion states and loading progress</p>
            <?php include 'components/progress/progress.php'; ?>
        </div>
    </section>

    <!-- Marketing Section -->
    <section id="marketing" class="section">
        <div class="container">
            <h2 class="text-center">Marketing</h2>
            <p class="text-center text-muted">Conversion-focused components for landing pages</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php include 'components/testimonials/testimonials.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php include 'components/features/features.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php include 'components/cta/cta.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php include 'components/stats/stats.php'; ?>
        </div>
    </section>

    <!-- Admin Section -->
    <section id="admin" class="section">
        <div class="container">
            <h2 class="text-center">Admin</h2>
            <p class="text-center text-muted">Professional components for admin panels and dashboards</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Sidebar Navigation</h3>
            <p class="text-muted">The sidebar navigation is already active on this page! You can see it on the left side. It includes collapsible menu items, icons, and responsive mobile behavior.</p>
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <strong>Live Demo:</strong> The sidebar you see on the left is the actual sidebar component in action. Try collapsing it with the toggle button in the header.
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Dashboard Cards</h3>
            <?php include 'components/dashboard/dashboard.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Data Grid</h3>
            <?php include 'components/datagrid/datagrid.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Search & Filters</h3>
            <?php include 'components/search/search.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>Activity Feed</h3>
            <?php include 'components/activity/activity.php'; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h3>File Manager</h3>
            <?php include 'components/filemanager/filemanager.php'; ?>
        </div>
    </section>

    </div> <!-- Close main-content -->
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 CleanCorp. Built with Clean Framework.</p>
        </div>
    </footer>

    <!-- Component JavaScript files -->
    <script src="components/navigation/navigation.js"></script>
    <script src="components/form/form.js"></script>
    <script src="components/modal/modal.js"></script>
    <script src="components/dropdown/dropdown.js"></script>
    <script src="components/table/table.js"></script>
    <script src="components/tabs/tabs.js"></script>
    <script src="components/alert/alert.js"></script>
    <script src="components/accordion/accordion.js"></script>
    <script src="components/tooltip/tooltip.js"></script>
    <script src="components/breadcrumb/breadcrumb.js"></script>
    <script src="components/badge/badge.js"></script>
    <script src="components/progress/progress.js"></script>
    <script src="components/testimonials/testimonials.js"></script>
    <script src="components/features/features.js"></script>
    <script src="components/cta/cta.js"></script>
    <script src="components/stats/stats.js"></script>
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