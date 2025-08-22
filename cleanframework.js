/**
 * Clean Framework - Combined JavaScript
 * Version: 2025-08-22
 * 
 * This file contains all component JavaScript modules.
 * For production use, include cleanframework.min.js instead.
 */


// ========== NAVIGATION Component ==========
/**
 * Navigation Component JavaScript - Simplified
 */

// Unified Mobile Navigation Manager
const MobileNav = {
    activeMenu: null, // 'header' | 'sidebar' | null
    
    open(type) {
        // Close any open menu first
        this.closeAll();
        
        // Open the requested menu
        this.activeMenu = type;
        document.body.classList.add(`${type}-nav-open`);
    },
    
    close() {
        if (this.activeMenu) {
            document.body.classList.remove(`${this.activeMenu}-nav-open`);
            this.activeMenu = null;
        }
    },
    
    closeAll() {
        document.body.classList.remove('header-nav-open', 'sidebar-nav-open');
        this.activeMenu = null;
    },
    
    toggle(type) {
        if (this.activeMenu === type) {
            this.close();
        } else {
            this.open(type);
        }
    }
};

// Mobile navigation toggle (simplified)
function toggleMobileNav() {
    MobileNav.toggle('header');
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav .menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme toggle functionality - cycles through light -> dark -> system
function toggleTheme() {
    const html = document.documentElement;
    // Get the saved theme from localStorage to determine current state
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    let newTheme;
    switch (savedTheme) {
        case 'light':
            newTheme = 'dark';
            break;
        case 'dark':
            newTheme = 'system';
            break;
        case 'system':
        default:
            newTheme = 'light';
            break;
    }
    
    console.log('Toggling theme from', savedTheme, 'to', newTheme);
    
    if (newTheme === 'system') {
        // Remove data-theme to let CSS media query take over
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'system');
    } else {
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    // Update button icons
    const sunIcon = document.querySelector('.theme-toggle .sun');
    const moonIcon = document.querySelector('.theme-toggle .moon');
    const systemIcon = document.querySelector('.theme-toggle .system');
    
    console.log('Updating icons for theme:', theme);
    
    if (sunIcon && moonIcon && systemIcon) {
        // Remove active class from all icons
        sunIcon.classList.remove('active');
        moonIcon.classList.remove('active');
        systemIcon.classList.remove('active');
        
        // Add active class to the appropriate icon
        switch (theme) {
            case 'light':
                sunIcon.classList.add('active');
                break;
            case 'dark':
                moonIcon.classList.add('active');
                break;
            case 'system':
                systemIcon.classList.add('active');
                break;
        }
    }
    
    // Update mobile text menu
    const themeModes = document.querySelectorAll('.theme-mode');
    themeModes.forEach(mode => {
        mode.classList.remove('active');
    });
    
    const activeMode = document.querySelector(`.theme-mode.${theme}-mode`);
    if (activeMode) {
        activeMode.classList.add('active');
    }
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = savedTheme || 'light'; // Default to light theme
    
    console.log('Initializing theme:', theme, 'System prefers dark:', prefersDark);
    
    if (theme === 'system') {
        // Remove data-theme to let CSS media query take over
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Save the default if no theme was saved
    if (!savedTheme) {
        localStorage.setItem('theme', theme);
    }
    
    // Wait for DOM to be ready before updating icons
    setTimeout(() => {
        updateThemeIcon(theme);
    }, 100);
}

// Listen for system theme changes - only update if currently using system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'system') {
        // User is using system preference, no need to change data-theme
        // The CSS media query will handle it automatically
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    }
});

// Close mobile menus when clicking outside
function initClickOutside() {
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav');
        const sidebar = document.getElementById('sidebar');
        const navToggle = document.querySelector('.nav-toggle');
        const sidebarToggle = document.querySelector('.sidebar-mobile-toggle');
        
        // Skip if click is on a toggle button
        if (navToggle?.contains(e.target) || sidebarToggle?.contains(e.target)) {
            return;
        }
        
        // Close if clicking outside open menus
        if (MobileNav.activeMenu === 'header' && nav && !nav.contains(e.target)) {
            MobileNav.close();
        } else if (MobileNav.activeMenu === 'sidebar' && sidebar && !sidebar.contains(e.target)) {
            MobileNav.close();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            MobileNav.close();
        }
    });
    
    // Close mobile menus when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            MobileNav.closeAll();
        }
    });
}

// Remove all JavaScript-based overflow detection
// Let CSS handle everything with container queries or media queries

// Export for main.js
window.Navigation = {
    init: () => {
        initSmoothScroll();
        initTheme();
        initClickOutside();
    }
};

// Expose functions globally for onclick handlers
window.toggleTheme = toggleTheme;
window.toggleMobileNav = toggleMobileNav;
window.MobileNav = MobileNav;

// ========== FORM Component ==========
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
        prevBtn.classList.add('visible');
    } else {
        prevBtn.classList.remove('visible');
    }
    
    // Show next or submit button
    if (currentStep === totalSteps - 1) {
        nextBtn.style.display = 'none';
        submitBtn.classList.add('visible');
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.classList.remove('visible');
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
            uploadActions.classList.add('visible');
            
            files.forEach((file, index) => {
                createFilePreview(file, index, area);
            });
        } else {
            area.classList.remove('has-files');
            uploadContent.style.display = 'block';
            uploadActions.classList.remove('visible');
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

// ========== DROPDOWN Component ==========
/**
 * Dropdown Component JavaScript
 */

// Track active dropdowns
let activeDropdowns = new Set();

// Initialize dropdown functionality
function initDropdowns() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    // Handle arrow navigation in dropdowns
    document.addEventListener('keydown', (e) => {
        const activeDropdown = document.querySelector('.dropdown-menu.show');
        if (!activeDropdown) return;
        
        const items = activeDropdown.querySelectorAll('.dropdown-item:not(.dropdown-divider)');
        const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[prevIndex].focus();
                break;
            case 'Enter':
                e.preventDefault();
                if (document.activeElement.classList.contains('dropdown-item')) {
                    document.activeElement.click();
                }
                break;
        }
    });
}

// Toggle dropdown visibility
function toggleDropdown(param) {
    let trigger, menu, dropdownId;
    
    // Handle both ID string and element parameter
    if (typeof param === 'string') {
        // Called with ID string
        dropdownId = param;
        trigger = document.getElementById(dropdownId + '-trigger');
        menu = document.getElementById(dropdownId + '-menu');
    } else {
        // Called with button element (this)
        trigger = param;
        const dropdown = trigger.closest('.dropdown');
        if (!dropdown) return;
        
        menu = dropdown.querySelector('.dropdown-menu');
        dropdownId = dropdown.id || 'dropdown-' + Math.random().toString(36).substr(2, 9);
    }
    
    if (!trigger || !menu) return;
    
    const isOpen = menu.classList.contains('show');
    
    // Close all other dropdowns first
    closeAllDropdowns();
    
    if (!isOpen) {
        // Open this dropdown
        menu.classList.add('show');
        trigger.setAttribute('aria-expanded', 'true');
        activeDropdowns.add(dropdownId);
        
        // Focus first item for accessibility
        const firstItem = menu.querySelector('.dropdown-item');
        if (firstItem) {
            setTimeout(() => firstItem.focus(), 100);
        }
    }
}

// Close specific dropdown
function closeDropdown(dropdownId) {
    const trigger = document.getElementById(dropdownId + '-trigger');
    const menu = document.getElementById(dropdownId + '-menu');
    
    if (!trigger || !menu) return;
    
    menu.classList.remove('show');
    trigger.setAttribute('aria-expanded', 'false');
    activeDropdowns.delete(dropdownId);
}

// Close all dropdowns
function closeAllDropdowns() {
    activeDropdowns.forEach(dropdownId => {
        closeDropdown(dropdownId);
    });
    activeDropdowns.clear();
}

