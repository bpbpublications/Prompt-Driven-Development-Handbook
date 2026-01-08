# Chapter 5: Context Engineering Principles - Code Snippets

## Ad-Hoc Context Example

```markdown
# Ad-Hoc Context Example

"I'm working on a REST API using Node.js with Express. The project
follows a standard architecture with MongoDB as the database and JWT
for authentication.
- [explain the conventions of the API]
- [explain the conventions of JWT]
- [explain the schema for MongoDB]
For the user profile update endpoint, please make sure it follows
our project conventions. proper input validation, structured
response format, appropriate error handling, and enforces
authentication. The endpoint should allow users to update their
profile information like name, email, and preferences."
```

---

## Context Engineered Example

```markdown
# Context engineered example

Context Stack:
- API_FRAMEWORK_NODE_EXPRESS_v2.1
- JWT_STANDARD_IMPLEMENTATION  
- MONGODB_PATTERNS_v1.3

Task: Implement user profile update endpoint
```

---

## Option 1: Store Context Along with Repository

```markdown
# Repository structure with context files

my-project/
├── contexts/
│   ├── api-framework-node-express-v2.1.md
│   ├── jwt-auth-standard.md
│   └── mongodb-patterns.md
├── src/
└── package.json
```

---

## Option 2: Store Context in External Wiki

```markdown
# Example of attaching context from external source

Context Stack:
- GDPR_DATA_HANDLING_REQUIREMENTS (URL of the document)
- HIPAA_PATIENT_DATA_STANDARDS (URL of the document)

Task: Implement secure data collection form for patient information
```

---

## Option 3: Embed Context Information Within Source Code

```markdown
# Context references embedded in source code

/**
 * ATTENTION AI CODING ASSISTANT:
 * APPLY_CONTEXT: API_FRAMEWORK_NODE_EXPRESS_v2.1
 * APPLY_CONTEXT: JWT_STANDARD_IMPLEMENTATION
 * APPLY_CONTEXT: ERROR_HANDLING_PATTERNS
 */
class UserController {
// AI-assisted code will automatically incorporate the referenced context
// when editing this file, without requiring explicit instructions
}
```

---

## Ad-Hoc Context Approach vs Context-Engineered Approach

```markdown
# Ad-Hoc Context Approach

Prompt: "Create a login component for a React app using Material-UI.
Include email validation, password requirements, and error
handling."

AI response characteristics:
- Generic component implementation
- Standard validation patterns
- Basic error handling
- No integration with existing patterns
- Requires significant customization

# Context-Engineered Approach

Context System: WEBAPP_AUTHENTICATION_v1.2
Template: USER_INTERFACE_PATTERNS
Standards: MATERIAL_UI_CUSTOMIZATION_v2.0

Prompt: "Implement login component following established
authentication patterns"

AI response characteristics:
- Consistent with existing component patterns
- Integrated error handling following project standards
- Pre-configured with project-specific validation rules
- Aligned with established styling and interaction patterns
- Minimal customization required
```
