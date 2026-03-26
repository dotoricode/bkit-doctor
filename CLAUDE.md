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

## 금지

- 자동 배포
- 코드/내용 외부 유출
- 문서 없는 구현
- Check 없는 Report

---

## Phase 문서 경로

```
docs/
├── 00-pm/       {feature}.prd.md
├── 01-plan/     phase-{nn}-{name}.plan.md
├── 02-design/   phase-{nn}-{name}.design.md
├── 03-task/     phase-{nn}-{name}.task.md
└── 04-report/   phase-{nn}-{name}.report.md
CHANGELOG.md
```

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

- Active Phase: `phase-01-foundation` (pending, 시작 대기)
- 다음 행동: `phase-bootstrap`으로 Phase 1 문서 뼈대 생성
