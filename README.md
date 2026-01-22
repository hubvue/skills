# skills

A collection of Claude Code Skills that extend Claude Code's functionality for frontend analysis, project understanding, and productivity.

## Overview

This repository contains reusable skills that can be invoked via `/skill-name` commands in Claude Code. Each skill is self-contained and distributed through the Claude Code marketplace.

## Requirements

- Node.js >= 20.0.0
- Ability to run npx bun commands

## Installation

### Quick Install (Recommended)

```shell
npx skills add hubvue/skills
```

### Register as Plugin Marketplace
Run the following command in Claude Code:

```claude
/plugin marketplace add hubvue/skills
```


## Plugins

### fe-analysis

Frontend project analysis tools for understanding architecture, dependencies, and testing.

#### Skills

- **architecture-analysis** - Comprehensive frontend architecture analyzer that identifies technology stacks, build tools, and architectural patterns. Detects Vue/React/Angular frameworks, Node.js environments, package managers, TypeScript usage, linters, and architecture patterns. Provides multiple output formats including JSON, markdown, executive summary, and scorecard.

  **When to invoke:** When you need to quickly understand a project's structure, dependencies, and technical configuration.

  **Commands:**
  ```bash
  cd fe-analysis/architecture-analysis
  npm test                    # Run on test project
  node scripts/analyze-project.js /path/to/project  # Analyze any project
  ```

- **dependency-analysis** - Enhanced dependency analyzer with comprehensive markdown reporting and actionable recommendations. Performs security scanning, unused package detection, phantom dependency identification, circular dependency detection, and cleanup script generation. Supports JavaScript, TypeScript, Vue, React, Angular, and modern build tools with parallel processing and incremental analysis capabilities.

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

- **unit-test-generator** - Intelligent unit test generator for frontend projects that detects existing test frameworks and generates comprehensive tests for functions, components, and modules. Maintains framework consistency by analyzing existing test patterns. Supports Jest, Vitest, Mocha with React, Vue, Angular frameworks.

  **When to invoke:** When you need to (1) Add unit tests to existing codebases, (2) Set up testing infrastructure for new projects, (3) Generate test cases for specific functions or components, (4) Ensure architectural consistency in testing approach across projects.

  **Commands:**
  ```bash
  cd fe-analysis/unit-test-generator
  npm test                    # Detect framework in test project

  # Generate test for specific file
  node scripts/generate-test.js src/components/Button.js

  # Setup testing configuration for new project
  node scripts/setup-test-config.js vitest '{"vue": true}'
  ```

### project

Project-related skills for documentation and analysis.

#### Skills

- **resume-project-analyzer** - Transforms codebases into authentic, interview-defensible resume project experience through a 5-step workflow. Analyzes project structure, extracts engineering value, classifies confidence levels, conducts reflective questioning, and generates structured output. Prioritizes correctness and interview credibility over exaggeration.

  **When to invoke:** When analyzing a codebase for extracting resume-ready project descriptions, preparing for technical interview questions, understanding engineering depth, or identifying defensible technical achievements.

  **Key workflow (5 steps):**
  1. Project Analysis - Understand codebase structure, tech stack, architecture, complexity
  2. Engineering Value Extraction - Identify core problems solved, visible constraints, engineering decisions
  3. Confidence Classification - Classify each claim as HIGH/MEDIUM/LOW (requires user input for MEDIUM/LOW)
  4. Reflective Questioning - Ask targeted questions before finalizing resume content
  5. Resume & Interview Output - Generate structured output using templates

  **Output structure:** Fixed format including Project Summary, Resume-Ready Project Experience, Key Technical Highlights, Interview Defense Preparation, and Confidence Notes.

### productivity

Productivity tools for prompt engineering and workflow optimization.

#### Skills

- **prompt-interviewer** - Senior Prompt Engineer and Prompt Interviewer that interviews users to refine and complete their prompts through structured analysis and iterative questioning. The skill acts as an interviewer rather than a prompt rewriter, ensuring prompts are unambiguous and well-structured before execution.

  **When to invoke:** When a user has an initial prompt but needs help refining it for better LLM performance: (1) When a prompt lacks clarity or context, (2) When constraints or boundaries are missing, (3) When output formats or quality criteria are undefined, (4) When there are ambiguities or conflicting requirements.

  **Key workflow (6 steps):**
  1. Prompt Analysis - Analyze goal clarity, context completeness, constraints, audience, I/O formats, quality criteria, edge cases
  2. Interview Mode - Ask targeted, high-impact questions about missing information (never assume or silently fill gaps)
  3. Iterative Loop - Re-analyze after each answer, continue interviewing until complete
  4. Completion Criteria - Finalize only when goal, role, inputs, outputs, constraints are unambiguous
  5. Run Gate - Present final prompt and ask "Do you want me to run this prompt now with the current LLM?"
  6. Final Output - If user says "Run", execute the prompt immediately using the current LLM

  **Critical principle:** The skill is an interviewer, not a prompt rewriter. Questions must be concrete, actionable, grouped by topic, and explain WHY each question matters.

## Skill Structure

```
/<skill-name>/
├── SKILL.md           # Main skill definition and workflow
├── package.json       # Node dependencies (optional)
├── scripts/           # Executable Node.js scripts (optional)
└── references/        # Supporting documentation (optional)
```

## License

Contact the owner for licensing information.
