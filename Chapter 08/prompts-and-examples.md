# Chapter 8: Quality Assurance for AI-generated Code - Code Snippets

## Prompt Template for Self-Critique Validation

```markdown
# Prompt template for self-critique validation

You just generated the following code. Now act as your own critic:

[Generated code here]

Self-Assessment:
1. What assumptions did I make that might be wrong?
2. What would break if the inputs were malicious or unexpected?
3. Where might I have hallucinated dependencies or used outdated patterns?
4. If I were reviewing my own work as a senior developer, what would I flag?

Be honest about the weaknesses. What would you implement differently if you generated this code again?
```

---

## Prompt Template for Multi-Perspective Review

```markdown
# Prompt template for multi-perspective review

## Security review expert
Take on the role of a security expert reviewing this code. Respond as if you're a senior security engineer in a code review:

[Generated code here]

Start your response with, "Looking at this from a security perspective, I'm immediately concerned about..."

## Performance optimization expert
You are a performance optimization expert:

[Generated code here]

Start your response with, "From a performance standpoint, this implementation will cause problems because..."
```

---

## Sample Prompt for Continuous Quality Dialogue

```markdown
# Sample prompt for continuous quality dialogue

Generate a data validation function. Immediately review and refine it for:
- Complete input sanitization
- Clear, secure error messages
- Efficient handling of large datasets
- Seamless integration with the current validation framework

Repeat until the function meets production standards.
```

---

## AI-Generated Transaction Fee Function

```python
def calculate_transaction_fee(amount, transaction_type, user_tier):
    """Calculate transaction fee based on amount, type, and user tier."""
    base_fee = 0.025
    
    if transaction_type == "wire":
        base_fee = 0.05
    elif transaction_type == "ach":
        base_fee = 0.01
    
    if user_tier == "premium":
        base_fee *= 0.5
    elif user_tier == "gold":
        base_fee *= 0.75
    
    fee = amount * base_fee
    return round(fee, 2)
```

---

## AI vs Experienced Developer Code Comparison

```python
# AI-generated code (lacks defensive practices)
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

# Experienced developer version (defensive programming)
def calculate_average(numbers):
    if not numbers or not isinstance(numbers, list):
        return 0
    if len(numbers) == 0:
        return 0
    try:
        return sum(numbers) / len(numbers)
    except (TypeError, ZeroDivisionError):
        return 0
```

---

## Prompt to Analyze Test Failures

```markdown
# Prompt template to analyze the test failures

Perform a comprehensive analysis of test execution results to understand failure patterns and fixes.

Test Results:
[RAW TEST EXECUTION OUTPUT]

Please provide:
1. Root cause analysis of failures
2. Recommended fix strategies
3. Additional testing suggestions
4. Pattern identification across failures
```

---

## Prompt to Debug Performance Issues

```markdown
# Prompt to debug performance issues

Optimize this data processing function based on performance analysis:
Original function: [paste AI-generated code]

Performance measurements:
- 100 items: 0.05 seconds, 2MB memory
[more performance numbers from user experiment]

Requirements:
- Must process 50,000 items within 5 seconds
- Memory usage should not exceed 100MB
- Maintain the same output format

Environment: Python 3.9, 8GB RAM available
```

---

## Prompt to Generate Security Test Cases

```markdown
# Prompt to generate security test cases

Create comprehensive security test cases for this AI-generated function:

[paste AI-generated function]

Generate test cases that target common AI security blind spots:
- Input validation edge cases (null, empty, oversized values)
- Type confusion attacks (wrong data types)
- Injection vectors (SQL, code, command injection)
- Authentication bypass attempts

Format: Python pytest functions with descriptive names
Include both malicious inputs and expected secure responses
```

---

## Prompt to Generate Function with Security First Approach

```markdown
# Prompt to generate function with security first approach

Generate a [function type] with security requirements:

Functionality: [describe what the function should do]

Security requirements:
- Validate all input types and ranges before processing
- Limit input sizes to prevent resource exhaustion
- Return safe error messages without revealing system details
- Log security-relevant events for monitoring

Input format: [specify expected input structure]
Expected output: [specify expected output structure]

Error handling: [specify how errors should be handled securely]
```
