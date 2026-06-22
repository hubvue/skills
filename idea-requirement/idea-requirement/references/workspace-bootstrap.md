# Workspace Bootstrap

For a new idea, create:

```text
.idea-workspace/ideas/<idea-id>/
  research/
  sources/
  logs/
  status.json
  sources/sources.json
```

## ideaId Generation

Recommended format:

```text
idea-YYYYMMDD-short-slug
```

## Initial status.json

Initialize all stages as `pending`, currentStage as `idea_intake`, workflowStatus as `running`, decision as `pending`.

## Initial sources.json

```json
{
  "sources": []
}
```
