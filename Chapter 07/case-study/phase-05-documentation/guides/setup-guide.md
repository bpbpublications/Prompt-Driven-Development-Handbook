# TaskFlow Setup Guide

## Overview
This guide provides step-by-step instructions for setting up the TaskFlow educational case study on your local development environment. TaskFlow demonstrates AI collaboration patterns in software development through a practical task management application.

## Prerequisites

### Required Software
- **Node.js**: Version 14.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **Text Editor or IDE**: 
  - VS Code (recommended for AI collaboration features)
  - Any editor with JavaScript support

- **Web Browser**: 
  - Chrome, Firefox, Safari, or Edge
  - Developer tools access recommended

### Optional Tools
- **Git**: For version control and collaboration
- **Postman or curl**: For API testing and exploration
- **Node Package Manager (npm)**: Included with Node.js installation

---

## Quick Start (5 minutes)

### 1. Download or Clone Project
```bash
# If using git
git clone [repository-url]
cd vibe-coding-case-study

# Or download and extract ZIP file
# Navigate to extracted folder
cd vibe-coding-case-study
```

### 2. Setup Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies (if package.json exists)
npm install

# Or install express manually
npm install express

# Start the backend server
node server.js
```

**Expected Output**:
```
TaskFlow backend server running on port 3001
Educational case study ready for development
```

### 3. Setup Frontend
```bash
# Open new terminal window/tab
# Navigate to frontend directory
cd frontend

# Start simple HTTP server (Python 3)
python3 -m http.server 3000

# Or use Python 2
python -m SimpleHTTPServer 3000

# Or use Node.js http-server (if installed globally)
npx http-server -p 3000
```

**Expected Output**:
```
Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ...
```

### 4. Verify Installation
1. **Open browser** to `http://localhost:3000`
2. **Verify task display**: Should see 5 sample tasks
3. **Test filtering**: Use status and category filters
4. **Check statistics**: Verify task counts update correctly

**Success Indicators**:
- ✅ Tasks display in organized layout
- ✅ Filters modify displayed tasks
- ✅ Statistics reflect current filter state
- ✅ No console errors in browser developer tools

---

## Detailed Setup Instructions

### Backend Setup

#### 1. Understanding the Backend Structure
```
backend/
├── server.js          # Express server configuration
├── routes/
│   └── tasks.js       # Task API endpoints
└── data/
    └── tasks.json     # Sample task data
```

#### 2. Backend Configuration
```javascript
// server.js configuration overview
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(cors()); // Cross-origin resource sharing

// API routes
app.use('/api', taskRoutes);
```

#### 3. Manual Backend Setup (Alternative)
If automated setup fails, create files manually:

**Create server.js**:
```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const taskRoutes = require('./routes/tasks');
app.use('/api', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'TaskFlow backend is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`TaskFlow backend server running on port ${PORT}`);
  console.log('Educational case study ready for development');
});
```

**Install Dependencies**:
```bash
npm init -y
npm install express cors
```

#### 4. Backend Verification
```bash
# Test backend directly
curl http://localhost:3001/health
# Expected: {"status":"healthy","message":"TaskFlow backend is running"}

curl http://localhost:3001/api/tasks
# Expected: JSON array with task objects
```

### Frontend Setup

#### 1. Understanding the Frontend Structure
```
frontend/
├── index.html         # Main application page
├── css/
│   ├── style.css      # Primary styles
│   └── responsive.css # Mobile/tablet styles
└── js/
    └── app.js         # Application logic
```

#### 2. Frontend Configuration
The frontend is a single-page application using vanilla JavaScript:
- **No build process required**
- **No framework dependencies**
- **Direct HTML/CSS/JS approach for educational clarity**

#### 3. Manual Frontend Setup (Alternative)
If you need to serve the frontend differently:

**Option 1: Node.js http-server**
```bash
# Install globally
npm install -g http-server

# Serve frontend
cd frontend
http-server -p 3000
```

**Option 2: Python SimpleHTTPServer**
```bash
cd frontend
# Python 3
python3 -m http.server 3000
# Python 2
python -m SimpleHTTPServer 3000
```

**Option 3: Live Server (VS Code Extension)**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### 4. Frontend Verification
1. **Navigate to** `http://localhost:3000`
2. **Open browser developer tools** (F12)
3. **Check console** for any errors
4. **Verify API connection** - tasks should load automatically

**Common Frontend Issues**:
- **CORS errors**: Ensure backend includes CORS middleware
- **API connection errors**: Verify backend is running on port 3001
- **Caching issues**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## Development Environment Configuration

### 1. Code Editor Setup

