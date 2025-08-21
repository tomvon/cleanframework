/**
 * Activity Feed Component JavaScript
 * Handles filtering, refresh, and load more functionality
 */

// Filter activities by type
function filterActivities(type) {
    const activities = document.querySelectorAll('.activity-item');
    const dropdownItems = document.querySelectorAll('.activity-feed .dropdown-item');
    const dropdownToggle = document.querySelector('.activity-feed .dropdown-toggle');
    
    // Update active state
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        if (item.textContent.toLowerCase().includes(type) || 
            (type === 'all' && item.textContent.includes('All Activities'))) {
            item.classList.add('active');
        }
    });
    
    // Update dropdown toggle text
    const activeItem = document.querySelector('.activity-feed .dropdown-item.active');
    if (activeItem && dropdownToggle) {
        dropdownToggle.innerHTML = `
            <i class="fas fa-filter"></i>
            ${activeItem.textContent.trim()}
            <i class="fas fa-chevron-down"></i>
        `;
    }
    
    // Filter activities
    activities.forEach(activity => {
        if (type === 'all') {
            activity.classList.remove('activity-filtered');
        } else {
            const activityType = activity.dataset.type;
            let shouldShow = false;
            
            switch(type) {
                case 'users':
                    shouldShow = activityType.includes('user') || activityType.includes('comment');
                    break;
                case 'orders':
                    shouldShow = activityType.includes('order');
                    break;
                case 'system':
                    shouldShow = activityType.includes('system') || activityType.includes('update');
                    break;
                case 'security':
                    shouldShow = activityType.includes('security');
                    break;
            }
            
            if (shouldShow) {
                activity.classList.remove('activity-filtered');
            } else {
                activity.classList.add('activity-filtered');
            }
        }
    });
    
    // Close dropdown
    const dropdown = document.querySelector('.activity-feed .dropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Refresh activity feed
function refreshActivityFeed() {
    const refreshButton = event.target.closest('button');
    const icon = refreshButton.querySelector('i');
    
    // Add spinning animation
    icon.classList.add('fa-spin');
    refreshButton.disabled = true;
    
    // Simulate refresh
    setTimeout(() => {
        icon.classList.remove('fa-spin');
        refreshButton.disabled = false;
        
        // Show notification
        showActivityNotification('Activity feed refreshed');
    }, 1000);
}

// Load more activities
function loadMoreActivities() {
    const loadMoreButton = event.target.closest('button');
    const timeline = document.querySelector('.activity-timeline');
    
    // Show loading state
    loadMoreButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreButton.disabled = true;
    
    // Simulate loading more activities
    setTimeout(() => {
        // Here you would typically fetch more activities from the server
        const newActivities = `
            <div class="activity-date">
                <span class="activity-date-label">Last Week</span>
            </div>
            
            <div class="activity-item" data-type="user_updated">
                <div class="activity-marker">
                    <div class="activity-icon activity-icon-info">
                        <i class="fas fa-user-edit"></i>
                    </div>
                </div>
                
                <div class="activity-content">
                    <div class="activity-main">
                        <h4 class="activity-item-title">Profile updated</h4>
                        <p class="activity-description">User profile information was updated</p>
                    </div>
                    
                    <div class="activity-meta">
                        <div class="activity-user">
                            <div class="activity-avatar">JD</div>
                            <span class="activity-username">John Doe</span>
                        </div>
                        <span class="activity-time">
                            <i class="fas fa-clock"></i>
                            5 days ago
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before load more button
        const loadMoreSection = document.querySelector('.activity-load-more');
        loadMoreSection.insertAdjacentHTML('beforebegin', newActivities);
        
        // Reset button
        loadMoreButton.innerHTML = '<i class="fas fa-plus"></i> Load More Activities';
        loadMoreButton.disabled = false;
        
        // Show notification
        showActivityNotification('Loaded more activities');
    }, 1000);
}

// Show activity notification
function showActivityNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'activity-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Initialize activity feed
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time updates simulation
    const activityBadge = document.createElement('span');
    activityBadge.className = 'activity-badge';
    activityBadge.classList.add('activity-badge-hidden');
    
    const activityTitle = document.querySelector('.activity-title');
    if (activityTitle) {
        activityTitle.appendChild(activityBadge);
        
        // Simulate new activities
        setInterval(() => {
            const random = Math.random();
            if (random > 0.7) {
                const count = parseInt(activityBadge.textContent || '0') + 1;
                activityBadge.textContent = count;
                activityBadge.classList.remove('activity-badge-hidden');
            }
        }, 10000);
    }
});

// Add notification styles
const activityStyle = document.createElement('style');
activityStyle.textContent = `
    .activity-notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--success);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0;
        transform: translateY(1rem);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .activity-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .activity-badge {
        display: inline-block;
        margin-left: 0.5rem;
        padding: 0.125rem 0.375rem;
        background: var(--danger);
        color: white;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        min-width: 1.25rem;
        text-align: center;
    }
`;
document.head.appendChild(activityStyle);