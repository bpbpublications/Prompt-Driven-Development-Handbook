# TaskFlow API Specification

## API Overview

The TaskFlow API provides a RESTful interface for task management operations. All endpoints follow standard HTTP conventions and return JSON responses. The API is designed for educational purposes, emphasizing clarity and standard patterns over advanced features.

**Base URL**: `http://localhost:3000/api`
**Content-Type**: `application/json`
**Response Format**: JSON

## Data Models

### Task Entity

```json
{
  "id": "string (UUID)",
  "title": "string (required, max 100 chars)",
  "description": "string (optional, max 500 chars)",
  "status": "string (required, enum: ['todo', 'in-progress', 'completed'])",
  "priority": "string (required, enum: ['low', 'medium', 'high'])",
  "createdAt": "string (ISO 8601 timestamp)",
  "updatedAt": "string (ISO 8601 timestamp)",
  "assignee": "string (optional, future enhancement)"
}
```

**Example Task:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "title": "Implement user authentication",
  "description": "Add login and registration functionality with JWT tokens",
  "status": "in-progress",
  "priority": "high",
  "createdAt": "2025-08-10T10:30:00.000Z",
  "updatedAt": "2025-08-10T14:45:00.000Z"
}
```

### Error Response Model

```json
{
  "error": {
    "code": "string (error code identifier)",
    "message": "string (human-readable error message)",
    "details": "object (optional additional error context)",
    "timestamp": "string (ISO 8601 timestamp)"
  }
}
```

## API Endpoints

### 1. Get All Tasks

**Endpoint**: `GET /api/tasks`

**Description**: Retrieve all tasks with optional filtering

**Query Parameters**:
- `status` (optional): Filter by task status (`todo`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description

**Request Example**:
```http
GET /api/tasks?status=in-progress&priority=high
```

**Success Response** (200 OK):
```json
{
  "tasks": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Implement user authentication",
      "description": "Add login and registration functionality",
      "status": "in-progress",
      "priority": "high",
      "createdAt": "2025-08-10T10:30:00.000Z",
      "updatedAt": "2025-08-10T14:45:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "filtered": 1,
    "timestamp": "2025-08-10T15:00:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": {
    "code": "INVALID_QUERY_PARAMETER",
    "message": "Invalid status value. Must be one of: todo, in-progress, completed",
    "details": {
      "parameter": "status",
      "value": "invalid-status"
    },
    "timestamp": "2025-08-10T15:00:00.000Z"
  }
}
```

### 2. Create New Task

**Endpoint**: `POST /api/tasks`

**Description**: Create a new task

**Request Body**:
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "string (required, enum: ['low', 'medium', 'high'])"
}
```

**Request Example**:
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Fix responsive design issues",
  "description": "Mobile layout breaks on screens smaller than 768px",
  "priority": "medium"
}
```

**Success Response** (201 Created):
```json
{
  "task": {
    "id": "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    "title": "Fix responsive design issues",
    "description": "Mobile layout breaks on screens smaller than 768px",
    "status": "todo",
    "priority": "medium",
    "createdAt": "2025-08-10T15:30:00.000Z",
    "updatedAt": "2025-08-10T15:30:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Task title is required and cannot be empty",
    "details": {
      "field": "title",
      "value": ""
    },
    "timestamp": "2025-08-10T15:30:00.000Z"
  }
}
```

### 3. Get Single Task

**Endpoint**: `GET /api/tasks/:id`

**Description**: Retrieve a specific task by ID

**Path Parameters**:
- `id` (required): Task UUID

**Request Example**:
```http
GET /api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Success Response** (200 OK):
```json
{
  "task": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Implement user authentication",
    "description": "Add login and registration functionality",
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2025-08-10T10:30:00.000Z",
    "updatedAt": "2025-08-10T14:45:00.000Z"
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task with ID 'invalid-id' does not exist",
    "details": {
      "taskId": "invalid-id"
    },
    "timestamp": "2025-08-10T15:45:00.000Z"
  }
}
```

### 4. Update Task

**Endpoint**: `PUT /api/tasks/:id`

**Description**: Update an existing task

**Path Parameters**:
- `id` (required): Task UUID

**Request Body** (partial updates allowed):
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "status": "string (optional, enum: ['todo', 'in-progress', 'completed'])",
  "priority": "string (optional, enum: ['low', 'medium', 'high'])"
}
```

**Request Example**:
```http
PUT /api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
Content-Type: application/json

{
  "status": "completed",
  "description": "Authentication implemented with JWT and bcrypt"
}
```

**Success Response** (200 OK):
```json
{
  "task": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Implement user authentication",
    "description": "Authentication implemented with JWT and bcrypt",
    "status": "completed",
    "priority": "high",
    "createdAt": "2025-08-10T10:30:00.000Z",
    "updatedAt": "2025-08-10T16:00:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid status value",
    "details": {
      "field": "status",
      "value": "invalid-status",
      "allowedValues": ["todo", "in-progress", "completed"]
    },
    "timestamp": "2025-08-10T16:00:00.000Z"
  }
}
```

### 5. Delete Task

**Endpoint**: `DELETE /api/tasks/:id`

**Description**: Delete a specific task

**Path Parameters**:
- `id` (required): Task UUID

**Request Example**:
```http
DELETE /api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Success Response** (200 OK):
```json
{
  "message": "Task deleted successfully",
  "deletedTask": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "Implement user authentication"
  },
  "timestamp": "2025-08-10T16:15:00.000Z"
}
```

