/**
 * File Manager Component JavaScript
 * Handles drag-and-drop uploads, file management, and preview functionality
 */

// Global variables
let uploadedFiles = [];
let currentPreviewFile = null;

// Initialize file manager
document.addEventListener('DOMContentLoaded', function() {
    initializeFileManager();
});

function initializeFileManager() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        // Drag and drop events
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('click', triggerFileInput);
        
        // File input change
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Prevent default drag behaviors on document
    document.addEventListener('dragover', e => e.preventDefault());
    document.addEventListener('drop', e => e.preventDefault());
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Only remove class if leaving the upload area entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
        processFiles(files);
    }
}

// File selection handlers
function triggerFileInput() {
    document.getElementById('fileInput').click();
}

function openFileUpload() {
    triggerFileInput();
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
        processFiles(files);
    }
}

// File processing
function processFiles(files) {
    const uploadArea = document.getElementById('uploadArea');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadItems = document.getElementById('uploadItems');
    
    // Hide upload area and show progress
    uploadArea.classList.add('hidden');
    uploadProgress.classList.remove('hidden');
    
    // Clear previous uploads
    uploadItems.innerHTML = '';
    
    files.forEach((file, index) => {
        if (validateFile(file)) {
            createUploadItem(file, index);
            simulateUpload(file, index);
        }
    });
}

function validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif'
    ];
    
    if (file.size > maxSize) {
        showNotification(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showNotification(`File type "${file.type}" is not supported.`, 'error');
        return false;
    }
    
    return true;
}

function createUploadItem(file, index) {
    const uploadItems = document.getElementById('uploadItems');
    const fileIcon = getFileIcon(file);
    
    const uploadItem = document.createElement('div');
    uploadItem.className = 'upload-item';
    uploadItem.id = `upload-item-${index}`;
    
    uploadItem.innerHTML = `
        <div class="upload-item-icon">
            <i class="fas fa-${fileIcon}"></i>
        </div>
        <div class="upload-item-info">
            <div class="upload-item-name">${file.name}</div>
            <div class="upload-item-status">Preparing upload...</div>
            <div class="upload-progress-bar">
                <div class="upload-progress-fill" style="width: 0%"></div>
            </div>
        </div>
        <div class="upload-item-actions">
            <button class="upload-action-btn upload-action-danger" onclick="cancelUpload(${index})" title="Cancel">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    uploadItems.appendChild(uploadItem);
}

function simulateUpload(file, index) {
    const uploadItem = document.getElementById(`upload-item-${index}`);
    const progressFill = uploadItem.querySelector('.upload-progress-fill');
    const statusElement = uploadItem.querySelector('.upload-item-status');
    
    let progress = 0;
    const uploadSpeed = Math.random() * 5 + 2; // 2-7% per 100ms
    
    statusElement.textContent = 'Uploading...';
    
    const uploadInterval = setInterval(() => {
        progress += uploadSpeed;
        
        if (progress >= 100) {
            progress = 100;
            progressFill.style.width = '100%';
            statusElement.textContent = 'Upload complete';
            
            // Add file to manager
            addFileToManager(file);
            
            // Remove upload item after delay
            setTimeout(() => {
                uploadItem.remove();
                checkUploadComplete();
            }, 1000);
            
            clearInterval(uploadInterval);
        } else {
            progressFill.style.width = `${progress}%`;
            statusElement.textContent = `Uploading... ${Math.round(progress)}%`;
        }
    }, 100);
}

function cancelUpload(index) {
    const uploadItem = document.getElementById(`upload-item-${index}`);
    if (uploadItem) {
        uploadItem.remove();
        checkUploadComplete();
    }
}

function checkUploadComplete() {
    const uploadItems = document.getElementById('uploadItems');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadArea = document.getElementById('uploadArea');
    
    if (uploadItems.children.length === 0) {
        uploadProgress.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        
        // Reset file input
        document.getElementById('fileInput').value = '';
        
        showNotification('Files uploaded successfully!', 'success');
    }
}

function addFileToManager(file) {
    const fileGrid = document.getElementById('fileGrid');
    const fileList = document.getElementById('fileList');
    const fileIcon = getFileIcon(file);
    const fileId = Date.now() + Math.random();
    
    // Add to grid view
    const gridItem = document.createElement('div');
    gridItem.className = 'file-item';
    gridItem.dataset.name = file.name.toLowerCase();
    gridItem.dataset.date = new Date().toISOString();
    gridItem.dataset.size = formatFileSize(file.size);
    gridItem.dataset.type = getFileType(file);
    
    gridItem.innerHTML = `
        <div class="file-preview">
            ${file.type.startsWith('image/') ? 
                `<img src="${URL.createObjectURL(file)}" alt="${file.name}" class="file-thumbnail">` :
                `<div class="file-icon"><i class="fas fa-${fileIcon}"></i></div>`
            }
            <div class="file-actions">
                <button class="file-action-btn" onclick="previewFile('${fileId}')" title="Preview">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="file-action-btn" onclick="downloadFile('${fileId}')" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="file-action-btn file-action-danger" onclick="deleteFile('${fileId}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="file-info">
            <div class="file-name" title="${file.name}">${file.name}</div>
            <div class="file-meta">
                <span class="file-size">${formatFileSize(file.size)}</span>
                <span class="file-date">Just now</span>
            </div>
            <div class="file-author">by You</div>
        </div>
    `;
    
    fileGrid.appendChild(gridItem);
    
    // Add to list view
    const listItem = document.createElement('div');
    listItem.className = 'file-list-item';
    listItem.dataset.name = file.name.toLowerCase();
    listItem.dataset.date = new Date().toISOString();
    listItem.dataset.size = formatFileSize(file.size);
    listItem.dataset.type = getFileType(file);
    
    listItem.innerHTML = `
        <div class="file-list-col file-list-name">
            <div class="file-list-icon">
                <i class="fas fa-${fileIcon}"></i>
            </div>
            <div class="file-list-info">
                <div class="file-list-filename">${file.name}</div>
                <div class="file-list-author">by You</div>
            </div>
        </div>
        <div class="file-list-col file-list-size">${formatFileSize(file.size)}</div>
        <div class="file-list-col file-list-modified">Just now</div>
        <div class="file-list-col file-list-actions">
            <button class="file-list-action" onclick="previewFile('${fileId}')" title="Preview">
                <i class="fas fa-eye"></i>
            </button>
            <button class="file-list-action" onclick="downloadFile('${fileId}')" title="Download">
                <i class="fas fa-download"></i>
            </button>
            <button class="file-list-action file-action-danger" onclick="deleteFile('${fileId}')" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add after header
    const listHeader = fileList.querySelector('.file-list-header');
    listHeader.insertAdjacentElement('afterend', listItem);
    
    // Store file data
    uploadedFiles.push({
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        type: file.type
    });
    
    updateFileCount();
}

