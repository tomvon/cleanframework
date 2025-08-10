/**
 * Table Component JavaScript
 */

// Table sorting state
let tableSortState = {};

// Initialize table functionality
function initTables() {
    // Initialize sort states for all tables
    document.querySelectorAll('.table-container').forEach(container => {
        const tableId = container.id;
        tableSortState[tableId] = {
            column: null,
            direction: 'asc'
        };
        
        // Initialize pagination
        updatePagination(tableId);
    });
    
    console.log('Tables initialized');
}

// Search table rows
function searchTable(tableId, searchTerm) {
    const container = document.getElementById(tableId);
    const rows = container.querySelectorAll('tbody .table-row');
    const term = searchTerm.toLowerCase().trim();
    
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = term === '' || text.includes(term);
        
        if (matches) {
            row.classList.remove('search-hidden');
            visibleCount++;
        } else {
            row.classList.add('search-hidden');
        }
    });
    
    // Reset to page 1 when searching
    container.dataset.currentPage = '1';
    
    // Update total rows for search results
    const originalTotal = container.dataset.totalRows;
    if (term === '') {
        // Reset to original data
        rows.forEach(row => row.classList.remove('search-hidden'));
        container.dataset.totalRows = originalTotal;
    } else {
        container.dataset.totalRows = visibleCount;
    }
    
    // Update pagination display
    updatePagination(tableId);
}

// Sort table by column
function sortTable(tableId, columnKey) {
    const container = document.getElementById(tableId);
    const table = container.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const header = container.querySelector(`th[onclick*="${columnKey}"]`);
    
    // Get current sort state
    const currentState = tableSortState[tableId];
    let direction = 'asc';
    
    if (currentState.column === columnKey) {
        direction = currentState.direction === 'asc' ? 'desc' : 'asc';
    }
    
    // Update sort state
    tableSortState[tableId] = { column: columnKey, direction };
    
    // Clear previous sort indicators
    container.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    // Add sort indicator to current column
    header.classList.add(`sorted-${direction}`);
    
    // Get column index
    const headers = Array.from(table.querySelectorAll('th'));
    const columnIndex = headers.indexOf(header);
    
    // Sort rows
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex];
        const cellB = b.cells[columnIndex];
        
        let valueA = getCellSortValue(cellA);
        let valueB = getCellSortValue(cellB);
        
        // Handle different data types
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

// Get cell value for sorting
function getCellSortValue(cell) {
    // Check for data attributes first
    if (cell.dataset.sortValue) {
        return cell.dataset.sortValue;
    }
    
    // Handle different cell types
    const emailLink = cell.querySelector('.table-email');
    if (emailLink) return emailLink.textContent;
    
    const badge = cell.querySelector('.table-badge');
    if (badge) return badge.textContent;
    
    const status = cell.querySelector('.table-status');
    if (status) return status.textContent;
    
    // Check for currency
    const text = cell.textContent.trim();
    if (text.startsWith('$')) {
        return parseFloat(text.replace(/[$,]/g, '')) || 0;
    }
    
    // Check for numbers
    const num = parseFloat(text.replace(/,/g, ''));
    if (!isNaN(num)) return num;
    
    // Check for dates
    const date = Date.parse(text);
    if (!isNaN(date)) return date;
    
    return text;
}

// Row action handlers
function editRow(id) {
    console.log('Edit row:', id);
    // Implement edit functionality
}

function deleteRow(id) {
    if (confirm('Are you sure you want to delete this row?')) {
        console.log('Delete row:', id);
        // Implement delete functionality
    }
}

function duplicateRow(id) {
    console.log('Duplicate row:', id);
    // Implement duplicate functionality
}

// Pagination functions
function updatePagination(tableId) {
    const container = document.getElementById(tableId);
    const perPage = parseInt(container.dataset.perPage) || 10;
    const currentPage = parseInt(container.dataset.currentPage) || 1;
    const allRows = container.querySelectorAll('tbody .table-row');
    
    // Get only visible rows (not search-hidden)
    const visibleRows = Array.from(allRows).filter(row => !row.classList.contains('search-hidden'));
    const totalRows = visibleRows.length;
    const totalPages = Math.ceil(totalRows / perPage);
    
    // Show/hide rows based on current page
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    // Hide all visible rows first
    visibleRows.forEach(row => {
        row.style.display = 'none';
    });
    
    // Show current page rows
    visibleRows.slice(startIndex, endIndex).forEach(row => {
        row.style.display = '';
    });
    
    // Update pagination info
    const infoText = container.querySelector('.pagination-info-text');
    if (infoText) {
        const visibleCount = Math.min(perPage, totalRows - startIndex);
        const start = totalRows > 0 ? startIndex + 1 : 0;
        const end = startIndex + visibleCount;
        infoText.textContent = `Showing ${start}-${end} of ${totalRows} results`;
    }
    
    // Update pagination buttons
    updatePaginationButtons(tableId, currentPage, totalPages);
}

function updatePaginationButtons(tableId, currentPage, totalPages) {
    const container = document.getElementById(tableId);
    
    // Update prev/next buttons
    const prevBtn = container.querySelector('.pagination-prev');
    const nextBtn = container.querySelector('.pagination-next');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
    }
    
    // Update page number buttons
    const pageButtons = container.querySelectorAll('.pagination-page');
    pageButtons.forEach(btn => {
        const page = parseInt(btn.dataset.page);
        btn.className = `button ${page === currentPage ? 'primary' : 'secondary'} pagination-page`;
    });
}

function goToPage(tableId, page) {
    const container = document.getElementById(tableId);
    const perPage = parseInt(container.dataset.perPage) || 10;
    const totalRows = parseInt(container.dataset.totalRows) || 0;
    const totalPages = Math.ceil(totalRows / perPage);
    
    // Validate page number
    if (page < 1 || page > totalPages) return;
    
    // Update current page
    container.dataset.currentPage = page;
    
    // Update display
    updatePagination(tableId);
}

function changePage(tableId, direction) {
    const container = document.getElementById(tableId);
    const currentPage = parseInt(container.dataset.currentPage) || 1;
    const newPage = currentPage + direction;
    
    goToPage(tableId, newPage);
}

// Export for main.js
window.Table = {
    init: () => {
        initTables();
    }
};

// Expose functions globally for onclick handlers
window.searchTable = searchTable;
window.sortTable = sortTable;
window.editRow = editRow;
window.deleteRow = deleteRow;
window.duplicateRow = duplicateRow;
window.goToPage = goToPage;
window.changePage = changePage;