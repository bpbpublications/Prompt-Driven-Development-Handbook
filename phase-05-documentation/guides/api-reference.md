# TaskFlow API Reference

## Overview
This API reference provides comprehensive documentation for the TaskFlow backend API endpoints. The API follows RESTful conventions and is designed for educational purposes to demonstrate professional API development patterns while maintaining clarity for learning.

## Base Information

### Base URL
```
http://localhost:3001/api
```

### Content Type
All API responses return JSON data:
```
Content-Type: application/json
```

### Educational Focus
This API is designed for educational purposes with the following constraints:
- **Read-only operations**: No data modification to maintain learning clarity
- **File-based storage**: Uses JSON file instead of database for simplicity
- **Synchronous operations**: Simpler flow for educational understanding
- **Comprehensive error handling**: Demonstrates proper error response patterns

---

## API Endpoints

### 1. Get All Tasks

#### Endpoint
```http
GET /api/tasks
```

#### Description
Retrieves all tasks from the system. Supports optional query parameters for filtering.

#### Parameters

| Parameter | Type | Required | Description | Example Values |
|-----------|------|----------|-------------|----------------|
| `status` | string | No | Filter tasks by status | `completed`, `in-progress`, `pending` |
| `category` | string | No | Filter tasks by category | `setup`, `planning`, `development`, `documentation` |
| `priority` | string | No | Filter tasks by priority | `high`, `medium`, `low` |

#### Request Examples

**Get all tasks:**
```http
GET /api/tasks
```

**Filter by status:**
```http
GET /api/tasks?status=completed
```

**Filter by category:**
```http
GET /api/tasks?category=development
```

**Filter by priority:**
```http
GET /api/tasks?priority=high
```

**Multiple filters:**
```http
GET /api/tasks?status=in-progress&priority=high
```

#### Response Format

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Set up development environment",
      "description": "Install Node.js, set up project structure, and configure basic dependencies",
      "status": "completed",
      "priority": "high",
      "category": "setup",
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "filtered": 1,
    "filters": {
      "status": "completed"
    }
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": {
    "message": "Failed to retrieve tasks",
    "code": "TASK_RETRIEVAL_ERROR",
    "details": "Unable to read task data file"
  }
}
```

#### cURL Examples

```bash
# Get all tasks
curl http://localhost:3001/api/tasks

# Get completed tasks
curl "http://localhost:3001/api/tasks?status=completed"

# Get high priority development tasks
curl "http://localhost:3001/api/tasks?category=development&priority=high"
```

#### JavaScript Examples

**Using Fetch API:**
```javascript
// Get all tasks
const response = await fetch('http://localhost:3001/api/tasks');
const data = await response.json();

