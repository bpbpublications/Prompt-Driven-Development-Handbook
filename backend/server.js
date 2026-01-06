const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting TaskFlow server...');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Simple data service for read-only operations
class TaskDataService {
  constructor() {
    this.dataPath = path.join(__dirname, 'data', 'tasks.json');
  }

  async getTasks() {
    try {
      const data = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }

  filterTasks(tasks, filters) {
    return tasks.filter(task => {
      if (filters.status && filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return task.title.toLowerCase().includes(searchTerm) ||
               task.description.toLowerCase().includes(searchTerm) ||
               (task.assignee && task.assignee.toLowerCase().includes(searchTerm));
      }
      return true;
    });
  }

  calculateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    return {
      total,
      completed,
      inProgress,
      todo,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      byPriority
    };
  }
}

const dataService = new TaskDataService();

// Routes - Read-only operations only
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await dataService.getTasks();
    const { status, priority, search } = req.query;
    
    const filteredTasks = dataService.filterTasks(tasks, { status, priority, search });
    const stats = dataService.calculateStats(filteredTasks);
    
    res.json({
      tasks: filteredTasks,
      stats,
      total: filteredTasks.length
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const tasks = await dataService.getTasks();
    const stats = dataService.calculateStats(tasks);
    res.json(stats);
  } catch (error) {
    console.error('Stats Error:', error);
    res.status(500).json({ error: 'Failed to calculate statistics' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`TaskFlow server running on http://localhost:${PORT}`);
  console.log('✅ Educational TaskFlow server ready - Read-only operations for learning!');
});

module.exports = app;
