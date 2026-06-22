# Acceptance Criteria Stage Contract

## Stage

- stage id: `acceptance_criteria`
- output file: `10-acceptance.md`
- default research depth: `light`

## Required Inputs

- 07-goals.md
- 08-solution.md
- 09-scope.md
- sources/sources.json

## Core Tasks

1. 根据 MVP 范围生成验收标准
2. 拆分功能、流程、异常、非功能验收点
3. 检索平台规范、测试最佳实践、安全隐私要求
4. 定义 Definition of Done
5. 写入 10-acceptance.md 与 research/10-acceptance-research.md

## Required Output

The skill must produce `10-acceptance.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/10-acceptance-research.md` and update `sources/sources.json`.

## Decision Rules

- `continue`: 当前阶段信息充分，且结论支持进入下一阶段。
- `revise`: 当前阶段发现上游定义有问题，需要回退修改。
- `need_data`: 当前阶段无法做出可靠判断，需要用户补充、访谈、数据或更多调研。
- `stop`: 当前阶段判断想法不适合继续成为需求。

## Status Mapping

- decision `continue` -> status `passed`
- decision `revise` -> status `need_more_info`
- decision `need_data` -> status `need_more_info` or `blocked`
- decision `stop` -> status `rejected`
