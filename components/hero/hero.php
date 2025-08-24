<?php
/**
 * Hero Component
 */
?>

<!-- ========================================================================= -->
<!-- CF-AI: HERO SECTION - Main banner with title, subtitle, and buttons     -->
<!-- CF-AI: ONLY modify text content - NEVER add style attributes or classes -->  
<!-- CF-AI: Available variants: hero-small for smaller banners               -->
<!-- CF-AI: Theme switching and responsive design work automatically          -->
<!-- CF-AI: Replace text in <h1>, <p>, and button labels only                -->
<!-- ========================================================================= -->

<section class="hero" data-cf-template="hero-basic">
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