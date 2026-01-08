# Chapter 4: Prompt Engineering - Code Snippets

## Poor vs Effective Prompts

```markdown
# Poor Prompt
"Write a sort function"

# Effective Prompt
"Create a TypeScript function that sorts an array of product objects
by price in ascending order"
```

---

## Alternate Prompt with Detailed Error Information

```markdown
# Alternate prompt with detailed information on the error

The following TypeScript compilation error occurred:

error TS2339: Property 'name' does not exist on type 'User'.
at user-service.ts:42:18
```

---

## Clarity Examples

```markdown
# Poor Prompt (Lacks Clarity)
"Refactor this code"

# Effective Prompt (Clear and Specific)
"Remove the nested if statements in this JavaScript function and
replace them with early returns to improve readability."
```

---

## Prompt with Constraints

```markdown
# Prompt with constraints

"Create a Python function for processing CSV files with the
following constraints:
- Must use pandas library for data manipulation
- Must handle Unicode encoding issues gracefully"
```

---

## Sample of a Well-Crafted Prompt

```markdown
# A sample of a well-crafted prompt

Create a JavaScript function to validate email addresses. The
function will be used in a user registration form for a React web
application that needs to check emails before submitting to the
backend API. The function should return true for valid emails and
false for invalid ones, must not use external libraries, and should
handle common edge cases like empty strings and null values. Please
provide the function with clear parameter names, JSDoc
documentation, and include 2-3 test examples showing usage.
```

---

## Common Anti-Patterns

```markdown
# Vague and Ambiguous
"Make a sorting function"

# Specific and Clear
"Create a JavaScript function that sorts an array of user objects by
their lastName property in ascending order, with a fallback to
firstName for users with identical last names"
```

---

```markdown
# Anti-pattern: Too Much Irrelevant Detail
"Create a function for our e-commerce platform that handles user
authentication. Our platform was built in 2019, uses a microservices
architecture deployed on AWS, serves customers in 15 countries has a
team of 50 developers, and this Node.js application needs to
integrate with our legacy database system"

# Better Approach: Relevant Context Only
"Create a Node.js function that validates JWT tokens for user
authentication in a microservices architecture."
```

---

```markdown
# Anti-pattern: Conflicting Requirements
"Create a lightweight, minimal JavaScript function that includes
comprehensive error handling, detailed logging, input validation,
performance monitoring, caching, retry logic, and extensive
configuration options"
```

---

## Fundamental Prompt Templates

```markdown
# Code Generation Prompt Template
"Create a [language] [component type] that [primary
functionality] with [specific features], handling [edge cases].
It should integrate with [existing system] and follow [coding
standards]."

# Code Generation Prompt Example
"Create a Python class called WeatherService that fetches weather
data from an external API, caches responses for 30 minutes, and
handles network failures gracefully. It should expose methods for
current conditions and 5-day forecasts, following PEP 8 style
guidelines."
```

---

```markdown
# Code Explanation Prompt Template
"Explain how this [language] code works, focusing on [specific
aspects] and [key mechanisms]. Break down the [complex parts]
and highlight any [patterns/optimizations/concerns]."

# Code Explanation Prompt Example
"Explain how this Python code works, focusing on the use of list
comprehensions and iteration. Break down the logic for filtering
even numbers and highlight any performance optimizations or
readability concerns."
```

---

```markdown
# Debugging Prompt Template
"Help fix this [language] code that [error description]. The
current behavior is [observation], but the expected behavior is
[expectation]. Error message: [exact error text]."
```

---

```markdown
# Refactoring Prompt Template
"Improve this [language] code by [improvement goals]. Focus on
[primary concerns] while maintaining [requirements]. Consider
applying [patterns/techniques]."
```

---

```markdown
# Documentation Prompt Template
"Create [documentation type] for this [language] code following
[documentation standard]. Include [required sections] and focus
on [target audience] needs."
```

