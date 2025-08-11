/**
 * Testimonials Component JavaScript
 */

// Initialize testimonials functionality
function initTestimonials() {
    // Initialize any carousel testimonials
    const carousels = document.querySelectorAll('.testimonials-carousel');
    carousels.forEach(carousel => {
        initTestimonialCarousel(carousel);
    });
    
    console.log(`Initialized ${carousels.length} testimonial carousels`);
}

// Initialize testimonial carousel
function initTestimonialCarousel(carousel) {
    const track = carousel.querySelector('.testimonials-track');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots if container exists
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Navigation button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }
    
    // Auto-advance carousel
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        stopAutoAdvance();
        setTimeout(startAutoAdvance, 3000); // Restart auto-advance after 3s
    }
    
    // Update carousel position and controls
    function updateCarousel() {
        // Move track
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = false; // Allow looping
        }
        if (nextBtn) {
            nextBtn.disabled = false; // Allow looping
        }
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Trigger custom event
        const slideEvent = new CustomEvent('testimonialSlide', {
            detail: { currentIndex, totalSlides, carousel }
        });
        carousel.dispatchEvent(slideEvent);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        stopAutoAdvance();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe left - next slide
                currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            } else {
                // Swipe right - previous slide  
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            }
            updateCarousel();
        }
        
        setTimeout(startAutoAdvance, 3000);
    });
    
    // Start auto-advance
    startAutoAdvance();
    
    return {
        goToSlide,
        next: () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        },
        prev: () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        },
        getCurrentIndex: () => currentIndex,
        getTotalSlides: () => totalSlides
    };
}

// Create testimonial element
function createTestimonial(testimonialData, options = {}) {
    const {
        layout = 'card', // 'card', 'featured', 'compact'
        showRating = true,
        showImage = true
    } = options;
    
    const testimonial = document.createElement('div');
    testimonial.className = layout === 'featured' ? 'testimonial-featured' : 'testimonial-card';
    
    // Build star rating HTML
    let ratingHTML = '';
    if (showRating && testimonialData.rating) {
        ratingHTML = '<div class="testimonial-rating" aria-label="' + testimonialData.rating + ' out of 5 stars">';
        for (let i = 1; i <= 5; i++) {
            if (i <= testimonialData.rating) {
                ratingHTML += '<i class="fas fa-star" aria-hidden="true"></i>';
            } else {
                ratingHTML += '<i class="far fa-star" aria-hidden="true"></i>';
            }
        }
        ratingHTML += '</div>';
    }
    
    // Build testimonial HTML
    testimonial.innerHTML = `
        <div class="testimonial-content">
            ${ratingHTML}
            <blockquote class="testimonial-quote">
                "${testimonialData.quote}"
            </blockquote>
        </div>
        <div class="testimonial-author">
            ${showImage && testimonialData.image ? `<img src="${testimonialData.image}" alt="${testimonialData.author}" class="testimonial-avatar">` : ''}
            <div class="testimonial-info">
                <div class="testimonial-name">${testimonialData.author}</div>
                <div class="testimonial-role">${testimonialData.role}</div>
                ${testimonialData.company ? `<div class="testimonial-company">${testimonialData.company}</div>` : ''}
            </div>
        </div>
    `;
    
    return testimonial;
}

// Add testimonial to container
function addTestimonial(container, testimonialData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const testimonial = createTestimonial(testimonialData, options);
    container.appendChild(testimonial);
    
    // Trigger custom event
    const addEvent = new CustomEvent('testimonialAdd', {
        detail: { testimonial, testimonialData, options }
    });
    container.dispatchEvent(addEvent);
    
    return testimonial;
}

// Get random testimonials
function getRandomTestimonials(testimonials, count = 3) {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export for main.js
window.Testimonials = {
    init: () => {
        initTestimonials();
    }
};

// Expose functions globally for API
window.initTestimonialCarousel = initTestimonialCarousel;
window.createTestimonial = createTestimonial;
window.addTestimonial = addTestimonial;
window.getRandomTestimonials = getRandomTestimonials;