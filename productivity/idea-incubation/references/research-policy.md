# Research and Evidence Policy

Every phase decides whether external search is necessary. Search is optional; documenting the decision is mandatory.

## Search triggers

Search when a conclusion depends on:

- current market, competitor, pricing, policy, regulation, or platform information;
- whether users experience the claimed pain and how frequently;
- technical maturity, API behavior, alternatives, cost, security, or privacy;
- unfamiliar products, companies, frameworks, or concepts;
- any fact with a meaningful chance of having changed.

Respect the user's Web Search permission. When search is disabled, record the evidence limitation and never present assumptions as facts.

## Research depths

- `none`: do not search; record the reason and unverified assumptions.
- `light`: answer one to three decisive questions.
- `standard`: cover several relevant dimensions and compare sources.
- `deep`: triangulate important claims across primary, market, competitor, and user evidence.

## Research artifact

Always create the phase research document. If no search occurs, record:

- phase goal;
- search decision and reason;
- assumptions left unverified;
- expected impact on evidence level.

If search occurs, write a plan before searching:

- questions to verify;
- search terms;
- preferred source types;
- expected decision impact.

Then record findings, conflicts, limitations, and source IDs.

## Evidence Block

Every phase document contains:

```markdown
## Evidence Block

### Search decision
Yes / No, with reason.

### Sources
| ID | Source | Type | URL | Credibility | Finding |
|---|---|---|---|---|---|

### Facts
- User-provided or externally verifiable facts.

### Inferences
- Conclusions derived from facts, with reasoning.

### Assumptions
- Unverified claims retained to continue the workflow.

### Evidence level
High / Medium / Low.

### Decision impact
How the evidence strengthened, weakened, or changed the conclusion.
```

## Source registry

Store every cited external source once in `sources/sources.json`:

```json
{
  "sources": [
    {
      "id": "src-001",
      "firstUsedInPhase": "painpoints",
      "title": "Source title",
      "url": "https://example.com",
      "sourceType": "official_doc",
      "retrievedAt": "2026-07-20T10:00:00+08:00",
      "credibility": "high",
      "keyFindings": ["Finding"],
      "usedIn": ["04-painpoints.md"]
    }
  ]
}
```

Allowed source types: `competitor`, `official_doc`, `industry_report`, `community_discussion`, `open_source_project`, `technical_doc`, `news`, `market_data`, `user_review`, and `policy_or_regulation`.

Prefer official documents, laws, primary data, direct user evidence, and first-party product information. Treat isolated comments, anonymous claims, and marketing content as weak evidence. Reuse existing source IDs instead of duplicating URLs.
