# Task: phase-01-cli-foundation

**Date:** 2026-03-26
**Design Ref:** `docs/02-design/phase-01-cli-foundation.design.md`

---

## Tasks

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | `package.json` 생성 | done | commander 의존성 포함 |
| 2 | `src/utils/platform.js` 생성 | done | OS 감지, path 유틸 |
| 3 | `src/cli/commands/version.js` 생성 | done | |
| 4 | `src/cli/commands/doctor.js` 생성 (stub) | done | |
| 5 | `src/cli/commands/init.js` 생성 (stub) | done | |
| 6 | `src/cli/index.js` 생성 | done | 진입점, 명령 등록 |
| 7 | `--version` 동작 확인 | done | |
| 8 | `doctor` stub 동작 확인 | done | |

## Verification Points
- [ ] `node src/cli/index.js --version` 출력
- [ ] `node src/cli/index.js --help` 명령 목록 출력
- [ ] `node src/cli/index.js doctor` stub 메시지 출력
- [ ] `node src/cli/index.js init` stub 메시지 출력
- [ ] `src/` 구조가 design 문서와 일치
