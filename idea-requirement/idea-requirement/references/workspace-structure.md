# Workspace Structure

每个想法必须创建独立目录，所有阶段产物都落盘，保证工作流可恢复、可审计、可复用。

```text
.idea-workspace/
  ideas/
    idea-YYYYMMDD-slug/
      00-idea-intake.md
      01-motivation.md
      02-users.md
      03-scenarios.md
      04-painpoints.md
      05-value.md
      06-feasibility.md
      07-goals.md
      08-solution.md
      09-scope.md
      10-acceptance.md
      11-requirement.md
      decision.md
      status.json
      research/
        01-motivation-research.md
        02-users-research.md
        03-scenarios-research.md
        04-painpoints-research.md
        05-value-research.md
        06-feasibility-research.md
        07-goals-research.md
        08-solution-research.md
        09-scope-research.md
        10-acceptance-research.md
        11-assemble-research.md
      sources/
        sources.json
        source-summary.md
      logs/
        workflow.log
```

## 落盘要求

- 如果节点成功，写入对应阶段文档。
- 如果节点失败或信息不足，也必须写入对应阶段文档，说明阻塞原因、缺失信息和下一步动作。
- 不允许只在对话中输出结论而不写文件。
