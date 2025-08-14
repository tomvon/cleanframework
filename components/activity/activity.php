<?php
/**
 * Activity Feed/Timeline Component
 * Timeline for activity logs, notifications, and updates
 */

// Sample activity data
$activities = [
    [
        'id' => 1,
        'type' => 'user_added',
        'icon' => 'user-plus',
        'color' => 'success',
        'title' => 'New user registered',
        'description' => 'Sarah Johnson joined as Administrator',
        'user' => ['name' => 'System', 'avatar' => 'S'],
        'time' => '5 minutes ago',
        'timestamp' => '2024-01-15 14:30:00',
        'details' => [
            'Email' => 'sarah.johnson@example.com',
            'Role' => 'Administrator',
            'Department' => 'Engineering'
        ]
    ],
    [
        'id' => 2,
        'type' => 'order_completed',
        'icon' => 'shopping-cart',
        'color' => 'primary',
        'title' => 'Order completed',
        'description' => 'Order #12345 has been successfully delivered',
        'user' => ['name' => 'Michael Chen', 'avatar' => 'MC'],
        'time' => '2 hours ago',
        'timestamp' => '2024-01-15 12:45:00',
        'details' => [
            'Order ID' => '#12345',
            'Customer' => 'John Doe',
            'Amount' => '$1,234.56',
            'Items' => '3 items'
        ]
    ],
    [
        'id' => 3,
        'type' => 'system_update',
        'icon' => 'sync',
        'color' => 'warning',
        'title' => 'System update',
        'description' => 'Database maintenance completed successfully',
        'user' => ['name' => 'System', 'avatar' => 'S'],
        'time' => '3 hours ago',
        'timestamp' => '2024-01-15 11:30:00'
    ],
    [
        'id' => 4,
        'type' => 'comment_added',
        'icon' => 'comment',
        'color' => 'info',
        'title' => 'New comment',
        'description' => 'Emily Davis commented on "Q4 Sales Report"',
        'user' => ['name' => 'Emily Davis', 'avatar' => 'ED'],
        'time' => '5 hours ago',
        'timestamp' => '2024-01-15 09:30:00',
        'comment' => 'Great work on the sales figures! The growth in the enterprise segment is particularly impressive.'
    ],
    [
        'id' => 5,
        'type' => 'file_uploaded',
        'icon' => 'file-upload',
        'color' => 'secondary',
        'title' => 'File uploaded',
        'description' => 'Q4 Financial Report.pdf uploaded to Documents',
        'user' => ['name' => 'James Wilson', 'avatar' => 'JW'],
        'time' => 'Yesterday',
        'timestamp' => '2024-01-14 16:15:00',
        'file' => [
            'name' => 'Q4 Financial Report.pdf',
            'size' => '2.4 MB',
            'type' => 'PDF'
        ]
    ],
    [
        'id' => 6,
        'type' => 'security_alert',
        'icon' => 'shield-alt',
        'color' => 'danger',
        'title' => 'Security alert',
        'description' => 'Failed login attempts detected from unknown IP',
        'user' => ['name' => 'Security System', 'avatar' => 'SS'],
        'time' => '2 days ago',
        'timestamp' => '2024-01-13 14:20:00',
        'details' => [
            'IP Address' => '192.168.1.100',
            'Attempts' => '5 failed attempts',
            'Action' => 'IP temporarily blocked'
        ]
    ]
];

// Group activities by date
$grouped_activities = [];
foreach ($activities as $activity) {
    $date = date('Y-m-d', strtotime($activity['timestamp']));
    if ($date === date('Y-m-d')) {
        $date_label = 'Today';
    } elseif ($date === date('Y-m-d', strtotime('-1 day'))) {
        $date_label = 'Yesterday';
    } else {
        $date_label = date('F j, Y', strtotime($activity['timestamp']));
    }
    
    if (!isset($grouped_activities[$date_label])) {
        $grouped_activities[$date_label] = [];
    }
    $grouped_activities[$date_label][] = $activity;
}
?>

