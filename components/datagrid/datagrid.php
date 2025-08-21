<?php
/**
 * Data Grid Component
 * Advanced data table with sorting, filtering, bulk actions, and inline editing
 */

// Sample data for demonstration
$datagrid_data = [
    [
        'id' => 1,
        'name' => 'Sarah Johnson',
        'email' => 'sarah.johnson@example.com',
        'role' => 'Administrator',
        'department' => 'Engineering',
        'status' => 'active',
        'last_active' => '2024-01-15 14:30',
        'avatar' => 'SJ'
    ],
    [
        'id' => 2,
        'name' => 'Michael Chen',
        'email' => 'michael.chen@example.com',
        'role' => 'Developer',
        'department' => 'Engineering',
        'status' => 'active',
        'last_active' => '2024-01-15 13:45',
        'avatar' => 'MC'
    ],
    [
        'id' => 3,
        'name' => 'Emily Davis',
        'email' => 'emily.davis@example.com',
        'role' => 'Designer',
        'department' => 'Design',
        'status' => 'inactive',
        'last_active' => '2024-01-10 09:20',
        'avatar' => 'ED'
    ],
    [
        'id' => 4,
        'name' => 'James Wilson',
        'email' => 'james.wilson@example.com',
        'role' => 'Manager',
        'department' => 'Sales',
        'status' => 'active',
        'last_active' => '2024-01-15 15:00',
        'avatar' => 'JW'
    ],
    [
        'id' => 5,
        'name' => 'Maria Garcia',
        'email' => 'maria.garcia@example.com',
        'role' => 'Developer',
        'department' => 'Engineering',
        'status' => 'pending',
        'last_active' => '2024-01-14 11:30',
        'avatar' => 'MG'
    ],
    [
        'id' => 6,
        'name' => 'Robert Taylor',
        'email' => 'robert.taylor@example.com',
        'role' => 'Support',
        'department' => 'Customer Service',
        'status' => 'active',
        'last_active' => '2024-01-15 16:15',
        'avatar' => 'RT'
    ]
];
?>

<div class="datagrid">
    <!-- Header with filters and actions -->
    <div class="datagrid-header">
        <div class="datagrid-header-content">
            <h3 class="datagrid-title">User Management</h3>
            
            <div class="datagrid-actions">
                <!-- Search -->
                <div class="datagrid-search">
                    <i class="fas fa-search datagrid-search-icon"></i>
                    <input type="text" placeholder="Search users..." class="form-control">
                </div>
                
                <!-- Filter -->
                <div class="datagrid-filter">
                    <button class="datagrid-filter-button" onclick="toggleFilter(this)">
                        <i class="fas fa-filter"></i>
                        Filter
                    </button>
                </div>
                
                <!-- Add New -->
                <button class="button primary">
                    <i class="fas fa-plus"></i>
                    Add User
                </button>
            </div>
        </div>
    </div>
    
    <!-- Table container -->
    <div class="datagrid-container">
        <table class="datagrid-table">
            <thead>
                <tr>
                    <th class="datagrid-cell-select">
                        <input type="checkbox" id="selectAll">
                    </th>
                    <th class="sortable" onclick="sortTable('name')">
                        Name
                        <i class="fas fa-sort sort-icon"></i>
                    </th>
                    <th class="sortable" onclick="sortTable('role')">
                        Role
                        <i class="fas fa-sort sort-icon"></i>
                    </th>
                    <th class="sortable" onclick="sortTable('department')">
                        Department
                        <i class="fas fa-sort sort-icon"></i>
                    </th>
                    <th>Status</th>
                    <th class="sortable" onclick="sortTable('last_active')">
                        Last Active
                        <i class="fas fa-sort sort-icon"></i>
                    </th>
                    <th class="datagrid-cell-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($datagrid_data as $index => $user): ?>
                <tr data-id="<?= $user['id'] ?>">
                    <td class="datagrid-cell-select">
                        <input type="checkbox" class="row-select">
                    </td>
                    <td>
                        <div class="datagrid-cell-avatar">
                            <div class="datagrid-avatar">
                                <?= $user['avatar'] ?>
                            </div>
                            <div class="datagrid-user-info">
                                <div class="datagrid-user-name"><?= htmlspecialchars($user['name']) ?></div>
                                <div class="datagrid-user-email"><?= htmlspecialchars($user['email']) ?></div>
                            </div>
                        </div>
                    </td>
                    <td><?= $user['role'] ?></td>
                    <td><?= $user['department'] ?></td>
                    <td class="datagrid-cell-status">
                        <?php
                        $status_class = 'datagrid-status-' . $user['status'];
                        $status_text = ucfirst($user['status']);
                        ?>
                        <span class="datagrid-status <?= $status_class ?>">
                            <span class="datagrid-status-dot"></span>
                            <?= $status_text ?>
                        </span>
                    </td>
                    <td><?= $user['last_active'] ?></td>
                    <td class="datagrid-cell-actions">
                        <div class="datagrid-actions-menu">
                            <button class="datagrid-action datagrid-action-primary" onclick="editUser(<?= $user['id'] ?>)" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="datagrid-action" onclick="viewUser(<?= $user['id'] ?>)" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="datagrid-action datagrid-action-danger" onclick="deleteUser(<?= $user['id'] ?>)" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                
                <!-- Expandable row content (hidden by default) -->
                <tr class="datagrid-row-expanded datagrid-row-collapsed">
                    <td colspan="7">
                        <div class="datagrid-expand-content">
                            <h4>Additional Information</h4>
                            <div class="datagrid-expand-grid">
                                <div>
                                    <strong>User ID:</strong> <?= $user['id'] ?>
                                </div>
                                <div>
                                    <strong>Created:</strong> Jan 1, 2024
                                </div>
                                <div>
                                    <strong>Last Login:</strong> <?= $user['last_active'] ?>
                                </div>
                                <div>
                                    <strong>Permissions:</strong> Full Access
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    
    <!-- Footer with pagination -->
    <div class="datagrid-footer">
        <div class="datagrid-footer-content">
            <div class="datagrid-info">
                Showing 1-6 of 6 entries
                <span class="datagrid-selected-count datagrid-count-hidden">
                    · <strong>0</strong> selected
                </span>
            </div>
            
            <div class="datagrid-pagination">
                <div class="datagrid-page-size">
                    <label>Show:</label>
                    <select>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
                
                <div class="datagrid-page-buttons">
                    <button class="datagrid-page-button" disabled>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="datagrid-page-button active">1</button>
                    <button class="datagrid-page-button" disabled>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>