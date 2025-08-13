/**
 * Navigation Component JavaScript - Simplified
 */

// Unified Mobile Navigation Manager
const MobileNav = {
    activeMenu: null, // 'header' | 'sidebar' | null
    
    open(type) {
        // Close any open menu first
        this.closeAll();
        
        // Open the requested menu
        this.activeMenu = type;
        document.body.classList.add(`${type}-nav-open`);
    },
    
    close() {
        if (this.activeMenu) {
            document.body.classList.remove(`${this.activeMenu}-nav-open`);
            this.activeMenu = null;
        }
    },
    
    closeAll() {
        document.body.classList.remove('header-nav-open', 'sidebar-nav-open');
        this.activeMenu = null;
    },
    
    toggle(type) {
        if (this.activeMenu === type) {
            this.close();
        } else {
            this.open(type);
        }
    }
};

// Mobile navigation toggle (simplified)
function toggleMobileNav() {
    MobileNav.toggle('header');
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
    // Update button icons
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
    
    // Update mobile text menu
    const themeModes = document.querySelectorAll('.theme-mode');
    themeModes.forEach(mode => {
        mode.classList.remove('active');
    });
    
    const activeMode = document.querySelector(`.theme-mode.${theme}-mode`);
    if (activeMode) {
        activeMode.classList.add('active');
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

// Close mobile menus when clicking outside
function initClickOutside() {
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav');
        const sidebar = document.getElementById('sidebar');
        const navToggle = document.querySelector('.nav-toggle');
        const sidebarToggle = document.querySelector('.sidebar-mobile-toggle');
        
        // Skip if click is on a toggle button
        if (navToggle?.contains(e.target) || sidebarToggle?.contains(e.target)) {
            return;
        }
        
        // Close if clicking outside open menus
        if (MobileNav.activeMenu === 'header' && nav && !nav.contains(e.target)) {
            MobileNav.close();
        } else if (MobileNav.activeMenu === 'sidebar' && sidebar && !sidebar.contains(e.target)) {
            MobileNav.close();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            MobileNav.close();
        }
    });
    
    // Close mobile menus when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            MobileNav.closeAll();
        }
    });
}

// Remove all JavaScript-based overflow detection
// Let CSS handle everything with container queries or media queries

// Export for main.js
window.Navigation = {
    init: () => {
        initSmoothScroll();
        initTheme();
        initClickOutside();
    }
};

// Expose functions globally for onclick handlers
window.toggleTheme = toggleTheme;
window.toggleMobileNav = toggleMobileNav;
window.MobileNav = MobileNav;