// Handle select dropdown item selection
function selectDropdownItem(dropdownId, value, label) {
    const trigger = document.getElementById(dropdownId + '-trigger');
    const menu = document.getElementById(dropdownId + '-menu');
    
    if (!trigger || !menu) return;
    
    // Update trigger text
    const triggerText = trigger.querySelector('span');
    if (triggerText) {
        triggerText.textContent = label;
    }
    
    // Update selected state
    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
        const checkIcon = item.querySelector('.dropdown-check');
        if (checkIcon) {
            checkIcon.remove();
        }
    });
    
    const selectedItem = menu.querySelector(`[data-value="${value}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        const checkIcon = document.createElement('i');
        checkIcon.className = 'dropdown-check fas fa-check';
        selectedItem.appendChild(checkIcon);
    }
    
    // Close dropdown
    closeDropdown(dropdownId);
    
    // Trigger custom event for form integration
    const changeEvent = new CustomEvent('dropdownChange', {
        detail: { dropdownId, value, label }
    });
    trigger.dispatchEvent(changeEvent);
    
    console.log(`Selected: ${label} (${value}) in dropdown: ${dropdownId}`);
}

// Handle dropdown item clicks for menu/action types
function handleDropdownItemClick(dropdownId, item) {
    // Close dropdown after action
    closeDropdown(dropdownId);
    
    console.log(`Clicked item in dropdown: ${dropdownId}`, item);
}

// Get selected value from select dropdown
function getDropdownValue(dropdownId) {
    const menu = document.getElementById(dropdownId + '-menu');
    if (!menu) return null;
    
    const selectedItem = menu.querySelector('.dropdown-item.selected');
    return selectedItem ? selectedItem.dataset.value : null;
}

// Set dropdown value programmatically
function setDropdownValue(dropdownId, value) {
    const menu = document.getElementById(dropdownId + '-menu');
    if (!menu) return;
    
    const item = menu.querySelector(`[data-value="${value}"]`);
    if (item) {
        const label = item.textContent.trim();
        selectDropdownItem(dropdownId, value, label);
    }
}

// Export for main.js
window.Dropdown = {
    init: () => {
        initDropdowns();
    }
};

// Expose functions globally for onclick handlers
window.toggleDropdown = toggleDropdown;
window.closeDropdown = closeDropdown;
window.closeAllDropdowns = closeAllDropdowns;
window.selectDropdownItem = selectDropdownItem;
window.handleDropdownItemClick = handleDropdownItemClick;
window.getDropdownValue = getDropdownValue;
window.setDropdownValue = setDropdownValue;

// ========== MODAL Component ==========
/**
 * Modal Component JavaScript
 */

// Track open modals for stacking
let openModals = [];

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Add to open modals stack
    openModals.push(modalId);
    
    // Add stacked class if there are other open modals
    if (openModals.length > 1) {
        modal.classList.add('stacked');
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus management
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    // Trap focus within modal
    modal.addEventListener('keydown', trapFocus);
    
    // Close on escape
    document.addEventListener('keydown', handleEscape);
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Remove from open modals stack
    openModals = openModals.filter(id => id !== modalId);
    
    // Hide modal
    modal.classList.remove('active', 'stacked');
    
    // Remove body class if no modals are open
    if (openModals.length === 0) {
        document.body.classList.remove('modal-open');
    }
    
    // Remove event listeners
    modal.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', handleEscape);
    
    // Return focus to trigger element
    const trigger = document.activeElement;
    if (trigger) {
        trigger.focus();
    }
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal.id);
    });
}

// Trap focus within modal
function trapFocus(e) {
    const modal = e.currentTarget;
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableArray = Array.from(focusableElements);
    const firstFocusable = focusableArray[0];
    const lastFocusable = focusableArray[focusableArray.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
}

// Handle escape key
function handleEscape(e) {
    if (e.key === 'Escape' && openModals.length > 0) {
        // Close the topmost modal
        const topModalId = openModals[openModals.length - 1];
        closeModal(topModalId);
    }
}

// Example functions for demo buttons
function confirmAction() {
    alert('Action confirmed!');
    closeModal('confirm-modal');
}

function submitModalForm() {
    const form = document.querySelector('#form-modal form');
    if (form.checkValidity()) {
        alert('Form submitted!');
        closeModal('form-modal');
        form.reset();
    } else {
        form.reportValidity();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal(modal.id);
            }
        });
    });
});

// Export for use in other scripts
window.Modal = {
    open: openModal,
    close: closeModal,
    closeAll: closeAllModals
};

// ========== TABLE Component ==========
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

// ========== TABS Component ==========
/**
 * Tabs Component JavaScript
 */

// Initialize tabs functionality
function initTabs() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeTab = document.activeElement;
        
        if (activeTab.classList.contains('tab-button')) {
            const tabsNav = activeTab.parentElement;
            const tabs = Array.from(tabsNav.querySelectorAll('.tab-button'));
            const currentIndex = tabs.indexOf(activeTab);
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    tabs[prevIndex].focus();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    tabs[nextIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabs[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    tabs[tabs.length - 1].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    activeTab.click();
                    break;
            }
        }
    });
    
    console.log('Tabs initialized');
}

// Switch to a specific tab
function switchTab(containerId, tabId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Update tab buttons
    const tabButtons = container.querySelectorAll('.tab-button');
    const targetButton = container.querySelector(`#${containerId}-${tabId}-tab`);
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });
    
    if (targetButton) {
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-selected', 'true');
    }
    
    // Update tab panels
    const tabPanels = container.querySelectorAll('.tab-panel');
    const targetPanel = container.querySelector(`#${containerId}-${tabId}-panel`);
    
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Smooth scroll to top of tab content on mobile
    if (window.innerWidth <= 768) {
        container.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    // Trigger custom event for analytics or other integrations
    const changeEvent = new CustomEvent('tabChange', {
        detail: { containerId, tabId, targetButton, targetPanel }
    });
    container.dispatchEvent(changeEvent);
    
    console.log(`Switched to tab: ${tabId} in container: ${containerId}`);
}

// Get currently active tab in a container
function getActiveTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const activeButton = container.querySelector('.tab-button.active');
    if (!activeButton) return null;
    
    const buttonId = activeButton.id;
    const tabId = buttonId.replace(`${containerId}-`, '').replace('-tab', '');
    
    return {
        containerId,
        tabId,
        button: activeButton,
        panel: container.querySelector(`#${containerId}-${tabId}-panel`)
    };
}

// Switch to next tab in sequence
function nextTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    const activeTab = container.querySelector('.tab-button.active');
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    
    tabs[nextIndex].click();
}

// Switch to previous tab in sequence
function previousTab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    const activeTab = container.querySelector('.tab-button.active');
    const currentIndex = tabs.indexOf(activeTab);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    
    tabs[prevIndex].click();
}

// Programmatically activate a tab by index
function activateTabByIndex(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = Array.from(container.querySelectorAll('.tab-button'));
    if (index >= 0 && index < tabs.length) {
        tabs[index].click();
    }
}

// Get all tab containers on the page
function getAllTabContainers() {
    return Array.from(document.querySelectorAll('.tabs-container')).map(container => ({
        id: container.id,
        style: container.classList.contains('pills') ? 'pills' : 
               container.classList.contains('underline') ? 'underline' : 'default',
        activeTab: getActiveTab(container.id)
    }));
}

// Export for main.js
window.Tabs = {
    init: () => {
        initTabs();
    }
};

// Expose functions globally for onclick handlers and API
window.switchTab = switchTab;
window.getActiveTab = getActiveTab;
window.nextTab = nextTab;
window.previousTab = previousTab;
window.activateTabByIndex = activateTabByIndex;
window.getAllTabContainers = getAllTabContainers;

// ========== ALERT Component ==========
/**
 * Alert Component JavaScript
 */

// Initialize alerts functionality
function initAlerts() {
    // Auto-dismiss alerts with data-timeout attribute
    const autoDismissAlerts = document.querySelectorAll('[data-timeout]');
    autoDismissAlerts.forEach(alert => {
        const timeout = parseInt(alert.getAttribute('data-timeout'));
        if (timeout > 0) {
            setTimeout(() => {
                dismissAlert(alert.id);
            }, timeout);
        }
    });
    
    console.log('Alerts initialized');
}

// Dismiss an alert with animation
function dismissAlert(alertId) {
    const alert = document.getElementById(alertId);
    if (!alert) return;
    
    // Add hiding class for animation
    alert.classList.add('alert-hiding');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
        
        // Trigger custom event for analytics or other integrations
        const dismissEvent = new CustomEvent('alertDismissed', {
            detail: { alertId, alert }
        });
        document.dispatchEvent(dismissEvent);
        
    }, 300); // Match CSS transition duration
    
    console.log(`Alert dismissed: ${alertId}`);
}

