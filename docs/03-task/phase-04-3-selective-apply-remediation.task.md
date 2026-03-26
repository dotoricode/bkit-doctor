# Phase 04-3: Selective Apply & Remediation — Task

## Status
done

## Tasks

- [x] targetRegistry.js 작성 (TARGETS 상수, validateTargets, suggestTarget Dice)
- [x] scaffoldManifest.js 갱신 (DIRECTORIES에 targets[], TARGET_ALIASES, 명칭 통일)
- [x] remediationMap.js 갱신 (initTarget 명칭 동기화, CLAUDE.md는 null)
- [x] buildInitPlan.js 갱신 (targets 필터링, alias 확장, neededDirs 계산)
- [x] init.js 갱신 (collectTargets, validateTargets, unknown hint, 출력 개선)
- [x] cli/index.js 갱신 (--target collect 반복, --targets 쉼표)
- [x] 시나리오 A: --target hooks-json → .claude + hooks.json만 생성 ✓
- [x] 시나리오 B: --target docs-report → docs + report.md만 생성, 재실행 skip ✓
- [x] 시나리오 C: --targets hooks-json,skills-core --dry-run → 8 dirs, 7 files ✓
- [x] 시나리오 D: --target docs-reprot → "did you mean: docs-report?" ✓
- [x] 시나리오 E: remediationMap initTarget 전수 검증 통과 ✓

## 검증 결과

| 시나리오 | 결과 |
|----------|------|
| A: --target hooks-json | dirs 1, files 1 |
| B: --target docs-report (재실행) | nothing to do |
| C: --targets hooks-json,skills-core --dry-run | dirs 8, files 7 |
| D: --target docs-reprot | did you mean: docs-report?, exit 1 |
| E: remediationMap 정합성 | all valid |
