# AI Collaboration Prompt Examples for Requirements Analysis

This document provides practical examples of effective prompts and conversation patterns used during the TaskFlow requirements analysis phase. These examples demonstrate how to structure AI interactions for maximum clarity and productive outcomes.

## Initial Requirements Gathering

### Prompt Pattern: Requirement Clarification

**Effective Prompt:**
```
I have a requirement to "build a task management board." Help me break this down into specific, implementable requirements. Please ask clarifying questions about:

1. Functional scope and core features
2. Technical constraints and preferences  
3. User experience priorities
4. Success criteria and limitations

For each area, provide 3-4 specific questions that will help refine the requirement.
```

**Why This Works:**
- Provides clear structure for the analysis
- Requests specific outputs (questions)
- Limits scope to manageable areas
- Asks for concrete deliverables

### Prompt Pattern: Scope Boundary Definition

**Effective Prompt:**
```
Based on our discussion of task management features, help me define what should be included in version 1.0 versus future enhancements. Consider:

- Educational value (this is a learning project)
- Development complexity
- Time constraints for implementation
- Clear demonstration of AI collaboration principles

Provide three lists: Must Have, Should Have, Won't Have (for now)
```

**Response Framework Expected:**
- **Must Have**: Core features essential for basic functionality
- **Should Have**: Features that add value but aren't critical
- **Won't Have**: Features deferred to future versions

## Technical Requirements Analysis

### Prompt Pattern: Technology Stack Selection

**Effective Prompt:**
```
I need to choose a technology stack for a task management board that will serve as an educational case study. The requirements are:

- Simple enough for learning purposes
- Modern but not cutting-edge
- Minimal external dependencies
- Good documentation potential

Compare 2-3 options for backend and frontend, explaining trade-offs for each. Focus on educational value rather than production scalability.
```

**Follow-up Prompt:**
```
Based on your recommendation of [chosen stack], what would be the minimal project structure and key files needed? Provide a directory tree and brief description of each component's purpose.
```

### Prompt Pattern: API Design Planning

**Effective Prompt:**
```
Design a RESTful API for the task management system with these entities:
- Tasks (id, title, description, status, priority, assignee, created_date)
- Status values: todo, in-progress, completed

Provide:
1. Complete endpoint list with HTTP methods
2. Request/response examples for each endpoint
3. Error handling approach
4. Any assumptions about data validation

Keep it simple but follow REST conventions properly.
```

## User Experience Requirements

### Prompt Pattern: UI/UX Specification

**Effective Prompt:**
```
Describe the user interface for a task management board with these requirements:
- Kanban-style layout with three columns
- Task cards showing key information
- Filter and search capabilities
- Mobile-responsive design

For each UI component, specify:
1. Visual layout and positioning
2. Required user interactions
3. Information to display
4. Responsive behavior on mobile

Focus on simplicity and usability over advanced features.
```

### Prompt Pattern: User Story Development

**Effective Prompt:**
```
Convert these functional requirements into user stories:
[List of functional requirements]

For each user story, use the format:
"As a [user type], I want [goal] so that [benefit]"

Also include acceptance criteria for each story in the format:
"Given [context], when [action], then [expected outcome]"
```

## Requirements Validation

### Prompt Pattern: Completeness Check

**Effective Prompt:**
```
Review this requirements document for completeness and consistency:
[Attach requirements document]

Check for:
1. Missing functional requirements
2. Unclear or ambiguous statements
3. Inconsistencies between sections
4. Technical feasibility concerns
5. Missing non-functional requirements

Provide specific feedback with suggested improvements.
```

### Prompt Pattern: Risk Assessment

**Effective Prompt:**
```
Analyze the potential risks for this project based on the requirements:
[Requirements summary]

For each risk identified:
1. Describe the risk and its potential impact
2. Assess probability (Low/Medium/High)
3. Suggest specific mitigation strategies
4. Identify early warning signs

Focus on technical and project management risks most relevant to a learning project.
```

## Common Anti-Patterns to Avoid