// Show a new alert programmatically
function showAlert(options) {
    const {
        type = 'info',
        title = '',
        message = '',
        dismissible = true,
        timeout = 0,
        actions = [],
        position = 'default' // 'default', 'toast'
    } = options;
    
    // Create alert ID
    const alertId = 'alert-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    // Define icons for each type
    const icons = {
        'success': 'fas fa-check-circle',
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-triangle',
        'error': 'fas fa-times-circle'
    };
    
    // Create alert HTML
    const isToast = position === 'toast';
    const alertHTML = `
        <div class="alert alert-${type} ${dismissible ? 'alert-dismissible' : ''} ${isToast ? 'alert-toast' : ''}" 
             id="${alertId}" 
             role="${type === 'error' ? 'alert' : 'status'}"
             aria-live="${type === 'error' ? 'assertive' : 'polite'}"
             ${timeout > 0 ? 'data-timeout="' + timeout + '"' : ''}>
            
            <div class="alert-content">
                <div class="alert-icon">
                    <i class="${icons[type]}"></i>
                </div>
                
                <div class="alert-body">
                    ${title ? `<div class="alert-title">${title}</div>` : ''}
                    <div class="alert-message">${message}</div>
                    
                    ${actions.length > 0 ? `
                        <div class="alert-actions">
                            ${actions.map(action => {
                                if (action.type === 'button') {
                                    return `<button class="alert-button" ${action.onclick ? 'onclick="' + action.onclick + '"' : ''}>${action.label}</button>`;
                                } else if (action.type === 'link') {
                                    return `<a href="${action.url}" class="alert-link">${action.label}</a>`;
                                } else if (action.type === 'dismiss') {
                                    return `<button class="alert-button" onclick="dismissAlert('${alertId}')">${action.label}</button>`;
                                }
                                return '';
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${dismissible ? `
                <button class="alert-dismiss" 
                        onclick="dismissAlert('${alertId}')"
                        aria-label="Dismiss alert">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
        </div>
    `;
    
    // Insert alert into DOM
    if (isToast) {
        // Add to body for fixed positioning (toasts and special variants)
        document.body.insertAdjacentHTML('afterbegin', alertHTML);
    } else {
        // Add to first container or body for normal inline alerts
        const container = document.querySelector('.container') || document.body;
        container.insertAdjacentHTML('afterbegin', alertHTML);
    }
    
    // Auto-dismiss if timeout is set
    if (timeout > 0) {
        setTimeout(() => {
            dismissAlert(alertId);
        }, timeout);
    }
    
    // Trigger custom event for analytics or other integrations
    const showEvent = new CustomEvent('alertShown', {
        detail: { alertId, options }
    });
    document.dispatchEvent(showEvent);
    
    console.log(`Alert shown: ${alertId}`, options);
    
    return alertId;
}

// Show success alert (convenience method)
function showSuccess(message, title = '', options = {}) {
    return showAlert({
        type: 'success',
        title,
        message,
        ...options
    });
}

// Show info alert (convenience method) 
function showInfo(message, title = '', options = {}) {
    return showAlert({
        type: 'info',
        title,
        message,
        ...options
    });
}

// Show warning alert (convenience method)
function showWarning(message, title = '', options = {}) {
    return showAlert({
        type: 'warning',
        title,
        message,
        ...options
    });
}

// Show error alert (convenience method)
function showError(message, title = '', options = {}) {
    return showAlert({
        type: 'error',
        title,
        message,
        ...options
    });
}

// Show toast notification (convenience method)
function showToast(message, type = 'info', timeout = 5000) {
    return showAlert({
        type,
        message,
        position: 'toast',
        timeout,
        dismissible: true
    });
}

// Dismiss all alerts of a certain type
function dismissAllAlerts(type = null) {
    const selector = type ? `.alert-${type}` : '.alert';
    const alerts = document.querySelectorAll(selector);
    
    alerts.forEach(alert => {
        dismissAlert(alert.id);
    });
    
    console.log(`Dismissed ${alerts.length} alerts${type ? ' of type: ' + type : ''}`);
}

// Get all currently visible alerts
function getVisibleAlerts() {
    const alerts = Array.from(document.querySelectorAll('.alert:not(.alert-hiding)'));
    return alerts.map(alert => ({
        id: alert.id,
        type: alert.classList.contains('alert-success') ? 'success' :
              alert.classList.contains('alert-info') ? 'info' :
              alert.classList.contains('alert-warning') ? 'warning' :
              alert.classList.contains('alert-error') ? 'error' : 'unknown',
        dismissible: alert.classList.contains('alert-dismissible'),
        element: alert
    }));
}

// Export for main.js
window.Alerts = {
    init: () => {
        initAlerts();
    }
};

// Expose functions globally for onclick handlers and API
window.dismissAlert = dismissAlert;
window.showAlert = showAlert;
window.showSuccess = showSuccess;
window.showInfo = showInfo;
window.showWarning = showWarning;
window.showError = showError;
window.showToast = showToast;
window.dismissAllAlerts = dismissAllAlerts;
window.getVisibleAlerts = getVisibleAlerts;

// ========== ACCORDION Component ==========
/**
 * Accordion Component JavaScript
 */

// Initialize accordion functionality
function initAccordion() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeHeader = document.activeElement;
        
        if (activeHeader.classList.contains('accordion-header')) {
            const accordion = activeHeader.closest('.accordion');
            const headers = Array.from(accordion.querySelectorAll('.accordion-header'));
            const currentIndex = headers.indexOf(activeHeader);
            
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : headers.length - 1;
                    headers[prevIndex].focus();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = currentIndex < headers.length - 1 ? currentIndex + 1 : 0;
                    headers[nextIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    headers[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    headers[headers.length - 1].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    activeHeader.click();
                    break;
            }
        }
    });
    
    console.log('Accordion initialized');
}

// Toggle accordion item
function toggleAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    const isOpen = item.classList.contains('accordion-item-open');
    
    if (isOpen) {
        // Close the item
        collapseAccordionItem(item, header, content);
    } else {
        // Open the item
        expandAccordionItem(item, header, content);
    }
    
    // Trigger custom event
    const toggleEvent = new CustomEvent('accordionToggle', {
        detail: { accordionId, itemId, isOpen: !isOpen, item, header, content }
    });
    accordion.dispatchEvent(toggleEvent);
    
    console.log(`Accordion item ${isOpen ? 'closed' : 'opened'}: ${itemId}`);
}

// Expand accordion item with animation
function expandAccordionItem(item, header, content) {
    // Remove closed class and set up for animation
    content.classList.remove('accordion-content-closed');
    content.classList.add('accordion-animating', 'accordion-expanding');
    
    // Get the natural height
    const height = content.scrollHeight;
    
    // Start with 0 height
    content.style.height = '0px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to full height
    content.style.height = height + 'px';
    
    // Update states
    item.classList.add('accordion-item-open');
    header.setAttribute('aria-expanded', 'true');
    
    // Clean up after animation
    setTimeout(() => {
        content.style.height = '';
        content.classList.remove('accordion-animating', 'accordion-expanding');
    }, 300);
}

// Collapse accordion item with animation
function collapseAccordionItem(item, header, content) {
    // Set up for animation
    content.classList.add('accordion-animating', 'accordion-collapsing');
    content.style.height = content.scrollHeight + 'px';
    
    // Force reflow
    content.offsetHeight;
    
    // Animate to 0 height
    content.style.height = '0px';
    
    // Update states
    item.classList.remove('accordion-item-open');
    header.setAttribute('aria-expanded', 'false');
    
    // Clean up after animation
    setTimeout(() => {
        content.classList.add('accordion-content-closed');
        content.style.height = '';
        content.classList.remove('accordion-animating', 'accordion-collapsing');
    }, 300);
}

// Open accordion item programmatically
function openAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    if (!item.classList.contains('accordion-item-open')) {
        expandAccordionItem(item, header, content);
    }
}

// Close accordion item programmatically
function closeAccordionItem(accordionId, itemId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const item = accordion.querySelector(`#${accordionId}-content-${itemId}`).closest('.accordion-item');
    const header = accordion.querySelector(`#${accordionId}-header-${itemId}`);
    const content = accordion.querySelector(`#${accordionId}-content-${itemId}`);
    
    if (!item || !header || !content) return;
    
    if (item.classList.contains('accordion-item-open')) {
        collapseAccordionItem(item, header, content);
    }
}

// Close all items in an accordion
function closeAllAccordionItems(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const openItems = accordion.querySelectorAll('.accordion-item-open');
    openItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (header && content) {
            collapseAccordionItem(item, header, content);
        }
    });
    
    console.log(`Closed all items in accordion: ${accordionId}`);
}

// Open all items in an accordion
function openAllAccordionItems(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    
    const closedItems = accordion.querySelectorAll('.accordion-item:not(.accordion-item-open)');
    closedItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (header && content) {
            expandAccordionItem(item, header, content);
        }
    });
    
    console.log(`Opened all items in accordion: ${accordionId}`);
}

// Get accordion state
function getAccordionState(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return null;
    
    const items = Array.from(accordion.querySelectorAll('.accordion-item'));
    return items.map(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const itemId = content.id.replace(`${accordionId}-content-`, '');
        
        return {
            id: itemId,
            title: header.querySelector('.accordion-title').textContent,
            isOpen: item.classList.contains('accordion-item-open'),
            element: item
        };
    });
}

// Export for main.js
window.Accordion = {
    init: () => {
        initAccordion();
    }
};

// Expose functions globally for onclick handlers and API
window.toggleAccordionItem = toggleAccordionItem;
window.openAccordionItem = openAccordionItem;
window.closeAccordionItem = closeAccordionItem;
window.closeAllAccordionItems = closeAllAccordionItems;
window.openAllAccordionItems = openAllAccordionItems;
window.getAccordionState = getAccordionState;

// ========== TOOLTIP Component ==========
/**
 * Tooltip Component JavaScript
 */

// Initialize tooltip functionality
function initTooltip() {
    // Find all tooltip triggers
    const triggers = document.querySelectorAll('[data-tooltip]');
    
    triggers.forEach(trigger => {
        // Create tooltip element
        const tooltip = createTooltipElement(trigger);
        
        // Add event listeners
        trigger.addEventListener('mouseenter', () => showTooltip(trigger, tooltip));
        trigger.addEventListener('mouseleave', () => hideTooltip(trigger, tooltip));
        trigger.addEventListener('focus', () => showTooltip(trigger, tooltip));
        trigger.addEventListener('blur', () => hideTooltip(trigger, tooltip));
        
        // Handle keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideTooltip(trigger, tooltip);
                trigger.blur();
            }
        });
    });
    
    // Reposition visible tooltips on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const visibleTooltips = document.querySelectorAll('.tooltip[style*="visible"]');
            visibleTooltips.forEach(tooltip => {
                const trigger = tooltip.closest('[data-tooltip]');
                if (trigger) {
                    positionTooltip(trigger, tooltip);
                }
            });
        }, 100);
    });
    
    console.log(`Initialized ${triggers.length} tooltips`);
}

