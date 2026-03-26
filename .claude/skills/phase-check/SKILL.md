---
name: phase-check
description: 구현 결과를 Plan/Design 완료 조건 기준으로 검증하고 pass/warn/fail을 판정한다.
triggers:
  - phase check
  - verify
  - check {phase-name}
  - gap analysis
---

# Phase Check

## Purpose
"설계한 대로 만들어졌는가"를 기준으로 구현 결과를 검증한다.

## When to Use
- phase-do 완료 직후
- 구현이 끝났다고 판단했을 때

## Expected Input
- 승인된 Plan/Design 문서
- implementer가 정리한 변경 파일 목록

## Procedure
1. Plan의 **Completion Criteria** 항목 목록 추출
2. 각 항목에 대해 실제 구현 상태 확인:
   - **pass**: 기준 충족
   - **warn**: 기준 충족이나 주의 필요
   - **fail**: 기준 미충족
3. Design의 **Verification** 섹션 기준도 함께 점검
4. 결과 요약 → phase-reviewer에게 전달
5. pass/warn만 있으면 → phase-report 이동
6. fail 있으면 → 보완 항목 특정 후 implementer 재투입

## Output Format
```
Checked: {총 항목 수}
Pass: {수}
Warn: {수} — {항목}
Fail: {수} — {항목}
Decision: approved | revise({항목}) | escalate
Next: phase-report | phase-do (재작업)
```

## Caveats
- fail 항목은 반드시 구체적으로 명시 (모호한 "미완성" 금지)
- warn은 다음 phase 이슈로 이관 가능 (단, 기록 필수)
- 검증 없이 Report 작성 금지
