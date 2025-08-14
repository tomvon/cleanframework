<?php
/**
 * Search & Filters Component
 * Advanced search with autocomplete, filters, and saved searches
 */

// Sample filter options
$filter_categories = ['All Categories', 'Products', 'Users', 'Orders', 'Invoices', 'Reports'];
$filter_dates = ['Any time', 'Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This month', 'Last month', 'Custom range'];
$filter_status = ['All Status', 'Active', 'Inactive', 'Pending', 'Completed', 'Cancelled'];

// Sample saved searches
$saved_searches = [
    ['id' => 1, 'name' => 'Active Users', 'query' => 'status:active type:user', 'icon' => 'users'],
    ['id' => 2, 'name' => 'Pending Orders', 'query' => 'status:pending type:order', 'icon' => 'shopping-cart'],
    ['id' => 3, 'name' => 'High Priority', 'query' => 'priority:high', 'icon' => 'exclamation-triangle'],
    ['id' => 4, 'name' => 'Recent Activity', 'query' => 'date:last7days', 'icon' => 'clock']
];

// Sample recent searches
$recent_searches = [
    'john.doe@example.com',
    'order #12345',
    'status:pending',
    'MacBook Pro',
    'invoice date:thismonth'
];
?>

<div class="search-component">
    <!-- Advanced Search Bar -->
    <div class="search-bar-advanced">
        <div class="search-input-group">
            <i class="fas fa-search search-icon"></i>
            
            <input type="text" 
                   class="search-input" 
                   placeholder="Search anything... Try 'status:active' or 'type:user'"
                   id="advancedSearchInput"
                   autocomplete="off">
            
            <!-- Search Suggestions Dropdown -->
            <div class="search-suggestions hidden" id="searchSuggestions">
                <!-- Recent Searches -->
                <div class="search-suggestions-section">
                    <div class="search-suggestions-header">
                        <i class="fas fa-history"></i>
                        Recent Searches
                    </div>
                    <?php foreach ($recent_searches as $search): ?>
                    <button class="search-suggestion-item" onclick="performSearch('<?= htmlspecialchars($search) ?>')">
                        <span class="search-suggestion-text"><?= htmlspecialchars($search) ?></span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <?php endforeach; ?>
                </div>
                
                <!-- Saved Searches -->
                <div class="search-suggestions-section">
                    <div class="search-suggestions-header">
                        <i class="fas fa-star"></i>
                        Saved Searches
                    </div>
                    <?php foreach ($saved_searches as $saved): ?>
                    <button class="search-suggestion-item" onclick="performSearch('<?= htmlspecialchars($saved['query']) ?>')">
                        <i class="fas fa-<?= $saved['icon'] ?> search-suggestion-icon"></i>
                        <span class="search-suggestion-text"><?= htmlspecialchars($saved['name']) ?></span>
                        <span class="search-suggestion-query"><?= htmlspecialchars($saved['query']) ?></span>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <!-- Clear button -->
            <button class="search-clear hidden" onclick="clearSearch()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <!-- Filter Toggle -->
        <button class="search-filter-toggle" onclick="toggleFilters()">
            <i class="fas fa-filter"></i>
            Filters
            <span class="filter-count hidden">0</span>
        </button>
        
        <!-- Search Button -->
        <button class="button primary search-button" onclick="executeSearch()">
            <i class="fas fa-search"></i>
            Search
        </button>
    </div>
    
    <!-- Filter Panel -->
    <div class="search-filters-panel hidden" id="filterPanel">
        <div class="search-filters-content form">
            <!-- Category Filter -->
            <div class="search-filter-group">
                <label class="search-filter-label">Category</label>
                <select onchange="updateFilterCount()">
                    <?php foreach ($filter_categories as $category): ?>
                    <option value="<?= strtolower($category) ?>"><?= $category ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <!-- Date Filter -->
            <div class="search-filter-group">
                <label class="search-filter-label">Date Range</label>
                <select onchange="updateFilterCount()">
                    <?php foreach ($filter_dates as $date): ?>
                    <option value="<?= strtolower(str_replace(' ', '', $date)) ?>"><?= $date ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <!-- Status Filter -->
            <div class="search-filter-group">
                <label class="search-filter-label">Status</label>
                <select onchange="updateFilterCount()">
                    <?php foreach ($filter_status as $status): ?>
                    <option value="<?= strtolower($status) ?>"><?= $status ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            
            <!-- Advanced Options -->
            <div class="search-filter-group">
                <label class="search-filter-label">Options</label>
                <div class="search-filter-checkboxes">
                    <label class="search-checkbox">
                        <input type="checkbox" onchange="updateFilterCount()">
                        <span>Include archived</span>
                    </label>
                    <label class="search-checkbox">
                        <input type="checkbox" onchange="updateFilterCount()">
                        <span>Exact match</span>
                    </label>
                    <label class="search-checkbox">
                        <input type="checkbox" checked onchange="updateFilterCount()">
                        <span>Search in content</span>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="search-filters-actions">
            <button class="button secondary small" onclick="resetFilters()">
                <i class="fas fa-undo"></i>
                Reset
            </button>
            <button class="button primary small" onclick="applyFilters()">
                <i class="fas fa-check"></i>
                Apply Filters
            </button>
        </div>
    </div>
    
    <!-- Search Tags (Active Filters) -->
    <div class="search-tags hidden" id="searchTags">
        <span class="search-tags-label">Active filters:</span>
        <div class="search-tags-list" id="searchTagsList">
            <!-- Tags will be dynamically added here -->
        </div>
        <button class="search-tags-clear" onclick="clearAllFilters()">
            Clear all
        </button>
    </div>
</div>

<!-- Alternative: Compact Search -->
<div class="search-component-compact">
    <h3>Compact Search Bar</h3>
    <div class="search-bar-compact">
        <div class="search-compact-input-group">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Quick search..." class="search-compact-input">
            <kbd>⌘K</kbd>
        </div>
    </div>
</div>

<!-- Alternative: Search with Categories -->
<div class="search-component-categories">
    <h3>Search with Category Selector</h3>
    <div class="search-bar-categories">
        <select class="search-category-select" onchange="updateCategoryPlaceholder(this)">
            <option value="all">All</option>
            <option value="products">Products</option>
            <option value="users">Users</option>
            <option value="orders">Orders</option>
        </select>
        <div class="search-category-divider"></div>
        <input type="text" placeholder="Search everywhere..." class="search-category-input" id="categorySearchInput">
        <button class="search-category-button">
            <i class="fas fa-search"></i>
        </button>
    </div>
</div>