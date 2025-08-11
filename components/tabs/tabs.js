/**
 * Tabs Component JavaScript
 */

// Initialize tabs functionality
function initTabs() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeTab = document.activeElement;
        
        if (activeTab.classList.contains('tab-button')) {
            const tabsNav = activeTab.parentElement;
            const tabs = Array.from(tabsNav.querySelectorAll('.tab-button'));
            const currentIndex = tabs.indexOf(activeTab);
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    tabs[prevIndex].focus();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    tabs[nextIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabs[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    tabs[tabs.length - 1].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    activeTab.click();
                    break;
            }
        }
    });
    
    console.log('Tabs initialized');
}

// Switch to a specific tab
function switchTab(containerId, tabId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Update tab buttons
    const tabButtons = container.querySelectorAll('.tab-button');
    const targetButton = container.querySelector(`#${containerId}-${tabId}-tab`);
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });
    
    if (targetButton) {
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-selected', 'true');
    }
    
    // Update tab panels
    const tabPanels = container.querySelectorAll('.tab-panel');
    const targetPanel = container.querySelector(`#${containerId}-${tabId}-panel`);
    
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Smooth scroll to top of tab content on mobile
    if (window.innerWidth <= 768) {
        container.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    // Trigger custom event for analytics or other integrations
    const changeEvent = new CustomEvent('tabChange', {
        detail: { containerId, tabId, targetButton, targetPanel }
    });
    container.dispatchEvent(changeEvent);
    
    console.log(`Switched to tab: ${tabId} in container: ${containerId}`);
}

// Get currently active tab in a container
function getActiveTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const activeButton = container.querySelector('.tab-button.active');
    if (!activeButton) return null;
    
    const buttonId = activeButton.id;
    const tabId = buttonId.replace(`${containerId}-`, '').replace('-tab', '');
    
    return {
        containerId,
        tabId,
        button: activeButton,
        panel: container.querySelector(`#${containerId}-${tabId}-panel`)
    };
}

// Switch to next tab in sequence
function nextTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    const activeTab = container.querySelector('.tab-button.active');
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    
    tabs[nextIndex].click();
}

// Switch to previous tab in sequence
function previousTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    const activeTab = container.querySelector('.tab-button.active');
    const currentIndex = tabs.indexOf(activeTab);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    
    tabs[prevIndex].click();
}

// Programmatically activate a tab by index
function activateTabByIndex(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    if (index >= 0 && index < tabs.length) {
        tabs[index].click();
    }
}

// Get all tab containers on the page
function getAllTabContainers() {
    return Array.from(document.querySelectorAll('.tabs-container')).map(container => ({
        id: container.id,
        style: container.classList.contains('pills') ? 'pills' : 
               container.classList.contains('underline') ? 'underline' : 'default',
        activeTab: getActiveTab(container.id)
    }));
}

// Export for main.js
window.Tabs = {
    init: () => {
        initTabs();
    }
};

// Expose functions globally for onclick handlers and API
window.switchTab = switchTab;
window.getActiveTab = getActiveTab;
window.nextTab = nextTab;
window.previousTab = previousTab;
window.activateTabByIndex = activateTabByIndex;
window.getAllTabContainers = getAllTabContainers;