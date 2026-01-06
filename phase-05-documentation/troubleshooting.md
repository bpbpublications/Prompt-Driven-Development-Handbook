# TaskFlow Troubleshooting Guide

## Overview
This troubleshooting guide provides systematic solutions to common issues encountered when setting up, running, and understanding the TaskFlow educational case study. It includes both technical solutions and educational clarifications to support learning objectives.

## Quick Problem Identification

### Is it a Setup Issue?
- Application won't start
- Dependencies won't install
- Port conflicts or connection issues

### Is it a Code Understanding Issue?
- Educational concepts unclear
- Implementation patterns confusing
- AI collaboration examples difficult to follow

### Is it an Educational Alignment Issue?
- Code seems too complex/simple for learning level
- Examples don't match described educational objectives
- Missing connections between theory and implementation

---

## Technical Issues

### 1. Application Won't Start

#### Problem: "Cannot find module" errors
**Symptoms**:
```
Error: Cannot find module 'express'
    at Module._resolveFilename
```

**Solution**:
```bash
# Navigate to backend directory
cd case-study/vibe-coding-case-study/backend

# Install dependencies
npm install express

# Or install all dependencies if package.json exists
npm install
```

**Educational Note**: This demonstrates dependency management in Node.js projects. The error occurs because Node.js modules must be explicitly installed before use.

#### Problem: Port already in use
**Symptoms**:
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solutions**:
```bash
# Option 1: Find and stop the process using the port
lsof -ti:3001 | xargs kill -9

# Option 2: Use a different port
# Edit backend/server.js and change port number
const PORT = process.env.PORT || 3002;
```

**Educational Note**: Port conflicts are common in development. Learning port management is an essential skill for web developers.

#### Problem: Frontend can't connect to backend
**Symptoms**:
- Frontend loads but shows no tasks
- Console errors: "Failed to fetch"
- Network tab shows 404 or connection errors

**Solution**:
```javascript
// Check frontend/js/app.js API URL configuration
const API_URL = 'http://localhost:3001'; // Ensure this matches backend port

// Verify backend is running
// Navigate to http://localhost:3001/api/tasks in browser
// Should return JSON task data
```

**Educational Note**: Frontend-backend communication requires matching URLs and ports. This is a fundamental concept in web application architecture.

### 2. Code Editing and Development Issues

#### Problem: Changes not reflecting in browser
**Symptoms**:
- Code changes made but frontend behavior unchanged
- Old data still displaying

**Solutions**:
```bash
# Solution 1: Hard refresh browser
# Chrome/Firefox: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Solution 2: Clear browser cache
# Browser Settings > Clear browsing data > Cached images and files

# Solution 3: Check file saving
# Ensure files are actually saved (check for unsaved indicators in editor)
```

**Educational Note**: Browser caching is designed for performance but can interfere with development. Understanding caching behavior is important for web developers.

#### Problem: JSON data file corruption
**Symptoms**:
- Server errors when starting
- "Unexpected token" in JSON parsing
- Empty or malformed task display

**Solution**:
```bash
# Navigate to backend/data directory
cd backend/data

# Backup existing file (if needed)
cp tasks.json tasks.json.backup

# Restore from clean template
cat > tasks.json << 'EOF'
{
  "tasks": [
    {
      "id": 1,
      "title": "Set up development environment",
      "description": "Install Node.js, set up project structure, and configure basic dependencies",
      "status": "completed",
      "priority": "high",
      "category": "setup",
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Design API endpoints",
      "description": "Define RESTful API structure for task management operations",
      "status": "completed",
      "priority": "high",
      "category": "planning",
      "createdAt": "2024-01-15T09:00:00Z",
      "updatedAt": "2024-01-15T14:20:00Z"
    },
    {
      "id": 3,
      "title": "Implement frontend components",
      "description": "Create task display, filtering, and statistics components",
      "status": "in-progress",
      "priority": "medium",
      "category": "development",
      "createdAt": "2024-01-16T08:30:00Z",
      "updatedAt": "2024-01-16T16:45:00Z"
    },
    {
      "id": 4,
      "title": "Add data validation",
      "description": "Implement input validation and error handling for all endpoints",
      "status": "pending",
      "priority": "medium",
      "category": "development",
      "createdAt": "2024-01-16T10:00:00Z",
      "updatedAt": "2024-01-16T10:00:00Z"
    },
    {
      "id": 5,
      "title": "Write documentation",
      "description": "Create comprehensive API documentation and user guides",
      "status": "pending",
      "priority": "low",
      "category": "documentation",
      "createdAt": "2024-01-16T11:00:00Z",
      "updatedAt": "2024-01-16T11:00:00Z"
    }
  ]
}
EOF
```

**Educational Note**: JSON syntax is strict; missing commas, extra commas, or unquoted strings cause parsing errors. This is a common source of bugs in web applications.

### 3. Testing and Validation Issues

#### Problem: Manual testing procedures unclear
**Symptoms**:
- Uncertainty about what to test
- Unclear testing steps
- Inconsistent validation results

