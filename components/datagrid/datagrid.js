/**
 * Data Grid Component JavaScript
 * Handles sorting, filtering, selection, and interactions
 */

// Initialize DataGrid functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDataGrid();
});

function initializeDataGrid() {
    // Handle select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.row-select');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateSelectedCount();
        });
    }
    
    // Handle individual row selection
    document.querySelectorAll('.row-select').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedCount);
    });
    
    // Handle row expansion
    document.querySelectorAll('.datagrid-table tbody tr').forEach(row => {
        if (!row.classList.contains('datagrid-row-expanded')) {
            row.addEventListener('dblclick', function() {
                const expandedRow = this.nextElementSibling;
                if (expandedRow && expandedRow.classList.contains('datagrid-row-expanded')) {
                    if (expandedRow.classList.contains('hidden')) {
                        expandedRow.classList.remove('hidden');
                    } else {
                        expandedRow.classList.add('hidden');
                    }
                }
            });
        }
    });
}

// Update selected count
function updateSelectedCount() {
    const selectedCount = document.querySelectorAll('.row-select:checked').length;
    const selectedCountElement = document.querySelector('.datagrid-selected-count');
    
    if (selectedCountElement) {
        if (selectedCount > 0) {
            selectedCountElement.classList.remove('hidden');
            selectedCountElement.querySelector('strong').textContent = selectedCount;
        } else {
            selectedCountElement.classList.add('hidden');
        }
    }
    
    // Update select all checkbox state
    const selectAllCheckbox = document.getElementById('selectAll');
    const totalCheckboxes = document.querySelectorAll('.row-select').length;
    
    if (selectAllCheckbox) {
        if (selectedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (selectedCount === totalCheckboxes) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }
}

// Sort table
let sortDirection = {};

function sortTable(column) {
    const table = document.querySelector('.datagrid-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.classList.contains('datagrid-row-expanded'));
    
    // Toggle sort direction
    sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    
    // Update sort icons
    document.querySelectorAll('.sortable .sort-icon').forEach(icon => {
        icon.classList.remove('sort-asc', 'sort-desc');
    });
    
    const currentHeader = Array.from(document.querySelectorAll('.sortable')).find(th => 
        th.textContent.trim().toLowerCase().includes(column.toLowerCase())
    );
    
    if (currentHeader) {
        const icon = currentHeader.querySelector('.sort-icon');
        icon.classList.add(sortDirection[column] === 'asc' ? 'sort-asc' : 'sort-desc');
    }
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue, bValue;
        
        switch(column) {
            case 'name':
                aValue = a.querySelector('.datagrid-user-name').textContent;
                bValue = b.querySelector('.datagrid-user-name').textContent;
                break;
            case 'role':
                aValue = a.cells[2].textContent;
                bValue = b.cells[2].textContent;
                break;
            case 'department':
                aValue = a.cells[3].textContent;
                bValue = b.cells[3].textContent;
                break;
            case 'last_active':
                aValue = a.cells[5].textContent;
                bValue = b.cells[5].textContent;
                break;
            default:
                return 0;
        }
        
        if (sortDirection[column] === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Reorder rows in DOM
    rows.forEach((row, index) => {
        tbody.appendChild(row);
        // Also move the expanded row if it exists
        const expandedRow = tbody.querySelector(`tr[data-id="${row.dataset.id}"] + .datagrid-row-expanded`);
        if (expandedRow) {
            tbody.appendChild(expandedRow);
        }
    });
}

// Toggle filter
function toggleFilter(button) {
    button.classList.toggle('active');
    // Here you would typically show/hide a filter dropdown
}

// Edit user
function editUser(userId) {
    console.log('Edit user:', userId);
    // Implement edit functionality
}

// View user
function viewUser(userId) {
    console.log('View user:', userId);
    // Implement view functionality
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Delete user:', userId);
        // Implement delete functionality
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.datagrid-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.datagrid-table tbody tr');
            
            rows.forEach(row => {
                if (!row.classList.contains('datagrid-row-expanded')) {
                    const text = row.textContent.toLowerCase();
                    const expandedRow = row.nextElementSibling;
                    
                    if (text.includes(searchTerm)) {
                        row.classList.remove('hidden');
                        // Keep expanded row state
                    } else {
                        row.classList.add('hidden');
                        if (expandedRow && expandedRow.classList.contains('datagrid-row-expanded')) {
                            expandedRow.classList.add('hidden');
                        }
                    }
                }
            });
        });
    }
});