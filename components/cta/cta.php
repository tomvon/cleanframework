<?php
/**
 * Call-to-Action (CTA) Component
 * 
 * Conversion-focused sections to drive user actions
 */

// Example CTA data
$cta_sections = $cta_sections ?? [
    [
        'type' => 'primary',
        'layout' => 'centered',
        'background' => 'gradient',
        'title' => 'Ready to Get Started?',
        'subtitle' => 'Join thousands of developers who trust Clean Framework',
        'description' => 'Start building beautiful, fast websites today with our component-based CSS framework. No learning curve, just clean code.',
        'buttons' => [
            [
                'label' => 'Start Free Trial',
                'url' => '#',
                'type' => 'primary',
                'icon' => 'fas fa-rocket'
            ],
            [
                'label' => 'View Documentation',
                'url' => '#',
                'type' => 'secondary-white',
                'icon' => 'fas fa-book'
            ]
        ],
        'features' => [
            'No credit card required',
            '14-day free trial',
            'Cancel anytime'
        ]
    ],
    [
        'type' => 'newsletter',
        'layout' => 'split',
        'background' => 'light',
        'title' => 'Stay Updated',
        'subtitle' => 'Get the latest updates and tips',
        'description' => 'Subscribe to our newsletter for framework updates, best practices, and exclusive content.',
        'form' => [
            'placeholder' => 'Enter your email address',
            'button_text' => 'Subscribe',
            'privacy_text' => 'We respect your privacy. Unsubscribe at any time.'
        ]
    ],
    [
        'type' => 'contact',
        'layout' => 'boxed',
        'background' => 'dark',
        'title' => 'Need Custom Development?',
        'subtitle' => 'Let our experts help you',
        'description' => 'Get personalized assistance with your project. Our team of experienced developers is ready to help.',
        'buttons' => [
            [
                'label' => 'Contact Sales',
                'url' => '#',
                'type' => 'primary',
                'icon' => 'fas fa-phone'
            ]
        ],
        'contact_info' => [
            [
                'icon' => 'fas fa-envelope',
                'label' => 'Email',
                'value' => 'hello@cleanframework.com'
            ],
            [
                'icon' => 'fas fa-phone',
                'label' => 'Phone',
                'value' => '+1 (555) 123-4567'
            ]
        ]
    ]
];
?>

<!-- Primary CTA Section -->
<div class="cta-section cta-primary cta-centered cta-gradient">
    <div class="cta-content">
        <h2 class="cta-title"><?= $cta_sections[0]['title'] ?></h2>
        <p class="cta-subtitle"><?= $cta_sections[0]['subtitle'] ?></p>
        <p class="cta-description"><?= $cta_sections[0]['description'] ?></p>
        
        <div class="cta-buttons">
            <?php foreach($cta_sections[0]['buttons'] as $button): ?>
                <a href="<?= $button['url'] ?>" class="button <?= $button['type'] ?>">
                    <?php if (!empty($button['icon'])): ?>
                        <i class="<?= $button['icon'] ?>" aria-hidden="true"></i>
                    <?php endif; ?>
                    <?= $button['label'] ?>
                </a>
            <?php endforeach; ?>
        </div>
        
        <?php if (!empty($cta_sections[0]['features'])): ?>
            <ul class="cta-features">
                <?php foreach($cta_sections[0]['features'] as $feature): ?>
                    <li><i class="fas fa-check" aria-hidden="true"></i> <?= $feature ?></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Newsletter CTA Section -->
