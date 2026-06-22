# Painpoint Validate Stage Contract

## Stage

- stage id: `painpoint_validate`
- output file: `04-painpoints.md`
- default research depth: `deep`

## Required Inputs

- 02-users.md
- 03-scenarios.md
- research/02-users-research.md
- research/03-scenarios-research.md
- sources/sources.json

## Core Tasks

1. 分析当前流程问题
2. 识别痛点列表
3. 验证痛点真实性和强度
4. 检索用户抱怨、评论、GitHub Issues、社区反馈、竞品缺陷
5. 判断替代方案是否足够好
6. 输出继续/回退/需要数据/停止建议
7. 写入 04-painpoints.md 与 research/04-painpoints-research.md

## Required Output

The skill must produce `04-painpoints.md` in the idea workspace.

If Web Search is used or evidence is needed, also produce `research/04-painpoints-research.md` and update `sources/sources.json`.

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
