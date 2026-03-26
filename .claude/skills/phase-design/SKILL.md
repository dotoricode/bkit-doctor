---
name: phase-design
description: 구현 전 변경 구조·영향 범위·대안 비교·선택 이유를 정리한 Design 문서를 작성한다.
triggers:
  - phase design
  - write design
  - design {phase-name}
---

# Phase Design

## Purpose
"어떻게 만들 것인가"를 코드 작성 전에 결정한다. implementer는 이 문서를 기준으로만 구현한다.

## When to Use
- Plan 승인 직후
- 구현 방향이 불분명할 때

## Expected Input
- 승인된 Plan 문서 경로
- 구현하려는 항목들

## Procedure
1. `docs/02-design/phase-{nn}-{name}.design.md` 열기
2. Plan의 완료 조건 항목을 기준으로 아래 섹션 채우기:
   - **Background**: 왜 이 설계가 필요한가
   - **Changed Structure**: 변경되는 파일·모듈·데이터 흐름
   - **Impact Scope**: 영향받는 기존 코드 범위
   - **Alternatives**: 검토한 대안 2가지 이상 + 비교표
   - **Decision**: 선택한 방향 + 이유 (Why 필수)
   - **Verification**: 구현 후 어떻게 확인할 것인가
3. planner-orchestrator / phase-reviewer에게 검토 요청
4. 승인 후 → phase-do로 이동

## Output Format
```
Design written: docs/02-design/phase-{nn}-{name}.design.md
Structure changes: {수}
Alternatives considered: {수}
Status: draft | approved
Next: phase-do skill 실행 (implementer 투입)
```

## Caveats
- 대안 없이 단일 안만 제시하지 말 것
- "왜 이걸 선택했는가"는 반드시 기록
- Design 미승인 상태에서 implementer 투입 금지
