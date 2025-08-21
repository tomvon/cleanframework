/**
 * FAQ Component JavaScript
 */

// Initialize FAQ functionality
function initFAQ() {
    const faqs = document.querySelectorAll('.faq');
    
    faqs.forEach(faq => {
        faq.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            
            const item = question.closest('.faq-item');
            const wasActive = item.classList.contains('active');
            
            // Close all other items in this FAQ
            const allItems = faq.querySelectorAll('.faq-item');
            allItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}

// Export for main.js
window.FAQ = {
    init: initFAQ
};