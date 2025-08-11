<?php
/**
 * Alert Component
 * 
 * Flexible alert system for notifications, warnings, errors, and success messages
 */

// Example alert data - showing just a few examples
$alerts = $alerts ?? [
    [
        'type' => 'info',
        'title' => 'Welcome to Alert Components',
        'message' => 'These are example alerts. Try the interactive buttons below to see toast notifications and create new alerts dynamically.',
        'dismissible' => true
    ],
    [
        'type' => 'success',
        'title' => 'Success Example',
        'message' => 'This is what a success alert looks like. It can include actions and be dismissible.',
        'dismissible' => true,
        'actions' => [
            ['label' => 'View Details', 'url' => '#', 'type' => 'link']
        ]
    ]
];

// Define alert type icons
$alert_icons = [
    'success' => 'fas fa-check-circle',
    'info' => 'fas fa-info-circle', 
    'warning' => 'fas fa-exclamation-triangle',
    'error' => 'fas fa-times-circle'
];
?>

<?php foreach ($alerts as $index => $alert): ?>
    <div class="alert alert-<?= $alert['type'] ?> <?= !empty($alert['dismissible']) ? 'alert-dismissible' : '' ?>" 
         id="alert-<?= $index ?>" 
         role="<?= $alert['type'] === 'error' ? 'alert' : 'status' ?>"
         aria-live="<?= $alert['type'] === 'error' ? 'assertive' : 'polite' ?>">
        
        <div class="alert-content">
            <div class="alert-icon">
                <i class="<?= $alert['icon'] ?? $alert_icons[$alert['type']] ?>"></i>
            </div>
            
            <div class="alert-body">
                <?php if (!empty($alert['title'])): ?>
                    <div class="alert-title"><?= $alert['title'] ?></div>
                <?php endif; ?>
                
                <div class="alert-message"><?= $alert['message'] ?></div>
                
                <?php if (!empty($alert['actions'])): ?>
                    <div class="alert-actions">
                        <?php foreach ($alert['actions'] as $action): ?>
                            <?php if ($action['type'] === 'button'): ?>
                                <button class="alert-button" 
                                        <?= !empty($action['onclick']) ? 'onclick="' . $action['onclick'] . '"' : '' ?>>
                                    <?= $action['label'] ?>
                                </button>
                            <?php elseif ($action['type'] === 'link'): ?>
                                <a href="<?= $action['url'] ?>" class="alert-link"><?= $action['label'] ?></a>
                            <?php elseif ($action['type'] === 'dismiss'): ?>
                                <button class="alert-button" onclick="dismissAlert('alert-<?= $index ?>')">
                                    <?= $action['label'] ?>
                                </button>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        
        <?php if (!empty($alert['dismissible'])): ?>
            <button class="alert-dismiss" 
                    onclick="dismissAlert('alert-<?= $index ?>')"
                    aria-label="Dismiss alert">
                <i class="fas fa-times"></i>
            </button>
        <?php endif; ?>
    </div>

    <?php if ($alert !== end($alerts)): ?>
        <div class="component-spacer-small"></div>
    <?php endif; ?>
<?php endforeach; ?>