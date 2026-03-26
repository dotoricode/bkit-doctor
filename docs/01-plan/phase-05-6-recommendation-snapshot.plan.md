# Phase 05-6: Recommendation Snapshot and Cached Flow — Plan

## Objective

check 실행 후 recommendation snapshot을 저장하고, init --recommended에서 재사용한다.
같은 프로젝트 상태에 대한 recommendation 계산을 반복하지 않는다.

## Scope

- `recommendationSnapshotModel.js` — snapshot 타입 + factory
- `buildRecommendationFingerprint.js` — 프로젝트 상태 fingerprint
- `saveRecommendationSnapshot.js` — check 후 snapshot 저장
- `loadRecommendationSnapshot.js` — snapshot 파일 로드
- `validateRecommendationSnapshot.js` — version / projectRoot / fingerprint 검증
- `check.js` 갱신 — 포맷 후 snapshot 저장
- `init.js` 갱신 — snapshot 재사용 또는 fresh computation
- `--fresh` 옵션 추가

## Snapshot 저장 위치
`.bkit-doctor/cache/recommendation-snapshot.json`

## Key Decisions

- 저장 실패는 silent — check 흐름을 깨지 않음
- fingerprint: 각 key path 존재 여부(0/1) 정렬 후 `|` 연결 — 결정적, 경량
- projectRoot 비교: 슬래시 정규화 (Windows 호환)
- `--fresh`: snapshot 무시, 무조건 재계산
- invalid/missing/corrupt snapshot → 모두 재계산 fallback
- snapshot이 없어도 no-op에 영향 없음