// Create tooltip element
function createTooltipElement(trigger) {
    const tooltipText = trigger.getAttribute('data-tooltip');
    const position = trigger.getAttribute('data-tooltip-position') || 'top';
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${position}`;
    tooltip.textContent = tooltipText;
    tooltip.setAttribute('role', 'tooltip');
    
    // Add to trigger element
    trigger.appendChild(tooltip);
    
    return tooltip;
}

// Show tooltip
function showTooltip(trigger, tooltip) {
    // Position tooltip to avoid viewport edges
    positionTooltip(trigger, tooltip);
    
    // Show tooltip
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    
    // Update ARIA
    const tooltipId = 'tooltip-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    tooltip.id = tooltipId;
    trigger.setAttribute('aria-describedby', tooltipId);
    
    // Trigger custom event
    const showEvent = new CustomEvent('tooltipShow', {
        detail: { trigger, tooltip }
    });
    trigger.dispatchEvent(showEvent);
}

// Hide tooltip  
function hideTooltip(trigger, tooltip) {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    
    // Clean up ARIA
    trigger.removeAttribute('aria-describedby');
    if (tooltip.id) {
        tooltip.removeAttribute('id');
    }
    
    // Trigger custom event
    const hideEvent = new CustomEvent('tooltipHide', {
        detail: { trigger, tooltip }
    });
    trigger.dispatchEvent(hideEvent);
}

// Position tooltip to avoid viewport edges
function positionTooltip(trigger, tooltip) {
    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 16; // Safe margin from viewport edges
    
    const requestedPosition = trigger.getAttribute('data-tooltip-position') || 'top';
    let bestPosition = requestedPosition;
    let maxVisibleArea = 0;
    
    // Test all positions and find the one with most visible area
    const positions = ['top', 'bottom', 'left', 'right'];
    
    positions.forEach(testPosition => {
        tooltip.className = `tooltip tooltip-${testPosition}`;
        
        // Force reflow to get accurate measurements
        tooltip.offsetHeight;
        
        const tooltipRect = tooltip.getBoundingClientRect();
        let visibleArea = 0;
        
        // Calculate how much of the tooltip would be visible
        const left = Math.max(0, tooltipRect.left);
        const right = Math.min(viewportWidth, tooltipRect.right);
        const top = Math.max(0, tooltipRect.top);
        const bottom = Math.min(viewportHeight, tooltipRect.bottom);
        
        if (left < right && top < bottom) {
            visibleArea = (right - left) * (bottom - top);
        }
        
        // Prefer positions that don't go off-screen at all
        const fullyVisible = tooltipRect.left >= margin && 
                           tooltipRect.right <= viewportWidth - margin &&
                           tooltipRect.top >= margin && 
                           tooltipRect.bottom <= viewportHeight - margin;
        
        if (fullyVisible || visibleArea > maxVisibleArea) {
            if (fullyVisible && !maxVisibleArea) {
                // First fully visible position wins
                maxVisibleArea = tooltipRect.width * tooltipRect.height;
                bestPosition = testPosition;
            } else if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                bestPosition = testPosition;
            }
        }
        
        // Prefer original position if it's fully visible
        if (testPosition === requestedPosition && fullyVisible) {
            bestPosition = requestedPosition;
        }
    });
    
    // Apply the best position
    tooltip.className = `tooltip tooltip-${bestPosition}`;
    
    // Additional fine-tuning for horizontal centering
    if ((bestPosition === 'top' || bestPosition === 'bottom')) {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // If tooltip goes off left edge
        if (tooltipRect.left < margin) {
            const offset = margin - tooltipRect.left;
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateX(-50%)', 
                `translateX(calc(-50% + ${offset}px))`
            );
        }
        // If tooltip goes off right edge  
        else if (tooltipRect.right > viewportWidth - margin) {
            const offset = tooltipRect.right - (viewportWidth - margin);
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateX(-50%)', 
                `translateX(calc(-50% - ${offset}px))`
            );
        }
    }
    
    // Additional fine-tuning for vertical centering
    if ((bestPosition === 'left' || bestPosition === 'right')) {
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // If tooltip goes off top edge
        if (tooltipRect.top < margin) {
            const offset = margin - tooltipRect.top;
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateY(-50%)', 
                `translateY(calc(-50% + ${offset}px))`
            );
        }
        // If tooltip goes off bottom edge
        else if (tooltipRect.bottom > viewportHeight - margin) {
            const offset = tooltipRect.bottom - (viewportHeight - margin);
            tooltip.style.transform = tooltip.style.transform.replace(
                'translateY(-50%)', 
                `translateY(calc(-50% - ${offset}px))`
            );
        }
    }
}

// Show tooltip programmatically
function showTooltipById(tooltipId) {
    const trigger = document.querySelector(`[data-tooltip-id="${tooltipId}"]`);
    if (trigger) {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
            showTooltip(trigger, tooltip);
        }
    }
}

// Hide tooltip programmatically
function hideTooltipById(tooltipId) {
    const trigger = document.querySelector(`[data-tooltip-id="${tooltipId}"]`);
    if (trigger) {
        const tooltip = trigger.querySelector('.tooltip');
        if (tooltip) {
            hideTooltip(trigger, tooltip);
        }
    }
}

// Hide all visible tooltips
function hideAllTooltips() {
    const visibleTooltips = document.querySelectorAll('.tooltip[style*="visible"]');
    visibleTooltips.forEach(tooltip => {
        const trigger = tooltip.closest('[data-tooltip]');
        if (trigger) {
            hideTooltip(trigger, tooltip);
        }
    });
}

// Update tooltip text
function updateTooltipText(trigger, newText) {
    if (typeof trigger === 'string') {
        trigger = document.querySelector(trigger);
    }
    
    if (!trigger) return;
    
    trigger.setAttribute('data-tooltip', newText);
    const tooltip = trigger.querySelector('.tooltip');
    if (tooltip) {
        tooltip.textContent = newText;
    }
}

// Dynamically add tooltip to element
function addTooltip(element, text, position = 'top') {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    // Set data attributes
    element.setAttribute('data-tooltip', text);
    element.setAttribute('data-tooltip-position', position);
    element.classList.add('tooltip-trigger');
    
    // Create and add tooltip
    const tooltip = createTooltipElement(element);
    
    // Add event listeners
    element.addEventListener('mouseenter', () => showTooltip(element, tooltip));
    element.addEventListener('mouseleave', () => hideTooltip(element, tooltip));
    element.addEventListener('focus', () => showTooltip(element, tooltip));
    element.addEventListener('blur', () => hideTooltip(element, tooltip));
    
    return tooltip;
}

// Remove tooltip from element
function removeTooltip(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    // Remove attributes and classes
    element.removeAttribute('data-tooltip');
    element.removeAttribute('data-tooltip-position');
    element.removeAttribute('aria-describedby');
    element.classList.remove('tooltip-trigger');
    
    // Remove tooltip element
    const tooltip = element.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Export for main.js
window.Tooltip = {
    init: () => {
        initTooltip();
    }
};

// Expose functions globally for API
window.showTooltipById = showTooltipById;
window.hideTooltipById = hideTooltipById;
window.hideAllTooltips = hideAllTooltips;
window.updateTooltipText = updateTooltipText;
window.addTooltip = addTooltip;
window.removeTooltip = removeTooltip;

// ========== BREADCRUMB Component ==========
/**
 * Breadcrumb Component JavaScript
 */

// Initialize breadcrumb functionality
function initBreadcrumb() {
    // Handle keyboard navigation for breadcrumb links
    document.addEventListener('keydown', (e) => {
        const activeBreadcrumb = document.activeElement;
        
        if (activeBreadcrumb.closest('.breadcrumb-item')) {
            const breadcrumbNav = activeBreadcrumb.closest('.breadcrumb');
            const breadcrumbLinks = Array.from(breadcrumbNav.querySelectorAll('.breadcrumb-item a'));
            const currentIndex = breadcrumbLinks.indexOf(activeBreadcrumb);
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        breadcrumbLinks[currentIndex - 1].focus();
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentIndex < breadcrumbLinks.length - 1) {
                        breadcrumbLinks[currentIndex + 1].focus();
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    if (breadcrumbLinks.length > 0) {
                        breadcrumbLinks[0].focus();
                    }
                    break;
                case 'End':
                    e.preventDefault();
                    if (breadcrumbLinks.length > 0) {
                        breadcrumbLinks[breadcrumbLinks.length - 1].focus();
                    }
                    break;
            }
        }
    });
    
    console.log('Breadcrumb navigation initialized');
}

// Generate breadcrumb from path
function generateBreadcrumb(path, baseUrl = '', separator = 'chevron') {
    const pathParts = path.split('/').filter(part => part.length > 0);
    const breadcrumbData = [];
    
    // Add home
    breadcrumbData.push({
        label: 'Home',
        url: baseUrl || '/'
    });
    
    // Add path parts
    let currentPath = baseUrl;
    pathParts.forEach((part, index) => {
        currentPath += '/' + part;
        const isLast = index === pathParts.length - 1;
        
        // Convert slug to readable label
        const label = part.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        if (isLast) {
            breadcrumbData.push({
                label: label,
                current: true
            });
        } else {
            breadcrumbData.push({
                label: label,
                url: currentPath
            });
        }
    });
    
    return breadcrumbData;
}

// Update breadcrumb dynamically
function updateBreadcrumb(containerId, breadcrumbData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const breadcrumbList = container.querySelector('.breadcrumb-list');
    if (!breadcrumbList) return;
    
    // Clear existing items
    breadcrumbList.innerHTML = '';
    
    // Add new items
    breadcrumbData.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `breadcrumb-item ${item.current ? 'breadcrumb-current' : ''}`;
        
        if (item.current) {
            li.innerHTML = `<span aria-current="page">${item.label}</span>`;
        } else {
            li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
        }
        
        // Add separator if not last item
        if (index < breadcrumbData.length - 1) {
            li.innerHTML += `
                <span class="breadcrumb-separator" aria-hidden="true">
                    <i class="fas fa-chevron-right"></i>
                </span>
            `;
        }
        
        breadcrumbList.appendChild(li);
    });
    
    console.log(`Updated breadcrumb: ${containerId}`);
}

// Get current breadcrumb data
function getBreadcrumbData(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const items = Array.from(container.querySelectorAll('.breadcrumb-item'));
    return items.map(item => {
        const link = item.querySelector('a');
        const span = item.querySelector('span[aria-current]');
        
        if (link) {
            return {
                label: link.textContent,
                url: link.getAttribute('href'),
                current: false
            };
        } else if (span) {
            return {
                label: span.textContent,
                current: true
            };
        }
    });
}

// Export for main.js
window.Breadcrumb = {
    init: () => {
        initBreadcrumb();
    }
};

// Expose functions globally for API
window.generateBreadcrumb = generateBreadcrumb;
window.updateBreadcrumb = updateBreadcrumb;
window.getBreadcrumbData = getBreadcrumbData;

// ========== BADGE Component ==========
/**
 * Badge Component JavaScript
 */

// Initialize badge functionality
function initBadge() {
    // Handle removable badge functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('badge-remove') || e.target.closest('.badge-remove')) {
            const removeButton = e.target.classList.contains('badge-remove') ? 
                                e.target : e.target.closest('.badge-remove');
            const badge = removeButton.closest('.badge');
            
            if (badge) {
                removeBadge(badge);
            }
        }
    });
    
    // Handle keyboard interaction for removable badges
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && 
            e.target.classList.contains('badge-remove')) {
            e.preventDefault();
            const badge = e.target.closest('.badge');
            if (badge) {
                removeBadge(badge);
            }
        }
    });
    
    console.log('Badge component initialized');
}

// Remove badge with animation
function removeBadge(badge) {
    // Add removing class for animation
    badge.classList.add('badge-removing');
    
    // Trigger custom event
    const removeEvent = new CustomEvent('badgeRemove', {
        detail: { badge, text: badge.textContent.trim() }
    });
    badge.dispatchEvent(removeEvent);
    
    // Remove after animation
    setTimeout(() => {
        if (badge.parentNode) {
            badge.parentNode.removeChild(badge);
        }
    }, 200);
    
    console.log(`Badge removed: ${badge.textContent.trim()}`);
}

// Create badge element
function createBadge(text, type = 'secondary', options = {}) {
    const {
        variant = 'default', // 'default', 'solid', 'outline'
        size = 'default', // 'sm', 'default', 'lg'
        icon = null,
        removable = false,
        dot = false
    } = options;
    
    const badge = document.createElement('span');
    let classes = ['badge', `badge-${type}`];
    
    // Add variant class
    if (variant !== 'default') {
        classes.push(`badge-${variant}`);
    }
    
    // Add size class
    if (size !== 'default') {
        classes.push(`badge-${size}`);
    }
    
    // Add modifier classes
    if (icon) classes.push('badge-icon');
    if (removable) classes.push('badge-removable');
    if (dot) classes.push('badge-dot');
    
    badge.className = classes.join(' ');
    
    // Build content
    let content = '';
    
    if (icon && !dot) {
        content += `<i class="${icon}"></i>`;
    }
    
    if (!dot) {
        content += text;
    }
    
    if (removable && !dot) {
        content += `
            <button class="badge-remove" aria-label="Remove ${text}" tabindex="0">
                <i class="fas fa-times"></i>
            </button>
        `;
    }
    
    badge.innerHTML = content;
    
    return badge;
}

// Add badge to container
function addBadge(container, text, type = 'secondary', options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const badge = createBadge(text, type, options);
    container.appendChild(badge);
    
    // Trigger custom event
    const addEvent = new CustomEvent('badgeAdd', {
        detail: { badge, text, type, options }
    });
    container.dispatchEvent(addEvent);
    
    return badge;
}

// Get all badges in container
function getBadges(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return [];
    
    return Array.from(container.querySelectorAll('.badge')).map(badge => ({
        element: badge,
        text: badge.textContent.trim().replace('×', '').trim(),
        type: Array.from(badge.classList).find(cls => cls.startsWith('badge-') && 
              ['primary', 'secondary', 'success', 'info', 'warning', 'danger'].includes(cls.replace('badge-', '')))?.replace('badge-', ''),
        removable: badge.classList.contains('badge-removable')
    }));
}

// Remove all badges from container
function removeAllBadges(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return;
    
    const badges = container.querySelectorAll('.badge');
    badges.forEach(badge => {
        removeBadge(badge);
    });
    
    console.log(`Removed ${badges.length} badges from container`);
}

// Update badge text
function updateBadgeText(badge, newText) {
    if (typeof badge === 'string') {
        badge = document.querySelector(badge);
    }
    
    if (!badge) return;
    
    // Preserve remove button if exists
    const removeButton = badge.querySelector('.badge-remove');
    const icon = badge.querySelector('i:not(.badge-remove i)');
    
    let content = '';
    if (icon) {
        content += icon.outerHTML;
    }
    content += newText;
    if (removeButton) {
        content += removeButton.outerHTML;
    }
    
    badge.innerHTML = content;
}

// Add CSS for removal animation
const badgeStyles = document.createElement('style');
badgeStyles.textContent = `
    .badge-removing {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(badgeStyles);

// Export for main.js
window.Badge = {
    init: () => {
        initBadge();
    }
};

// Expose functions globally for API
window.createBadge = createBadge;
window.addBadge = addBadge;
window.removeBadge = removeBadge;
window.getBadges = getBadges;
window.removeAllBadges = removeAllBadges;
window.updateBadgeText = updateBadgeText;

// ========== PROGRESS Component ==========
/**
 * Progress Component JavaScript
 */

// Initialize progress functionality
function initProgress() {
    // Initialize all progress bars with animation
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    
    // Use Intersection Observer to animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                // Small delay for better visual effect
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Initialize circular progress bars
    const circularBars = document.querySelectorAll('.progress-circle[data-value]');
    circularBars.forEach(circle => {
        const value = parseInt(circle.getAttribute('data-value'));
        const max = parseInt(circle.getAttribute('data-max')) || 100;
        updateCircularProgress(circle, value, max);
    });
    
    console.log(`Initialized ${progressBars.length} progress bars and ${circularBars.length} circular progress`);
}

// Update progress bar value
function updateProgress(progressElement, value, max = 100) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return;
    
    const progressBar = progressElement.querySelector('.progress-bar');
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    // Update ARIA attributes
    progressElement.setAttribute('aria-valuenow', value);
    progressElement.setAttribute('aria-valuemax', max);
    
    // Update visual progress
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('data-width', percentage + '%');
    
    // Update value display if exists
    const valueDisplay = progressElement.parentNode?.querySelector('.progress-value');
    if (valueDisplay) {
        valueDisplay.textContent = Math.round(percentage) + '%';
    }
    
    // Trigger custom event
    const updateEvent = new CustomEvent('progressUpdate', {
        detail: { value, max, percentage, progressElement }
    });
    progressElement.dispatchEvent(updateEvent);
    
    console.log(`Progress updated: ${Math.round(percentage)}%`);
}

// Animate progress to target value
function animateProgress(progressElement, targetValue, max = 100, duration = 1000) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return;
    
    const currentValue = parseInt(progressElement.getAttribute('aria-valuenow')) || 0;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentAnimatedValue = currentValue + (targetValue - currentValue) * easeOutCubic;
        
        updateProgress(progressElement, currentAnimatedValue, max);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Update circular progress
function updateCircularProgress(circleElement, value, max = 100) {
    if (typeof circleElement === 'string') {
        circleElement = document.querySelector(circleElement);
    }
    
    if (!circleElement) return;
    
    const progressCircle = circleElement.querySelector('.progress-circle-bar');
    const textElement = circleElement.querySelector('.progress-circle-text');
    
    if (!progressCircle) return;
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const circumference = parseFloat(progressCircle.style.strokeDasharray || progressCircle.getAttribute('stroke-dasharray'));
    const offset = circumference - (percentage / 100) * circumference;
    
    progressCircle.style.strokeDashoffset = offset;
    
    if (textElement) {
        textElement.textContent = Math.round(percentage) + '%';
    }
    
    // Update attributes
    circleElement.setAttribute('data-value', value);
    circleElement.setAttribute('data-max', max);
}

// Create progress bar element
function createProgress(value, max = 100, options = {}) {
    const {
        type = 'primary',
        size = 'default',
        label = '',
        showValue = false,
        striped = false,
        animated = false
    } = options;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'progress-item';
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    let headerHTML = '';
    if (label || showValue) {
        headerHTML = `
            <div class="progress-header">
                ${label ? `<span class="progress-label">${label}</span>` : ''}
                ${showValue ? `<span class="progress-value">${Math.round(percentage)}%</span>` : ''}
            </div>
        `;
    }
    
    let classes = ['progress', `progress-${type}`];
    if (size !== 'default') classes.push(`progress-${size}`);
    if (striped) classes.push('progress-striped');
    if (animated) classes.push('progress-animated');
    
    wrapper.innerHTML = `
        ${headerHTML}
        <div class="${classes.join(' ')}" 
             role="progressbar" 
             aria-valuenow="${value}" 
             aria-valuemin="0" 
             aria-valuemax="${max}"
             ${label ? `aria-label="${label} progress"` : ''}>
            <div class="progress-bar" data-width="${percentage}%"></div>
        </div>
    `;
    
    return wrapper;
}

// Create circular progress element
function createCircularProgress(value, max = 100, options = {}) {
    const {
        type = 'primary',
        size = 'default',
        showText = true
    } = options;
    
    const wrapper = document.createElement('div');
    let classes = ['progress-circle', `progress-${type}`];
    if (size !== 'default') classes.push(`progress-${size}`);
    wrapper.className = classes.join(' ');
    
    const radius = size === 'sm' ? 30 : size === 'lg' ? 50 : 40;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;
    
    wrapper.innerHTML = `
        <svg>
            <circle class="progress-circle-bg" cx="50%" cy="50%" r="${radius}"></circle>
            <circle class="progress-circle-bar" cx="50%" cy="50%" r="${radius}" 
                    stroke-dasharray="${circumference}" 
                    stroke-dashoffset="${offset}"></circle>
        </svg>
        ${showText ? `<div class="progress-circle-text">${Math.round(percentage)}%</div>` : ''}
    `;
    
    wrapper.setAttribute('data-value', value);
    wrapper.setAttribute('data-max', max);
    
    return wrapper;
}

// Get progress value
function getProgressValue(progressElement) {
    if (typeof progressElement === 'string') {
        progressElement = document.querySelector(progressElement);
    }
    
    if (!progressElement) return null;
    
    const value = parseInt(progressElement.getAttribute('aria-valuenow')) || 0;
    const max = parseInt(progressElement.getAttribute('aria-valuemax')) || 100;
    
    return {
        value,
        max,
        percentage: (value / max) * 100
    };
}

// Export for main.js
window.Progress = {
    init: () => {
        initProgress();
    }
};

// Expose functions globally for API
window.updateProgress = updateProgress;
window.animateProgress = animateProgress;
window.updateCircularProgress = updateCircularProgress;
window.createProgress = createProgress;
window.createCircularProgress = createCircularProgress;
window.getProgressValue = getProgressValue;

// ========== TESTIMONIALS Component ==========
/**
 * Testimonials Component JavaScript
 */

// Initialize testimonials functionality
function initTestimonials() {
    // Initialize any carousel testimonials
    const carousels = document.querySelectorAll('.testimonials-carousel');
    carousels.forEach(carousel => {
        initTestimonialCarousel(carousel);
    });
    
    console.log(`Initialized ${carousels.length} testimonial carousels`);
}

// Initialize testimonial carousel
function initTestimonialCarousel(carousel) {
    const track = carousel.querySelector('.testimonials-track');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots if container exists
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Navigation button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }
    
    // Auto-advance carousel
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        stopAutoAdvance();
        setTimeout(startAutoAdvance, 3000); // Restart auto-advance after 3s
    }
    
    // Update carousel position and controls
    function updateCarousel() {
        // Move track
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = false; // Allow looping
        }
        if (nextBtn) {
            nextBtn.disabled = false; // Allow looping
        }
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Trigger custom event
        const slideEvent = new CustomEvent('testimonialSlide', {
            detail: { currentIndex, totalSlides, carousel }
        });
        carousel.dispatchEvent(slideEvent);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        stopAutoAdvance();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe left - next slide
                currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            } else {
                // Swipe right - previous slide  
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            }
            updateCarousel();
        }
        
        setTimeout(startAutoAdvance, 3000);
    });
    
    // Start auto-advance
    startAutoAdvance();
    
    return {
        goToSlide,
        next: () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        },
        prev: () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        },
        getCurrentIndex: () => currentIndex,
        getTotalSlides: () => totalSlides
    };
}

