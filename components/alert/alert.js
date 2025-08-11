/**
 * Alert Component JavaScript
 */

// Initialize alerts functionality
function initAlerts() {
    // Auto-dismiss alerts with data-timeout attribute
    const autoDismissAlerts = document.querySelectorAll('[data-timeout]');
    autoDismissAlerts.forEach(alert => {
        const timeout = parseInt(alert.getAttribute('data-timeout'));
        if (timeout > 0) {
            setTimeout(() => {
                dismissAlert(alert.id);
            }, timeout);
        }
    });
    
    console.log('Alerts initialized');
}

// Dismiss an alert with animation
function dismissAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (!alert) return;
    
    // Add hiding class for animation
    alert.classList.add('alert-hiding');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
        
        // Trigger custom event for analytics or other integrations
        const dismissEvent = new CustomEvent('alertDismissed', {
            detail: { alertId, alert }
        });
        document.dispatchEvent(dismissEvent);
        
    }, 300); // Match CSS transition duration
    
    console.log(`Alert dismissed: ${alertId}`);
}

// Show a new alert programmatically
function showAlert(options) {
    const {
        type = 'info',
        title = '',
        message = '',
        dismissible = true,
        timeout = 0,
        actions = [],
        position = 'default' // 'default', 'toast'
    } = options;
    
    // Create alert ID
    const alertId = 'alert-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    // Define icons for each type
    const icons = {
        'success': 'fas fa-check-circle',
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-triangle',
        'error': 'fas fa-times-circle'
    };
    
    // Create alert HTML
    const isToast = position === 'toast';
    const alertHTML = `
        <div class="alert alert-${type} ${dismissible ? 'alert-dismissible' : ''} ${isToast ? 'alert-toast' : ''}" 
             id="${alertId}" 
             role="${type === 'error' ? 'alert' : 'status'}"
             aria-live="${type === 'error' ? 'assertive' : 'polite'}"
             ${timeout > 0 ? 'data-timeout="' + timeout + '"' : ''}>
            
            <div class="alert-content">
                <div class="alert-icon">
                    <i class="${icons[type]}"></i>
                </div>
                
                <div class="alert-body">
                    ${title ? `<div class="alert-title">${title}</div>` : ''}
                    <div class="alert-message">${message}</div>
                    
                    ${actions.length > 0 ? `
                        <div class="alert-actions">
                            ${actions.map(action => {
                                if (action.type === 'button') {
                                    return `<button class="alert-button" ${action.onclick ? 'onclick="' + action.onclick + '"' : ''}>${action.label}</button>`;
                                } else if (action.type === 'link') {
                                    return `<a href="${action.url}" class="alert-link">${action.label}</a>`;
                                } else if (action.type === 'dismiss') {
                                    return `<button class="alert-button" onclick="dismissAlert('${alertId}')">${action.label}</button>`;
                                }
                                return '';
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${dismissible ? `
                <button class="alert-dismiss" 
                        onclick="dismissAlert('${alertId}')"
                        aria-label="Dismiss alert">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
        </div>
    `;
    
    // Insert alert into DOM
    if (isToast) {
        // Add to body for fixed positioning (toasts and special variants)
        document.body.insertAdjacentHTML('afterbegin', alertHTML);
    } else {
        // Add to first container or body for normal inline alerts
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('afterbegin', alertHTML);
    }
    
    // Auto-dismiss if timeout is set
    if (timeout > 0) {
        setTimeout(() => {
            dismissAlert(alertId);
        }, timeout);
    }
    
    // Trigger custom event for analytics or other integrations
    const showEvent = new CustomEvent('alertShown', {
        detail: { alertId, options }
    });
    document.dispatchEvent(showEvent);
    
    console.log(`Alert shown: ${alertId}`, options);
    
    return alertId;
}

// Show success alert (convenience method)
function showSuccess(message, title = '', options = {}) {
    return showAlert({
        type: 'success',
        title,
        message,
        ...options
    });
}

// Show info alert (convenience method) 
function showInfo(message, title = '', options = {}) {
    return showAlert({
        type: 'info',
        title,
        message,
        ...options
    });
}

// Show warning alert (convenience method)
function showWarning(message, title = '', options = {}) {
    return showAlert({
        type: 'warning',
        title,
        message,
        ...options
    });
}

// Show error alert (convenience method)
function showError(message, title = '', options = {}) {
    return showAlert({
        type: 'error',
        title,
        message,
        ...options
    });
}

// Show toast notification (convenience method)
function showToast(message, type = 'info', timeout = 5000) {
    return showAlert({
        type,
        message,
        position: 'toast',
        timeout,
        dismissible: true
    });
}

// Dismiss all alerts of a certain type
function dismissAllAlerts(type = null) {
    const selector = type ? `.alert-${type}` : '.alert';
    const alerts = document.querySelectorAll(selector);
    
    alerts.forEach(alert => {
        dismissAlert(alert.id);
    });
    
    console.log(`Dismissed ${alerts.length} alerts${type ? ' of type: ' + type : ''}`);
}

// Get all currently visible alerts
function getVisibleAlerts() {
    const alerts = Array.from(document.querySelectorAll('.alert:not(.alert-hiding)'));
    return alerts.map(alert => ({
        id: alert.id,
        type: alert.classList.contains('alert-success') ? 'success' :
              alert.classList.contains('alert-info') ? 'info' :
              alert.classList.contains('alert-warning') ? 'warning' :
              alert.classList.contains('alert-error') ? 'error' : 'unknown',
        dismissible: alert.classList.contains('alert-dismissible'),
        element: alert
    }));
}

// Export for main.js
window.Alerts = {
    init: () => {
        initAlerts();
    }
};

// Expose functions globally for onclick handlers and API
window.dismissAlert = dismissAlert;
window.showAlert = showAlert;
window.showSuccess = showSuccess;
window.showInfo = showInfo;
window.showWarning = showWarning;
window.showError = showError;
window.showToast = showToast;
window.dismissAllAlerts = dismissAllAlerts;
window.getVisibleAlerts = getVisibleAlerts;