/**
 * Notification Manager Utility
 * Handles displaying user notifications and alerts
 */
class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 4000;
        
        this.init();
    }

    init() {
        this.createContainer();
        this.attachGlobalEventListeners();
    }

    createContainer() {
        // Remove existing container if it exists
        const existing = document.querySelector('.notification-container');
        if (existing) {
            existing.remove();
        }

        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-label', 'Notifications');
        
        document.body.appendChild(this.container);
    }

    attachGlobalEventListeners() {
        // Handle clicks on notifications
        this.container.addEventListener('click', (e) => {
            const notification = e.target.closest('.notification');
            if (notification) {
                if (e.target.closest('.notification-close')) {
                    this.dismiss(notification.dataset.notificationId);
                } else if (e.target.closest('.notification-action')) {
                    const action = e.target.closest('.notification-action').dataset.action;
                    this.handleAction(notification.dataset.notificationId, action);
                }
            }
        });

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            const notification = e.target.closest('.notification');
            if (!notification) return;

            if (e.key === 'Escape') {
                this.dismiss(notification.dataset.notificationId);
            } else if (e.key === 'Enter' && e.target.classList.contains('notification-action')) {
                const action = e.target.dataset.action;
                this.handleAction(notification.dataset.notificationId, action);
            }
        });
    }

    show(message, type = 'info', options = {}) {
        const notification = this.createNotification(message, type, options);
        this.addNotification(notification);
        return notification.id;
    }

    createNotification(message, type, options) {
        const id = this.generateId();
        const {
            duration = this.defaultDuration,
            persistent = false,
            actions = [],
            title = null,
            icon = null,
            allowHtml = false
        } = options;

        const notification = {
            id,
            message,
            type,
            title,
            icon,
            actions,
            duration,
            persistent,
            allowHtml,
            timestamp: Date.now(),
            element: null,
            timer: null
        };

        notification.element = this.createNotificationElement(notification);
        return notification;
    }

    createNotificationElement(notification) {
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.dataset.notificationId = notification.id;
        element.setAttribute('role', 'alert');
        element.setAttribute('aria-atomic', 'true');

        // Add appropriate ARIA attributes based on type
        if (notification.type === 'error') {
            element.setAttribute('aria-live', 'assertive');
        } else {
            element.setAttribute('aria-live', 'polite');
        }

        const iconHtml = this.getIconForType(notification.type, notification.icon);
        const titleHtml = notification.title ? `<div class="notification-title">${this.escapeHtml(notification.title)}</div>` : '';
        const messageHtml = notification.allowHtml ? notification.message : this.escapeHtml(notification.message);
        const actionsHtml = this.createActionsHtml(notification.actions);

        element.innerHTML = `
            <div class="notification-content">
                ${iconHtml}
                <div class="notification-body">
                    ${titleHtml}
                    <div class="notification-message">${messageHtml}</div>
                    ${actionsHtml}
                </div>
                <button class="notification-close" aria-label="Close notification" title="Close">
                    <span class="icon">×</span>
                </button>
            </div>
            <div class="notification-progress" style="display: ${notification.persistent ? 'none' : 'block'}"></div>
        `;

        return element;
    }

    getIconForType(type, customIcon) {
        if (customIcon) {
            return `<div class="notification-icon custom">${customIcon}</div>`;
        }

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const icon = icons[type] || icons.info;
        return `<div class="notification-icon">${icon}</div>`;
    }

    createActionsHtml(actions) {
        if (!actions || actions.length === 0) {
            return '';
        }

        const actionsHtml = actions.map(action => `
            <button class="notification-action btn btn-sm" 
                    data-action="${action.id}"
                    ${action.primary ? 'data-primary="true"' : ''}>
                ${this.escapeHtml(action.label)}
            </button>
        `).join('');

        return `<div class="notification-actions">${actionsHtml}</div>`;
    }

    addNotification(notification) {
        // Limit the number of notifications
        while (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            this.removeNotificationElement(oldest);
        }

        this.notifications.push(notification);
        this.container.appendChild(notification.element);

        // Trigger entry animation
        requestAnimationFrame(() => {
            notification.element.classList.add('notification-enter');
        });

        // Set auto-dismiss timer if not persistent
        if (!notification.persistent && notification.duration > 0) {
            notification.timer = setTimeout(() => {
                this.dismiss(notification.id);
            }, notification.duration);

            // Update progress bar
            this.updateProgressBar(notification);
        }

        // Announce to screen readers
        this.announceNotification(notification);

        return notification.id;
    }

    updateProgressBar(notification) {
        const progressBar = notification.element.querySelector('.notification-progress');
        if (!progressBar) return;

        progressBar.style.animation = `notificationProgress ${notification.duration}ms linear`;
    }

    dismiss(notificationId) {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index === -1) return;

        const notification = this.notifications[index];
        this.notifications.splice(index, 1);

        // Clear timer
        if (notification.timer) {
            clearTimeout(notification.timer);
        }

        // Trigger exit animation
        notification.element.classList.add('notification-exit');
        
        setTimeout(() => {
            this.removeNotificationElement(notification);
        }, 300); // Match CSS transition duration
    }

    removeNotificationElement(notification) {
        if (notification.element && notification.element.parentNode) {
            notification.element.parentNode.removeChild(notification.element);
        }
    }

    handleAction(notificationId, actionId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;

        const action = notification.actions.find(a => a.id === actionId);
        if (!action) return;

        // Execute action callback if provided
        if (action.callback && typeof action.callback === 'function') {
            action.callback(notification);
        }

        // Emit custom event
        const event = new CustomEvent('notification:action', {
            detail: {
                notificationId,
                actionId,
                notification,
                action
            }
        });
        document.dispatchEvent(event);

        // Auto-dismiss after action unless specified otherwise
        if (action.dismissOnClick !== false) {
            this.dismiss(notificationId);
        }
    }

    announceNotification(notification) {
        // Create a temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', notification.type === 'error' ? 'assertive' : 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        
        const message = notification.title ? 
            `${notification.title}: ${notification.message}` : 
            notification.message;
        
        announcement.textContent = `${notification.type} notification: ${message}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Convenience methods for different notification types
    success(message, options = {}) {
        return this.show(message, 'success', options);
    }

    error(message, options = {}) {
        return this.show(message, 'error', { 
            persistent: true, 
            duration: 0,
            ...options 
        });
    }

    warning(message, options = {}) {
        return this.show(message, 'warning', {
            duration: 6000,
            ...options
        });
    }

    info(message, options = {}) {
        return this.show(message, 'info', options);
    }

    // Advanced notification methods
    confirm(message, options = {}) {
        return new Promise((resolve) => {
            const confirmOptions = {
                persistent: true,
                actions: [
                    {
                        id: 'cancel',
                        label: options.cancelLabel || 'Cancel',
                        callback: () => resolve(false)
                    },
                    {
                        id: 'confirm',
                        label: options.confirmLabel || 'Confirm',
                        primary: true,
                        callback: () => resolve(true)
                    }
                ],
                title: options.title || 'Confirmation',
                ...options
            };

            this.show(message, 'warning', confirmOptions);
        });
    }

    prompt(message, options = {}) {
        return new Promise((resolve) => {
            // Create a custom notification with input field
            const promptOptions = {
                persistent: true,
                allowHtml: true,
                actions: [
                    {
                        id: 'cancel',
                        label: 'Cancel',
                        callback: () => resolve(null)
                    },
                    {
                        id: 'submit',
                        label: 'Submit',
                        primary: true,
                        callback: (notification) => {
                            const input = notification.element.querySelector('.prompt-input');
                            resolve(input ? input.value : null);
                        }
                    }
                ],
                title: options.title || 'Input Required',
                ...options
            };

            const inputHtml = `
                ${message}
                <div class="notification-input-group">
                    <input type="text" 
                           class="prompt-input" 
                           placeholder="${options.placeholder || ''}"
                           value="${options.defaultValue || ''}"
                           ${options.required ? 'required' : ''}
                           style="margin-top: 8px; width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            `;

            this.show(inputHtml, 'info', promptOptions);
        });
    }

    // Utility methods
    dismissAll() {
        const notificationIds = this.notifications.map(n => n.id);
        notificationIds.forEach(id => this.dismiss(id));
    }

    dismissByType(type) {
        const notificationsToClose = this.notifications
            .filter(n => n.type === type)
            .map(n => n.id);
        
        notificationsToClose.forEach(id => this.dismiss(id));
    }

    generateId() {
        return 'notification_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Configuration methods
    setMaxNotifications(max) {
        this.maxNotifications = max;
    }

    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }

    // State queries
    getActiveNotifications() {
        return this.notifications.map(n => ({
            id: n.id,
            type: n.type,
            message: n.message,
            timestamp: n.timestamp
        }));
    }

    hasActiveNotifications() {
        return this.notifications.length > 0;
    }

    getNotificationCount() {
        return this.notifications.length;
    }

    getNotificationsByType(type) {
        return this.notifications.filter(n => n.type === type);
    }
}

// Create and export singleton instance
const notificationManager = new NotificationManager();

export default notificationManager;
