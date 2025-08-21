/**
 * Dashboard Component JavaScript
 */

function animateDashboardCounters() {
    const counters = document.querySelectorAll('.dashboard-card-value');
    
    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^\d.-]/g, '');
        if (!target || isNaN(target)) return;
        
        const targetNum = parseFloat(target);
        const duration = 2000;
        const increment = targetNum / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            
            // Format the number and preserve original formatting
            const originalText = counter.textContent;
            const formattedNumber = Math.floor(current).toLocaleString();
            const newText = originalText.replace(/[\d,.-]+/, formattedNumber);
            counter.textContent = newText;
        }, 16);
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.dashboard-card-progress-fill');
    
    progressBars.forEach((bar, index) => {
        const percentage = bar.dataset.percentage || 0;
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

function animateChartBars() {
    const chartContainers = document.querySelectorAll('.dashboard-card-chart-container');
    
    chartContainers.forEach(container => {
        const bars = container.querySelectorAll('.dashboard-card-chart-bar');
        
        bars.forEach((bar, index) => {
            const targetHeight = bar.dataset.height || '0';
            bar.style.height = '0px';
            
            setTimeout(() => {
                bar.style.height = targetHeight + 'px';
            }, index * 100);
        });
    });
}

function refreshDashboardCard(cardElement, newData) {
    const valueElement = cardElement.querySelector('.dashboard-card-value');
    const changeElement = cardElement.querySelector('.dashboard-card-change');
    
    if (valueElement && newData.value) {
        valueElement.textContent = newData.value;
    }
    
    if (changeElement && newData.change) {
        const icon = changeElement.querySelector('.dashboard-card-change-icon');
        changeElement.textContent = newData.change.value;
        
        // Update change type
        changeElement.className = changeElement.className.replace(/dashboard-card-change-(positive|negative|neutral)/, '');
        changeElement.classList.add('dashboard-card-change-' + newData.change.type);
        
        // Update icon
        if (icon) {
            icon.className = icon.className.replace(/fa-arrow-(up|down)/, '');
            icon.classList.add('fa-arrow-' + (newData.change.type === 'positive' ? 'up' : 'down'));
            changeElement.insertBefore(icon, changeElement.firstChild);
        }
    }
}

function updateDashboard(data) {
    if (!data || !data.cards) return;
    
    const cards = document.querySelectorAll('.dashboard-card');
    
    data.cards.forEach((cardData, index) => {
        if (cards[index]) {
            refreshDashboardCard(cards[index], cardData);
        }
    });
    
    // Re-animate counters after update
    setTimeout(() => {
        animateDashboardCounters();
    }, 100);
}

function addDashboardInteractivity() {
    // Add hover effects to chart bars
    const chartBars = document.querySelectorAll('.dashboard-card-chart-bar');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', (e) => {
            // Show tooltip if title exists
            if (e.target.title) {
                e.target.style.opacity = '0.8';
            }
        });
        
        bar.addEventListener('mouseleave', (e) => {
            e.target.style.opacity = '1';
        });
    });
    
    // Add click handlers for card actions
    const sectionActions = document.querySelectorAll('.dashboard-section-action');
    
    sectionActions.forEach(action => {
        action.addEventListener('click', (e) => {
            if (action.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Dashboard action clicked:', action.textContent.trim());
            }
        });
    });
}

function initDashboard() {
    // Wait for elements to be in DOM
    setTimeout(() => {
        animateDashboardCounters();
        animateProgressBars();
        animateChartBars();
        addDashboardInteractivity();
    }, 100);
    
    // Set up auto-refresh if needed
    const autoRefresh = document.querySelector('[data-dashboard-refresh]');
    if (autoRefresh) {
        const interval = parseInt(autoRefresh.dataset.dashboardRefresh) || 30000;
        
        setInterval(() => {
            // This would typically fetch new data from an API
            console.log('Dashboard auto-refresh triggered');
            // fetchDashboardData().then(updateDashboard);
        }, interval);
    }
}

// Export for main.js
window.Dashboard = {
    init: initDashboard,
    update: updateDashboard,
    refresh: () => {
        animateDashboardCounters();
        animateProgressBars();
        animateChartBars();
    }
};

// Expose functions globally
window.updateDashboard = updateDashboard;