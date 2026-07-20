# Research and Evidence Policy

Every phase decides whether external research is necessary. Research is optional only when the conclusion does not depend on external, current, or uncertain facts; documenting the decision is mandatory.

## Search triggers

Search when a conclusion depends on:

- current market, competitor, pricing, policy, regulation, or platform information;
- whether users experience the claimed pain and how frequently;
- technical maturity, API behavior, alternatives, cost, security, or privacy;
- unfamiliar products, companies, frameworks, or concepts;
- any fact with a meaningful chance of having changed.

Choose depth internally. Respect an explicit user restriction on Web Search, record the evidence limitation, and never present unverified assumptions as facts. If a restricted, unavailable fact is decision-critical, use `needs_data` rather than fabricating confidence.

## Research before questions

Do not ask the user for an externally discoverable fact merely because it is absent from the workspace. Research it first when permitted. Ask the user only for internal observations, preferences, constraints, decisions, private evidence, or context that cannot be responsibly derived or researched.

## Research depths

- `none`: do not search; record the reason and unverified assumptions.
- `light`: answer one to three decisive questions.
- `standard`: cover several relevant dimensions and compare sources.
- `deep`: triangulate important claims across primary, market, competitor, and user evidence.

Escalate above the phase default when a gate decision depends on contested, high-risk, or fast-changing facts. Reduce depth only when existing registered evidence remains current and sufficient.

## Research artifact

Always create the phase research document once phase analysis begins. If no search occurs, record:

- phase goal;
- search decision and reason;
- existing evidence reused;
- assumptions left unverified;
- expected impact on evidence level.

If search occurs, write a plan before searching:

- questions to verify;
- search terms;
- preferred source types;
- freshness requirements;
- expected decision impact.

Then record findings, conflicts, limitations, and source IDs. The phase-11 research artifact is created during assemble; it is not an assemble prerequisite.

## Evidence Block

Every completed or drafted phase document contains:

```markdown
## Evidence Block

### Search decision
Yes / No, with reason.

### Sources
| ID | Finding used here |
|---|---|

### Facts
- User-provided or externally verifiable facts.

### Inferences
- Conclusions derived from facts, with reasoning.

### Assumptions
- Unverified claims retained to continue the workflow.

### Evidence level
high / medium / low.

### Decision impact
How the evidence strengthened, weakened, or changed the conclusion.
```

The source registry is canonical for source metadata. Do not duplicate titles, URLs, credibility, and retrieval details in every phase table.

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
      "canonicalUrl": "https://example.com",
      "sourceType": "official_doc",
      "publishedAt": null,
      "retrievedAt": "2026-07-20T10:00:00+08:00",
      "lastVerifiedAt": "2026-07-20T10:00:00+08:00",
      "credibility": "high",
      "keyFindings": ["Finding"],
      "usedIn": ["04-painpoints.md"]
    }
  ]
}
```

Allowed source types are `competitor`, `official_doc`, `industry_report`, `community_discussion`, `open_source_project`, `technical_doc`, `news`, `market_data`, `user_review`, and `policy_or_regulation`. Credibility is `high`, `medium`, or `low`.

Prefer official documents, laws, primary data, direct user evidence, and first-party product information. Treat isolated comments, anonymous claims, and marketing content as weak evidence. Deduplicate sources by normalized `canonicalUrl`; reuse source IDs and update `lastVerifiedAt` instead of creating duplicates.

