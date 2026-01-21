# skills

A collection of Claude Code Skills that extend Claude Code's functionality for frontend analysis and project understanding.

## Overview

This repository contains reusable skills that can be invoked via `/skill-name` commands in Claude Code. Each skill is self-contained and distributed through the Claude Code marketplace.

## Plugins

### fe-analysis

Frontend project analysis tools for understanding architecture, dependencies, and testing.

#### Skills

- **architecture-analysis** - Detects frameworks, build tools, TypeScript usage, and architectural patterns
- **dependency-analysis** - Optimizes dependencies with security scanning, unused package detection, and cleanup scripts
- **unit-test-generator** - Generates comprehensive tests while maintaining framework consistency

### project

Project-related skills for documentation and analysis.

#### Skills

- **resume-project-analyzer** - Transforms codebases into authentic, interview-defensible resume project experience

## Skill Structure

```
/<skill-name>/
├── SKILL.md           # Main skill definition and workflow
├── package.json       # Node dependencies (optional)
├── scripts/           # Executable Node.js scripts (optional)
└── references/        # Supporting documentation (optional)
```

## Quick Start

1. Clone this repository
2. Add to Claude Code plugin directory
3. Invoke skills via `/skill-name` commands

## Requirements

- Node.js >= 14.0.0

## License

Contact the owner for licensing information.
