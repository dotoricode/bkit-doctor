# Plan: phase-01-cli-foundation

**Date:** 2026-03-26
**Status:** approved
**PRD Ref:** N/A

---

## 1. Phase Goal
`bkit-doctor` CLI를 실행 가능한 최소 skeleton으로 만든다 — 명령 파싱, 진입점, 기본 명령 1개 동작.

## 2. Work Scope
- 프로젝트 초기화 (`package.json`, 디렉터리 구조)
- CLI 진입점 (`src/cli/index.js`)
- 기본 명령 skeleton: `version`, `doctor`, `init`
- 크로스플랫폼 고려 (`path.join`, `os.homedir`)
- 향후 plugin wrapper 확장을 위한 구조 여백 확보

## 3. Preconditions
- phase-00 (environment-setup) 완료 ✓
- Node.js 설치 환경 (18+)

## 4. Completion Criteria
- [ ] `node src/cli/index.js --version` 출력 동작
- [ ] `node src/cli/index.js doctor` 실행 시 stub 메시지 출력
- [ ] `src/` 디렉터리 구조 설계대로 존재
- [ ] plan / design / task / report / changelog 문서 존재

## 5. Expected Risks
| Risk | Mitigation |
|------|-----------|
| commander 버전 차이 (CJS vs ESM) | package.json에 `"type": "commonjs"` 명시 |
| Windows에서 shebang 미인식 | npm bin 방식으로 대응, 직접 node 호출 fallback |

## 6. Next Document
Design: `docs/02-design/phase-01-cli-foundation.design.md`
