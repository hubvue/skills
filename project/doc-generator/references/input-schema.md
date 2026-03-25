# Input Schema

When invoking this skill, identify the following inputs when available.

## Required

### target
The object to document.

Possible values:
- repository path
- project root
- package folder
- file path
- symbol name
- component name
- class name
- function name
- method name

## Optional

### scope
One of:
- `project`
- `file`
- `symbol`

If omitted, infer from target.

### intent
One of:
- `readme`
- `usage-guide`
- `api-reference`
- `module-guide`
- `best-practices`
- `faq`
- `migration-guide`
- `update-existing-doc`

Default:
- project → `readme` or `usage-guide`
- file → `module-guide`
- symbol → `api-reference`

### audience
One of:
- `business-dev`
- `maintainer`
- `newcomer`
- `ai-agent`

### language
Examples:
- `zh-CN`
- `en-US`

Default: follow user language.

### output_path
If the environment supports file writing, may specify target doc file path.

Examples:
- `README.md`
- `docs/button.md`
- `docs/sdk/init.md`

### existing_doc
Optional existing doc file to update or align with.

### constraints
Optional custom constraints, such as:
- preserve existing headings
- add more examples
- focus on public APIs only
- ignore test files
- prioritize hooks/components
- summarize before writing full doc

## Inference Rules

If user asks:
- “为这个项目生成文档” → scope likely `project`
- “解释这个文件怎么用” → scope likely `file`
- “帮我写这个方法的使用说明” → scope likely `symbol`

## If scope is mixed

If the target includes both project and symbol context:
1. prioritize explicitly named target
2. explain inferred scope briefly in output if needed
