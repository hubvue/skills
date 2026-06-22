# Requirement Assemble Stage Contract

## Stage

- stage id: `requirement_assemble`
- output file: `11-requirement.md`
- default research depth: `light`

## Required Inputs

- 00-idea-intake.md 到 10-acceptance.md
- research/*.md
- sources/sources.json
- status.json

## Core Tasks

1. 读取所有阶段文档
2. 检查关键内容是否缺失
3. 校验事实、推断、假设是否一致
4. 必要时轻量检索最新信息
5. 组装最终需求文档
6. 生成决策记录和来源摘要
7. 写入 11-requirement.md、decision.md、sources/source-summary.md

## Required Output

The skill must produce `11-requirement.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/11-requirement-research.md` and update `sources/sources.json`.

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
