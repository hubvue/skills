# Resume Project Analysis Framework

## Confidence Classification

Classify each inferred claim about the project using this scale:

| Level | Definition | When to Use |
|-------|------------|-------------|
| **HIGH** | Clearly, unambiguously supported by code and documentation | Direct implementations, visible architectural decisions, explicit patterns in code |
| **MEDIUM** | Reasonable inference but incomplete evidence | Reasonable but not definitive, plausible but could be alternative explanations |
| **LOW** | Cannot be inferred safely | Claims that require user confirmation, assumptions about decisions or impact |

**Rules:**
- Only mark as HIGH when evidence is direct and unambiguous
- Only finalize MEDIUM claims after user clarification
- Never finalize LOW claims without user confirmation

## Engineering Value Extraction Guide

### Core Technical Problems

Look for evidence that the project solves:
- Performance bottlenecks (caching, optimization, indexing, async patterns)
- Scalability challenges (sharding, microservices, load balancing)
- Reliability issues (retries, circuit breakers, redundancy)
- Data consistency (transactions, consensus, idempotency)
- UX problems (loading states, error handling, progressive enhancement)

### Visible Constraints

Identify constraints that shaped design decisions:
- **Performance**: Response time requirements, throughput targets, SLAs
- **Scale**: User count, data volume, request rate (actual OR designed for)
- **Reliability**: Uptime requirements, fault tolerance needs
- **UX**: Browser support, accessibility standards, mobile support
- **Business**: Budget, timeline, team size, regulatory requirements

### Engineering Judgment Indicators

Look for these signs of real engineering judgment:
- Trade-off decisions (e.g., eventual consistency vs strong consistency)
- Architecture choices with alternatives (e.g., monolith vs microservices)
- Tech stack selection with justification
- Design patterns beyond boilerplate
- Custom solutions vs off-the-shelf libraries
- Performance optimization with measurable impact

## Project Type Indicators

### Backend
- API endpoints, database models, business logic
- Look for: caching, async processing, message queues, service architecture

### Frontend
- UI components, state management, routing
- Look for: frameworks (React/Vue/Angular), state patterns, performance optimizations

### ML/AI
- Model training, inference, data pipelines
- Look for: model architectures, training pipelines, deployment strategies, evaluation metrics

### System
- Infrastructure, DevOps, distributed systems
- Look for: orchestration, monitoring, auto-scaling, configuration management

### Tool/Library
- Reusable code, APIs, utilities
- Look for: documentation, tests, versioning, public interfaces

## Depth Assessment

### Shallow Indicators
- Basic CRUD operations
- Boilerplate frameworks
- Standard patterns without customization
- No visible complexity or trade-offs

### Medium Depth
- Some custom logic
- Non-trivial architecture
- Performance considerations
- Reasonable engineering decisions

### Deep Engineering
- Novel algorithms or solutions
- Significant optimization work
- Complex distributed systems
- Major scalability challenges addressed
- Strong evidence of design iteration
