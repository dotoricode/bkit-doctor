# Phase 10 — P3 백로그 (설계 전 대기)

> 별도 설계 없이는 구현하지 않음 (로드맵 원칙 #3)

## P3-1. i18n (템플릿 다국어)

- `--lang en|ko|ja` 옵션
- `src/pdca/templates/` 하위에 언어별 디렉터리
- README 다국어화와는 별개 (생성 템플릿 내용의 언어 전환)

## P3-2. status

- `pdca-state.json`의 status 필드 확장
- draft → in-progress → review → done → archived
- `bkit-doctor pdca-status <topic>` 명령

## P3-3. 상태 전이

- status 변경에 규칙 부여 (draft → done 직접 전이 금지 등)
- workflow engine 복잡도 경고 → 반드시 별도 설계 후 도입

## P3-4. 히스토리

- 문서 생성/수정/stage 변경 이벤트 기록
- `pdca-state.json`에 `history[]` 배열 추가
- git history와 역할 중복 가능 → 차별화 포인트 정의 필요

## P3-5. interactive mode

- 질문/응답 방식으로 topic/type/owner/priority 입력
- `--interactive` 또는 `-i` 플래그
- 현재 경량 CLI 철학과 충돌 → 별도 플래그로만 검토
- 테스트 복잡도 증가 (stdin mock 필요)

## 선행 조건

모든 P3 항목은 다음이 완료된 후 착수:
- P1/P2 전체 완료 ✅
- 각 항목별 Design 문서 작성 후 승인
