/**
 * Tooltip Component JavaScript
 */

// Initialize tooltip functionality
function initTooltip() {
    // Find all tooltip triggers
    const triggers = document.querySelectorAll('[data-tooltip]');
    
    triggers.forEach(trigger => {
        // Create tooltip element
        const tooltip = createTooltipElement(trigger);
        
        // Add event listeners
        trigger.addEventListener('mouseenter', () => showTooltip(trigger, tooltip));
        trigger.addEventListener('mouseleave', () => hideTooltip(trigger, tooltip));
        trigger.addEventListener('focus', () => showTooltip(trigger, tooltip));
        trigger.addEventListener('blur', () => hideTooltip(trigger, tooltip));
        
        // Handle keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideTooltip(trigger, tooltip);
                trigger.blur();
            }
        });
    });
    
    // Reposition visible tooltips on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const visibleTooltips = document.querySelectorAll('.tooltip[style*="visible"]');
            visibleTooltips.forEach(tooltip => {
                const trigger = tooltip.closest('[data-tooltip]');
                if (trigger) {
                    positionTooltip(trigger, tooltip);
                }
            });
        }, 100);
    });
    
    console.log(`Initialized ${triggers.length} tooltips`);
}

// Create tooltip element
function createTooltipElement(trigger) {
    const tooltipText = trigger.getAttribute('data-tooltip');
    const position = trigger.getAttribute('data-tooltip-position') || 'top';
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${position}`;
    tooltip.textContent = tooltipText;
    tooltip.setAttribute('role', 'tooltip');
    
    // Add to trigger element
    trigger.appendChild(tooltip);
    
    return tooltip;
}

// Show tooltip
function showTooltip(trigger, tooltip) {
    // Position tooltip to avoid viewport edges
    positionTooltip(trigger, tooltip);
    
    // Show tooltip
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    
    // Update ARIA
    const tooltipId = 'tooltip-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    tooltip.id = tooltipId;
    trigger.setAttribute('aria-describedby', tooltipId);
    
    // Trigger custom event
    const showEvent = new CustomEvent('tooltipShow', {
        detail: { trigger, tooltip }
    });
    trigger.dispatchEvent(showEvent);
}

// Hide tooltip  
function hideTooltip(trigger, tooltip) {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    
    // Clean up ARIA
    trigger.removeAttribute('aria-describedby');
    if (tooltip.id) {
        tooltip.removeAttribute('id');
    }
    
    // Trigger custom event
    const hideEvent = new CustomEvent('tooltipHide', {
        detail: { trigger, tooltip }
    });
    trigger.dispatchEvent(hideEvent);
}

// Position tooltip to avoid viewport edges
function positionTooltip(trigger, tooltip) {
    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16; // Safe margin from viewport edges
    
    const requestedPosition = trigger.getAttribute('data-tooltip-position') || 'top';
    let bestPosition = requestedPosition;
    let maxVisibleArea = 0;
    
    // Test all positions and find the one with most visible area
    const positions = ['top', 'bottom', 'left', 'right'];
    
    positions.forEach(testPosition => {
        tooltip.className = `tooltip tooltip-${testPosition}`;
        
        // Force reflow to get accurate measurements
        tooltip.offsetHeight;
        
        const tooltipRect = tooltip.getBoundingClientRect();
        let visibleArea = 0;
        
        // Calculate how much of the tooltip would be visible
        const left = Math.max(0, tooltipRect.left);
        const right = Math.min(viewportWidth, tooltipRect.right);
        const top = Math.max(0, tooltipRect.top);
        const bottom = Math.min(viewportHeight, tooltipRect.bottom);
        
        if (left < right && top < bottom) {
            visibleArea = (right - left) * (bottom - top);
        }
        
        // Prefer positions that don't go off-screen at all
        const fullyVisible = tooltipRect.left >= margin && 
                           tooltipRect.right <= viewportWidth - margin &&
                           tooltipRect.top >= margin && 
                           tooltipRect.bottom <= viewportHeight - margin;
        
        if (fullyVisible || visibleArea > maxVisibleArea) {
            if (fullyVisible && !maxVisibleArea) {
                // First fully visible position wins
                maxVisibleArea = tooltipRect.width * tooltipRect.height;
                bestPosition = testPosition;
            } else if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                bestPosition = testPosition;
            }
        }
        
        // Prefer original position if it's fully visible
        if (testPosition === requestedPosition && fullyVisible) {
            bestPosition = requestedPosition;
        }
    });
    
    // Apply the best position
    tooltip.className = `tooltip tooltip-${bestPosition}`;
    
    // Additional fine-tuning for horizontal centering
    if ((bestPosition === 'top' || bestPosition === 'bottom')) {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // If tooltip goes off left edge
        if (tooltipRect.left < margin) {
            const offset = margin - tooltipRect.left;
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateX(-50%)', 
                `translateX(calc(-50% + ${offset}px))`
            );
        }
        // If tooltip goes off right edge  
        else if (tooltipRect.right > viewportWidth - margin) {
            const offset = tooltipRect.right - (viewportWidth - margin);
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateX(-50%)', 
                `translateX(calc(-50% - ${offset}px))`
            );
        }
    }
    
    // Additional fine-tuning for vertical centering
    if ((bestPosition === 'left' || bestPosition === 'right')) {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // If tooltip goes off top edge
        if (tooltipRect.top < margin) {
            const offset = margin - tooltipRect.top;
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateY(-50%)', 
                `translateY(calc(-50% + ${offset}px))`
            );
        }
        // If tooltip goes off bottom edge
        else if (tooltipRect.bottom > viewportHeight - margin) {
            const offset = tooltipRect.bottom - (viewportHeight - margin);
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateY(-50%)', 
                `translateY(calc(-50% - ${offset}px))`
            );
        }
    }
}

// Show tooltip programmatically
function showTooltipById(tooltipId) {
    const trigger = document.querySelector(`[data-tooltip-id="${tooltipId}"]`);
    if (trigger) {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
            showTooltip(trigger, tooltip);
        }
    }
}

// Hide tooltip programmatically
function hideTooltipById(tooltipId) {
    const trigger = document.querySelector(`[data-tooltip-id="${tooltipId}"]`);
    if (trigger) {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
            hideTooltip(trigger, tooltip);
        }
    }
}

// Hide all visible tooltips
function hideAllTooltips() {
    const visibleTooltips = document.querySelectorAll('.tooltip[style*="visible"]');
    visibleTooltips.forEach(tooltip => {
        const trigger = tooltip.closest('[data-tooltip]');
        if (trigger) {
            hideTooltip(trigger, tooltip);
        }
    });
}

// Update tooltip text
function updateTooltipText(trigger, newText) {
    if (typeof trigger === 'string') {
        trigger = document.querySelector(trigger);
    }
    
    if (!trigger) return;
    
    trigger.setAttribute('data-tooltip', newText);
    const tooltip = trigger.querySelector('.tooltip');
    if (tooltip) {
        tooltip.textContent = newText;
    }
}

// Dynamically add tooltip to element
function addTooltip(element, text, position = 'top') {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    // Set data attributes
    element.setAttribute('data-tooltip', text);
    element.setAttribute('data-tooltip-position', position);
    element.classList.add('tooltip-trigger');
    
    // Create and add tooltip
    const tooltip = createTooltipElement(element);
    
    // Add event listeners
    element.addEventListener('mouseenter', () => showTooltip(element, tooltip));
    element.addEventListener('mouseleave', () => hideTooltip(element, tooltip));
    element.addEventListener('focus', () => showTooltip(element, tooltip));
    element.addEventListener('blur', () => hideTooltip(element, tooltip));
    
    return tooltip;
}

// Remove tooltip from element
function removeTooltip(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    // Remove attributes and classes
    element.removeAttribute('data-tooltip');
    element.removeAttribute('data-tooltip-position');
    element.removeAttribute('aria-describedby');
    element.classList.remove('tooltip-trigger');
    
    // Remove tooltip element
    const tooltip = element.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Export for main.js
window.Tooltip = {
    init: () => {
        initTooltip();
    }
};

// Expose functions globally for API
window.showTooltipById = showTooltipById;
window.hideTooltipById = hideTooltipById;
window.hideAllTooltips = hideAllTooltips;
window.updateTooltipText = updateTooltipText;
window.addTooltip = addTooltip;
window.removeTooltip = removeTooltip;