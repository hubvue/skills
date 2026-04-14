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

- **api-generator** - Autonomous Frontend Code Generation Agent specialized in project-aware API integration. Converts backend API specs and mock data into frontend request code, types, mocks, and tests, strictly following existing project conventions.

  **When to invoke:** When user provides backend API specs needing frontend request code, mock data to convert to request types and handlers, API endpoints to add with types mocks and tests, or new API integration following existing project conventions.

  **Key workflow (3 phases):**
  1. Project Recon - Detect TypeScript, request patterns (axios/fetch/umi-request/apollo/react-query/swr/custom), mock infrastructure (msw/vite-plugin-mock/mockjs/custom), and test frameworks
  2. Plan Mode - Generate mandatory plan before execution including project recon summary, capability-gated artifacts, file change list, and incremental merge strategy
  3. Execution - Generate request functions, types, mock data, and tests following detected project patterns

  **Safety rules:** Never refactor unrelated code, never delete existing code, prefer additive changes only.

- **prd-gatekeeper** - Engineering PRD gatekeeper that validates PRDs against 5 hard quality gates and ensures production-readiness for engineers. Blocks progress when engineering risk exists.

  **When to invoke:** When reviewing PRDs to ensure they are production-ready and contain no implicit product decisions that would be pushed into implementation.

- **project-handover-generator** - Generates a practical project handover document from the current codebase and project artifacts. Grounds the handover in actual repository evidence and helps successors understand what the project is, how it runs, what is unfinished/risky, and what to pay attention to.

  **When to invoke:** When preparing resignation or transition handover docs, summarizing project architecture and responsibilities, explaining deployment/configuration/risks/pending work for successors, or producing a structured, editable handover document.

  **Key workflow (5 steps):**
  1. Inspect the repository - Understand structure, frameworks, tooling, scripts, configs, docs, deployment clues, test setup
  2. Build evidence-backed understanding - Form a grounded mental model of what the project does and what matters most
  3. Identify uncertainty - Separate confirmed facts from high-confidence inferences and unknowns
  4. Generate the handover document - Produce a structured markdown handover doc optimized for human takeover
  5. Add final verification - Include items to confirm, high-risk areas, and first week recommendations

- **doc-generator** - Generates, updates, or improves usage documentation for projects, files, components, SDKs, modules, or functions based on source code. Supports project-level (entire repository), file-level (single file/module), and symbol-level (function/class/component) targets. Produces usage-oriented documentation including when/how to use, constraints, and common pitfalls.

  **When to invoke:** When generating, updating, or improving source-code-grounded usage documentation for a project, file, component, SDK, module, or function.

  **Key workflow (5 steps):**
  1. Determine documentation target and scope
  2. Inspect relevant code and supporting project context
  3. Infer intended usage, constraints, and integration points from source
  4. Generate structured, usage-oriented documentation in Markdown
  5. Call out assumptions, gaps, and validation points when evidence is incomplete

- **project-migration** - Plans and drives safe old-to-new project or repository migrations with phase-based outputs, risk controls, and migration artifacts. Helps teams audit inherited projects, compare old and new repositories, define migration batches, choose pilot slices, manage compatibility layers, and verify rollout and rollback readiness.

  **When to invoke:** When migrating an existing project to a new repository, stack, or engineering system, especially when the user needs audit outputs, diff matrices, migration plans, pilot scopes, execution logs, or verification checklists.

  **Key workflow:** Follow a phase-gated migration path:
  1. Intake - Clarify scope, constraints, success criteria, and migration strategy
  2. Audit and map - Understand the old project, core flows, hidden dependencies, and style assets
  3. Diff and plan - Compare old/new repos, choose adapters, define batches and pilot scope
  4. Execute and verify - Track migration progress, blockers, validation, release readiness, and rollback
  5. Cleanup - Remove migration debt and define follow-up governance

### context-engineering

Context engineering skills for prompt optimization and management.

#### Skills

