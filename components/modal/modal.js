/**
 * Modal Component JavaScript
 */

// Track open modals for stacking
let openModals = [];

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Add to open modals stack
    openModals.push(modalId);
    
    // Add stacked class if there are other open modals
    if (openModals.length > 1) {
        modal.classList.add('stacked');
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus management
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    // Trap focus within modal
    modal.addEventListener('keydown', trapFocus);
    
    // Close on escape
    document.addEventListener('keydown', handleEscape);
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Remove from open modals stack
    openModals = openModals.filter(id => id !== modalId);
    
    // Hide modal
    modal.classList.remove('active', 'stacked');
    
    // Remove body class if no modals are open
    if (openModals.length === 0) {
        document.body.classList.remove('modal-open');
    }
    
    // Remove event listeners
    modal.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', handleEscape);
    
    // Return focus to trigger element
    const trigger = document.activeElement;
    if (trigger) {
        trigger.focus();
    }
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal.id);
    });
}

// Trap focus within modal
function trapFocus(e) {
    const modal = e.currentTarget;
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableArray = Array.from(focusableElements);
    const firstFocusable = focusableArray[0];
    const lastFocusable = focusableArray[focusableArray.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
}

// Handle escape key
function handleEscape(e) {
    if (e.key === 'Escape' && openModals.length > 0) {
        // Close the topmost modal
        const topModalId = openModals[openModals.length - 1];
        closeModal(topModalId);
    }
}

// Example functions for demo buttons
function confirmAction() {
    alert('Action confirmed!');
    closeModal('confirm-modal');
}

function submitModalForm() {
    const form = document.querySelector('#form-modal form');
    if (form.checkValidity()) {
        alert('Form submitted!');
        closeModal('form-modal');
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal(modal.id);
            }
        });
    });
});

// Export for use in other scripts
window.Modal = {
    open: openModal,
    close: closeModal,
    closeAll: closeAllModals
};