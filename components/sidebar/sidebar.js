/**
 * Sidebar Component JavaScript - Simplified
 */

function toggleSidebar() {
    if (window.innerWidth <= 768) {
        // Mobile: use unified navigation system
        if (window.MobileNav) {
            window.MobileNav.toggle('sidebar');
        }
    } else {
        // Desktop: toggle collapsed state only
        document.body.classList.toggle('sidebar-collapsed');
    }
}

function initSidebar() {
    // Set active navigation item based on current URL
    setActiveSidebarItem();
}

function setActiveSidebarItem() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href !== '#' && currentPath.includes(href)) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to current link
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Compact sidebar toggle
function toggleCompactSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = sidebar.querySelector('.sidebar-toggle-btn i');
    
    sidebar.classList.toggle('sidebar-compact');
    
    // Update button icon
    const isCompact = sidebar.classList.contains('sidebar-compact');
    if (toggleBtn) {
        toggleBtn.className = isCompact ? 'fas fa-expand' : 'fas fa-compress';
    }
    
    // Save preference
    localStorage.setItem('sidebar-compact', isCompact);
}

// Initialize compact state from localStorage
function initCompactSidebar() {
    const isCompact = localStorage.getItem('sidebar-compact') === 'true';
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = sidebar?.querySelector('.sidebar-toggle-btn i');
    
    if (isCompact && sidebar) {
        sidebar.classList.add('sidebar-compact');
        if (toggleBtn) {
            toggleBtn.className = 'fas fa-expand';
        }
    }
}

// Export for main.js
window.Sidebar = {
    init: () => {
        initSidebar();
        initCompactSidebar();
    }
};

// Expose functions globally for onclick handlers
window.toggleSidebar = toggleSidebar;
window.toggleCompactSidebar = toggleCompactSidebar;