### ❌ Vague Prompts
```
"What should I build for task management?"
"Help me with requirements."
"Make this better."
```

### ❌ Overly Complex Prompts
```
"Design a complete enterprise task management system with user authentication, real-time collaboration, advanced reporting, mobile apps, third-party integrations, scalable microservices architecture, comprehensive security, and detailed analytics while considering performance optimization, accessibility compliance, internationalization support, and integration with 15 different external APIs..."
```

### ❌ Solution-First Prompts
```
"Build me a React app with Redux for task management."
"I want to use MongoDB and GraphQL for my project."
```

## Conversation Flow Examples

### Example 1: Initial Requirement Breakdown

**Human**: "I want to build a task management board."

**AI**: "I'd be happy to help you build a task management board! To create a focused requirements document, I need to understand your specific needs better. Let me ask some clarifying questions:

**Functional Scope:**
1. Should users be able to create, edit, and delete tasks?
2. What task states do you need? (e.g., Todo, In Progress, Done)
3. Do you need task assignment to different users?
4. Should tasks have priorities, due dates, or categories?

**Technical Context:**
1. Is this for learning purposes or production use?
2. Do you have any technology preferences?
3. Should it work offline or require internet connectivity?
4. What's your timeline for completion?

**User Experience:**
1. Who will be the primary users?
2. Do you need mobile support?
3. Should it integrate with other tools?
4. Any specific design inspirations?

Which area would you like to start with?"

**Human**: "This is for learning purposes. I want something simple but complete. Let's start with functional scope."

**AI**: "Perfect! For a learning-focused project, let's keep the functional scope clean and educational. Based on your preference for 'simple but complete,' I'd recommend:

**Core Features (Must Have):**
- Create tasks with title and description
- Three-state workflow: Todo → In Progress → Done
- Visual kanban board layout
- Basic filtering by status

**Enhanced Features (Should Have):**
- Search tasks by title/description
- Task completion statistics
- Simple priority indicators

**Features to Skip (Won't Have):**
- User authentication
- Multi-user collaboration
- Complex task relationships

Does this scope feel right for your learning objectives? What would you like to add or remove?"

### Example 2: Technical Stack Discussion

**Human**: "What technology stack should I use for this?"

**AI**: "For a learning-focused task management board, I'd recommend keeping the stack simple but modern. Here are two good options:

**Option 1: Minimal Stack**
- Backend: Node.js + Express.js
- Frontend: Vanilla JavaScript + HTML/CSS
- Data: JSON files
- Benefits: Minimal dependencies, clear fundamentals, easy to understand

**Option 2: Lightweight Modern Stack**
- Backend: Node.js + Express.js
- Frontend: React (without additional libraries)
- Data: JSON files or SQLite
- Benefits: Modern patterns, component thinking, still manageable

For maximum learning value with your 'simple but complete' goal, I'd recommend **Option 1**. It lets you focus on:
- Core web development concepts
- API design principles
- Clean JavaScript patterns
- Project organization

The vanilla JavaScript approach will make the AI collaboration patterns more visible since you'll be writing more explicit code.

What's your experience level with these technologies?"

## Best Practices Summary

### Effective Prompt Characteristics
1. **Specific and Focused**: Target one aspect at a time
2. **Context-Aware**: Include relevant background information
3. **Outcome-Oriented**: Specify what type of response you need
4. **Constraint-Aware**: Mention limitations and priorities
5. **Follow-up Ready**: Structure for iterative refinement

### Conversation Management
1. **Start Broad, Then Narrow**: Begin with high-level questions, drill down to specifics
2. **Validate Understanding**: Confirm AI responses align with your goals
3. **Document Decisions**: Capture key decisions and rationale
4. **Iterate Incrementally**: Build requirements through multiple focused conversations
5. **Stay Goal-Oriented**: Regularly check alignment with learning objectives

These prompt patterns and conversation flows provide a foundation for effective AI collaboration during requirements analysis, ensuring clear communication and productive outcomes.
