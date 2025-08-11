<?php
/**
 * Tooltip Component
 * 
 * Contextual information displayed on hover or focus
 */

// Example tooltip data
$tooltip_examples = $tooltip_examples ?? [
    [
        'text' => 'Hover me',
        'tooltip' => 'This is a simple tooltip with helpful information.',
        'position' => 'top'
    ],
    [
        'text' => 'Settings',
        'tooltip' => 'Configure your account preferences and privacy settings.',
        'position' => 'right',
        'icon' => 'fas fa-cog'
    ],
    [
        'text' => 'Delete',
        'tooltip' => 'Permanently remove this item. This action cannot be undone.',
        'position' => 'bottom',
        'type' => 'danger'
    ],
    [
        'text' => 'More info',
        'tooltip' => 'Clean Framework provides semantic HTML components with no utility classes.',
        'position' => 'left'
    ]
];
?>

<div class="tooltip-examples">
    <div class="tooltip-demo-grid">
        <?php foreach ($tooltip_examples as $index => $example): ?>
            <div class="tooltip-wrapper">
                <button class="button <?= !empty($example['type']) ? $example['type'] : 'secondary' ?> tooltip-trigger"
                        data-tooltip="<?= htmlspecialchars($example['tooltip']) ?>"
                        data-tooltip-position="<?= $example['position'] ?>">
                    <?php if (!empty($example['icon'])): ?>
                        <i class="<?= $example['icon'] ?>"></i>
                    <?php endif; ?>
                    <?= $example['text'] ?>
                </button>
            </div>
        <?php endforeach; ?>
    </div>
    
</div>