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
    
    // Initialize FAQ component
    if (window.FAQ) {
        window.FAQ.init();
    }
    
    // Initialize Banner component
    if (window.Banner) {
        window.Banner.init();
    }
    
    // All components initialized
    console.log('Clean Framework initialized');
});

// Clean Framework Namespace
window.CleanFramework = {
    // Core utilities
    scrollTo: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },
    
    // Component references
    Navigation: window.Navigation || {},
    Forms: window.Forms || {},
    Dropdown: window.Dropdown || {},
    Table: window.Table || {},
    Tabs: window.Tabs || {},
    Alerts: window.Alerts || {},
    Accordion: window.Accordion || {},
    Tooltip: window.Tooltip || {},
    Breadcrumb: window.Breadcrumb || {},
    Badge: window.Badge || {},
    Progress: window.Progress || {},
    Testimonials: window.Testimonials || {},
    Features: window.Features || {},
    CTA: window.CTA || {},
    Stats: window.Stats || {},
    Sidebar: window.Sidebar || {},
    Dashboard: window.Dashboard || {},
    FAQ: window.FAQ || {},
    Banner: window.Banner || {}
};