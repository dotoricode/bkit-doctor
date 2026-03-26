# Phase 04-3: Selective Apply & Remediation — Report

## Status
done

## 구현 내용

### 신규 파일
- `src/init/targetRegistry.js` — TARGETS 상수, validateTargets, suggestTarget (Dice coefficient)

### 변경 파일
- `src/init/scaffoldManifest.js` — DIRECTORIES에 targets[] 추가, TARGET_ALIASES, 명칭 통일
- `src/shared/remediationMap.js` — initTarget 명칭 동기화 (CLAUDE.md → null)
- `src/init/buildInitPlan.js` — targets 필터링 + alias 확장 + neededDirs 계산
- `src/cli/commands/init.js` — collectTargets / validateTargets / hint 출력 / 요약 개선
- `src/cli/index.js` — --target (collect) / --targets (쉼표) 등록

## 검증
- 단일 target 선택: hooks-json → .claude + hooks.json만 ✓
- 개별 docs target: docs-report → docs + report.md만 ✓
- 복수 targets + dry-run: 필요한 항목만 계획 ✓
- alias 확장: docs-core → docs-* 5개 ✓
- unknown target: Dice hint + 전체 목록 출력 ✓
- remediationMap 정합성: 전수 검증 통과 ✓

## 설계 결정
- Dice coefficient (bigram): 단순 prefix보다 오타 감지 정확도 높음
- CLAUDE.md initTarget=null: scaffold 생성 대상 아님을 명시적으로 표현
- neededDirs 동적 계산: 선택 파일의 상위 dir만 plan에 포함

## 다음 단계
Phase 5-1: check 결과 기반 추천 흐름
- check missing 항목 → initTarget 추출 → recommended targets 표시
- "check → recommend → init --target <...>" 준자동 흐름 준비
