/**
 * TaskFlow Backend Unit Tests - Educational Examples
 * 
 * This file demonstrates AI collaboration in creating unit tests for educational purposes.
 * Rather than comprehensive coverage, these tests showcase key testing patterns and
 * how AI can assist in test development.
 */

const assert = require('assert');
const path = require('path');

// Import the TaskDataService class from our server
// Note: In a real project, we'd extract this to a separate module
// For educational purposes, we'll recreate the key functions here
class TaskDataService {
  constructor() {
    this.sampleTasks = [
      {
        id: 1,
        title: "Setup project structure",
        description: "Create initial folder structure and configuration files",
        status: "completed",
        priority: "high",
        assignee: "Alice Johnson"
      },
      {
        id: 2,
        title: "Implement task filtering",
        description: "Add functionality to filter tasks by status and assignee",
        status: "in-progress",
        priority: "medium",
        assignee: "Bob Smith"
      },
      {
        id: 3,
        title: "Add search functionality",
        description: "Enable users to search tasks by title and description",
        status: "todo",
        priority: "low",
        assignee: "Charlie Brown"
      }
    ];
  }

  async getTasks() {
    // Simulate async operation
    return Promise.resolve([...this.sampleTasks]);
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

/**
 * AI Collaboration Note:
 * The following tests were generated with AI assistance using prompts like:
 * "Help me write unit tests for the TaskDataService filtering function.
 * Focus on educational clarity and cover the main use cases."
 */

// Test Suite: TaskDataService Filtering
console.log('🧪 Running TaskFlow Unit Tests - Educational Examples\n');

async function runTests() {
  const dataService = new TaskDataService();
  const sampleTasks = await dataService.getTasks();
  
  // Test 1: Basic filtering by status
  console.log('Test 1: Status Filtering');
  try {
    const completedTasks = dataService.filterTasks(sampleTasks, { status: 'completed' });
    assert.strictEqual(completedTasks.length, 1, 'Should find exactly 1 completed task');
    assert.strictEqual(completedTasks[0].title, 'Setup project structure', 'Should return correct completed task');
    console.log('✅ Status filtering works correctly\n');
  } catch (error) {
    console.log('❌ Status filtering failed:', error.message, '\n');
  }

  // Test 2: Priority filtering
  console.log('Test 2: Priority Filtering');
  try {
    const highPriorityTasks = dataService.filterTasks(sampleTasks, { priority: 'high' });
    assert.strictEqual(highPriorityTasks.length, 1, 'Should find exactly 1 high priority task');
    
    const mediumPriorityTasks = dataService.filterTasks(sampleTasks, { priority: 'medium' });
    assert.strictEqual(mediumPriorityTasks.length, 1, 'Should find exactly 1 medium priority task');
    console.log('✅ Priority filtering works correctly\n');
  } catch (error) {
    console.log('❌ Priority filtering failed:', error.message, '\n');
  }

  // Test 3: Search functionality
  console.log('Test 3: Search Functionality');
  try {
    const searchResults = dataService.filterTasks(sampleTasks, { search: 'project' });
    assert.strictEqual(searchResults.length, 1, 'Should find 1 task containing "project"');
    assert.strictEqual(searchResults[0].title, 'Setup project structure', 'Should find correct task');
    
    const assigneeSearch = dataService.filterTasks(sampleTasks, { search: 'alice' });
    assert.strictEqual(assigneeSearch.length, 1, 'Should find 1 task assigned to Alice');
    console.log('✅ Search functionality works correctly\n');
  } catch (error) {
    console.log('❌ Search functionality failed:', error.message, '\n');
  }

  // Test 4: Combined filters
  console.log('Test 4: Combined Filters');
  try {
    const combinedFilters = dataService.filterTasks(sampleTasks, { 
      status: 'in-progress', 
      priority: 'medium' 
    });
    assert.strictEqual(combinedFilters.length, 1, 'Should find 1 task matching both criteria');
    assert.strictEqual(combinedFilters[0].title, 'Implement task filtering', 'Should find correct task');
    console.log('✅ Combined filtering works correctly\n');
  } catch (error) {
    console.log('❌ Combined filtering failed:', error.message, '\n');
  }

  // Test 5: Statistics calculation
  console.log('Test 5: Statistics Calculation');
  try {
    const stats = dataService.calculateStats(sampleTasks);
    assert.strictEqual(stats.total, 3, 'Should count 3 total tasks');
    assert.strictEqual(stats.completed, 1, 'Should count 1 completed task');
    assert.strictEqual(stats.inProgress, 1, 'Should count 1 in-progress task');
    assert.strictEqual(stats.todo, 1, 'Should count 1 todo task');
    assert.strictEqual(stats.completionRate, 33, 'Should calculate 33% completion rate');
    assert.strictEqual(stats.byPriority.high, 1, 'Should count 1 high priority task');
    console.log('✅ Statistics calculation works correctly\n');
  } catch (error) {
    console.log('❌ Statistics calculation failed:', error.message, '\n');
  }

  // Test 6: Edge cases
  console.log('Test 6: Edge Cases');
  try {
    const noResults = dataService.filterTasks(sampleTasks, { search: 'nonexistent' });
    assert.strictEqual(noResults.length, 0, 'Should return empty array for no matches');
    
    const allTasks = dataService.filterTasks(sampleTasks, {});
    assert.strictEqual(allTasks.length, 3, 'Should return all tasks when no filters applied');
    
    const emptyStats = dataService.calculateStats([]);
    assert.strictEqual(emptyStats.completionRate, 0, 'Should handle empty task list');
    console.log('✅ Edge cases handled correctly\n');
  } catch (error) {
    console.log('❌ Edge cases failed:', error.message, '\n');
  }

  console.log('🎉 All educational unit tests completed!');
  console.log('\n📚 Educational Notes:');
  console.log('- These tests demonstrate core unit testing concepts');
  console.log('- AI helped generate comprehensive test scenarios');
  console.log('- Tests focus on clarity and educational value over exhaustive coverage');
  console.log('- Each test validates a specific function or behavior');
  console.log('- Edge cases ensure robustness without complexity');
}

/**
 * AI Collaboration Insights:
 * 
 * 1. Test Generation: AI suggested comprehensive test cases covering:
 *    - Happy path scenarios (normal operation)
 *    - Edge cases (empty inputs, no matches)
 *    - Combined functionality (multiple filters)
 *    - Error scenarios (though minimal for educational focus)
 * 
 * 2. Test Structure: AI helped organize tests with:
 *    - Clear naming and grouping
 *    - Descriptive console output for educational purposes
 *    - Assertion messages that explain what's being tested
 *    - Educational comments throughout
 * 
 * 3. Test Data: AI suggested realistic test data that:
 *    - Covers different statuses and priorities
 *    - Includes searchable content
 *    - Represents real-world task scenarios
 * 
 * 4. Educational Value: AI helped ensure tests:
 *    - Demonstrate testing concepts clearly
 *    - Remain simple enough for learning
 *    - Show professional testing practices
 *    - Provide transferable patterns
 */

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { TaskDataService, runTests };
