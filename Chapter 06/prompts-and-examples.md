# Chapter 6: AI-assisted Design and Architecture Decisions - Code Snippets

## Requirement Gathering Prompt for CRM System

```markdown
# Prompt for requirement gathering for a Customer relationship management system

## Set up the context
Facilitate a requirements elicitation session for a customer relationship management system, focusing on:
- User personas: Sales representatives, marketing managers, customer service agents
- Business objectives: [list down the business objectives...]
- Technical constraints: [list down the technical constraints...]

## List out the expectations
Generate structured interview questions for each persona, including:
1. Role-specific functional requirements
2. Performance and usability expectations
3. Integration and interoperability needs
4. Security and compliance considerations
```

---

## Interactive Prototype Generation Prompt

```markdown
# Sample prompt to generate interactive prototype

## Explain the requirements
Create an interactive prototype for an e-commerce product filtering interface with the following specifications:
- Category filter with collapsible sections
- Price range slider with minimum and maximum inputs
- Rating filter with star selection
- Loading state while filtering

## Define the outcomes that's required

For each component, specify:
1. User interaction behavior and state changes
2. Visual transitions and animations
3. Accessibility considerations for screen readers and keyboard navigation
```

---

## Technical Specification Generation Prompt

```markdown
# Prompt for generating technical specification

## Define the context and problem statement
Generate technical specifications for a real-time inventory management system based on the following requirements:
- Track inventory levels across 500 retail locations
- Process 50,000 transactions per hour, maintain 99.9% availability
- Provide real-time stock level visibility to customers
- Integrate with existing POS and ERP systems

## List out the expected artifacts as output
Include in the specifications:
1. System architecture overview
2. Data model and storage requirements
3. API specifications for external integrations
4. Performance and scalability considerations
5. Security and compliance requirements
```

---

## Stakeholder-Specific Documentation Prompt

```markdown
# Prompt to generate stakeholder specific documentation

## Listing out stakeholders and their roles
Create stakeholder specific documentation for a microservices architecture decision, targeting:
- Executive stakeholders: Business impact, cost implications, timeline considerations
- Development teams: Technical implementation details, tooling requirements, skill development needs
- Operations teams: Deployment processes, monitoring requirements, maintenance considerations
- End users: Feature capabilities, performance expectations, support processes

## Setting clear expectations on content and the structure of the document
Structure each document with:
1. Audience appropriate language and detail level
2. Relevant decision rationale and trade-offs
3. Logical implementation milestones
4. Success metrics and evaluation criteria
5. Risk assessment and mitigation strategies
```

---

## Design Pattern Evaluation Prompt

```markdown
# Prompt example to evaluate design patterns in a distributed system

## Explain the use-case and define the requirements
Analyze architectural patterns for a high-throughput financial trading system:
REQUIREMENTS:
- Process 100,000 transactions/second with sub-millisecond latency
- Maintain 99.999% uptime during trading hours, 10x spikes during market volatility
- Ensure complete audit trails and transaction ordering
- Support primary/secondary data center deployment

## List out the patterns to be evaluated
PATTERNS TO EVALUATE:
1. Event-driven architecture with CQRS
2. Microservices with event sourcing
3. Reactive streams with backpressure

## Provide the structure of the output artifact for each pattern
For each pattern, provide:
- Suitability score (1-10) for each requirement
- Critical implementation challenges
- Performance bottlenecks and mitigation strategies
- Operational complexity assessment
- Regulatory compliance implications
```

---

## ADR Template

```markdown
## ADR-001: [Decision Title]

**Date:** YYYY-MM-DD  
**Status:** [Proposed | Accepted | Rejected | Superseded]  
**Participants:** [List of stakeholders involved]

### Context
Describe the architectural problem or opportunity that requires a decision. Include relevant constraints, assumptions, and requirements that influence the decision.

### Alternatives Considered
1. **Option A**: Brief description
   - Pros: Key advantages
   - Cons: Main disadvantages
   - Impact: Implementation and operational implications

### Decision
State the chosen alternative and primary reasoning. Include the decision criteria that were most influential in the choice.

### Consequences
- **Positive:** Benefits and improvements expected
- **Negative:** Risks and limitations accepted
- **Neutral:** Other implications and follow-up decisions required

### Implementation Notes
Key implementation considerations, timelines, and dependencies.
```

