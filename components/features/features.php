<?php
/**
 * Features Component
 * 
 * Showcase key features with icons, images, and descriptions
 */

// Example feature data
$features = $features ?? [
    [
        'icon' => 'fas fa-code',
        'title' => 'Semantic HTML',
        'description' => 'HTML that tells a story. No mental translation required. Just write what you mean and let the framework handle the rest.',
        'details' => [
            'Predictable class names',
            'Human-readable markup',
            'AI-friendly patterns'
        ]
    ],
    [
        'icon' => 'fas fa-rocket',
        'title' => 'Lightning Fast',
        'description' => 'Only 500 lines of CSS. No bloat, no complexity. Clean Framework delivers beautiful, performant websites without the overhead.',
        'details' => [
            'Minimal CSS footprint',
            'Optimized for performance',
            'No unused styles'
        ]
    ],
    [
        'icon' => 'fas fa-puzzle-piece',
        'title' => 'Component-Based',
        'description' => 'Each component is self-contained with its own styles and JavaScript. Build complex interfaces from simple, reusable pieces.',
        'details' => [
            'Modular architecture',
            'Easy to maintain',
            'Scalable design system'
        ]
    ],
    [
        'icon' => 'fas fa-mobile-alt',
        'title' => 'Mobile First',
        'description' => 'Responsive design built in from the ground up. Your sites look perfect on every device, from phones to desktops.',
        'details' => [
            'Touch-friendly interactions',
            'Flexible grid system',
            'Progressive enhancement'
        ]
    ],
    [
        'icon' => 'fas fa-accessibility',
        'title' => 'Accessible by Default',
        'description' => 'ARIA attributes, semantic markup, and keyboard navigation are built into every component. Inclusive design made simple.',
        'details' => [
            'WCAG 2.1 compliant',
            'Screen reader friendly',
            'Keyboard navigation'
        ]
    ],
    [
        'icon' => 'fas fa-palette',
        'title' => 'Themeable',
        'description' => 'CSS custom properties make theming effortless. Light mode, dark mode, or your own brand colors - all supported out of the box.',
        'details' => [
            'CSS custom properties',
            'Dark mode support',
            'Brand customization'
        ]
    ]
];

// Feature section configuration
$feature_section = $feature_section ?? [
    'layout' => 'grid', // 'grid', 'alternating', 'cards'
    'columns' => 3, // 2, 3, 4
    'show_details' => true,
    'image_position' => 'left' // 'left', 'right' (for alternating layout)
];
?>

<div class="features-section">
    <div class="features-header">
        <h2>Why Choose Clean Framework?</h2>
        <p>Everything you need to build beautiful, fast, and accessible websites</p>
    </div>
    
    <?php if ($feature_section['layout'] === 'grid'): ?>
        <!-- Grid Layout -->
        <div class="features-grid features-grid-<?= $feature_section['columns'] ?>">
            <?php foreach($features as $feature): ?>
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="<?= $feature['icon'] ?>" aria-hidden="true"></i>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title"><?= $feature['title'] ?></h3>
                        <p class="feature-description"><?= $feature['description'] ?></p>
                        
                        <?php if ($feature_section['show_details'] && !empty($feature['details'])): ?>
                            <ul class="feature-details">
                                <?php foreach($feature['details'] as $detail): ?>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> <?= $detail ?></li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
    <?php elseif ($feature_section['layout'] === 'alternating'): ?>
        <!-- Alternating Layout -->
        <div class="features-alternating">
            <?php foreach($features as $index => $feature): 
                $isEven = $index % 2 === 0;
                $imagePosition = $feature_section['image_position'];
                $reverse = ($imagePosition === 'left' && !$isEven) || ($imagePosition === 'right' && $isEven);
            ?>
                <div class="feature-row <?= $reverse ? 'feature-row-reverse' : '' ?>">
                    <div class="feature-visual">
                        <div class="feature-icon-large">
                            <i class="<?= $feature['icon'] ?>" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title"><?= $feature['title'] ?></h3>
                        <p class="feature-description"><?= $feature['description'] ?></p>
                        
                        <?php if ($feature_section['show_details'] && !empty($feature['details'])): ?>
                            <ul class="feature-details">
                                <?php foreach($feature['details'] as $detail): ?>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> <?= $detail ?></li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
    <?php else: // cards layout ?>
        <!-- Cards Layout -->
        <div class="features-cards">
            <?php foreach($features as $feature): ?>
                <div class="feature-card">
                    <div class="feature-card-header">
                        <div class="feature-icon">
                            <i class="<?= $feature['icon'] ?>" aria-hidden="true"></i>
                        </div>
                        <h3 class="feature-title"><?= $feature['title'] ?></h3>
                    </div>
                    <div class="feature-card-content">
                        <p class="feature-description"><?= $feature['description'] ?></p>
                        
                        <?php if ($feature_section['show_details'] && !empty($feature['details'])): ?>
                            <ul class="feature-details">
                                <?php foreach($feature['details'] as $detail): ?>
                                    <li><i class="fas fa-check" aria-hidden="true"></i> <?= $detail ?></li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<!-- Feature Section Examples -->
<div class="component-spacer"></div>

<div class="features-section">
    <div class="features-header">
        <h2>Alternating Layout Example</h2>
        <p>Features with images in an alternating pattern</p>
    </div>
    
    <div class="features-alternating">
        <?php 
        // Create alternating features with images
        $alternating_features = [
            [
                'image' => 'img/samples/pexels-earano-1330219.jpg',
                'title' => 'Semantic HTML',
                'description' => 'HTML that tells a story. No mental translation required. Just write what you mean and let the framework handle the rest.',
                'details' => [
                    'Predictable class names',
                    'Human-readable markup',
                    'AI-friendly patterns'
                ]
            ],
            [
                'image' => 'img/samples/pexels-fabianwiktor-994605.jpg',
                'title' => 'Lightning Fast',
                'description' => 'Only 500 lines of CSS. No bloat, no complexity. Clean Framework delivers beautiful, performant websites without the overhead.',
                'details' => [
                    'Minimal CSS footprint',
                    'Optimized for performance',
                    'No unused styles'
                ]
            ],
            [
                'image' => 'img/samples/pexels-george-desipris-801857.jpg',
                'title' => 'Component-Based',
                'description' => 'Each component is self-contained with its own styles and JavaScript. Build complex interfaces from simple, reusable pieces.',
                'details' => [
                    'Modular architecture',
                    'Easy to maintain',
                    'Scalable design system'
                ]
            ]
        ];
        
        foreach($alternating_features as $index => $feature): 
            $reverse = $index % 2 === 1;
        ?>
            <div class="feature-row <?= $reverse ? 'feature-row-reverse' : '' ?>">
                <div class="feature-visual">
                    <div class="feature-image">
                        <img src="<?= $feature['image'] ?>" alt="<?= $feature['title'] ?>" loading="lazy">
                    </div>
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

<div class="component-spacer"></div>

<div class="features-section">
    <div class="features-header">
        <h2>Card Layout Example</h2>
        <p>Features presented as individual cards with hover effects</p>
    </div>
    
    <div class="features-cards">
        <?php foreach(array_slice($features, 0, 3) as $feature): ?>
            <div class="feature-card">
                <div class="feature-card-header">
                    <div class="feature-icon">
                        <i class="<?= $feature['icon'] ?>" aria-hidden="true"></i>
                    </div>
                    <h3 class="feature-title"><?= $feature['title'] ?></h3>
                </div>
                <div class="feature-card-content">
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