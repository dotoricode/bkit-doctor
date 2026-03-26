# Phase 04-3: Selective Apply & Remediation — Design

## Status
done

## target 명칭 체계

| target          | 설명 |
|-----------------|------|
| claude-root     | .claude/ 루트 |
| hooks-json      | .claude/hooks.json |
| settings-local  | .claude/settings.local.json |
| agents-core     | .claude/agents/ 4종 |
| skills-core     | .claude/skills/ 6종 SKILL.md |
| templates-core  | .claude/templates/ 4종 |
| policies-core   | .claude/policies/ 4종 |
| docs-plan       | docs/plan.md |
| docs-design     | docs/design.md |
| docs-task       | docs/task.md |
| docs-report     | docs/report.md |
| docs-changelog  | docs/changelog.md |
| docs-core       | alias → docs-{plan,design,task,report,changelog} |

## 구조

```
src/init/
  targetRegistry.js    # TARGETS 상수, validateTargets, suggestTarget (Dice coefficient)
  scaffoldManifest.js  # DIRECTORIES(targets[]), FILES(initTarget), TARGET_ALIASES
  buildInitPlan.js     # targets 필터링 + alias 확장 + neededDirs 계산
src/shared/
  remediationMap.js    # initTarget 값 → targetRegistry TARGETS 키와 일치
src/cli/
  index.js             # --target (collect 반복) / --targets (쉼표)
  commands/init.js     # collectTargets, validateTargets, suggestTarget 사용
```

## selective apply 흐름

```
--target hooks-json --target skills-core
  → collectTargets() → ['hooks-json', 'skills-core']
  → validateTargets() → { valid, unknown }
  → unknown 있으면 hint + 목록 출력, valid만 계속
  → buildInitPlan(root, { targets: valid })
      → expandAliases (docs-core → docs-*)
      → FILES.filter(f => targets.includes(f.initTarget))
      → computeNeededDirs (파일의 상위 dir만 포함)
      → plan 반환
  → applyInitPlan → 실행
```

## unknown target 처리
- Dice coefficient (bigram) ≥ 0.4 → `did you mean: <best>?` 힌트
- valid target이 0개면 exitCode=1 조기 종료
- valid target 있으면 경고 후 계속 실행

## remediationMap ↔ targetRegistry 정합성
- `config.claude-md`: initTarget=null (CLAUDE.md는 scaffold 대상 아님)
- 나머지 모두 VALID_TARGETS에 존재 → 검증 스크립트 통과
