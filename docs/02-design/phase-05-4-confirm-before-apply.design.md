# Phase 05-4: Confirm Before Apply — Design

## Flow

```
build plan
  ↓
render detail ([MKDIR] / [CREATE] / [SKIP] / ...)
  ↓
compute plan stats (mkdir, create, overwrite, skip)
  ↓
dry-run? ──YES──→ print summary → "no files changed" → EXIT
  ↓ NO
no-op? ───YES──→ "nothing to apply" → EXIT
  ↓ NO
--yes? ────YES──→ apply
  ↓ NO
confirmApply() → confirmed? ──NO──→ "cancelled" → EXIT
  ↓ YES
applyInitPlan()
  ↓
print summary → final status
```

## Priority

| Condition         | Action         |
|------------------|----------------|
| `--dry-run`       | preview, no confirm |
| no-op (all skip)  | exit, no confirm |
| `--yes` / `-y`    | apply, no confirm |
| interactive TTY   | confirm prompt |
| non-TTY stdin     | warn + cancelled |

## Files

| File | Change |
|------|--------|
| `src/init/confirmApply.js` | NEW — readline prompt, non-TTY guard |
| `src/cli/commands/init.js` | UPDATE — confirm flow integrated, printSummary helper |
| `src/cli/index.js` | UPDATE — `-y, --yes` option registered |

## Confirm Prompt Example

```
Apply?
  targets      : hooks-json, docs-report
  mkdir        : 1
  create       : 2
  skip         : 8

Continue? (y/N)
```

## No-op Messages

| Context               | Message |
|----------------------|---------|
| targets specified     | "all selected targets are already satisfied" |
| no targets (full)     | "nothing to apply — project is already up to date" |
