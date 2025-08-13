<?php
/**
 * Sidebar Component
 * Admin navigation sidebar with user profile
 */

// Default sidebar data
$sidebar = $sidebar ?? [
    'brand' => [
        'name' => 'Admin Panel',
        'icon' => 'fas fa-cog',
        'url' => '#'
    ],
    'user' => [
        'name' => 'John Smith',
        'role' => 'Administrator',
        'avatar' => '../img/samples/avatar-default.jpg',
        'url' => '#'
    ],
    'sections' => [
        [
            'title' => 'Main',
            'items' => [
                [
                    'label' => 'Dashboard',
                    'icon' => 'fas fa-tachometer-alt',
                    'url' => '#',
                    'active' => true
                ],
                [
                    'label' => 'Analytics',
                    'icon' => 'fas fa-chart-bar',
                    'url' => '#',
                    'badge' => [
                        'text' => 'New',
                        'type' => 'primary'
                    ]
                ]
            ]
        ],
        [
            'title' => 'Content',
            'items' => [
                [
                    'label' => 'Posts',
                    'icon' => 'fas fa-file-alt',
                    'url' => '#',
                    'badge' => [
                        'text' => '12',
                        'type' => 'secondary'
                    ]
                ],
                [
                    'label' => 'Pages',
                    'icon' => 'fas fa-copy',
                    'url' => '#'
                ],
                [
                    'label' => 'Media Library',
                    'icon' => 'fas fa-images',
                    'url' => '#'
                ],
                [
                    'label' => 'Comments',
                    'icon' => 'fas fa-comments',
                    'url' => '#',
                    'badge' => [
                        'text' => '5',
                        'type' => 'warning'
                    ]
                ]
            ]
        ],
        [
            'title' => 'Users',
            'items' => [
                [
                    'label' => 'All Users',
                    'icon' => 'fas fa-users',
                    'url' => '#'
                ],
                [
                    'label' => 'Roles',
                    'icon' => 'fas fa-user-tag',
                    'url' => '#'
                ],
                [
                    'label' => 'Profile',
                    'icon' => 'fas fa-user-circle',
                    'url' => '#'
                ]
            ]
        ],
        [
            'title' => 'Settings',
            'items' => [
                [
                    'label' => 'General',
                    'icon' => 'fas fa-cog',
                    'url' => '#'
                ],
                [
                    'label' => 'Security',
                    'icon' => 'fas fa-shield-alt',
                    'url' => '#'
                ],
                [
                    'label' => 'Integrations',
                    'icon' => 'fas fa-plug',
                    'url' => '#'
                ]
            ]
        ]
    ]
];

$compact_class = ($sidebar['compact'] ?? false) ? ' sidebar-compact' : '';
$sidebar_id = $sidebar['id'] ?? 'sidebar';
?>

<aside class="sidebar<?= $compact_class ?>" id="<?= htmlspecialchars($sidebar_id) ?>">
    <!-- Brand/Logo -->
    <div class="sidebar-header">
        <a href="<?= htmlspecialchars($sidebar['brand']['url']) ?>" class="sidebar-brand">
            <i class="sidebar-brand-icon <?= htmlspecialchars($sidebar['brand']['icon']) ?>" aria-hidden="true"></i>
            <span class="sidebar-brand-text"><?= htmlspecialchars($sidebar['brand']['name']) ?></span>
        </a>
        <button class="sidebar-toggle-btn" onclick="toggleCompactSidebar()" aria-label="Toggle compact mode">
            <i class="fas fa-compress"></i>
        </button>
    </div>
    
    <!-- Navigation -->
    <nav class="sidebar-nav">
        <?php foreach ($sidebar['sections'] as $section): ?>
            <div class="sidebar-section">
                <?php if (!empty($section['title'])): ?>
                    <div class="sidebar-section-title"><?= htmlspecialchars($section['title']) ?></div>
                <?php endif; ?>
                
                <ul class="sidebar-menu">
                    <?php foreach ($section['items'] as $item): ?>
                        <li class="sidebar-item">
                            <a href="<?= htmlspecialchars($item['url']) ?>" 
                               class="sidebar-link<?= !empty($item['active']) ? ' active' : '' ?>"
                               title="<?= htmlspecialchars($item['title'] ?? $item['label']) ?><?= !empty($item['badge']) ? ' (' . $item['badge']['text'] . ')' : '' ?>"
                               <?= !empty($item['active']) ? 'aria-current="page"' : '' ?>>
                                <i class="sidebar-icon <?= htmlspecialchars($item['icon']) ?>" aria-hidden="true"></i>
                                <span class="sidebar-label"><?= htmlspecialchars($item['label']) ?></span>
                                <?php if (!empty($item['badge'])): ?>
                                    <span class="sidebar-badge<?= !empty($item['badge']['type']) ? ' sidebar-badge-' . $item['badge']['type'] : '' ?>">
                                        <?= htmlspecialchars($item['badge']['text']) ?>
                                    </span>
                                <?php endif; ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endforeach; ?>
    </nav>
    
    <!-- User Profile -->
    <div class="sidebar-footer">
        <a href="<?= htmlspecialchars($sidebar['user']['url']) ?>" class="sidebar-user">
            <div class="sidebar-user-avatar">
                <?php if (!empty($sidebar['user']['avatar'])): ?>
                    <img src="<?= htmlspecialchars($sidebar['user']['avatar']) ?>" 
                         alt="<?= htmlspecialchars($sidebar['user']['name']) ?>">
                <?php else: ?>
                    <i class="fas fa-user" aria-hidden="true"></i>
                <?php endif; ?>
            </div>
            <div class="sidebar-user-info">
                <div class="sidebar-user-name"><?= htmlspecialchars($sidebar['user']['name']) ?></div>
                <div class="sidebar-user-role"><?= htmlspecialchars($sidebar['user']['role']) ?></div>
            </div>
        </a>
    </div>
</aside>

<!-- Mobile overlay -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>