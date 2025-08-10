<?php
/**
 * Navigation Component
 */
?>

<nav class="nav">
    <div class="container">
        <a href="#" class="brand"><?= $brand ?? 'CleanCorp' ?></a>
        <div class="nav-right">
            <ul class="menu">
                <?php foreach ($nav_items ?? [] as $item): ?>
                    <li>
                        <a href="<?= $item['url'] ?>" 
                           class="<?= ($item['active'] ?? false) ? 'active' : '' ?>">
                            <?= $item['label'] ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
            <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme mode">
                <i class="theme-icon sun fas fa-sun active"></i>
                <i class="theme-icon moon fas fa-moon"></i>
                <i class="theme-icon system fas fa-circle-half-stroke"></i>
            </button>
        </div>
    </div>
</nav>