**Solution**:
Follow systematic testing approach:

```bash
# 1. Backend API Testing
# Test each endpoint individually
curl http://localhost:3001/api/tasks
curl "http://localhost:3001/api/tasks?status=completed"
curl "http://localhost:3001/api/tasks?category=development"

# 2. Frontend Integration Testing
# Open browser to http://localhost:3000
# Verify each filter option works
# Check statistics update correctly
# Validate responsive design at different screen sizes
```

**Educational Note**: Systematic testing ensures all components work correctly. Manual testing teaches the importance of user perspective in software validation.

---

## Educational Understanding Issues

### 1. Code Complexity vs. Learning Level

#### Problem: Code seems too complex for educational purposes
**Symptoms**:
- Difficulty understanding code flow
- Too many concepts introduced simultaneously
- Implementation details obscure learning objectives

**Solution - Simplification Approach**:
1. **Focus on Single Concepts**: Study one component at a time
   - Start with `backend/data/tasks.json` (data structure)
   - Move to `backend/routes/tasks.js` (API logic)
   - Then examine `frontend/js/app.js` (client logic)

2. **Use Comments as Learning Guides**: Read code comments that explain educational intent
3. **Reference Phase Documentation**: Each phase explains why certain approaches were chosen

**Educational Note**: Professional code can seem complex initially. Breaking it into smaller pieces and understanding the educational intent helps build comprehension gradually.

#### Problem: AI collaboration examples too advanced
**Symptoms**:
- Prompt engineering concepts unclear
- AI responses seem too sophisticated
- Difficulty replicating collaboration patterns

**Solution - Progressive Learning**:
1. **Start with Simple Prompts**: Practice basic AI interaction
   ```
   Simple: "Help me understand this code"
   Advanced: "Analyze this implementation for educational effectiveness and suggest improvements that maintain learning clarity while demonstrating professional patterns"
   ```

2. **Study Prompt Patterns**: Reference documented AI collaboration examples in each phase
3. **Practice Incrementally**: Try similar prompts with smaller code examples

**Educational Note**: AI collaboration is a skill that develops over time. Start simple and gradually increase complexity as comfort and understanding grow.

### 2. Missing Educational Context

#### Problem: Implementation choices seem arbitrary
**Symptoms**:
- Unclear why certain approaches were selected
- Missing connections between code and learning objectives
- Implementation seems disconnected from educational theory

**Solution - Context Recovery**:
1. **Read Development Context**: Check `phase-02-architecture/development-context.md`
2. **Review Decision Rationale**: Each phase documents why specific approaches were chosen
3. **Connect to Learning Objectives**: Reference original requirements in `phase-01-requirements/`

**Educational Note**: Educational software development involves many intentional choices that may not be obvious from code alone. Documentation provides essential context for understanding the reasoning behind implementation decisions.

#### Problem: Testing approach unclear for educational setting
**Symptoms**:
- Uncertain about testing expectations
- Unclear balance between comprehensive testing and educational focus
- Testing procedures seem either too simple or too complex

**Solution - Educational Testing Framework**:
1. **Understand Testing Hierarchy**:
   - **Unit Tests**: Focus on individual function behavior
   - **Integration Tests**: Verify component interaction
   - **E2E Tests**: Validate complete user workflows

2. **Reference Educational Testing Strategy**: See `phase-04-testing/testing-strategy.md`
3. **Practice Sample Tests**: Run provided test examples to understand implementation

**Educational Note**: Educational testing balances comprehensive coverage with learning clarity. The goal is teaching testing concepts, not exhaustive validation.

---

## AI Collaboration Issues

### 1. Prompt Engineering Problems

#### Problem: AI responses don't match educational objectives
**Symptoms**:
- AI suggests production-level complexity
- Responses ignore educational constraints
- Generated code exceeds learning level requirements

**Solution - Improved Prompting**:
```
Less Effective:
"Help me improve this code"

More Effective:
"Help me improve this code for educational purposes. The target audience is intermediate developers learning API development. Focus on clarity and learning value rather than production optimization. Maintain the read-only educational constraint."
```

**Educational Note**: AI collaboration requires clear communication of context and constraints. Educational projects need explicit guidance to maintain appropriate scope and complexity.

#### Problem: Context loss across AI collaboration sessions
**Symptoms**:
- AI forgets previous project decisions
- Inconsistent suggestions across sessions
- Loss of educational focus in multi-session development

**Solution - Context Preservation**:
1. **Session Openings**: Always start with project context
   ```
   "I'm working on TaskFlow, an educational task management system. In previous sessions, we focused on read-only operations to demonstrate API patterns without CRUD complexity. Now I need help with..."
   ```

2. **Reference Previous Work**: Point to specific files and decisions
3. **Restate Constraints**: Remind AI of educational objectives and limitations

**Educational Note**: AI systems don't inherently maintain long-term context. Successful AI collaboration requires deliberate context management strategies.

