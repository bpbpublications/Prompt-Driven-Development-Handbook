/**
 * TaskForm Component
 * Handles task creation and editing with validation
 */
class TaskForm {
    constructor(container, tasksAPI, notificationManager) {
        this.container = container;
        this.tasksAPI = tasksAPI;
        this.notificationManager = notificationManager;
        this.currentTask = null;
        this.isEditing = false;
        
        this.init();
    }

    init() {
        this.createFormStructure();
        this.attachEventListeners();
    }

    createFormStructure() {
        this.container.innerHTML = `
            <form class="task-form" novalidate>
                <div class="form-header">
                    <h3 class="form-title">Add New Task</h3>
                    <button type="button" class="close-btn" aria-label="Close form">
                        <span class="icon">×</span>
                    </button>
                </div>
                
                <div class="form-body">
                    <div class="form-group">
                        <label for="task-title" class="required">
                            Title
                            <span class="required-indicator" aria-hidden="true">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="task-title" 
                            name="title" 
                            required 
                            maxlength="100"
                            aria-describedby="title-error"
                            class="form-input">
                        <div class="error-message" id="title-error" role="alert"></div>
                        <div class="char-count">
                            <span class="current">0</span>/<span class="max">100</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="task-description">Description</label>
                        <textarea 
                            id="task-description" 
                            name="description" 
                            rows="3" 
                            maxlength="500"
                            aria-describedby="description-error"
                            class="form-input"
                            placeholder="Optional task description..."></textarea>
                        <div class="error-message" id="description-error" role="alert"></div>
                        <div class="char-count">
                            <span class="current">0</span>/<span class="max">500</span>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="task-status" class="required">
                                Status
                                <span class="required-indicator" aria-hidden="true">*</span>
                            </label>
                            <select 
                                id="task-status" 
                                name="status" 
                                required
                                aria-describedby="status-error"
                                class="form-input">
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <div class="error-message" id="status-error" role="alert"></div>
                        </div>

                        <div class="form-group">
                            <label for="task-priority" class="required">
                                Priority
                                <span class="required-indicator" aria-hidden="true">*</span>
                            </label>
                            <select 
                                id="task-priority" 
                                name="priority" 
                                required
                                aria-describedby="priority-error"
                                class="form-input">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div class="error-message" id="priority-error" role="alert"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="task-due-date">Due Date</label>
                        <input 
                            type="date" 
                            id="task-due-date" 
                            name="dueDate"
                            aria-describedby="due-date-error"
                            class="form-input">
                        <div class="error-message" id="due-date-error" role="alert"></div>
                        <div class="form-hint">
                            Optional: Set a due date for this task
                        </div>
                    </div>
                </div>

                <div class="form-footer">
                    <button type="button" class="btn btn-secondary cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary submit-btn">
                        <span class="btn-text">Create Task</span>
                        <span class="btn-loading" style="display: none;">
                            <span class="loading-spinner"></span>
                            Creating...
                        </span>
                    </button>
                </div>
            </form>
        `;
    }

