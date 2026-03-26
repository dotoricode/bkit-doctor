# Phase 04-2: init Safety / Preview / Backup — Report

## Status
done

## 구현 내용

### 신규 파일
- `src/init/initPlanModel.js` — PlanItem 타입 정의, makeItem 헬퍼
- `src/init/buildInitPlan.js` — 계획 계산 (FS 읽기만, 쓰기 없음)
- `src/init/applyInitPlan.js` — 계획 실행 (dry-run / backup / overwrite 지원)
- `src/backup/createBackupSession.js` — timestamp 기반 백업 세션
- `src/backup/copyToBackup.js` — 파일 복사 유틸
- `src/backup/backupManifest.js` — manifest.json 기록

### 변경 파일
- `src/cli/commands/init.js` — plan/apply 구조로 전면 교체, 출력 개선
- `src/cli/index.js` — --dry-run, --overwrite, --backup, --backup-dir 옵션 등록

## 검증
- dry-run: 계획만 출력, 파일 시스템 무변경 ✓
- 기본 재실행: 25 skipped, 기존 파일 보존 ✓
- --overwrite --backup: 25 overwritten, manifest.json 정상 생성 ✓

## 설계 결정
- overwrite 정책 A안 채택: 기본 skip, --overwrite 플래그로만 활성화
- buildInitPlan / applyInitPlan 분리 → dry-run이 no-op으로 자연스럽게 구현
- PlanItem에 initTarget 유지 → Phase 4-3 check 연계 기반 확보

## 다음 단계
Phase 4-3: overwrite 제한 해제 / selective apply / remediation 연결
- check 결과 기반 선택적 init
- initTarget → plan 자동 매핑
- 특정 대상만 지정 apply
