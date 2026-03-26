# Phase 05-5: Grouped Recommendation and Parent Targets — Plan

## Objective

개별 child target 추천을 상위 parent target으로 묶어 더 짧고 의미 있는 추천을 제공한다.
check 출력의 target 수를 줄이고, suggested command를 더 읽기 쉽게 만든다.

## Scope

- `groupingRegistry.js` — parent/child grouping 정책 정의
- `groupRecommendations.js` — 순수 grouping 함수 (raw → final)
- `defaultFormatter.js` — grouped recommendation 렌더링
- `computeRecommendations.js` — grouped recommendation 반환

## Out of Scope

- snapshot / cached check results (Phase 5-6)
- 사용자 입력 기반 group 선택 UI
- `docs-core` 외 추가 group (필요 시 groupingRegistry에 추가)

## Key Decisions

- grouping은 별도 파일(`groupingRegistry.js`)로 분리 — target 정의와 정책 분리
- `groupRecommendations` 순수 함수 — formatter/computeRecommendations 양쪽 재사용
- parent target 존재 여부(VALID_TARGETS) 검증 후 grouping → 안전 fallback 보장
- minChildren = 2: child 1개면 개별 target 유지
- formatter: grouped target에 "(covers: ...)" 힌트 출력
