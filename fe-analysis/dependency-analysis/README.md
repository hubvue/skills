# Advanced Dependency Analyzer

An comprehensive dependency analysis tool for JavaScript/TypeScript projects with peer dependency detection, import analysis, and deep dependency inspection.

## Features

- **Comprehensive Analysis**: Detect unused, missing, phantom, and circular dependencies
- **Peer Dependency Support**: Analyze peer dependencies and detect conflicts
- **Advanced Import Detection**: Supports ES6, CommonJS, dynamic imports, TypeScript path mapping
- **Framework Agnostic**: Works with React, Vue.js, Angular, Svelte, Next.js, Nuxt.js
- **Style Import Analysis**: Detect CSS @import, SCSS @use/@forward
- **Alias Resolution**: Supports TypeScript paths, Webpack, Vite aliases
- **Security Scanning**: Identifies known vulnerabilities
- **Health Scoring**: Overall dependency quality assessment

## Installation

The skill is ready to use as part of the fe-analysis-skills plugin.

## Quick Start

```bash
# Basic analysis
node scripts/analyze-dependencies-v2.js /path/to/project

# Full analysis
node scripts/analyze-dependencies-v2.js /path/to/project \
  --checkPeerDependencies \
  --checkOutdated \
  --checkSecurity
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--scope` | string | all | dependencies \| devDependencies \| peerDependencies \| all |
| `--checkPeerDependencies` | boolean | true | Analyze peer dependencies |
| `--checkOutdated` | boolean | false | Check for outdated packages |
| `--checkSecurity` | boolean | false | Scan for vulnerabilities |
| `--includeDev` | boolean | true | Include devDependencies in analysis |
| `--maxDepth` | number | 5 | Maximum depth for dependency tree analysis |
| `--pretty` | boolean | false | Pretty print JSON output |

## Architecture

```
skills/dependency-analysis/
├── SKILL.md                           # Main skill documentation
├── README.md                          # This file
├── package.json                        # Skill metadata
└── scripts/
    ├── analyze-dependencies-v2.js     # Main analyzer (new)
    ├── analyze-dependencies.js         # Legacy analyzer
    └── analyzers/
        ├── import-analyzer.js           # Import detection and analysis
        └── peer-dependency-analyzer.js  # Peer dependency analysis
    └── utils/
        └── package-utils.js             # Package utility functions
└── references/
    ├── import-patterns.md              # Import detection patterns
    ├── peer-dependency-analysis.md     # Peer dependency patterns
    ├── deep-dependency-patterns.md     # Deep analysis techniques
    └── output-formats.md               # Output format documentation
```

## What's New in v2.0

### Major Improvements

1. **Modular Architecture**
   - Separated concerns into specialized analyzers
   - Import analyzer for comprehensive import detection
   - Peer dependency analyzer for peer conflict detection

2. **Enhanced Import Detection**
   - TypeScript path mapping support
   - Framework-specific patterns (Vue, Svelte, Next.js)
   - CSS/SCSS import analysis
   - Alias resolution (Webpack, Vite, TypeScript)

3. **Peer Dependency Analysis**
   - Detects missing peer dependencies
   - Identifies version conflicts
   - Provides installation recommendations
   - Analyzes cross-package compatibility

4. **Better Error Handling**
   - Graceful handling of syntax errors
   - Fallback to regex parsing when AST fails
   - Detailed error reporting

5. **Performance Optimizations**
   - Parallel processing where possible
   - Memoization for expensive operations
   - Efficient file traversal

### New Features

- **Health Score**: Overall dependency quality assessment
- **Bundle Impact Analysis**: Estimated size and optimization potential
- **Security Scanning**: Basic vulnerability detection
- **Multi-format Output**: JSON, CSV, Markdown reports
- **Circular Dependency Visualization**: Detailed cycle paths

### Fixed Issues

- ✅ Fixed TypeScript path mapping not being recognized
- ✅ Added support for dynamic imports
- ✅ Improved alias detection
- ✅ Fixed false positives for CSS imports
- ✅ Added peer dependency conflict detection

## Usage Examples

### Basic Usage

```bash
# Analyze current directory
node scripts/analyze-dependencies-v2.js .

# Analyze specific project
node scripts/analyze-dependencies-v2.js /path/to/project
```

### Advanced Analysis

```bash
# Full scan with all features
node scripts/analyze-dependencies-v2.js . \
  --scope=all \
  --checkPeerDependencies \
  --checkOutdated \
  --checkSecurity \
  --includeDev

# Production dependencies only
node scripts/analyze-dependencies-v2.js . --scope=dependencies

# Development dependencies only
node scripts/analyze-dependencies-v2.js . --scope=devDependencies
```

### CI/CD Integration

```yaml
- name: Check Dependencies
  run: |
    node scripts/analyze-dependencies-v2.js . \
      --checkPeerDependencies \
      --checkOutdated \
      --checkSecurity
```

### Pre-commit Hook

```bash
#!/bin/bash
echo "Running dependency analysis..."
node scripts/analyze-dependencies-v2.js . --scope=dependencies

if [ $? -ne 0 ]; then
  echo "Dependency issues found. Please fix before committing."
  exit 1
fi
```

## Output

### Example Output

```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 150,
      "unused": 5,
      "missing": 2,
      "phantom": 3,
      "peerConflicts": 2,
      "circular": 1,
      "outdated": 10,
      "vulnerable": 1
    },
    "health": {
      "score": 75,
      "issues": [
        "Remove 5 unused dependencies",
        "Install 2 missing dependencies"
      ]
    }
  }
}
```

## Contributing

To add support for new features:

1. Create new analyzer in `scripts/analyzers/`
2. Add utility functions to `scripts/utils/`
3. Document patterns in `references/`
4. Update main analyzer to use new modules

## License

MIT