# status.json Schema

```json
{
  "ideaId": "idea-20260622-example",
  "title": "一句话想法转完整需求工具",
  "currentStage": "painpoint_validate",
  "workflowStatus": "running",
  "decision": "pending",
  "createdAt": "2026-06-22T21:00:00+08:00",
  "updatedAt": "2026-06-22T21:30:00+08:00",
  "stages": {
    "idea_intake": {
      "status": "done",
      "decision": "continue",
      "file": "00-idea-intake.md",
      "evidenceLevel": "low"
    }
  }
}
```

## Stage Status

- `pending`: 尚未开始。
- `running`: 正在执行。
- `done`: 已完成。
- `need_more_info`: 需要补充信息。
- `blocked`: 被阻塞。
- `rejected`: 当前节点建议终止。

## Stage Decision

- `continue`: 继续下一阶段。
- `revise`: 回退修改上游阶段。
- `need_data`: 需要更多数据或用户输入。
- `stop`: 停止，不进入正式需求。

## Evidence Level

- `high`: 有官方资料、直接用户证据、明确数据或可验证事实支撑。
- `medium`: 有多个间接来源支撑，但缺少直接验证。
- `low`: 主要来自推断、假设或单一弱来源。
