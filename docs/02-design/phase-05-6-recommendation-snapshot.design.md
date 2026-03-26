# Phase 05-6: Recommendation Snapshot — Design

## Snapshot Flow

```
bkit-doctor check
  → CheckerRunner.run()
  → format(results)            ← existing output
  → saveRecommendationSnapshot(projectRoot, results)
      └─ buildRecommendations + groupRecommendations + buildSuggestedFlow
      └─ buildRecommendationFingerprint
      └─ makeSnapshot → write .bkit-doctor/cache/recommendation-snapshot.json

bkit-doctor init --recommended [--fresh]
  → --fresh? → skip snapshot → computeRecommendations
  → loadRecommendationSnapshot
  → buildRecommendationFingerprint
  → validateRecommendationSnapshot
      → valid?   → use snapshot.finalTargets
      → invalid? → computeRecommendations (fresh)
```

## Fingerprint

Key paths: scaffoldManifest.FILES + scaffoldManifest.DIRECTORIES + [CLAUDE.md, .claude]

Format: `path1:exists|path2:exists|...` (sorted)
- `exists` = "1" (exists) or "0" (missing)
- File create/delete → fingerprint changes → snapshot invalidated

## Snapshot Model

```json
{
  "version": "1",
  "createdAt": "2026-03-27T...",
  "projectRoot": "C:/path/to/project",  // forward slashes (normalized)
  "sourceCommand": "bkit-doctor check",
  "finalTargets": ["claude-root", "hooks-json", "docs-core"],
  "suggestedCommand": "bkit-doctor init --targets ...",
  "suggestedDryRunCommand": "bkit-doctor init --targets ... --dry-run",
  "issueCount": 14,
  "fingerprint": ".claude:0|.claude/hooks.json:0|..."
}
```

## Validation Rules

| Check | Fail action |
|-------|-------------|
| file exists | → missing → recompute |
| JSON parseable | → corrupt → recompute |
| version === '1' | → version mismatch → recompute |
| norm(projectRoot) match | → mismatch → recompute |
| fingerprint match | → stale → recompute |

## Files

| File | Change |
|------|--------|
| `recommendationSnapshotModel.js` | NEW — types, SNAPSHOT_VERSION, makeSnapshot |
| `buildRecommendationFingerprint.js` | NEW — deterministic fingerprint |
| `saveRecommendationSnapshot.js` | NEW — compute + save (silent on error) |
| `loadRecommendationSnapshot.js` | NEW — load JSON or null |
| `validateRecommendationSnapshot.js` | NEW — validation with path normalization |
| `check.js` | UPDATE — call saveRecommendationSnapshot after format |
| `init.js` | UPDATE — snapshot aware --recommended branch |
| `index.js` | UPDATE — --fresh option |
