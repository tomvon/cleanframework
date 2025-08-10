/**
 * Clean Framework v2 - Main JavaScript
 * 
 * This file will be the compiled output if you use Prepros to concatenate.
 * For now, it manually includes component functionality.
 */

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Navigation component
    if (window.Navigation) {
        window.Navigation.init();
    }
    
    // Initialize Forms component  
    if (window.Forms) {
        window.Forms.init();
    }
    
    // Initialize Dropdown component
    if (window.Dropdown) {
        window.Dropdown.init();
    }
    
    // Initialize Table component
    if (window.Table) {
        window.Table.init();
    }
    
    // Initialize other components as they're created
    console.log('Clean Framework v2 initialized');
});

// Global utilities
window.CleanFramework = {
    // Smooth scroll to element
    scrollTo: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },
    
    // Toggle element visibility
    toggle: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle('hidden');
        }
    },
    
    // Show element
    show: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.remove('hidden');
        }
    },
    
    // Hide element
    hide: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('hidden');
        }
    }
};