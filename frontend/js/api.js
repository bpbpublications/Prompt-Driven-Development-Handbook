// TaskFlow API Client
// Handles all communication with the backend API

const API_BASE_URL = '/api';

/**
 * Generic API request handler with error management
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return null;
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new APIError(
        data.error?.message || 'Request failed',
        response.status,
        data.error?.code,
        data.error?.details
      );
    }
    
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other fetch errors
    throw new APIError(
      'Network error. Please check your connection.',
      0,
      'NETWORK_ERROR',
      { originalError: error.message }
    );
  }
}

/**
 * Custom API Error class
 */
class APIError extends Error {
  constructor(message, status, code, details = {}) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Tasks API methods
 */
const TasksAPI = {
  /**
   * Get all tasks with optional filtering
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Tasks response with metadata
   */
  async getTasks(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;
    
    return await apiRequest(endpoint);
  },
  
  /**
   * Get a specific task by ID
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Task data
   */
  async getTask(taskId) {
    return await apiRequest(`/tasks/${taskId}`);
  },
  
  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Created task
   */
  async createTask(taskData) {
    return await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },
  
  /**
   * Update an existing task
   * @param {string} taskId - Task ID
   * @param {Object} updates - Task updates
   * @returns {Promise<Object>} Updated task
   */
  async updateTask(taskId, updates) {
    return await apiRequest(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
  
  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteTask(taskId) {
    return await apiRequest(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
  
  /**
   * Get task statistics
   * @returns {Promise<Object>} Statistics data
   */
  async getStatistics() {
    return await apiRequest('/tasks/stats');
  }
};

/**
 * Health check API
 */
const HealthAPI = {
  /**
   * Check API health status
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    return await apiRequest('/health');
  }
};

// Export API modules
export { TasksAPI, HealthAPI, APIError };
