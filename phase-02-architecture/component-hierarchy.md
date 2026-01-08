# TaskFlow Frontend Component Hierarchy

## Component Architecture Overview

The TaskFlow frontend follows a modular component architecture where each component has a single responsibility and clear interfaces. This structure promotes code reusability, maintainability, and effective AI collaboration during development.

## Component Tree Structure

```
App (app.js)
├── AppHeader
│   ├── Logo
│   └── Navigation
├── FilterBar
│   ├── StatusFilter
│   ├── PriorityFilter
│   └── SearchInput
├── TaskBoard
│   ├── BoardColumn (Todo)
│   │   ├── ColumnHeader
│   │   └── TaskList
│   │       └── TaskCard [multiple]
│   ├── BoardColumn (In Progress)
│   │   ├── ColumnHeader
│   │   └── TaskList
│   │       └── TaskCard [multiple]
│   └── BoardColumn (Completed)
│       ├── ColumnHeader
│       └── TaskList
│           └── TaskCard [multiple]
├── TaskForm (Modal)
│   ├── FormHeader
│   ├── TaskFormFields
│   │   ├── TitleInput
│   │   ├── DescriptionInput
│   │   └── PrioritySelect
│   └── FormActions
└── StatisticsPanel
    ├── CompletionStats
    ├── PriorityDistribution
    └── TaskCounts
```

## Core Components

### 1. App Component (`js/app.js`)

**Responsibilities:**
- Application initialization and state management
- Global event coordination
- API integration and data flow
- Error handling and user feedback

**Interface:**
```javascript
class App {
  constructor() {
    this.state = {
      tasks: [],
      filters: {
        status: 'all',
        priority: 'all',
        search: ''
      },
      loading: false,
      error: null
    };
  }
  
  // Public methods
  async init()
  async loadTasks()
  async createTask(taskData)
  async updateTask(taskId, updates)
  async deleteTask(taskId)
  applyFilters(filters)
  handleError(error)
}
```

**Key Features:**
- Central state management
- API communication coordination
- Component lifecycle management
- Global error boundary

### 2. TaskBoard Component (`js/components/taskBoard.js`)

**Responsibilities:**
- Kanban board layout and rendering
- Task organization by status
- Column management and statistics
- Responsive layout handling

**Interface:**
```javascript
class TaskBoard {
  constructor(container, app) {
    this.container = container;
    this.app = app;
    this.columns = ['todo', 'in-progress', 'completed'];
  }
  
  // Public methods
  render(tasks)
  updateBoard(tasks)
  handleTaskMove(taskId, newStatus)
  calculateStats(tasks)
  getTasksByStatus(tasks, status)
}
```

**Data Flow:**
```
App State → TaskBoard.render() → BoardColumn.render() → TaskCard.render()
```

### 3. TaskCard Component (`js/components/taskCard.js`)

**Responsibilities:**
- Individual task display and interaction
- Task metadata presentation
- Status change handling
- Edit/delete action triggers

**Interface:**
```javascript
class TaskCard {
  constructor(taskData, callbacks) {
    this.task = taskData;
    this.callbacks = {
      onStatusChange: callbacks.onStatusChange,
      onEdit: callbacks.onEdit,
      onDelete: callbacks.onDelete
    };
  }
  
  // Public methods
  render()
  update(taskData)
  handleStatusChange(newStatus)
  handleEdit()
  handleDelete()
  destroy()
}
```

**HTML Structure:**
```html
<div class="task-card" data-task-id="${task.id}">
  <div class="task-header">
    <h3 class="task-title">${task.title}</h3>
    <span class="task-priority priority-${task.priority}">${task.priority}</span>
  </div>
  <div class="task-body">
    <p class="task-description">${task.description}</p>
    <div class="task-meta">
      <span class="task-date">${formattedDate}</span>
    </div>
  </div>
  <div class="task-actions">
    <button class="btn-status-change">Move</button>
    <button class="btn-edit">Edit</button>
    <button class="btn-delete">Delete</button>
  </div>
</div>
```

