# Chapter 9: Collaborative Debugging and Troubleshooting - Code Snippets

## Prompt Template for AI-Led Investigation

```markdown
# Prompt template for AI-led investigation

A debugging problem requires investigation. Act as a systematic debugging investigator. After receiving the basic problem description below, ask 5-7 targeted questions to understand the problem comprehensively. Focus on gathering the most critical information for root cause analysis.

Here's the basic problem: [Insert concise problem statement]

Please ask questions one category at a time, starting with the most critical information needed for analysis.
```

---

## Prompt to Collaborate with AI for Bug Fixing

```markdown
# Prompt to collaborate with AI for bug fixing
## explain the bug

There is a bug in our Task-Flow task completion feature. When a user marks a task as completed, it updates correctly in their own view but other team members still see it as 'in progress' until they refresh the page. Here's the problematic function:

## add your code snippet
```typescript
function completeTask(taskId, userId) {
    // Updates database correctly
    database.updateTask(taskId, { status: 'completed', completedBy: userId });
    
    // Updates current user's UI
    updateLocalTaskList(taskId, 'completed');
    
    // Missing: real-time notification to other team members
    return { success: true };
}
```

## ask for approaches
What are 2-3 different approaches to fix this sync issue? Need solutions that ensure all team members see task updates immediately without requiring page refreshes.
```

---

## Prompt to Validate the Bug Fix

```markdown
# Prompt to validate the bug fix

I've decided to implement [chosen-solution]. 

## Validate the approach with AI once
Before I start coding this fix, what could go wrong? What should I test to make sure this solution doesn't break anything else in our Task-Flow application?
```

---

## Prompt to Verify the Fix

```markdown
# Prompt to verify the fix

I've implemented the [bug-fix]. 

How should I verify that:
1. The original issue is actually resolved
2. All team members receive task updates in real-time
3. The system handles edge cases properly

What specific test scenarios should I run to prove this fix works?
```

---

## Prompt for Post-Fix Monitoring

```markdown
# Prompt for post-fix monitoring

[the solution to the bug] is deployed. What specific metrics should I monitor to confirm it's working correctly and catch any issues early?
```

---

## Prompt to Generate Session Summary

```markdown
# Prompt to generate session summary

Help me document this debugging session for our team knowledge base. Structure this as a brief case study in the following format

Issue: [name-of-the-issue]
Investigation: [areas-of-investigation]
Identified approaches: [possible-approaches-to-fix-the-bug]
Solution: [implemented approach]
```

---

## Prompt to Extract Patterns from Debugging

```markdown
# Prompt to extract patterns from debugging

Looking at our last 10 debugging sessions, can you help identify common investigation patterns we should standardize for real-time collaboration issues?
```

---

## Prompt Template for System Analysis

```markdown
# Prompt template for system analysis

I have a *[problem description]* in our *[monolith/microservices/product-based]* system.
The error message is *[error message]* but *[context about why error seems wrong]*.
Our system involves: *[list all components: frontend tech, backend tech, database, external services, etc.]*.
Help me map out the complete flow from *[starting action]* to *[expected outcome]*, identifying where this error could originate.
```

---

## Prompt Template to Assemble the Context

```markdown
# Prompt template to assemble the context 

I've identified that our *[problem type]* occurs in the *[specific component]* when *[specific action/condition]*.
Here are the relevant logs from each system: *[System 1 logs]*, *[System 2 logs]*, *[External service response]*.
Help me correlate these logs to understand the complete failure timeline and identify what's causing *[specific issue description]*.
```

---

## Prompt to Analyze Legacy Codebase

```markdown
# Prompt to analyze legacy codebase

I need to debug this legacy code that's causing *[problem description]* in our *[system/module name]*.
The function/file is *[approximate size]* lines long and has *[documentation status]*.
Here's the code: *[function code or code files]* and documentation *[if any docs are present]*.
Can you help me understand: 
1) What business purpose this function serves
2) What the main logic flow is
3) Where [specific problem type] could occur?
```

---

## Prompt to Perform Historical Analysis

```markdown
# Prompt to perform historical analysis 

I'm debugging a legacy *[problem type]* issue.
Here are the last *[number]* commits that touched this file: *[commit history with messages and diffs]*.
Based on these changes, which modifications are most likely to have introduced *[specific problem type]* problems? What should I investigate first?"
```
