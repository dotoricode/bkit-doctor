# Phase 04-2: init Safety / Preview / Backup — Task

## Status
done

## Tasks

- [x] initPlanModel.js 작성 (PlanItem 타입 + makeItem)
- [x] buildInitPlan.js 작성 (계획 계산 분리)
- [x] applyInitPlan.js 작성 (계획 실행, dry-run 지원)
- [x] createBackupSession.js 작성 (timestamp 기반 세션)
- [x] copyToBackup.js 작성 (파일 복사 유틸)
- [x] backupManifest.js 작성 (manifest.json 기록)
- [x] init.js 업데이트 (plan/apply 구조, 출력 개선)
- [x] cli/index.js 업데이트 (--dry-run, --overwrite, --backup, --backup-dir 등록)
- [x] 시나리오 A: 빈 프로젝트 dry-run → no files changed ✓
- [x] 시나리오 B: 재실행 → 전부 skip ✓
- [x] 시나리오 C: --overwrite --backup → 25 overwritten + manifest.json ✓

## 검증 결과

| 시나리오 | 결과 |
|----------|------|
| A: dry-run (빈) | dirs 13 / files 25 계획, 실제 변경 없음 |
| B: 재실행 (기존) | files 25 skipped |
| C: --overwrite --backup | files 25 overwritten, backup + manifest.json 생성 |
