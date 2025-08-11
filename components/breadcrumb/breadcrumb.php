<?php
/**
 * Breadcrumb Component
 * 
 * Navigation hierarchy showing the user's location in the site structure
 */

// Example breadcrumb data
$breadcrumbs = $breadcrumbs ?? [
    [
        'items' => [
            ['label' => 'Home', 'url' => '#'],
            ['label' => 'Components', 'url' => '#'],
            ['label' => 'Navigation', 'url' => '#'],
            ['label' => 'Breadcrumbs', 'current' => true]
        ]
    ],
    [
        'items' => [
            ['label' => 'Dashboard', 'url' => '#'],
            ['label' => 'User Management', 'url' => '#'],
            ['label' => 'Edit Profile', 'current' => true]
        ]
    ],
    [
        'items' => [
            ['label' => 'E-commerce', 'url' => '#'],
            ['label' => 'Electronics', 'url' => '#'],
            ['label' => 'Smartphones', 'url' => '#'],
            ['label' => 'iPhone 15 Pro', 'current' => true]
        ]
    ]
];
?>

<?php foreach ($breadcrumbs as $index => $breadcrumb): ?>
    <nav class="breadcrumb" aria-label="Breadcrumb navigation">
        <ol class="breadcrumb-list">
            <?php foreach ($breadcrumb['items'] as $itemIndex => $item): ?>
                <li class="breadcrumb-item <?= !empty($item['current']) ? 'breadcrumb-current' : '' ?>">
                    <?php if (!empty($item['current'])): ?>
                        <span aria-current="page"><?= $item['label'] ?></span>
                    <?php else: ?>
                        <a href="<?= $item['url'] ?>"><?= $item['label'] ?></a>
                    <?php endif; ?>
                    
                    <?php if ($itemIndex < count($breadcrumb['items']) - 1): ?>
                        <span class="breadcrumb-separator" aria-hidden="true">
                            <i class="fas fa-chevron-right"></i>
                        </span>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ol>
    </nav>

    <?php if ($breadcrumb !== end($breadcrumbs)): ?>
        <div class="component-spacer-small"></div>
    <?php endif; ?>
<?php endforeach; ?>