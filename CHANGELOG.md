# Changelog

All notable changes to **bkit-doctor** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow a phase-based progression rather than strict SemVer.

---

## [Unreleased]

---

## [0.7.0] — cli-refactor-load — 2026-03-27

Phase 07-3: CLI를 init/fix/save/load 4개 명령 중심으로 정리하고 `load` 커맨드 구현.

### Added

- **`load` command** — 저장된 bkit-doctor 설정을 현재 프로젝트에 적용
  - `load --local` — 로컬 설정 확인 및 재적용
  - `load --global` — 글로벌 설정을 현재 프로젝트 local에 적용
  - `load --file <path>` — 지정 파일 설정을 현재 프로젝트 local에 적용
  - 적용 대상: `.bkit-doctor/settings.local.json` (OS/shell/secrets 제외)
  - 소스 없음 / 설정 없음 / 파일 없음 → 명확한 에러 메시지
- **`src/config/loadConfig.js`** — 설정 파일 로드 + 스키마 검증 헬퍼
- **`tests/load.test.js`** — 단위 + CLI 통합 테스트 (11 cases)

### Changed

- **`save` command** — 성공 메시지 명확화
  - 기존: `settings updated` + 경로 + 모드 분리 출력
  - 변경: `Saved local bkit-doctor settings (recommended mode)` 형식
- **`load` command** 등록 (`src/cli/index.js`)
- **`verify-release.js`** — Phase 7-3 체크 8개 추가 (total: 38)
  - `load local config`, `load global config`, `load file config`
  - `load missing guard`, `load no config guard`, `save-load roundtrip`
  - `init compatibility`, `fix compatibility`

### Design decisions

- `load`는 항상 `.bkit-doctor/settings.local.json`에 기록 (적용 범위 단일화)
- `preset` 서브커맨드는 내부 유틸로 유지 (4개 primary 명령에서 분리)
- save/load 스키마: `{ defaultMode, presetName? }` 그대로 유지

---

## [0.6.4] — save-command — 2026-03-27

Phase 06-5: 기본 동작 설정 저장 `save` 커맨드 추가.

### Added

- **`save` command** — 기본 동작 선호를 local / global / both 범위로 저장
  - `save --local --recommended` — 이 프로젝트에서 추천 기반 흐름을 기본값으로 저장
  - `save --global --preset <name>` — 전역 기본 preset 저장
  - `save --both --preset <name>` — local + global 둘 다 저장
  - `--local --global` 동시 사용 금지 (→ `--both` 사용 권장)
  - `--recommended --preset` 동시 사용 금지 (상호 배타)
  - 존재하지 않는 preset은 명확한 에러 메시지로 거부
- **`src/config/configPaths.js`** — local/global 설정 파일 경로 상수
  - `BKIT_DOCTOR_GLOBAL_CONFIG_DIR` 환경 변수로 global 경로 재지정 가능 (테스트 용)
- **`src/config/saveConfig.js`** — 설정 파일 읽기/쓰기 (saveConfig / readConfig)
- **`tests/save.test.js`** — 단위 + CLI 통합 테스트 (26 cases)
- **`verify-release.js`** — Phase 6-5 체크 6종 추가

### Changed

- `src/cli/index.js` — `save` top-level 커맨드 등록
- `package.json` — version 0.6.4; `test:save` script 추가

### Config 스키마

```json
{ "defaultMode": "recommended" }
{ "defaultMode": "preset", "presetName": "default" }
```

저장 위치:
- local: `.bkit-doctor/settings.local.json`
- global: `~/.bkit-doctor/settings.global.json`

---

## [0.6.3] — preset-scoring — 2026-03-27

Phase 06-4: preset recommend에 scoring / ranking / match label 추가.

### Added

- **score 기반 ranking** — 각 추천 항목에 score(0~100) 및 match label 포함
  - match label: `high match` (80+) / `medium match` (50~79) / `low match` (0~49)
  - score 내림차순 정렬, 상위 3개 반환
- **`src/preset/presetScoring.js`** — computePresetScores / getMatchLabel / clampScore
  - lean / workflow-core / docs / default 각각 규칙 기반 score 계산
  - 동일 입력 → 동일 출력 (deterministic)
