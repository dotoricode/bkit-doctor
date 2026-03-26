# Phase 05-4: Confirm Before Apply — Report

## Status
done

## 구현 내용

### 신규 파일
- `src/init/confirmApply.js`
  - readline 기반 "Continue? (y/N)" 프롬프트
  - 기본값 No (y/yes 입력만 승인)
  - non-TTY stdin 감지 → "use --yes" 안내 후 false 반환
  - SIGINT (Ctrl+C) 처리 → false 반환

### 변경 파일
- `src/cli/commands/init.js`
  - 실행 흐름: plan → detail → dry-run? → no-op? → --yes? → confirm → apply
  - `printSummary()` helper 추출 (dry-run/apply 양쪽에서 재사용)
  - plan stats를 plan items에서 직접 계산 (applyInitPlan 이전)
  - `fromRecommended` 플래그로 요약 레이블 구분
- `src/cli/index.js`
  - `-y, --yes` 옵션 등록

## 검증

```
# dry-run
init completed (dry-run)
no files changed

# --yes (즉시 apply)
  directories created : 13
  files created       : 25
init completed

# no-op
nothing to apply — project is already up to date

# non-TTY stdin
stdin is not a TTY — use --yes (-y) to skip confirmation
cancelled

# --recommended --dry-run
[recommended] 5 targets: skills-core, docs-plan, ...
init completed from recommendations (dry-run)
no files changed
```

## 설계 결정
- confirm 기본값 No — "실수로 Enter" 방어
- non-TTY는 apply 불가 → CI/자동화 환경에서 --yes 요구
- plan stats를 applyInitPlan 이전에 plan items에서 직접 계산 → dry-run 시에도 정확한 요약 가능
- confirm summary에서 targets 레이블: fromRecommended면 "recommended", 아니면 "targets"

## 다음 단계
Phase 5-5: grouped recommendation / 상위 target 추천
- docs-core 같은 묶음 추천
- recommendation grouping policy
- check 출력 단순화 및 추천 품질 향상
