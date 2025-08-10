<?php
/**
 * Table Component
 * 
 * Responsive data tables with sorting, filtering, and actions
 */

// Example table data
$tables = $tables ?? [
    [
        'id' => 'users-table',
        'title' => 'Users Management',
        'searchable' => true,
        'sortable' => true,
        'pagination' => true,
        'per_page' => 3,
        'actions' => ['edit', 'delete'],
        'columns' => [
            ['key' => 'avatar', 'label' => '', 'type' => 'avatar', 'sortable' => false],
            ['key' => 'name', 'label' => 'Name', 'type' => 'text', 'sortable' => true],
            ['key' => 'email', 'label' => 'Email', 'type' => 'email', 'sortable' => true],
            ['key' => 'role', 'label' => 'Role', 'type' => 'badge', 'sortable' => true],
            ['key' => 'status', 'label' => 'Status', 'type' => 'status', 'sortable' => true],
            ['key' => 'created', 'label' => 'Created', 'type' => 'date', 'sortable' => true],
            ['key' => 'actions', 'label' => 'Actions', 'type' => 'actions', 'sortable' => false]
        ],
        'data' => [
            [
                'id' => 1,
                'avatar' => 'img/samples/pexels-earano-1330219.jpg',
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'role' => 'Admin',
                'status' => 'active',
                'created' => '2024-01-15'
            ],
            [
                'id' => 2,
                'avatar' => 'img/samples/pexels-fabianwiktor-994605.jpg',
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'role' => 'Editor',
                'status' => 'active',
                'created' => '2024-01-20'
            ],
            [
                'id' => 3,
                'avatar' => 'img/samples/pexels-george-desipris-801857.jpg',
                'name' => 'Mike Johnson',
                'email' => 'mike@example.com',
                'role' => 'User',
                'status' => 'inactive',
                'created' => '2024-02-01'
            ],
            [
                'id' => 4,
                'avatar' => 'img/samples/pexels-earano-1330219.jpg',
                'name' => 'Sarah Wilson',
                'email' => 'sarah@example.com',
                'role' => 'Editor',
                'status' => 'active',
                'created' => '2024-02-10'
            ],
            [
                'id' => 5,
                'avatar' => 'img/samples/pexels-fabianwiktor-994605.jpg',
                'name' => 'Alex Chen',
                'email' => 'alex@example.com',
                'role' => 'User',
                'status' => 'active',
                'created' => '2024-02-15'
            ],
            [
                'id' => 6,
                'avatar' => 'img/samples/pexels-george-desipris-801857.jpg',
                'name' => 'Emma Brown',
                'email' => 'emma@example.com',
                'role' => 'Editor',
                'status' => 'inactive',
                'created' => '2024-02-20'
            ],
            [
                'id' => 7,
                'avatar' => 'img/samples/pexels-earano-1330219.jpg',
                'name' => 'David Miller',
                'email' => 'david@example.com',
                'role' => 'User',
                'status' => 'active',
                'created' => '2024-02-25'
            ],
            [
                'id' => 8,
                'avatar' => 'img/samples/pexels-fabianwiktor-994605.jpg',
                'name' => 'Lisa Garcia',
                'email' => 'lisa@example.com',
                'role' => 'Admin',
                'status' => 'active',
                'created' => '2024-03-01'
            ]
        ]
    ],
    [
        'id' => 'products-table',
        'title' => 'Products Inventory',
        'searchable' => true,
        'sortable' => true,
        'pagination' => false,
        'actions' => ['edit', 'duplicate', 'delete'],
        'columns' => [
            ['key' => 'name', 'label' => 'Product Name', 'type' => 'text', 'sortable' => true],
            ['key' => 'category', 'label' => 'Category', 'type' => 'text', 'sortable' => true],
            ['key' => 'price', 'label' => 'Price', 'type' => 'currency', 'sortable' => true],
            ['key' => 'stock', 'label' => 'Stock', 'type' => 'number', 'sortable' => true],
            ['key' => 'status', 'label' => 'Status', 'type' => 'status', 'sortable' => true],
            ['key' => 'actions', 'label' => 'Actions', 'type' => 'actions', 'sortable' => false]
        ],
        'data' => [
            [
                'id' => 1,
                'name' => 'Wireless Headphones',
                'category' => 'Electronics',
                'price' => 99.99,
                'stock' => 45,
                'status' => 'active'
            ],
            [
                'id' => 2,
                'name' => 'Coffee Mug',
                'category' => 'Kitchen',
                'price' => 12.99,
                'stock' => 120,
                'status' => 'active'
            ],
            [
                'id' => 3,
                'name' => 'Desk Lamp',
                'category' => 'Office',
                'price' => 45.00,
                'stock' => 0,
                'status' => 'out_of_stock'
            ]
        ]
    ]
];

