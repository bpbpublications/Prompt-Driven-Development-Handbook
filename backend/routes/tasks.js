const express = require('express');
const { DataService } = require('../data/dataService');
const { TaskError } = require('../utils/errors');

const router = express.Router();
const dataService = new DataService();

/**
 * GET /api/tasks
 * Retrieve all tasks with optional filtering
 */
router.get('/', async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    
    // Validate query parameters
    if (status && !['todo', 'in-progress', 'completed'].includes(status)) {
      throw new TaskError(
        'INVALID_QUERY_PARAMETER',
        `Invalid status value. Must be one of: todo, in-progress, completed`,
        { parameter: 'status', value: status }
      );
    }
    
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      throw new TaskError(
        'INVALID_QUERY_PARAMETER',
        `Invalid priority value. Must be one of: low, medium, high`,
        { parameter: 'priority', value: priority }
      );
    }
    
    const filters = { status, priority, search };
    const allTasks = await dataService.getTasks();
    const filteredTasks = dataService.applyFilters(allTasks, filters);
    
    res.json({
      tasks: filteredTasks,
      meta: {
        total: allTasks.length,
        filtered: filteredTasks.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tasks/stats
 * Get task statistics
 */
router.get('/stats', async (req, res, next) => {
  try {
    const tasks = await dataService.getTasks();
    const statistics = dataService.calculateStatistics(tasks);
    
    res.json({
      statistics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
