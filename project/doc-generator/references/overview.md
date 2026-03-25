# Overview

This skill transforms code into practical usage documentation.

Its purpose is to reduce the gap between source code and consumers of that code.

This skill is especially useful when:

- a component library lacks usage docs
- an SDK is usable only through tribal knowledge
- a utility file contains many helpers but usage scenarios are unclear
- a core module is hard for newcomers to understand
- existing README files are outdated
- teams need consistent documentation structure across projects

## Main Goals

1. Explain responsibilities clearly
2. Extract public usage surface
3. Provide practical examples
4. Clarify boundaries and limitations
5. Reduce misuse
6. Improve maintainability and onboarding

## Target Audiences

Supported audience modes:

- `business-dev`
  - focuses on access, usage, examples, caveats
- `maintainer`
  - focuses on internal structure, extension points, dependencies, risks
- `newcomer`
  - focuses on concepts, role in system, simplest usage path
- `ai-agent`
  - focuses on stable structure, explicit sections, low ambiguity

If audience is not specified, default to:
- project/file: `newcomer` + `business-dev`
- method/API: `business-dev`

## Typical Documentation Types

- README
- usage guide
- API reference
- module guide
- best practices
- FAQ
- migration guide
- document update
