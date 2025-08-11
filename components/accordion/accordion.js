/**
 * Accordion Component JavaScript
 */

// Initialize accordion functionality
function initAccordion() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeHeader = document.activeElement;
        
        if (activeHeader.classList.contains('accordion-header')) {
            const accordion = activeHeader.closest('.accordion');
            const headers = Array.from(accordion.querySelectorAll('.accordion-header'));
            const currentIndex = headers.indexOf(activeHeader);
            
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : headers.length - 1;
                    headers[prevIndex].focus();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = currentIndex < headers.length - 1 ? currentIndex + 1 : 0;
                    headers[nextIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    headers[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    headers[headers.length - 1].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    activeHeader.click();
                    break;
            }
        }
    });
    
    console.log('Accordion initialized');
}

// Toggle accordion item
function toggleAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    const isOpen = item.classList.contains('accordion-item-open');
    
    if (isOpen) {
        // Close the item
        collapseAccordionItem(item, header, content);
    } else {
        // Open the item
        expandAccordionItem(item, header, content);
    }
    
    // Trigger custom event
    const toggleEvent = new CustomEvent('accordionToggle', {
        detail: { accordionId, itemId, isOpen: !isOpen, item, header, content }
    });
    accordion.dispatchEvent(toggleEvent);
    
    console.log(`Accordion item ${isOpen ? 'closed' : 'opened'}: ${itemId}`);
}

// Expand accordion item with animation
function expandAccordionItem(item, header, content) {
    // Remove closed class and set up for animation
    content.classList.remove('accordion-content-closed');
    content.classList.add('accordion-animating', 'accordion-expanding');
    
    // Get the natural height
    const height = content.scrollHeight;
    
    // Start with 0 height
    content.style.height = '0px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to full height
    content.style.height = height + 'px';
    
    // Update states
    item.classList.add('accordion-item-open');
    header.setAttribute('aria-expanded', 'true');
    
    // Clean up after animation
    setTimeout(() => {
        content.style.height = '';
        content.classList.remove('accordion-animating', 'accordion-expanding');
    }, 300);
}

// Collapse accordion item with animation
function collapseAccordionItem(item, header, content) {
    // Set up for animation
    content.classList.add('accordion-animating', 'accordion-collapsing');
    content.style.height = content.scrollHeight + 'px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to 0 height
    content.style.height = '0px';
    
    // Update states
    item.classList.remove('accordion-item-open');
    header.setAttribute('aria-expanded', 'false');
    
    // Clean up after animation
    setTimeout(() => {
        content.classList.add('accordion-content-closed');
        content.style.height = '';
        content.classList.remove('accordion-animating', 'accordion-collapsing');
    }, 300);
}

// Open accordion item programmatically
function openAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    if (!item.classList.contains('accordion-item-open')) {
        expandAccordionItem(item, header, content);
    }
}

// Close accordion item programmatically
function closeAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    if (item.classList.contains('accordion-item-open')) {
        collapseAccordionItem(item, header, content);
    }
}

// Close all items in an accordion
function closeAllAccordionItems(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const openItems = accordion.querySelectorAll('.accordion-item-open');
    openItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (header && content) {
            collapseAccordionItem(item, header, content);
        }
    });
    
    console.log(`Closed all items in accordion: ${accordionId}`);
}

// Open all items in an accordion
function openAllAccordionItems(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const closedItems = accordion.querySelectorAll('.accordion-item:not(.accordion-item-open)');
    closedItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (header && content) {
            expandAccordionItem(item, header, content);
        }
    });
    
    console.log(`Opened all items in accordion: ${accordionId}`);
}

// Get accordion state
function getAccordionState(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return null;
    
    const items = Array.from(accordion.querySelectorAll('.accordion-item'));
    return items.map(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const itemId = content.id.replace(`${accordionId}-content-`, '');
        
        return {
            id: itemId,
            title: header.querySelector('.accordion-title').textContent,
            isOpen: item.classList.contains('accordion-item-open'),
            element: item
        };
    });
}

// Export for main.js
window.Accordion = {
    init: () => {
        initAccordion();
    }
};

// Expose functions globally for onclick handlers and API
window.toggleAccordionItem = toggleAccordionItem;
window.openAccordionItem = openAccordionItem;
window.closeAccordionItem = closeAccordionItem;
window.closeAllAccordionItems = closeAllAccordionItems;
window.openAllAccordionItems = openAllAccordionItems;
window.getAccordionState = getAccordionState;