<div class="activity-feed">
    <!-- Activity Header -->
    <div class="activity-header">
        <h3 class="activity-title">Activity Feed</h3>
        
        <div class="activity-controls">
            <!-- Filter Dropdown -->
            <div class="dropdown">
                <button class="button secondary small dropdown-toggle" onclick="toggleDropdown(this)">
                    <i class="fas fa-filter"></i>
                    All Activities
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item active" onclick="filterActivities('all')">
                        <i class="fas fa-list"></i>
                        All Activities
                    </button>
                    <button class="dropdown-item" onclick="filterActivities('users')">
                        <i class="fas fa-users"></i>
                        User Activities
                    </button>
                    <button class="dropdown-item" onclick="filterActivities('orders')">
                        <i class="fas fa-shopping-cart"></i>
                        Orders
                    </button>
                    <button class="dropdown-item" onclick="filterActivities('system')">
                        <i class="fas fa-cog"></i>
                        System Events
                    </button>
                    <button class="dropdown-item" onclick="filterActivities('security')">
                        <i class="fas fa-shield-alt"></i>
                        Security
                    </button>
                </div>
            </div>
            
            <!-- Refresh Button -->
            <button class="button small" onclick="refreshActivityFeed()">
                <i class="fas fa-sync"></i>
                Refresh
            </button>
        </div>
    </div>
    
    <!-- Activity Timeline -->
    <div class="activity-timeline">
        <?php foreach ($grouped_activities as $date => $activities): ?>
        <!-- Date Separator -->
        <div class="activity-date">
            <span class="activity-date-label"><?= $date ?></span>
        </div>
        
        <?php foreach ($activities as $activity): ?>
        <!-- Activity Item -->
        <div class="activity-item" data-type="<?= $activity['type'] ?>">
            <div class="activity-marker">
                <div class="activity-icon activity-icon-<?= $activity['color'] ?>">
                    <i class="fas fa-<?= $activity['icon'] ?>"></i>
                </div>
            </div>
            
            <div class="activity-content">
                <div class="activity-main">
                    <h4 class="activity-item-title"><?= htmlspecialchars($activity['title']) ?></h4>
                    <p class="activity-description"><?= htmlspecialchars($activity['description']) ?></p>
                    
                    <?php if (isset($activity['comment'])): ?>
                    <div class="activity-comment">
                        <i class="fas fa-quote-left"></i>
                        <?= htmlspecialchars($activity['comment']) ?>
                    </div>
                    <?php endif; ?>
                    
                    <?php if (isset($activity['details'])): ?>
                    <div class="activity-details">
                        <?php foreach ($activity['details'] as $label => $value): ?>
                        <div class="activity-detail-item">
                            <span class="activity-detail-label"><?= $label ?>:</span>
                            <span class="activity-detail-value"><?= htmlspecialchars($value) ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                    
                    <?php if (isset($activity['file'])): ?>
                    <div class="activity-file">
                        <i class="fas fa-file-pdf"></i>
                        <div class="activity-file-info">
                            <div class="activity-file-name"><?= htmlspecialchars($activity['file']['name']) ?></div>
                            <div class="activity-file-meta"><?= $activity['file']['type'] ?> • <?= $activity['file']['size'] ?></div>
                        </div>
                        <button class="button small">
                            <i class="fas fa-download"></i>
                            Download
                        </button>
                    </div>
                    <?php endif; ?>
                </div>
                
                <div class="activity-meta">
                    <div class="activity-user">
                        <div class="activity-avatar">
                            <?= $activity['user']['avatar'] ?>
                        </div>
                        <span class="activity-username"><?= htmlspecialchars($activity['user']['name']) ?></span>
                    </div>
                    <span class="activity-time">
                        <i class="fas fa-clock"></i>
                        <?= $activity['time'] ?>
                    </span>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
        <?php endforeach; ?>
        
        <!-- Load More -->
        <div class="activity-load-more">
            <button class="button secondary" onclick="loadMoreActivities()">
                <i class="fas fa-plus"></i>
                Load More Activities
            </button>
        </div>
    </div>
</div>

<!-- Alternative: Compact Activity List -->
<div class="activity-compact">
    <h3>Compact Activity List</h3>
    
    <div class="activity-list">
        <?php foreach (array_slice($activities, 0, 5) as $activity): ?>
        <div class="activity-list-item">
            <div class="activity-list-icon activity-icon-<?= $activity['color'] ?>">
                <i class="fas fa-<?= $activity['icon'] ?>"></i>
            </div>
            
            <div class="activity-list-content">
                <div class="activity-list-text">
                    <strong><?= htmlspecialchars($activity['user']['name']) ?></strong>
                    <?= htmlspecialchars($activity['description']) ?>
                </div>
                <div class="activity-list-time"><?= $activity['time'] ?></div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    
    <a href="#" class="activity-view-all">View all activities →</a>
</div>