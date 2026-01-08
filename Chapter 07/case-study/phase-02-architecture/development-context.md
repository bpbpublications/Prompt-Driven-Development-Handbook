# TaskFlow Development Context and Standards

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher  
- **Git**: Version 2.30 or higher
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - Live Server
  - REST Client

### Project Structure
```
taskflow/
├── package.json                 # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── .gitignore                  # Git ignore patterns
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier formatting rules
├── README.md                  # Project documentation
├── server/                    # Backend application
│   ├── app.js                # Express server setup
│   ├── routes/               # API route handlers
│   │   └── tasks.js
│   ├── middleware/           # Custom middleware
│   │   ├── cors.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── data/                 # Data management
│   │   ├── tasks.json       # Task data storage
│   │   └── dataService.js   # File operations
│   └── utils/               # Utility functions
│       ├── logger.js
│       └── helpers.js
├── client/                   # Frontend application
│   ├── index.html           # Main HTML file
│   ├── css/                 # Stylesheets
│   │   ├── main.css        # Global styles
│   │   ├── components.css  # Component-specific styles
│   │   └── responsive.css  # Mobile responsiveness
│   ├── js/                 # JavaScript modules
│   │   ├── app.js          # Application entry point
│   │   ├── api.js          # API communication
│   │   ├── components/     # UI components
│   │   │   ├── taskBoard.js
│   │   │   ├── taskCard.js
│   │   │   ├── taskForm.js
│   │   │   └── filterBar.js
│   │   └── utils/          # Utility functions
│   │       ├── dom.js
│   │       ├── validation.js
│   │       └── constants.js
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/               # End-to-end tests
└── docs/                   # Documentation
    ├── api.md
    ├── setup.md
    └── contributing.md
```

## Coding Standards and Conventions

### JavaScript Coding Standards

#### 1. Code Style
```javascript
// Use const for immutable values, let for mutable
const API_BASE_URL = 'http://localhost:3000/api';
let currentFilter = 'all';

// Use descriptive variable names
const tasksByStatus = groupTasksByStatus(tasks);
const isValidTaskData = validateTaskInput(formData);

// Use arrow functions for short operations
const filterCompletedTasks = tasks => tasks.filter(task => task.status === 'completed');

// Use async/await instead of .then() chains
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    return data.tasks;
  } catch (error) {
    console.error('Failed to load tasks:', error);
    throw error;
  }
}
```

#### 2. Function Design
```javascript
// Single Responsibility Principle
function calculateCompletionPercentage(tasks) {
  const completedTasks = tasks.filter(task => task.status === 'completed');
  return Math.round((completedTasks.length / tasks.length) * 100);
}

// Pure functions when possible
function formatTaskForDisplay(task) {
  return {
    ...task,
    formattedDate: new Date(task.createdAt).toLocaleDateString(),
    priorityClass: `priority-${task.priority}`
  };
}

// Clear function signatures with JSDoc
/**
 * Creates a new task with validation
 * @param {Object} taskData - The task data object
 * @param {string} taskData.title - Task title (required)
 * @param {string} taskData.description - Task description (optional)
 * @param {string} taskData.priority - Task priority (low/medium/high)
 * @returns {Promise<Object>} Created task object
 */
async function createTask(taskData) {
  // Implementation
}
```

#### 3. Error Handling
```javascript
// Consistent error handling pattern
class TaskError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = 'TaskError';
    this.code = code;
    this.details = details;
  }
}

// API error handling
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new TaskError(
        errorData.error.message,
        errorData.error.code,
        errorData.error.details
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TaskError) {
      throw error;
    }
    throw new TaskError('Network error', 'NETWORK_ERROR', { originalError: error.message });
  }
}
```

### HTML/CSS Standards

#### 1. HTML Structure
```html
<!-- Semantic HTML5 elements -->
<main class="app-container">
  <header class="app-header">
    <h1 class="app-title">TaskFlow</h1>
    <nav class="app-navigation">
      <!-- Navigation items -->
    </nav>
  </header>
  
  <section class="task-board" role="main">
    <div class="board-column" data-status="todo">
      <h2 class="column-title">To Do</h2>
      <div class="tasks-container" role="region" aria-label="Todo tasks">
        <!-- Task cards -->
      </div>
    </div>
  </section>
</main>

<!-- Accessibility attributes -->
<button 
  class="task-action-btn" 
  aria-label="Mark task as completed"
  data-task-id="123"
>
  Complete
</button>
```

