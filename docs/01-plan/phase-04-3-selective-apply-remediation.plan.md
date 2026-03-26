# Phase 04-3: Selective Apply & Remediation — Plan

## Status
done

## 목표
init에 target 기반 selective apply를 추가한다.
check remediationMap과 init scaffold manifest의 target 명칭을 통일한다.
잘못된 target 입력을 명확히 처리한다.

## 범위
- `targetRegistry.js` 신규 — target 상수/검증/hint 정의
- `scaffoldManifest.js` 갱신 — target 명칭 통일 (`required-*` → `*-core`, docs 개별 target)
- `remediationMap.js` 갱신 — initTarget 명칭 동기화
- `buildInitPlan.js` 갱신 — targets 필터링 + alias 확장
- `init.js` 갱신 — `--target` / `--targets` 처리, unknown target validation
- `cli/index.js` 갱신 — 옵션 등록

## 선행조건
- Phase 4-2 완료 (buildInitPlan / applyInitPlan 분리)

## 완료조건
- `--target hooks-json`으로 특정 파일만 생성 가능
- `--targets hooks-json,skills-core`로 복수 target 선택 가능
- `docs-core`처럼 alias target이 개별 target으로 확장됨
- remediationMap의 initTarget이 targetRegistry 값과 100% 일치
- 잘못된 target 입력 시 `did you mean: ...?` 힌트와 전체 목록 출력

## 리스크
- 낮음 — 기존 non-destructive 정책 유지, 새 옵션은 opt-in