// View management
function setFileView(view) {
    console.log('setFileView called with:', view);
    
    const gridView = document.getElementById('fileGrid');
    const listView = document.getElementById('fileList');
    const gridBtn = document.querySelector('.file-view-btn[data-view="grid"]');
    const listBtn = document.querySelector('.file-view-btn[data-view="list"]');
    
    console.log('Found elements:', { gridView, listView, gridBtn, listBtn });
    
    if (view === 'grid') {
        if (gridView) gridView.classList.remove('hidden');
        if (listView) listView.classList.add('hidden');
        if (gridBtn) gridBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
    } else {
        if (gridView) gridView.classList.add('hidden');
        if (listView) listView.classList.remove('hidden');
        if (listBtn) listBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
    }
    
    console.log('View changed to:', view);
}

// Sorting
function sortFiles(sortBy) {
    const gridItems = Array.from(document.querySelectorAll('.file-grid .file-item'));
    const listItems = Array.from(document.querySelectorAll('.file-list .file-list-item'));
    
    const sortFunction = (a, b) => {
        switch (sortBy) {
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            case 'date':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            case 'size':
                return parseFileSize(b.dataset.size) - parseFileSize(a.dataset.size);
            case 'type':
                return a.dataset.type.localeCompare(b.dataset.type);
            default:
                return 0;
        }
    };
    
    // Sort and re-append grid items
    gridItems.sort(sortFunction);
    const fileGrid = document.getElementById('fileGrid');
    gridItems.forEach(item => fileGrid.appendChild(item));
    
    // Sort and re-append list items
    listItems.sort(sortFunction);
    const fileList = document.getElementById('fileList');
    const listHeader = fileList.querySelector('.file-list-header');
    listItems.forEach(item => fileList.appendChild(item));
}