// Create testimonial element
function createTestimonial(testimonialData, options = {}) {
    const {
        layout = 'card', // 'card', 'featured', 'compact'
        showRating = true,
        showImage = true
    } = options;
    
    const testimonial = document.createElement('div');
    testimonial.className = layout === 'featured' ? 'testimonial-featured' : 'testimonial-card';
    
    // Build star rating HTML
    let ratingHTML = '';
    if (showRating && testimonialData.rating) {
        ratingHTML = '<div class="testimonial-rating" aria-label="' + testimonialData.rating + ' out of 5 stars">';
        for (let i = 1; i <= 5; i++) {
            if (i <= testimonialData.rating) {
                ratingHTML += '<i class="fas fa-star" aria-hidden="true"></i>';
            } else {
                ratingHTML += '<i class="far fa-star" aria-hidden="true"></i>';
            }
        }
        ratingHTML += '</div>';
    }
    
    // Build testimonial HTML
    testimonial.innerHTML = `
        <div class="testimonial-content">
            ${ratingHTML}
            <blockquote class="testimonial-quote">
                "${testimonialData.quote}"
            </blockquote>
        </div>
        <div class="testimonial-author">
            ${showImage && testimonialData.image ? `<img src="${testimonialData.image}" alt="${testimonialData.author}" class="testimonial-avatar">` : ''}
            <div class="testimonial-info">
                <div class="testimonial-name">${testimonialData.author}</div>
                <div class="testimonial-role">${testimonialData.role}</div>
                ${testimonialData.company ? `<div class="testimonial-company">${testimonialData.company}</div>` : ''}
            </div>
        </div>
    `;
    
    return testimonial;
}

