/**
 * TaskBoard Component
 * Manages the visual representation of tasks in different status columns
 */
class TaskBoard {
    constructor(container, tasksAPI, notificationManager) {
        this.container = container;
        this.tasksAPI = tasksAPI;
        this.notificationManager = notificationManager;
        this.tasks = [];
        this.currentFilter = { status: 'all', priority: 'all', search: '' };
        
        this.init();
    }

    init() {
        this.createBoardStructure();
        this.attachEventListeners();
    }

    createBoardStructure() {
        this.container.innerHTML = `
            <div class="task-board">
                <div class="board-column" data-status="todo">
                    <div class="column-header">
                        <h3>To Do</h3>
                        <span class="task-count" data-status="todo">0</span>
                    </div>
                    <div class="column-content" data-status="todo">
                        <div class="task-list" data-status="todo"></div>
                        <button class="add-task-btn" data-status="todo" aria-label="Add new task to To Do">
                            <span class="icon">+</span>
                            Add Task
                        </button>
                    </div>
                </div>
                
                <div class="board-column" data-status="in-progress">
                    <div class="column-header">
                        <h3>In Progress</h3>
                        <span class="task-count" data-status="in-progress">0</span>
                    </div>
                    <div class="column-content" data-status="in-progress">
                        <div class="task-list" data-status="in-progress"></div>
                        <button class="add-task-btn" data-status="in-progress" aria-label="Add new task to In Progress">
                            <span class="icon">+</span>
                            Add Task
                        </button>
                    </div>
                </div>
                
                <div class="board-column" data-status="done">
                    <div class="column-header">
                        <h3>Done</h3>
                        <span class="task-count" data-status="done">0</span>
                    </div>
                    <div class="column-content" data-status="done">
                        <div class="task-list" data-status="done"></div>
                        <button class="add-task-btn" data-status="done" aria-label="Add new task to Done">
                            <span class="icon">+</span>
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add task buttons
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.add-task-btn')) {
                const status = e.target.closest('.add-task-btn').dataset.status;
                this.handleAddTask(status);
            }
        });

        // Task card interactions
        this.container.addEventListener('click', (e) => {
            const taskCard = e.target.closest('.task-card');
            if (!taskCard) return;

            const taskId = parseInt(taskCard.dataset.taskId);

            if (e.target.closest('.task-edit-btn')) {
                this.handleEditTask(taskId);
            } else if (e.target.closest('.task-delete-btn')) {
                this.handleDeleteTask(taskId);
            } else if (e.target.closest('.task-status-btn')) {
                this.handleStatusChange(taskId, e.target.closest('.task-status-btn').dataset.newStatus);
            }
        });

        // Drag and drop for task status changes
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        // Make task cards draggable
        this.container.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
                e.target.classList.add('dragging');
            }
        });

        this.container.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-card')) {
                e.target.classList.remove('dragging');
            }
        });

        // Make columns drop targets
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const column = e.target.closest('.board-column');
            if (column) {
                column.classList.add('drag-over');
            }
        });

        this.container.addEventListener('dragleave', (e) => {
            const column = e.target.closest('.board-column');
            if (column && !column.contains(e.relatedTarget)) {
                column.classList.remove('drag-over');
            }
        });

        this.container.addEventListener('drop', async (e) => {
            e.preventDefault();
            const column = e.target.closest('.board-column');
            if (column) {
                column.classList.remove('drag-over');
                const taskId = parseInt(e.dataTransfer.getData('text/plain'));
                const newStatus = column.dataset.status;
                await this.handleStatusChange(taskId, newStatus);
            }
        });
    }

    async handleAddTask(status) {
        const event = new CustomEvent('task:add', { 
            detail: { defaultStatus: status },
            bubbles: true 
        });
        this.container.dispatchEvent(event);
    }

    async handleEditTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const event = new CustomEvent('task:edit', { 
                detail: { task },
                bubbles: true 
            });
            this.container.dispatchEvent(event);
        }
    }

    async handleDeleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await this.tasksAPI.deleteTask(taskId);
            this.notificationManager.show('Task deleted successfully', 'success');
            
            const event = new CustomEvent('task:deleted', { 
                detail: { taskId },
                bubbles: true 
            });
            this.container.dispatchEvent(event);
        } catch (error) {
            console.error('Error deleting task:', error);
            this.notificationManager.show('Failed to delete task', 'error');
        }
    }

    async handleStatusChange(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task || task.status === newStatus) return;

        try {
            const updatedTask = await this.tasksAPI.updateTask(taskId, { 
                ...task, 
                status: newStatus,
                updatedAt: new Date().toISOString()
            });
            
            this.notificationManager.show(`Task moved to ${newStatus.replace('-', ' ')}`, 'success');
            
            const event = new CustomEvent('task:updated', { 
                detail: { task: updatedTask },
                bubbles: true 
            });
            this.container.dispatchEvent(event);
        } catch (error) {
            console.error('Error updating task status:', error);
            this.notificationManager.show('Failed to update task status', 'error');
        }
    }

    updateTasks(tasks, filter = null) {
        this.tasks = tasks;
        if (filter) {
            this.currentFilter = filter;
        }
        
        const filteredTasks = this.applyFilters(tasks);
        this.renderTasks(filteredTasks);
        this.updateTaskCounts(filteredTasks);
    }

    applyFilters(tasks) {
        return tasks.filter(task => {
            const statusMatch = this.currentFilter.status === 'all' || task.status === this.currentFilter.status;
            const priorityMatch = this.currentFilter.priority === 'all' || task.priority === this.currentFilter.priority;
            const searchMatch = !this.currentFilter.search || 
                task.title.toLowerCase().includes(this.currentFilter.search.toLowerCase()) ||
                task.description.toLowerCase().includes(this.currentFilter.search.toLowerCase());
            
            return statusMatch && priorityMatch && searchMatch;
        });
    }

    renderTasks(tasks) {
        const columns = ['todo', 'in-progress', 'done'];
        
        columns.forEach(status => {
            const taskList = this.container.querySelector(`.task-list[data-status="${status}"]`);
            const columnTasks = tasks.filter(task => task.status === status);
            
            taskList.innerHTML = columnTasks.map(task => this.createTaskCard(task)).join('');
        });
    }

    createTaskCard(task) {
        const priorityClass = `priority-${task.priority}`;
        const dueDateClass = this.getDueDateClass(task.dueDate);
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';
        
        return `
            <div class="task-card ${priorityClass} ${dueDateClass}" 
                 data-task-id="${task.id}" 
                 draggable="true"
                 role="article"
                 aria-labelledby="task-title-${task.id}">
                <div class="task-header">
                    <h4 class="task-title" id="task-title-${task.id}">${this.escapeHtml(task.title)}</h4>
                    <div class="task-actions">
                        <button class="task-edit-btn" aria-label="Edit task" title="Edit task">
                            <span class="icon">✏️</span>
                        </button>
                        <button class="task-delete-btn" aria-label="Delete task" title="Delete task">
                            <span class="icon">🗑️</span>
                        </button>
                    </div>
                </div>
                
                ${task.description ? `
                    <p class="task-description">${this.escapeHtml(task.description)}</p>
                ` : ''}
                
                <div class="task-meta">
                    <span class="task-priority priority-${task.priority}" 
                          aria-label="Priority: ${task.priority}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    
                    ${dueDate ? `
                        <span class="task-due-date ${dueDateClass}" 
                              aria-label="Due date: ${dueDate}">
                            📅 ${dueDate}
                        </span>
                    ` : ''}
                </div>
                
                <div class="task-status-actions">
                    ${this.getStatusButtons(task.status)}
                </div>
            </div>
        `;
    }

    getStatusButtons(currentStatus) {
        const statusFlow = {
            'todo': ['in-progress'],
            'in-progress': ['todo', 'done'],
            'done': ['in-progress']
        };
        
        const availableStatuses = statusFlow[currentStatus] || [];
        
        return availableStatuses.map(status => `
            <button class="task-status-btn btn-sm" 
                    data-new-status="${status}"
                    aria-label="Move to ${status.replace('-', ' ')}">
                Move to ${status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
        `).join('');
    }

    getDueDateClass(dueDate) {
        if (!dueDate) return '';
        
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'overdue';
        if (diffDays <= 1) return 'due-soon';
        if (diffDays <= 3) return 'due-upcoming';
        return '';
    }

    updateTaskCounts(tasks) {
        const counts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        
        ['todo', 'in-progress', 'done'].forEach(status => {
            const countElement = this.container.querySelector(`.task-count[data-status="${status}"]`);
            if (countElement) {
                countElement.textContent = counts[status] || 0;
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public methods for external interaction
    addTask(task) {
        this.tasks.push(task);
        this.updateTasks(this.tasks, this.currentFilter);
    }

    updateTask(updatedTask) {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.updateTasks(this.tasks, this.currentFilter);
        }
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.updateTasks(this.tasks, this.currentFilter);
    }

    applyFilter(filter) {
        this.currentFilter = { ...this.currentFilter, ...filter };
        this.updateTasks(this.tasks, this.currentFilter);
    }

    highlightTask(taskId) {
        const taskCard = this.container.querySelector(`[data-task-id="${taskId}"]`);
        if (taskCard) {
            taskCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            taskCard.classList.add('highlighted');
            setTimeout(() => {
                taskCard.classList.remove('highlighted');
            }, 2000);
        }
    }
}

export default TaskBoard;
