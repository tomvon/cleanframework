<?php
/**
 * Navigation Component
 */
?>

<nav class="nav">
    <div class="container">
        <!-- Mobile sidebar toggle (only when sidebar is present) -->
        <button class="sidebar-mobile-toggle has-sidebar-only" onclick="toggleSidebar()" aria-label="Toggle sidebar">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
        </button>
        
        <a href="#" class="brand"><?= $brand ?? 'CleanCorp' ?></a>
        
        <!-- Mobile menu toggle -->
        <button class="nav-toggle" onclick="toggleMobileNav()" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
        </button>
        
        <div class="nav-right" id="nav-menu">
            <ul class="menu">
                <?php foreach ($nav_items ?? [] as $item): ?>
                    <li>
                        <a href="<?= $item['url'] ?>" 
                           class="<?= ($item['active'] ?? false) ? 'active' : '' ?>">
                            <?= $item['label'] ?>
                        </a>
                    </li>
                <?php endforeach; ?>
                
                <!-- Theme toggle as menu item -->
                <li class="theme-menu-item">
                    <a href="#" onclick="toggleTheme(); return false;" class="theme-link">
                        <span class="theme-text">
                            <span class="theme-mode light-mode">🌞 Light Mode</span>
                            <span class="theme-mode dark-mode">🌙 Dark Mode</span>
                            <span class="theme-mode system-mode">⚡ System Mode</span>
                        </span>
                    </a>
                </li>
            </ul>
            
            <!-- Desktop theme toggle button -->
            <button class="theme-toggle desktop-only" onclick="toggleTheme()" aria-label="Toggle theme mode">
                <i class="theme-icon sun fas fa-sun active"></i>
                <i class="theme-icon moon fas fa-moon"></i>
                <i class="theme-icon system fas fa-circle-half-stroke"></i>
            </button>
        </div>
    </div>
</nav>