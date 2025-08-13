<?php
/**
 * Dashboard Component
 * Metric cards, charts, and admin dashboard elements
 */

// Default dashboard data
$dashboard = $dashboard ?? [
    'cards' => [
        [
            'title' => 'Total Users',
            'value' => '2,847',
            'change' => [
                'value' => '+12.5%',
                'type' => 'positive'
            ],
            'icon' => 'fas fa-users',
            'icon_type' => 'primary',
            'description' => 'Active registered users'
        ],
        [
            'title' => 'Revenue',
            'value' => '$54,329',
            'change' => [
                'value' => '+8.2%',
                'type' => 'positive'
            ],
            'icon' => 'fas fa-dollar-sign',
            'icon_type' => 'success',
            'description' => 'Total revenue this month'
        ],
        [
            'title' => 'Orders',
            'value' => '1,423',
            'change' => [
                'value' => '-2.4%',
                'type' => 'negative'
            ],
            'icon' => 'fas fa-shopping-cart',
            'icon_type' => 'warning',
            'description' => 'Orders processed today'
        ],
        [
            'title' => 'Conversion',
            'value' => '3.24%',
            'change' => [
                'value' => '+0.8%',
                'type' => 'positive'
            ],
            'icon' => 'fas fa-chart-line',
            'icon_type' => 'primary',
            'description' => 'Visitor to customer conversion'
        ]
    ],
    'progress_cards' => [
        [
            'title' => 'Storage Used',
            'value' => '68.2 GB',
            'total' => '100 GB',
            'percentage' => 68,
            'icon' => 'fas fa-hdd',
            'icon_type' => 'primary'
        ],
        [
            'title' => 'Bandwidth',
            'value' => '847 GB',
            'total' => '1000 GB',
            'percentage' => 85,
            'icon' => 'fas fa-wifi',
            'icon_type' => 'warning'
        ]
    ],
    'chart_cards' => [
        [
            'title' => 'Weekly Sales',
            'value' => '$12,847',
            'chart_data' => [40, 65, 45, 80, 60, 75, 90],
            'icon' => 'fas fa-chart-bar',
            'icon_type' => 'success'
        ]
    ]
];

function renderDashboardCard($card) {
    $icon_class = 'dashboard-card-icon';
    if (!empty($card['icon_type'])) {
        $icon_class .= ' dashboard-card-icon-' . $card['icon_type'];
    }
    
    ob_start();
    ?>
    <div class="dashboard-card">
        <div class="dashboard-card-header">
            <h3 class="dashboard-card-title"><?= htmlspecialchars($card['title']) ?></h3>
            <?php if (!empty($card['icon'])): ?>
                <div class="<?= $icon_class ?>">
                    <i class="<?= htmlspecialchars($card['icon']) ?>" aria-hidden="true"></i>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="dashboard-card-content">
            <div class="dashboard-card-value">
                <?= htmlspecialchars($card['value']) ?>
            </div>
            
            <?php if (!empty($card['change'])): ?>
                <div class="dashboard-card-change dashboard-card-change-<?= htmlspecialchars($card['change']['type']) ?>">
                    <i class="dashboard-card-change-icon fas fa-arrow-<?= $card['change']['type'] === 'positive' ? 'up' : 'down' ?>" aria-hidden="true"></i>
                    <?= htmlspecialchars($card['change']['value']) ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($card['description'])): ?>
                <div class="dashboard-card-description">
                    <?= htmlspecialchars($card['description']) ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function renderProgressCard($card) {
    $icon_class = 'dashboard-card-icon';
    if (!empty($card['icon_type'])) {
        $icon_class .= ' dashboard-card-icon-' . $card['icon_type'];
    }
    
    $progress_class = 'dashboard-card-progress-fill';
    if ($card['percentage'] >= 90) {
        $progress_class .= ' dashboard-card-progress-danger';
    } elseif ($card['percentage'] >= 75) {
        $progress_class .= ' dashboard-card-progress-warning';
    } elseif ($card['percentage'] >= 50) {
        $progress_class .= ' dashboard-card-progress-success';
    }
    
    ob_start();
    ?>
    <div class="dashboard-card dashboard-card-progress">
        <div class="dashboard-card-header">
            <h3 class="dashboard-card-title"><?= htmlspecialchars($card['title']) ?></h3>
            <?php if (!empty($card['icon'])): ?>
                <div class="<?= $icon_class ?>">
                    <i class="<?= htmlspecialchars($card['icon']) ?>" aria-hidden="true"></i>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="dashboard-card-content">
            <div class="dashboard-card-value">
                <?= htmlspecialchars($card['value']) ?>
                <span class="dashboard-card-value-suffix">of <?= htmlspecialchars($card['total']) ?></span>
            </div>
            
            <div class="dashboard-card-progress-bar">
                <div class="<?= $progress_class ?>" 
                     style="width: <?= $card['percentage'] ?>%"
                     data-percentage="<?= $card['percentage'] ?>">
                </div>
            </div>
            
            <div class="dashboard-card-progress-text">
                <span><?= $card['percentage'] ?>% used</span>
                <span><?= 100 - $card['percentage'] ?>% available</span>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function renderChartCard($card) {
    $icon_class = 'dashboard-card-icon';
    if (!empty($card['icon_type'])) {
        $icon_class .= ' dashboard-card-icon-' . $card['icon_type'];
    }
    
    ob_start();
    ?>
    <div class="dashboard-card dashboard-card-chart">
        <div class="dashboard-card-header">
            <h3 class="dashboard-card-title"><?= htmlspecialchars($card['title']) ?></h3>
            <?php if (!empty($card['icon'])): ?>
                <div class="<?= $icon_class ?>">
                    <i class="<?= htmlspecialchars($card['icon']) ?>" aria-hidden="true"></i>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="dashboard-card-content">
            <div class="dashboard-card-value">
                <?= htmlspecialchars($card['value']) ?>
            </div>
            
            <div class="dashboard-card-chart-container">
                <?php if (!empty($card['chart_data'])): ?>
                    <?php 
                    $max_value = max($card['chart_data']);
                    foreach ($card['chart_data'] as $index => $value): 
                        $height = ($value / $max_value) * 80; // Max height 80px
                        $bar_class = 'dashboard-card-chart-bar';
                        if ($value == $max_value) {
                            $bar_class .= ' dashboard-card-chart-bar-' . ($card['icon_type'] ?? 'primary');
                        }
                    ?>
                        <div class="<?= $bar_class ?>" 
                             style="height: <?= $height ?>px"
                             title="Day <?= $index + 1 ?>: $<?= number_format($value * 100) ?>">
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
?>