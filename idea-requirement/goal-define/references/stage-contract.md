# Goal Define Stage Contract

## Stage

- stage id: `goal_define`
- output file: `07-goals.md`
- default research depth: `light`

## Required Inputs

- 04-painpoints.md
- 05-value.md
- 06-feasibility.md
- sources/sources.json

## Core Tasks

1. 定义需求目标
2. 定义用户目标、业务目标、工程目标
3. 检索类似产品常用指标和合理收益承诺
4. 设计成功指标和统计方式
5. 明确非目标
6. 写入 07-goals.md 与 research/07-goals-research.md

## Required Output

The skill must produce `07-goals.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/07-goals-research.md` and update `sources/sources.json`.

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
