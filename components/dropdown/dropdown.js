/**
 * Dropdown Component JavaScript
 */

// Track active dropdowns
let activeDropdowns = new Set();

// Initialize dropdown functionality
function initDropdowns() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    // Handle arrow navigation in dropdowns
    document.addEventListener('keydown', (e) => {
        const activeDropdown = document.querySelector('.dropdown-menu.show');
        if (!activeDropdown) return;
        
        const items = activeDropdown.querySelectorAll('.dropdown-item:not(.dropdown-divider)');
        const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[prevIndex].focus();
                break;
            case 'Enter':
                e.preventDefault();
                if (document.activeElement.classList.contains('dropdown-item')) {
                    document.activeElement.click();
                }
                break;
        }
    });
}

// Toggle dropdown visibility
function toggleDropdown(dropdownId) {
    const trigger = document.getElementById(dropdownId + '-trigger');
    const menu = document.getElementById(dropdownId + '-menu');
    
    if (!trigger || !menu) return;
    
    const isOpen = menu.classList.contains('show');
    
    // Close all other dropdowns first
    closeAllDropdowns();
    
    if (!isOpen) {
        // Open this dropdown
        menu.classList.add('show');
        trigger.setAttribute('aria-expanded', 'true');
        activeDropdowns.add(dropdownId);
        
        // Focus first item for accessibility
        const firstItem = menu.querySelector('.dropdown-item');
        if (firstItem) {
            setTimeout(() => firstItem.focus(), 100);
        }
    }
}

// Close specific dropdown
function closeDropdown(dropdownId) {
    const trigger = document.getElementById(dropdownId + '-trigger');
    const menu = document.getElementById(dropdownId + '-menu');
    
    if (!trigger || !menu) return;
    
    menu.classList.remove('show');
    trigger.setAttribute('aria-expanded', 'false');
    activeDropdowns.delete(dropdownId);
}

// Close all dropdowns
function closeAllDropdowns() {
    activeDropdowns.forEach(dropdownId => {
        closeDropdown(dropdownId);
    });
    activeDropdowns.clear();
}

// Handle select dropdown item selection
function selectDropdownItem(dropdownId, value, label) {
    const trigger = document.getElementById(dropdownId + '-trigger');
    const menu = document.getElementById(dropdownId + '-menu');
    
    if (!trigger || !menu) return;
    
    // Update trigger text
    const triggerText = trigger.querySelector('span');
    if (triggerText) {
        triggerText.textContent = label;
    }
    
    // Update selected state
    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        const checkIcon = item.querySelector('.dropdown-check');
        if (checkIcon) {
            checkIcon.remove();
        }
    });
    
    const selectedItem = menu.querySelector(`[data-value="${value}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        const checkIcon = document.createElement('i');
        checkIcon.className = 'dropdown-check fas fa-check';
        selectedItem.appendChild(checkIcon);
    }
    
    // Close dropdown
    closeDropdown(dropdownId);
    
    // Trigger custom event for form integration
    const changeEvent = new CustomEvent('dropdownChange', {
        detail: { dropdownId, value, label }
    });
    trigger.dispatchEvent(changeEvent);
    
    console.log(`Selected: ${label} (${value}) in dropdown: ${dropdownId}`);
}

// Handle dropdown item clicks for menu/action types
function handleDropdownItemClick(dropdownId, item) {
    // Close dropdown after action
    closeDropdown(dropdownId);
    
    console.log(`Clicked item in dropdown: ${dropdownId}`, item);
}

// Get selected value from select dropdown
function getDropdownValue(dropdownId) {
    const menu = document.getElementById(dropdownId + '-menu');
    if (!menu) return null;
    
    const selectedItem = menu.querySelector('.dropdown-item.selected');
    return selectedItem ? selectedItem.dataset.value : null;
}

// Set dropdown value programmatically
function setDropdownValue(dropdownId, value) {
    const menu = document.getElementById(dropdownId + '-menu');
    if (!menu) return;
    
    const item = menu.querySelector(`[data-value="${value}"]`);
    if (item) {
        const label = item.textContent.trim();
        selectDropdownItem(dropdownId, value, label);
    }
}

// Export for main.js
window.Dropdown = {
    init: () => {
        initDropdowns();
    }
};

// Expose functions globally for onclick handlers
window.toggleDropdown = toggleDropdown;
window.closeDropdown = closeDropdown;
window.closeAllDropdowns = closeAllDropdowns;
window.selectDropdownItem = selectDropdownItem;
window.handleDropdownItemClick = handleDropdownItemClick;
window.getDropdownValue = getDropdownValue;
window.setDropdownValue = setDropdownValue;