- **`tests/preset-recommend.test.js`** — Phase 6-4 테스트 18 케이스 추가 (총 46 케이스)
- **`verify-release.js`** — Phase 6-4 체크 4종 추가 (scoring output / order / label / regression)

### Changed

- `src/preset/presetRecommend.js` — `recommendPresets()` 반환형에 `score` / `label` 필드 추가
- `src/cli/commands/preset.js` — `preset recommend` 출력에 score + match label 표시
- `package.json` — version 0.6.3

---

## [0.6.2] — preset-recommend — 2026-03-27

Phase 06-3: preset recommend 기능 + 선택 가이드(guidance) UX.

### Added

- **`preset recommend`** — 현재 프로젝트 상태 기반 rule-based preset 추천
  - snapshot 재사용 또는 recompute (resolveFixTargets 재사용)
  - 최대 3개 추천 (reason + targets + apply hint 포함)
  - 항상 guidance 출력 (`fix` vs `init --preset`)
  - `--fresh` 옵션 지원
  - 절대 자동 적용하지 않음
- **`workflow-core` preset** — 워크플로우 구조 번들 (agents + skills + templates + policies)
- **`src/preset/presetRecommend.js`** — classifyTargets + recommendPresets (rule-based)
- **`tests/preset-recommend.test.js`** — 단위 + CLI 통합 테스트 (28 cases)
- **`verify-release.js`** — Phase 6-3 체크 3종 추가

### Changed

- `src/init/presetRegistry.js` — `workflow-core` preset 추가
- `src/cli/commands/preset.js` — `presetRecommendCommand` 추가
- `src/cli/index.js` — `preset recommend` 서브커맨드 등록
- `package.json` — version 0.6.2; `test:preset-recommend` script 추가

---

## [0.6.1] — preset-discovery — 2026-03-27

Phase 06-2: preset 탐색 기능 (list / show) + preset metadata 구조 개선.

### Added

- **`preset list`** — 사용 가능한 preset 목록 표시 (name + description)
- **`preset show <name>`** — 특정 preset 상세 정보 표시 (name / description / targets / apply hint)
  - 존재하지 않는 preset: non-zero exit + 에러 메시지 + 가능 목록 안내
- **`getPreset(name)`** — name 포함 전체 메타데이터 반환 (presetRegistry 신규 API)
- **`src/cli/commands/preset.js`** — presetListCommand / presetShowCommand
- **`tests/preset-command.test.js`** — CLI 통합 + getPreset 단위 테스트 (23 cases)
- **`verify-release.js`** — Phase 6-2 체크 4종 추가 (preset list / show default / show unknown / compatibility)

### Changed

- `src/init/presetRegistry.js` — `getPreset(name)` 추가 (`resolvePreset` backward compat 유지)
- `src/cli/index.js` — `preset` 커맨드 그룹 등록 (list / show 서브커맨드)
- `package.json` — version 0.6.1; `test:preset-command` script 추가

---

## [0.6.0] — fix-and-preset — 2026-03-27

Phase 06-1: fix command + init --preset support.

### Added

- **`fix` command** — recommendation-based apply shortcut
  - Snapshot reuse → invalid fallback → recompute flow
  - Options: `--dry-run`, `--yes` / `-y`, `--fresh`
  - `--fresh` forces recompute from current project state
  - Safety: overwrite blocked, confirm required without `--yes`
- **`init --preset <name>`** — predefined target bundle apply
  - Preset registry: `default`, `lean`, `docs`
  - Unknown preset: clear error + available presets list
  - Conflict rules: `--preset + --recommended` and `--preset + --target/--targets` → exit 1
- **`src/init/presetRegistry.js`** — preset definitions and validation
- **`src/fix/resolveFixTargets.js`** — snapshot/recompute orchestration for fix
- **Test suite** — Node.js built-in `node:test` (27 tests, 0 failures)
  - `tests/preset.test.js` (17 cases)
  - `tests/fix.test.js` (10 cases)

### Changed

- `src/cli/index.js` — register `fix` command; add `--preset` option to `init`
- `src/cli/commands/init.js` — add preset resolution block and input mode conflict checks
- `package.json` — version 0.6.0; add `test`, `test:preset`, `test:fix` scripts

