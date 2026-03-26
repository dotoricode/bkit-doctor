# Documentation Policy — bkit-doctor

## Required Documents Per Phase
| Document | When Required | Template |
|----------|--------------|---------|
| Plan | phase 시작 전 | plan-template.md |
| Design | 구현 시작 전 | design-template.md |
| Task | implementer 투입 전 | task-template.md |
| Report | phase 종료 시 | report-template.md |
| Changelog | Report 작성 시 | changelog-template.md |
| PRD | 새 기능 그룹 / 주요 범위 변경 시 | prd-template.md |

## Mandatory Fields
- 모든 문서: **Date**, **Status**
- Design: **Decision + Why** (생략 금지)
- Report: **Remaining Risks** ("없음" 금지)
- Changelog: **Added/Changed/Fixed/Deferred** 구분

## Traceability Rule
- 모든 구현 변경은 연결된 Design 문서가 있어야 한다.
- 문서 없는 코드 변경 발견 시 → 즉시 소급하여 Why 기록.

## Document Path Rule
```
docs/00-pm/       {feature}.prd.md
docs/01-plan/     phase-{nn}-{name}.plan.md
docs/02-design/   phase-{nn}-{name}.design.md
docs/03-task/     phase-{nn}-{name}.task.md
docs/04-report/   phase-{nn}-{name}.report.md
CHANGELOG.md      (프로젝트 루트)
```
