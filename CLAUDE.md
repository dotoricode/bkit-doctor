# bkit-doctor — Project Rules

> 전역 `~/.claude/CLAUDE.md` 상속. 이 파일이 전역보다 우선.

---

## Project
- **이름**: bkit-doctor
- **목적**: Claude Code 기반 bkit 운영 환경 진단 CLI
- **경로**: macOS `~/01_private/bkit-doctor` / Windows `D:\00_work\bkit-doctor`
- **운영 단위**: phase

---

## 핵심 운영 원칙

| 원칙 | 내용 |
|------|------|
| 설계 먼저 | Plan/Design 없으면 implementer 투입 불가 |
| 문서 필수 | phase마다 Plan/Design/Task/Report 필요 |
| 변경 이유 | 모든 구현 변경에 Why 기록 |
| 작업 불중단 | 막히면 우회 전략 선택 후 계속 |
| 팀 모드 | planner-orchestrator → implementer → reviewer 흐름 |

---

## 출력 규칙

- 응답 짧고 핵심만
- 실시간 상태: 4줄 고정 (Phase / Done / In Progress / Next)
- 에이전트 현황: 1줄 요약
- 실행 명령어 출력 제외 (요청 시만)

---

## 금지 (절대 위반 불가)

- 자동 배포
- 코드/내용 외부 유출
- `docs/03-task/{phase}.task.md` 없이 `src/` 구현 시작
- `phase-check` 없이 `docs/04-report/{phase}.report.md` 작성
- Plan 미승인 상태에서 Design 작성

## Phase 문서 체크리스트

phase가 진행될 때 아래 순서를 반드시 따른다:

| 단계 | 문서 | skill |
|------|------|-------|
| 1 | `docs/01-plan/{phase}.plan.md` | `phase-plan` |
| 2 | `docs/02-design/{phase}.design.md` | `phase-design` |
| 3 | `docs/03-task/{phase}.task.md` | `phase-do` 시작 시 생성 |
| 4 | `docs/04-report/{phase}.report.md` | `phase-report` |

> 훅이 `[PDCA REQUIRED]`를 출력하면 즉시 해당 문서를 생성한다.

---

## Phase 문서 경로

```
docs/
├── 01-plan/     phase-{nn}-{name}.plan.md      ← 활성 phase
├── 02-design/   phase-{nn}-{name}.design.md    ← 활성 phase
├── 03-task/     phase-{nn}-{name}.task.md      ← 활성 phase
├── 04-report/   phase-{nn}-{name}.report.md    ← 활성 phase
├── release/     vX.Y.Z/pdca-summary.md         ← Git 추적, 최대 3버전
└── archive/     vX.Y.Z/{01-plan,02-design,...} ← gitignore, 로컬 보존
output/
└── pdca/        {slug}-pdca-guide.md           ← bkit-doctor pdca 명령 출력물
CHANGELOG.md
```

### 릴리즈 시 워크플로우

1. 활성 phase 문서(`01-plan`~`04-report`) → `docs/archive/vX.Y.Z/`로 이동
2. `docs/release/vX.Y.Z/pdca-summary.md` 생성
3. `docs/release/` 4개 이상이면 가장 오래된 버전 디렉터리 삭제
4. `docs/release/` 커밋 (archive는 gitignore이므로 로컬 전용)

---

## Agent 역할

| Agent | 투입 시점 |
|-------|---------|
| planner-orchestrator | 항상 (모든 작업 진입점) |
| implementer | Design 승인 후 |
| phase-reviewer | implementer 완료 후 |
| report-summarizer | reviewer 승인 후 |

---

## Skills

| Skill | 사용 시점 |
|-------|---------|
| phase-bootstrap | 새 phase 시작 (문서 뼈대 생성) |
| phase-plan | Plan 문서 작성 |
| phase-design | Design 문서 작성 |
| phase-do | 구현 진행 |
| phase-check | 검증 수행 |
| phase-report | Report 작성 + changelog |
| work-summary | 언제든 현황 스냅샷 |

---

## 현재 상태

- Current Version: `v1.1.0` (in progress)
- Active Phase: `phase-08-1-pdca-command`, `phase-09-pdca-followup`
- Released: `v1.0.0` → `docs/release/v1.0.0/`