// File actions
function previewFile(fileId) {
    const modal = document.getElementById('filePreviewModal');
    const fileName = document.getElementById('previewFileName');
    const previewBody = document.getElementById('filePreviewBody');
    
    // Find file data
    const fileData = uploadedFiles.find(f => f.id == fileId) || { name: 'Unknown File' };
    currentPreviewFile = fileData;
    
    fileName.textContent = fileData.name || 'File Preview';
    
    if (fileData.file && fileData.file.type.startsWith('image/')) {
        previewBody.innerHTML = `<img src="${URL.createObjectURL(fileData.file)}" alt="${fileData.name}">`;
    } else {
        previewBody.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-file" style="font-size: 4rem; color: var(--muted-foreground); margin-bottom: 1rem;"></i>
                <h4>Preview not available</h4>
                <p>This file type cannot be previewed in the browser.</p>
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
}

function closeFilePreview() {
    document.getElementById('filePreviewModal').classList.add('hidden');
    currentPreviewFile = null;
}

function downloadCurrentFile() {
    if (currentPreviewFile && currentPreviewFile.file) {
        downloadFile(currentPreviewFile.id);
    }
}

function downloadFile(fileId) {
    const fileData = uploadedFiles.find(f => f.id == fileId);
    if (fileData && fileData.file) {
        const url = URL.createObjectURL(fileData.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        showNotification('Download functionality would be implemented here', 'info');
    }
}

function deleteFile(fileId) {
    if (confirm('Are you sure you want to delete this file?')) {
        // Remove from uploaded files array
        uploadedFiles = uploadedFiles.filter(f => f.id != fileId);
        
        // Remove from DOM
        const gridItems = document.querySelectorAll(`.file-grid .file-item`);
        const listItems = document.querySelectorAll(`.file-list .file-list-item`);
        
        gridItems.forEach(item => {
            if (item.querySelector(`[onclick*="${fileId}"]`)) {
                item.remove();
            }
        });
        
        listItems.forEach(item => {
            if (item.querySelector(`[onclick*="${fileId}"]`)) {
                item.remove();
            }
        });
        
        updateFileCount();
        showNotification('File deleted successfully', 'success');
    }
}

// Utility functions
function getFileIcon(file) {
    const type = file.type.toLowerCase();
    
    if (type.includes('pdf')) return 'file-pdf';
    if (type.includes('word')) return 'file-word';
    if (type.includes('excel') || type.includes('sheet')) return 'file-excel';
    if (type.includes('powerpoint') || type.includes('presentation')) return 'file-powerpoint';
    if (type.includes('image')) return 'file-image';
    
    return 'file';
}

function getFileType(file) {
    const type = file.type.toLowerCase();
    
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word')) return 'word';
    if (type.includes('excel') || type.includes('sheet')) return 'excel';
    if (type.includes('powerpoint') || type.includes('presentation')) return 'powerpoint';
    if (type.includes('image')) return 'image';
    
    return 'other';
}

function formatFileSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function parseFileSize(sizeStr) {
    const parts = sizeStr.split(' ');
    const value = parseFloat(parts[0]);
    const unit = parts[1];
    
    switch (unit) {
        case 'GB': return value * 1024 * 1024 * 1024;
        case 'MB': return value * 1024 * 1024;
        case 'KB': return value * 1024;
        default: return value;
    }
}

function updateFileCount() {
    const fileCount = document.querySelector('.file-count');
    const totalFiles = document.querySelectorAll('.file-grid .file-item').length;
    
    if (fileCount) {
        fileCount.textContent = `${totalFiles} files`;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `file-notification file-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const fileManagerStyle = document.createElement('style');
fileManagerStyle.textContent = `
    .file-notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
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
        color: white;
        font-size: 0.875rem;
        max-width: 300px;
    }
    
    .file-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .file-notification-success {
        background: var(--success);
    }
    
    .file-notification-error {
        background: var(--danger);
    }
    
    .file-notification-info {
        background: var(--info);
    }
`;
document.head.appendChild(fileManagerStyle);