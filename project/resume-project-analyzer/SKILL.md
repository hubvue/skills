---
name: resume-project-analyzer
description: "Transform codebases into authentic, interview-defensible resume project experience. Use when analyzing a codebase for: (1) Extracting resume-ready project descriptions, (2) Preparing for technical interview questions about past projects, (3) Understanding the engineering depth and value of a codebase, (4) Identifying defensible technical achievements. Prioritizes correctness and interview credibility over exaggeration."
---

# Resume Project Analyzer

## Core Principles

- **Do NOT fabricate achievements or metrics**
- **Do NOT assume ownership or leadership without evidence**
- **When information cannot be reliably inferred from code, ask reflective follow-up questions**
- Resume content must always be interview-defensible

## Workflow

Follow this 5-step workflow to transform codebase analysis into authentic resume content.

---

### STEP 1 — Project Analysis

Analyze the repository to understand the project's nature and technical scope.

**Explore:**
- Use `Glob` and `Grep` to understand the codebase structure
- Read key files: package.json, requirements.txt, go.mod, README, main entry points
- Identify project type, tech stack, and architecture

**Document:**
- **Project type**: backend, frontend, ML/AI, system, tool, library
- **Tech stack**: languages, frameworks, infra, storage, concurrency patterns, ML tooling
- **Architecture**: patterns, non-trivial components, integrations
- **Overall complexity**: shallow, medium, or deep engineering depth

**Output format:**
```
## Project Analysis

- **Type**: [project type]
- **Tech Stack**: [list technologies]
- **Architecture**: [brief description]
- **Complexity**: [shallow/medium/deep]
```

---

### STEP 2 — Engineering Value Extraction

Identify the real technical problems solved and visible constraints.

**Look for:**
- **Core technical problems**: What is being solved? (performance, scalability, reliability, UX, data consistency)
- **Visible constraints**: What shaped the design? (SLAs, scale requirements, browser support, regulatory requirements)
- **Engineering judgment indicators**: Trade-offs, architecture choices, custom solutions vs libraries

**Avoid:**
- Boilerplate code that doesn't require real engineering
- Standard patterns without customization
- Claims not supported by visible evidence

**Output format:**
```
## Engineering Value

- **Core Problems Solved**: [list]
- **Visible Constraints**: [list]
- **Engineering Decisions**: [list with evidence]
```

---

### STEP 3 — Confidence Classification

For each inferred contribution, classify confidence level.

Use [analysis_framework.md](references/analysis_framework.md) as reference.

| Level | Definition | When to Finalize |
|-------|------------|------------------|
| HIGH | Clearly supported by code | Can finalize immediately |
| MEDIUM | Reasonable but incomplete inference | Finalize ONLY after user clarification |
| LOW | Cannot be inferred safely | Finalize ONLY after user confirmation |

**Rule: Do NOT finalize MEDIUM or LOW confidence claims without user input.**

---

### STEP 4 — Reflective Questioning (CRITICAL)

Before writing resume bullets, ask targeted questions to resolve uncertainty.

**Question guidelines:**
- Be concrete and specific
- Reflect real interviewer thinking
- Help clarify responsibility, decisions, and impact

**Good reflective questions:**
- "Which modules here were you responsible for end-to-end?"
- "Was this design chosen due to performance issues or future scalability?"
- "What scale was this system designed for, even if not fully reached?"
- "What was the hardest technical trade-off you had to make?"
- "Did you implement [specific feature] or was it already there?"

**Avoid generic questions:**
- "What did you work on?" (too vague)
- "Is this accurate?" (yes/no, doesn't provide context)

Ask only what is necessary to improve resume accuracy and interview readiness.

---

### STEP 5 — Resume & Interview Output

After receiving user clarification, generate the final output.

**Use [resume_templates.md](references/resume_templates.md) for phrasing guidance.**

**Use [interview_defense.md](references/interview_defense.md) for interview prep.**

## Output Format (Fixed)

Generate this exact structure:

```
## Project Summary
[1-2 concise sentences describing the project]

## Resume-Ready Project Experience
- [Bullet 1: action + what + how + outcome]
- [Bullet 2: action + what + how + outcome]
- [Bullet 3: ...]

## Key Technical Highlights
- [Architecture / algorithms / infra / tooling that demonstrate depth]
- [Specific patterns, optimizations, or design decisions]

## Interview Defense Preparation
- [Likely interviewer follow-up questions with suggested explanation angles]
- [Areas where user should prepare detailed explanations]

## Confidence Notes
- [Which claims are strongly supported by code (HIGH)]
- [Which claims rely on user-provided clarification (MEDIUM)]
```

## Style Constraints

- Sound like a real engineer, not marketing copy
- Prefer: action + constraint + outcome
- Be concise, technical, and honest
- Optimize for interview credibility, not impressiveness

## Weak Verbs to Avoid

- "Responsible for"
- "Participated in"
- "Worked on"
- "Helped with"
- "Contributed to"

## Strong Action Verbs

- Built / Designed / Engineered / Developed / Created
- Implemented / Integrated / Deployed / Delivered
- Optimized / Improved / Accelerated / Streamlined
- Scaled / Architected / Structured

## Resources

### references/analysis_framework.md
Detailed framework for:
- Confidence classification
- Engineering value extraction
- Project type indicators
- Depth assessment

### references/resume_templates.md
Templates and guidelines for:
- Project description patterns by type
- Strong vs weak verbs
- Effective resume formula

### references/interview_defense.md
Interview preparation for:
- Common follow-up questions
- Answer strategies
- STAR method
- Confidence levels by question type
