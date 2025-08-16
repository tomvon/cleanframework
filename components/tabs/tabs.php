<?php
/**
 * Tabs Component
 * 
 * Clean tab interface for organizing content into sections
 */

// Example tabs data
$tabs_sets = $tabs_sets ?? [
    [
        'id' => 'features-tabs',
        'style' => 'default', // default, pills
        'tabs' => [
            [
                'id' => 'overview',
                'label' => 'Overview',
                'icon' => 'fas fa-chart-line',
                'active' => true,
                'content' => '<h3>Product Overview</h3><p>Clean Framework is built for developers who value semantic HTML and component-based CSS. No utility classes, no mental overhead - just clean, predictable code that works everywhere.</p><ul><li>Semantic HTML patterns</li><li>Component-based architecture</li><li>AI-friendly structure</li><li>Lightning fast performance</li></ul>'
            ],
            [
                'id' => 'features',
                'label' => 'Features',
                'icon' => 'fas fa-rocket',
                'content' => '<h3>Core Features</h3><p>Everything you need to build modern web applications with confidence.</p><div class="feature-grid"><div class="feature-item"><h4>🎯 Semantic Components</h4><p>HTML that tells a story, not styling instructions.</p></div><div class="feature-item"><h4>⚡ Performance First</h4><p>Minimal CSS footprint with maximum impact.</p></div><div class="feature-item"><h4>🤖 AI-Friendly</h4><p>Predictable patterns that AI understands.</p></div><div class="feature-item"><h4>📱 Responsive</h4><p>Works beautifully on all devices.</p></div></div>'
            ],
            [
                'id' => 'documentation',
                'label' => 'Documentation',
                'icon' => 'fas fa-book',
                'content' => '<h3>Getting Started</h3><p>Follow our comprehensive guide to get up and running in minutes.</p><h4>Installation</h4><pre><code>git clone https://github.com/username/cleanframework.git</code></pre><h4>Usage</h4><p>Include the CSS and start using semantic HTML components:</p><pre><code>&lt;div class="cards"&gt;\n  &lt;div class="card"&gt;\n    &lt;h3&gt;Simple&lt;/h3&gt;\n    &lt;p&gt;Just works.&lt;/p&gt;\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre>'
            ],
            [
                'id' => 'support',
                'label' => 'Support',
                'icon' => 'fas fa-question-circle',
                'content' => '<h3>Need Help?</h3><p>We\'re here to help you succeed with Clean Framework.</p><h4>Community Support</h4><p>Join our community for tips, examples, and help from other developers.</p><h4>Documentation</h4><p>Comprehensive guides and API documentation available.</p><h4>Contact Us</h4><p>Have questions? Reach out to our team directly.</p><div class="support-links"><a href="#" class="button secondary">Join Discord</a><a href="#" class="button primary">View Docs</a></div>'
            ]
        ]
    ],
    [
        'id' => 'settings-tabs',
        'style' => 'pills',
        'tabs' => [
            [
                'id' => 'profile',
                'label' => 'Profile',
                'icon' => 'fas fa-user',
                'active' => true,
                'content' => '<h3>Profile Settings</h3><form class="form"><div class="group"><label>Display Name</label><input type="text" value="John Doe"></div><div class="group"><label>Email Address</label><input type="email" value="john@example.com"></div><div class="group"><label>Bio</label><textarea rows="3" placeholder="Tell us about yourself..."></textarea></div><div class="buttons"><button class="button primary">Save Changes</button></div></form>'
            ],
            [
                'id' => 'account',
                'label' => 'Account',
                'icon' => 'fas fa-cog',
                'content' => '<h3>Account Settings</h3><div class="setting-item"><div class="setting-info"><h4>Two-Factor Authentication</h4><p>Secure your account with 2FA</p></div><div class="setting-control"><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div><div class="setting-item"><div class="setting-info"><h4>Email Notifications</h4><p>Receive updates via email</p></div><div class="setting-control"><label class="toggle-switch"><input type="checkbox"><span class="toggle-slider"></span></label></div></div><div class="setting-item"><div class="setting-info"><h4>Marketing Communications</h4><p>Promotional emails and updates</p></div><div class="setting-control"><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>'
            ],
            [
                'id' => 'privacy',
                'label' => 'Privacy',
                'icon' => 'fas fa-shield-alt',
                'content' => '<h3>Privacy Settings</h3><p>Control how your information is shared and used.</p><h4>Data Collection</h4><div class="privacy-options"><label><input type="radio" name="analytics" value="all" checked> Allow all analytics</label><label><input type="radio" name="analytics" value="essential"> Essential only</label><label><input type="radio" name="analytics" value="none"> No tracking</label></div><h4>Profile Visibility</h4><div class="privacy-options"><label><input type="checkbox" checked> Show profile to other users</label><label><input type="checkbox"> Allow search engines to index profile</label><label><input type="checkbox" checked> Show activity status</label></div>'
            ]
        ]
    ]
];
?>

<?php foreach ($tabs_sets as $tabs_set): ?>
    <div class="tabs-container <?= $tabs_set['style'] ?>" id="<?= $tabs_set['id'] ?>">
        <!-- Tab Navigation -->
        <div class="tabs-nav" role="tablist">
            <?php foreach ($tabs_set['tabs'] as $index => $tab): ?>
                <button class="tab-button <?= !empty($tab['active']) ? 'active' : '' ?>" 
                        role="tab"
                        aria-selected="<?= !empty($tab['active']) ? 'true' : 'false' ?>"
                        aria-controls="<?= $tabs_set['id'] ?>-<?= $tab['id'] ?>-panel"
                        id="<?= $tabs_set['id'] ?>-<?= $tab['id'] ?>-tab"
                        onclick="switchTab('<?= $tabs_set['id'] ?>', '<?= $tab['id'] ?>')">
                    <?php if (!empty($tab['icon'])): ?>
                        <i class="<?= $tab['icon'] ?>"></i>
                    <?php endif; ?>
                    <span><?= $tab['label'] ?></span>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Tab Content -->
        <div class="tabs-content">
            <?php foreach ($tabs_set['tabs'] as $index => $tab): ?>
                <div class="tab-panel <?= !empty($tab['active']) ? 'active' : '' ?>"
                     role="tabpanel"
                     aria-labelledby="<?= $tabs_set['id'] ?>-<?= $tab['id'] ?>-tab"
                     id="<?= $tabs_set['id'] ?>-<?= $tab['id'] ?>-panel">
                    <?= $tab['content'] ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <?php if ($tabs_set !== end($tabs_sets)): ?>
        <div class="component-spacer"></div>
    <?php endif; ?>
<?php endforeach; ?>