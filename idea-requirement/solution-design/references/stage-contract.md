# Solution Design Stage Contract

## Stage

- stage id: `solution_design`
- output file: `08-solution.md`
- default research depth: `deep`

## Required Inputs

- 02-users.md
- 03-scenarios.md
- 04-painpoints.md
- 05-value.md
- 06-feasibility.md
- 07-goals.md
- sources/sources.json

## Core Tasks

1. 设计方案概述
2. 设计核心流程和功能模块
3. 明确输入输出与系统处理逻辑
4. 检索竞品方案、开源实现、技术架构、设计范式
5. 设计异常和兜底方案
6. 说明方案取舍
7. 写入 08-solution.md 与 research/08-solution-research.md

## Required Output

The skill must produce `08-solution.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/08-solution-research.md` and update `sources/sources.json`.

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
