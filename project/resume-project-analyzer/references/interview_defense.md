# Interview Defense Preparation

## Common Interview Follow-Up Questions

### Architecture & Design

- "Why did you choose this architecture over alternatives?"
- "What were the main trade-offs you had to make?"
- "How would this design change at [10x, 100x] scale?"
- "What was the hardest technical problem you solved?"
- "How do you handle [failures, edge cases, race conditions]?"

### Implementation Details

- "Walk me through how [specific feature] works end-to-end."
- "What was your role in [specific component/module]?"
- "How did you test [specific feature]?"
- "What would you do differently if starting today?"

### Performance & Scalability

- "How did you measure performance?"
- "What bottlenecks did you encounter and how did you address them?"
- "What was the system's peak load and how did it perform?"
- "How does caching work in your system?"

### Impact & Outcomes

- "What metrics did you track?"
- "What was the measurable impact of [specific change]?"
- "How many users were affected by this work?"
- "What was the timeline for this project?"

## Answer Strategies

### When You Don't Know Something

- "That's a great question. Based on what I built..."
- "That specific detail was handled by [colleague/system], but here's what I do know..."
- "I don't recall the exact implementation, but the approach was..."

### When You Only Partially Contributed

- Be honest: "I worked on [X portion], the rest was handled by..."
- Focus on your scope: "My contributions were focused on..."
- Acknowledge others: "[Name] led the [other aspect]..."

### When Trade-Offs Were Made

- Explain the constraint: "We chose X because..."
- Mention alternatives considered: "We evaluated [alternatives] and chose X because..."
- Note current state: "This was the right choice for [situation], but at different scale I'd consider..."

## Red Flags to Avoid

- Never claim work you didn't do
- Never exaggerate metrics without evidence
- Never pretend to know implementation details you don't recall
- Never fabricate technical decisions or reasoning

## Confidence in Answers

| Question Type | Confidence Needed | Strategy |
|---------------|-------------------|----------|
| Architecture decisions | High | Review code before claiming |
| Implementation details | Medium-High | Say what you know, admit what you don't |
| Metrics/impact | High | Only include if you can back it up |
| Role attribution | High | Be precise about your contributions |
| Trade-offs | Medium | Explain reasoning, admit if unsure |

## STAR Method for Behavioral Questions

When interviewers ask about challenges or conflicts:

- **S**ituation: What was the context?
- **T**ask: What did you need to do?
- **A**ction: What did YOU specifically do?
- **R**esult: What was the outcome?

Example:
- S: "We had a performance issue with the API"
- T: "I needed to identify and fix the bottleneck"
- A: "I profiled the code, found the database query was the issue, and added an index"
- R: "Response time dropped from 2s to 200ms"
