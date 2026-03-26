# Conventions — bkit-doctor

## Phase Document Naming
```
docs/01-plan/      phase-{nn}-{name}.plan.md
docs/02-design/    phase-{nn}-{name}.design.md
docs/03-task/      phase-{nn}-{name}.task.md
docs/04-report/    phase-{nn}-{name}.report.md
docs/00-pm/        {feature}.prd.md
```
예시: `docs/01-plan/phase-01-foundation.plan.md`

## Source File Naming
- 모듈 파일: `kebab-case.js` (예: `check-structure.js`)
- 클래스: `PascalCase`
- 함수/변수: `camelCase`
- 상수: `UPPER_SNAKE_CASE`

## Changelog Format
```
## [vX.Y.Z] - YYYY-MM-DD
### Added / Changed / Fixed / Deferred
```
- 버전은 semver: `v0.1.0` 시작
- 변경 이유를 한 줄로 병기

## Document Writing Rules
- 문서 상단에 날짜 + phase 명기
- 변경 이유(`Why`) 항목 필수
- 빈 섹션은 `<!-- TODO -->`로 명시 (삭제 금지)

## Commit Message
```
type(scope): short description

feat / fix / docs / refactor / test / chore
```
예시: `feat(cli): add bkit-doctor check command`