---

## [0.5.8] — release-verification-script — 2026-03-27

Added automated release readiness verification script.

### Added

- `scripts/verify-release.js` — 8-check release verification script (Node.js, cross-platform)
  - Hard checks: version, check healthy, init dry-run CREATE=0, recommended dry-run healthy,
    changelog alignment, docs path consistency, project files
  - Soft check: snapshot flow (check → init --recommended reuse)
  - `--verbose` / `-v` flag for per-check CLI output excerpts
  - exit code 0 = all pass, 1 = any hard fail
- `package.json` `scripts.verify-release` — `node scripts/verify-release.js`

### Changed

- `package.json` version `0.5.6` → `0.5.7` (aligned with CHANGELOG [0.5.7] entry)
- README version badges `0.5.6` → `0.5.7` (5 language files)

### Usage

```bash
npm run verify-release
# or
node scripts/verify-release.js --verbose
```

---

## [0.5.7] — release-alignment-before-main-merge — 2026-03-27

Resolved check/init structural mismatch and aligned version metadata before main merge.

### Fixed

- `init` now creates `docs/01-plan/`, `docs/02-design/`, `docs/03-task/`, `docs/04-report/` directories
  — matching exactly what `check` expects (was incorrectly creating flat `.md` files)
- `init --dry-run` on a healthy project now shows zero `[CREATE]` operations (was showing 5)
- `docs-changelog` target now creates `CHANGELOG.md` at project root (was `docs/changelog.md`)

### Changed

- `src/init/scaffoldManifest.js` — replaced 4 docs flat-file entries with 4 directory entries;
  changelog path changed to root `CHANGELOG.md`
- `src/init/buildInitPlan.js` — directory filter extended to include dirs whose `targets[]`
  intersects with the selected target set (enables directory-only targets without files)
- `src/init/targetRegistry.js` — updated descriptions for all `docs-*` targets
- `src/shared/remediationMap.js` — updated `fixHint` for all docs checkers
- `package.json` — version `0.1.0` → `0.5.6` (aligned with README/CHANGELOG)

### Verified

| Command | Result |
|---------|--------|
| `check` | HEALTHY — PASS 14 |
| `init --dry-run` | files created: 0, skipped: 21 |
| `init --recommended --dry-run` | "no recommended targets — project looks healthy" |
| `version` | `bkit-doctor v0.5.6 [windows]` |

---

## [0.5.6] — recommendation-snapshot-and-cached-flow — 2026-03-27

`bkit-doctor check` now saves a recommendation snapshot to
`.bkit-doctor/cache/recommendation-snapshot.json`.
`init --recommended` reuses the snapshot when the project state matches,
skipping a redundant check run.

### Added

- `src/check/recommendations/recommendationSnapshotModel.js` — `RecommendationSnapshot` type, `SNAPSHOT_VERSION`, `SNAPSHOT_REL_PATH`, `makeSnapshot()`
- `src/check/recommendations/buildRecommendationFingerprint.js` — deterministic fingerprint from file existence map (scaffoldManifest paths + extras)
- `src/check/recommendations/saveRecommendationSnapshot.js` — computes and writes snapshot after check; silent on failure
- `src/check/recommendations/loadRecommendationSnapshot.js` — reads snapshot JSON; returns `null` on missing/corrupt
- `src/check/recommendations/validateRecommendationSnapshot.js` — validates version, projectRoot (slash-normalized for Windows), and fingerprint
- `--fresh` option on `init` — ignores snapshot and forces recomputation

### Changed

- `src/cli/commands/check.js` — calls `saveRecommendationSnapshot()` after `format()`
- `src/cli/commands/init.js` — `--recommended` branch tries snapshot first; falls back to `computeRecommendations()` when missing/invalid; handles `--fresh`
- `src/cli/index.js` — registered `--fresh` option on `init`

### Snapshot Validation

| Condition | Behavior |
|-----------|----------|
| Missing | fresh computation |
| Corrupt JSON | fresh computation |
| Version mismatch | fresh computation |
| projectRoot mismatch | fresh computation |
| Fingerprint mismatch | fresh computation + notice |
| All valid | "using recent recommendation snapshot" |

---

