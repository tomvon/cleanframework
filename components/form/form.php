<?php
/**
 * Form Component
 */
?>

<form class="form" <?= !empty($form_action) ? 'action="' . $form_action . '"' : '' ?> 
      <?= !empty($form_method) ? 'method="' . $form_method . '"' : 'method="POST"' ?>>
    
    <?php foreach ($form_fields ?? [] as $field): ?>
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
            
            <?php else: ?>
                <input type="<?= $field['type'] ?? 'text' ?>" 
                       name="<?= $field['name'] ?>"
                       value="<?= $field['value'] ?? '' ?>"
                       placeholder="<?= $field['placeholder'] ?? '' ?>"
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
    
    <div class="buttons">
        <button type="submit" class="button primary">
            <?= $submit_label ?? 'Submit' ?>
        </button>
        
        <?php if ($show_reset ?? false): ?>
            <button type="reset" class="button secondary">Reset</button>
        <?php endif; ?>
    </div>
</form>