<?php
/**
 * Multi-Step Form Component
 * 
 * Expected data:
 * $form_steps = [
 *     [
 *         'title' => 'Personal Information',
 *         'description' => 'Tell us about yourself',
 *         'fields' => [ ... ] // Same format as regular form fields
 *     ],
 *     ...
 * ]
 */

$total_steps = count($form_steps ?? []);
?>

<form class="form form-multi" <?= !empty($form_action) ? 'action="' . $form_action . '"' : '' ?> 
      <?= !empty($form_method) ? 'method="' . $form_method . '"' : 'method="POST"' ?>>
    
    <!-- Progress Bar -->
    <div class="progress">
        <div class="bar">
            <div class="fill" data-initial-width="<?= (100 / $total_steps) ?>"></div>
        </div>
        
        <div class="steps">
            <?php foreach ($form_steps as $index => $step): ?>
                <div class="step <?= $index === 0 ? 'active' : '' ?>" data-step="<?= $index ?>">
                    <div class="number"><?= $index + 1 ?></div>
                    <div class="label"><?= $step['label'] ?? $step['title'] ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <!-- Form Nodes -->
    <div class="nodes">
        <?php foreach ($form_steps as $index => $step): ?>
            <div class="node <?= $index === 0 ? 'active' : '' ?>" data-node="<?= $index ?>">
                <h3 class="title"><?= $step['title'] ?></h3>
                <?php if (!empty($step['description'])): ?>
                    <p class="description"><?= $step['description'] ?></p>
                <?php endif; ?>
                
                <?php foreach ($step['fields'] ?? [] as $field): ?>
                    <div class="group">
                        <label><?= $field['label'] ?></label>
                        
                        <?php if ($field['type'] === 'textarea'): ?>
                            <textarea name="<?= $field['name'] ?>" 
                                      placeholder="<?= $field['placeholder'] ?? '' ?>"
                                      <?= ($field['required'] ?? false) ? 'required' : '' ?>><?= $field['value'] ?? '' ?></textarea>
                        
                        <?php elseif ($field['type'] === 'select'): ?>
                            <select name="<?= $field['name'] ?>" 
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                <?php foreach ($field['options'] as $value => $label): ?>
                                    <option value="<?= $value ?>" 
                                            <?= ($field['value'] ?? '') === $value ? 'selected' : '' ?>>
                                        <?= $label ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        
                        <?php elseif (in_array($field['type'], ['checkbox', 'radio'])): ?>
                            <div class="options">
                                <?php foreach ($field['options'] as $value => $label): ?>
                                    <div class="option">
                                        <input type="<?= $field['type'] ?>" 
                                               id="<?= $field['name'] ?>_<?= $value ?>"
                                               name="<?= $field['name'] ?><?= $field['type'] === 'checkbox' ? '[]' : '' ?>"
                                               value="<?= $value ?>"
                                               <?= (isset($field['value']) && is_array($field['value']) ? in_array($value, $field['value']) : ($field['value'] ?? '') === $value) ? 'checked' : '' ?>
                                               <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                        <label for="<?= $field['name'] ?>_<?= $value ?>"><?= $label ?></label>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        
                        <?php elseif ($field['type'] === 'range'): ?>
                            <input type="range" 
                                   name="<?= $field['name'] ?>"
                                   value="<?= $field['value'] ?? $field['min'] ?? 0 ?>"
                                   min="<?= $field['min'] ?? 0 ?>"
                                   max="<?= $field['max'] ?? 100 ?>"
                                   step="<?= $field['step'] ?? 1 ?>"
                                   <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                            <div class="range-display">
                                <span><?= $field['min'] ?? 0 ?></span>
                                <span class="current-value"><?= $field['value'] ?? $field['min'] ?? 0 ?></span>
                                <span><?= $field['max'] ?? 100 ?></span>
                            </div>
                        
                        <?php elseif ($field['type'] === 'password'): ?>
                            <div class="password-field">
                                <input type="password" 
                                       id="<?= $field['name'] ?>"
                                       name="<?= $field['name'] ?>"
                                       value="<?= $field['value'] ?? '' ?>"
                                       placeholder="<?= $field['placeholder'] ?? '' ?>"
                                       <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                <button type="button" class="password-toggle" onclick="togglePassword('<?= $field['name'] ?>')">
                                    <svg class="eye-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <svg class="eye-closed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                </button>
                            </div>
                        
                        <?php elseif ($field['type'] === 'star-rating'): ?>
                            <div class="star-rating">
                                <?php for ($i = ($field['max'] ?? 5); $i >= 1; $i--): ?>
                                    <input type="radio" 
                                           id="<?= $field['name'] ?>_<?= $i ?>"
                                           name="<?= $field['name'] ?>"
                                           value="<?= $i ?>"
                                           <?= ($field['value'] ?? 0) == $i ? 'checked' : '' ?>>
                                    <label for="<?= $field['name'] ?>_<?= $i ?>">★</label>
                                <?php endfor; ?>
                            </div>
                        
                        <?php elseif ($field['type'] === 'toggle'): ?>
                            <div class="toggle-switch">
                                <input type="checkbox" 
                                       id="<?= $field['name'] ?>"
                                       name="<?= $field['name'] ?>"
                                       value="1"
                                       <?= ($field['value'] ?? false) ? 'checked' : '' ?>>
                                <span class="toggle-slider"></span>
                            </div>
                        
                        <?php elseif ($field['type'] === 'input-group'): ?>
                            <div class="input-group">
                                <?php if (!empty($field['prefix'])): ?>
                                    <span class="input-prefix"><?= $field['prefix'] ?></span>
                                <?php endif; ?>
                                <input type="<?= $field['input_type'] ?? 'text' ?>" 
                                       name="<?= $field['name'] ?>"
                                       value="<?= $field['value'] ?? '' ?>"
                                       placeholder="<?= $field['placeholder'] ?? '' ?>"
                                       <?= isset($field['min']) ? 'min="' . $field['min'] . '"' : '' ?>
                                       <?= isset($field['max']) ? 'max="' . $field['max'] . '"' : '' ?>
                                       <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                <?php if (!empty($field['suffix'])): ?>
                                    <span class="input-suffix"><?= $field['suffix'] ?></span>
                                <?php endif; ?>
                            </div>
                        
                        <?php elseif ($field['type'] === 'file-upload-area'): ?>
                            <div class="file-upload-area" data-field="<?= $field['name'] ?>" onclick="document.getElementById('<?= $field['name'] ?>').click()">
                                <div class="upload-content">
                                    <div class="upload-icon">📁</div>
                                    <div class="upload-text">Click to browse or drag files here</div>
                                    <div class="upload-hint">Supports: <?= $field['accept'] ?? 'All file types' ?></div>
                                </div>
                                <div class="file-previews"></div>
                                <div class="upload-actions">
                                    <button type="button" class="clear-all" onclick="clearAllFiles('<?= $field['name'] ?>', event)">Clear All</button>
                                </div>
                                <input type="file" 
                                       id="<?= $field['name'] ?>"
                                       name="<?= $field['name'] ?>"
                                       multiple
                                       <?= isset($field['accept']) ? 'accept="' . $field['accept'] . '"' : '' ?>
                                       <?= ($field['required'] ?? false) ? 'required' : '' ?>
                                       onchange="handleFileSelect(this)">
                            </div>
                        
                        <?php elseif ($field['type'] === 'select' && isset($field['multiple'])): ?>
                            <select name="<?= $field['name'] ?>[]" 
                                    multiple 
                                    <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                                <?php foreach ($field['options'] as $value => $label): ?>
                                    <option value="<?= $value ?>" 
                                            <?= (is_array($field['value'] ?? []) && in_array($value, $field['value'])) ? 'selected' : '' ?>>
                                        <?= $label ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        
                        <?php else: ?>
                            <input type="<?= $field['type'] ?? 'text' ?>" 
                                   name="<?= $field['name'] ?>"
                                   value="<?= $field['value'] ?? '' ?>"
                                   placeholder="<?= $field['placeholder'] ?? '' ?>"
                                   <?= isset($field['min']) ? 'min="' . $field['min'] . '"' : '' ?>
                                   <?= isset($field['max']) ? 'max="' . $field['max'] . '"' : '' ?>
                                   <?= isset($field['step']) ? 'step="' . $field['step'] . '"' : '' ?>
                                   <?= isset($field['accept']) ? 'accept="' . $field['accept'] . '"' : '' ?>
                                   <?= ($field['required'] ?? false) ? 'required' : '' ?>>
                        <?php endif; ?>
                        
                        <?php if (!empty($field['help'])): ?>
                            <div class="help"><?= $field['help'] ?></div>
                        <?php endif; ?>
                        
                        <?php if (!empty($field['error'])): ?>
                            <div class="error"><?= $field['error'] ?></div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </div>
    
    <!-- Navigation -->
    <div class="navigation">
        <div class="left">
            <button type="button" class="button secondary" onclick="previousStep()">
                Previous
            </button>
        </div>
        <div class="right">
            <button type="button" class="button primary" onclick="nextStep()">
                Next
            </button>
            <button type="submit" class="button primary">
                <?= $submit_label ?? 'Submit' ?>
            </button>
        </div>
    </div>
</form>