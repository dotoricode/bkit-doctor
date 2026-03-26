# Phase 05-6: Recommendation Snapshot — Task

## Status
done

## Tasks

- [x] recommendationSnapshotModel.js 작성 (타입, SNAPSHOT_VERSION, makeSnapshot)
- [x] buildRecommendationFingerprint.js 작성 (파일 존재 여부 기반 fingerprint)
- [x] saveRecommendationSnapshot.js 작성 (silent on error)
- [x] loadRecommendationSnapshot.js 작성 (null on failure)
- [x] validateRecommendationSnapshot.js 작성 (version/projectRoot/fingerprint 검증, 슬래시 정규화)
- [x] check.js 갱신 (format 후 snapshot 저장)
- [x] init.js 갱신 (snapshot 재사용 / fresh computation)
- [x] index.js 갱신 (--fresh 옵션)
- [x] 시나리오 A: check → snapshot 저장 ✓
- [x] 시나리오 B: snapshot 없음 → fresh computation ✓
- [x] 시나리오 C: snapshot 유효 → 재사용 "[recommended] using recent recommendation snapshot" ✓
- [x] 시나리오 D: fingerprint 불일치 → "[recommended] snapshot invalid (fingerprint mismatch), recomputing..." ✓
- [x] 시나리오 E: corrupt JSON → null 반환 → fresh computation ✓
- [x] 시나리오 F: --fresh → "[recommended] --fresh: ignoring snapshot, recomputing..." ✓

## 검증 결과

| 시나리오 | 출력 (앞부분) |
|----------|--------------|
| A (check) | 포맷 후 snapshot 파일 생성 |
| B (no snapshot) | "[recommended] 8 targets: ..." (fresh) |
| C (valid snapshot) | "[recommended] using recent recommendation snapshot" |
| D (fingerprint mismatch) | "[recommended] snapshot invalid (fingerprint mismatch), recomputing..." |
| E (corrupt JSON) | null → fresh computation (no error) |
| F (--fresh) | "[recommended] --fresh: ignoring snapshot, recomputing..." |