// Add testimonial to container
function addTestimonial(container, testimonialData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const testimonial = createTestimonial(testimonialData, options);
    container.appendChild(testimonial);
    
    // Trigger custom event
    const addEvent = new CustomEvent('testimonialAdd', {
        detail: { testimonial, testimonialData, options }
    });
    container.dispatchEvent(addEvent);
    
    return testimonial;
}

// Get random testimonials
function getRandomTestimonials(testimonials, count = 3) {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export for main.js
window.Testimonials = {
    init: () => {
        initTestimonials();
    }
};

// Expose functions globally for API
window.initTestimonialCarousel = initTestimonialCarousel;
window.createTestimonial = createTestimonial;
window.addTestimonial = addTestimonial;
window.getRandomTestimonials = getRandomTestimonials;

// ========== FEATURES Component ==========
/**
 * Features Component JavaScript
 */

// Initialize features functionality
function initFeatures() {
    // Add intersection observer for animations
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('feature-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe feature items
        const featureItems = document.querySelectorAll('.feature-item, .feature-card, .feature-row');
        featureItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    console.log('Features component initialized');
}

// Add feature item dynamically
function addFeature(container, featureData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const {
        layout = 'grid', // 'grid', 'card', 'row'
        showDetails = true
    } = options;
    
    let featureElement;
    
    if (layout === 'card') {
        featureElement = createFeatureCard(featureData, showDetails);
    } else if (layout === 'row') {
        featureElement = createFeatureRow(featureData, showDetails);
    } else {
        featureElement = createFeatureItem(featureData, showDetails);
    }
    
    container.appendChild(featureElement);
    
    // Trigger custom event
    const addEvent = new CustomEvent('featureAdd', {
        detail: { featureElement, featureData, options }
    });
    container.dispatchEvent(addEvent);
    
    return featureElement;
}

// Create feature item for grid layout
function createFeatureItem(featureData, showDetails = true) {
    const item = document.createElement('div');
    item.className = 'feature-item';
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    item.innerHTML = `
        <div class="feature-icon">
            <i class="${featureData.icon}" aria-hidden="true"></i>
        </div>
        <div class="feature-content">
            <h3 class="feature-title">${featureData.title}</h3>
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return item;
}

// Create feature card
function createFeatureCard(featureData, showDetails = true) {
    const card = document.createElement('div');
    card.className = 'feature-card';
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    card.innerHTML = `
        <div class="feature-card-header">
            <div class="feature-icon">
                <i class="${featureData.icon}" aria-hidden="true"></i>
            </div>
            <h3 class="feature-title">${featureData.title}</h3>
        </div>
        <div class="feature-card-content">
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return card;
}

// Create feature row for alternating layout
function createFeatureRow(featureData, showDetails = true, reverse = false) {
    const row = document.createElement('div');
    row.className = `feature-row ${reverse ? 'feature-row-reverse' : ''}`;
    
    // Build details HTML
    let detailsHTML = '';
    if (showDetails && featureData.details && featureData.details.length > 0) {
        detailsHTML = '<ul class="feature-details">';
        featureData.details.forEach(detail => {
            detailsHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${detail}</li>`;
        });
        detailsHTML += '</ul>';
    }
    
    row.innerHTML = `
        <div class="feature-visual">
            <div class="feature-icon-large">
                <i class="${featureData.icon}" aria-hidden="true"></i>
            </div>
        </div>
        <div class="feature-content">
            <h3 class="feature-title">${featureData.title}</h3>
            <p class="feature-description">${featureData.description}</p>
            ${detailsHTML}
        </div>
    `;
    
    return row;
}

// Animate features on scroll
function animateFeatures() {
    // Add CSS for animations
    const featuresStyle = document.createElement('style');
    featuresStyle.textContent = `
        .feature-item, .feature-card, .feature-row {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card.feature-animate {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(featuresStyle);
}

// Get feature data from DOM
function getFeatureData(featureElement) {
    const icon = featureElement.querySelector('.feature-icon i');
    const title = featureElement.querySelector('.feature-title');
    const description = featureElement.querySelector('.feature-description');
    const details = featureElement.querySelectorAll('.feature-details li');
    
    return {
        icon: icon ? icon.className : '',
        title: title ? title.textContent : '',
        description: description ? description.textContent : '',
        details: Array.from(details).map(li => li.textContent.replace(/^\s*✓\s*/, ''))
    };
}

// Export for main.js
window.Features = {
    init: () => {
        initFeatures();
        animateFeatures();
    }
};

// Expose functions globally for API
window.addFeature = addFeature;
window.createFeatureItem = createFeatureItem;
window.createFeatureCard = createFeatureCard;
window.createFeatureRow = createFeatureRow;
window.getFeatureData = getFeatureData;

// ========== CTA Component ==========
/**
 * Call-to-Action (CTA) Component JavaScript
 */

// Initialize CTA functionality
function initCTA() {
    // Initialize newsletter forms
    initNewsletterForms();
    
    // Initialize countdown timers
    initCountdownTimers();
    
    // Add intersection observer for animations
    if (window.IntersectionObserver) {
        initCTAAnimations();
    }
    
    console.log('CTA component initialized');
}

// Initialize newsletter subscription forms
function initNewsletterForms() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

// Handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button[type="submit"]');
    
    if (!email) return;
    
    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showCTAMessage(form, 'Thank you for subscribing!', 'success');
        
        // Reset form
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
        
        // Trigger custom event
        const subscribeEvent = new CustomEvent('newsletterSubscribe', {
            detail: { email, form }
        });
        form.dispatchEvent(subscribeEvent);
    }, 1000);
}

// Initialize countdown timers
function initCountdownTimers() {
    const countdowns = document.querySelectorAll('.cta-countdown');
    
    countdowns.forEach(countdown => {
        // Set a target date (24 hours from now for demo)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1);
        
        updateCountdown(countdown, targetDate);
        
        // Update every second
        setInterval(() => {
            updateCountdown(countdown, targetDate);
        }, 1000);
    });
}

// Update countdown display
function updateCountdown(countdownElement, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance < 0) {
        // Countdown finished
        countdownElement.innerHTML = '<div class="countdown-finished">Offer Expired</div>';
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    const items = countdownElement.querySelectorAll('.countdown-item');
    if (items.length >= 4) {
        items[0].querySelector('.countdown-value').textContent = String(days).padStart(2, '0');
        items[1].querySelector('.countdown-value').textContent = String(hours).padStart(2, '0');
        items[2].querySelector('.countdown-value').textContent = String(minutes).padStart(2, '0');
        items[3].querySelector('.countdown-value').textContent = String(seconds).padStart(2, '0');
    }
}

// Initialize CTA animations
function initCTAAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('cta-animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe CTA sections
    const ctaSections = document.querySelectorAll('.cta-section');
    ctaSections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for animations
    addCTAAnimationStyles();
}

// Add animation styles
function addCTAAnimationStyles() {
    const ctaStyle = document.createElement('style');
    ctaStyle.textContent = `
        .cta-section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .cta-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .cta-countdown {
            animation: slideInUp 0.8s ease 0.2s both;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .countdown-item {
            animation: fadeInScale 0.6s ease both;
        }
        
        .countdown-item:nth-child(1) { animation-delay: 0.1s; }
        .countdown-item:nth-child(2) { animation-delay: 0.2s; }
        .countdown-item:nth-child(3) { animation-delay: 0.3s; }
        .countdown-item:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(ctaStyle);
}

// Show CTA message
function showCTAMessage(container, message, type = 'info') {
    // Remove existing messages
    const existingMessage = container.querySelector('.cta-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `cta-message cta-message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        margin-top: 1rem;
        text-align: center;
        font-size: 0.9375rem;
        font-weight: 500;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'destructive' : 'muted'});
        color: ${type === 'success' || type === 'error' ? 'white' : 'var(--foreground)'};
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    // Insert message
    container.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Create CTA section dynamically
function createCTASection(ctaData, options = {}) {
    const {
        layout = 'centered',
        background = 'light',
        showFeatures = true
    } = options;
    
    const section = document.createElement('div');
    section.className = `cta-section cta-${layout} cta-${background}`;
    
    let contentHTML = `<div class="cta-content">`;
    
    // Title and description
    contentHTML += `
        <h2 class="cta-title">${ctaData.title}</h2>
        ${ctaData.subtitle ? `<p class="cta-subtitle">${ctaData.subtitle}</p>` : ''}
        <p class="cta-description">${ctaData.description}</p>
    `;
    
    // Buttons
    if (ctaData.buttons && ctaData.buttons.length > 0) {
        contentHTML += '<div class="cta-buttons">';
        ctaData.buttons.forEach(button => {
            contentHTML += `
                <a href="${button.url}" class="button ${button.type || 'primary'}">
                    ${button.icon ? `<i class="${button.icon}" aria-hidden="true"></i>` : ''}
                    ${button.label}
                </a>
            `;
        });
        contentHTML += '</div>';
    }
    
    // Features
    if (showFeatures && ctaData.features && ctaData.features.length > 0) {
        contentHTML += '<ul class="cta-features">';
        ctaData.features.forEach(feature => {
            contentHTML += `<li><i class="fas fa-check" aria-hidden="true"></i> ${feature}</li>`;
        });
        contentHTML += '</ul>';
    }
    
    contentHTML += '</div>';
    section.innerHTML = contentHTML;
    
    return section;
}

// Add CTA section to page
function addCTASection(container, ctaData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const ctaSection = createCTASection(ctaData, options);
    container.appendChild(ctaSection);
    
    // Trigger custom event
    const addEvent = new CustomEvent('ctaAdd', {
        detail: { ctaSection, ctaData, options }
    });
    container.dispatchEvent(addEvent);
    
    return ctaSection;
}

// Track CTA interactions
function trackCTAClick(ctaElement, action = 'click') {
    const title = ctaElement.querySelector('.cta-title')?.textContent || 'Unknown CTA';
    
    // Trigger custom event for analytics
    const trackEvent = new CustomEvent('ctaInteraction', {
        detail: { 
            title, 
            action, 
            element: ctaElement,
            timestamp: new Date().toISOString()
        }
    });
    document.dispatchEvent(trackEvent);
    
    // Console log for demonstration
    console.log('CTA Interaction:', { title, action });
}

// Export for main.js
window.CTA = {
    init: () => {
        initCTA();
    }
};

// Expose functions globally for API
window.createCTASection = createCTASection;
window.addCTASection = addCTASection;
window.showCTAMessage = showCTAMessage;
window.trackCTAClick = trackCTAClick;

// ========== STATS Component ==========
/**
 * Stats/Counter Component JavaScript
 */

// Initialize stats functionality
function initStats() {
    // Initialize counters with intersection observer
    if (window.IntersectionObserver) {
        initStatsObserver();
    } else {
        // Fallback for older browsers
        animateAllStats();
    }
    
    console.log('Stats component initialized');
}

// Initialize intersection observer for stats
function initStatsObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsInElement(entry.target);
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all stats sections
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        observer.observe(section);
    });
}

