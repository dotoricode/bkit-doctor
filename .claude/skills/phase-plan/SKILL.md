---
name: phase-plan
description: 현재 phase의 목표·범위·선행조건·완료조건·리스크를 정의하여 Plan 문서를 작성한다.
triggers:
  - phase plan
  - write plan
  - plan {phase-name}
  - define scope
---

# Phase Plan

## Purpose
구현 시작 전 "무엇을 할 것인가, 무엇을 하지 않을 것인가"를 명확히 정의한다.

## When to Use
- phase-bootstrap 직후
- 새 phase의 첫 번째 작업으로

## Expected Input
- phase 이름과 번호
- 이번 phase에서 하고 싶은 것 (자연어 설명)
- 의존하는 선행 phase 이름

## Procedure
1. `docs/01-plan/phase-{nn}-{name}.plan.md` 열기 (bootstrap으로 생성된 초안)
2. 아래 섹션을 채운다:
   - **Phase Goal**: 한 문장으로 목표
   - **Work Scope**: 이번 phase에서 하는 일 목록
   - **Preconditions**: 시작 전 필요한 것
   - **Completion Criteria**: 완료 판단 기준 (측정 가능하게)
   - **Expected Risks**: 예상 리스크 + 대응 방향
   - **Next**: 연결될 Design 문서 경로
3. planner-orchestrator에게 검토 요청
4. 승인 후 → phase-design으로 이동

## Output Format
```
Plan written: docs/01-plan/phase-{nn}-{name}.plan.md
Key scope items: {수}
Completion criteria: {수}
Status: draft | approved
Next: phase-design skill 실행
```

## Caveats
- Completion Criteria는 반드시 측정 가능하게 작성 (모호한 기준 금지)
- 범위는 이번 phase만 — 다음 phase 내용은 Out of Scope로 명시
- Plan 미승인 상태에서 Design 작성 금지