**Error Response** (404 Not Found):
```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Cannot delete task: Task with ID 'invalid-id' does not exist",
    "details": {
      "taskId": "invalid-id"
    },
    "timestamp": "2025-08-10T16:15:00.000Z"
  }
}
```

### 6. Get Task Statistics

**Endpoint**: `GET /api/tasks/stats`

**Description**: Retrieve task completion and distribution statistics

**Request Example**:
```http
GET /api/tasks/stats
```

**Success Response** (200 OK):
```json
{
  "statistics": {
    "total": 15,
    "byStatus": {
      "todo": 6,
      "in-progress": 4,
      "completed": 5
    },
    "byPriority": {
      "low": 4,
      "medium": 7,
      "high": 4
    },
    "completionRate": 33.33,
    "averageCompletionTime": "2.5 days",
    "lastUpdated": "2025-08-10T16:30:00.000Z"
  },
  "timestamp": "2025-08-10T16:30:00.000Z"
}
```

## HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 200 OK | Success | Successful GET, PUT, DELETE operations |
| 201 Created | Resource Created | Successful POST operation |
| 400 Bad Request | Client Error | Invalid request data or parameters |
| 404 Not Found | Resource Not Found | Task with specified ID doesn't exist |
| 422 Unprocessable Entity | Validation Error | Request data fails business logic validation |
| 500 Internal Server Error | Server Error | Unexpected server error |

## Error Handling

### Error Code Reference

| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| `VALIDATION_ERROR` | Request data validation failed | 400 |
| `TASK_NOT_FOUND` | Requested task does not exist | 404 |
| `INVALID_QUERY_PARAMETER` | Query parameter value is invalid | 400 |
| `DUPLICATE_TASK` | Task with same title already exists | 422 |
| `FILE_OPERATION_ERROR` | Data persistence operation failed | 500 |
| `JSON_PARSE_ERROR` | Invalid JSON in request body | 400 |

### Error Response Format

All error responses follow the same structure:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": {
      "field": "fieldName",
      "value": "invalidValue"
    },
    "timestamp": "2025-08-10T16:45:00.000Z"
  }
}
```

## Request/Response Examples

### Complete Task Creation Workflow

**1. Create Task**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Set up CI/CD pipeline",
  "description": "Configure GitHub Actions for automated testing and deployment",
  "priority": "high"
}
```

**2. Update Task Status**
```http
PUT /api/tasks/c3d4e5f6-g7h8-9012-cdef-g34567890123
Content-Type: application/json

{
  "status": "in-progress"
}
```

**3. Get Updated Task**
```http
GET /api/tasks/c3d4e5f6-g7h8-9012-cdef-g34567890123
```

**4. Complete Task**
```http
PUT /api/tasks/c3d4e5f6-g7h8-9012-cdef-g34567890123
Content-Type: application/json

{
  "status": "completed",
  "description": "CI/CD pipeline configured with automated testing and deployment to staging"
}
```

### Task Filtering Examples

**Filter by Status**
```http
GET /api/tasks?status=in-progress
```

**Filter by Priority**
```http
GET /api/tasks?priority=high
```

**Combined Filters**
```http
GET /api/tasks?status=todo&priority=medium
```

**Search Tasks**
```http
GET /api/tasks?search=authentication
```

## Authentication and Security

### Current Implementation
- **No Authentication**: API is open for educational purposes
- **CORS Enabled**: Configured for local development
- **Input Validation**: Basic validation on all endpoints
- **No Rate Limiting**: Unlimited requests allowed

### Production Considerations
For production deployment, consider adding:
- JWT-based authentication
- API key management
- Request rate limiting
- Input sanitization
- HTTPS enforcement
- API versioning

## API Client Implementation

### JavaScript Fetch Examples

**Get All Tasks**
```javascript
async function getAllTasks(filters = {}) {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`/api/tasks?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
```

**Create Task**
```javascript
async function createTask(taskData) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }
  
  return await response.json();
}
```

**Update Task**
```javascript
async function updateTask(taskId, updates) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }
  
  return await response.json();
}
```

## Testing the API

### Manual Testing with curl

**Create a Task**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task",
    "description": "This is a test task",
    "priority": "medium"
  }'
```

**Get All Tasks**
```bash
curl http://localhost:3000/api/tasks
```

**Update Task Status**
```bash
curl -X PUT http://localhost:3000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Postman Collection

A complete Postman collection is available at `[REPO_PATH]/docs/postman-collection.json` with:
- All API endpoints configured
- Example requests and responses
- Environment variables for base URL
- Test scripts for response validation

This API specification provides a complete reference for implementing and consuming the TaskFlow task management API, designed with educational clarity and practical usability in mind.
