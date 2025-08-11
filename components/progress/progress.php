<?php
/**
 * Progress Bar Component
 * 
 * Visual indicators for completion states and loading progress
 */

// Example progress data
$progress_examples = $progress_examples ?? [
    [
        'category' => 'Basic Progress',
        'items' => [
            ['label' => 'Upload Progress', 'value' => 65, 'max' => 100, 'type' => 'primary'],
            ['label' => 'Profile Completion', 'value' => 85, 'max' => 100, 'type' => 'success'],
            ['label' => 'Storage Used', 'value' => 42, 'max' => 100, 'type' => 'warning'],
            ['label' => 'Memory Usage', 'value' => 78, 'max' => 100, 'type' => 'danger']
        ]
    ],
    [
        'category' => 'Skill Levels',
        'items' => [
            ['label' => 'JavaScript', 'value' => 90, 'max' => 100, 'type' => 'success'],
            ['label' => 'CSS/SCSS', 'value' => 75, 'max' => 100, 'type' => 'primary'],
            ['label' => 'PHP', 'value' => 60, 'max' => 100, 'type' => 'info'],
            ['label' => 'Python', 'value' => 45, 'max' => 100, 'type' => 'warning']
        ]
    ],
    [
        'category' => 'Project Status',
        'items' => [
            ['label' => 'Clean Framework', 'value' => 95, 'max' => 100, 'type' => 'success', 'showValue' => true],
            ['label' => 'Documentation', 'value' => 70, 'max' => 100, 'type' => 'primary', 'showValue' => true],
            ['label' => 'Testing', 'value' => 30, 'max' => 100, 'type' => 'warning', 'showValue' => true]
        ]
    ]
];
?>

<?php foreach ($progress_examples as $groupIndex => $group): ?>
    <div class="progress-group">
        <h3><?= $group['category'] ?></h3>
        <div class="progress-items">
            <?php foreach ($group['items'] as $item): ?>
                <div class="progress-item">
                    <div class="progress-header">
                        <span class="progress-label"><?= $item['label'] ?></span>
                        <?php if (!empty($item['showValue'])): ?>
                            <span class="progress-value"><?= $item['value'] ?>%</span>
                        <?php endif; ?>
                    </div>
                    <div class="progress progress-<?= $item['type'] ?>" 
                         role="progressbar" 
                         aria-valuenow="<?= $item['value'] ?>" 
                         aria-valuemin="0" 
                         aria-valuemax="<?= $item['max'] ?>"
                         aria-label="<?= $item['label'] ?> progress">
                        <div class="progress-bar" data-width="<?= ($item['value'] / $item['max']) * 100 ?>%"></div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <?php if ($group !== end($progress_examples)): ?>
        <div class="component-spacer-small"></div>
    <?php endif; ?>
<?php endforeach; ?>