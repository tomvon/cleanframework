<?php
/**
 * Stats/Counter Component
 * 
 * Animated counters and statistical displays for showcasing achievements
 */

// Example stats data
$stats = $stats ?? [
    [
        'value' => 10000,
        'suffix' => '+',
        'label' => 'Happy Customers',
        'description' => 'Developers using Clean Framework',
        'icon' => 'fas fa-users',
        'color' => 'primary'
    ],
    [
        'value' => 500,
        'suffix' => 'k',
        'label' => 'Lines of Code',
        'description' => 'Saved with our framework',
        'icon' => 'fas fa-code',
        'color' => 'success'
    ],
    [
        'value' => 99.9,
        'suffix' => '%',
        'label' => 'Uptime',
        'description' => 'Reliable performance',
        'icon' => 'fas fa-chart-line',
        'color' => 'info'
    ],
    [
        'value' => 24,
        'suffix' => '/7',
        'label' => 'Support',
        'description' => 'Always here to help',
        'icon' => 'fas fa-headset',
        'color' => 'warning'
    ]
];

// Alternative stats sets
$business_stats = [
    [
        'value' => 5,
        'suffix' => '+',
        'label' => 'Years Experience',
        'description' => 'Building web solutions',
        'icon' => 'fas fa-calendar-alt'
    ],
    [
        'value' => 150,
        'suffix' => '+',
        'label' => 'Projects Completed',
        'description' => 'Successfully delivered',
        'icon' => 'fas fa-project-diagram'
    ],
    [
        'value' => 50,
        'suffix' => '+',
        'label' => 'Team Members',
        'description' => 'Expert developers',
        'icon' => 'fas fa-user-friends'
    ],
    [
        'value' => 95,
        'suffix' => '%',
        'label' => 'Client Satisfaction',
        'description' => 'Positive feedback',
        'icon' => 'fas fa-star'
    ]
];

$tech_stats = [
    [
        'value' => 1,
        'suffix' => 'ms',
        'label' => 'Load Time',
        'description' => 'Lightning fast',
        'icon' => 'fas fa-bolt'
    ],
    [
        'value' => 100,
        'suffix' => '/100',
        'label' => 'Lighthouse Score',
        'description' => 'Perfect performance',
        'icon' => 'fas fa-tachometer-alt'
    ],
    [
        'value' => 0,
        'suffix' => '',
        'label' => 'Dependencies',
        'description' => 'Pure CSS & JS',
        'icon' => 'fas fa-feather-alt'
    ],
    [
        'value' => 12,
        'suffix' => 'kb',
        'label' => 'File Size',
        'description' => 'Minified CSS',
        'icon' => 'fas fa-file-code'
    ]
];
?>

<div class="stats-section">
    <div class="stats-header">
        <h2>Trusted by Thousands</h2>
        <p>Numbers that speak for themselves</p>
    </div>
    
    <div class="stats-grid">
        <?php foreach($stats as $stat): ?>
            <div class="stat-item" data-color="<?= $stat['color'] ?? 'primary' ?>">
                <div class="stat-icon">
                    <i class="<?= $stat['icon'] ?>" aria-hidden="true"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">
                        <span class="stat-number" data-value="<?= $stat['value'] ?>">0</span>
                        <span class="stat-suffix"><?= $stat['suffix'] ?></span>
                    </div>
                    <h3 class="stat-label"><?= $stat['label'] ?></h3>
                    <p class="stat-description"><?= $stat['description'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Business Stats -->
<div class="stats-section stats-minimal">
    <div class="stats-header">
        <h2>Our Track Record</h2>
        <p>Building excellence since day one</p>
    </div>
    
    <div class="stats-row">
        <?php foreach($business_stats as $stat): ?>
            <div class="stat-minimal">
                <div class="stat-value">
                    <span class="stat-number" data-value="<?= $stat['value'] ?>">0</span>
                    <span class="stat-suffix"><?= $stat['suffix'] ?></span>
                </div>
                <div class="stat-label"><?= $stat['label'] ?></div>
                <div class="stat-description"><?= $stat['description'] ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Technical Stats with Cards -->
<div class="stats-section">
    <div class="stats-header">
        <h2>Technical Excellence</h2>
        <p>Performance metrics that matter</p>
    </div>
    
    <div class="stats-cards">
        <?php foreach($tech_stats as $stat): ?>
            <div class="stat-card">
                <div class="stat-card-icon">
                    <i class="<?= $stat['icon'] ?>" aria-hidden="true"></i>
                </div>
                <div class="stat-card-content">
                    <div class="stat-value">
                        <span class="stat-number" data-value="<?= $stat['value'] ?>">0</span>
                        <span class="stat-suffix"><?= $stat['suffix'] ?></span>
                    </div>
                    <h3 class="stat-label"><?= $stat['label'] ?></h3>
                    <p class="stat-description"><?= $stat['description'] ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Horizontal Stats Bar -->
<div class="stats-section stats-horizontal">
    <div class="stats-bar">
        <?php foreach(array_slice($stats, 0, 3) as $stat): ?>
            <div class="stat-horizontal">
                <div class="stat-icon-small">
                    <i class="<?= $stat['icon'] ?>" aria-hidden="true"></i>
                </div>
                <div class="stat-content-horizontal">
                    <div class="stat-value">
                        <span class="stat-number" data-value="<?= $stat['value'] ?>">0</span>
                        <span class="stat-suffix"><?= $stat['suffix'] ?></span>
                    </div>
                    <div class="stat-label"><?= $stat['label'] ?></div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Progress Bar Stats -->
<div class="stats-section">
    <div class="stats-header">
        <h2>Performance Metrics</h2>
        <p>See how we stack up</p>
    </div>
    
    <div class="stats-progress">
        <div class="stat-progress-item">
            <div class="stat-progress-header">
                <span class="stat-label">Performance Score</span>
                <span class="stat-value">
                    <span class="stat-number" data-value="98">0</span>
                    <span class="stat-suffix">/100</span>
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-width="98"></div>
            </div>
        </div>
        
        <div class="stat-progress-item">
            <div class="stat-progress-header">
                <span class="stat-label">Accessibility Score</span>
                <span class="stat-value">
                    <span class="stat-number" data-value="95">0</span>
                    <span class="stat-suffix">/100</span>
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-width="95"></div>
            </div>
        </div>
        
        <div class="stat-progress-item">
            <div class="stat-progress-header">
                <span class="stat-label">Best Practices</span>
                <span class="stat-value">
                    <span class="stat-number" data-value="100">0</span>
                    <span class="stat-suffix">/100</span>
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-width="100"></div>
            </div>
        </div>
        
        <div class="stat-progress-item">
            <div class="stat-progress-header">
                <span class="stat-label">SEO Score</span>
                <span class="stat-value">
                    <span class="stat-number" data-value="92">0</span>
                    <span class="stat-suffix">/100</span>
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-width="92"></div>
            </div>
        </div>
    </div>
</div>