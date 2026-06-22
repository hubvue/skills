# Scenario Restore Stage Contract

## Stage

- stage id: `scenario_restore`
- output file: `03-scenarios.md`
- default research depth: `standard`

## Required Inputs

- 02-users.md
- research/02-users-research.md
- sources/sources.json

## Core Tasks

1. 还原用户真实工作流
2. 识别触发场景
3. 描述使用前、使用中、使用后路径
4. 检索竞品流程、教程、评测、社区问答
5. 区分高频场景和低频场景
6. 写入 03-scenarios.md 与 research/03-scenarios-research.md

## Required Output

The skill must produce `03-scenarios.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/03-scenarios-research.md` and update `sources/sources.json`.

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
