# sources.json Schema

所有 Web Search 来源必须进入全局 sources.json，供后续节点复用。

```json
{
  "sources": [
    {
      "id": "src-001",
      "stage": "painpoint_validate",
      "title": "Source title",
      "url": "https://example.com",
      "sourceType": "competitor | official_doc | industry_report | community_discussion | open_source_project | technical_doc | news | market_data | user_review | policy_or_regulation",
      "retrievedAt": "2026-06-22T22:00:00+08:00",
      "credibility": "high | medium | low",
      "keyFindings": [
        "关键发现 1",
        "关键发现 2"
      ],
      "usedIn": [
        "04-painpoints.md"
      ]
    }
  ]
}
```

## 来源可信度建议

- high：官方文档、法规政策、权威报告、产品官网、可验证数据。
- medium：主流媒体、专业博客、公开案例、较活跃开源项目。
- low：单个社区评论、未经验证的观点、营销软文、匿名反馈。
