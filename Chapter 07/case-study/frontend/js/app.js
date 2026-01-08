/* Simple TaskFlow Application - Educational Focus */

class SimpleTaskFlow {
    constructor() {
        this.tasks = [];
        this.filteredTasks = [];
        this.currentFilters = {
            status: '',
            priority: '',
            search: ''
        };
        
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadTasks();
            this.setupEventListeners();
            this.renderAll();
        } catch (error) {
            this.showError('Failed to initialize application: ' + error.message);
        }
    }

    async loadTasks() {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.tasks = data.tasks || [];
            this.filteredTasks = [...this.tasks];
            
            console.log('Loaded tasks:', this.tasks.length);
        } catch (error) {
            console.error('Error loading tasks:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Filter controls
        const statusFilter = document.getElementById('statusFilter');
        const priorityFilter = document.getElementById('priorityFilter');
        const searchInput = document.getElementById('searchInput');

        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilters.status = e.target.value;
                this.applyFilters();
            });
        }

        if (priorityFilter) {
            priorityFilter.addEventListener('change', (e) => {
                this.currentFilters.priority = e.target.value;
                this.applyFilters();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        console.log('Event listeners set up');
    }

    applyFilters() {
        this.filteredTasks = this.tasks.filter(task => {
            // Status filter
            if (this.currentFilters.status && task.status !== this.currentFilters.status) {
                return false;
            }

            // Priority filter
            if (this.currentFilters.priority && task.priority !== this.currentFilters.priority) {
                return false;
            }

            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search;
                const searchableText = `${task.title} ${task.description} ${task.assignee}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            return true;
        });

        console.log('Filtered tasks:', this.filteredTasks.length);
        this.renderTaskBoard();
        this.renderStatistics();
    }

    renderAll() {
        this.renderStatistics();
        this.renderTaskBoard();
        this.hideLoading();
    }

    renderStatistics() {
        const stats = this.calculateStatistics();
        
        // Update stat cards
        this.updateStatCard('totalTasks', stats.total);
        this.updateStatCard('todoTasks', stats.todo);
        this.updateStatCard('inProgressTasks', stats.inProgress);
        this.updateStatCard('completedTasks', stats.completed);
        this.updateStatCard('highPriorityTasks', stats.highPriority);
    }

    updateStatCard(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    calculateStatistics() {
        const stats = {
            total: this.filteredTasks.length,
            todo: 0,
            inProgress: 0,
            completed: 0,
            highPriority: 0
        };

        this.filteredTasks.forEach(task => {
            switch (task.status) {
                case 'todo':
                    stats.todo++;
                    break;
                case 'in-progress':
                    stats.inProgress++;
                    break;
                case 'completed':
                    stats.completed++;
                    break;
            }

            if (task.priority === 'high') {
                stats.highPriority++;
            }
        });

        return stats;
    }

    renderTaskBoard() {
        const columns = {
            'todo': document.getElementById('todoColumn'),
            'in-progress': document.getElementById('inProgressColumn'),
            'completed': document.getElementById('completedColumn')
        };

        // Clear existing tasks
        Object.values(columns).forEach(column => {
            if (column) {
                const tasksContainer = column.querySelector('.tasks');
                if (tasksContainer) {
                    tasksContainer.innerHTML = '';
                }
            }
        });

        // Group tasks by status
        const tasksByStatus = {
            'todo': [],
            'in-progress': [],
            'completed': []
        };

        this.filteredTasks.forEach(task => {
            if (tasksByStatus[task.status]) {
                tasksByStatus[task.status].push(task);
            }
        });

        // Render tasks in each column
        Object.entries(tasksByStatus).forEach(([status, tasks]) => {
            const column = columns[status];
            if (column) {
                const tasksContainer = column.querySelector('.tasks');
                const countElement = column.querySelector('.count');
                
                if (countElement) {
                    countElement.textContent = tasks.length;
                }

                if (tasksContainer) {
                    tasks.forEach(task => {
                        const taskElement = this.createTaskElement(task);
                        tasksContainer.appendChild(taskElement);
                    });
                }
            }
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-card priority-${task.priority}`;

        taskDiv.innerHTML = `
            <div class="task-title">${this.escapeHtml(task.title)}</div>
            <div class="task-description">${this.escapeHtml(task.description)}</div>
            <div class="task-meta">
                <span class="task-assignee">${this.escapeHtml(task.assignee)}</span>
                <span class="task-priority ${task.priority}">${task.priority}</span>
            </div>
        `;

        return taskDiv;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoading() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
    }

    hideLoading() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    showError(message) {
        this.hideLoading();
        
        // Create or update error element
        let errorElement = document.getElementById('error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error';
            errorElement.className = 'error';
            
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertBefore(errorElement, mainContent.firstChild);
            }
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SimpleTaskFlow...');
    window.taskFlow = new SimpleTaskFlow();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleTaskFlow;
}
