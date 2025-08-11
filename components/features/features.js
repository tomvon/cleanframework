/**
 * Features Component JavaScript
 */

// Initialize features functionality
function initFeatures() {
    // Add intersection observer for animations
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('feature-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe feature items
        const featureItems = document.querySelectorAll('.feature-item, .feature-card, .feature-row');
        featureItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    console.log('Features component initialized');
}

// Add feature item dynamically
function addFeature(container, featureData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const {
        layout = 'grid', // 'grid', 'card', 'row'
        showDetails = true
    } = options;
    
    let featureElement;
    
    if (layout === 'card') {
        featureElement = createFeatureCard(featureData, showDetails);
    } else if (layout === 'row') {
        featureElement = createFeatureRow(featureData, showDetails);
    } else {
        featureElement = createFeatureItem(featureData, showDetails);
    }
    
    container.appendChild(featureElement);
    
    // Trigger custom event
    const addEvent = new CustomEvent('featureAdd', {
        detail: { featureElement, featureData, options }
    });
    container.dispatchEvent(addEvent);
    
    return featureElement;
}

// Create feature item for grid layout
function createFeatureItem(featureData, showDetails = true) {
    const item = document.createElement('div');
    item.className = 'feature-item';
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    item.innerHTML = `
        <div class="feature-icon">
            <i class="${featureData.icon}" aria-hidden="true"></i>
        </div>
        <div class="feature-content">
            <h3 class="feature-title">${featureData.title}</h3>
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return item;
}

// Create feature card
function createFeatureCard(featureData, showDetails = true) {
    const card = document.createElement('div');
    card.className = 'feature-card';
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    card.innerHTML = `
        <div class="feature-card-header">
            <div class="feature-icon">
                <i class="${featureData.icon}" aria-hidden="true"></i>
            </div>
            <h3 class="feature-title">${featureData.title}</h3>
        </div>
        <div class="feature-card-content">
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return card;
}

// Create feature row for alternating layout
function createFeatureRow(featureData, showDetails = true, reverse = false) {
    const row = document.createElement('div');
    row.className = `feature-row ${reverse ? 'feature-row-reverse' : ''}`;
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    row.innerHTML = `
        <div class="feature-visual">
            <div class="feature-icon-large">
                <i class="${featureData.icon}" aria-hidden="true"></i>
            </div>
        </div>
        <div class="feature-content">
            <h3 class="feature-title">${featureData.title}</h3>
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return row;
}

// Animate features on scroll
function animateFeatures() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-item, .feature-card, .feature-row {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card.feature-animate {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// Get feature data from DOM
function getFeatureData(featureElement) {
    const icon = featureElement.querySelector('.feature-icon i');
    const title = featureElement.querySelector('.feature-title');
    const description = featureElement.querySelector('.feature-description');
    const details = featureElement.querySelectorAll('.feature-details li');
    
    return {
        icon: icon ? icon.className : '',
        title: title ? title.textContent : '',
        description: description ? description.textContent : '',
        details: Array.from(details).map(li => li.textContent.replace(/^\s*✓\s*/, ''))
    };
}

// Export for main.js
window.Features = {
    init: () => {
        initFeatures();
        animateFeatures();
    }
};

// Expose functions globally for API
window.addFeature = addFeature;
window.createFeatureItem = createFeatureItem;
window.createFeatureCard = createFeatureCard;
window.createFeatureRow = createFeatureRow;
window.getFeatureData = getFeatureData;