#### VS Code Configuration (Recommended)
**Useful Extensions**:
- **JavaScript (ES6) code snippets**: Enhanced JavaScript support
- **Live Server**: Local development server
- **REST Client**: API testing within VS Code
- **Prettier**: Code formatting
- **ESLint**: Code quality checking

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "javascript.preferences.includePackageJsonAutoImports": "auto",
  "liveServer.settings.port": 3000,
  "liveServer.settings.root": "/frontend"
}
```

#### 2. Browser Development Tools Setup

**Chrome DevTools Configuration**:
1. **Open DevTools**: F12 or Right-click → Inspect
2. **Enable Network tab**: Monitor API requests
3. **Use Console tab**: View JavaScript logs and errors
4. **Application tab**: Inspect local storage and session data

**Useful DevTools Tips**:
- **Disable cache**: Network tab → Disable cache (during development)
- **Device simulation**: Toggle device toolbar for responsive testing
- **Console filtering**: Filter logs by type (error, warning, info)

### 3. Git Configuration (Optional)

**Initialize Git repository**:
```bash
git init
git add .
git commit -m "Initial TaskFlow setup"
```

**Useful .gitignore**:
```
node_modules/
.env
.DS_Store
*.log
```

---

## Validation and Testing

### 1. Functionality Verification

#### Backend Testing
```bash
# Test all API endpoints
curl http://localhost:3001/api/tasks
curl "http://localhost:3001/api/tasks?status=completed"
curl "http://localhost:3001/api/tasks?category=development"
curl "http://localhost:3001/api/tasks?priority=high"
```

#### Frontend Testing
1. **Load Application**: Navigate to `http://localhost:3000`
2. **Test Filters**: 
   - Status filter: All, Completed, In Progress, Pending
   - Category filter: All, Setup, Planning, Development, Documentation
   - Priority filter: All, High, Medium, Low
3. **Verify Statistics**: Check task counts update with filters
4. **Test Responsiveness**: Resize browser window or use mobile view

### 2. Educational Objective Verification

#### Learning Outcomes Check
- ✅ **API Communication**: Frontend successfully calls backend endpoints
- ✅ **Data Filtering**: Query parameters modify API responses
- ✅ **Dynamic Updates**: UI updates based on API responses
- ✅ **Error Handling**: Graceful handling of connection issues

#### Code Comprehension Check
- ✅ **Server Configuration**: Understand Express.js setup
- ✅ **Routing Logic**: Follow API endpoint implementation
- ✅ **Frontend Integration**: Understand client-server communication
- ✅ **Data Flow**: Trace data from JSON file to browser display

---

## Common Setup Issues and Solutions

### 1. Port Conflicts
**Problem**: "Port already in use" errors
**Solution**: Use different ports or kill existing processes
```bash
# Find process using port
lsof -ti:3001
# Kill process
kill -9 [process-id]
# Or use different port in server.js
```

### 2. CORS Issues
**Problem**: Cross-origin requests blocked
**Solution**: Ensure CORS middleware in backend
```javascript
const cors = require('cors');
app.use(cors());
```

### 3. Module Installation Issues
**Problem**: npm install fails or modules not found
**Solutions**:
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules
npm install
# Use specific npm version
npm install express@4.18.0
```

### 4. Frontend Serving Issues
**Problem**: Frontend won't serve or displays incorrectly
**Solutions**:
- Verify file permissions: `chmod 755 index.html`
- Check file encoding: Ensure UTF-8 encoding
- Try different serving method: Use alternative HTTP server
- Clear browser cache: Hard refresh or private browsing

---

## Next Steps

### 1. Explore the Implementation
- **Read Phase Documentation**: Understand development decisions
- **Study Code Comments**: Follow educational explanations
- **Trace Data Flow**: Follow requests from frontend to backend

### 2. Experiment with the Code
- **Modify Task Data**: Edit `backend/data/tasks.json`
- **Add Console Logging**: Insert logging to understand flow
- **Test API Endpoints**: Use browser or Postman to explore API

### 3. Learn AI Collaboration Patterns
- **Study Prompt Examples**: Review AI collaboration documentation
- **Practice Prompting**: Try similar AI interactions
- **Apply to Other Projects**: Use learned patterns in different contexts

### 4. Extend the Application (Optional)
- **Add New Filters**: Implement date-based filtering
- **Enhance UI**: Improve styling or add animations
- **Add Validation**: Implement input validation and error messages

---

## Educational Value

### What You'll Learn
- **API Development**: RESTful endpoint design and implementation
- **Frontend-Backend Communication**: HTTP requests and JSON data handling
- **Code Organization**: Separation of concerns and modular structure
- **AI Collaboration**: Practical patterns for AI-assisted development

### Skills You'll Practice
- **JavaScript**: Modern ES6+ syntax and patterns
- **Node.js**: Server-side JavaScript and Express framework
- **HTTP**: Request/response cycle and status codes
- **JSON**: Data serialization and manipulation
- **Debugging**: Browser developer tools and troubleshooting

### Professional Patterns
- **MVC Architecture**: Model-View-Controller separation
- **RESTful Design**: Standard API endpoint conventions
- **Error Handling**: Graceful degradation and user feedback
- **Documentation**: Code comments and external documentation

---

## Conclusion

This setup guide provides comprehensive instructions for establishing the TaskFlow educational case study environment. The application demonstrates practical AI collaboration patterns while teaching fundamental web development concepts.

Success indicators include a working application that displays tasks, filters data correctly, and provides insight into professional development patterns. The setup serves as a foundation for exploring AI-assisted software development and understanding how AI collaboration can enhance both development efficiency and educational effectiveness.

For ongoing development and learning, refer to the other Phase 5 documentation files for troubleshooting, API reference, and knowledge capture insights.
