# Phase 05-5: Grouped Recommendation — Design

## Pipeline

```
buildRecommendations(results)
  → { recommendations[], unmappedCount, invalidCount }
      ↓
groupRecommendations(recommendations)
  → { finalRecommendations[], groupedFrom: Map<parent, children[]> }
      ↓
buildSuggestedFlow(finalRecommendations, issueCount)
  → SuggestedFlow (targets = finalRecommendations targets)
      ↓
formatter: render finalRecommendations + groupedFrom hints
```

## Files

| File | Change |
|------|--------|
| `groupingRegistry.js` | NEW — GROUPS 정책 정의 |
| `groupRecommendations.js` | NEW — 순수 grouping 함수 |
| `defaultFormatter.js` | UPDATE — groupRecommendations 적용, "(covers: ...)" 렌더링 |
| `computeRecommendations.js` | UPDATE — groupRecommendations 적용, grouped 결과 반환 |

## Grouping Registry (initial)

```js
GROUPS = [{
  parent:      'docs-core',
  children:    ['docs-plan', 'docs-design', 'docs-task', 'docs-report', 'docs-changelog'],
  minChildren: 2,
  label:       'all docs',
  description: 'create all docs/ scaffolds (plan, design, task, report, changelog)',
}]
```

## groupRecommendations Algorithm

```
resultMap = Map(target → Recommendation)

for each group:
  if parent not in VALID_TARGETS → skip (safe fallback)
  presentChildren = children in resultMap
  if presentChildren.length < minChildren → skip
  remove children from resultMap
  add parent Recommendation (combined sources)
  record in groupedFrom

return sorted finalRecommendations (TARGET_PRIORITY order)
```

## Output Example (empty project)

**Before (Phase 5-2):** 12 targets
```
  • docs-plan — create the plan document scaffold
  • docs-design — create the design document scaffold
  • docs-task — ...
  • docs-report — ...
  • docs-changelog — ...
```

**After (Phase 5-5):** 8 targets
```
  • docs-core — create all docs/ scaffolds (plan, design, task, report, changelog)
    (covers: docs-plan, docs-design, docs-task, docs-report, docs-changelog)
```

## Scenario Results

| Scenario | Input | Output |
|----------|-------|--------|
| A: 5 docs | docs-plan...docs-changelog | docs-core |
| B: 1 doc | docs-report | docs-report (no grouping) |
| C: 2 docs + hooks-json | docs-plan, docs-design, hooks-json | docs-core, hooks-json |
| D: invalid parent | parent not in VALID_TARGETS | children kept as-is |
| E: skills/policies | skills-core, policies-core | unchanged (no children to group) |
