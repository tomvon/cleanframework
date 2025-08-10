<?php
/**
 * Cards Component
 */
?>

<div class="cards">
    <?php foreach ($cards ?? [] as $card): ?>
        <div class="card">
            <?php if (!empty($card['image'])): ?>
                <div class="card-image">
                    <img src="<?= $card['image'] ?>" alt="<?= $card['title'] ?>" />
                </div>
            <?php elseif (!empty($card['icon'])): ?>
                <div class="icon">
                    <i class="<?= $card['icon'] ?>"></i>
                </div>
            <?php endif; ?>
            
            <h3><?= $card['title'] ?></h3>
            <p><?= $card['content'] ?></p>
            
            <?php if (!empty($card['button'])): ?>
                <a href="<?= $card['button']['url'] ?>" 
                   class="button <?= $card['button']['type'] ?? 'primary' ?>">
                    <?= $card['button']['label'] ?>
                </a>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>