---

## System Decomposition with Domain Driven Design

```markdown
# Prompt to do a system decomposition with domain driven design

## Define the system and business functions
Decompose an e-commerce platform into logical components based on business functions:

BUSINESS FUNCTIONS: Customer management, Product catalog, Order processing, Payments

## List out the outcome
For each function, describe:
1. The main responsibilities of the component
2. How it interacts with other components
3. Any external systems it needs to integrate with
```

---

## Integration Pattern Comparison Prompt

```markdown
# Prompt to compare integration patterns for system design

## Setting up the context for the system
Evaluate integration patterns for an order processing system with 4 interdependent services requiring high availability, data consistency, and 10K messages/sec throughput.

## Define the requirements
Compare these patterns:
1. Synchronous REST calls
2. Asynchronous messaging
3. Event-driven architecture
4. Shared database

For each pattern analyze: suitability, trade-offs, failure handling, and scalability.
```

---

## Text-Based Architecture Diagram Prompt

```markdown
# Prompt to generate a text-based architecture diagram

Create a text-based diagram for a basic web application architecture with Frontend, API Gateway, Backend Services, and Database. Show the data flow and connections between components.
```

---

## Mermaid Architecture Diagram Prompt

```markdown
# Prompt to generate mermaid architecture diagram

Create a Mermaid diagram for a basic web application architecture with Frontend, API Gateway, Backend Services, and Database. Include component relationships and data flow directions.
```

---

## Mermaid Code Example

```markdown
# Output: AI generated mermaid code

graph TD
    A[Frontend Application] -->|HTTP Requests| B[API Gateway]
    B -->|Authenticated Requests| C[Backend Services]
    C -->|Database Queries| D[(Database)]
    
    D1[(User Data)] --> D
    D2[(Application Data)] --> D
```

---

## Data Architecture Design Prompt

```markdown
# Prompt to design a data architecture

## List down the system context, constraints and requirements.
Design a data architecture for an analytics platform with the following requirements:
- Data volume: 100TB of customer interaction data, 10 million events per day
- Analytics requirements: Real-time dashboards, historical reporting, predictive analytics
- Compliance: GDPR, CCPA data privacy regulations, SOC 2 Type II
- Performance: Sub-second query response for dashboards, batch processing for reports
- Scalability: Support 10x growth in data volume and tenant count

## Define the artifacts that are needed to design data architecture
Include in the design:
1. Data modeling approach for multi-tenant architecture
2. Database technology selection and partitioning strategy
3. Data pipeline architecture for real-time and batch processing
4. Privacy and compliance implementation strategies
5. Backup, recovery, and data lifecycle management
```

---

## API Design Strategy Prompt

```markdown
# Prompt to design application programming interfaces

## List down the system context, scope and constraints.
Design a comprehensive API strategy for an e-commerce platform with the following characteristics:
- Functional scope: Product catalog, shopping cart, order processing, customer accounts, payment handling
- User types: Website customers, mobile app users, store administrators, third-party vendors
- Security requirements: User authentication, secure payment processing, data protection
- Performance requirements: 99.9% availability, fast page loads, 50,000 concurrent shoppers
- Integration needs: Payment gateways, shipping providers, inventory systems, email notifications
- Compliance: PCI DSS for payments, GDPR for customer data, accessibility standards

## Define the structure of the outcome
Include in the design:
1. Interface architecture approach selection
2. User authentication and security framework
3. API versioning and compatibility strategy
4. Performance optimization and traffic management
5. Documentation and integration guidance
```
