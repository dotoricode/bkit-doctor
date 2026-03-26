# Changelog — bkit-doctor

## [Unreleased]

### Added
-

---

## [v0.1.0] - 2026-03-26

### Added
- CLI 진입점 `src/cli/index.js` (commander 기반)
- `version` 명령: 버전 + 플랫폼 정보 출력
- `doctor` 명령: stub (Phase 3 구현 예정)
- `init` 명령: stub (Phase 2 구현 예정)
- `src/utils/platform.js`: OS 감지, 크로스플랫폼 경로 유틸
- Phase 1 PDCA 문서 4종 (plan/design/task/report)

---

## [v0.0.1] - 2026-03-26

### Added
- 프로젝트 초기 생성
- `.claude/` bkit 운영 환경 세팅 완료
  - agents: planner-orchestrator, implementer, phase-reviewer, report-summarizer
  - skills: phase-bootstrap, plan, design, do, check, report, work-summary
  - templates: prd, plan, design, task, report, changelog
  - context: project-overview, architecture, conventions, constraints, phase-index
  - policies: global, output, security, documentation
  - state: active-phase, workstream-status, agent-status
- `docs/` 디렉터리 구조 생성
- `CLAUDE.md` 프로젝트 규칙 작성
