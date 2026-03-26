# Phase 05-5: Grouped Recommendation — Report

## Status
done

## 구현 내용

### 신규 파일
- `src/check/recommendations/groupingRegistry.js`
  - GROUPS: parent/children/minChildren/label/description
  - 초기 group: docs-core (minChildren=2)

- `src/check/recommendations/groupRecommendations.js`
  - 순수 함수: `Recommendation[] → { finalRecommendations[], groupedFrom }`
  - VALID_TARGETS 검증으로 invalid parent 안전 처리
  - TARGET_PRIORITY 기준 재정렬

### 변경 파일
- `src/check/formatters/defaultFormatter.js`
  - groupRecommendations 적용
  - grouped target: "(covers: docs-plan, docs-design, ...)" 힌트 출력
  - finalRecommendations 기준 count/render/flow 생성

- `src/check/recommendations/computeRecommendations.js`
  - groupRecommendations 적용
  - grouped recommendations 반환 → init --recommended에서 docs-core 사용

## 검증

```
# 빈 프로젝트 check 출력
  8개 추천 target (14개 문제 기반)

  • claude-root — create the .claude/ root directory for bkit environment
  • hooks-json — ...
  • ...
  • docs-core — create all docs/ scaffolds (plan, design, task, report, changelog)
    (covers: docs-plan, docs-design, docs-task, docs-report, docs-changelog)

# init --recommended
[recommended] 8 targets: claude-root, hooks-json, ..., docs-core
```

## 설계 결정
- groupingRegistry 분리: target 정의(targetRegistry)와 grouping 정책 분리
- minChildren=2: 단일 child target은 과도하게 그룹화하지 않음
- parent 검증(VALID_TARGETS): 존재하지 않는 parent target은 최종 추천에 포함 불가
- "(covers: ...)" 힌트: 사용자가 무엇이 묶였는지 파악 가능

## 다음 단계
Phase 5-6: recommendation snapshot / cached flow
- check 결과 재사용
- repeated computation 최소화
- check → init 추천 흐름 성능/일관성 개선
