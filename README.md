# bkit-doctor

> Diagnose, scaffold, and maintain your Claude Code project structure from the command line.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-0.7.0-orange.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dotoricode/bkit-doctor/pulls)

**English** | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md) | [Español](README.es.md)

---

## What is bkit-doctor?

**bkit-doctor** checks whether your Claude Code project has the right structure — `.claude/` directory, hooks, settings, agent definitions, skill files, templates, policies, and documentation scaffolds — and fixes what's missing automatically.

Think of it as **ESLint for your Claude Code project layout**: it runs 14 diagnostic checks, reports pass/warn/fail for each item, and can scaffold everything that's missing in one command.

```bash
npx bkit-doctor check          # diagnose your project
npx bkit-doctor fix --yes      # auto-fix everything
```

---

## Who is this for?

- **Any Claude Code user** — verify that your project has the structure Claude Code expects (`.claude/`, `CLAUDE.md`, hooks, settings)
- **Teams adopting structured AI workflows** — scaffold agents, skills, templates, policies, and PDCA documentation in seconds
- **CI pipelines** — `bkit-doctor check` exits with code 1 on critical failures, so you can gate deployments on project health
- **bkit users** — if you follow the [bkit](https://github.com/anthropics/bkit) PDCA workflow, bkit-doctor validates and bootstraps the full environment

---

## What problem does it solve?

Setting up a Claude Code project properly means creating the right directories, config files, agent definitions, skill files, and documentation scaffolds. Doing this by hand is tedious and error-prone. Forgetting a single file can break hooks, disable skills, or leave AI assistants without context.

**bkit-doctor** automates this:

- **Diagnose** — instantly see what is present, what is missing, and what needs attention
- **Recommend** — automatically suggest which targets to initialize based on current state
- **Fix** — scaffold the correct structure in one command, without overwriting anything you already have
- **Preview** — see exactly what will change before anything is written to disk (`--dry-run`)
- **Verify** — run in CI to ensure project structure stays healthy over time

---

## What is bkit?

[bkit](https://github.com/anthropics/bkit) is a PDCA-based development workflow framework for Claude Code. It provides structured phases (Plan, Design, Do, Check, Report), agent teams, and quality gates for AI-native development.

**bkit-doctor works with or without bkit:**

| Capability | Without bkit | With bkit |
|------------|:---:|:---:|
| `check` — project structure diagnosis | Yes | Yes |
| `init` — scaffold missing files | Yes | Yes |
| `fix` — auto-remediation | Yes | Yes |
| `preset` — workflow-optimized bundles | Partial | Full |
| `save` / `load` — settings persistence | Yes | Yes |

The core commands (`check`, `init`, `fix`) are useful for any Claude Code project. Presets and advanced scaffolding targets are optimized for the bkit PDCA workflow.

---

## Features

| Feature | Description |
|---------|-------------|
| `check` | Diagnose project environment — pass / warn / fail per item |
| `init` | Scaffold missing directories and files non-destructively |
| `fix` | One-command auto-remediation (check + recommend + init) |
| `preset` | Apply predefined bundles (`default`, `lean`, `docs`) |
| `save` / `load` | Persist and share team settings |
| Recommendations | After check, shows which `init` targets to run next |
| Grouped targets | Related targets consolidated (e.g. `docs-core` = all doc dirs) |
| Snapshot cache | `check` caches results; `init --recommended` reuses them |
| `--dry-run` | Preview changes without touching the filesystem |
| `--yes / -y` | Skip confirmation prompt (CI-friendly) |
| `--overwrite` / `--backup` | Safe file replacement with backup |
| Typo hints | `did you mean: docs-report?` when a target name is mistyped |
| Exit codes | Exit 1 on critical failures (CI pipeline integration) |
| Cross-platform | Works on macOS and Windows |

---

## What gets checked (14 items)

| Category | Check | Severity |
|----------|-------|----------|
| structure | `.claude/` directory exists | **hard** (exit 1 if missing) |
| config | `CLAUDE.md` exists | **hard** (exit 1 if missing) |
| config | `.claude/hooks.json` exists | soft |
| config | `.claude/settings.local.json` exists | soft |
| docs | `docs/01-plan/` through `docs/04-report/` (4 checks) | soft |
| agents | 4 required agent definition files | soft |
| skills | 7 required SKILL.md files | soft |
| policies | 4 required policy files | soft |
| templates | 4 required template files | soft |
| context | `.claude/context/` directory | soft |
| changelog | `CHANGELOG.md` (3 candidate paths) | soft |

**Hard checks** cause `check` to exit with code 1. **Soft checks** produce warnings but exit 0.

---

## Relationship with bkit

> **bkit-doctor is an independent project.** It is not an official bkit plugin and has no affiliation with the bkit team.

bkit-doctor was inspired by [bkit](https://github.com/anthropics/bkit) — a PDCA-based AI-native development workflow. The author learned structured AI collaboration through bkit's materials, and that knowledge shaped this tool's design.

bkit-doctor does **not** include bkit code, does **not** require bkit to function, and is **not** endorsed or maintained by the bkit team. It is designed to be useful alongside bkit-style workflows.

---

## Acknowledgements

Special thanks to the **bkit project** for the workflow philosophy that inspired this tool. The clarity of Plan, Design, Do, Check — and the idea that AI collaboration works best with structured context — directly influenced how bkit-doctor was designed.

---

## Installation

### Requirements

- Node.js >= 18.0.0
- npm

### Install globally

```bash
npm install -g bkit-doctor
```

### Run from source

```bash
git clone https://github.com/wpfhak/bkit-doctor.git
cd bkit-doctor
npm install
npm link
```

---

## Usage

```bash
bkit-doctor <command> [options]
```

### Quick start

```bash
# Diagnose your Claude Code project structure
bkit-doctor check

# Auto-fix everything that's missing
bkit-doctor fix --yes

# Or step by step: preview first, then apply
bkit-doctor init --recommended --dry-run
bkit-doctor init --recommended --yes

# Initialize only specific pieces
bkit-doctor init --target hooks-json --target skills-core

# Use in CI (exits 1 if critical checks fail)
bkit-doctor check --path ./my-project
```

---

## Commands

### `check`

Diagnose the bkit environment in the current (or specified) directory.
After the diagnosis, `check` saves a recommendation snapshot so that
`init --recommended` can reuse the results without re-running all checks.

```
bkit-doctor check [options]

Options:
  -p, --path <dir>   Target directory (default: current directory)
```

**Output example:**

```
[bkit-doctor] 진단 대상: /path/to/project

──── 카테고리 ──────────────────────────
  ✗ structure   1 fail
  ! config      2 warn
  ! docs        4 warn
  ...

──── 상세 ──────────────────────────────
[FAIL] structure.claude-root — .claude/ missing
  → run: bkit-doctor init --target claude-root
...

총 14개 — PASS 0 / WARN 12 / FAIL 2   상태: FAILED

──── 추천 ──────────────────────────────
  8개 추천 target (14개 문제 기반)

  • claude-root — create the .claude/ root directory
  • hooks-json  — create the default hooks.json file
  • docs-core   — create all docs/ scaffolds (plan, design, task, report, changelog)
    (covers: docs-plan, docs-design, docs-task, docs-report, docs-changelog)

  Recommended next step:
  bkit-doctor init --targets claude-root,hooks-json,...,docs-core

  Preview first:
  bkit-doctor init --targets claude-root,hooks-json,...,docs-core --dry-run
```

Each item is rated `pass`, `warn`, or `fail`. The recommendation section shows which `init` targets address the issues, with related targets grouped (e.g. all `docs-*` → `docs-core`).

---

### `init`

Scaffold missing files and directories. Non-destructive by default — existing files are never overwritten unless you explicitly request it.

Before applying, `init` shows a plan summary and asks `Continue? (y/N)`.
Use `--dry-run` to preview without writing, or `--yes` to skip confirmation.

```
bkit-doctor init [options]

Options:
  -p, --path <dir>       Target directory (default: current directory)
  --dry-run              Show plan without writing anything
  --recommended          Auto-select targets from current project state
  --fresh                Force recompute recommendations (ignore snapshot)
  -y, --yes              Skip confirmation prompt, apply immediately
  --target <name>        Apply a specific target only (repeatable)
  --targets <list>       Apply multiple targets, comma-separated
  --overwrite            Allow overwriting existing files
  --backup               Back up existing files before overwriting
  --backup-dir <dir>     Custom backup directory
```

#### Available init targets

| Target | What it creates |
|--------|----------------|
| `claude-root` | `.claude/` root directory |
| `hooks-json` | `.claude/hooks.json` |
| `settings-local` | `.claude/settings.local.json` |
| `agents-core` | 4 agent definition files under `.claude/agents/` |
| `skills-core` | 6 skill SKILL.md files under `.claude/skills/` |
| `templates-core` | 4 document templates under `.claude/templates/` |
| `policies-core` | 4 policy files under `.claude/policies/` |
| `docs-plan` | `docs/plan.md` |
| `docs-design` | `docs/design.md` |
| `docs-task` | `docs/task.md` |
| `docs-report` | `docs/report.md` |
| `docs-changelog` | `docs/changelog.md` |
| `docs-core` | All docs (alias for all `docs-*` targets) |

---

### `fix`

One-command auto-remediation. Runs `check`, computes recommendations, and applies them.

```
bkit-doctor fix [options]

Options:
  -p, --path <dir>   Target directory (default: current directory)
  --dry-run          Show plan without writing anything
  --fresh            Force recompute (ignore snapshot)
  -y, --yes          Skip confirmation prompt
```

### `preset`

Apply predefined scaffold bundles.

```bash
bkit-doctor preset list              # show available presets
bkit-doctor preset show default      # show preset details
bkit-doctor preset recommend         # recommend preset for current project
bkit-doctor init --preset lean --yes # apply a preset
```

### `save` / `load`

Persist and share default settings.

```bash
bkit-doctor save --local --recommended    # save preference locally
bkit-doctor save --global --preset lean   # save globally
bkit-doctor load --local                  # re-apply saved settings
bkit-doctor load --global                 # apply global to current project
```

### `version`

Display version and platform information.

```bash
bkit-doctor version
```

---

## Examples

```bash
# Diagnose → auto-fix → verify
bkit-doctor check                          # see what's missing
bkit-doctor fix --yes                      # fix everything
bkit-doctor check                          # verify: should be HEALTHY

# Preview before applying
bkit-doctor init --recommended --dry-run   # see what would change
bkit-doctor init --recommended --yes       # apply it

# Selective scaffolding
bkit-doctor init --target hooks-json       # just one target
bkit-doctor init --targets hooks-json,docs-core  # multiple targets

# Safe overwrite with backup
bkit-doctor init --overwrite --backup      # backs up to .bkit-doctor/backups/

# CI pipeline integration
bkit-doctor check --path ./my-project && echo "healthy" || echo "needs fix"

# Team settings workflow
bkit-doctor save --global --preset default # team lead saves standard
bkit-doctor load --global                  # team member applies it
```

---

## Architecture Overview

```
bkit-doctor/
├── src/
│   ├── cli/
│   │   ├── index.js              # CLI entry point (commander)
│   │   └── commands/             # check, init, fix, preset, save, load, version
│   ├── core/
│   │   └── checker.js            # CheckerRunner — registers and runs diagnostics
│   ├── checkers/                 # 14 diagnostic modules (structure, config, docs, agents...)
│   │   └── shared/fileRules.js   # findMissingFiles, hasAnyFile utilities
│   ├── check/
│   │   ├── resultModel.js        # CheckResult type
│   │   ├── formatters/           # terminal output renderer
│   │   └── recommendations/      # recommendation engine + snapshot cache
│   ├── init/                     # scaffold manifest, plan builder, apply logic
│   ├── fix/                      # resolveFixTargets — snapshot-aware remediation
│   ├── preset/                   # preset scoring + recommendation
│   ├── config/                   # save/load settings (local + global)
│   ├── backup/                   # backup session management
│   └── shared/
│       └── remediationMap.js     # checker id → initTarget mapping
├── tests/                        # 167 tests (node:test)
├── scripts/
│   └── verify-release.js         # 38-check release verification
└── docs/                         # PDCA phase documents (plan, design, task, report)
```

---

## Development methodology

This project was built using the same PDCA workflow it promotes. Every feature has Plan, Design, Task, and Report documents in `docs/`. This ensures changes are intentional, documented, and traceable.

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request to discuss your proposed change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Ideally, follow the phase-based workflow: Plan → Design → Implement → Check
4. Submit a pull request with a clear description of what changed and why

---

## License

Apache License 2.0 — see [LICENSE](LICENSE) for full terms.

---

## Acknowledgements

- **[bkit](https://github.com/anthropics/bkit)** — for the workflow philosophy that inspired this project
- The open-source community — for the tools and patterns this project builds on