// Function to render cell content based on type
function renderTableCell($column, $value, $row) {
    switch ($column['type']) {
        case 'avatar':
            return "<img src=\"{$value}\" alt=\"Avatar\" class=\"table-avatar\">";
        
        case 'email':
            return "<a href=\"mailto:{$value}\" class=\"table-email\">{$value}</a>";
        
        case 'badge':
            $badgeClass = strtolower(str_replace(' ', '-', $value));
            return "<span class=\"table-badge {$badgeClass}\">{$value}</span>";
        
        case 'status':
            $statusClass = $value === 'active' ? 'success' : ($value === 'inactive' ? 'warning' : 'danger');
            $statusText = ucfirst(str_replace('_', ' ', $value));
            return "<span class=\"table-status {$statusClass}\">{$statusText}</span>";
        
        case 'date':
            return date('M j, Y', strtotime($value));
        
        case 'currency':
            return "$" . number_format($value, 2);
        
        case 'number':
            return number_format($value);
        
        case 'actions':
            $actions = '';
            $actions .= "<button class=\"table-action-btn\" onclick=\"editRow('{$row['id']}')\" title=\"Edit\">";
            $actions .= "<i class=\"fas fa-edit\"></i></button>";
            $actions .= "<button class=\"table-action-btn danger\" onclick=\"deleteRow('{$row['id']}')\" title=\"Delete\">";
            $actions .= "<i class=\"fas fa-trash\"></i></button>";
            return $actions;
        
        default:
            return htmlspecialchars($value);
    }
}
?>

<?php foreach ($tables as $table): ?>
    <?php 
    // Pagination setup
    $per_page = $table['per_page'] ?? 10;
    $total_rows = count($table['data']);
    $total_pages = ceil($total_rows / $per_page);
    $current_page = 1; // Default to page 1
    $start_row = ($current_page - 1) * $per_page;
    $visible_data = array_slice($table['data'], $start_row, $per_page);
    ?>
    <div class="table-container" id="<?= $table['id'] ?>" 
         data-per-page="<?= $per_page ?>" 
         data-total-rows="<?= $total_rows ?>"
         data-current-page="1">
        <div class="table-header">
            <h3 class="table-title"><?= $table['title'] ?></h3>
            <?php if ($table['searchable']): ?>
                <div class="table-search">
                    <input type="text" 
                           placeholder="Search..." 
                           class="table-search-input"
                           onkeyup="searchTable('<?= $table['id'] ?>', this.value)">
                    <i class="fas fa-search table-search-icon"></i>
                </div>
            <?php endif; ?>
        </div>

        <div class="table-wrapper">
            <table class="table">
                <thead>
                    <tr>
                        <?php foreach ($table['columns'] as $column): ?>
                            <th class="<?= $column['sortable'] ? 'sortable' : '' ?>"
                                <?= $column['sortable'] ? "onclick=\"sortTable('{$table['id']}', '{$column['key']}')\"" : '' ?>>
                                <?= $column['label'] ?>
                                <?php if ($column['sortable']): ?>
                                    <i class="fas fa-sort table-sort-icon"></i>
                                <?php endif; ?>
                            </th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($table['data'] as $index => $row): ?>
                        <tr class="table-row" data-row-index="<?= $index ?>">
                            <?php foreach ($table['columns'] as $column): ?>
                                <td>
                                    <?= renderTableCell($column, $row[$column['key']] ?? '', $row) ?>
                                </td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <?php if ($table['pagination']): ?>
            <div class="table-pagination">
                <div class="table-pagination-info">
                    <span class="pagination-info-text">
                        Showing 1-<?= min($per_page, $total_rows) ?> of <?= $total_rows ?> results
                    </span>
                </div>
                <div class="table-pagination-controls">
                    <button class="button secondary pagination-prev" 
                            onclick="changePage('<?= $table['id'] ?>', -1)" 
                            disabled>
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    <span class="table-pagination-pages">
                        <?php for ($page = 1; $page <= min($total_pages, 5); $page++): ?>
                            <button class="button <?= $page === 1 ? 'primary' : 'secondary' ?> pagination-page" 
                                    data-page="<?= $page ?>"
                                    onclick="goToPage('<?= $table['id'] ?>', <?= $page ?>)">
                                <?= $page ?>
                            </button>
                        <?php endfor; ?>
                        <?php if ($total_pages > 5): ?>
                            <span class="pagination-ellipsis">...</span>
                            <button class="button secondary pagination-page" 
                                    data-page="<?= $total_pages ?>"
                                    onclick="goToPage('<?= $table['id'] ?>', <?= $total_pages ?>)">
                                <?= $total_pages ?>
                            </button>
                        <?php endif; ?>
                    </span>
                    <button class="button secondary pagination-next" 
                            onclick="changePage('<?= $table['id'] ?>', 1)"
                            <?= $total_pages <= 1 ? 'disabled' : '' ?>>
                        Next <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <?php if ($table !== end($tables)): ?>
        <div class="component-spacer"></div>
    <?php endif; ?>
<?php endforeach; ?>