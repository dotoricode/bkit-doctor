# Phase 04-2: init Safety / Preview / Backup — Plan

## Status
done

## 목표
init 명령에 preview / dry-run / backup 안전성 레이어를 추가한다.
"non-destructive MVP"에서 "예측 가능하고 복구 가능한 초기화 도구"로 확장.

## 범위
- init plan 모델 도입 (buildInitPlan / applyInitPlan 분리)
- `--dry-run`: 파일 변경 없이 계획만 출력
- `--backup`: overwrite 전 백업 수행 (.bkit-doctor/backups/<timestamp>/)
- `--overwrite`: 기존 파일 덮어쓰기 허용 (기본 차단)
- backup manifest.json 자동 기록
- commander 옵션 등록

## 선행조건
- Phase 4-1 완료 (scaffoldManifest, fileTemplates, writeIfMissing)

## 완료조건
- `--dry-run` 실행 시 실제 변경 없이 계획만 출력
- 기본 init은 계속 non-destructive (skip)
- `--overwrite --backup` 실행 시 백업 + 덮어쓰기
- manifest.json에 백업된 파일 목록 기록
- Phase 4-3으로 자연스럽게 확장 가능

## 리스크
- 낮음 — dry-run은 파일 시스템 무접촉, backup은 복사 전용
