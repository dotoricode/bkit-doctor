---
name: work-summary
description: 현재 작업 상태를 4줄 고정 포맷으로 즉시 출력한다. 언제든 호출 가능.
triggers:
  - work summary
  - status
  - summary
  - 현재 상태
  - 지금 어디야
---

# Work Summary

## Purpose
현재 phase 상태를 빠르게 파악한다. 설명 없이 사실만 출력.

## When to Use
- 작업 중 언제든
- 새 세션 시작 시 현황 파악
- 다음 행동을 결정하기 전

## Expected Input
없음. 현재 state 파일과 context 파일을 읽어서 출력.

## Procedure
1. `.claude/state/active-phase.md` 읽기
2. `.claude/state/workstream-status.md` 읽기
3. `.claude/context/current-status.md` 읽기
4. `.claude/state/agent-status.md` 읽기
5. 아래 포맷으로 즉시 출력

## Output Format (고정, 변경 불가)
```
Phase: {active phase명}
Done: {완료 항목}
In Progress: {진행 중 항목}
Next: {다음 행동 1개}
Agent: {주요 active agent와 현재 태스크}
```

## Caveats
- 5줄 초과 금지
- 설명·배경·이유 출력 금지
- 파일 읽기 실패 시 "state 파일 없음 — 확인 필요" 출력
