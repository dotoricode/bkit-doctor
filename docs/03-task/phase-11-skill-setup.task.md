# Phase 11 — skill & setup Task

## 구현 체크리스트

### T-1. 템플릿 모듈
- [x] `src/skill/skillTemplate.js` — SKILL.md 템플릿 (RULE 1/2/3 포함)
- [x] `src/skill/claudeTemplate.js` — CLAUDE.md 템플릿 (options 파라미터 제거)

### T-2. skill 커맨드
- [x] `src/cli/commands/skill.js` 구현
  - [x] SKILL.md 생성 로직
  - [x] `--append-claude`: CLAUDE.md 존재 확인 → 미존재 시 에러
  - [x] `--append-claude`: 중복 내용 skip
  - [x] `--append-claude`: separator + 스킬 규칙 append
- [x] `src/cli/index.js` — skill 커맨드 등록

### T-3. setup 커맨드
- [x] `src/cli/commands/setup.js` 구현
  - [x] 1단계: check + fix
  - [x] 2단계: CLAUDE.md 생성 (미존재) / 선택적 재생성 (존재)
  - [x] 백업 파일명: `CLAUDE_{날짜}_backup.md`
  - [x] 비-TTY에서 기본값 N (기존 파일 보존)
  - [x] 3단계: SKILL.md 생성
  - [x] 4단계: package.json 스크립트 추가 (addedKeys 배열로 추적)
  - [x] formatLabel import 제거
- [x] `src/cli/index.js` — setup 커맨드 등록

### T-4. clear 커맨드
- [x] `src/cli/commands/clear.js` 구현 — 설정 파일 인터랙티브 삭제
- [x] `src/cli/index.js` — clear 커맨드 등록

### T-5. npm 스크립트
- [x] `package.json` — `bkit:check`, `bkit:fix`, `bkit:setup` 추가

### T-6. 산출물
- [x] `SKILL.md` — skill 명령 예시 파일 (프로젝트 루트)

### T-7. 테스트
- [x] `tests/skill.test.js` — 비-TTY CLAUDE.md 보존 테스트 개선

### T-8. 기타
- [x] `src/cli/index.js` — 실행 권한 추가 (chmod +x)
- [x] `CLAUDE.md` — Git 설정 섹션 추가 (user.name, Co-Authored-By 금지)

## 커밋 이력

| 커밋 | 내용 |
|------|------|
| `e30c653` | feat(cli): skill 명령어 + setup 위저드 추가 |
| `3ba747c` | feat(setup): CLAUDE.md 생성 단계 추가 + 기존 파일 백업 지원 |
| `7b1a3e3` | refactor(setup): CLAUDE.md 백업 파일명 변경 (`CLAUDE_{날짜}_backup.md`) |
| `050c849` | feat(skill): SKILL.md 생성 시 CLAUDE.md에 자동 참조 추가 |
| `dbf2acb` | feat(cli): clear 명령어 추가 — 설정 파일 인터랙티브 삭제 |
| `5ed6766` | chore(cli): index.js 실행 권한 추가 |
| `a8f86ec` | chore(package): bkit 단축 npm 스크립트 추가 |
| `cf4a517` | docs(skill): SKILL.md 자동화 스킬 문서 추가 |
| `6de8674` | docs(project): CLAUDE.md Git 설정 섹션 추가 |
| `346f439` | fix(setup): 스크립트 추적 로직 개선 및 미사용 import 제거 |
| `2416513` | fix(skill): CLAUDE.md 파일 미존재 시 안전 처리 추가 |
| `2944369` | refactor(skill): claudeTemplate 미사용 options 파라미터 제거 |
| `68d8093` | test(skill): 비-TTY 환경에서 CLAUDE.md 보존 동작 테스트 개선 |
