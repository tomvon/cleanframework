/**
 * Breadcrumb Component JavaScript
 */

// Initialize breadcrumb functionality
function initBreadcrumb() {
    // Handle keyboard navigation for breadcrumb links
    document.addEventListener('keydown', (e) => {
        const activeBreadcrumb = document.activeElement;
        
        if (activeBreadcrumb.closest('.breadcrumb-item')) {
            const breadcrumbNav = activeBreadcrumb.closest('.breadcrumb');
            const breadcrumbLinks = Array.from(breadcrumbNav.querySelectorAll('.breadcrumb-item a'));
            const currentIndex = breadcrumbLinks.indexOf(activeBreadcrumb);
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        breadcrumbLinks[currentIndex - 1].focus();
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < breadcrumbLinks.length - 1) {
                        breadcrumbLinks[currentIndex + 1].focus();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    if (breadcrumbLinks.length > 0) {
                        breadcrumbLinks[0].focus();
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    if (breadcrumbLinks.length > 0) {
                        breadcrumbLinks[breadcrumbLinks.length - 1].focus();
                    }
                    break;
            }
        }
    });
    
    console.log('Breadcrumb navigation initialized');
}

// Generate breadcrumb from path
function generateBreadcrumb(path, baseUrl = '', separator = 'chevron') {
    const pathParts = path.split('/').filter(part => part.length > 0);
    const breadcrumbData = [];
    
    // Add home
    breadcrumbData.push({
        label: 'Home',
        url: baseUrl || '/'
    });
    
    // Add path parts
    let currentPath = baseUrl;
    pathParts.forEach((part, index) => {
        currentPath += '/' + part;
        const isLast = index === pathParts.length - 1;
        
        // Convert slug to readable label
        const label = part.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        if (isLast) {
            breadcrumbData.push({
                label: label,
                current: true
            });
        } else {
            breadcrumbData.push({
                label: label,
                url: currentPath
            });
        }
    });
    
    return breadcrumbData;
}

// Update breadcrumb dynamically
function updateBreadcrumb(containerId, breadcrumbData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const breadcrumbList = container.querySelector('.breadcrumb-list');
    if (!breadcrumbList) return;
    
    // Clear existing items
    breadcrumbList.innerHTML = '';
    
    // Add new items
    breadcrumbData.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `breadcrumb-item ${item.current ? 'breadcrumb-current' : ''}`;
        
        if (item.current) {
            li.innerHTML = `<span aria-current="page">${item.label}</span>`;
        } else {
            li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
        }
        
        // Add separator if not last item
        if (index < breadcrumbData.length - 1) {
            li.innerHTML += `
                <span class="breadcrumb-separator" aria-hidden="true">
                    <i class="fas fa-chevron-right"></i>
                </span>
            `;
        }
        
        breadcrumbList.appendChild(li);
    });
    
    console.log(`Updated breadcrumb: ${containerId}`);
}

// Get current breadcrumb data
function getBreadcrumbData(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const items = Array.from(container.querySelectorAll('.breadcrumb-item'));
    return items.map(item => {
        const link = item.querySelector('a');
        const span = item.querySelector('span[aria-current]');
        
        if (link) {
            return {
                label: link.textContent,
                url: link.getAttribute('href'),
                current: false
            };
        } else if (span) {
            return {
                label: span.textContent,
                current: true
            };
        }
    });
}

// Export for main.js
window.Breadcrumb = {
    init: () => {
        initBreadcrumb();
    }
};

// Expose functions globally for API
window.generateBreadcrumb = generateBreadcrumb;
window.updateBreadcrumb = updateBreadcrumb;
window.getBreadcrumbData = getBreadcrumbData;