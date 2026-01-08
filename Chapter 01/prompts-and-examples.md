# Chapter 1: AI-Human Coding Revolution - Code Snippets

## Simple Starting Points - Factorial Function

```markdown
# Generating a simple function

## Sample prompt
Write a function to calculate the factorial of a number in Python

## AI might generate
def factorial(n):
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

---

```markdown
# Modifying the implementation

## Prompt
Can you rewrite this factorial function to use recursion instead?

## AI might respond with
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)
```

---

```markdown
# Adding documentation

## Prompt
Add docstring documentation to this factorial function
```
