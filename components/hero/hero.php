<?php
/**
 * Hero Component
 */
?>

<section class="hero">
    <div class="container">
        <h1><?= $hero_title ?? 'Welcome' ?></h1>
        <p><?= $hero_subtitle ?? 'This is clean.' ?></p>
        
        <?php if (!empty($hero_buttons)): ?>
            <div class="buttons">
                <?php foreach ($hero_buttons as $button): ?>
                    <a href="<?= $button['url'] ?>" 
                       class="button <?= $button['type'] ?? 'primary' ?>">
                        <?= $button['label'] ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>