// Animate stats in a specific element
function animateStatsInElement(element) {
    // Add animation class
    element.classList.add('stat-animate');
    
    // Animate numbers
    const numbers = element.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        animateCounter(number);
    });
    
    // Animate progress bars
    const progressFills = element.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        if (targetWidth) {
            setTimeout(() => {
                fill.style.width = targetWidth + '%';
            }, 200);
        }
    });
}

// Animate all stats (fallback)
function animateAllStats() {
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        animateStatsInElement(section);
    });
}

// Animate counter from 0 to target value
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-value'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const isDecimal = target.toString().includes('.');
    
    if (isNaN(target)) return;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        let currentValue;
        if (isDecimal) {
            currentValue = (target * easedProgress).toFixed(1);
        } else {
            currentValue = Math.floor(target * easedProgress);
        }
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            element.textContent = target;
            
            // Trigger completion event
            const completeEvent = new CustomEvent('counterComplete', {
                detail: { element, target, finalValue: target }
            });
            element.dispatchEvent(completeEvent);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Create stat item dynamically
function createStatItem(statData, options = {}) {
    const {
        layout = 'card', // 'card', 'minimal', 'horizontal'
        color = 'primary',
        showIcon = true,
        showDescription = true
    } = options;
    
    let statElement;
    
    if (layout === 'minimal') {
        statElement = createMinimalStat(statData);
    } else if (layout === 'horizontal') {
        statElement = createHorizontalStat(statData, showIcon);
    } else {
        statElement = createCardStat(statData, color, showIcon, showDescription);
    }
    
    return statElement;
}

// Create card-style stat
function createCardStat(statData, color, showIcon, showDescription) {
    const statItem = document.createElement('div');
    statItem.className = 'stat-item';
    statItem.setAttribute('data-color', color);
    
    let iconHTML = '';
    if (showIcon && statData.icon) {
        iconHTML = `
            <div class="stat-icon">
                <i class="${statData.icon}" aria-hidden="true"></i>
            </div>
        `;
    }
    
    let descriptionHTML = '';
    if (showDescription && statData.description) {
        descriptionHTML = `<p class="stat-description">${statData.description}</p>`;
    }
    
    statItem.innerHTML = `
        ${iconHTML}
        <div class="stat-content">
            <div class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </div>
            <h3 class="stat-label">${statData.label}</h3>
            ${descriptionHTML}
        </div>
    `;
    
    return statItem;
}

// Create minimal stat
function createMinimalStat(statData) {
    const statMinimal = document.createElement('div');
    statMinimal.className = 'stat-minimal';
    
    statMinimal.innerHTML = `
        <div class="stat-value">
            <span class="stat-number" data-value="${statData.value}">0</span>
            <span class="stat-suffix">${statData.suffix || ''}</span>
        </div>
        <div class="stat-label">${statData.label}</div>
        <div class="stat-description">${statData.description || ''}</div>
    `;
    
    return statMinimal;
}

// Create horizontal stat
function createHorizontalStat(statData, showIcon) {
    const statHorizontal = document.createElement('div');
    statHorizontal.className = 'stat-horizontal';
    
    let iconHTML = '';
    if (showIcon && statData.icon) {
        iconHTML = `
            <div class="stat-icon-small">
                <i class="${statData.icon}" aria-hidden="true"></i>
            </div>
        `;
    }
    
    statHorizontal.innerHTML = `
        ${iconHTML}
        <div class="stat-content-horizontal">
            <div class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </div>
            <div class="stat-label">${statData.label}</div>
        </div>
    `;
    
    return statHorizontal;
}

// Add stat to container
function addStat(container, statData, options = {}) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (!container) return null;
    
    const statElement = createStatItem(statData, options);
    container.appendChild(statElement);
    
    // Trigger custom event
    const addEvent = new CustomEvent('statAdd', {
        detail: { statElement, statData, options }
    });
    container.dispatchEvent(addEvent);
    
    return statElement;
}

// Update stat value
function updateStatValue(statElement, newValue, animated = true) {
    const numberElement = statElement.querySelector('.stat-number');
    if (!numberElement) return;
    
    if (animated) {
        numberElement.setAttribute('data-value', newValue);
        animateCounter(numberElement);
    } else {
        numberElement.textContent = newValue;
        numberElement.setAttribute('data-value', newValue);
    }
    
    // Trigger update event
    const updateEvent = new CustomEvent('statUpdate', {
        detail: { statElement, newValue, animated }
    });
    statElement.dispatchEvent(updateEvent);
}

// Create progress stat
function createProgressStat(statData) {
    const progressItem = document.createElement('div');
    progressItem.className = 'stat-progress-item';
    
    progressItem.innerHTML = `
        <div class="stat-progress-header">
            <span class="stat-label">${statData.label}</span>
            <span class="stat-value">
                <span class="stat-number" data-value="${statData.value}">0</span>
                <span class="stat-suffix">${statData.suffix || ''}</span>
            </span>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" data-width="${statData.value}"></div>
        </div>
    `;
    
    return progressItem;
}

// Start real-time counter (for live data)
function startRealtimeCounter(element, options = {}) {
    const {
        increment = 1,
        interval = 1000, // 1 second
        maxValue = null
    } = options;
    
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return null;
    
    let currentValue = parseInt(numberElement.textContent) || 0;
    
    const intervalId = setInterval(() => {
        currentValue += increment;
        
        if (maxValue && currentValue >= maxValue) {
            currentValue = maxValue;
            clearInterval(intervalId);
        }
        
        numberElement.textContent = currentValue;
        numberElement.setAttribute('data-value', currentValue);
        
        // Trigger update event
        const updateEvent = new CustomEvent('realtimeUpdate', {
            detail: { element, currentValue, increment }
        });
        element.dispatchEvent(updateEvent);
    }, interval);
    
    return intervalId;
}

// Stop real-time counter
function stopRealtimeCounter(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

// Format large numbers
function formatStatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
}

// Export for main.js
window.Stats = {
    init: () => {
        initStats();
    }
};

// Expose functions globally for API
window.createStatItem = createStatItem;
window.addStat = addStat;
window.updateStatValue = updateStatValue;
window.createProgressStat = createProgressStat;
window.startRealtimeCounter = startRealtimeCounter;
window.stopRealtimeCounter = stopRealtimeCounter;
window.formatStatNumber = formatStatNumber;
window.animateCounter = animateCounter;

// ========== SIDEBAR Component ==========
/**
 * Sidebar Component JavaScript - Simplified
 */

function toggleSidebar() {
    if (window.innerWidth <= 768) {
        // Mobile: use unified navigation system
        if (window.MobileNav) {
            window.MobileNav.toggle('sidebar');
        }
    } else {
        // Desktop: toggle collapsed state only
        document.body.classList.toggle('sidebar-collapsed');
    }
}

function initSidebar() {
    // Set active navigation item based on current URL
    setActiveSidebarItem();
}

function setActiveSidebarItem() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href !== '#' && currentPath.includes(href)) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to current link
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Compact sidebar toggle
function toggleCompactSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = sidebar.querySelector('.sidebar-toggle-btn i');
    
    sidebar.classList.toggle('sidebar-compact');
    
    // Update button icon
    const isCompact = sidebar.classList.contains('sidebar-compact');
    if (toggleBtn) {
        toggleBtn.className = isCompact ? 'fas fa-expand' : 'fas fa-compress';
    }
    
    // Save preference
    localStorage.setItem('sidebar-compact', isCompact);
}

// Initialize compact state from localStorage
function initCompactSidebar() {
    const isCompact = localStorage.getItem('sidebar-compact') === 'true';
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = sidebar?.querySelector('.sidebar-toggle-btn i');
    
    if (isCompact && sidebar) {
        sidebar.classList.add('sidebar-compact');
        if (toggleBtn) {
            toggleBtn.className = 'fas fa-expand';
        }
    }
}

// Close sidebar (for mobile)
function closeSidebar() {
    if (window.innerWidth <= 768) {
        if (window.MobileNav) {
            window.MobileNav.close();
        }
    }
}

// Export for main.js
window.Sidebar = {
    init: () => {
        initSidebar();
        initCompactSidebar();
    }
};

// Expose functions globally for onclick handlers
window.toggleSidebar = toggleSidebar;
window.toggleCompactSidebar = toggleCompactSidebar;
window.closeSidebar = closeSidebar;