## [0.5.5] — grouped-recommendation-and-parent-targets — 2026-03-27

Introduced grouped recommendation: multiple `docs-*` child targets are now consolidated
into `docs-core` when 2 or more are recommended, reducing output length and
improving the suggested `init` command readability.

### Added

- `src/check/recommendations/groupingRegistry.js` — defines `GROUPS` (parent, children, minChildren, label, description); initial entry: `docs-core` with `minChildren: 2`
- `src/check/recommendations/groupRecommendations.js` — pure function `groupRecommendations(recommendations)` that consolidates child targets into parent targets; validates parent against `VALID_TARGETS`; re-sorts by `TARGET_PRIORITY`; returns `{ finalRecommendations, groupedFrom }`

### Changed

- `src/check/formatters/defaultFormatter.js` — applies `groupRecommendations` before rendering; grouped targets show a `(covers: ...)` hint line; count and suggested flow use `finalRecommendations`
- `src/check/recommendations/computeRecommendations.js` — applies `groupRecommendations`; returns grouped recommendations so `init --recommended` receives `docs-core` instead of 5 individual docs targets

### Effect

- Empty project recommendation count: 12 → 8 targets
- `docs-core` expands correctly in `buildInitPlan` via existing `TARGET_ALIASES`

---

## [0.5.4] — confirm-before-apply — 2026-03-27

Added a user confirmation step before any real file changes.
`init` now shows a plan summary and waits for `y/N` before applying.

### Added

- `src/init/confirmApply.js` — readline-based "Continue? (y/N)" prompt with non-TTY guard (requires `--yes` in CI/piped contexts) and SIGINT handling
- `-y, --yes` option on `init` command — skips confirmation and applies immediately

### Changed

- `src/cli/commands/init.js` — restructured execution flow: plan → render detail → dry-run exit → no-op exit → `--yes` → confirm → apply; extracted `printSummary()` helper reused in both dry-run and post-apply paths; plan stats computed from plan items before `applyInitPlan` so dry-run summaries are accurate
- `src/cli/index.js` — registered `-y, --yes` option

### Behavior

| Mode | Confirm |
|------|---------|
| `--dry-run` | no — preview only |
| nothing to apply | no — exits cleanly |
| `--yes` / `-y` | no — applies immediately |
| TTY interactive | yes — "Continue? (y/N)" |
| non-TTY stdin | no — warns "use --yes", cancelled |

---

## [0.5.3] — init-recommended-mvp — 2026-03-27

Introduced `init --recommended`: check results now drive the init flow automatically.
Users no longer need to manually copy targets from the `check` recommendation output.

### Added

- `src/check/recommendations/computeRecommendations.js` — async bridge that runs checks on a project root and returns `{ recommendations, unmappedCount, invalidCount, issueCount }` without any console output
- `--recommended` option on the `init` command — auto-selects targets from current project state

### Changed

- `src/cli/commands/init.js` — converted to `async`; added `--recommended` handling with explicit-target-wins priority policy; summary label distinguishes "recommended targets" from "selected targets"; final status line suffixed with "from recommendations" when applicable
- `src/cli/index.js` — registered `--recommended` option on `init` command

### Behavior

| Mode | Behavior |
|------|----------|
| `init --recommended` | runs checks, applies recommended targets |
| `init --recommended --dry-run` | same but no files written |
| `init --recommended --targets foo` | explicit wins; `--recommended` ignored with notice |
| No issues found | exits gracefully: "project looks healthy" |

---

## [0.5.2] — suggested-init-flow-and-recommended-apply — 2026-03-27

Separated recommendation calculation from command generation.
`SuggestedFlow` is now a model object; the formatter renders it — not string-builds it.

### Added

- `src/check/recommendations/suggestedFlowModel.js` — `SuggestedFlow` typedef and `makeSuggestedFlow()` helper generating both `applyCommand` and `previewCommand`
- `src/check/recommendations/buildSuggestedFlow.js` — `buildSuggestedFlow(recommendations, issueCount)` producing a `SuggestedFlow|null` from sorted recommendations
- `TARGET_PRIORITY` exported from `buildRecommendations.js` for use by formatters and tests

### Changed

