# Phase 05-4: Confirm Before Apply — Task

## Status
done

## Tasks

- [x] confirmApply.js 작성 (readline, non-TTY guard, SIGINT)
- [x] CLI에 -y, --yes 옵션 등록
- [x] init.js 흐름 재구성 (dry-run → no-op → yes → confirm → apply)
- [x] 시나리오 A: apply 대상 있음 + TTY → confirm prompt (interactive)
- [x] 시나리오 B: non-TTY stdin + no --yes → blocked + "use --yes" 안내 + cancelled ✓
- [x] 시나리오 C: --dry-run → confirm 없이 preview 출력 + "no files changed" ✓
- [x] 시나리오 D: --yes → confirm 없이 즉시 apply ✓
- [x] 시나리오 E: --recommended → 추천 target 계산 후 dry-run으로 confirm 없이 종료 ✓
- [x] 시나리오 F: no-op (전부 skip) → confirm 없이 "nothing to apply" ✓

## 검증 결과

| 시나리오 | 입력 | 결과 |
|----------|------|------|
| C (dry-run) | `--dry-run` | preview + "no files changed" |
| D (--yes) | `--yes` | 즉시 apply, 25 files created |
| F (no-op) | 이미 생성된 dir에 재실행 | "nothing to apply" |
| B (non-TTY) | pipe stdin | "stdin is not a TTY — use --yes" + "cancelled" |
| E (recommended dry-run) | `--recommended --dry-run` | 추천 target 요약 + "no files changed" |
