/**
 * Clean Framework - Main JavaScript
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
    
    // Initialize Tabs component
    if (window.Tabs) {
        window.Tabs.init();
    }
    
    // Initialize Alerts component
    if (window.Alerts) {
        window.Alerts.init();
    }
    
    // Initialize Accordion component
    if (window.Accordion) {
        window.Accordion.init();
    }
    
    // Initialize Tooltip component
    if (window.Tooltip) {
        window.Tooltip.init();
    }
    
    // Initialize Breadcrumb component
    if (window.Breadcrumb) {
        window.Breadcrumb.init();
    }
    
    // Initialize Badge component
    if (window.Badge) {
        window.Badge.init();
    }
    
    // Initialize Progress component
    if (window.Progress) {
        window.Progress.init();
    }
    
    // Initialize Testimonials component
    if (window.Testimonials) {
        window.Testimonials.init();
    }
    
    // Initialize Features component
    if (window.Features) {
        window.Features.init();
    }
    
    // Initialize CTA component
    if (window.CTA) {
        window.CTA.init();
    }
    
    // Initialize Stats component
    if (window.Stats) {
        window.Stats.init();
    }
    
    // Initialize Sidebar component
    if (window.Sidebar) {
        window.Sidebar.init();
    }
    
    // Initialize Dashboard component
    if (window.Dashboard) {
        window.Dashboard.init();
    }
    
    // All components initialized
    console.log('Clean Framework initialized');
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