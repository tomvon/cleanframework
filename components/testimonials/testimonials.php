<?php
/**
 * Testimonials Component
 * 
 * Customer reviews and testimonials for social proof
 */

// Example testimonial data
$testimonials = $testimonials ?? [
    [
        'quote' => 'Clean Framework has completely transformed how we build websites. The semantic approach makes our code so much cleaner and easier to maintain.',
        'author' => 'Sarah Chen',
        'role' => 'Lead Developer',
        'company' => 'TechCorp Inc.',
        'rating' => 5,
        'image' => 'img/samples/pexels-earano-1330219.jpg'
    ],
    [
        'quote' => 'The component-based architecture is brilliant. No more fighting with utility classes - everything just makes sense.',
        'author' => 'Marcus Rodriguez',
        'role' => 'Frontend Architect',
        'company' => 'Design Studio',
        'rating' => 5,
        'image' => 'img/samples/pexels-fabianwiktor-994605.jpg'
    ],
    [
        'quote' => 'Finally, a CSS framework that speaks human language! Clean Framework saves us hours of development time.',
        'author' => 'Emily Watson',
        'role' => 'Product Manager',
        'company' => 'StartupCo',
        'rating' => 5,
        'image' => 'img/samples/pexels-george-desipris-801857.jpg'
    ],
    [
        'quote' => 'The AI-friendly patterns make it so easy to iterate quickly. This is the future of CSS frameworks.',
        'author' => 'David Kim',
        'role' => 'CTO',
        'company' => 'InnovateNow',
        'rating' => 5,
        'image' => 'img/samples/pexels-earano-1330219.jpg'
    ],
    [
        'quote' => 'Clean Framework strikes the perfect balance between simplicity and power. Highly recommended!',
        'author' => 'Lisa Thompson',
        'role' => 'UI Designer',
        'company' => 'CreativeAgency',
        'rating' => 5,
        'image' => 'img/samples/pexels-fabianwiktor-994605.jpg'
    ],
    [
        'quote' => 'The semantic HTML approach has improved our accessibility scores dramatically. Excellent framework!',
        'author' => 'James Park',
        'role' => 'Full Stack Developer',
        'company' => 'WebSolutions',
        'rating' => 5,
        'image' => 'img/samples/pexels-george-desipris-801857.jpg'
    ]
];

// Function to render star rating
function renderStars($rating, $maxRating = 5) {
    $output = '<div class="testimonial-rating" aria-label="' . $rating . ' out of ' . $maxRating . ' stars">';
    for ($i = 1; $i <= $maxRating; $i++) {
        if ($i <= $rating) {
            $output .= '<i class="fas fa-star" aria-hidden="true"></i>';
        } else {
            $output .= '<i class="far fa-star" aria-hidden="true"></i>';
        }
    }
    $output .= '</div>';
    return $output;
}
?>

<div class="testimonials-section">
    <div class="testimonials-header">
        <h2>What Our Users Say</h2>
        <p>Join thousands of developers who trust Clean Framework for their projects</p>
    </div>
    
    <!-- Featured Testimonial -->
    <div class="testimonial-featured">
        <div class="testimonial-content">
            <blockquote class="testimonial-quote">
                "<?= $testimonials[0]['quote'] ?>"
            </blockquote>
            <?= renderStars($testimonials[0]['rating']) ?>
        </div>
        <div class="testimonial-author">
            <img src="<?= $testimonials[0]['image'] ?>" alt="<?= $testimonials[0]['author'] ?>" class="testimonial-avatar">
            <div class="testimonial-info">
                <div class="testimonial-name"><?= $testimonials[0]['author'] ?></div>
                <div class="testimonial-role"><?= $testimonials[0]['role'] ?> at <?= $testimonials[0]['company'] ?></div>
            </div>
        </div>
    </div>
    
    <div class="component-spacer"></div>
    
    <!-- Testimonials Grid -->
    <div class="testimonials-grid">
        <?php for($i = 1; $i < count($testimonials); $i++): 
            $testimonial = $testimonials[$i]; ?>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <?= renderStars($testimonial['rating']) ?>
                    <blockquote class="testimonial-quote">
                        "<?= $testimonial['quote'] ?>"
                    </blockquote>
                </div>
                <div class="testimonial-author">
                    <img src="<?= $testimonial['image'] ?>" alt="<?= $testimonial['author'] ?>" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <div class="testimonial-name"><?= $testimonial['author'] ?></div>
                        <div class="testimonial-role"><?= $testimonial['role'] ?></div>
                        <div class="testimonial-company"><?= $testimonial['company'] ?></div>
                    </div>
                </div>
            </div>
        <?php endfor; ?>
    </div>
</div>