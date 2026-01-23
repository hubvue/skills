# Changelog

All notable changes to this project will be documented in this file.

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
