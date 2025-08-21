<?php
/**
 * Modal Component
 * 
 * Usage:
 * Include this file and call openModal('modal-id') from JavaScript
 * 
 * @param array $modal_data Array containing:
 *   - id: Unique identifier for the modal
 *   - title: Modal title
 *   - content: Modal body content (HTML allowed)
 *   - size: 'small', 'medium' (default), 'large', 'full'
 *   - footer: Optional footer content
 *   - closable: Whether modal can be closed (default true)
 */

// Example modal data - replace with your data
$modals = $modals ?? [
    [
        'id' => 'example-modal',
        'title' => 'Example Modal',
        'content' => '<p>This is a simple modal dialog. You can put any content here.</p>',
        'size' => 'medium',
        'footer' => '
            <button class="button secondary" onclick="closeModal(\'example-modal\')">Cancel</button>
            <button class="button primary">Save Changes</button>
        '
    ],
    [
        'id' => 'confirm-modal',
        'title' => 'Confirm Action',
        'content' => '<p>Are you sure you want to proceed with this action?</p>',
        'size' => 'small',
        'footer' => '
            <button class="button secondary" onclick="closeModal(\'confirm-modal\')">Cancel</button>
            <button class="button danger" onclick="confirmAction()">Confirm</button>
        '
    ],
    [
        'id' => 'form-modal',
        'title' => 'Contact Form',
        'content' => '
            <form class="form">
                <div class="group">
                    <label for="modal-name">Name</label>
                    <input type="text" id="modal-name" name="name" required>
                </div>
                <div class="group">
                    <label for="modal-email">Email</label>
                    <input type="email" id="modal-email" name="email" required>
                </div>
                <div class="group">
                    <label for="modal-message">Message</label>
                    <textarea id="modal-message" name="message" rows="4" required></textarea>
                </div>
            </form>
        ',
        'size' => 'medium',
        'footer' => '
            <button class="button secondary" onclick="closeModal(\'form-modal\')">Cancel</button>
            <button class="button primary" onclick="submitModalForm()">Send Message</button>
        '
    ],
    [
        'id' => 'image-modal',
        'title' => 'Image Gallery',
        'content' => '
            <div class="modal-gallery">
                <img src="img/samples/pexels-pixabay-414320.jpg" alt="Full size image" class="modal-gallery-image">
                <p class="modal-gallery-caption">Click the image to view full size</p>
            </div>
        ',
        'size' => 'large',
        'footer' => null
    ]
];
?>

<!-- Modal Container -->
<div class="modal-container">
    <?php foreach ($modals as $modal): ?>
        <div class="modal" id="<?= $modal['id'] ?>" data-size="<?= $modal['size'] ?? 'medium' ?>">
            <div class="modal-backdrop" onclick="closeModal('<?= $modal['id'] ?>')"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <?php if ($modal['closable'] ?? true): ?>
                        <button class="modal-close" onclick="closeModal('<?= $modal['id'] ?>')" aria-label="Close modal">
                            <i class="fas fa-times"></i>
                        </button>
                    <?php endif; ?>
                    
                    <div class="modal-header">
                        <h2 class="modal-title"><?= $modal['title'] ?></h2>
                    </div>
                    
                    <div class="modal-body">
                        <?= $modal['content'] ?>
                    </div>
                    
                    <?php if (isset($modal['footer'])): ?>
                        <div class="modal-footer">
                            <?= $modal['footer'] ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<!-- Example trigger buttons for demonstration -->
<div class="modal-examples">
    <button class="button primary" onclick="openModal('example-modal')">
        Open Example Modal
    </button>
    <button class="button secondary" onclick="openModal('confirm-modal')">
        Open Confirm Dialog
    </button>
    <button class="button primary" onclick="openModal('form-modal')">
        Open Form Modal
    </button>
    <button class="button secondary" onclick="openModal('image-modal')">
        Open Image Modal
    </button>
</div>