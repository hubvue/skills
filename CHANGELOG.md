# Changelog

All notable changes to this project will be documented in this file.

## 1.13.0 - 2026-06-23

### Features
- `idea-requirement`: New plugin category providing an evidence-driven workflow that turns a raw idea into a complete requirement. Adds the `idea-requirement` orchestrator plus 12 stage skills (`idea-intake`, `motivation-clarify`, `painpoint-validate`, `scenario-restore`, `user-identify`, `goal-define`, `value-assess`, `scope-define`, `feasibility-assess`, `solution-design`, `acceptance-criteria`, `requirement-assemble`). Each stage persists a numbered stage document and grounds decisions in Web Search evidence.
- `clean-code`: New project skill providing a Clean Code overview and router covering naming, functions, comments, formatting, objects/data structures, error handling, boundaries, tests, classes, systems, concurrency, simple design, progressive refinement, and code smells, loading the matching rule file under references on demand.

### Documentation
- Updated `README.md` and `README.zh.md` to document the new `idea-requirement` category and the `clean-code` skill.

## 1.12.0 - 2026-04-14

### Features
- `code-evolver`: New context-engineering skill that turns recurring code standards, engineering conventions, architecture constraints, and collaboration rules from conversations into durable, maintainable project rules with few-shot examples. Detects add/update/merge/conflict cases, filters one-off instructions, and syncs responsibilities across `.cursor/rules`, `AGENTS.md`, and `CLAUDE.md`.

### Documentation
- Updated `README.md` and `README.zh.md` to document `code-evolver`.

## 1.11.0 - 2026-04-08

### Features
- `doc-skill-creator`: New skill for converting existing documents into dedicated skill designs. Transforms static documentation such as component library docs, SDK docs, utility docs, FAQ, migration guides, standards docs, and examples into practical skill artifacts. Analyzes suitability, extracts capabilities, designs skill structure, and drafts SKILL.md and references.

## 1.10.0 - 2026-03-26

### Features
- `project-migration`: New skill for phase-gated repository and engineering migration work. Supports intake, audit, map, diff, plan, pilot, execute, verify, and cleanup with reusable migration templates, checklists, and risk guidance.

### Documentation
- Updated `README.md` and `README.zh.md` to add `project-migration` and fix project-skill descriptions so `project-handover-generator` and `doc-generator` are documented correctly.

## 1.9.0 - 2026-03-25

### Features
- `doc-generator`: New skill for generating, updating, or improving usage documentation for projects, files, components, SDKs, modules, or functions based on source code. Supports project-level, file-level, and symbol-level targets. Produces usage-oriented documentation including when/how to use, constraints, and common pitfalls.

## 1.8.2 - 2026-03-24

### Refactor
- `dev-workflow` → `dev-spec`: Renamed skill for better clarity.

## 1.8.1 - 2026-03-16

### Documentation
- `deep-learning`: Minor refinement to skill documentation.

## 1.8.0 - 2026-03-16

### Features
- `deep-learning`: New skill for systematically learning and explaining library, framework, module, function, or code path principles. Helps build correct mental models with layered explanations from problem and role to design tradeoffs and next steps. Supports project, module, and function modes with comprehensive workflow guidance.

### Other
- Upgraded gitignore with additional patterns.

## 1.7.1 - 2026-03-10

### Features
- `dev-workflow`: Added test and bugfix phases to the workflow for complete development lifecycle coverage. Added artifact rules documentation and status schema for better structure validation.

## 1.7.0 - 2026-03-06

### Features
- `dev-workflow`: New skill for document-driven AI agent development by task, with explicit phases (intake, research, plan, todo, implement, review), per-task artifacts, dependency healing, and incremental updates.
- `project-handover-generator`: New skill for generating practical project handover documents from codebase and artifacts, grounded in actual repository evidence.

## 1.6.2 - 2026-01-26

### Refactor
- `context-probe`: Simplified SKILL.md documentation (reduced from 250 to 73 lines) for improved clarity and maintainability.

## 1.6.1 - 2026-01-26

### Refactor
- `context-probe`: Refactored skill from implicit monitor to installer + guardrail rules with slash-command UX. Added managed block format with v1 versioning, support for AGENTS/Cursor/Claude priority layers, and dedup/migration capabilities.

### Documentation
- Updated AGENTS.md with comprehensive context-probe installation commands and managed block documentation.
- Updated CLAUDE.md with context-probe installation notes.

## 1.6.0 - 2026-01-26

