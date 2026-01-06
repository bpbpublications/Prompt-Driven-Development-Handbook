/**
 * TaskFlow API Integration Tests - Educational Examples
 * 
 * This file demonstrates AI collaboration in creating integration tests that validate
 * API endpoints and frontend-backend communication. These tests show how AI can help
 * structure API testing for educational purposes.
 */

const assert = require('assert');

/**
 * AI Collaboration Note:
 * These integration tests were developed with AI assistance using prompts like:
 * "Help me create integration tests for the TaskFlow API that demonstrate how
 * frontend and backend communicate. Keep them educational and easy to understand."
 */

// Test configuration
const BASE_URL = 'http://localhost:3000';
const API_BASE = `${BASE_URL}/api`;

console.log('🔗 Running TaskFlow Integration Tests - Educational Examples\n');

/**
 * Helper function to make HTTP requests
 * AI suggested this helper to simplify test code and improve readability
 */
async function makeRequest(url, method = 'GET') {
  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}`);
    return { status: 0, data: null, ok: false, error: error.message };
  }
}

/**
 * Test server availability before running integration tests
 * AI suggested this prerequisite check for better error handling
 */
async function checkServerAvailability() {
  console.log('🏥 Checking server availability...');
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (response.ok) {
      console.log('✅ Server is running and accessible\n');
      return true;
    } else {
      console.log('❌ Server responded but health check failed\n');
      return false;
    }
  } catch (error) {
    console.log('❌ Server is not accessible. Please start the server with "npm start"\n');
    return false;
  }
}

async function runIntegrationTests() {
  // Check if server is running
  const serverAvailable = await checkServerAvailability();
  if (!serverAvailable) {
    console.log('🛑 Integration tests require the TaskFlow server to be running.');
    console.log('   Please run "npm start" in another terminal and try again.\n');
    return;
  }

  // Test 1: Health endpoint
  console.log('Test 1: Health Check Endpoint');
  try {
    const result = await makeRequest(`${API_BASE}/health`);
    assert.strictEqual(result.status, 200, 'Health endpoint should return 200');
    assert.strictEqual(result.data.status, 'ok', 'Health status should be "ok"');
    assert(result.data.timestamp, 'Health response should include timestamp');
    console.log('✅ Health endpoint works correctly\n');
  } catch (error) {
    console.log('❌ Health endpoint test failed:', error.message, '\n');
  }

  // Test 2: Tasks endpoint - basic functionality
  console.log('Test 2: Tasks Endpoint - Basic Functionality');
  try {
    const result = await makeRequest(`${API_BASE}/tasks`);
    assert.strictEqual(result.status, 200, 'Tasks endpoint should return 200');
    assert(Array.isArray(result.data.tasks), 'Response should contain tasks array');
    assert(typeof result.data.stats === 'object', 'Response should contain stats object');
    assert(typeof result.data.total === 'number', 'Response should contain total count');
    console.log(`✅ Tasks endpoint returns ${result.data.tasks.length} tasks with stats\n`);
  } catch (error) {
    console.log('❌ Basic tasks endpoint test failed:', error.message, '\n');
  }

  // Test 3: Tasks endpoint - status filtering
  console.log('Test 3: Tasks Endpoint - Status Filtering');
  try {
    const completedResult = await makeRequest(`${API_BASE}/tasks?status=completed`);
    assert.strictEqual(completedResult.status, 200, 'Filtered request should return 200');
    
    const todoResult = await makeRequest(`${API_BASE}/tasks?status=todo`);
    assert.strictEqual(todoResult.status, 200, 'Todo filter should return 200');
    
    // Validate that filtering actually works
    const allTasks = await makeRequest(`${API_BASE}/tasks`);
    const totalTasks = allTasks.data.tasks.length;
    const completedTasks = completedResult.data.tasks.length;
    const todoTasks = todoResult.data.tasks.length;
    
    assert(completedTasks <= totalTasks, 'Completed tasks should be subset of all tasks');
    assert(todoTasks <= totalTasks, 'Todo tasks should be subset of all tasks');
    
    console.log(`✅ Status filtering works: ${completedTasks} completed, ${todoTasks} todo\n`);
  } catch (error) {
    console.log('❌ Status filtering test failed:', error.message, '\n');
  }

  // Test 4: Tasks endpoint - search functionality
  console.log('Test 4: Tasks Endpoint - Search Functionality');
  try {
    const searchResult = await makeRequest(`${API_BASE}/tasks?search=project`);
    assert.strictEqual(searchResult.status, 200, 'Search request should return 200');
    assert(Array.isArray(searchResult.data.tasks), 'Search should return tasks array');
    
    // Check that search actually filtered results
    const allTasks = await makeRequest(`${API_BASE}/tasks`);
    const searchTasks = searchResult.data.tasks;
    
    assert(searchTasks.length <= allTasks.data.tasks.length, 'Search results should be subset of all tasks');
    
    // Verify search results contain search term (if any results)
    if (searchTasks.length > 0) {
      const hasSearchTerm = searchTasks.some(task => 
        task.title.toLowerCase().includes('project') ||
        task.description.toLowerCase().includes('project') ||
        task.assignee.toLowerCase().includes('project')
      );
      assert(hasSearchTerm, 'Search results should contain search term');
    }
    
    console.log(`✅ Search functionality works: found ${searchTasks.length} matching tasks\n`);
  } catch (error) {
    console.log('❌ Search functionality test failed:', error.message, '\n');
  }

  // Test 5: Combined filters
  console.log('Test 5: Combined Filters');
  try {
    const combinedResult = await makeRequest(`${API_BASE}/tasks?status=in-progress&priority=medium`);
    assert.strictEqual(combinedResult.status, 200, 'Combined filters should return 200');
    assert(Array.isArray(combinedResult.data.tasks), 'Combined filter should return tasks array');
    
    // Verify that returned tasks match both criteria
    combinedResult.data.tasks.forEach(task => {
      assert.strictEqual(task.status, 'in-progress', 'Task should have correct status');
      assert.strictEqual(task.priority, 'medium', 'Task should have correct priority');
    });
    
    console.log(`✅ Combined filters work: found ${combinedResult.data.tasks.length} tasks\n`);
  } catch (error) {
    console.log('❌ Combined filters test failed:', error.message, '\n');
  }

  // Test 6: Statistics endpoint
  console.log('Test 6: Statistics Endpoint');
  try {
    const statsResult = await makeRequest(`${API_BASE}/stats`);
    assert.strictEqual(statsResult.status, 200, 'Stats endpoint should return 200');
    
    const stats = statsResult.data;
    assert(typeof stats.total === 'number', 'Stats should include total count');
    assert(typeof stats.completed === 'number', 'Stats should include completed count');
    assert(typeof stats.completionRate === 'number', 'Stats should include completion rate');
    assert(typeof stats.byPriority === 'object', 'Stats should include priority breakdown');
    
    console.log(`✅ Statistics endpoint works: ${stats.total} total, ${stats.completionRate}% complete\n`);
  } catch (error) {
    console.log('❌ Statistics endpoint test failed:', error.message, '\n');
  }

  // Test 7: Error handling
  console.log('Test 7: Error Handling');
  try {
    const invalidResult = await makeRequest(`${API_BASE}/nonexistent`);
    assert.strictEqual(invalidResult.status, 404, 'Invalid endpoint should return 404');
    console.log('✅ Invalid endpoints properly return 404\n');
  } catch (error) {
    console.log('❌ Error handling test failed:', error.message, '\n');
  }

  console.log('🎉 All educational integration tests completed!');
  console.log('\n📚 Educational Notes:');
  console.log('- These tests validate API endpoints and data flow');
  console.log('- AI helped structure comprehensive API testing scenarios');
  console.log('- Tests demonstrate frontend-backend communication patterns');
  console.log('- Error handling ensures robust API behavior');
  console.log('- Combined filters show complex query capabilities');
}

/**
 * AI Collaboration Insights:
 * 
 * 1. Test Structure: AI suggested organizing tests by:
 *    - Basic functionality first (health checks, basic endpoints)
 *    - Feature-specific testing (filtering, search)
 *    - Complex scenarios (combined filters)
 *    - Error conditions
 * 
 * 2. Request Helper: AI recommended creating a helper function to:
 *    - Reduce code duplication
 *    - Standardize error handling
 *    - Improve test readability
 *    - Provide consistent response format
 * 
 * 3. Assertions: AI helped structure assertions to validate:
 *    - HTTP status codes (correct response codes)
 *    - Response structure (expected data format)
 *    - Data validity (logical constraints)
 *    - Business logic (filtering actually works)
 * 
 * 4. Prerequisites: AI suggested checking server availability to:
 *    - Provide clear error messages
 *    - Avoid confusing test failures
 *    - Guide users to proper setup
 *    - Improve educational experience
 * 
 * 5. Educational Value: AI helped ensure tests:
 *    - Demonstrate real API testing patterns
 *    - Show how to validate complex functionality
 *    - Provide clear, understandable examples
 *    - Include practical error handling
 */

// Run tests if this file is executed directly
if (require.main === module) {
  runIntegrationTests().catch(console.error);
}

module.exports = { runIntegrationTests };