---

## Language and Framework Considerations

```markdown
# TypeScript (Statically Typed) Prompt
"Create a generic function in TypeScript that safely merges two
objects of different types, preserving type information for
autocomplete."

# JavaScript (Dynamically Typed) Prompt
"Create a JavaScript function that merges two objects, with runtime
type checking to validate property compatibility before merging."
```

---

```markdown
# React Specific Prompt
"Create a React functional component that implements a responsive
navigation drawer using hooks for state management. Follow the React
concurrent mode best practices for performance optimization."

# Django Specific Prompt
"Create a Django model class for a blog post with appropriate
fields, along with related serializer and view-set classes following
Django REST Framework conventions."
```

---

```markdown
# Web Platform Prompt
"Create a JavaScript module that handles browser local storage with
fallback mechanisms for older browsers. Ensure cross-browser
compatibility and consider storage limitations."
```

---

## Practical Application Scenarios

```markdown
# Ideation Prompt
"Design a simple to-do list feature for a web application. The
feature should allow users to add tasks, mark as complete, and
delete tasks. Suggest the approach and a low-level design of the UI
system. Consider a simple and minimalistic interface."

# Development Prompt
"Implement a React component called `TodoList` that displays a
list of tasks, with buttons to add new tasks, mark them as complete,
and delete them. Use local component state to manage the list."

# Testing Prompt
"Write unit tests for the `TodoList` React component using Jest
and React Testing Library. Ensure tests cover adding a task, marking
a task as complete, and deleting a task."
```

---

```markdown
# Prompt Integrating Static Analysis Results
Pylint scan of app/utils/processor.py shows:
`C0103: Variable 'x' doesn't conform to snake_case (line 15)`
Refactor to address these issues while maintaining current
functionality.

# Code Review Prompt Template
Review the [component] for code quality, readability, and
alignment with team practices (refer #team-guidance.md). Suggest
improvements on [specific focus areas]
```

---

## Advanced Prompt Engineering Techniques

```markdown
# Multi-Part Prompt Template

## Initial Planning Prompt
"I need to develop [complex feature]. Let's break this down into
manageable parts:

1. First, let's discuss the overall architecture and approach
2. Then we'll implement each component in sequence
3. Finally, we'll integrate the components together

Let's start with part 1: [specific first task]"

## Subsequent Prompts (with Context Preservation)
"Based on our previous discussion where we [brief summary of
previous work], let's now move to the next part:

[Details of the current task with reference to decisions/code from
earlier parts]

Please implement [specific component/feature] while maintaining
consistency with our established approach."
```

---

```markdown
# Summarizing the Conversation
"Before we continue, let me summarize our progress so far:
- We've implemented [component A] with [key characteristics]
- We designed [architecture pattern] to handle [specific
requirement]
- We decided to use [technology/approach] because [brief
reason]

Now, let's proceed with [next task]."
```

---

```markdown
# Chain of Thought Reasoning Template
I need to solve [problem]. Please think through this step-by-step:

1. First, analyze [initial aspect of the problem]
2. Next, consider [second aspect or decision point]
3. Then, evaluate [additional considerations or alternatives]
4. Finally, develop [the solution based on previous steps]

Walk me through your reasoning at each step before providing the
final solution.
```

---

```markdown
# Role Based Prompting Template
You are a [specific professional role] with expertise in
[relevant technologies/domains].

Project Context:
- Technology stack: [languages, frameworks, libraries]
- Coding standards: [style guidelines, patterns to follow]
- Constraints: [performance requirements, compatibility needs]

When generating code:
- Always [specific requirement 1]
- Make sure to [specific requirement 2]
- Never [thing to avoid]
- Follow [specific pattern or approach]

Your responses should prioritize [quality attributes] and include
[expected components].
```

---

```markdown
# Few-Shot Learning Template
I need to create [new item] based on the following examples of
[similar items].

