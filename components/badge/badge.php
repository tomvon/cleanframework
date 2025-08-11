<?php
/**
 * Badge Component
 * 
 * Labels, status indicators, and tags for categorization
 */

// Example badge data
$badge_examples = $badge_examples ?? [
    [
        'category' => 'Status Badges',
        'badges' => [
            ['text' => 'Active', 'type' => 'success'],
            ['text' => 'Pending', 'type' => 'warning'],
            ['text' => 'Inactive', 'type' => 'danger'],
            ['text' => 'Draft', 'type' => 'secondary']
        ]
    ],
    [
        'category' => 'Priority Labels',
        'badges' => [
            ['text' => 'High Priority', 'type' => 'danger'],
            ['text' => 'Medium Priority', 'type' => 'warning'],
            ['text' => 'Low Priority', 'type' => 'info'],
            ['text' => 'Normal', 'type' => 'secondary']
        ]
    ],
    [
        'category' => 'Category Tags',
        'badges' => [
            ['text' => 'Design', 'type' => 'primary'],
            ['text' => 'Development', 'type' => 'info'],
            ['text' => 'Marketing', 'type' => 'success'],
            ['text' => 'Sales', 'type' => 'warning']
        ]
    ],
    [
        'category' => 'Count Badges',
        'badges' => [
            ['text' => '5', 'type' => 'primary'],
            ['text' => '12', 'type' => 'success'],
            ['text' => '99+', 'type' => 'danger'],
            ['text' => 'New', 'type' => 'info']
        ]
    ]
];
?>

<?php foreach ($badge_examples as $groupIndex => $group): ?>
    <div class="badge-group">
        <h3><?= $group['category'] ?></h3>
        <div class="badges">
            <?php foreach ($group['badges'] as $badge): ?>
                <span class="badge badge-<?= $badge['type'] ?>"><?= $badge['text'] ?></span>
            <?php endforeach; ?>
        </div>
    </div>
    
    <?php if ($group !== end($badge_examples)): ?>
        <div class="component-spacer-small"></div>
    <?php endif; ?>
<?php endforeach; ?>