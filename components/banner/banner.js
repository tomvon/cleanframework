/**
 * Banner Component JavaScript
 */

function initBanner() {
    const banners = document.querySelectorAll('.banner');
    
    banners.forEach(banner => {
        const closeBtn = banner.querySelector('.banner-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                banner.classList.add('banner-closed');
            });
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
} else {
    initBanner();
}

// Export for main.js
window.Banner = {
    init: initBanner
};