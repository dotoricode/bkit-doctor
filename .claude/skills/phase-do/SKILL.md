---
name: phase-do
description: 승인된 Design 기준으로 implementer를 투입하여 구현을 진행한다.
triggers:
  - phase do
  - implement
  - start coding
  - do {phase-name}
---

# Phase Do

## Purpose
승인된 Design 범위 내에서 실제 구현을 진행한다.

## When to Use
- Design 승인 직후
- Task 목록이 준비됐을 때

## Expected Input
- 승인된 Design 문서 경로
- `docs/03-task/phase-{nn}-{name}.task.md` (Task 목록)

## Procedure
1. Task 파일의 항목을 순서대로 확인
2. implementer에게 Design + Task 전달
3. 각 Task 완료 시:
   - Task 파일 상태 갱신 (`pending` → `done`)
   - 변경 파일 목록 기록
4. 범위 외 사항 발견 시 → 즉시 중단, planner-orchestrator 보고
5. 전체 Task 완료 → phase-check로 이동

## Output Format
```
In progress: phase-do / {phase-name}
Task: {n}/{total} completed
Changed files: {목록}
Blocker: none | {내용}
Next: phase-check skill 실행
```

## Caveats
- Task 목록 없이 시작 금지
- 범위 외 항목 독자 추가 금지
- 구현 중 설계 변경 필요 시 → phase-design 재실행 (구현 중단 후 설계 수정)