### 2. Educational Adaptation Issues

#### Problem: AI generates too much production complexity
**Symptoms**:
- AI suggests database integration for simple JSON file storage
- AI recommends authentication systems for educational examples
- AI proposes optimization that obscures learning concepts

**Solution - Educational Constraint Management**:
1. **Explicit Simplification Requests**:
   ```
   "This implementation is too complex for educational purposes. Help me simplify it while maintaining the core learning concepts. Remove [specific complex features] and focus on [specific learning objectives]."
   ```

2. **Educational Quality Check**:
   ```
   "Evaluate this implementation for educational effectiveness. Is the complexity appropriate for intermediate developers learning API development? What can be simplified without losing educational value?"
   ```

**Educational Note**: AI naturally trends toward comprehensive solutions. Educational success requires intentional simplification and focus on core learning concepts.

---

## Performance and Quality Issues

### 1. Application Performance Problems

#### Problem: Slow response times
**Symptoms**:
- API calls taking longer than expected
- Frontend feels sluggish
- Delays in task filtering and statistics updates

**Solutions**:
1. **Check Data Size**: Verify tasks.json isn't excessively large for educational purposes
2. **Browser Developer Tools**: Use Network tab to identify slow requests
3. **Simplify for Education**: Remove unnecessary complexity that impacts performance

**Educational Note**: Performance considerations in educational software should balance realistic behavior with learning clarity. Some optimizations may obscure educational concepts.

#### Problem: Code quality doesn't meet educational standards
**Symptoms**:
- Inconsistent naming conventions
- Missing or unclear comments
- Poor separation of concerns

**Solution - Educational Code Review**:
```bash
# Use AI for systematic code review
# Focus on educational clarity rather than production optimization
# Ensure consistent patterns across all components
# Validate that comments explain educational intent
```

**Educational Note**: Educational code must meet higher clarity standards than production code. Every implementation choice should serve a learning objective.

---

## Documentation and Understanding Issues

### 1. Documentation Inconsistencies

#### Problem: Documentation doesn't match implementation
**Symptoms**:
- Code behavior differs from documentation descriptions
- Examples in documentation don't work with actual implementation
- Phase documentation seems disconnected from code reality

**Solution - Documentation Validation**:
1. **Cross-Reference Implementation**: Verify documentation examples against actual code
2. **Test Documentation Examples**: Run all provided code examples to ensure accuracy
3. **Update Documentation**: Align documentation with implementation reality

**Educational Note**: Educational credibility requires documentation accuracy. Students lose confidence when documentation doesn't match implementation.

#### Problem: Missing educational context in code
**Symptoms**:
- Code lacks comments explaining educational intent
- Implementation choices seem arbitrary
- Difficult to understand learning progression

**Solution - Educational Annotation**:
1. **Add Educational Comments**: Explain why specific approaches were chosen for learning
2. **Reference Learning Objectives**: Connect code implementations to specific educational goals
3. **Document Decision Points**: Explain where complexity was reduced for educational purposes

**Educational Note**: Educational code requires more extensive commenting than production code. Comments should explain both functionality and educational intent.

---

## Prevention Strategies

### 1. Setup Prevention
- **Environment Documentation**: Maintain clear setup instructions
- **Dependency Management**: Document all required dependencies
- **Version Compatibility**: Specify compatible versions for all tools

### 2. Educational Quality Prevention
- **Regular Educational Reviews**: Periodically assess learning effectiveness
- **Complexity Monitoring**: Watch for scope creep that exceeds educational objectives
- **Context Documentation**: Maintain clear educational decision rationale

### 3. AI Collaboration Prevention
- **Prompt Templates**: Develop reusable prompt patterns for educational projects
- **Context Management**: Establish systematic approaches for context preservation
- **Educational Constraint Documentation**: Clearly document and communicate educational boundaries

---

## Getting Additional Help

### When to Seek Help
- **Technical Issues**: When problems persist after trying documented solutions
- **Educational Clarity**: When learning objectives remain unclear after reading documentation
- **AI Collaboration**: When prompt engineering approaches aren't producing desired educational outcomes

### Resources for Help
1. **Documentation**: Reference comprehensive phase documentation
2. **Code Comments**: Read educational intent comments throughout codebase
3. **AI Collaboration**: Use AI to clarify concepts and generate explanations

### Reporting Issues
When documenting issues for resolution:
1. **Describe Symptoms**: What specifically isn't working?
2. **Educational Context**: What learning objective is being impacted?
3. **Steps Attempted**: What solutions have been tried?
4. **Expected Outcome**: What should happen for educational success?

---

## Conclusion

This troubleshooting guide addresses common technical and educational issues encountered in the TaskFlow case study. The key to successful resolution is understanding that educational software development has unique requirements that differ from production development. Issues should be resolved in ways that maintain educational clarity and support learning objectives.

For ongoing success, maintain focus on educational outcomes, use systematic approaches to problem-solving, and leverage AI collaboration appropriately for both technical resolution and educational enhancement.
