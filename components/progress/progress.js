/**
 * Progress Component JavaScript
 */

// Initialize progress functionality
function initProgress() {
    // Initialize all progress bars with animation
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    
    // Use Intersection Observer to animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                // Small delay for better visual effect
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Initialize circular progress bars
    const circularBars = document.querySelectorAll('.progress-circle[data-value]');
    circularBars.forEach(circle => {
        const value = parseInt(circle.getAttribute('data-value'));
        const max = parseInt(circle.getAttribute('data-max')) || 100;
        updateCircularProgress(circle, value, max);
    });
    
    console.log(`Initialized ${progressBars.length} progress bars and ${circularBars.length} circular progress`);
}

// Update progress bar value
function updateProgress(progressElement, value, max = 100) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return;
    
    const progressBar = progressElement.querySelector('.progress-bar');
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    // Update ARIA attributes
    progressElement.setAttribute('aria-valuenow', value);
    progressElement.setAttribute('aria-valuemax', max);
    
    // Update visual progress
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('data-width', percentage + '%');
    
    // Update value display if exists
    const valueDisplay = progressElement.parentNode?.querySelector('.progress-value');
    if (valueDisplay) {
        valueDisplay.textContent = Math.round(percentage) + '%';
    }
    
    // Trigger custom event
    const updateEvent = new CustomEvent('progressUpdate', {
        detail: { value, max, percentage, progressElement }
    });
    progressElement.dispatchEvent(updateEvent);
    
    console.log(`Progress updated: ${Math.round(percentage)}%`);
}

// Animate progress to target value
function animateProgress(progressElement, targetValue, max = 100, duration = 1000) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return;
    
    const currentValue = parseInt(progressElement.getAttribute('aria-valuenow')) || 0;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentAnimatedValue = currentValue + (targetValue - currentValue) * easeOutCubic;
        
        updateProgress(progressElement, currentAnimatedValue, max);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Update circular progress
function updateCircularProgress(circleElement, value, max = 100) {
    if (typeof circleElement === 'string') {
        circleElement = document.querySelector(circleElement);
    }
    
    if (!circleElement) return;
    
    const progressCircle = circleElement.querySelector('.progress-circle-bar');
    const textElement = circleElement.querySelector('.progress-circle-text');
    
    if (!progressCircle) return;
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const circumference = parseFloat(progressCircle.style.strokeDasharray || progressCircle.getAttribute('stroke-dasharray'));
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
    
    if (textElement) {
        textElement.textContent = Math.round(percentage) + '%';
    }
    
    // Update attributes
    circleElement.setAttribute('data-value', value);
    circleElement.setAttribute('data-max', max);
}

// Create progress bar element
function createProgress(value, max = 100, options = {}) {
    const {
        type = 'primary',
        size = 'default',
        label = '',
        showValue = false,
        striped = false,
        animated = false
    } = options;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'progress-item';
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    let headerHTML = '';
    if (label || showValue) {
        headerHTML = `
            <div class="progress-header">
                ${label ? `<span class="progress-label">${label}</span>` : ''}
                ${showValue ? `<span class="progress-value">${Math.round(percentage)}%</span>` : ''}
            </div>
        `;
    }
    
    let classes = ['progress', `progress-${type}`];
    if (size !== 'default') classes.push(`progress-${size}`);
    if (striped) classes.push('progress-striped');
    if (animated) classes.push('progress-animated');
    
    wrapper.innerHTML = `
        ${headerHTML}
        <div class="${classes.join(' ')}" 
             role="progressbar" 
             aria-valuenow="${value}" 
             aria-valuemin="0" 
             aria-valuemax="${max}"
             ${label ? `aria-label="${label} progress"` : ''}>
            <div class="progress-bar" data-width="${percentage}%"></div>
        </div>
    `;
    
    return wrapper;
}

// Create circular progress element
function createCircularProgress(value, max = 100, options = {}) {
    const {
        type = 'primary',
        size = 'default',
        showText = true
    } = options;
    
    const wrapper = document.createElement('div');
    let classes = ['progress-circle', `progress-${type}`];
    if (size !== 'default') classes.push(`progress-${size}`);
    wrapper.className = classes.join(' ');
    
    const radius = size === 'sm' ? 30 : size === 'lg' ? 50 : 40;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;
    
    wrapper.innerHTML = `
        <svg>
            <circle class="progress-circle-bg" cx="50%" cy="50%" r="${radius}"></circle>
            <circle class="progress-circle-bar" cx="50%" cy="50%" r="${radius}" 
                    stroke-dasharray="${circumference}" 
                    stroke-dashoffset="${offset}"></circle>
        </svg>
        ${showText ? `<div class="progress-circle-text">${Math.round(percentage)}%</div>` : ''}
    `;
    
    wrapper.setAttribute('data-value', value);
    wrapper.setAttribute('data-max', max);
    
    return wrapper;
}

// Get progress value
function getProgressValue(progressElement) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return null;
    
    const value = parseInt(progressElement.getAttribute('aria-valuenow')) || 0;
    const max = parseInt(progressElement.getAttribute('aria-valuemax')) || 100;
    
    return {
        value,
        max,
        percentage: (value / max) * 100
    };
}

// Export for main.js
window.Progress = {
    init: () => {
        initProgress();
    }
};

// Expose functions globally for API
window.updateProgress = updateProgress;
window.animateProgress = animateProgress;
window.updateCircularProgress = updateCircularProgress;
window.createProgress = createProgress;
window.createCircularProgress = createCircularProgress;
window.getProgressValue = getProgressValue;