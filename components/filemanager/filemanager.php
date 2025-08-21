<?php
/**
 * File Manager Component
 * Drag-and-drop file uploads with progress tracking and management
 */

// Sample file data
$files = [
    [
        'id' => 1,
        'name' => 'Project Proposal.pdf',
        'type' => 'pdf',
        'size' => '2.4 MB',
        'modified' => '2024-01-15 14:30:00',
        'modified_by' => 'Sarah Johnson',
        'status' => 'uploaded',
        'preview' => false
    ],
    [
        'id' => 2,
        'name' => 'Logo Design.png',
        'type' => 'image',
        'size' => '156 KB',
        'modified' => '2024-01-15 12:45:00',
        'modified_by' => 'Michael Chen',
        'status' => 'uploaded',
        'preview' => true
    ],
    [
        'id' => 3,
        'name' => 'Spreadsheet Data.xlsx',
        'type' => 'excel',
        'size' => '892 KB',
        'modified' => '2024-01-14 16:20:00',
        'modified_by' => 'Emily Davis',
        'status' => 'uploaded',
        'preview' => false
    ],
    [
        'id' => 4,
        'name' => 'Meeting Notes.docx',
        'type' => 'word',
        'size' => '45 KB',
        'modified' => '2024-01-14 09:15:00',
        'modified_by' => 'James Wilson',
        'status' => 'uploaded',
        'preview' => false
    ],
    [
        'id' => 5,
        'name' => 'Presentation.pptx',
        'type' => 'powerpoint',
        'size' => '5.2 MB',
        'modified' => '2024-01-13 13:40:00',
        'modified_by' => 'Maria Garcia',
        'status' => 'uploaded',
        'preview' => false
    ]
];

// File type icons mapping
$file_icons = [
    'pdf' => 'file-pdf',
    'image' => 'file-image',
    'excel' => 'file-excel',
    'word' => 'file-word',
    'powerpoint' => 'file-powerpoint',
    'default' => 'file'
];
?>

