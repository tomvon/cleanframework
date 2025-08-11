/**
 * Stats/Counter Component JavaScript
 */

// Initialize stats functionality
function initStats() {
    // Initialize counters with intersection observer
    if (window.IntersectionObserver) {
        initStatsObserver();
    } else {
        // Fallback for older browsers
        animateAllStats();
    }
    
    console.log('Stats component initialized');
}

// Initialize intersection observer for stats
function initStatsObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsInElement(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all stats sections
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        observer.observe(section);
    });
}

// Animate stats in a specific element
function animateStatsInElement(element) {
    // Add animation class
    element.classList.add('stat-animate');
    
    // Animate numbers
    const numbers = element.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        animateCounter(number);
    });
    
    // Animate progress bars
    const progressFills = element.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        if (targetWidth) {
            setTimeout(() => {
                fill.style.width = targetWidth + '%';
            }, 200);
        }
    });
}

// Animate all stats (fallback)
function animateAllStats() {
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        animateStatsInElement(section);
    });
}

// Animate counter from 0 to target value
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-value'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const isDecimal = target.toString().includes('.');
    
    if (isNaN(target)) return;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        let currentValue;
        if (isDecimal) {
            currentValue = (target * easedProgress).toFixed(1);
        } else {
            currentValue = Math.floor(target * easedProgress);
        }
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            element.textContent = target;
            
            // Trigger completion event
            const completeEvent = new CustomEvent('counterComplete', {
                detail: { element, target, finalValue: target }
            });
            element.dispatchEvent(completeEvent);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Create stat item dynamically
function createStatItem(statData, options = {}) {
    const {
        layout = 'card', // 'card', 'minimal', 'horizontal'
        color = 'primary',
        showIcon = true,
        showDescription = true
    } = options;
    
    let statElement;
    
    if (layout === 'minimal') {
        statElement = createMinimalStat(statData);
    } else if (layout === 'horizontal') {
        statElement = createHorizontalStat(statData, showIcon);
    } else {
        statElement = createCardStat(statData, color, showIcon, showDescription);
    }
    
    return statElement;
}

// Create card-style stat
function createCardStat(statData, color, showIcon, showDescription) {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    statItem.setAttribute('data-color', color);
    
    let iconHTML = '';
    if (showIcon && statData.icon) {
        iconHTML = `
            <div class="stat-icon">
                <i class="${statData.icon}" aria-hidden="true"></i>
            </div>
        `;
    }
    
    let descriptionHTML = '';
    if (showDescription && statData.description) {
        descriptionHTML = `<p class="stat-description">${statData.description}</p>`;
    }
    
    statItem.innerHTML = `
        ${iconHTML}
        <div class="stat-content">
            <div class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </div>
            <h3 class="stat-label">${statData.label}</h3>
            ${descriptionHTML}
        </div>
    `;
    
    return statItem;
}

// Create minimal stat
function createMinimalStat(statData) {
    const statMinimal = document.createElement('div');
    statMinimal.className = 'stat-minimal';
    
    statMinimal.innerHTML = `
        <div class="stat-value">
            <span class="stat-number" data-value="${statData.value}">0</span>
            <span class="stat-suffix">${statData.suffix || ''}</span>
        </div>
        <div class="stat-label">${statData.label}</div>
        <div class="stat-description">${statData.description || ''}</div>
    `;
    
    return statMinimal;
}

// Create horizontal stat
function createHorizontalStat(statData, showIcon) {
    const statHorizontal = document.createElement('div');
    statHorizontal.className = 'stat-horizontal';
    
    let iconHTML = '';
    if (showIcon && statData.icon) {
        iconHTML = `
            <div class="stat-icon-small">
                <i class="${statData.icon}" aria-hidden="true"></i>
            </div>
        `;
    }
    
    statHorizontal.innerHTML = `
        ${iconHTML}
        <div class="stat-content-horizontal">
            <div class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </div>
            <div class="stat-label">${statData.label}</div>
        </div>
    `;
    
    return statHorizontal;
}

// Add stat to container
function addStat(container, statData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const statElement = createStatItem(statData, options);
    container.appendChild(statElement);
    
    // Trigger custom event
    const addEvent = new CustomEvent('statAdd', {
        detail: { statElement, statData, options }
    });
    container.dispatchEvent(addEvent);
    
    return statElement;
}

// Update stat value
function updateStatValue(statElement, newValue, animated = true) {
    const numberElement = statElement.querySelector('.stat-number');
    if (!numberElement) return;
    
    if (animated) {
        numberElement.setAttribute('data-value', newValue);
        animateCounter(numberElement);
    } else {
        numberElement.textContent = newValue;
        numberElement.setAttribute('data-value', newValue);
    }
    
    // Trigger update event
    const updateEvent = new CustomEvent('statUpdate', {
        detail: { statElement, newValue, animated }
    });
    statElement.dispatchEvent(updateEvent);
}

// Create progress stat
function createProgressStat(statData) {
    const progressItem = document.createElement('div');
    progressItem.className = 'stat-progress-item';
    
    progressItem.innerHTML = `
        <div class="stat-progress-header">
            <span class="stat-label">${statData.label}</span>
            <span class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" data-width="${statData.value}"></div>
        </div>
    `;
    
    return progressItem;
}

// Start real-time counter (for live data)
function startRealtimeCounter(element, options = {}) {
    const {
        increment = 1,
        interval = 1000, // 1 second
        maxValue = null
    } = options;
    
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return null;
    
    let currentValue = parseInt(numberElement.textContent) || 0;
    
    const intervalId = setInterval(() => {
        currentValue += increment;
        
        if (maxValue && currentValue >= maxValue) {
            currentValue = maxValue;
            clearInterval(intervalId);
        }
        
        numberElement.textContent = currentValue;
        numberElement.setAttribute('data-value', currentValue);
        
        // Trigger update event
        const updateEvent = new CustomEvent('realtimeUpdate', {
            detail: { element, currentValue, increment }
        });
        element.dispatchEvent(updateEvent);
    }, interval);
    
    return intervalId;
}

// Stop real-time counter
function stopRealtimeCounter(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

// Format large numbers
function formatStatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

// Export for main.js
window.Stats = {
    init: () => {
        initStats();
    }
};

// Expose functions globally for API
window.createStatItem = createStatItem;
window.addStat = addStat;
window.updateStatValue = updateStatValue;
window.createProgressStat = createProgressStat;
window.startRealtimeCounter = startRealtimeCounter;
window.stopRealtimeCounter = stopRealtimeCounter;
window.formatStatNumber = formatStatNumber;
window.animateCounter = animateCounter;