/**
 * Loading Manager Utility
 * Handles loading states and spinner displays throughout the application
 */
class LoadingManager {
    constructor() {
        this.activeLoadings = new Map();
        this.globalLoading = false;
        this.overlay = null;
        
        this.init();
    }

    init() {
        this.createGlobalOverlay();
        this.attachKeyboardHandlers();
    }

    createGlobalOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'loading-overlay';
        this.overlay.setAttribute('aria-hidden', 'true');
        this.overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner-large"></div>
                <div class="loading-message">Loading...</div>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
    }

    attachKeyboardHandlers() {
        // Prevent interactions when global loading is active
        document.addEventListener('keydown', (e) => {
            if (this.globalLoading && e.key === 'Tab') {
                e.preventDefault();
            }
        });
    }

    // Global loading methods
    showGlobal(message = 'Loading...') {
        this.globalLoading = true;
        
        const messageElement = this.overlay.querySelector('.loading-message');
        messageElement.textContent = message;
        
        this.overlay.classList.add('active');
        this.overlay.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.classList.add('loading-active');
        
        // Focus management
        this.trapFocus();
        
        // Announce to screen readers
        this.announceToScreenReader(`Loading: ${message}`);
    }

    hideGlobal() {
        this.globalLoading = false;
        
        this.overlay.classList.remove('active');
        this.overlay.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.classList.remove('loading-active');
        
        // Restore focus
        this.restoreFocus();
    }

    // Element-specific loading methods
    showOnElement(element, options = {}) {
        if (!element) return null;

        const {
            message = 'Loading...',
            size = 'medium',
            overlay = true,
            spinner = true,
            position = 'center'
        } = options;

        const loadingId = this.generateId();
        const loadingElement = this.createElementLoading(message, size, overlay, spinner, position);
        
        // Store original element state
        const originalState = {
            position: element.style.position,
            disabled: element.disabled,
            ariaDisabled: element.getAttribute('aria-disabled'),
            ariaHidden: element.getAttribute('aria-hidden')
        };

        // Apply loading state
        element.style.position = element.style.position || 'relative';
        element.appendChild(loadingElement);
        
        if (element.tagName === 'BUTTON' || element.hasAttribute('disabled')) {
            element.disabled = true;
        }
        element.setAttribute('aria-disabled', 'true');
        
        // Store loading info
        this.activeLoadings.set(loadingId, {
            element,
            loadingElement,
            originalState,
            message
        });

        // Announce to screen readers
        this.announceToScreenReader(`Loading: ${message}`);

        return loadingId;
    }

    hideOnElement(loadingId) {
        const loadingInfo = this.activeLoadings.get(loadingId);
        if (!loadingInfo) return;

        const { element, loadingElement, originalState } = loadingInfo;

        // Remove loading element
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.parentNode.removeChild(loadingElement);
        }

        // Restore original state
        element.style.position = originalState.position;
        
        if (originalState.disabled !== null) {
            element.disabled = originalState.disabled;
        } else {
            element.removeAttribute('disabled');
        }
        
        if (originalState.ariaDisabled !== null) {
            element.setAttribute('aria-disabled', originalState.ariaDisabled);
        } else {
            element.removeAttribute('aria-disabled');
        }

        // Remove from active loadings
        this.activeLoadings.delete(loadingId);

        // Announce completion
        this.announceToScreenReader(`Finished loading: ${loadingInfo.message}`);
    }

    createElementLoading(message, size, overlay, spinner, position) {
        const loading = document.createElement('div');
        loading.className = `element-loading ${overlay ? 'with-overlay' : ''} position-${position}`;
        loading.setAttribute('aria-live', 'polite');
        loading.setAttribute('aria-atomic', 'true');

        const spinnerHtml = spinner ? `<div class="loading-spinner loading-spinner-${size}"></div>` : '';
        const messageHtml = message ? `<div class="loading-text">${this.escapeHtml(message)}</div>` : '';

        loading.innerHTML = `
            <div class="loading-content">
                ${spinnerHtml}
                ${messageHtml}
            </div>
        `;

        return loading;
    }

    // Button-specific loading methods
    setButtonLoading(button, loadingText = 'Loading...') {
        if (!button) return null;

        const loadingId = this.generateId();
        const originalContent = button.innerHTML;
        const originalDisabled = button.disabled;

        // Create loading content
        const loadingContent = `
            <span class="btn-loading">
                <span class="loading-spinner loading-spinner-small"></span>
                ${loadingText}
            </span>
        `;

        // Apply loading state
        button.innerHTML = loadingContent;
        button.disabled = true;
        button.classList.add('loading');
        button.setAttribute('aria-disabled', 'true');

        // Store original state
        this.activeLoadings.set(loadingId, {
            element: button,
            originalContent,
            originalDisabled,
            type: 'button'
        });

        return loadingId;
    }

    clearButtonLoading(loadingId) {
        const loadingInfo = this.activeLoadings.get(loadingId);
        if (!loadingInfo || loadingInfo.type !== 'button') return;

        const { element: button, originalContent, originalDisabled } = loadingInfo;

        // Restore original state
        button.innerHTML = originalContent;
        button.disabled = originalDisabled;
        button.classList.remove('loading');
        
        if (!originalDisabled) {
            button.removeAttribute('aria-disabled');
        }

        // Remove from active loadings
        this.activeLoadings.delete(loadingId);
    }

    // Form-specific loading methods
    setFormLoading(form, message = 'Submitting...') {
        if (!form) return null;

        const loadingId = this.generateId();
        const inputs = form.querySelectorAll('input, select, textarea, button');
        const originalStates = [];

        // Store original states and disable inputs
        inputs.forEach(input => {
            originalStates.push({
                element: input,
                disabled: input.disabled,
                readonly: input.readOnly || false
            });
            
            input.disabled = true;
        });

        // Add loading overlay to form
        const loadingElement = this.createElementLoading(message, 'medium', true, true, 'center');
        form.appendChild(loadingElement);

        // Store loading info
        this.activeLoadings.set(loadingId, {
            element: form,
            loadingElement,
            originalStates,
            type: 'form'
        });

        return loadingId;
    }

    clearFormLoading(loadingId) {
        const loadingInfo = this.activeLoadings.get(loadingId);
        if (!loadingInfo || loadingInfo.type !== 'form') return;

        const { element: form, loadingElement, originalStates } = loadingInfo;

        // Remove loading element
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.parentNode.removeChild(loadingElement);
        }

        // Restore original states
        originalStates.forEach(({ element, disabled, readonly }) => {
            element.disabled = disabled;
            if (element.type !== 'button') {
                element.readOnly = readonly;
            }
        });

        // Remove from active loadings
        this.activeLoadings.delete(loadingId);
    }

    // Progress-specific methods
    showProgress(element, options = {}) {
        const {
            min = 0,
            max = 100,
            value = 0,
            message = 'Processing...',
            showPercentage = true
        } = options;

        const loadingId = this.generateId();
        const progressElement = this.createProgressElement(min, max, value, message, showPercentage);

        element.appendChild(progressElement);

        this.activeLoadings.set(loadingId, {
            element,
            loadingElement: progressElement,
            type: 'progress',
            min,
            max
        });

        return loadingId;
    }

    updateProgress(loadingId, value, message = null) {
        const loadingInfo = this.activeLoadings.get(loadingId);
        if (!loadingInfo || loadingInfo.type !== 'progress') return;

        const { loadingElement, min, max } = loadingInfo;
        const progressBar = loadingElement.querySelector('.progress-bar');
        const progressText = loadingElement.querySelector('.progress-text');
        const progressPercentage = loadingElement.querySelector('.progress-percentage');

        if (progressBar) {
            const percentage = ((value - min) / (max - min)) * 100;
            progressBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
            progressBar.setAttribute('aria-valuenow', value);
            
            if (progressPercentage) {
                progressPercentage.textContent = `${Math.round(percentage)}%`;
            }
        }

        if (message && progressText) {
            progressText.textContent = message;
        }
    }

    createProgressElement(min, max, value, message, showPercentage) {
        const progress = document.createElement('div');
        progress.className = 'element-loading progress-loading';
        
        const percentage = ((value - min) / (max - min)) * 100;
        const percentageText = showPercentage ? `<span class="progress-percentage">${Math.round(percentage)}%</span>` : '';

        progress.innerHTML = `
            <div class="loading-content">
                <div class="progress-text">${this.escapeHtml(message)}</div>
                <div class="progress-container">
                    <div class="progress-track" role="progressbar" aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${value}">
                        <div class="progress-bar" style="width: ${percentage}%"></div>
                    </div>
                    ${percentageText}
                </div>
            </div>
        `;

        return progress;
    }

    // Utility methods
    isLoading(loadingId = null) {
        if (loadingId) {
            return this.activeLoadings.has(loadingId);
        }
        return this.globalLoading || this.activeLoadings.size > 0;
    }

    clearAll() {
        // Clear global loading
        this.hideGlobal();
        
        // Clear all element loadings
        const loadingIds = Array.from(this.activeLoadings.keys());
        loadingIds.forEach(id => {
            const loadingInfo = this.activeLoadings.get(id);
            switch (loadingInfo.type) {
                case 'button':
                    this.clearButtonLoading(id);
                    break;
                case 'form':
                    this.clearFormLoading(id);
                    break;
                default:
                    this.hideOnElement(id);
                    break;
            }
        });
    }

    getActiveLoadings() {
        return Array.from(this.activeLoadings.keys());
    }

    // Accessibility helpers
    trapFocus() {
        // Store currently focused element
        this.previouslyFocused = document.activeElement;
        
        // Focus the loading overlay
        this.overlay.setAttribute('tabindex', '-1');
        this.overlay.focus();
    }

    restoreFocus() {
        this.overlay.removeAttribute('tabindex');
        
        // Restore focus to previously focused element
        if (this.previouslyFocused && this.previouslyFocused.focus) {
            this.previouslyFocused.focus();
        }
        this.previouslyFocused = null;
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    generateId() {
        return 'loading_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Advanced loading patterns
    async withLoading(asyncFunction, options = {}) {
        const { 
            global = false, 
            element = null, 
            message = 'Loading...',
            ...elementOptions 
        } = options;

        let loadingId = null;

        try {
            if (global) {
                this.showGlobal(message);
            } else if (element) {
                loadingId = this.showOnElement(element, { message, ...elementOptions });
            }

            return await asyncFunction();
        } finally {
            if (global) {
                this.hideGlobal();
            } else if (loadingId) {
                this.hideOnElement(loadingId);
            }
        }
    }

    // Loading state management for async operations
    createLoadingState(initialMessage = 'Loading...') {
        let currentLoadingId = null;
        
        return {
            start: (element, message = initialMessage, options = {}) => {
                if (currentLoadingId) {
                    this.stop();
                }
                currentLoadingId = this.showOnElement(element, { message, ...options });
                return currentLoadingId;
            },
            
            update: (message) => {
                if (currentLoadingId) {
                    const loadingInfo = this.activeLoadings.get(currentLoadingId);
                    if (loadingInfo) {
                        const messageElement = loadingInfo.loadingElement.querySelector('.loading-text');
                        if (messageElement) {
                            messageElement.textContent = message;
                        }
                    }
                }
            },
            
            stop: () => {
                if (currentLoadingId) {
                    this.hideOnElement(currentLoadingId);
                    currentLoadingId = null;
                }
            },
            
            isActive: () => currentLoadingId !== null
        };
    }
}

// Create and export singleton instance
const loadingManager = new LoadingManager();

export default loadingManager;