- **prompt-minifier** - Minify verbose prompts into semantically equivalent minimal prompts while preserving behavior. Transforms verbose or redundant prompts into minimal, high-density prompts with equivalent semantic and behavioral constraints.

  **When to invoke:** When a user wants to: (1) Compress verbose prompts for token efficiency, (2) Optimize prompt structure while maintaining equivalent semantics, (3) Remove redundancy from existing prompts, (4) Convert natural language prompts to compact structured format.

  **Key principles:**
  - Preserve semantic intent and constraints
  - Remove redundancy, filler, and implicit defaults
  - Compress natural language into structured instructions when possible
  - Maximize information density per token
  - Avoid changing task scope or meaning

  **Compression levels:** lossless (preserve full explicit meaning), balanced (remove redundancies, keep clarity), aggressive (maximum token reduction).

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

- **context-probe** - Implicit system-level skill that monitors context integrity, system prompt survival, and instruction drift. Always operates implicitly without user invocation. Warns when context is degraded or lost.

  **When to invoke:** Never invoke directly - this skill operates implicitly at system level.

  **Key features:**
  - Detects whether system instructions, CLAUDE.md rules, and critical context are still present
  - Provides machine-readable telemetry for external tooling
  - Warns user when context is degraded or lost
  - Self-healing behavior to restate critical constraints when degraded

- **code-evolver** - Evolves durable project rules from ongoing conversations: code standards, engineering conventions, architecture constraints, naming, directory layout, testing expectations, collaboration norms, and AI workflow rules. Detects reusable rules, handles add/update/merge/conflict cases, filters one-off instructions, and syncs responsibilities across `.cursor/rules`, `AGENTS.md`, and `CLAUDE.md`, with few-shot examples per rule.

  **When to invoke:** When the user asks to capture or update team rules from chat, persist conventions into rule files, or the conversation repeatedly surfaces stable constraints worth codifying.

  **Key workflow:** Identify rule candidates → classify durable vs temporary → diff against existing rules → resolve merge/conflicts → write or update files with scoped few-shots aligned to each surface (Cursor rules vs AGENTS vs CLAUDE).

### productivity

Productivity tools for workflow optimization.

#### Skills

- **skills-workflow** - Interactive skills workflow for chaining multiple skills where the output of step i becomes the input of step i-1. Supports dry-run mode, trace logging, output validation, and safety guardrails. Enables execution of complex multi-step workflows with determinism and auditability.

  **When to invoke:** When you need to (1) Chain multiple skills together in a specific order, (2) Pass outputs between skills as inputs, (3) Execute complex multi-step workflows with traceability, (4) Run skills in dry-run mode before execution, (5) Debug or audit multi-skill workflows.

  **Key workflow:**
  1. Interactive Setup - Collect pipeline configuration (skills, step goals, templates, context, execution mode)
  2. Planning Output - Generate pipeline plan showing all steps and configurations
  3. Execution - Run skills sequentially with input/output chaining and validation
  4. Trace Log - Optional detailed logging of each step's input, output, and validation results

  **Safety features:** Simulation mode when skills unavailable, prompt injection protection, secret redaction in logs, no destructive actions without user approval.

- **release-skills** - Automates the release process for kim-skills plugin: analyzes changes since last tag, updates CHANGELOG (EN/CN), bumps marketplace.json version, commits, and creates version tag.

  **When to invoke:** When user requests release, publishing, version bump, or push to remote with uncommitted changes.

  **Key workflow:**
  1. Analyze changes since last tag
  2. Determine version bump (patch/minor/major)
  3. Check and update README if needed
  4. Update CHANGELOG.md and CHANGELOG.zh.md
  5. Update marketplace.json version
  6. Commit all changes
  7. Create version tag

- **skills-workflow-builder** - Creates new dedicated workflow skills by baking in a fixed pipeline (skill order + per-step goal/template/contract/stop). At runtime only asks for `initial_prompt` (required) and optionally allows safe overrides (execution_mode, verbosity, context_append).

  **When to invoke:** When you want to create a reusable workflow skill without re-entering skill order/templates each time.

  **Key workflow:**
  1. Collect pipeline config (new_skill_name, new_skill_description, skills order, optional baked_in_shared_context, defaults, override_policy)
  2. Call skills-workflow in DRY_RUN mode to normalize pipeline config
  3. Generate complete, copy-pasteable skill definition for NEW_WORKFLOW_SKILL
  4. Create the skill using skill-creator

