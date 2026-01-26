# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Note: AGENTS.md Has Higher Priority

This repository contains `AGENTS.md` at the root level, which serves as the highest-priority agent kernel rules file. AGENTS.md contains more detailed code style guidelines and patterns. When AGENTS.md is present, it takes precedence over CLAUDE.md for agent behavior.

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
    { "name": "project", "skills": ["./project/api-generator", ...] },
    { "name": "productivity", "skills": ["./productivity/skills-workflow", ...] },
    { "name": "context-engineering", "skills": ["./context-engineering/prompt-minifier", ...] }
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
- `engines.node` specifies minimum Node version (typically `>=14.0.0`)

**scripts/** directory contains executable Node.js utilities referenced in SKILL.md examples.

**references/** directory contains supporting documentation like frameworks, patterns, templates.

## Code Style Guidelines (for skills with scripts)

### JavaScript Conventions
- Use CommonJS: `const fs = require('fs').promises`
- Destructure from child_process: `const { spawn } = require('child_process')`
- Group imports: std lib → external deps → local modules
- Pure JavaScript (no TypeScript in skill implementation)
- JSDoc comments: `/** Multi-line */` for documentation
- Shebang on CLI scripts: `#!/usr/bin/env node`

### Naming
- Classes: `PascalCase` (e.g., `ProjectAnalyzer`, `FrameworkDetector`)
- Functions/methods: `camelCase` (e.g., `analyze()`, `detectFrameworks()`)
- Files: `kebab-case.js` (e.g., `analyze-project.js`, `framework-detector.js`)
- Directories: `kebab-case` (e.g., `scripts/`, `detectors/`, `analyzers/`)
- Constants: `UPPER_SNAKE_CASE` (rare, used for configs)

### Formatting
- Indentation: 4 spaces (no tabs)
- Quotes: Single quotes for strings
- Semicolons: Present and consistent
- Block statements: `catch { }` (no space before closing brace)

### Error Handling
- Wrap file operations in try-catch
- Graceful degradation: return null on failure
- Result objects: `{ success: boolean, data?: any, error?: string }`
- CLI errors: `console.error('message')` then `process.exit(1)`

### Module Patterns
```javascript
// CLI entry point pattern
if (require.main === module) {
  const args = process.argv.slice(2);
  // Parse args and execute
}

// Class-based analyzers
class ProjectAnalyzer {
  constructor(projectPath, options = {}) {
    this.projectPath = path.resolve(projectPath);
    this.options = options;
  }

  async analyze() {
    // Implementation
  }
}
module.exports = ProjectAnalyzer;
```

### Path Resolution
Always resolve to absolute paths:
```javascript
const path = require('path');
const resolvedPath = path.resolve(projectPath, 'relative/path');
```

## Common Commands

### Architecture Analysis
```bash
cd fe-analysis/architecture-analysis
npm test                    # Run on test-project
node scripts/analyze-project.js /path/to/project  # Analyze any project
```

### Dependency Analysis
```bash
cd fe-analysis/dependency-analysis
npm install                 # Install dependencies (acorn, acorn-walk, semver)
npm test                    # Run on test-project
npm run analyze             # Analyze current directory
```

### Unit Test Generator
```bash
cd fe-analysis/unit-test-generator
npm test                    # Detect framework in test-project
node scripts/generate-test.js src/components/Button.js  # Generate test for file
```

### Release Process
Use `/release-skills` command to:
- Analyze changes since last tag
- Update CHANGELOG (EN/CN)
- Update README if needed
- Bump marketplace.json version
- Commit and create version tag

## Creating a New Skill

1. Create a new directory for the skill
2. Create `SKILL.md` with YAML frontmatter and clear workflow instructions
3. Add `package.json` if the skill includes executable scripts
4. Add `references/` with supporting docs if needed
5. Update `.claude-plugin/marketplace.json` with the new skill path
6. Test by running the skill via the `/skill-name` command

## Plugin Organization

The repository is organized into 4 plugins:

### fe-analysis
Frontend project analysis tools for understanding architecture, dependencies, and testing.
- architecture-analysis: Comprehensive frontend architecture analyzer
- dependency-analysis: Enhanced dependency analyzer with security scanning
- unit-test-generator: Intelligent unit test generator

### project
Project-related skills for documentation and analysis.
- api-generator: Autonomous frontend API code generation
- prd-gatekeeper: Engineering PRD gatekeeper
- resume-project-analyzer: Resume project experience extractor

### productivity
Productivity tools for workflow optimization.
- skills-workflow: Interactive skills workflow orchestrator
- release-skills: Automated release workflow
- skills-workflow-builder: Creates dedicated workflow skills

### context-engineering
Context engineering skills for prompt optimization and management.
- prompt-minifier: Minifies verbose prompts
- prompt-interviewer: Prompt refinement interviewer
- context-probe: Implicit system-level skill that monitors context integrity, system prompt survival, and instruction drift. Always operates implicitly without user invocation. Warns when context is degraded or lost.

**Context-probe Installation:**
- Installs managed block at highest priority layer: AGENTS.md (if present) > .cursor/rules/context-probe > CLAUDE.md
- Use `/context-probe` to install/update, `/context-probe status` to check installation, `/context-probe verbose on/off` for telemetry control
