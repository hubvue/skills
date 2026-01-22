# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **Claude Code Skills Repository**. Skills are reusable capabilities that extend Claude Code's functionality. Skills are invoked via `/skill-name` commands by users.

Unlike traditional software projects, this repository contains no centralized build system. Each skill is self-contained and may have its own dependencies. Skills are defined through Markdown files with natural language instructions.

## Plugin Distribution

The repository is configured for distribution via Claude Code marketplace through `.claude-plugin/marketplace.json`:

```json
{
  "name": "kim-skills",
  "plugins": [
    { "name": "fe-analysis", "skills": ["./fe-analysis/architecture-analysis", ...] },
    { "name": "project", "skills": ["./project/resume-project-analyzer"] },
    { "name": "productivity", "skills": ["./productivity/prompt-interviewer"] }
  ]
}
```

When adding a new skill, update `marketplace.json` with the skill path.

## Skill Structure

Each skill lives in its own directory:

```
/<skill-name>/
├── SKILL.md           # Main skill definition and workflow
├── package.json       # Node dependencies (optional, for skills with executable scripts)
├── scripts/           # Executable Node.js scripts (optional)
└── references/        # Supporting documentation (optional)
```

**SKILL.md** contains:
- YAML frontmatter with `name` and `description`
- Clear workflow steps or instructions
- Output format specifications
- Reference links to supporting docs
- The description must indicate **when to invoke** the skill using patterns like "Use when analyzing a codebase for: (1) ..., (2) ..., (3) ..."

**package.json** (optional) is used when the skill includes executable Node.js scripts:
- `bin` entries define CLI commands
- `scripts.test` runs the skill on a test project
- `engines.node` specifies minimum Node version (typically `>=14.0.0`, main repo requires `>=20.0.0`)

**scripts/** directory contains executable Node.js utilities referenced in SKILL.md examples.

**references/** directory contains supporting documentation like frameworks, patterns, templates.

## Creating a New Skill

1. Create a new directory for the skill
2. Create `SKILL.md` with YAML frontmatter and clear workflow instructions
3. Add `package.json` if the skill includes executable scripts
4. Add `references/` with supporting docs if needed
5. Update `.claude-plugin/marketplace.json` with the new skill path
6. Test by running the skill via the `/skill-name` command

## Current Skills

### fe-analysis/architecture-analysis

Analyzes frontend project architecture: technology stacks, build tools, architectural patterns, TypeScript coverage, linters.

**When to invoke:** When you need to quickly understand a project's structure, dependencies, and technical configuration. Detects Vue/React/Angular frameworks, Node.js environments, package managers, TypeScript usage, and provides multiple output formats (JSON, markdown, executive summary, scorecard).

**Commands:**
```bash
cd fe-analysis/architecture-analysis
npm test                    # Run on test project
node scripts/analyze-project.js /path/to/project  # Analyze any project
```

### fe-analysis/dependency-analysis

Optimizes frontend project dependencies with security scanning, unused package detection, phantom dependency identification, circular dependency detection, and cleanup script generation.

**When to invoke:** When you need to optimize dependencies, detect vulnerabilities, identify unused packages, find duplicate functionality, analyze dependency impact, generate cleanup scripts, or produce detailed Markdown reports.

**Commands:**
```bash
cd fe-analysis/dependency-analysis
npm install                 # Install dependencies (acorn, acorn-walk, semver)
npm test                    # Run on test project
npm run analyze             # Analyze current directory

# Full analysis with all features
node scripts/enhanced-analyzer.js /path/to/project \
  --generateFixScript --generateGraph --checkSecurity --checkOutdated

# Parallel processing for large projects
node scripts/enhanced-analyzer.js /path/to/project --parallel --incremental
```

### fe-analysis/unit-test-generator

Generates comprehensive tests for functions, components, and modules by detecting existing test frameworks and maintaining framework consistency.

**When to invoke:** When you need to (1) Add unit tests to existing codebases, (2) Set up testing infrastructure for new projects, (3) Generate test cases for specific functions or components, (4) Ensure architectural consistency in testing approach across projects. Supports Jest, Vitest, Mocha with React, Vue, Angular frameworks.

**Commands:**
```bash
cd fe-analysis/unit-test-generator
npm test                    # Detect framework in test project

# Generate test for specific file
node scripts/generate-test.js src/components/Button.js

# Setup testing configuration for new project
node scripts/setup-test-config.js vitest '{"vue": true}'
```

### project/resume-project-analyzer

Transforms codebases into authentic, interview-defensible resume project experience through a 5-step workflow.

**When to invoke:** When analyzing a codebase for extracting resume-ready project descriptions, preparing for technical interview questions, understanding engineering depth, or identifying defensible technical achievements.

**Key workflow (5 steps):**
1. Project Analysis - Understand codebase structure, tech stack, architecture, complexity
2. Engineering Value Extraction - Identify core problems solved, visible constraints, engineering decisions
3. Confidence Classification - Classify each claim as HIGH/MEDIUM/LOW (requires user input for MEDIUM/LOW)
4. Reflective Questioning - Ask targeted questions before finalizing resume content
5. Resume & Interview Output - Generate structured output using templates

**Critical principle:** Never finalize MEDIUM or LOW confidence claims without user clarification. The skill prioritizes correctness and interview credibility over exaggeration.

**Output structure:** Fixed format including Project Summary, Resume-Ready Project Experience, Key Technical Highlights, Interview Defense Preparation, and Confidence Notes.

### productivity/prompt-interviewer

Refines and completes prompts through structured analysis and iterative questioning.

**When to invoke:** When a user has an initial prompt but needs help refining it for better LLM performance: (1) When a prompt lacks clarity or context, (2) When constraints or boundaries are missing, (3) When output formats or quality criteria are undefined, (4) When there are ambiguities or conflicting requirements.

**Key workflow (6 steps):**
1. Prompt Analysis - Analyze goal clarity, context completeness, constraints, audience, I/O formats, quality criteria, edge cases
2. Interview Mode - Ask targeted, high-impact questions about missing information (never assume or silently fill gaps)
3. Iterative Loop - Re-analyze after each answer, continue interviewing until complete
4. Completion Criteria - Finalize only when goal, role, inputs, outputs, constraints are unambiguous
5. Run Gate - Present final prompt and ask "Do you want me to run this prompt now with the current LLM?"
6. Final Output - If user says "Run", execute the prompt immediately using the current LLM

**Critical principle:** The skill is an interviewer, not a prompt rewriter. Questions must be concrete, actionable, grouped by topic, and explain WHY each question matters.
