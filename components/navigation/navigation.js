/**
 * Navigation Component JavaScript
 */

// Mobile navigation toggle (if needed)
function toggleMobileNav() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav .menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme toggle functionality - cycles through light -> dark -> system
function toggleTheme() {
    const html = document.documentElement;
    // Get the saved theme from localStorage to determine current state
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    let newTheme;
    switch (savedTheme) {
        case 'light':
            newTheme = 'dark';
            break;
        case 'dark':
            newTheme = 'system';
            break;
        case 'system':
        default:
            newTheme = 'light';
            break;
    }
    
    console.log('Toggling theme from', savedTheme, 'to', newTheme);
    
    if (newTheme === 'system') {
        // Remove data-theme to let CSS media query take over
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'system');
    } else {
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.theme-toggle .sun');
    const moonIcon = document.querySelector('.theme-toggle .moon');
    const systemIcon = document.querySelector('.theme-toggle .system');
    
    console.log('Updating icons for theme:', theme);
    
    if (sunIcon && moonIcon && systemIcon) {
        // Remove active class from all icons
        sunIcon.classList.remove('active');
        moonIcon.classList.remove('active');
        systemIcon.classList.remove('active');
        
        // Add active class to the appropriate icon
        switch (theme) {
            case 'light':
                sunIcon.classList.add('active');
                break;
            case 'dark':
                moonIcon.classList.add('active');
                break;
            case 'system':
                systemIcon.classList.add('active');
                break;
        }
    }
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = savedTheme || 'light'; // Default to light theme
    
    console.log('Initializing theme:', theme, 'System prefers dark:', prefersDark);
    
    if (theme === 'system') {
        // Remove data-theme to let CSS media query take over
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Save the default if no theme was saved
    if (!savedTheme) {
        localStorage.setItem('theme', theme);
    }
    
    // Wait for DOM to be ready before updating icons
    setTimeout(() => {
        updateThemeIcon(theme);
    }, 100);
}

// Listen for system theme changes - only update if currently using system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'system') {
        // User is using system preference, no need to change data-theme
        // The CSS media query will handle it automatically
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    }
});

// Export for main.js
window.Navigation = {
    init: () => {
        initSmoothScroll();
        initTheme();
    }
};

// Expose functions globally for onclick handlers
window.toggleTheme = toggleTheme;