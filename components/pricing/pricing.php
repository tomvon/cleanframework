<?php
/**
 * Pricing Component
 * 
 * Expected data:
 * $pricing_plans = [
 *     [
 *         'name' => 'Basic',
 *         'price' => 9,
 *         'period' => '/month',
 *         'description' => 'Perfect for individuals',
 *         'featured' => false,
 *         'badge' => '',
 *         'features' => [
 *             'Up to 3 projects',
 *             'Basic support',
 *             'Export to PDF',
 *             ['text' => 'Advanced analytics', 'disabled' => true],
 *             ['text' => 'Priority support', 'disabled' => true]
 *         ],
 *         'button' => [
 *             'label' => 'Get Started',
 *             'url' => '#',
 *             'type' => 'secondary'
 *         ]
 *     ]
 * ]
 */
?>

<div class="pricing">
    <div class="plans">
        <?php foreach ($pricing_plans ?? [] as $plan): ?>
            <div class="plan <?= $plan['featured'] ? 'featured' : '' ?>">
                <?php if (!empty($plan['badge'])): ?>
                    <div class="badge"><?= $plan['badge'] ?></div>
                <?php endif; ?>
                
                <h3 class="name"><?= $plan['name'] ?></h3>
                
                <div class="price">
                    <span class="currency">$</span><?= $plan['price'] ?>
                    <span class="period"><?= $plan['period'] ?></span>
                </div>
                
                <p class="description"><?= $plan['description'] ?></p>
                
                <ul class="features">
                    <?php foreach ($plan['features'] as $feature): ?>
                        <?php if (is_array($feature)): ?>
                            <li class="<?= $feature['disabled'] ? 'disabled' : '' ?>">
                                <?= $feature['text'] ?>
                            </li>
                        <?php else: ?>
                            <li><?= $feature ?></li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
                
                <a href="<?= $plan['button']['url'] ?>" 
                   class="button <?= $plan['button']['type'] ?? 'primary' ?>">
                    <?= $plan['button']['label'] ?>
                </a>
            </div>
        <?php endforeach; ?>
    </div>
</div>