<div class="file-manager">
    <!-- File Manager Header -->
    <div class="file-manager-header">
        <div class="file-manager-title">
            <h3>File Manager</h3>
            <span class="file-count"><?= count($files) ?> files</span>
        </div>
        
        <div class="file-manager-actions">
            <!-- View Toggle -->
            <div class="file-view-toggle">
                <button class="file-view-btn active" data-view="grid" onclick="setFileView('grid')" title="Grid View">
                    <i class="fas fa-th"></i>
                </button>
                <button class="file-view-btn" data-view="list" onclick="setFileView('list')" title="List View">
                    <i class="fas fa-list"></i>
                </button>
            </div>
            
            <!-- Sort Dropdown -->
            <div class="dropdown">
                <button class="button secondary small dropdown-toggle" onclick="toggleDropdown(this)">
                    <i class="fas fa-sort"></i>
                    Sort by Name
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-menu">
                    <button class="dropdown-item active" onclick="sortFiles('name')">
                        <i class="fas fa-sort-alpha-down"></i>
                        Name
                    </button>
                    <button class="dropdown-item" onclick="sortFiles('date')">
                        <i class="fas fa-sort-numeric-down"></i>
                        Date Modified
                    </button>
                    <button class="dropdown-item" onclick="sortFiles('size')">
                        <i class="fas fa-sort-amount-down"></i>
                        File Size
                    </button>
                    <button class="dropdown-item" onclick="sortFiles('type')">
                        <i class="fas fa-sort"></i>
                        File Type
                    </button>
                </div>
            </div>
            
            <!-- Upload Button -->
            <button class="button primary" onclick="openFileUpload()">
                <i class="fas fa-upload"></i>
                Upload Files
            </button>
        </div>
    </div>
    
    <!-- Upload Area -->
    <div class="file-upload-area" id="uploadArea">
        <div class="file-upload-content">
            <i class="fas fa-cloud-upload-alt file-upload-icon"></i>
            <h4>Drop files here to upload</h4>
            <p>or <button class="file-upload-browse" onclick="triggerFileInput()">browse files</button></p>
            <div class="file-upload-info">
                <small>Supports: PDF, DOC, XLS, PPT, Images (max 10MB each)</small>
            </div>
        </div>
        <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif" class="file-input-hidden">
    </div>
    
    <!-- Upload Progress -->
    <div class="file-upload-progress file-upload-progress-hidden" id="uploadProgress">
        <h4>Uploading Files...</h4>
        <div class="upload-items" id="uploadItems">
            <!-- Upload items will be added here dynamically -->
        </div>
    </div>
    
    <!-- File Grid/List -->
    <div class="file-container" id="fileContainer">
        <div class="file-grid" id="fileGrid">
            <?php foreach ($files as $file): ?>
            <div class="file-item" data-name="<?= strtolower($file['name']) ?>" data-date="<?= $file['modified'] ?>" data-size="<?= $file['size'] ?>" data-type="<?= $file['type'] ?>">
                <div class="file-preview">
                    <?php if ($file['preview']): ?>
                    <img src="https://raw.githubusercontent.com/tomvon/cleanframework/master/img/samples/pexels-earano-1330219.jpg" alt="<?= htmlspecialchars($file['name']) ?>" class="file-thumbnail">
                    <?php else: ?>
                    <div class="file-icon">
                        <i class="fas fa-<?= $file_icons[$file['type']] ?? $file_icons['default'] ?>"></i>
                    </div>
                    <?php endif; ?>
                    
                    <!-- File Actions Overlay -->
                    <div class="file-actions">
                        <button class="file-action-btn" onclick="previewFile(<?= $file['id'] ?>)" title="Preview">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="file-action-btn" onclick="downloadFile(<?= $file['id'] ?>)" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="file-action-btn file-action-danger" onclick="deleteFile(<?= $file['id'] ?>)" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="file-info">
                    <div class="file-name" title="<?= htmlspecialchars($file['name']) ?>">
                        <?= htmlspecialchars($file['name']) ?>
                    </div>
                    <div class="file-meta">
                        <span class="file-size"><?= $file['size'] ?></span>
                        <span class="file-date"><?= date('M j, Y', strtotime($file['modified'])) ?></span>
                    </div>
                    <div class="file-author">
                        by <?= htmlspecialchars($file['modified_by']) ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        
        <!-- List View (Hidden by default) -->
        <div class="file-list file-view-hidden" id="fileList">
            <div class="file-list-header">
                <div class="file-list-col file-list-name">Name</div>
                <div class="file-list-col file-list-size">Size</div>
                <div class="file-list-col file-list-modified">Modified</div>
                <div class="file-list-col file-list-actions">Actions</div>
            </div>
            
            <?php foreach ($files as $file): ?>
            <div class="file-list-item" data-name="<?= strtolower($file['name']) ?>" data-date="<?= $file['modified'] ?>" data-size="<?= $file['size'] ?>" data-type="<?= $file['type'] ?>">
                <div class="file-list-col file-list-name">
                    <div class="file-list-icon">
                        <i class="fas fa-<?= $file_icons[$file['type']] ?? $file_icons['default'] ?>"></i>
                    </div>
                    <div class="file-list-info">
                        <div class="file-list-filename"><?= htmlspecialchars($file['name']) ?></div>
                        <div class="file-list-author">by <?= htmlspecialchars($file['modified_by']) ?></div>
                    </div>
                </div>
                <div class="file-list-col file-list-size"><?= $file['size'] ?></div>
                <div class="file-list-col file-list-modified"><?= date('M j, Y g:i A', strtotime($file['modified'])) ?></div>
                <div class="file-list-col file-list-actions">
                    <button class="file-list-action" onclick="previewFile(<?= $file['id'] ?>)" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="file-list-action" onclick="downloadFile(<?= $file['id'] ?>)" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="file-list-action file-action-danger" onclick="deleteFile(<?= $file['id'] ?>)" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <!-- Empty State -->
    <div class="file-empty file-empty-hidden" id="fileEmpty">
        <i class="fas fa-folder-open file-empty-icon"></i>
        <h4>No files uploaded yet</h4>
        <p>Drag and drop files here or click the upload button to get started</p>
        <button class="button primary" onclick="triggerFileInput()">
            <i class="fas fa-upload"></i>
            Upload Your First File
        </button>
    </div>
</div>

<!-- File Preview Modal -->
<div class="file-preview-modal" id="filePreviewModal">
    <div class="file-preview-backdrop" onclick="closeFilePreview()"></div>
    <div class="file-preview-content">
        <div class="file-preview-header">
            <h4 id="previewFileName">File Preview</h4>
            <button class="file-preview-close" onclick="closeFilePreview()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="file-preview-body" id="filePreviewBody">
            <!-- Preview content will be loaded here -->
        </div>
        <div class="file-preview-footer">
            <button class="button secondary" onclick="closeFilePreview()">Close</button>
            <button class="button primary" onclick="downloadCurrentFile()">
                <i class="fas fa-download"></i>
                Download
            </button>
        </div>
    </div>
</div>