---
name: phase-report
description: phase 종료 보고서를 작성하고, changelog를 갱신하며, 다음 phase로 연결한다.
triggers:
  - phase report
  - write report
  - report {phase-name}
  - phase complete
---

# Phase Report

## Purpose
phase를 공식 종료하고, 완료 내용·남은 리스크·다음 phase 연결을 기록한다.

## When to Use
- phase-check에서 `approved` 결정 후
- phase를 공식 완료 처리할 때

## Expected Input
- phase-check 결과 (pass/warn 목록)
- 구현 완료 확인된 Task 목록

## Procedure
1. `docs/04-report/phase-{nn}-{name}.report.md` 작성:
   - **Completed Work**: 완료된 항목 목록
   - **In-Progress Issues**: 미완료 또는 warn 항목
   - **Verification Result**: check 결과 요약
   - **Remaining Risks**: 다음 phase로 이관되는 리스크
   - **Next Action**: 다음 phase 이름과 시작 조건
2. `CHANGELOG.md` 갱신 (changelog-template 기준)
3. state 파일 갱신:
   - `workstream-status.md`: 현재 phase → `done`
   - `active-phase.md`: 다음 phase 또는 `standby`
   - `current-status.md`: Last Change / Next Action 갱신
4. phase-index 상태 `done`으로 변경

## Output Format
```
Report written: docs/04-report/phase-{nn}-{name}.report.md
Changelog: updated
Phase {nn} status: done
Next phase: phase-{nn+1}-{name} | standby
```

## Caveats
- Check 없이 Report 금지
- Remaining Risks를 "없음"으로 비우지 말 것 (솔직하게 기록)
- Changelog는 Added/Changed/Fixed/Deferred 형식 유지
