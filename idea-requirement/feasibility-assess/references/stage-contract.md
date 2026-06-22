# Feasibility Assess Stage Contract

## Stage

- stage id: `feasibility_assess`
- output file: `06-feasibility.md`
- default research depth: `deep`

## Required Inputs

- 03-scenarios.md
- 04-painpoints.md
- 05-value.md
- research/05-value-research.md
- sources/sources.json

## Core Tasks

1. 评估技术可行性
2. 评估产品、业务、成本、时间可行性
3. 检索官方文档、开源项目、API、云服务价格、法规政策、安全实践
4. 识别核心依赖与关键风险
5. 给出 MVP 可行性和降级建议
6. 写入 06-feasibility.md 与 research/06-feasibility-research.md

## Required Output

The skill must produce `06-feasibility.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/06-feasibility-research.md` and update `sources/sources.json`.

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
