<?php
/**
 * Accordion Component
 * 
 * Collapsible content sections for organizing information
 */

// Example accordion data
$accordions = $accordions ?? [
    [
        'id' => 'faq-accordion',
        'items' => [
            [
                'id' => 'getting-started',
                'title' => 'How do I get started with Clean Framework?',
                'content' => 'Getting started is simple! Download the framework, include the CSS file in your project, and start using semantic HTML components. No complex build process required.',
                'open' => true
            ],
            [
                'id' => 'browser-support',
                'title' => 'What browsers are supported?',
                'content' => 'Clean Framework supports all modern browsers including Chrome, Firefox, Safari, and Edge. We use progressive enhancement to ensure compatibility across different environments.'
            ],
            [
                'id' => 'customization',
                'title' => 'Can I customize the design?',
                'content' => 'Absolutely! Clean Framework uses CSS custom properties (variables) that make it easy to customize colors, spacing, and typography. You can also override any styles to match your brand.'
            ],
            [
                'id' => 'components',
                'title' => 'What components are included?',
                'content' => 'The framework includes buttons, forms, modals, dropdowns, tables, tabs, alerts, accordions, and more. Each component is designed to work together seamlessly while maintaining semantic HTML.'
            ],
            [
                'id' => 'performance',
                'title' => 'How does it perform?',
                'content' => 'Clean Framework is designed for performance with minimal CSS footprint, no JavaScript dependencies for basic functionality, and optimized for fast loading times.'
            ]
        ]
    ]
];
?>

<?php foreach ($accordions as $accordion): ?>
    <div class="accordion" id="<?= $accordion['id'] ?>">
        <?php foreach ($accordion['items'] as $index => $item): ?>
            <div class="accordion-item <?= !empty($item['open']) ? 'accordion-item-open' : '' ?>">
                <button class="accordion-header" 
                        id="<?= $accordion['id'] ?>-header-<?= $item['id'] ?>"
                        onclick="toggleAccordionItem('<?= $accordion['id'] ?>', '<?= $item['id'] ?>')"
                        aria-expanded="<?= !empty($item['open']) ? 'true' : 'false' ?>"
                        aria-controls="<?= $accordion['id'] ?>-content-<?= $item['id'] ?>">
                    <span class="accordion-title"><?= $item['title'] ?></span>
                    <span class="accordion-icon">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                </button>
                
                <div class="accordion-content <?= empty($item['open']) ? 'accordion-content-closed' : '' ?>" 
                     id="<?= $accordion['id'] ?>-content-<?= $item['id'] ?>"
                     role="region"
                     aria-labelledby="<?= $accordion['id'] ?>-header-<?= $item['id'] ?>">
                    <div class="accordion-body">
                        <?= $item['content'] ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ($accordion !== end($accordions)): ?>
        <div class="component-spacer"></div>
    <?php endif; ?>
<?php endforeach; ?>