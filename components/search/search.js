/**
 * Search & Filters Component JavaScript
 * Handles autocomplete, filtering, and search interactions
 */

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

function initializeSearch() {
    const searchInput = document.getElementById('advancedSearchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const filterPanel = document.getElementById('filterPanel');
    const searchTags = document.getElementById('searchTags');
    
    if (searchInput) {
        // Show suggestions on focus
        searchInput.addEventListener('focus', function() {
            if (this.value.length === 0) {
                searchSuggestions.classList.remove('hidden');
            }
        });
        
        // Hide suggestions on blur (with delay for click handling)
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                searchSuggestions.classList.add('hidden');
            }, 200);
        });
        
        // Handle input changes
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();
            const clearButton = this.parentElement.querySelector('.search-clear');
            
            if (value.length > 0) {
                clearButton.classList.remove('hidden');
                // Here you would typically filter suggestions based on input
                searchSuggestions.classList.remove('hidden');
            } else {
                clearButton.classList.add('hidden');
                searchSuggestions.classList.remove('hidden');
            }
        });
        
        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }
    
    // Keyboard shortcut for compact search (Cmd/Ctrl + K)
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const compactInput = document.querySelector('.search-compact-input');
            if (compactInput) {
                compactInput.focus();
            }
        }
    });
}

// Toggle filters panel
function toggleFilters() {
    const filterPanel = document.getElementById('filterPanel');
    const filterToggle = document.querySelector('.search-filter-toggle');
    
    if (filterPanel.classList.contains('hidden')) {
        filterPanel.classList.remove('hidden');
        filterToggle.classList.add('active');
    } else {
        filterPanel.classList.add('hidden');
        filterToggle.classList.remove('active');
    }
}

// Clear search input
function clearSearch() {
    const searchInput = document.getElementById('advancedSearchInput');
    const clearButton = document.querySelector('.search-clear');
    
    searchInput.value = '';
    clearButton.classList.add('hidden');
    searchInput.focus();
}

// Perform search with specific query
function performSearch(query) {
    const searchInput = document.getElementById('advancedSearchInput');
    searchInput.value = query;
    executeSearch();
}

// Execute search
function executeSearch() {
    const searchInput = document.getElementById('advancedSearchInput');
    const query = searchInput.value.trim();
    
    if (query.length > 0) {
        console.log('Searching for:', query);
        // Here you would implement actual search logic
        
        // Hide suggestions
        document.getElementById('searchSuggestions').classList.add('hidden');
        
        // Show search is in progress
        const searchButton = document.querySelector('.search-button');
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        
        // Simulate search completion
        setTimeout(() => {
            searchButton.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1000);
    }
}

// Update filter count
function updateFilterCount() {
    const filterSelects = document.querySelectorAll('.search-filter-group select');
    const filterCheckboxes = document.querySelectorAll('.search-filter-checkboxes input:checked');
    const filterCount = document.querySelector('.filter-count');
    
    let activeFilters = 0;
    
    // Count non-default select values
    filterSelects.forEach(select => {
        if (select.selectedIndex > 0) {
            activeFilters++;
        }
    });
    
    // Count checked checkboxes (excluding default checked ones)
    filterCheckboxes.forEach(checkbox => {
        if (!checkbox.defaultChecked || checkbox.checked !== checkbox.defaultChecked) {
            activeFilters++;
        }
    });
    
    // Update count display
    if (activeFilters > 0) {
        filterCount.textContent = activeFilters;
        filterCount.classList.remove('hidden');
    } else {
        filterCount.classList.add('hidden');
    }
}

// Apply filters
function applyFilters() {
    const searchTags = document.getElementById('searchTags');
    const searchTagsList = document.getElementById('searchTagsList');
    
    // Clear existing tags
    searchTagsList.innerHTML = '';
    
    // Get active filters
    const filterSelects = document.querySelectorAll('.search-filter-group select');
    const filterCheckboxes = document.querySelectorAll('.search-filter-checkboxes input:checked');
    
    let hasActiveTags = false;
    
    // Add tags for select filters
    filterSelects.forEach(select => {
        if (select.selectedIndex > 0) {
            const tag = createFilterTag(select.options[select.selectedIndex].text, 'select');
            searchTagsList.appendChild(tag);
            hasActiveTags = true;
        }
    });
    
    // Add tags for checkbox filters
    filterCheckboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        const tag = createFilterTag(label, 'checkbox');
        searchTagsList.appendChild(tag);
        hasActiveTags = true;
    });
    
    // Show/hide tags container
    if (hasActiveTags) {
        searchTags.classList.remove('hidden');
    } else {
        searchTags.classList.add('hidden');
    }
    
    // Close filter panel
    toggleFilters();
    
    // Execute search with filters
    executeSearch();
}

// Create filter tag element
function createFilterTag(text, type) {
    const tag = document.createElement('div');
    tag.className = 'search-tag';
    tag.innerHTML = `
        <span>${text}</span>
        <button class="search-tag-remove" onclick="removeFilterTag(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    return tag;
}

// Remove filter tag
function removeFilterTag(button) {
    const tag = button.parentElement;
    tag.remove();
    
    // Check if any tags remain
    const remainingTags = document.querySelectorAll('.search-tag');
    if (remainingTags.length === 0) {
        document.getElementById('searchTags').classList.add('hidden');
    }
    
    updateFilterCount();
}

// Reset all filters
function resetFilters() {
    // Reset selects
    document.querySelectorAll('.search-filter-group select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Reset checkboxes to default state
    document.querySelectorAll('.search-filter-checkboxes input').forEach(checkbox => {
        checkbox.checked = checkbox.defaultChecked;
    });
    
    updateFilterCount();
}

// Clear all filters and tags
function clearAllFilters() {
    resetFilters();
    document.getElementById('searchTags').style.display = 'none';
    document.getElementById('searchTagsList').innerHTML = '';
}

// Update category search placeholder
function updateCategoryPlaceholder(selectElement) {
    const searchInput = document.getElementById('categorySearchInput');
    const selectedValue = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    
    if (searchInput) {
        if (selectedValue === 'all') {
            searchInput.placeholder = 'Search everywhere...';
        } else {
            searchInput.placeholder = `Search in ${selectedText.toLowerCase()}...`;
        }
    }
}