- `src/check/recommendations/buildRecommendations.js` — added `TARGET_PRIORITY` constant and priority-based sort; validates targets against `VALID_TARGETS`; returns `invalidCount` alongside `unmappedCount`
- `src/check/formatters/defaultFormatter.js` — integrates `buildSuggestedFlow`; displays `flow.applyCommand` and `flow.previewCommand` as separate "Recommended next step" / "Preview first" lines; shows `invalidCount` when non-zero

---

## [0.5.1] — check-recommendation-flow — 2026-03-27

Introduced recommendation engine: `check` results now suggest which `init` targets to run.

### Added

- `src/check/recommendations/recommendationModel.js` — `Recommendation` typedef and `makeRecommendation()` helper
- `src/check/recommendations/buildRecommendations.js` — filters warn/fail results, dedupes by `initTarget`, validates against `VALID_TARGETS`, returns sorted recommendations

### Changed

- `src/shared/remediationMap.js` — added `label` and `description` fields to all 13 entries
- `src/check/formatters/defaultFormatter.js` — appended recommendation section with recommended next-step command

---

## [0.4.2] — selective-apply-and-remediation — 2026-03-27

Expanded `init` from a full-scaffold tool into a targeted, selective apply system.
Introduced a shared target registry that connects check diagnostics to init actions.

### Added

- `src/init/targetRegistry.js` — 13 named targets with descriptions, `validateTargets()`, and Dice coefficient–based `suggestTarget()` for typo hints
- Unknown target detection with `did you mean: <closest>?` suggestions and full target listing

### Changed

- `src/init/scaffoldManifest.js` — each directory entry now carries a `targets[]` array; file entries use unified target names (`*-core` pattern); `TARGET_ALIASES` introduced for aggregate targets like `docs-core`
- `src/shared/remediationMap.js` — `initTarget` values synchronized with `targetRegistry` keys; `CLAUDE.md` entry set to `null` (not scaffolded)
- `src/init/buildInitPlan.js` — supports `targets` filter option; expands aliases; computes only the directories needed by selected files
- `src/cli/commands/init.js` — `collectTargets()` merges `--target` (repeatable) and `--targets` (comma-separated); validation and hint output added; summary shows selected targets
- `src/cli/index.js` — `--target` registered with collector function; `--targets` registered as comma-separated string

---

## [0.4.1] — init-safety-preview-backup — 2026-03-27

Introduced a plan/apply architecture that separates what will happen from what actually happens.
Added `--dry-run`, `--overwrite`, and `--backup` safety controls.

### Added

- `src/init/initPlanModel.js` — `PlanItem` type definition (`mkdir`, `mkdir-skip`, `create`, `skip`, `overwrite`) and `makeItem` helper
- `src/init/buildInitPlan.js` — computes an init plan by reading the filesystem without writing anything
- `src/init/applyInitPlan.js` — executes a plan; respects `dryRun`, `backup`, and `overwrite` flags
- `src/backup/createBackupSession.js` — creates a timestamped backup session directory under `.bkit-doctor/backups/`
- `src/backup/copyToBackup.js` — copies a single file to the backup session, preserving directory structure
- `src/backup/backupManifest.js` — writes `manifest.json` listing all backed-up files

### Changed

- `src/cli/commands/init.js` — rewritten around `buildInitPlan` / `applyInitPlan`; output shows `[CREATE]`, `[SKIP]`, `[OVERWRITE]` labels
- `src/cli/index.js` — added `--dry-run`, `--overwrite`, `--backup`, `--backup-dir` options

---

## [0.4.0] — init-mvp-scaffold — 2026-03-27

Replaced the `init` command stub with a real implementation. Non-destructive scaffold generation based on a declarative manifest.

### Added

- `src/init/scaffoldManifest.js` — defines 13 directories and 25 files as the standard bkit environment scaffold; each file carries an `initTarget` key for future check integration
- `src/init/fileTemplates.js` — generates minimal but valid content for 9 file types (agent, skill, template, policy, doc, changelog, JSON configs)
- `src/init/generateScaffold.js` — iterates the manifest and delegates to write utilities
- `src/init/writeIfMissing.js` — `ensureDir` and `writeIfMissing` utilities: create if absent, skip if present, never overwrite

### Changed