### 4. TaskForm Component (`js/components/taskForm.js`)

**Responsibilities:**
- Task creation and editing forms
- Input validation and sanitization
- Form submission handling
- Modal dialog management

**Interface:**
```javascript
class TaskForm {
  constructor(container, callbacks) {
    this.container = container;
    this.callbacks = {
      onSubmit: callbacks.onSubmit,
      onCancel: callbacks.onCancel
    };
    this.mode = 'create'; // 'create' or 'edit'
    this.taskData = null;
  }
  
  // Public methods
  showCreateForm()
  showEditForm(taskData)
  hide()
  validateForm()
  handleSubmit(event)
  reset()
}
```

**Form Validation:**
```javascript
validateForm() {
  const errors = {};
  
  if (!this.titleInput.value.trim()) {
    errors.title = 'Title is required';
  } else if (this.titleInput.value.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  if (this.descriptionInput.value.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  if (!this.prioritySelect.value) {
    errors.priority = 'Priority is required';
  }
  
  return errors;
}
```

### 5. FilterBar Component (`js/components/filterBar.js`)

**Responsibilities:**
- Filter controls rendering
- Search functionality
- Filter state management
- Filter change event handling

**Interface:**
```javascript
class FilterBar {
  constructor(container, callback) {
    this.container = container;
    this.onFilterChange = callback;
    this.filters = {
      status: 'all',
      priority: 'all',
      search: ''
    };
  }
  
  // Public methods
  render()
  updateFilters(newFilters)
  handleStatusFilter(status)
  handlePriorityFilter(priority)
  handleSearch(searchTerm)
  reset()
}
```

## Component Communication Patterns

### 1. Parent-Child Communication

**Data Down (Props):**
```javascript
// Parent passes data to child
const taskCard = new TaskCard(taskData, {
  onStatusChange: this.handleTaskStatusChange.bind(this),
  onEdit: this.handleTaskEdit.bind(this),
  onDelete: this.handleTaskDelete.bind(this)
});
```

**Events Up (Callbacks):**
```javascript
// Child notifies parent of changes
class TaskCard {
  handleStatusChange(newStatus) {
    this.callbacks.onStatusChange(this.task.id, newStatus);
  }
}
```

### 2. Sibling Communication

**Through Parent Component:**
```javascript
class App {
  handleTaskUpdate(taskId, updates) {
    // Update task in state
    this.updateTaskInState(taskId, updates);
    
    // Notify affected components
    this.taskBoard.updateBoard(this.state.tasks);
    this.statisticsPanel.updateStats(this.state.tasks);
  }
}
```

### 3. Event-Driven Communication

**Custom Events:**
```javascript
// Emit custom event
const taskUpdateEvent = new CustomEvent('taskUpdate', {
  detail: { taskId, updates }
});
document.dispatchEvent(taskUpdateEvent);

// Listen for custom event
document.addEventListener('taskUpdate', (event) => {
  this.handleTaskUpdate(event.detail);
});
```

## State Management

### 1. Component State

**Local State:**
```javascript
class TaskCard {
  constructor(taskData, callbacks) {
    this.task = taskData; // Immutable props
    this.state = {
      isEditing: false,
      isLoading: false
    }; // Mutable local state
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render(); // Re-render on state change
  }
}
```

**Global State (App Level):**
```javascript
class App {
  constructor() {
    this.state = {
      tasks: [],
      filters: { status: 'all', priority: 'all', search: '' },
      ui: { loading: false, error: null, activeModal: null }
    };
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.updateComponents();
  }
}
```

### 2. Data Flow

**Unidirectional Data Flow:**
```
User Action → Component Handler → App State Update → Component Re-render
```

