# Chapter 11: Complex Project Management with AI - Code Snippets

## Team A's Tool Interface

```markdown
# Team A's Tool Interface
Tool: simple-query-generator
Input: { "table": "users", "filters": ["active=true", "role=admin"] }
Output: Raw SQL string
Configuration: Basic prompt template
Authentication: None
```

---

## Team B's Tool Interface

```markdown
# Team B's Tool Interface  
Tool: enterprise-query-builder
Input: Natural language description
Output: Query execution plan with performance metrics
Configuration: Performance thresholds + compliance rules
Authentication: SSO integration required
```

---

## Sample Conversation with AI Tool Enhanced by MCP Tools

```sql
# Sample conversation with AI tool enhanced by MCP tools

Prompt: Generate a query to get customer order history for the last 3 months
## MCP enhanced response:
SELECT o.order_id, o.order_date, o.total_amount, 
       c.customer_name, s.status_description
FROM orders o
JOIN customers c ON o.customer_id = c.id  
JOIN order_statuses s ON o.status_id = s.id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '3 months'
  AND c.customer_id = $1
ORDER BY o.order_date DESC
LIMIT 100;

## Observations
- Uses actual table relationships from schema
- Respects existing foreign key constraints  
- Includes pagination following org standards

## MCP Servers used to generate this response.
Schema MCP server - Provided actual table structures revealing the tables and relationships.
Standards MCP server - Supplied organizational coding standards requiring 100-row pagination limits
```

---

## AgentCard Example from A2A Protocol

```json
{
  "name": "Travel Planning Agent",
  "description": "AI agent that helps plan  trips and manages bookings",
  "url": "http://travel-agent.company.com:8080/",
  "version": "2.1.0",
  "default_input_modes": ["text", "application/json"],
  "default_output_modes": ["text", "application/json"],
  "capabilities": {
    "streaming": true
  },
  "skills": [
    {
      "id": "search_flights",
      "name": "Search available flights",
      "description": "Finds available flights based on travel needs",
      "tags": ["travel", "flights", "booking"],
      "examples": ["Find flights from NYC to SFO next Tuesday"]
    }
  ],
  "supports_authenticated_extended_card": true
}
```

---

## Template for AI Code Generation Standards

```markdown
# Template for AI Code Generation Standards

## Context Requirements
- Include comprehensive project context including architectural patterns and constraints
- Provide relevant business logic context for complex implementations
- Reference existing code patterns and organizational conventions
- Specify integration requirements with current systems and databases

## Technical Specifications
- Explicitly define error handling requirements and organizational patterns
- Include security requirements and performance constraints
- Specify logging and monitoring integration requirements

## Quality Assurance Process
- Security review mandatory for authentication, authorization, and data handling components
- Automated testing coverage minimum threshold based on component criticality
- Performance validation required for user-facing and high-throughput components
- Documentation standards including rationale for architectural decisions
```