- `src/cli/commands/init.js` — stub replaced with live scaffold runner; outputs `[CREATE]` / `[SKIP]` per item with a summary

---

## [0.3.2] — check-output-and-init-mapping — 2026-03-27

Standardized checker output and introduced the `remediationMap` that connects check results to future init actions.

### Added

- `src/check/resultModel.js` — `CheckResult` type definition and `normalizeResult` helper for consistent result shapes
- `src/shared/remediationMap.js` — maps each checker ID to an `initTarget` and a human-readable `fixHint`
- `src/check/formatters/defaultFormatter.js` — formats results by category with per-category summary, detailed item list, and totals line

### Changed

- `src/cli/commands/check.js` — delegates all output to `formatter.format()` instead of direct `console.log`
- All 7 checkers — `details` field removed; `missing`, `found`, and `expected` arrays standardized
- `CheckerRunner` — passes `missing`, `found`, `expected` through to caller unchanged

---

## [0.3.1] — check-expansion-set — 2026-03-27

Extended the checker set and standardized the checker invocation API.

### Added

- `src/checkers/shared/fileRules.js` — shared utilities: `findMissingFiles`, `hasAnyFile`, `hasAllFiles`
- `src/checkers/policies.js` — `policies.required` checker validating 4 policy files
- `category` field added to all checker results (automatically extracted from checker ID prefix)

### Changed

- `skills.required` — upgraded from directory presence check to SKILL.md file presence check (6 files)
- `templates.required` — upgraded from directory presence check to 4 specific template file checks
- `changelog.exists` — expanded from single path to 3 candidate paths with fallback logic
- Checker API: `run(targetPath)` → `run(context)` where `context = { projectRoot, platform }`
- `CheckerRunner.run()` — builds context object internally before dispatching to each checker

---

## [0.3.0] — check-core-bootstrap — 2026-03-26

Implemented the full diagnostic check system with categorized checkers and structured output.

### Added

- `src/checkers/` — 6 checker modules: `structure`, `config`, `docs`, `agents`, `skills`, `misc`
- 13 checker rules implemented — each returns `pass`, `warn`, or `fail`
- `src/checkers/index.js` — `DEFAULT_CHECKERS` auto-registration
- `src/cli/commands/check.js` — `[PASS]` / `[WARN]` / `[FAIL]` output format with overall status line (`HEALTHY` / `WARNING` / `FAILED`)
- `src/core/checker.js` — `title` and `details` fields added to checker result shape

### Removed

- `doctor` command removed — consolidated into `check` as the single diagnostic entry point

---

## [0.2.0] — cli-skeleton — 2026-03-26

Introduced the `CheckerRunner` core and the `check` command as the primary CLI surface.

### Added

- `src/core/checker.js` — `CheckerRunner` class with `register()` and `run()` API
- `src/checks/` — placeholder directory for diagnostic modules
- `check` command — same behavior as `doctor`, provided as the canonical entry point
- Output format: `[✓]` / `[!]` / `[✗]` per result with a statistics summary line

### Changed

- `src/cli/commands/doctor.js` — stub replaced with `CheckerRunner`-based diagnostic loop

---

## [0.1.0] — cli-foundation — 2026-03-26

Established the CLI foundation: entry point, command routing, and platform utilities.

### Added

- `src/cli/index.js` — Commander-based CLI entry point
- `version` command — prints version and platform information
- `doctor` command — stub (planned for Phase 3)
- `init` command — stub (planned for Phase 2)
- `src/utils/platform.js` — OS detection and cross-platform path utilities
- Phase 1 PDCA documents: plan, design, task, report

---

## [0.0.1] — env-setup — 2026-03-26

Initial project creation. Established the bkit-style development environment that bkit-doctor itself is built to scaffold.

### Added

- `.claude/` directory with full bkit operating environment:
  - `agents/` — planner-orchestrator, implementer, phase-reviewer, report-summarizer
  - `skills/` — phase-bootstrap, plan, design, do, check, report, work-summary
  - `templates/` — prd, plan, design, task, report, changelog
  - `context/` — project-overview, architecture, conventions, constraints, phase-index
  - `policies/` — global, output, security, documentation
- `docs/` directory structure initialized
- `CLAUDE.md` project rules authored