    attachEventListeners() {
        const form = this.container.querySelector('.task-form');
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Close button
        form.addEventListener('click', (e) => {
            if (e.target.closest('.close-btn') || e.target.closest('.cancel-btn')) {
                this.close();
            }
        });

        // Real-time validation
        form.addEventListener('input', (e) => {
            this.validateField(e.target);
            this.updateCharCount(e.target);
        });

        form.addEventListener('blur', (e) => {
            this.validateField(e.target);
        }, true);

        // Keyboard shortcuts
        form.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.handleSubmit();
            }
        });

        // Set minimum date to today
        const dueDateInput = form.querySelector('#task-due-date');
        dueDateInput.min = new Date().toISOString().split('T')[0];
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            return;
        }

        const formData = this.getFormData();
        const submitBtn = this.container.querySelector('.submit-btn');
        
        this.setLoading(true);
        
        try {
            let result;
            if (this.isEditing) {
                result = await this.tasksAPI.updateTask(this.currentTask.id, {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                this.notificationManager.show('Task updated successfully', 'success');
            } else {
                result = await this.tasksAPI.createTask({
                    ...formData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                this.notificationManager.show('Task created successfully', 'success');
            }

            const event = new CustomEvent(this.isEditing ? 'task:updated' : 'task:created', {
                detail: { task: result },
                bubbles: true
            });
            this.container.dispatchEvent(event);
            
            this.close();
        } catch (error) {
            console.error('Error saving task:', error);
            this.notificationManager.show(
                this.isEditing ? 'Failed to update task' : 'Failed to create task', 
                'error'
            );
        } finally {
            this.setLoading(false);
        }
    }

    validateForm() {
        const form = this.container.querySelector('.task-form');
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const errorElement = this.container.querySelector(`#${field.getAttribute('aria-describedby')}`);
        let isValid = true;
        let errorMessage = '';

        // Clear previous validation state
        field.classList.remove('error', 'valid');
        if (errorElement) {
            errorElement.textContent = '';
        }

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = `${this.getFieldLabel(field)} is required`;
            isValid = false;
        }
        
        // Field-specific validation
        if (field.value.trim()) {
            switch (field.name) {
                case 'title':
                    if (field.value.length < 3) {
                        errorMessage = 'Title must be at least 3 characters long';
                        isValid = false;
                    } else if (field.value.length > 100) {
                        errorMessage = 'Title must be less than 100 characters';
                        isValid = false;
                    }
                    break;
                    
                case 'description':
                    if (field.value.length > 500) {
                        errorMessage = 'Description must be less than 500 characters';
                        isValid = false;
                    }
                    break;
                    
                case 'dueDate':
                    const dueDate = new Date(field.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (dueDate < today) {
                        errorMessage = 'Due date cannot be in the past';
                        isValid = false;
                    }
                    break;
            }
        }

        // Update UI based on validation result
        if (isValid) {
            field.classList.add('valid');
        } else {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }

        return isValid;
    }

    updateCharCount(field) {
        const charCountElement = field.parentElement.querySelector('.char-count .current');
        if (charCountElement) {
            charCountElement.textContent = field.value.length;
        }
    }

    getFieldLabel(field) {
        const label = this.container.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    getFormData() {
        const form = this.container.querySelector('.task-form');
        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value.trim();
        }

        // Convert empty strings to null for optional fields
        if (!data.description) data.description = null;
        if (!data.dueDate) data.dueDate = null;

        return data;
    }

    setLoading(isLoading) {
        const submitBtn = this.container.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    // Public methods for external interaction
    open(task = null, defaultStatus = 'todo') {
        this.currentTask = task;
        this.isEditing = !!task;
        
        // Update form title and submit button
        const title = this.container.querySelector('.form-title');
        const submitBtn = this.container.querySelector('.submit-btn .btn-text');
        
        if (this.isEditing) {
            title.textContent = 'Edit Task';
            submitBtn.textContent = 'Update Task';
            this.populateForm(task);
        } else {
            title.textContent = 'Add New Task';
            submitBtn.textContent = 'Create Task';
            this.resetForm();
            
            // Set default status if provided
            const statusSelect = this.container.querySelector('#task-status');
            statusSelect.value = defaultStatus;
        }

        // Show the modal/form
        this.container.style.display = 'block';
        this.container.classList.add('active');
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = this.container.querySelector('#task-title');
            firstInput.focus();
        }, 100);
    }

    close() {
        this.container.classList.remove('active');
        setTimeout(() => {
            this.container.style.display = 'none';
            this.resetForm();
        }, 200);
    }

    populateForm(task) {
        const form = this.container.querySelector('.task-form');
        
        form.querySelector('#task-title').value = task.title || '';
        form.querySelector('#task-description').value = task.description || '';
        form.querySelector('#task-status').value = task.status || 'todo';
        form.querySelector('#task-priority').value = task.priority || 'medium';
        
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate).toISOString().split('T')[0];
            form.querySelector('#task-due-date').value = dueDate;
        }

        // Update character counts
        ['#task-title', '#task-description'].forEach(selector => {
            const field = form.querySelector(selector);
            this.updateCharCount(field);
        });
    }

    resetForm() {
        const form = this.container.querySelector('.task-form');
        form.reset();
        
        // Clear validation states
        form.querySelectorAll('.error, .valid').forEach(el => {
            el.classList.remove('error', 'valid');
        });
        
        form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Reset character counts
        form.querySelectorAll('.char-count .current').forEach(el => {
            el.textContent = '0';
        });
        
        // Reset loading state
        this.setLoading(false);
        
        // Reset form state
        this.currentTask = null;
        this.isEditing = false;
    }

    // Accessibility helpers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        document.body.appendChild(announcement);
        announcement.textContent = message;
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

export default TaskForm;
