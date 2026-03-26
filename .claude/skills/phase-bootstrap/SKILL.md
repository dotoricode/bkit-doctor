---
name: phase-bootstrap
description: 새 phase 시작 시 필요한 문서 뼈대를 생성하고 state 파일을 갱신한다.
triggers:
  - phase bootstrap
  - new phase
  - bootstrap {phase-name}
---

# Phase Bootstrap

## Purpose
새 phase를 시작할 때 필요한 문서 뼈대를 한 번에 생성하고, state 파일을 최신 상태로 갱신한다.

## When to Use
- 새 phase를 시작하려고 할 때
- phase-index에 새 phase를 추가했을 때
- 문서가 없어서 implementer를 투입하지 못할 때

## Expected Input
- phase 번호와 이름 (예: `02`, `cli-skeleton`)
- phase 목적 한 줄 요약

## Procedure
1. `docs/` 하위에 phase 문서 4개 생성:
   - `docs/01-plan/phase-{nn}-{name}.plan.md` ← plan-template 기반
   - `docs/02-design/phase-{nn}-{name}.design.md` ← design-template 기반
   - `docs/03-task/phase-{nn}-{name}.task.md` ← task-template 기반
   - `docs/04-report/phase-{nn}-{name}.report.md` ← report-template 기반
2. `.claude/context/phase-index.md` — 해당 phase를 `in-progress`로 변경
3. `.claude/state/active-phase.md` — 새 phase로 업데이트
4. `.claude/state/workstream-status.md` — 상태 갱신
5. `.claude/context/current-status.md` — Next Action 업데이트

## Output Format
```
Bootstrapped: phase-{nn}-{name}
Files created: 4
State updated: active-phase, workstream-status, current-status
Next: Plan 문서 작성 (phase-plan skill 실행)
```

## Caveats
- `docs/` 디렉터리가 없으면 먼저 생성
- 이미 존재하는 파일은 덮어쓰지 않음 (충돌 시 경고)
- 내용은 빈 껍데기가 아닌 템플릿 채운 초안으로 작성
