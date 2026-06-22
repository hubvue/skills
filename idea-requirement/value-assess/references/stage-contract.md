# Value Assess Stage Contract

## Stage

- stage id: `value_assess`
- output file: `05-value.md`
- default research depth: `deep`

## Required Inputs

- 04-painpoints.md
- research/04-painpoints-research.md
- sources/sources.json

## Core Tasks

1. 根据痛点推导用户价值
2. 分析业务价值与工程价值
3. 检索竞品价格、商业模式、用户付费、市场趋势
4. 判断收益是否大于成本
5. 给出优先级建议
6. 写入 05-value.md 与 research/05-value-research.md

## Required Output

The skill must produce `05-value.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/05-value-research.md` and update `sources/sources.json`.

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