### Features
- `context-probe`: New implicit system-level skill that monitors context integrity, system prompt survival, and instruction drift. Always operates implicitly without user invocation. Warns when context is degraded or lost.

### Documentation
- Updated CLAUDE.md with context-probe documentation.
- Updated README with context-probe skill description.

## 1.5.1 - 2026-01-26

### Features
- `prompt-minifier`: Added prompt-only output mode support. Users can now choose between `prompt_only` (minified prompt only) and `prompt_with_report` (minified prompt + compression report).

### Documentation
- Updated CLAUDE.md with consolidated plugin organization and code style guidelines.

## 1.5.0 - 2026-01-26

### Features
- `skills-workflow-builder`: New skill for creating dedicated workflow skills by baking in a fixed pipeline (skill order + per-step goal/template/contract/stop). Reuses skills-workflow for normalization and skill-creator for materialization.

### Documentation
- Updated README with skills-workflow-builder documentation.

## 1.4.0 - 2026-01-26

### Features
- Renamed `skills-orchestrator` to `skills-workflow` for better clarity and naming consistency.

## 1.3.0 - 2026-01-26

### Features
- `prompt-minifier`: New skill for minifying verbose prompts into semantically equivalent minimal prompts while preserving behavior. Supports lossless, balanced, and aggressive compression levels.
- `context-engineering`: New plugin category for context engineering skills.
- Reorganized `prompt-interviewer` from productivity to context-engineering plugin.

### Documentation
- Updated README with context-engineering category and prompt-minifier documentation.

## 1.2.0 - 2026-01-23

### Features
- `skills-orchestrator`: New skill for interactive skills orchestration. Enables chaining multiple skills where output of step i becomes input of step i-1. Supports dry-run mode, trace logging, output validation, and safety guardrails including prompt injection protection and secret redaction.

### Documentation
- Updated README with skills-orchestrator documentation

## 1.1.0 - 2026-01-22

### Features
- `api-generator`: New skill for autonomous frontend API code generation with project-aware integration support. Detects TypeScript, request patterns, mock infrastructure, and test frameworks to generate artifact-gated code.
- `prd-gatekeeper`: Engineering PRD gatekeeper that validates PRDs against 5 hard quality gates and ensures production-readiness for engineers.

### Documentation
- Updated README with new skills documentation
- Added CHANGELOG.md and CHANGELOG.zh.md for version tracking

## 1.0.1 - 2026-01-22

### Documentation
- Updated README with improved formatting and structure

## 1.0.0 - 2026-01-22

### Initial Release

First official release of kim-skills plugin for Claude Code.

### Features

**Frontend Analysis (fe-analysis)**
- `architecture-analysis` - Comprehensive frontend architecture analyzer that identifies technology stacks, build tools, and architectural patterns. Detects Vue/React/Angular frameworks, Node.js environments, package managers, TypeScript usage, linters, and architecture patterns. Provides multiple output formats including JSON, markdown, executive summary, and scorecard.

- `dependency-analysis` - Enhanced dependency analyzer with comprehensive markdown reporting and actionable recommendations. Performs security scanning, unused package detection, phantom dependency identification, circular dependency detection, and cleanup script generation. Supports JavaScript, TypeScript, Vue, React, Angular, and modern build tools with parallel processing and incremental analysis capabilities.

- `unit-test-generator` - Intelligent unit test generator for frontend projects that detects existing test frameworks and generates comprehensive tests for functions, components, and modules. Maintains framework consistency by analyzing existing test patterns. Supports Jest, Vitest, Mocha with React, Vue, Angular frameworks.

**Project (project)**
- `resume-project-analyzer` - Transforms codebases into authentic, interview-defensible resume project experience through a 5-step workflow. Analyzes project structure, extracts engineering value, classifies confidence levels, conducts reflective questioning, and generates structured output.

- `prd-gatekeeper` - Engineering PRD gatekeeper that validates PRDs against 5 hard quality gates and ensures production-readiness for engineers. Blocks progress when engineering risk exists, ensuring no implicit product decisions are pushed into implementation.

**Productivity (productivity)**
- `prompt-interviewer` - Senior Prompt Engineer and Prompt Interviewer that interviews users to refine and complete their prompts through structured analysis and iterative questioning. Acts as an interviewer rather than a prompt rewriter, ensuring prompts are unambiguous and well-structured before execution.

- `release-skills` - Automates the release process for kim-skills plugin: analyzes changes since last tag, updates CHANGELOG (EN/CN), bumps marketplace.json version, commits, and creates version tag.
