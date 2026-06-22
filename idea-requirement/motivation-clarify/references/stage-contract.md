# Motivation Clarify Stage Contract

## Stage

- stage id: `motivation_clarify`
- output file: `01-motivation.md`
- default research depth: `standard`

## Required Inputs

- 00-idea-intake.md
- research/00 或初始检索信息（如有）
- sources/sources.json

## Core Tasks

1. 分析想法产生动机
2. 判断是问题驱动、趋势驱动、技术驱动、竞品驱动还是个人灵感
3. 检索行业趋势、产品更新、技术变化、社区讨论
4. 提炼核心动机和初步假设
5. 写入 01-motivation.md 与 research/01-motivation-research.md

## Required Output

The skill must produce `01-motivation.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/01-motivation-research.md` and update `sources/sources.json`.

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
