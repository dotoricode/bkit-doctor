# bkit-doctor v1.0.0 — PDCA Summary

**Released:** 2026-03-30
**Scope:** phase-01 ~ phase-07 + phase-r1 (전체 개발 이력 요약)
**Archive:** `docs/archive/v1.0.0/`

---

## Overview

| 항목 | 내용 |
|------|------|
| 프로젝트 | bkit-doctor — Claude Code 환경 진단 CLI |
| 버전 | v1.0.0 (first stable release) |
| 총 Phase | 23개 (01~07 + r1) |
| 테스트 | 167 cases, all pass |
| 주요 명령 | `check` / `init` / `fix` / `save` / `load` / `preset` |

---

## Phase 요약

### Phase 01 — CLI Foundation
- CLI 진입점 및 프로젝트 뼈대 구성
- `src/cli/index.js`, `bin/bkit-doctor` 셋업
- Commander.js 기반 커맨드 라우팅

### Phase 02 — CLI Skeleton
- `check` 커맨드 기본 구현
- `.claude/` 디렉터리 및 `CLAUDE.md` 존재 여부 검사
- JSON / 텍스트 출력 포맷 분기

### Phase 03 — Doctor MVP
- **03-init**: `init` 커맨드 기본 — `.claude/` 및 `CLAUDE.md` 스캐폴드 생성
- **03-1**: Context 리팩터 — CheckerContext 도입, 체커 인터페이스 정리
- **03-2**: Checker 확장 — hooks, settings, agents 항목 추가
- **03-3**: Output/Init 매핑 — check 결과와 init 템플릿 연동

### Phase 04 — Init 고도화
- **04-1**: Init MVP Scaffold — preset 기반 파일 생성, dry-run 지원
- **04-2**: Safety / Preview / Backup — 기존 파일 덮어쓰기 방지, `--force`, `--backup`
- **04-3**: Selective Apply & Remediation — 항목별 선택 적용, fix 흐름 연동

### Phase 05 — Recommendation Flow
- **05-1**: Check → Recommendation 흐름 — check 결과에서 init 제안 자동 생성
- **05-2**: Suggested Init Flow — `check --suggest` 플래그로 init 명령 제안
- **05-3**: init `--recommended` MVP — 추천 기반 한 번에 적용 흐름
- **05-4**: Confirm Before Apply — 적용 전 yes/no 확인 프롬프트
- **05-5**: Grouped Recommendation — 항목을 카테고리별로 그룹화 출력
- **05-6**: Recommendation Snapshot — 추천 결과 JSON 스냅샷 저장
- **05-10**: Release Alignment — main 머지 전 최종 정렬 및 버전 동기화

### Phase 06 — Preset System
- **06-1**: fix command + `init --preset` — `fix` 커맨드 기본 구현, preset 적용
- **06-2**: Preset Discovery — `preset list` / `preset show` 로 사용 가능 preset 탐색
- **06-3**: Preset Recommend — 프로젝트 분석 기반 preset 자동 추천
- **06-4**: Preset Scoring — 프로젝트 특성 점수화, 최적 preset 선택 로직
- **06-5**: Save Command — `save` 커맨드 — local/global 설정 저장

### Phase 07 — CLI Refactor
- **07-3**: CLI Refactor + Load Command
  - `load` 커맨드 — local/global/file 소스에서 설정 불러오기
  - 4개 primary 명령(init/fix/save/load) 체계 확립
  - `src/config/loadConfig.js` — 스키마 검증 포함 설정 로더
  - `verify-release.js` — 총 38개 릴리즈 검증 체크

### Phase R1 — Release Verification Script
- `scripts/verify-release.js` — 8개 hard check + 1 soft check
- `npm run verify-release` → exit code 0/1 (CI 연동 가능)
- v0.5.7 버전 정렬 및 다국어 README 배지 동기화

---

## 최종 아키텍처 (v1.0.0)

```
src/
├── cli/
│   ├── index.js              # Commander 진입점, 5개 커맨드 등록
│   └── commands/
│       ├── check.js           # 환경 진단 + exit code
│       ├── init.js            # 스캐폴드 생성 (preset, dry-run, backup)
│       ├── fix.js             # 자동 교정
│       ├── save.js            # 설정 저장 (local/global/both)
│       └── load.js            # 설정 적용 (local/global/file)
├── checkers/                  # 개별 체커 모듈
├── config/
│   ├── configPaths.js         # 설정 경로 상수
│   ├── saveConfig.js          # 읽기/쓰기
│   └── loadConfig.js          # 스키마 검증 포함 로더
├── init/
│   └── fileTemplates.js       # preset별 템플릿
└── presets/                   # preset 정의 (default, lean, …)

scripts/
└── verify-release.js          # 릴리즈 검증 (38 checks)

tests/                         # 167 test cases
```

---

## 핵심 설계 결정

| 결정 | 이유 |
|------|------|
| `load`는 항상 local에 기록 | 적용 범위 단일화, 예측 가능한 동작 |
| CheckerRunner 분리 | unit test 가능성, severity 필터링 |
| preset 내부 유지 | 4개 primary 명령(init/fix/save/load) 명확화 |
| exit code on hard fail | CI/CD 연동 (`check`가 pipeline guard 역할) |
| dry-run 기본 지원 | 안전한 미리보기, 실수 방지 |
| `--backup` 옵션 | 기존 파일 덮어쓰기 시 `.bak` 보존 |

---

## v1.0.0 이후 Backlog

- custom preset CRUD
- config merge strategy 고도화
- multi-profile support
- cloud sync
- interactive wizard
- AI 기반 추천
- GitHub Actions 공식 통합
- `pdca` command (phase-08 진행 중)
