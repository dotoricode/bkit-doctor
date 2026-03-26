# Phase 04-2: init Safety / Preview / Backup — Design

## Status
done

## 구조

```
src/
├── cli/commands/init.js        # --dry-run / --overwrite / --backup / --backup-dir 옵션 추가
├── cli/index.js                # commander 옵션 등록
├── init/
│   ├── initPlanModel.js        # PlanItem 타입 정의 + makeItem 헬퍼
│   ├── buildInitPlan.js        # 계획 계산 (파일 시스템 읽기만, 쓰기 없음)
│   └── applyInitPlan.js        # 계획 실행 (dry-run 지원)
└── backup/
    ├── createBackupSession.js  # timestamp 기반 세션 디렉터리 생성
    ├── copyToBackup.js         # 단일 파일 복사 (디렉터리 구조 유지)
    └── backupManifest.js       # manifest.json 기록
```

## init 실행 흐름

```
initCommand(options)
  → buildInitPlan(root, { overwrite })    # 계획 계산 (순수 함수)
  → applyInitPlan(root, plan, { dryRun, backup, backupDir })
      ├── dryRun=true  → 실행 없음, 계획 항목만 반환
      ├── backup=true + overwrite 대상 있음 → createBackupSession + copyToBackup
      └── 실제 write (create / overwrite)
  → 결과 요약 출력
```

## PlanItem action 값

| action           | 설명 |
|------------------|------|
| mkdir            | 디렉터리 생성 예정 |
| mkdir-skip       | 디렉터리 이미 존재 |
| create           | 파일 생성 예정 |
| skip             | 파일 이미 존재, 건너뜀 |
| overwrite        | --overwrite 플래그 있음, 덮어쓰기 예정 |

## overwrite 정책 (A안 적용)
- 기본: overwrite 없음 → 기존 파일 skip
- --overwrite: overwrite action 활성화
- --backup과 함께 사용 시 overwrite 전 백업 수행

## backup 구조
- `.bkit-doctor/backups/<timestamp>/`
- timestamp: ISO 8601, `:` → `-`
- manifest.json: { timestamp, createdAt, files[] }
- --backup-dir로 사용자 지정 가능

## remediationMap 연결
- PlanItem에 initTarget 필드 유지 → Phase 4-3 자동 연계 기반
