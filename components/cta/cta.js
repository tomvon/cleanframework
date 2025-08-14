/**
 * Call-to-Action (CTA) Component JavaScript
 */

// Initialize CTA functionality
function initCTA() {
    // Initialize newsletter forms
    initNewsletterForms();
    
    // Initialize countdown timers
    initCountdownTimers();
    
    // Add intersection observer for animations
    if (window.IntersectionObserver) {
        initCTAAnimations();
    }
    
    console.log('CTA component initialized');
}

// Initialize newsletter subscription forms
function initNewsletterForms() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

// Handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button[type="submit"]');
    
    if (!email) return;
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showCTAMessage(form, 'Thank you for subscribing!', 'success');
        
        // Reset form
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
        
        // Trigger custom event
        const subscribeEvent = new CustomEvent('newsletterSubscribe', {
            detail: { email, form }
        });
        form.dispatchEvent(subscribeEvent);
    }, 1000);
}

// Initialize countdown timers
function initCountdownTimers() {
    const countdowns = document.querySelectorAll('.cta-countdown');
    
    countdowns.forEach(countdown => {
        // Set a target date (24 hours from now for demo)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1);
        
        updateCountdown(countdown, targetDate);
        
        // Update every second
        setInterval(() => {
            updateCountdown(countdown, targetDate);
        }, 1000);
    });
}

// Update countdown display
function updateCountdown(countdownElement, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance < 0) {
        // Countdown finished
        countdownElement.innerHTML = '<div class="countdown-finished">Offer Expired</div>';
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    const items = countdownElement.querySelectorAll('.countdown-item');
    if (items.length >= 4) {
        items[0].querySelector('.countdown-value').textContent = String(days).padStart(2, '0');
        items[1].querySelector('.countdown-value').textContent = String(hours).padStart(2, '0');
        items[2].querySelector('.countdown-value').textContent = String(minutes).padStart(2, '0');
        items[3].querySelector('.countdown-value').textContent = String(seconds).padStart(2, '0');
    }
}

// Initialize CTA animations
function initCTAAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cta-animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe CTA sections
    const ctaSections = document.querySelectorAll('.cta-section');
    ctaSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for animations
    addCTAAnimationStyles();
}

// Add animation styles
function addCTAAnimationStyles() {
    const ctaStyle = document.createElement('style');
    ctaStyle.textContent = `
        .cta-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .cta-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .cta-countdown {
            animation: slideInUp 0.8s ease 0.2s both;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .countdown-item {
            animation: fadeInScale 0.6s ease both;
        }
        
        .countdown-item:nth-child(1) { animation-delay: 0.1s; }
        .countdown-item:nth-child(2) { animation-delay: 0.2s; }
        .countdown-item:nth-child(3) { animation-delay: 0.3s; }
        .countdown-item:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(ctaStyle);
}

// Show CTA message
function showCTAMessage(container, message, type = 'info') {
    // Remove existing messages
    const existingMessage = container.querySelector('.cta-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `cta-message cta-message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        margin-top: 1rem;
        text-align: center;
        font-size: 0.9375rem;
        font-weight: 500;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'destructive' : 'muted'});
        color: ${type === 'success' || type === 'error' ? 'white' : 'var(--foreground)'};
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    // Insert message
    container.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Create CTA section dynamically
function createCTASection(ctaData, options = {}) {
    const {
        layout = 'centered',
        background = 'light',
        showFeatures = true
    } = options;
    
    const section = document.createElement('div');
    section.className = `cta-section cta-${layout} cta-${background}`;
    
    let contentHTML = `<div class="cta-content">`;
    
    // Title and description
    contentHTML += `
        <h2 class="cta-title">${ctaData.title}</h2>
        ${ctaData.subtitle ? `<p class="cta-subtitle">${ctaData.subtitle}</p>` : ''}
        <p class="cta-description">${ctaData.description}</p>
    `;
    
    // Buttons
    if (ctaData.buttons && ctaData.buttons.length > 0) {
        contentHTML += '<div class="cta-buttons">';
        ctaData.buttons.forEach(button => {
            contentHTML += `
                <a href="${button.url}" class="button ${button.type || 'primary'}">
                    ${button.icon ? `<i class="${button.icon}" aria-hidden="true"></i>` : ''}
                    ${button.label}
                </a>
            `;
        });
        contentHTML += '</div>';
    }
    
    // Features
    if (showFeatures && ctaData.features && ctaData.features.length > 0) {
        contentHTML += '<ul class="cta-features">';
        ctaData.features.forEach(feature => {
            contentHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${feature}</li>`;
        });
        contentHTML += '</ul>';
    }
    
    contentHTML += '</div>';
    section.innerHTML = contentHTML;
    
    return section;
}

// Add CTA section to page
function addCTASection(container, ctaData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const ctaSection = createCTASection(ctaData, options);
    container.appendChild(ctaSection);
    
    // Trigger custom event
    const addEvent = new CustomEvent('ctaAdd', {
        detail: { ctaSection, ctaData, options }
    });
    container.dispatchEvent(addEvent);
    
    return ctaSection;
}

// Track CTA interactions
function trackCTAClick(ctaElement, action = 'click') {
    const title = ctaElement.querySelector('.cta-title')?.textContent || 'Unknown CTA';
    
    // Trigger custom event for analytics
    const trackEvent = new CustomEvent('ctaInteraction', {
        detail: { 
            title, 
            action, 
            element: ctaElement,
            timestamp: new Date().toISOString()
        }
    });
    document.dispatchEvent(trackEvent);
    
    // Console log for demonstration
    console.log('CTA Interaction:', { title, action });
}

// Export for main.js
window.CTA = {
    init: () => {
        initCTA();
    }
};

// Expose functions globally for API
window.createCTASection = createCTASection;
window.addCTASection = addCTASection;
window.showCTAMessage = showCTAMessage;
window.trackCTAClick = trackCTAClick;