**Example Flow:**
```javascript
// 1. User clicks "Complete" on task card
TaskCard.handleStatusChange() 
// 2. Task card notifies app
→ App.handleTaskStatusChange()
// 3. App updates API and state
→ API.updateTask() → App.setState()
// 4. App re-renders affected components
→ TaskBoard.updateBoard() → TaskCard.render()
```

## Component Lifecycle

### 1. Initialization

```javascript
class Component {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.state = {};
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.render();
  }
}
```

### 2. Update Cycle

```javascript
update(newProps) {
  const hasChanged = this.shouldUpdate(newProps);
  
  if (hasChanged) {
    this.props = newProps;
    this.render();
  }
}

shouldUpdate(newProps) {
  // Shallow comparison or deep comparison based on needs
  return JSON.stringify(this.props) !== JSON.stringify(newProps);
}
```

### 3. Cleanup

```javascript
destroy() {
  this.removeEventListeners();
  this.container.innerHTML = '';
  // Clean up any timers, subscriptions, etc.
}
```

## Responsive Design Strategy

### 1. Mobile-First Components

```javascript
class TaskBoard {
  render(tasks) {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      this.renderMobileLayout(tasks);
    } else {
      this.renderDesktopLayout(tasks);
    }
  }
  
  renderMobileLayout(tasks) {
    // Stack columns vertically
    // Simplified task cards
    // Touch-friendly interactions
  }
  
  renderDesktopLayout(tasks) {
    // Three-column layout
    // Full task details
    // Mouse interactions
  }
}
```

### 2. Responsive Component Behaviors

```css
/* Component-level responsive design */
.task-card {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 767px) {
  .task-card {
    padding: 0.5rem;
    margin-bottom: 0.25rem;
  }
  
  .task-actions {
    flex-direction: column;
  }
}
```

## Performance Optimization

### 1. Efficient DOM Updates

```javascript
class TaskBoard {
  updateBoard(tasks) {
    // Only update changed tasks
    const currentTaskIds = this.getCurrentTaskIds();
    const newTaskIds = tasks.map(task => task.id);
    
    // Remove deleted tasks
    const removedIds = currentTaskIds.filter(id => !newTaskIds.includes(id));
    removedIds.forEach(id => this.removeTaskCard(id));
    
    // Update existing and add new tasks
    tasks.forEach(task => {
      if (currentTaskIds.includes(task.id)) {
        this.updateTaskCard(task);
      } else {
        this.addTaskCard(task);
      }
    });
  }
}
```

### 2. Event Delegation

```javascript
class TaskBoard {
  setupEventListeners() {
    // Single event listener for all task cards
    this.container.addEventListener('click', (event) => {
      const taskCard = event.target.closest('.task-card');
      if (!taskCard) return;
      
      const taskId = taskCard.dataset.taskId;
      const action = event.target.dataset.action;
      
      switch (action) {
        case 'status-change':
          this.handleStatusChange(taskId, event.target.dataset.newStatus);
          break;
        case 'edit':
          this.handleEdit(taskId);
          break;
        case 'delete':
          this.handleDelete(taskId);
          break;
      }
    });
  }
}
```

## AI Collaboration Integration Points

### 1. Component Generation

**Prompt Pattern for Component Creation:**
```
"Generate a [ComponentName] component for TaskFlow that:
- Handles [specific functionality]
- Follows the established component pattern
- Uses vanilla JavaScript with DOM manipulation
- Includes proper event handling and error management
- Follows accessibility best practices

Provide the complete component class with initialization, render, and cleanup methods."
```

### 2. Component Enhancement

**Prompt Pattern for Feature Addition:**
```
"Enhance the existing [ComponentName] component to add [new feature]:
- [Requirement 1]
- [Requirement 2]
- Maintain backward compatibility
- Follow existing code patterns
- Include necessary CSS updates

Show only the changed methods and new additions."
```

This component hierarchy provides a solid foundation for building the TaskFlow frontend while maintaining clear separation of concerns, enabling effective AI collaboration, and supporting educational objectives through readable, well-structured code.
