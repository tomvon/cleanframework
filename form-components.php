<?php
/**
 * Clean Framework - Form Components
 * Showcase of form-related components
 */

$brand = 'Clean Framework';
$nav_items = [
    ['url' => 'index.php', 'label' => 'Home'],
    ['url' => 'form-components.php', 'label' => 'Forms', 'active' => true],
    ['url' => 'ui-components.php', 'label' => 'UI Components'],
    ['url' => 'layout-components.php', 'label' => 'Layout'],
    ['url' => 'marketing-components.php', 'label' => 'Marketing'],
    ['url' => 'admin-components.php', 'label' => 'Admin'],
    ['url' => 'components-showcase.php', 'label' => 'All Components']
];

// Include form data from original showcase
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

// Multi-step form data (abbreviated version)
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
                'name' => 'email',
                'label' => 'Email Address',
                'type' => 'email',
                'placeholder' => 'john@example.com',
                'value' => 'john.smith@example.com',
                'required' => true
            ]
        ]
    ],
    [
        'title' => 'Preferences',
        'description' => 'Customize your experience',
        'label' => 'Preferences',
        'fields' => [
            [
                'name' => 'services',
                'label' => 'Services Interested In',
                'type' => 'checkbox',
                'value' => ['web-design', 'web-dev'],
                'options' => [
                    'web-design' => 'Web Design',
                    'web-dev' => 'Web Development',
                    'consulting' => 'Technical Consulting'
                ]
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
    <title>Form Components - Clean Framework</title>
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
                <h1 class="hero-title">Form Components</h1>
                <p class="hero-description">Professional form components with built-in validation and accessibility</p>
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

    <!-- Basic Form -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Contact Form</h2>
            <p class="text-center">Clean, accessible form styling with proper validation states</p>
            <?php include 'components/form/form.php'; ?>
        </div>
    </section>

    <!-- Multi-Step Form -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Multi-Step Form</h2>
            <p class="text-center">Progressive disclosure with step navigation and built-in validation</p>
            <?php include 'components/form/form-multi.php'; ?>
        </div>
    </section>

    <!-- Form Field Examples -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Input Types</h2>
            <p class="text-center">All HTML5 input types with consistent styling and behavior</p>
            
            <div class="form">
                <div class="group">
                    <label for="example-text">Text Input</label>
                    <input type="text" id="example-text" name="example-text" placeholder="Enter text here">
                </div>

                <div class="group">
                    <label for="example-email">Email Input</label>
                    <input type="email" id="example-email" name="example-email" placeholder="user@example.com">
                </div>

                <div class="group">
                    <label for="example-password">Password Input</label>
                    <input type="password" id="example-password" name="example-password" placeholder="Enter password">
                </div>

                <div class="group">
                    <label for="example-select">Select Dropdown</label>
                    <select id="example-select" name="example-select">
                        <option value="">Choose an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>

                <div class="group">
                    <label for="example-textarea">Textarea</label>
                    <textarea id="example-textarea" name="example-textarea" rows="4" placeholder="Enter your message here"></textarea>
                </div>

                <div class="group">
                    <label for="example-file">File Upload</label>
                    <input type="file" id="example-file" name="example-file">
                    <small class="help">Supports PDF, DOC, and image files</small>
                </div>

                <div class="group">
                    <label for="example-range">Range Slider</label>
                    <input type="range" id="example-range" name="example-range" min="0" max="100" value="50">
                    <small class="help">Drag to adjust value</small>
                </div>

                <div class="group">
                    <fieldset>
                        <legend>Checkbox Options</legend>
                        <div class="options">
                            <div class="option">
                                <input type="checkbox" id="check1" name="example-checks[]" value="option1">
                                <label for="check1">Option 1</label>
                            </div>
                            <div class="option">
                                <input type="checkbox" id="check2" name="example-checks[]" value="option2" checked>
                                <label for="check2">Option 2</label>
                            </div>
                            <div class="option">
                                <input type="checkbox" id="check3" name="example-checks[]" value="option3">
                                <label for="check3">Option 3</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="group">
                    <fieldset>
                        <legend>Radio Button Options</legend>
                        <div class="options">
                            <div class="option">
                                <input type="radio" id="radio1" name="example-radio" value="option1">
                                <label for="radio1">Option 1</label>
                            </div>
                            <div class="option">
                                <input type="radio" id="radio2" name="example-radio" value="option2" checked>
                                <label for="radio2">Option 2</label>
                            </div>
                            <div class="option">
                                <input type="radio" id="radio3" name="example-radio" value="option3">
                                <label for="radio3">Option 3</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="group inline">
                    <fieldset>
                        <legend>Inline Checkboxes</legend>
                        <div class="options">
                            <div class="option">
                                <input type="checkbox" id="inline1" name="example-inline[]" value="option1" checked>
                                <label for="inline1">Option 1</label>
                            </div>
                            <div class="option">
                                <input type="checkbox" id="inline2" name="example-inline[]" value="option2">
                                <label for="inline2">Option 2</label>
                            </div>
                            <div class="option">
                                <input type="checkbox" id="inline3" name="example-inline[]" value="option3" checked>
                                <label for="inline3">Option 3</label>
                            </div>
                            <div class="option">
                                <input type="checkbox" id="inline4" name="example-inline[]" value="option4">
                                <label for="inline4">Option 4</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </section>

    <!-- Validation States -->
    <section class="section">
        <div class="container">
            <h2 class="text-center">Validation States</h2>
            <p class="text-center">Visual feedback for form validation with clear error messaging</p>
            
            <div class="form">
                <div class="group">
                    <label for="valid-input">Valid Input</label>
                    <input type="text" id="valid-input" name="valid-input" value="Valid input" style="border-color: var(--success);">
                    <small class="help" style="color: var(--success);">✓ This field is valid</small>
                </div>

                <div class="group">
                    <label for="invalid-input">Invalid Input</label>
                    <input type="email" id="invalid-input" name="invalid-input" value="invalid-email" style="border-color: var(--danger);">
                    <small class="error">✗ Please enter a valid email address</small>
                </div>

                <div class="group">
                    <label for="warning-input">Warning Input</label>
                    <input type="password" id="warning-input" name="warning-input" value="weak" style="border-color: var(--warning);">
                    <small class="help" style="color: var(--warning);">⚠ Password strength: weak</small>
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
    <script src="components/form/form.js"></script>
    
    <!-- Main JavaScript -->
    <script src="main.js"></script>
</body>
</html>