# Phase 05-5: Grouped Recommendation — Task

## Status
done

## Tasks

- [x] groupingRegistry.js 작성 (GROUPS 정책: docs-core, minChildren=2)
- [x] groupRecommendations.js 작성 (순수 grouping 함수)
- [x] defaultFormatter.js 갱신 (groupRecommendations 적용, "(covers: ...)" 출력)
- [x] computeRecommendations.js 갱신 (grouped recommendation 반환)
- [x] 시나리오 A: 5 docs children → docs-core ✓
- [x] 시나리오 B: 1 docs child → docs-report 유지 ✓
- [x] 시나리오 C: 2 docs + hooks-json → docs-core + hooks-json ✓
- [x] 시나리오 D: invalid parent → children 유지 (VALID_TARGETS 검증) ✓
- [x] 시나리오 E: skills-core / policies-core → 불필요 grouping 없음 ✓

## 검증 결과

| 시나리오 | Input | finalTargets |
|----------|-------|--------------|
| A (5 docs) | docs-plan...changelog | docs-core |
| B (1 doc) | docs-report | docs-report |
| C (2 docs+hooks) | hooks-json, docs-plan, docs-design | hooks-json, docs-core |
| D (invalid parent) | VALID_TARGETS에 없는 parent | children as-is |
| E (skills+policies) | skills-core, policies-core | 변경 없음 |

## 실제 check 출력 변화

- 빈 프로젝트 추천: 12개 → 8개 target
- suggested command 길이: 5 docs 항목 → docs-core 1개로 단축
- init --recommended: docs-core 전달 → buildInitPlan이 TARGET_ALIASES로 정상 확장