// ========== DASHBOARD Component ==========
/**
 * Dashboard Component JavaScript
 */

function animateDashboardCounters() {
    const counters = document.querySelectorAll('.dashboard-card-value');
    
    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^\d.-]/g, '');
        if (!target || isNaN(target)) return;
        
        const targetNum = parseFloat(target);
        const duration = 2000;
        const increment = targetNum / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            
            // Format the number and preserve original formatting
            const originalText = counter.textContent;
            const formattedNumber = Math.floor(current).toLocaleString();
            const newText = originalText.replace(/[\d,.-]+/, formattedNumber);
            counter.textContent = newText;
        }, 16);
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.dashboard-card-progress-fill');
    
    progressBars.forEach((bar, index) => {
        const percentage = bar.dataset.percentage || 0;
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

function animateChartBars() {
    const chartContainers = document.querySelectorAll('.dashboard-card-chart-container');
    
    chartContainers.forEach(container => {
        const bars = container.querySelectorAll('.dashboard-card-chart-bar');
        
        bars.forEach((bar, index) => {
            const targetHeight = bar.dataset.height || '0';
            bar.style.height = '0px';
            
            setTimeout(() => {
                bar.style.height = targetHeight + 'px';
            }, index * 100);
        });
    });
}

function refreshDashboardCard(cardElement, newData) {
    const valueElement = cardElement.querySelector('.dashboard-card-value');
    const changeElement = cardElement.querySelector('.dashboard-card-change');
    
    if (valueElement && newData.value) {
        valueElement.textContent = newData.value;
    }
    
    if (changeElement && newData.change) {
        const icon = changeElement.querySelector('.dashboard-card-change-icon');
        changeElement.textContent = newData.change.value;
        
        // Update change type
        changeElement.className = changeElement.className.replace(/dashboard-card-change-(positive|negative|neutral)/, '');
        changeElement.classList.add('dashboard-card-change-' + newData.change.type);
        
        // Update icon
        if (icon) {
            icon.className = icon.className.replace(/fa-arrow-(up|down)/, '');
            icon.classList.add('fa-arrow-' + (newData.change.type === 'positive' ? 'up' : 'down'));
            changeElement.insertBefore(icon, changeElement.firstChild);
        }
    }
}

function updateDashboard(data) {
    if (!data || !data.cards) return;
    
    const cards = document.querySelectorAll('.dashboard-card');
    
    data.cards.forEach((cardData, index) => {
        if (cards[index]) {
            refreshDashboardCard(cards[index], cardData);
        }
    });
    
    // Re-animate counters after update
    setTimeout(() => {
        animateDashboardCounters();
    }, 100);
}

function addDashboardInteractivity() {
    // Add hover effects to chart bars
    const chartBars = document.querySelectorAll('.dashboard-card-chart-bar');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', (e) => {
            // Show tooltip if title exists
            if (e.target.title) {
                e.target.style.opacity = '0.8';
            }
        });
        
        bar.addEventListener('mouseleave', (e) => {
            e.target.style.opacity = '1';
        });
    });
    
    // Add click handlers for card actions
    const sectionActions = document.querySelectorAll('.dashboard-section-action');
    
    sectionActions.forEach(action => {
        action.addEventListener('click', (e) => {
            if (action.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Dashboard action clicked:', action.textContent.trim());
            }
        });
    });
}

function initDashboard() {
    // Wait for elements to be in DOM
    setTimeout(() => {
        animateDashboardCounters();
        animateProgressBars();
        animateChartBars();
        addDashboardInteractivity();
    }, 100);
    
    // Set up auto-refresh if needed
    const autoRefresh = document.querySelector('[data-dashboard-refresh]');
    if (autoRefresh) {
        const interval = parseInt(autoRefresh.dataset.dashboardRefresh) || 30000;
        
        setInterval(() => {
            // This would typically fetch new data from an API
            console.log('Dashboard auto-refresh triggered');
            // fetchDashboardData().then(updateDashboard);
        }, interval);
    }
}

// Export for main.js
window.Dashboard = {
    init: initDashboard,
    update: updateDashboard,
    refresh: () => {
        animateDashboardCounters();
        animateProgressBars();
        animateChartBars();
    }
};

// Expose functions globally
window.updateDashboard = updateDashboard;

// ========== DATAGRID Component ==========
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
                    if (expandedRow.classList.contains('datagrid-row-collapsed')) {
                        expandedRow.classList.remove('datagrid-row-collapsed');
                    } else {
                        expandedRow.classList.add('datagrid-row-collapsed');
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
            selectedCountElement.classList.remove('datagrid-count-hidden');
            selectedCountElement.querySelector('strong').textContent = selectedCount;
        } else {
            selectedCountElement.classList.add('datagrid-count-hidden');
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
                        row.classList.remove('datagrid-row-filtered');
                        // Keep expanded row state
                    } else {
                        row.classList.add('datagrid-row-filtered');
                        if (expandedRow && expandedRow.classList.contains('datagrid-row-expanded')) {
                            expandedRow.classList.add('datagrid-row-filtered');
                        }
                    }
                }
            });
        });
    }
});

// ========== SEARCH Component ==========
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
                searchSuggestions.classList.remove('search-suggestions-hidden');
            }
        });
        
        // Hide suggestions on blur (with delay for click handling)
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                searchSuggestions.classList.add('search-suggestions-hidden');
            }, 200);
        });
        
        // Handle input changes
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();
            const clearButton = this.parentElement.querySelector('.search-clear');
            
            if (value.length > 0) {
                clearButton.classList.remove('search-clear-hidden');
                // Here you would typically filter suggestions based on input
                searchSuggestions.classList.remove('search-suggestions-hidden');
            } else {
                clearButton.classList.add('search-clear-hidden');
                searchSuggestions.classList.remove('search-suggestions-hidden');
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
    
    if (filterPanel.classList.contains('search-filter-hidden')) {
        filterPanel.classList.remove('search-filter-hidden');
        filterToggle.classList.add('active');
    } else {
        filterPanel.classList.add('search-filter-hidden');
        filterToggle.classList.remove('active');
    }
}

// Clear search input
function clearSearch() {
    const searchInput = document.getElementById('advancedSearchInput');
    const clearButton = document.querySelector('.search-clear');
    
    searchInput.value = '';
    clearButton.classList.add('search-clear-hidden');
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
        filterCount.classList.remove('search-count-hidden');
    } else {
        filterCount.classList.add('search-count-hidden');
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
        searchTags.classList.remove('search-tags-hidden');
    } else {
        searchTags.classList.add('search-tags-hidden');
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

// ========== ACTIVITY Component ==========
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

// ========== FILEMANAGER Component ==========
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
    uploadArea.classList.add('file-upload-area-hidden');
    uploadProgress.classList.remove('file-upload-progress-hidden');
    
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
        uploadProgress.classList.add('file-upload-progress-hidden');
        uploadArea.classList.remove('file-upload-area-hidden');
        
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
    
    console.log('Found elements:', { 
        gridView: gridView ? 'exists' : 'null', 
        listView: listView ? 'exists' : 'null', 
        gridBtn: gridBtn ? 'exists' : 'null', 
        listBtn: listBtn ? 'exists' : 'null' 
    });
    
    if (view === 'grid') {
        if (gridView) {
            gridView.classList.remove('file-view-hidden');
            console.log('Grid view shown');
        }
        if (listView) {
            listView.classList.add('file-view-hidden');
            console.log('List view hidden');
        }
        if (gridBtn) gridBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
    } else if (view === 'list') {
        if (gridView) {
            gridView.classList.add('file-view-hidden');
            console.log('Grid view hidden');
        }
        if (listView) {
            listView.classList.remove('file-view-hidden');
            console.log('List view shown');
        }
        if (listBtn) listBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
    }
    
    console.log('View changed to:', view);
    console.log('Grid classes:', gridView ? gridView.className : 'no grid');
    console.log('List classes:', listView ? listView.className : 'no list');
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
    
    modal.classList.add('file-preview-modal-open');
}

function closeFilePreview() {
    document.getElementById('filePreviewModal').classList.remove('file-preview-modal-open');
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

// Export for main.js
window.FileManager = {
    init: initFileManager
};

// Expose global functions for onclick handlers (temporary - will be replaced with event delegation)
window.closeFilePreview = closeFilePreview;
window.previewFile = previewFile;
// Create switchView function (alias for setFileView)
function switchView(view) {
    setFileView(view);
}

window.switchView = switchView;
window.setFileView = setFileView;
window.downloadFile = downloadFile;
window.downloadCurrentFile = downloadCurrentFile;

// ========== FAQ Component ==========
/**
 * FAQ Component JavaScript
 */

// Initialize FAQ functionality
function initFAQ() {
    const faqs = document.querySelectorAll('.faq');
    
    faqs.forEach(faq => {
        faq.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            
            const item = question.closest('.faq-item');
            const wasActive = item.classList.contains('active');
            
            // Close all other items in this FAQ
            const allItems = faq.querySelectorAll('.faq-item');
            allItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}

// Export for main.js
window.FAQ = {
    init: initFAQ
};

// ========== BANNER Component ==========
/**
 * Banner Component JavaScript
 */

function initBanner() {
    const banners = document.querySelectorAll('.banner');
    
    banners.forEach(banner => {
        const closeBtn = banner.querySelector('.banner-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                banner.classList.add('banner-closed');
            });
        }
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
} else {
    initBanner();
}

// Export for main.js
window.Banner = {
    init: initBanner
};

// ========== Initialize All Components ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all available components
    const components = [
        'Navigation', 'Forms', 'Dropdown', 'Modal', 'Table', 'Tabs', 
        'Alerts', 'Accordion', 'Tooltip', 'Breadcrumb', 'Badge', 'Progress',
        'Testimonials', 'Features', 'CTA', 'Stats', 'Sidebar', 'Dashboard',
        'DataGrid', 'Search', 'Activity', 'FileManager', 'FAQ', 'Banner'
    ];
    
    components.forEach(component => {
        if (window[component] && typeof window[component].init === 'function') {
            try {
                window[component].init();
                console.log(`✓ ${component} initialized`);
            } catch (error) {
                console.error(`Error initializing ${component}:`, error);
            }
        }
    });
});
