# Phase 09 — pdca 후속 작업 리스트

## 출처

Phase 08-1 (pdca command v1) 구현 과정에서 명시적으로 제외한 항목 + PR 후속 작업 + 확장 고려사항을 종합.

---

## 후속 작업 목록

### A. 템플릿 확장

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| A-1 | type별 템플릿 분기 | guideline/feature/bugfix/refactor별 문구·섹션 차별화 | P1 |
| A-2 | 템플릿 외부화 | `src/pdca/templates/` 디렉터리로 분리, 사용자 커스텀 템플릿 지원 | P2 |
| A-3 | 템플릿 i18n | 한국어/영어 등 다국어 템플릿 선택 옵션 (`--lang`) | P3 |

### B. 다단계 PDCA 서브커맨드

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| B-1 | `pdca plan <topic>` | Plan 섹션만 단독 생성/편집 | P2 |
| B-2 | `pdca do <topic>` | Do 섹션 업데이트 (기존 문서에 append) | P2 |
| B-3 | `pdca check <topic>` | Check 섹션 업데이트 + 완료 기준 검증 | P2 |
| B-4 | `pdca report <topic>` | Act 섹션 + 종합 보고서 생성 | P2 |
| B-5 | `pdca status <topic>` | 현재 PDCA 진행 상태 표시 | P3 |

### C. 상태 관리

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| C-1 | PDCA 상태 파일 | `.bkit-doctor/pdca-state.json` — topic별 현재 단계 추적 | P2 |
| C-2 | 상태 전이 규칙 | Plan → Do → Check → Act 순서 강제 또는 경고 | P3 |
| C-3 | 히스토리 | 사이클 반복 이력 관리 (v2, v3 등) | P3 |

### D. 기존 명령어 연동

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| D-1 | check 연동 | `bkit-doctor check`에 pdca 문서 존재 여부 진단 항목 추가 | P1 |
| D-2 | init 연동 | `bkit-doctor init`에서 `docs/00-pdca/` 디렉터리 자동 생성 | P1 |
| D-3 | fix 연동 | pdca 문서 누락 시 fix에서 자동 생성 제안 | P2 |

### E. UX 개선

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| E-1 | interactive mode | 대화형 프롬프트로 topic/type/owner/priority 입력 | P3 |
| E-2 | `--dry-run` | 파일 쓰기 없이 경로와 내용 미리보기 | P1 |
| E-3 | `pdca list` | 생성된 PDCA 문서 목록 표시 | P2 |
| E-4 | 성공 메시지 개선 | 생성 후 다음 단계 안내 메시지 출력 | P3 |

### F. 품질 / 릴리스

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| F-1 | verify-release 추가 | pdca 관련 체크 항목을 verify-release 스크립트에 추가 | P1 |
| F-2 | CHANGELOG 반영 | pdca 기능 추가를 CHANGELOG.md에 기록 | P1 |
| F-3 | 다국어 README 반영 | README.ko.md / README.ja.md 등에 pdca 섹션 추가 | P2 |
| F-4 | version bump 검토 | minor 또는 patch 버전 올릴지 결정 | P1 |

---

## 우선순위 요약

### P1 (즉시)
- A-1: type별 템플릿 분기
- D-1: check 연동
- D-2: init 연동
- E-2: `--dry-run` 옵션
- F-1: verify-release 추가
- F-2: CHANGELOG 반영
- F-4: version bump

### P2 (다음 사이클)
- A-2: 템플릿 외부화
- B-1~B-4: 다단계 서브커맨드
- C-1: 상태 파일
- D-3: fix 연동
- E-3: pdca list
- F-3: 다국어 README

### P3 (백로그)
- A-3: 템플릿 i18n
- B-5: pdca status
- C-2: 상태 전이 규칙
- C-3: 히스토리
- E-1: interactive mode
- E-4: 성공 메시지 개선
