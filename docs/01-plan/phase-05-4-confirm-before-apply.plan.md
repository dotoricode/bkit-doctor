# Phase 05-4: Confirm Before Apply — Plan

## Objective

init 실행 흐름에 사용자 확인(confirm) 단계를 추가한다.
실제 파일 변경 전에 계획 요약을 보여주고, 사용자 승인 후에만 apply가 진행된다.

## Scope

- `confirmApply.js` — confirm prompt helper (readline 기반)
- `--yes / -y` CLI 옵션 추가
- `init.js` 흐름 재구성: plan → detail → dry-run? → no-op? → yes? → confirm → apply

## Out of Scope

- interactive 선택 UI (항목별 y/n)
- overwrite 확장 (Phase 5-5+)
- grouped recommendation (Phase 5-5)

## Key Decisions

- confirm 기본값 = No (안전 우선)
- dry-run → confirm 없이 preview만 종료
- no-op → confirm 없이 정상 종료
- non-TTY stdin → "use --yes" 안내 후 취소 (safe exit)
- --yes / -y → confirm 생략, 즉시 apply
