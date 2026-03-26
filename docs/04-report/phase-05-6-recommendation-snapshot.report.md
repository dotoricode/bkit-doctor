# Phase 05-6: Recommendation Snapshot — Report

## Status
done

## 구현 내용

### 신규 파일
- `recommendationSnapshotModel.js` — SNAPSHOT_VERSION='1', SNAPSHOT_REL_PATH, makeSnapshot()
- `buildRecommendationFingerprint.js` — scaffoldManifest FILES+DIRS+extras의 존재여부(0/1) → 정렬 후 '|' 연결
- `saveRecommendationSnapshot.js` — buildRecommendations+groupRecommendations+fingerprint → snapshot 파일 저장 (silent on error)
- `loadRecommendationSnapshot.js` — JSON 로드 (실패 시 null)
- `validateRecommendationSnapshot.js` — version/projectRoot(슬래시 정규화)/fingerprint 검증

### 변경 파일
- `check.js` — format() 이후 saveRecommendationSnapshot() 호출
- `init.js` — --recommended 브랜치에 snapshot 재사용 로직 추가; `--fresh` 플래그 처리
- `index.js` — `--fresh` 옵션 등록

## 검증

```
# check → snapshot 저장
.bkit-doctor/cache/recommendation-snapshot.json 생성

# init --recommended (valid snapshot)
[recommended] using recent recommendation snapshot
[recommended] 8 targets: claude-root, hooks-json, ...

# fingerprint 불일치
[recommended] snapshot invalid (fingerprint mismatch), recomputing...

# corrupt JSON
null 반환 → fresh computation

# --fresh
[recommended] --fresh: ignoring snapshot, recomputing...
```

## 설계 결정
- fingerprint = 파일 존재여부(0/1) — 경량, 결정적, 파일 생성/삭제 감지
- projectRoot 비교: 슬래시 정규화 (Git Bash의 /tmp↔Windows path 차이 해결)
- saveRecommendationSnapshot: silent on error — check 흐름 보호
- snapshot 없으면 no-op — fresh computation fallback

## 다음 단계
Phase 6-1: autofix / apply preset
- 특정 추천 세트의 빠른 적용
- preset 수준의 구조 보완
- recommendation 기반 더 짧은 실행 흐름