- **deep-learning** - Systematically learn and explain the principles of a library, framework, module, function, or code path. Helps build correct mental models with layered explanations from problem and role to design tradeoffs and next steps. Supports project, module, and function modes with comprehensive workflow guidance.

  **When to invoke:** When a user wants to understand overall architecture, module responsibilities, execution flow, call chains, core data structures, design tradeoffs, implementation details, or interview-ready explanations from source code.

  **Core modes:**
  - Project mode - For whole frameworks/projects
  - Module mode - For packages/subsystems/directories
  - Function mode - For functions/methods/hooks/classes or narrow call paths

  **Key workflow:**
  1. Determine target and scope
  2. Select appropriate mode
  3. Explain in layers (problem, structure, main flow, implementation details, tradeoffs)
  4. Ground explanations in provided code/context
  5. End with takeaways and next reading

- **dev-spec** - Orchestrate spec-driven AI agent development by task, with explicit phases, per-task artifacts, dependency healing, and incremental updates across iterative requirements. Organizes work as a per-task, phase-gated workflow rather than unstructured chat.

  **When to invoke:** When you need to structure AI-assisted development work with explicit phases (intake, research, plan, todo, implement, review), artifact-first outputs, dependency healing for jumping into later phases, and incremental updates to existing artifacts.

  **Core principles:**
  - Task isolation - Work is organized by task, keeping unrelated requirements separate
  - Artifact first - Every phase must create or update durable artifacts
  - Update, do not overwrite - Incrementally update existing artifacts rather than overwriting
  - Dependency healing - Auto-generate minimum upstream artifacts when user starts from later phase
  - Review-gated execution - Prefer research before planning and planning before broad implementation
  - No silent scope expansion - Stay inside current task scope, record adjacent work as notes/risks

  **Supported phases:** intake, research, plan, todo, implement, test, bugfix, review

  **Key workflow:**
  1. Interpret user input - Determine task identification, requested phase, mode (create/update), and dependency healing needs
  2. Execute requested phase(s) - Follow phase-specific rules from reference docs
  3. Output workflow summary - Include task info, requested phases, dependency healing, artifacts created/updated, and next recommended phase

- **doc-skill-creator** - Converts existing documents into a dedicated skill design, including analyzing suitability, extracting capabilities, designing skill structure, and drafting SKILL.md and references. Transforms static documentation such as component library docs, SDK docs, utility docs, FAQ, migration guides, standards docs, and examples into practical skill artifacts.

  **When to invoke:** When converting documents into a dedicated skill, generating a skill from library, SDK, FAQ, migration, or standards documentation, designing a target skill from existing docs, creating SKILL.md and references from source documents, or transforming static docs into practical usage capabilities.

  **Default workflow:**
  1. Analyze the source material and scope
  2. Judge suitability for skill conversion
  3. Determine the target skill type
  4. Extract capability units
  5. Split knowledge into facts, rules, scenarios, examples, pitfalls, migration, and gaps when applicable
  6. Design the target skill structure
  7. Draft the target SKILL.md and references plan

  **Working rules:**
  - Convert documentation into capabilities, not just summaries
  - Organize outputs around user tasks, not source headings
  - Prefer practical guidance over passive description
  - Clearly separate documented facts from derived guidance
  - Do not invent unsupported APIs, features, or guarantees
  - State missing information explicitly when the source material is incomplete
  - Keep the target skill scoped and maintainable

## Skill Structure

```
/<skill-name>/
├── SKILL.md           # Main skill definition and workflow
├── package.json       # Node dependencies (optional)
├── scripts/           # Executable Node.js scripts (optional)
└── references/        # Supporting documentation (optional)
```

## License

MIT
