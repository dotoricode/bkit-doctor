# Phase 11 — skill & setup 명령어

## 목표

`bkit-doctor skill` 과 `bkit-doctor setup` 명령어를 추가하여 Claude Code 프로젝트 자동화 스킬(SKILL.md)과 프로젝트 규칙 파일(CLAUDE.md)을 한 번에 생성·관리한다.
`bkit-doctor clear` 명령어로 설정 파일을 안전하게 삭제할 수 있다.

## 제품 원칙

1. 단일 명령어로 SKILL.md / CLAUDE.md 즉시 생성
2. TTY/비-TTY 환경 모두 안전하게 동작 (isExplicitYes 가드)
3. 기존 파일 덮어쓰기 없이 백업 우선
4. setup 과 skill 은 독립 실행 + 조합 실행 모두 지원

## 범위

### 포함

- `skill` 커맨드 — SKILL.md 생성 (`src/cli/commands/skill.js`)
  - `--append-claude` 옵션: 기존 CLAUDE.md에 스킬 규칙 자동 추가
  - CLAUDE.md 미존재 시 안전 처리 (에러 메시지 + 종료)
- `setup` 커맨드 — 인터랙티브 프로젝트 설정 위저드 (`src/cli/commands/setup.js`)
  - CLAUDE.md 생성 (미존재 시 자동 생성, 존재 시 백업 후 선택적 재생성)
  - 백업 파일명: `CLAUDE_{날짜}_backup.md`
  - `package.json` npm 단축 스크립트 자동 추가 (`bkit:check`, `bkit:fix`, `bkit:setup`)
- `clear` 커맨드 — 설정 파일 인터랙티브 삭제 (`src/cli/commands/clear.js`)
- `src/skill/claudeTemplate.js` — CLAUDE.md 템플릿 생성
- `src/skill/skillTemplate.js` — SKILL.md 템플릿 생성
- 테스트 (`tests/skill.test.js`)

### 제외

- GUI / 브라우저 기반 UI
- bkit 플러그인 자동 설치

## 선행 조건

- Phase 08-1 (pdca command) 완료 ✅

## 완료 조건

1. `bkit-doctor skill` 실행 시 `SKILL.md` 생성
2. `bkit-doctor skill --append-claude` 실행 시 기존 `CLAUDE.md`에 스킬 규칙 추가
3. `bkit-doctor setup` 실행 시 `CLAUDE.md` 생성 + `package.json` 스크립트 추가
4. 기존 `CLAUDE.md` 존재 시 백업 후 선택적 재생성 (비-TTY는 자동 skip)
5. `bkit-doctor clear` 실행 시 선택한 설정 파일 삭제
6. 테스트 전체 통과

## 리스크

| 리스크 | 대응 |
|--------|------|
| 비-TTY 환경에서 프롬프트 응답 없음 | isExplicitYes 가드로 기본값 N 처리 |
| CLAUDE.md 덮어쓰기로 기존 규칙 손실 | 날짜 스탬프 백업 파일 자동 생성 |
| package.json 스크립트 키 중복 | 존재 여부 확인 후 skip |
