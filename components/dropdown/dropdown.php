<?php
/**
 * Dropdown Component
 * 
 * Simple dropdown component with direct button-to-menu relationship
 */

// Example dropdown data
$dropdowns = $dropdowns ?? [
    [
        'id' => 'navigation-menu',
        'trigger' => '<i class="fas fa-bars"></i> Navigation Menu',
        'type' => 'menu',
        'position' => 'bottom-left',
        'items' => [
            ['label' => 'Dashboard', 'url' => '#', 'icon' => 'fas fa-tachometer-alt'],
            ['label' => 'Profile', 'url' => '#', 'icon' => 'fas fa-user'],
            ['label' => 'Settings', 'url' => '#', 'icon' => 'fas fa-cog'],
            ['divider' => true],
            ['label' => 'Logout', 'url' => '#', 'icon' => 'fas fa-sign-out-alt', 'class' => 'danger']
        ]
    ],
    [
        'id' => 'user-actions',
        'trigger' => '<i class="fas fa-user"></i> User Actions',
        'type' => 'action',
        'position' => 'bottom-left',
        'items' => [
            ['label' => 'View Profile', 'url' => '#', 'icon' => 'fas fa-user'],
            ['label' => 'Account Settings', 'url' => '#', 'icon' => 'fas fa-cog'],
            ['label' => 'Billing', 'url' => '#', 'icon' => 'fas fa-credit-card'],
            ['divider' => true],
            ['label' => 'Help & Support', 'url' => '#', 'icon' => 'fas fa-question-circle'],
            ['divider' => true],
            ['label' => 'Sign Out', 'url' => '#', 'icon' => 'fas fa-sign-out-alt', 'class' => 'danger']
        ]
    ],
    [
        'id' => 'language-select',
        'trigger' => '<i class="fas fa-globe"></i> Language Select',
        'type' => 'select',
        'position' => 'bottom-left',
        'items' => [
            ['label' => 'English', 'value' => 'en', 'selected' => true],
            ['label' => 'Spanish', 'value' => 'es'],
            ['label' => 'French', 'value' => 'fr'],
            ['label' => 'German', 'value' => 'de'],
            ['label' => 'Japanese', 'value' => 'ja']
        ]
    ],
    [
        'id' => 'more-actions',
        'trigger' => '<i class="fas fa-ellipsis-v"></i>',
        'type' => 'action',
        'position' => 'bottom-left',
        'items' => [
            ['label' => 'Edit', 'url' => '#', 'icon' => 'fas fa-edit'],
            ['label' => 'Duplicate', 'url' => '#', 'icon' => 'fas fa-copy'],
            ['label' => 'Share', 'url' => '#', 'icon' => 'fas fa-share'],
            ['divider' => true],
            ['label' => 'Archive', 'url' => '#', 'icon' => 'fas fa-archive'],
            ['label' => 'Delete', 'url' => '#', 'icon' => 'fas fa-trash', 'class' => 'danger']
        ]
    ]
];
?>

<div class="dropdown-examples">
    <?php foreach ($dropdowns as $dropdown): ?>
        <div class="dropdown" data-type="<?= $dropdown['type'] ?? 'menu' ?>">
            <button class="dropdown-trigger button secondary" 
                    id="<?= $dropdown['id'] ?>-trigger"
                    onclick="toggleDropdown('<?= $dropdown['id'] ?>')"
                    aria-haspopup="true"
                    aria-expanded="false">
                <?= $dropdown['trigger'] ?>
                <?php if ($dropdown['type'] === 'select'): ?>
                    <i class="dropdown-chevron fas fa-chevron-down"></i>
                <?php endif; ?>
            </button>
            
            <div class="dropdown-menu <?= $dropdown['position'] ?? 'bottom-left' ?>" 
                 id="<?= $dropdown['id'] ?>-menu"
                 role="menu"
                 aria-labelledby="<?= $dropdown['id'] ?>-trigger">
                <?php foreach ($dropdown['items'] as $item): ?>
                    <?php if (!empty($item['divider'])): ?>
                        <div class="dropdown-divider"></div>
                    <?php else: ?>
                        <?php if (($dropdown['type'] ?? 'menu') === 'select'): ?>
                            <button class="dropdown-item <?= !empty($item['selected']) ? 'selected' : '' ?>" 
                                    onclick="selectDropdownItem('<?= $dropdown['id'] ?>', '<?= $item['value'] ?>', '<?= $item['label'] ?>')"
                                    data-value="<?= $item['value'] ?>">
                                <?php if (!empty($item['icon'])): ?>
                                    <i class="<?= $item['icon'] ?>"></i>
                                <?php endif; ?>
                                <span><?= $item['label'] ?></span>
                                <?php if (!empty($item['selected'])): ?>
                                    <i class="dropdown-check fas fa-check"></i>
                                <?php endif; ?>
                            </button>
                        <?php else: ?>
                            <a class="dropdown-item <?= $item['class'] ?? '' ?>" 
                               href="<?= $item['url'] ?>" 
                               role="menuitem">
                                <?php if (!empty($item['icon'])): ?>
                                    <i class="<?= $item['icon'] ?>"></i>
                                <?php endif; ?>
                                <span><?= $item['label'] ?></span>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>