// Get filtered tasks
const filteredResponse = await fetch('http://localhost:3001/api/tasks?status=completed&priority=high');
const filteredData = await filteredResponse.json();
```

**Using Async/Await with Error Handling:**
```javascript
async function getTasks(filters = {}) {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`http://localhost:3001/api/tasks?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// Usage examples
const allTasks = await getTasks();
const completedTasks = await getTasks({ status: 'completed' });
const highPriorityTasks = await getTasks({ priority: 'high' });
```

---

## Data Models

### Task Object

#### Structure
```json
{
  "id": number,
  "title": string,
  "description": string,
  "status": string,
  "priority": string,
  "category": string,
  "createdAt": string,
  "updatedAt": string
}
```

#### Field Descriptions

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | number | Unique identifier for the task | Positive integer, auto-generated |
| `title` | string | Brief task title | 1-100 characters, required |
| `description` | string | Detailed task description | 1-500 characters, required |
| `status` | string | Current task status | One of: `pending`, `in-progress`, `completed` |
| `priority` | string | Task priority level | One of: `low`, `medium`, `high` |
| `category` | string | Task category/type | One of: `setup`, `planning`, `development`, `documentation` |
| `createdAt` | string | ISO 8601 timestamp of task creation | UTC format, automatically set |
| `updatedAt` | string | ISO 8601 timestamp of last update | UTC format, automatically updated |

#### Sample Task Objects

**Completed Setup Task:**
```json
{
  "id": 1,
  "title": "Set up development environment",
  "description": "Install Node.js, set up project structure, and configure basic dependencies",
  "status": "completed",
  "priority": "high",
  "category": "setup",
  "createdAt": "2024-01-15T08:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**In-Progress Development Task:**
```json
{
  "id": 3,
  "title": "Implement frontend components",
  "description": "Create task display, filtering, and statistics components",
  "status": "in-progress",
  "priority": "medium",
  "category": "development",
  "createdAt": "2024-01-16T08:30:00Z",
  "updatedAt": "2024-01-16T16:45:00Z"
}
```

### Response Wrapper

All API responses follow a consistent wrapper format:

#### Success Response
```json
{
  "success": true,
  "data": [/* array of task objects */],
  "meta": {
    "total": number,      // Total tasks in system
    "filtered": number,   // Tasks matching current filters
    "filters": object     // Applied filter parameters
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "message": string,    // Human-readable error message
    "code": string,       // Machine-readable error code
    "details": string     // Additional error details
  }
}
```

---

## Filtering and Querying

### Filter Parameters

#### Status Filter
**Values**: `pending`, `in-progress`, `completed`
**Usage**: `?status=completed`
**Effect**: Returns only tasks with matching status

#### Category Filter
**Values**: `setup`, `planning`, `development`, `documentation`
**Usage**: `?category=development`
**Effect**: Returns only tasks in the specified category

#### Priority Filter
**Values**: `low`, `medium`, `high`
**Usage**: `?priority=high`
**Effect**: Returns only tasks with matching priority level

### Multiple Filters
Combine filters using `&` separator:
```http
GET /api/tasks?status=in-progress&category=development&priority=high
```

### Filter Behavior
- **Case-insensitive**: `status=COMPLETED` works the same as `status=completed`
- **Exact match**: Filters use exact string matching
- **AND logic**: Multiple filters are combined with AND logic
- **Invalid filters**: Unknown filter values are ignored (no error thrown)

### Filter Examples

```javascript
// Get all high-priority tasks
const highPriorityTasks = await fetch('/api/tasks?priority=high');

// Get all completed setup tasks
const completedSetup = await fetch('/api/tasks?status=completed&category=setup');

// Get all pending documentation tasks
const pendingDocs = await fetch('/api/tasks?status=pending&category=documentation');
```

---

## Error Handling

### HTTP Status Codes

| Status Code | Meaning | When It Occurs |
|-------------|---------|----------------|
| 200 | OK | Successful task retrieval |
| 400 | Bad Request | Invalid query parameters (future enhancement) |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Internal Server Error | Server-side error (file read issues, etc.) |

### Error Response Format

All errors follow a consistent structure:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error description",
    "code": "MACHINE_READABLE_ERROR_CODE",
    "details": "Additional technical details"
  }
}
```

### Common Error Scenarios

#### File System Errors
```json
{
  "success": false,
  "error": {
    "message": "Failed to retrieve tasks",
    "code": "TASK_RETRIEVAL_ERROR",
    "details": "Unable to read task data file"
  }
}
```

#### JSON Parsing Errors
```json
{
  "success": false,
  "error": {
    "message": "Invalid task data format",
    "code": "DATA_PARSE_ERROR",
    "details": "JSON syntax error in tasks.json"
  }
}
```

### Error Handling in Frontend

```javascript
async function handleApiCall() {
  try {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    
    if (!data.success) {
      // Handle API-level errors
      console.error('API Error:', data.error.message);
      showUserError('Failed to load tasks. Please try again.');
      return null;
    }
    
    return data.data; // Return the tasks array
  } catch (error) {
    // Handle network or parsing errors
    console.error('Network Error:', error);
    showUserError('Unable to connect to server. Please check your connection.');
    return null;
  }
}
```

---

## Rate Limiting and Performance

### Current Limitations
- **No rate limiting**: Educational API doesn't implement rate limiting
- **Synchronous operations**: All operations are synchronous for simplicity
- **File-based storage**: Data is read from JSON file on each request

### Performance Characteristics
- **Response time**: Typically < 50ms for small datasets
- **Concurrent requests**: Limited by Node.js single-threaded nature
- **Memory usage**: Entire dataset loaded into memory for each request

### Educational Notes
In production systems, you would typically implement:
- **Rate limiting**: Prevent API abuse
- **Caching**: Reduce file system reads
- **Database**: Persistent, optimized storage
- **Pagination**: Handle large datasets efficiently

---

## Authentication and Security

### Current Implementation
- **No authentication**: Open API for educational purposes
- **No authorization**: All endpoints publicly accessible
- **CORS enabled**: Cross-origin requests allowed

### Security Considerations (Educational)
In production systems, consider:
- **API keys**: Authenticate API consumers
- **Rate limiting**: Prevent abuse and DoS attacks
- **Input validation**: Sanitize and validate all inputs
- **HTTPS**: Encrypt data in transit
- **Error message security**: Avoid exposing sensitive information

### Educational Security Example

```javascript
// Example of how you might add basic validation
function validateTaskFilters(query) {
  const validStatuses = ['pending', 'in-progress', 'completed'];
  const validCategories = ['setup', 'planning', 'development', 'documentation'];
  const validPriorities = ['low', 'medium', 'high'];
  
  const errors = [];
  
  if (query.status && !validStatuses.includes(query.status)) {
    errors.push(`Invalid status: ${query.status}`);
  }
  
  if (query.category && !validCategories.includes(query.category)) {
    errors.push(`Invalid category: ${query.category}`);
  }
  
  if (query.priority && !validPriorities.includes(query.priority)) {
    errors.push(`Invalid priority: ${query.priority}`);
  }
  
  return errors;
}
```

---

## Testing the API

### Manual Testing

#### Browser Testing
Navigate directly to API endpoints in your browser:
```
http://localhost:3001/api/tasks
http://localhost:3001/api/tasks?status=completed
http://localhost:3001/api/tasks?category=development&priority=high
```

#### Command Line Testing
```bash
# Basic request
curl http://localhost:3001/api/tasks

# With pretty-printed JSON (requires jq)
curl http://localhost:3001/api/tasks | jq

# Test filtering
curl "http://localhost:3001/api/tasks?status=completed"
curl "http://localhost:3001/api/tasks?category=development"
curl "http://localhost:3001/api/tasks?priority=high"

# Test multiple filters
curl "http://localhost:3001/api/tasks?status=in-progress&priority=high"
```

### Automated Testing Examples

#### Unit Test Example (Jest)
```javascript
const request = require('supertest');
const app = require('../server');

describe('Tasks API', () => {
  test('GET /api/tasks returns all tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.meta.total).toBeGreaterThan(0);
  });
  
  test('GET /api/tasks?status=completed filters correctly', async () => {
    const response = await request(app)
      .get('/api/tasks?status=completed')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    response.body.data.forEach(task => {
      expect(task.status).toBe('completed');
    });
  });
});
```

#### Integration Test Example
```javascript
describe('Task Filtering Integration', () => {
  test('Multiple filters work correctly', async () => {
    const response = await request(app)
      .get('/api/tasks?status=completed&category=setup')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    response.body.data.forEach(task => {
      expect(task.status).toBe('completed');
      expect(task.category).toBe('setup');
    });
  });
});
```

---

## API Development Patterns (Educational)

### RESTful Design Principles
This API demonstrates several REST principles:

1. **Resource-based URLs**: `/api/tasks` represents the tasks resource
2. **HTTP methods**: GET for retrieval (would use POST, PUT, DELETE for modifications)
3. **Stateless**: Each request contains all necessary information
4. **Consistent response format**: All responses follow the same structure

### Error Handling Patterns
```javascript
// Consistent error response format
function createErrorResponse(message, code, details) {
  return {
    success: false,
    error: {
      message,
      code,
      details
    }
  };
}

// Usage in route handlers
app.get('/api/tasks', (req, res) => {
  try {
    // Implementation logic
  } catch (error) {
    res.status(500).json(
      createErrorResponse('Failed to retrieve tasks', 'TASK_RETRIEVAL_ERROR', error.message)
    );
  }
});
```

### Query Parameter Handling
```javascript
// Clean parameter extraction and validation
function extractTaskFilters(query) {
  const filters = {};
  
  if (query.status) filters.status = query.status.toLowerCase();
  if (query.category) filters.category = query.category.toLowerCase();
  if (query.priority) filters.priority = query.priority.toLowerCase();
  
  return filters;
}
```

---

## API Versioning (Educational Concept)

### Current Version
- **Version**: v1 (implicit)
- **Versioning strategy**: None implemented (single version)

### Production Versioning Approaches
In production APIs, consider:

```javascript
// URL-based versioning
app.use('/api/v1', taskRoutes);
app.use('/api/v2', taskRoutesV2);

// Header-based versioning
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});

// Query parameter versioning
app.get('/api/tasks', (req, res) => {
  const version = req.query.version || 'v1';
  // Route to appropriate handler
});
```

---

## Conclusion

This API reference provides comprehensive documentation for the TaskFlow educational API. The API demonstrates professional development patterns while maintaining educational clarity through simplified operations and comprehensive error handling.

Key learning outcomes include:
- **RESTful API design principles**
- **Consistent error handling patterns**
- **Query parameter processing**
- **JSON response formatting**
- **API testing approaches**

For practical experience, use the provided examples to interact with the API and understand how frontend applications consume backend services. The patterns demonstrated here transfer to production applications with additional security, validation, and performance considerations.
