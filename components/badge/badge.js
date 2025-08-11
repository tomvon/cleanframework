/**
 * Badge Component JavaScript
 */

// Initialize badge functionality
function initBadge() {
    // Handle removable badge functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('badge-remove') || e.target.closest('.badge-remove')) {
            const removeButton = e.target.classList.contains('badge-remove') ? 
                                e.target : e.target.closest('.badge-remove');
            const badge = removeButton.closest('.badge');
            
            if (badge) {
                removeBadge(badge);
            }
        }
    });
    
    // Handle keyboard interaction for removable badges
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && 
            e.target.classList.contains('badge-remove')) {
            e.preventDefault();
            const badge = e.target.closest('.badge');
            if (badge) {
                removeBadge(badge);
            }
        }
    });
    
    console.log('Badge component initialized');
}

// Remove badge with animation
function removeBadge(badge) {
    // Add removing class for animation
    badge.classList.add('badge-removing');
    
    // Trigger custom event
    const removeEvent = new CustomEvent('badgeRemove', {
        detail: { badge, text: badge.textContent.trim() }
    });
    badge.dispatchEvent(removeEvent);
    
    // Remove after animation
    setTimeout(() => {
        if (badge.parentNode) {
            badge.parentNode.removeChild(badge);
        }
    }, 200);
    
    console.log(`Badge removed: ${badge.textContent.trim()}`);
}

// Create badge element
function createBadge(text, type = 'secondary', options = {}) {
    const {
        variant = 'default', // 'default', 'solid', 'outline'
        size = 'default', // 'sm', 'default', 'lg'
        icon = null,
        removable = false,
        dot = false
    } = options;
    
    const badge = document.createElement('span');
    let classes = ['badge', `badge-${type}`];
    
    // Add variant class
    if (variant !== 'default') {
        classes.push(`badge-${variant}`);
    }
    
    // Add size class
    if (size !== 'default') {
        classes.push(`badge-${size}`);
    }
    
    // Add modifier classes
    if (icon) classes.push('badge-icon');
    if (removable) classes.push('badge-removable');
    if (dot) classes.push('badge-dot');
    
    badge.className = classes.join(' ');
    
    // Build content
    let content = '';
    
    if (icon && !dot) {
        content += `<i class="${icon}"></i>`;
    }
    
    if (!dot) {
        content += text;
    }
    
    if (removable && !dot) {
        content += `
            <button class="badge-remove" aria-label="Remove ${text}" tabindex="0">
                <i class="fas fa-times"></i>
            </button>
        `;
    }
    
    badge.innerHTML = content;
    
    return badge;
}

// Add badge to container
function addBadge(container, text, type = 'secondary', options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const badge = createBadge(text, type, options);
    container.appendChild(badge);
    
    // Trigger custom event
    const addEvent = new CustomEvent('badgeAdd', {
        detail: { badge, text, type, options }
    });
    container.dispatchEvent(addEvent);
    
    return badge;
}

// Get all badges in container
function getBadges(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return [];
    
    return Array.from(container.querySelectorAll('.badge')).map(badge => ({
        element: badge,
        text: badge.textContent.trim().replace('×', '').trim(),
        type: Array.from(badge.classList).find(cls => cls.startsWith('badge-') && 
              ['primary', 'secondary', 'success', 'info', 'warning', 'danger'].includes(cls.replace('badge-', '')))?.replace('badge-', ''),
        removable: badge.classList.contains('badge-removable')
    }));
}

// Remove all badges from container
function removeAllBadges(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return;
    
    const badges = container.querySelectorAll('.badge');
    badges.forEach(badge => {
        removeBadge(badge);
    });
    
    console.log(`Removed ${badges.length} badges from container`);
}

// Update badge text
function updateBadgeText(badge, newText) {
    if (typeof badge === 'string') {
        badge = document.querySelector(badge);
    }
    
    if (!badge) return;
    
    // Preserve remove button if exists
    const removeButton = badge.querySelector('.badge-remove');
    const icon = badge.querySelector('i:not(.badge-remove i)');
    
    let content = '';
    if (icon) {
        content += icon.outerHTML;
    }
    content += newText;
    if (removeButton) {
        content += removeButton.outerHTML;
    }
    
    badge.innerHTML = content;
}

// Add CSS for removal animation
const badgeStyles = document.createElement('style');
badgeStyles.textContent = `
    .badge-removing {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(badgeStyles);

// Export for main.js
window.Badge = {
    init: () => {
        initBadge();
    }
};

// Expose functions globally for API
window.createBadge = createBadge;
window.addBadge = addBadge;
window.removeBadge = removeBadge;
window.getBadges = getBadges;
window.removeAllBadges = removeAllBadges;
window.updateBadgeText = updateBadgeText;