Example 1:
[Complete example with all key patterns and conventions clearly
visible]

Example 2:
[Another complete example that reinforces patterns or shows
variations]
```

---

## Structured Frameworks

```markdown
# AUTOMAT Framework Prompt Template

## A - Act as
[Specify the developer role or expertise level. e.g., "Senior
backend developer with authentication expertise"]

## U - User Persona & Audience
[Define the target users of the code/system. e.g., "Mobile app
users accessing financial data"]

## T - Targeted Action
[Describe the specific development task or goal. e.g., "Implement a
secure login endpoint that handles user authentication with JWT
tokens."]

## O - Output Definition
[Specify the expected format and content. e.g., "Provide all
routes, middleware configuration, error handling logic and unit
tests."]

## M - Mode/Tonality/Style
[Define the coding style and conventions. e.g., "Use async/await
patterns, descriptive variable names, and docs following our team
standards."]

## A - Atypical Cases
[List edge cases that need handling. e.g., "Handle brute force
attempt detection and account lockout procedures"]

## T - Topic Whitelisting
[Specify relevant technologies and constraints. e.g., "Use
Express.js, MongoDB, JWT for tokens, and bcrypt for password
comparison."]
```

---

```markdown
# CO-STAR Framework Prompt Template

C - Context
[Provide project background and existing codebase details. e.g.,
"Financial app with Express.js backend needing security upgrade"]

O - Objective
[Define the specific development goal or feature. e.g., "Implement
secure login endpoint with JWT"]

S - Style & Tone
[Specify coding conventions and documentation approach. e.g.,
"Async/await, descriptive names, JSDoc comments"]

T - Technical Constraints
[List language versions, frameworks, and libraries. e.g.,
"Express.js, MongoDB, JWT, bcrypt, OWASP guidelines"]

A - Audience
[Define the team members or end users. e.g., "Mobile app users
accessing financial data"]

R - Response Format
[Specify the expected code structure and documentation. e.g.,
"Express route with middleware, error handling, and tests"]
```

---

```markdown
# Combining Prompt Techniques

## System Prompt (Role-Based)
"You are an expert..."

## Initial Request (Chain of Thoughts)
"We need to implement [feature]. Let's approach this
systematically ..."

## Implementation Guidance (Few-shot + Multi-part)
"Based on our architectural decisions, implement [feature]. Use
the following examples for clarity..."
```

---

## Context Management Strategies

```markdown
# Progressive Context Building

## Foundation
"I'm building a React e-commerce app with a shopping cart feature."

## Expansion
"Now I need a Cart component that displays items, quantities, and
prices, with the ability to update quantities."

## Refinement
"Ensure the Cart component prevents item quantities from going below
zero"
```

---

```markdown
# Hierarchical Context Management

# Project context:

<!-- Explain the project tech landscape and constraints. -->

# Module context: [Name of the module]

<!-- Explain the responsibilities and boundaries of the module. -->

# Function context: [Name of the function]

<!-- Responsibilities and Signature of the function. -->
```

---

## Domain-Specific Prompt Strategies

```markdown
# Front-end Prompt with Artifacts
"Implement a navigation component based on this wireframe [attach
image] that integrates with the existing design system at [URL].
The component should handle responsive breakpoints defined in the
style guide and maintain accessibility standards outlined in the
team documentation."
```

---

```markdown
# Back-end Prompt with OpenAPI Spec
"Generate a [api] based on this OpenAPI specification [attach
file]. The implementation should use the database schema defined in
the ERD [attach diagram] and integrate with the existing
[authentication system] as shown in the system architecture
[attach architecture diagram]."
```

---

```markdown
# Data Science Prompts with Datasets
"Analyze [pattern] using this dataset sample [attach CSV]. The
analysis should identify [metric] with 95% confidence intervals
and generate actionable insights. Deliverables include an executive
summary with key findings and a detailed statistical analysis with
methodology documentation"
```
