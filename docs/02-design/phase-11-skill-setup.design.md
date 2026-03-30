# Phase 11 — skill & setup Design

## 변경 구조

```
src/
├── cli/
│   ├── index.js                    # skill, setup, clear 커맨드 등록
│   └── commands/
│       ├── skill.js                # skill 커맨드 핸들러 (new)
│       ├── setup.js                # setup 위저드 핸들러 (new)
│       └── clear.js                # clear 커맨드 핸들러 (new)
├── skill/
│   ├── skillTemplate.js            # SKILL.md 템플릿 생성 (new)
│   └── claudeTemplate.js           # CLAUDE.md 템플릿 생성 (new)
tests/
└── skill.test.js                   # 통합 테스트 (new/updated)
SKILL.md                            # skill 명령 실행 결과 예시
```

## 모듈 설계

### 1. `src/skill/skillTemplate.js`

```js
buildSkillContent(projectName) → string
```

- SKILL.md 마크다운 반환
- RULE 1 (PROACTIVE DOCUMENTATION): pdca-plan 자동 실행
- RULE 2 (STATE SYNC): pdca-list 상태 확인
- RULE 3 (PIPELINE): pdca-do/check/report 자동 실행
- 사용 가능한 명령어 표 포함

### 2. `src/skill/claudeTemplate.js`

```js
buildClaudeContent(projectName) → string
```

- CLAUDE.md 마크다운 반환
- 프로젝트 규칙, Git 설정, 금지 항목, Phase 체크리스트 포함
- options 파라미터 불필요 → 제거

### 3. `src/cli/commands/skill.js`

**플로우:**
```
skill 실행
  └─ SKILL.md 생성 (output: projectRoot/SKILL.md)
     └─ --append-claude 옵션 시:
          CLAUDE.md 존재 확인
          ├─ 미존재 → 에러 메시지 출력 + return
          ├─ 이미 포함 → "already present — skipped"
          └─ 없음 → separator + 스킬 규칙 append
```

**핵심 결정:** `--append-claude` 시 CLAUDE.md 미존재를 에러로 처리
- 이유: 빈 문자열 fallback은 잘못된 CLAUDE.md를 만들 수 있음

### 4. `src/cli/commands/setup.js`

**플로우:**
```
setup 실행
  ├─ 1단계: check + fix (기존 구조 진단)
  ├─ 2단계: CLAUDE.md 생성/갱신
  │    ├─ 미존재 → buildClaudeContent() 로 생성
  │    └─ 존재 + TTY → (y/N) 프롬프트
  │         ├─ y → CLAUDE_{날짜}_backup.md 백업 후 재생성
  │         └─ N (기본) → "kept existing CLAUDE.md"
  ├─ 3단계: SKILL.md 생성
  └─ 4단계: package.json npm 스크립트 추가
       ├─ bkit:check → bkit-doctor check
       ├─ bkit:fix   → bkit-doctor fix --yes
       └─ bkit:setup → bkit-doctor setup
```

**스크립트 추적 개선:**
```js
// before: 카운터(added)로 추적 → 출력 메시지 부정확
// after: addedKeys 배열로 추적 → 실제 추가된 키만 출력
const addedKeys = [];
for (const [key, val] of Object.entries(scripts)) {
  if (!pkg.scripts[key]) {
    pkg.scripts[key] = val;
    addedKeys.push(key);
  }
}
```

### 5. `src/cli/commands/clear.js`

- 삭제 가능 대상 목록 제시
- 인터랙티브 선택 후 확인
- 비-TTY 환경에서는 안전하게 종료

## 테스트 전략

| 테스트 케이스 | 검증 항목 |
|-------------|---------|
| skill 생성 | SKILL.md 파일 생성, 내용에 RULE 1/2/3 포함 |
| append-claude 정상 | 기존 CLAUDE.md에 스킬 규칙 추가됨 |
| append-claude CLAUDE.md 없음 | 에러 메시지 출력, 파일 미생성 |
| append-claude 중복 | "already present — skipped" |
| setup 비-TTY CLAUDE.md 없음 | CLAUDE.md 자동 생성 |
| setup 비-TTY CLAUDE.md 있음 | 기존 파일 보존, 백업 미생성 |
| package.json 스크립트 추가 | addedKeys 정확히 추적 |

## 영향 범위

- 신규 파일: `src/cli/commands/skill.js`, `src/cli/commands/setup.js`, `src/cli/commands/clear.js`, `src/skill/skillTemplate.js`, `src/skill/claudeTemplate.js`
- 수정 파일: `src/cli/index.js` (커맨드 등록), `tests/skill.test.js`
- 삭제: `formatLabel` import (setup.js에서 미사용)