#### 2. CSS Organization
```css
/* CSS Custom Properties for theming */
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --border-radius: 0.375rem;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Component-based CSS */
.task-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  transition: box-shadow 0.2s ease;
}

.task-card:hover {
  box-shadow: var(--shadow-md);
}

/* Responsive design with mobile-first approach */
.task-board {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .task-board {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Backend Development Standards

#### 1. Express.js Route Structure
```javascript
// routes/tasks.js
const express = require('express');
const router = express.Router();
const { validateTask, validateTaskUpdate } = require('../middleware/validation');
const dataService = require('../data/dataService');

// Get all tasks with filtering
router.get('/', async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filters = { status, priority, search };
    
    const tasks = await dataService.getTasks(filters);
    const stats = dataService.calculateStats(tasks);
    
    res.json({
      tasks,
      meta: {
        total: tasks.length,
        filtered: tasks.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new task
router.post('/', validateTask, async (req, res, next) => {
  try {
    const taskData = {
      ...req.body,
      id: generateUUID(),
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const task = await dataService.createTask(taskData);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

#### 2. Data Service Pattern
```javascript
// data/dataService.js
const fs = require('fs').promises;
const path = require('path');

class DataService {
  constructor() {
    this.dataPath = path.join(__dirname, 'tasks.json');
  }
  
  async readTasks() {
    try {
      const data = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return empty array
        return [];
      }
      throw error;
    }
  }
  
  async writeTasks(tasks) {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(this.dataPath, data, 'utf8');
  }
  
  async getTasks(filters = {}) {
    const tasks = await this.readTasks();
    return this.applyFilters(tasks, filters);
  }
  
  applyFilters(tasks, filters) {
    let filtered = [...tasks];
    
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filtered;
  }
}

module.exports = new DataService();
```

## Development Workflow

### 1. Git Workflow
```bash
# Feature development workflow
git checkout -b feature/task-filtering
git add .
git commit -m "feat: add task filtering by status and priority"
git push origin feature/task-filtering

# Commit message format: type(scope): description
# Types: feat, fix, docs, style, refactor, test, chore
```

### 2. Development Scripts
```json
{
  "scripts": {
    "start": "node server/app.js",
    "dev": "nodemon server/app.js",
    "dev:client": "live-server client --port=8080",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint server client/js --ext .js",
    "format": "prettier --write server client/js",
    "build": "npm run lint && npm test"
  }
}
```

### 3. Testing Strategy
```javascript
// tests/unit/dataService.test.js
const DataService = require('../../server/data/dataService');

describe('DataService', () => {
  describe('applyFilters', () => {
    it('should filter tasks by status', () => {
      const tasks = [
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'completed' }
      ];
      
      const result = DataService.applyFilters(tasks, { status: 'todo' });
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });
});
```

## AI Collaboration Guidelines

### 1. Code Generation Prompts
```
Effective Prompt Pattern:
"Generate a [component type] for [specific functionality] that follows these requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Use [technology/pattern] and ensure [quality criteria]."

Example:
"Generate a TaskCard component for displaying task information that follows these requirements:
- Shows title, description, status, and priority
- Handles click events for status changes
- Uses CSS classes for priority styling
- Follows accessibility best practices

Use vanilla JavaScript with DOM manipulation and ensure the component is reusable."
```

### 2. Code Review Collaboration
```
Review Prompt Pattern:
"Review this [code type] for:
- Code quality and best practices
- Performance considerations  
- Security issues
- Accessibility compliance
- Educational value for learning

Provide specific suggestions for improvement with examples."
```

### 3. Documentation Generation
```
Documentation Prompt Pattern:
"Create documentation for [component/function] that includes:
- Purpose and functionality
- Parameters and return values
- Usage examples
- Integration guidelines
- Common issues and solutions

Target audience: [beginner/intermediate] developers learning [technology]."
```

## Quality Assurance

### 1. Code Quality Metrics
- **ESLint**: Zero linting errors
- **Test Coverage**: Minimum 80% coverage
- **Performance**: Page load under 2 seconds
- **Accessibility**: WCAG 2.1 AA compliance

### 2. Review Checklist
- [ ] Code follows established conventions
- [ ] Functions have single responsibility
- [ ] Error handling is implemented
- [ ] Code is documented with comments
- [ ] Tests cover main functionality
- [ ] Performance impact is minimal
- [ ] Accessibility requirements are met

### 3. Definition of Done
- [ ] Feature implemented according to requirements
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Performance benchmarks met

This development context provides the foundation for consistent, high-quality code development throughout the TaskFlow project, ensuring educational value while maintaining professional development practices.
