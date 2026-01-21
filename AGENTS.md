# AGENTS.md

This repository contains Claude Code skills - self-contained capabilities for analyzing frontend projects. Each skill is modular and independent.

## Repository Structure

```
skills/
├── fe-analysis/
│   ├── architecture-analysis/    # Framework/build tool detection
│   ├── dependency-analysis/      # Dependency optimization
│   └── unit-test-generator/      # Test framework detection
├── project/
│   └── resume-project-analyzer/   # Resume content extraction
└── .claude-plugin/marketplace.json  # Plugin distribution config
```

## Build/Lint/Test Commands

### Architecture Analysis
```bash
cd fe-analysis/architecture-analysis
npm test                    # Run on test-project
node scripts/analyze-project.js /path/to/project  # Analyze any project
```

### Dependency Analysis
```bash
cd fe-analysis/dependency-analysis
npm test                    # Run on test-project
npm run analyze             # Analyze current directory
npm install                 # Install acorn, acorn-walk, semver
```

### Unit Test Generator
```bash
cd fe-analysis/unit-test-generator
npm test                    # Detect framework in test-project
node scripts/generate-test.js src/components/Button.js  # Generate test for file
```

### Running Single Tests
Each skill has its own test command in package.json. Run `npm test` in the skill's directory. There is no monorepo test runner.

## Code Style Guidelines

### Imports
- Use CommonJS: `const fs = require('fs').promises`
- Destructure from child_process: `const { spawn } = require('child_process')`
- Group imports: std lib → external deps → local modules
- Place at top of file, no spacing between groups

### Formatting
- **Indentation**: 4 spaces (no tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Present and consistent
- **Block statements**: `catch { }` (no space before closing brace)
- **Empty catches**: Allowed for graceful degradation

### Types
- Pure JavaScript (no TypeScript in skill implementation)
- Skills analyze TS but are written in JS
- JSDoc comments: `/** Multi-line */` for documentation
- Shebang on CLI scripts: `#!/usr/bin/env node`

### Naming Conventions
- Classes: `PascalCase` (e.g., `ProjectAnalyzer`, `FrameworkDetector`)
- Functions/methods: `camelCase` (e.g., `analyze()`, `detectFrameworks()`)
- Files: `kebab-case.js` (e.g., `analyze-project.js`, `framework-detector.js`)
- Directories: `kebab-case` (e.g., `scripts/`, `detectors/`, `analyzers/`)
- Constants: `UPPER_SNAKE_CASE` (rare, used for configs)

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

### File Organization
- **Root of skill**: `SKILL.md`, `README.md`, `package.json`
- **scripts/**: Main analyzer and utility scripts
- **scripts/detectors/** or **scripts/analyzers/**: Modular detection logic
- **scripts/utils/**: Shared utility functions
- **references/**: Documentation and patterns (markdown files)

### CLI Argument Parsing
Support both flag-based and JSON options:
```javascript
// Flags: --format markdown --output report.md
// JSON: '{"format":"markdown","depth":2}'
```

### Result Structure
Standardize analyzer results:
```javascript
{
  success: true,
  data: {},
  metadata: {
    analyzedAt: new Date().toISOString(),
    duration: 0
  }
}
```

## Key Patterns

### Async File Operations
Use `fs.promises` for async operations:
```javascript
const fs = require('fs').promises;
const content = await fs.readFile(filePath, 'utf-8');
```

### Path Resolution
Always resolve to absolute paths:
```javascript
const path = require('path');
const resolvedPath = path.resolve(projectPath, 'relative/path');
```

### Modular Detection
Separate concerns into detector/analyser modules:
- Framework detection → `framework-detector.js`
- Build tool detection → `build-tool-detector.js`
- Import analysis → `import-analyzer.js`

## Testing

Each skill has a `test-project/` directory for testing. Skills test against real project structures, not unit tests.

## Adding a New Skill

1. Create directory: `your-skill-name/`
2. Create `SKILL.md` with YAML frontmatter (`name`, `description`)
3. Add `package.json` if executable scripts are needed
4. Add `scripts/` directory for implementation
5. Add `references/` for supporting documentation
6. Update `.claude-plugin/marketplace.json` with skill path

## Notes

- No centralized build system - each skill is independent
- Node.js >= 14.0.0 required (check engines in package.json)
- Skills are distributed via marketplace.json, not npm
- Scripts are executable (chmod +x) when used as CLI tools
