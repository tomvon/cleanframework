/**
 * Clean Framework JavaScript v1.0
 * Interactive functionality for Clean Framework components
 * 
 * Includes: Navigation, Theme Toggle, Modals, Tabs, Accordions, Carousels, Forms, and Animations
 */

(function() {
    'use strict';

    // Initialize Clean Framework when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeCleanFramework();
    });

    function initializeCleanFramework() {
        initializeTheme();
        initializeMobileNavigation();
        initializeTypingAnimation();
        initializeCarousel();
    }

    // ========================================
    // THEME FUNCTIONALITY
    // ========================================

    function initializeTheme() {
        // Start with light theme by default
        document.documentElement.setAttribute('data-theme', 'light');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }

    window.toggleTheme = function() {
        const html = document.documentElement;
        const themeIcon = document.getElementById('themeIcon');
        const currentTheme = html.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            html.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
        
        // Close mobile nav when theme is toggled on mobile
        closeMobileNav();
    };

    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    function initializeMobileNavigation() {
        // Close mobile nav when clicking on nav links
        document.querySelectorAll('.cf-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
    }

    window.toggleNav = function() {
        const navToggle = document.querySelector('.cf-nav-toggle');
        const navMenu = document.querySelector('.cf-nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    };

    function closeMobileNav() {
        const navToggle = document.querySelector('.cf-nav-toggle');
        const navMenu = document.querySelector('.cf-nav-menu');
        if (navToggle && navToggle.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // ========================================
    // TAB FUNCTIONALITY
    // ========================================

    window.showTab = function(evt, tabName) {
        var i, tabcontent, tabs;
        tabcontent = document.getElementsByClassName("cf-tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("active");
        }
        tabs = document.getElementsByClassName("cf-tab");
        for (i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add("active");
            evt.target.classList.add("active");
        }
    };

    // ========================================
    // ACCORDION FUNCTIONALITY
    // ========================================

    window.toggleAccordion = function(element) {
        element.classList.toggle("active");
    };

    // ========================================
    // MODAL FUNCTIONALITY
    // ========================================

    window.showModal = function(modalId = "demoModal") {
        const modal = document.getElementById(modalId);
        if (modal) {
            // Remove any existing active state first
            modal.classList.remove("active");
            // Force a reflow to ensure the state change is applied
            modal.offsetHeight;
            // Add active state
            modal.classList.add("active");
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId = "demoModal") {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove("active");
            // Restore body scrolling
            document.body.style.overflow = '';
        }
    };

    // Close modal when clicking outside or pressing escape
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('cf-modal')) {
            event.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.cf-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ========================================
    // DROPDOWN FUNCTIONALITY
    // ========================================

    window.toggleDropdown = function(dropdownId = "demoDropdown") {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.toggle("cf-active");
        }
    };

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.cf-dropdown-toggle')) {
            const dropdowns = document.getElementsByClassName('cf-dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].classList.remove('cf-active');
            }
        }
    });

    // ========================================
    // ANIMATION FUNCTIONALITY
    // ========================================

    window.triggerAnimations = function() {
        const demo = document.getElementById("animationDemo");
        if (!demo) return;
        
        const cards = demo.children;
        
        // Reset all animations
        Array.from(cards).forEach(card => {
            card.className = card.className.replace(/cf-animate-\S+/g, '');
        });
        
        // Add new animations with delays
        const animations = ['cf-animate-fadeInUp', 'cf-animate-scaleIn', 'cf-animate-fadeInLeft', 'cf-animate-fadeInRight'];
        animations.forEach((animation, index) => {
            if (cards[index]) {
                setTimeout(() => {
                    cards[index].classList.add(animation);
                }, (index + 1) * 200);
            }
        });
    };

    // ========================================
    // CAROUSEL FUNCTIONALITY
    // ========================================

    let currentSlide = 0;
    const totalSlides = 3;

    function initializeCarousel() {
        // Auto-advance carousel
        setInterval(nextSlide, 5000);
    }

    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };

    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    window.goToSlide = function(index) {
        currentSlide = index;
        updateCarousel();
    };

    function updateCarousel() {
        const container = document.querySelector('#demoCarousel .cf-carousel-container');
        const dots = document.querySelectorAll('#demoCarousel .cf-carousel-dot');
        
        if (container) {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('cf-active', index === currentSlide);
        });
    }

    // ========================================
    // TYPING ANIMATION
    // ========================================

    function initializeTypingAnimation() {
        startTypingAnimation();
    }

    function startTypingAnimation() {
        const text = "This text appears as if it's being typed...";
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;
        
        let i = 0;
        
        typingElement.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Restart after a pause
                setTimeout(() => {
                    i = 0;
                    typingElement.textContent = '';
                    typeWriter();
                }, 3000);
            }
        }
        
        typeWriter();
    }

    // ========================================
    // FORM NODE NAVIGATION
    // ========================================

    let currentFormNode = 0;

    window.nextFormNode = function() {
        const nodes = document.querySelectorAll('#formNodesDemo .cf-form-node');
        if (currentFormNode < nodes.length - 1) {
            nodes[currentFormNode].classList.remove('cf-form-node-active');
            currentFormNode++;
            nodes[currentFormNode].classList.add('cf-form-node-active');
            updateFormProgress();
        }
    };

    window.prevFormNode = function() {
        const nodes = document.querySelectorAll('#formNodesDemo .cf-form-node');
        if (currentFormNode > 0) {
            nodes[currentFormNode].classList.remove('cf-form-node-active');
            currentFormNode--;
            nodes[currentFormNode].classList.add('cf-form-node-active');
            updateFormProgress();
        }
    };

    function updateFormProgress() {
        const progressBar = document.querySelector('#formNodesDemo .cf-form-progress-fill');
        const nodes = document.querySelectorAll('#formNodesDemo .cf-form-node');
        const progress = ((currentFormNode + 1) / nodes.length) * 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    // Add utility class toggle function
    window.cfToggleClass = function(element, className) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.toggle(className);
        }
    };

    // Add utility function to trigger animations on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-cf-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-cf-animate');
                    entry.target.classList.add(animation);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize scroll animations
    document.addEventListener('DOMContentLoaded', initScrollAnimations);

    // ========================================
    // FILE UPLOAD FUNCTIONALITY
    // ========================================

    document.addEventListener('DOMContentLoaded', function() {
        initializeFileUploads();
    });

    function initializeFileUploads() {
        const fileUploads = document.querySelectorAll('.cf-file-upload');
        
        fileUploads.forEach(upload => {
            const input = upload.querySelector('input[type="file"]');
            const area = upload.querySelector('.cf-file-upload-area');
            
            if (!input || !area) return;
            
            // Handle file selection
            input.addEventListener('change', function(e) {
                handleFiles(upload, e.target.files);
            });
            
            // Handle drag and drop
            area.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                upload.classList.add('cf-dragover');
            });
            
            area.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                upload.classList.remove('cf-dragover');
            });
            
            area.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                upload.classList.remove('cf-dragover');
                
                const files = e.dataTransfer.files;
                input.files = files;
                handleFiles(upload, files);
            });
        });
    }

    function handleFiles(uploadElement, files) {
        if (!files || files.length === 0) return;
        
        // Find or create preview area
        let preview = uploadElement.parentElement.querySelector('.cf-file-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'cf-file-preview';
            uploadElement.parentElement.appendChild(preview);
        }
        
        // Clear existing previews
        preview.innerHTML = '';
        
        // Add file previews
        Array.from(files).forEach(file => {
            const fileItem = createFilePreview(file);
            preview.appendChild(fileItem);
        });
        
        // Trigger custom event for developers to handle
        const event = new CustomEvent('cf-file-selected', {
            detail: { files: files },
            bubbles: true
        });
        uploadElement.dispatchEvent(event);
    }

    function createFilePreview(file) {
        const item = document.createElement('div');
        item.className = 'cf-file-item';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-file cf-file-item-icon';
        
        // Set icon based on file type
        if (file.type.startsWith('image/')) {
            icon.className = 'fas fa-image cf-file-item-icon';
        } else if (file.type === 'application/pdf') {
            icon.className = 'fas fa-file-pdf cf-file-item-icon';
        } else if (file.type.includes('word') || file.type.includes('document')) {
            icon.className = 'fas fa-file-word cf-file-item-icon';
        }
        
        const info = document.createElement('div');
        info.className = 'cf-file-item-info';
        
        const name = document.createElement('div');
        name.className = 'cf-file-item-name';
        name.textContent = file.name;
        
        const size = document.createElement('div');
        size.className = 'cf-file-item-size';
        size.textContent = formatFileSize(file.size);
        
        const remove = document.createElement('button');
        remove.className = 'cf-file-item-remove';
        remove.innerHTML = '&times;';
        remove.onclick = function() {
            item.remove();
        };
        
        info.appendChild(name);
        info.appendChild(size);
        
        item.appendChild(icon);
        item.appendChild(info);
        item.appendChild(remove);
        
        // If it's an image, show thumbnail
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                icon.style.display = 'none';
                const img = document.createElement('img');
                img.className = 'cf-file-item-thumbnail';
                img.src = e.target.result;
                item.insertBefore(img, info);
            };
            reader.readAsDataURL(file);
        }
        
        return item;
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
        return Math.round(bytes / 1048576 * 10) / 10 + ' MB';
    }

    // Public API for file uploads
    window.cfFileUpload = {
        getFiles: function(uploadElement) {
            const input = uploadElement.querySelector('input[type="file"]');
            return input ? input.files : null;
        },
        
        clearFiles: function(uploadElement) {
            const input = uploadElement.querySelector('input[type="file"]');
            if (input) input.value = '';
            
            const preview = uploadElement.parentElement.querySelector('.cf-file-preview');
            if (preview) preview.innerHTML = '';
        },
        
        onFileSelected: function(uploadElement, callback) {
            uploadElement.addEventListener('cf-file-selected', function(e) {
                callback(e.detail.files);
            });
        }
    };

})();