<div class="cta-section cta-newsletter cta-split cta-light">
    <div class="cta-content">
        <div class="cta-text">
            <h2 class="cta-title"><?= $cta_sections[1]['title'] ?></h2>
            <p class="cta-subtitle"><?= $cta_sections[1]['subtitle'] ?></p>
            <p class="cta-description"><?= $cta_sections[1]['description'] ?></p>
        </div>
        
        <div class="cta-form">
            <form class="newsletter-form" action="#" method="post">
                <div class="form-group-inline">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="<?= $cta_sections[1]['form']['placeholder'] ?>"
                        required
                        aria-label="Email address"
                        class="form-control"
                    >
                    <button type="submit" class="button primary">
                        <?= $cta_sections[1]['form']['button_text'] ?>
                    </button>
                </div>
                <p class="form-privacy"><?= $cta_sections[1]['form']['privacy_text'] ?></p>
            </form>
        </div>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Contact CTA Section -->
<div class="cta-section cta-contact cta-boxed cta-dark">
    <div class="cta-content">
        <div class="cta-text">
            <h2 class="cta-title"><?= $cta_sections[2]['title'] ?></h2>
            <p class="cta-subtitle"><?= $cta_sections[2]['subtitle'] ?></p>
            <p class="cta-description"><?= $cta_sections[2]['description'] ?></p>
            
            <div class="cta-buttons">
                <?php foreach($cta_sections[2]['buttons'] as $button): ?>
                    <a href="<?= $button['url'] ?>" class="button <?= $button['type'] ?>">
                        <?php if (!empty($button['icon'])): ?>
                            <i class="<?= $button['icon'] ?>" aria-hidden="true"></i>
                        <?php endif; ?>
                        <?= $button['label'] ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
        
        <?php if (!empty($cta_sections[2]['contact_info'])): ?>
            <div class="cta-contact-info">
                <?php foreach($cta_sections[2]['contact_info'] as $info): ?>
                    <div class="contact-item">
                        <i class="<?= $info['icon'] ?>" aria-hidden="true"></i>
                        <div class="contact-details">
                            <span class="contact-label"><?= $info['label'] ?></span>
                            <span class="contact-value"><?= $info['value'] ?></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<div class="component-spacer"></div>

<!-- Additional CTA Variations -->
<div class="cta-section cta-simple">
    <div class="cta-content">
        <h2 class="cta-title">Simple CTA Example</h2>
        <p class="cta-description">This is a minimal call-to-action section with just a title, description, and button.</p>
        <div class="cta-buttons">
            <a href="#" class="button primary">
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
                Take Action Now
            </a>
        </div>
    </div>
</div>

<div class="component-spacer"></div>

<div class="cta-section cta-announcement cta-bordered">
    <div class="cta-content">
        <div class="cta-badge">
            <span class="badge success">New Release</span>
        </div>
        <h2 class="cta-title">Clean Framework 2.0 is Here!</h2>
        <p class="cta-description">Discover new components, improved performance, and enhanced accessibility features.</p>
        <div class="cta-buttons">
            <a href="#" class="button primary">
                <i class="fas fa-download" aria-hidden="true"></i>
                Download Now
            </a>
            <a href="#" class="button secondary">
                <i class="fas fa-list" aria-hidden="true"></i>
                View Changelog
            </a>
        </div>
    </div>
</div>

<div class="component-spacer"></div>

<div class="cta-section cta-urgency">
    <div class="cta-content">
        <div class="cta-urgency-badge">
            <i class="fas fa-clock" aria-hidden="true"></i>
            <span>Limited Time Offer</span>
        </div>
        <h2 class="cta-title">50% Off Pro Plan</h2>
        <p class="cta-description">Upgrade to Clean Framework Pro and save 50% on your first year. Offer ends soon!</p>
        
        <div class="cta-countdown" id="cta-countdown">
            <div class="countdown-item">
                <span class="countdown-value">02</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">14</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">23</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">45</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
        
        <div class="cta-buttons">
            <a href="#" class="button primary large">
                <i class="fas fa-bolt" aria-hidden="true"></i>
                Claim This Deal
            </a>
        </div>
        
        <p class="cta-fine-print">*Offer valid for new Pro subscriptions only. Terms and conditions apply.</p>
    </div>
</div>