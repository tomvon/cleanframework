/**
 * Form Component JavaScript
 */

// Form validation and enhancement
function initFormValidation() {
    const forms = document.querySelectorAll('.form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const group = input.closest('.group');
    let errorElement = group.querySelector('.error');
    
    // Remove existing error
    if (errorElement) {
        errorElement.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Show error if invalid
    if (!isValid) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = errorMessage;
        group.appendChild(errorDiv);
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Multi-step form functionality
let currentStep = 0;

function initMultiStepForm() {
    const multiForm = document.querySelector('.form-multi');
    if (!multiForm) return;
    
    // Set initial progress bar width
    const progressFill = multiForm.querySelector('.progress .fill');
    if (progressFill) {
        const initialWidth = progressFill.getAttribute('data-initial-width');
        if (initialWidth) {
            progressFill.style.width = initialWidth + '%';
        }
    }
    
    // Set up validation for multi-step form
    multiForm.addEventListener('submit', (e) => {
        if (!validateCurrentStep()) {
            e.preventDefault();
        }
    });
}

function nextStep() {
    const multiForm = document.querySelector('.form-multi');
    const nodes = multiForm.querySelectorAll('.node');
    const steps = multiForm.querySelectorAll('.step');
    
    // Validate current step
    if (!validateCurrentStep()) {
        return;
    }
    
    // Move to next step
    if (currentStep < nodes.length - 1) {
        // Hide current node
        nodes[currentStep].classList.remove('active');
        steps[currentStep].classList.remove('active');
        steps[currentStep].classList.add('completed');
        
        // Show next node
        currentStep++;
        nodes[currentStep].classList.add('active');
        steps[currentStep].classList.add('active');
        
        // Update progress bar
        updateProgress();
        
        // Update navigation buttons
        updateNavigation();
        
        // Scroll to top of progress steps with 20px offset
        const progressSection = multiForm.querySelector('.progress');
        if (progressSection) {
            const targetPosition = progressSection.getBoundingClientRect().top + window.pageYOffset - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

function previousStep() {
    const multiForm = document.querySelector('.form-multi');
    const nodes = multiForm.querySelectorAll('.node');
    const steps = multiForm.querySelectorAll('.step');
    
    if (currentStep > 0) {
        // Hide current node
        nodes[currentStep].classList.remove('active');
        steps[currentStep].classList.remove('active');
        
        // Show previous node
        currentStep--;
        nodes[currentStep].classList.add('active');
        steps[currentStep].classList.add('active');
        steps[currentStep].classList.remove('completed');
        
        // Update progress bar
        updateProgress();
        
        // Update navigation buttons
        updateNavigation();
        
        // Scroll to top of progress steps with 20px offset
        const progressSection = multiForm.querySelector('.progress');
        if (progressSection) {
            const targetPosition = progressSection.getBoundingClientRect().top + window.pageYOffset - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

function updateProgress() {
    const multiForm = document.querySelector('.form-multi');
    const progressFill = multiForm.querySelector('.progress .fill');
    const totalSteps = multiForm.querySelectorAll('.node').length;
    
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
    progressFill.style.width = progressPercent + '%';
}

function updateNavigation() {
    const multiForm = document.querySelector('.form-multi');
    const prevBtn = multiForm.querySelector('.navigation .left button');
    const nextBtn = multiForm.querySelector('.navigation .right button[type="button"]');
    const submitBtn = multiForm.querySelector('.navigation .right button[type="submit"]');
    const totalSteps = multiForm.querySelectorAll('.node').length;
    
    // Show/hide previous button
    if (currentStep > 0) {
        prevBtn.classList.add('form-button-visible');
    } else {
        prevBtn.classList.remove('form-button-visible');
    }
    
    // Show next or submit button
    if (currentStep === totalSteps - 1) {
        nextBtn.style.display = 'none';
        submitBtn.classList.add('form-button-visible');
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.classList.remove('form-button-visible');
    }
}

function validateCurrentStep() {
    const multiForm = document.querySelector('.form-multi');
    const currentNode = multiForm.querySelectorAll('.node')[currentStep];
    const inputs = currentNode.querySelectorAll('input[required], textarea[required], select[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Range input functionality
function initRangeInputs() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(range => {
        const display = range.parentNode.querySelector('.range-display .current-value');
        if (display) {
            // Update display when value changes
            range.addEventListener('input', () => {
                display.textContent = range.value;
            });
        }
    });
}

// Password toggle functionality
function togglePassword(fieldName) {
    const input = document.getElementById(fieldName);
    const button = input.nextElementSibling;
    const eyeOpen = button.querySelector('.eye-open');
    const eyeClosed = button.querySelector('.eye-closed');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.classList.add('eye-closed');
        eyeClosed.classList.remove('eye-closed');
    } else {
        input.type = 'password';
        eyeOpen.classList.remove('eye-closed');
        eyeClosed.classList.add('eye-closed');
    }
}

// File upload drag & drop functionality with image previews
function initFileUploadAreas() {
    const uploadAreas = document.querySelectorAll('.file-upload-area');
    
    uploadAreas.forEach(area => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            area.addEventListener(eventName, () => area.classList.add('dragover'), false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, () => area.classList.remove('dragover'), false);
        });
        
        area.addEventListener('drop', handleDrop, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        const area = e.currentTarget;
        const input = area.querySelector('input[type="file"]');
        
        if (input && files.length > 0) {
            // Create a new FileList-like object that combines existing and new files
            const combinedFiles = [...(input.files || []), ...Array.from(files)];
            
            // Update input files (note: this is a limitation - we'll track files separately)
            updateFileList(area, combinedFiles);
        }
    }
    
    function updateFileList(area, files) {
        const previewsContainer = area.querySelector('.file-previews');
        const uploadContent = area.querySelector('.upload-content');
        const uploadActions = area.querySelector('.upload-actions');
        
        // Clear existing previews
        previewsContainer.innerHTML = '';
        
        if (files.length > 0) {
            area.classList.add('has-files');
            uploadContent.style.display = 'none';
            uploadActions.classList.add('form-actions-visible');
            
            files.forEach((file, index) => {
                createFilePreview(file, index, area);
            });
        } else {
            area.classList.remove('has-files');
            uploadContent.style.display = 'block';
            uploadActions.classList.remove('form-actions-visible');
        }
        
        // Store files data for form submission
        area.filesList = files;
    }
    
    function createFilePreview(file, index, area) {
        const previewsContainer = area.querySelector('.file-previews');
        const previewDiv = document.createElement('div');
        previewDiv.className = 'file-preview';
        previewDiv.dataset.index = index;
        
        const isImage = file.type.startsWith('image/');
        
        if (isImage) {
            const img = document.createElement('img');
            img.className = 'preview-image';
            img.alt = file.name;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            
            previewDiv.appendChild(img);
        } else {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'preview-file';
            
            const icon = document.createElement('div');
            icon.className = 'file-icon';
            icon.textContent = getFileIcon(file.type);
            
            fileDiv.appendChild(icon);
            previewDiv.appendChild(fileDiv);
        }
        
        // File info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'file-info';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'file-name';
        nameDiv.textContent = file.name;
        
        const sizeDiv = document.createElement('div');
        sizeDiv.className = 'file-size';
        sizeDiv.textContent = formatFileSize(file.size);
        
        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(sizeDiv);
        previewDiv.appendChild(infoDiv);
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file';
        removeBtn.textContent = '×';
        removeBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFile(area, index);
        };
        
        previewDiv.appendChild(removeBtn);
        previewsContainer.appendChild(previewDiv);
    }
    
    function removeFile(area, index) {
        const files = area.filesList || [];
        const updatedFiles = files.filter((_, i) => i !== index);
        updateFileList(area, updatedFiles);
    }
    
    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('doc')) return '📝';
        if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
        if (fileType.includes('video')) return '🎥';
        if (fileType.includes('audio')) return '🎵';
        return '📄';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Make functions globally available
    window.handleFileSelect = function(input) {
        const area = input.closest('.file-upload-area');
        const files = Array.from(input.files || []);
        updateFileList(area, files);
    };
    
    window.clearAllFiles = function(fieldName, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const area = document.querySelector(`[data-field="${fieldName}"]`);
        const input = area.querySelector('input[type="file"]');
        input.value = '';
        updateFileList(area, []);
    };
}

// Star rating functionality
function initStarRatings() {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(rating => {
        const labels = rating.querySelectorAll('label');
        const inputs = rating.querySelectorAll('input');
        
        labels.forEach((label, index) => {
            label.addEventListener('mouseenter', () => {
                // Highlight stars on hover
                labels.forEach((l, i) => {
                    if (i >= index) {
                        l.style.color = 'var(--yellow-400)';
                    } else {
                        l.style.color = 'var(--gray-300)';
                    }
                });
            });
        });
        
        rating.addEventListener('mouseleave', () => {
            // Reset to checked state
            const checkedIndex = Array.from(inputs).findIndex(input => input.checked);
            labels.forEach((l, i) => {
                if (checkedIndex !== -1 && i >= labels.length - 1 - checkedIndex) {
                    l.style.color = 'var(--yellow-400)';
                } else {
                    l.style.color = 'var(--gray-300)';
                }
            });
        });
    });
}

// Export for main.js
window.Forms = {
    init: () => {
        initFormValidation();
        initMultiStepForm();
        initRangeInputs();
        initFileUploadAreas();
        initStarRatings();
    }
};

// Expose functions globally for onclick handlers
window.nextStep = nextStep;
window.previousStep = previousStep;
window.togglePassword = togglePassword;