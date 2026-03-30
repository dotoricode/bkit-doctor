# Tutorial: PDCA Guide with bkit-doctor

> Learn how to use `bkit-doctor pdca` commands to create and manage structured PDCA documents for your project.

---

## What is the PDCA workflow?

PDCA (Plan-Do-Check-Act) is an iterative development cycle used in AI-native projects.
`bkit-doctor` lets you generate structured Markdown guide documents for any topic — features, bug fixes, refactors, or operational guidelines — following this cycle.

```
Plan  →  Do  →  Check  →  Act
 └─ define     execute   verify   improve
```

All generated documents are saved under `output/pdca/` and are excluded from version control by default (they are runtime artifacts, not committed source).

---

## Quick Start (full guide in one command)

Generate a complete PDCA guide document for any topic:

```bash
# Create a full PDCA guide (all four phases in one file)
bkit-doctor pdca "User Authentication"

# Output: output/pdca/user-authentication-pdca-guide.md
```

### With options

```bash
# Specify document type, owner, and priority
bkit-doctor pdca "Payment Failure Response" \
  --type feature \
  --owner alice \
  --priority P0

# Preview without writing
bkit-doctor pdca "Deploy Checklist" --dry-run

# Print to terminal
bkit-doctor pdca "Ops Runbook" --stdout

# Custom output path
bkit-doctor pdca "API Gateway Setup" -o docs/ops/api-gateway-pdca.md

# Overwrite if already exists
bkit-doctor pdca "Login Feature" --overwrite
```

---

## Document types

| Type | Best for |
|------|----------|
| `guideline` (default) | Operational guides, checklists, team conventions |
| `feature` | New feature development |
| `bugfix` | Bug investigation and fix |
| `refactor` | Code or architecture refactoring |

Each type generates a template with sections tailored to that work style.

```bash
bkit-doctor pdca "Dark Mode Support" --type feature
bkit-doctor pdca "Memory Leak in Worker" --type bugfix
bkit-doctor pdca "Extract Auth Module" --type refactor
bkit-doctor pdca "Code Review Checklist" --type guideline
```

---

## Stage-by-stage workflow

For longer projects, you can generate one document per PDCA stage and fill each in over time:

```bash
# Step 1 — Plan (background, scope, success criteria)
bkit-doctor pdca-plan "User Auth" --type feature --owner alice --priority P1

# Step 2 — Do (execution strategy, work breakdown, checklist)
bkit-doctor pdca-do "User Auth"

# Step 3 — Check (validation criteria, review questions, sign-off)
bkit-doctor pdca-check "User Auth"

# Step 4 — Report (summary, lessons learned, follow-up actions)
bkit-doctor pdca-report "User Auth"
```

Each command outputs a separate file:

```
output/pdca/
├── user-auth-pdca-plan.md
├── user-auth-pdca-do.md
├── user-auth-pdca-check.md
└── user-auth-pdca-report.md
```

> Stage documents for the same `topic` (same slug) are linked via `.bkit-doctor/pdca-state.json`, which tracks the current stage and metadata.

---

## List all PDCA documents

```bash
bkit-doctor pdca-list
```

Example output:

```
[bkit-doctor] PDCA guides in output/pdca/

  user-auth            feature   P1   plan      alice
  payment-failure      feature   P0   do        alice
  deploy-checklist     guideline P1   done      TBD

3 topic(s) found
```

---

## Workflow example: feature development

Here is a complete example for a new feature from planning to report.

### 1. Start planning

```bash
bkit-doctor pdca-plan "Shopping Cart" --type feature --owner bob --priority P1
```

Open `output/pdca/shopping-cart-pdca-plan.md` and fill in:
- Background: why this feature is needed
- Problem statement: what user pain it solves
- Goal and scope
- Success criteria

### 2. Execute

```bash
bkit-doctor pdca-do "Shopping Cart"
```

Open `output/pdca/shopping-cart-pdca-do.md` and fill in:
- Execution strategy
- Work breakdown steps
- Deliverables and checklist

### 3. Check results

```bash
bkit-doctor pdca-check "Shopping Cart"
```

Open `output/pdca/shopping-cart-pdca-check.md` and fill in:
- Validation criteria and results
- Review questions answered
- Evidence / test results linked

### 4. Write report

```bash
bkit-doctor pdca-report "Shopping Cart"
```

Open `output/pdca/shopping-cart-pdca-report.md` and fill in:
- Summary of what was done
- Lessons learned
- Follow-up actions

---

## Integrating with bkit (Claude Code plugin)

If you use the [bkit](https://github.com/popup-studio-ai/bkit-claude-code) plugin inside Claude Code, you can run PDCA workflows directly from your chat session:

```
/pdca plan shopping-cart
/pdca do shopping-cart
/pdca analyze shopping-cart
```

bkit writes documents into `docs/` (inside the repo). `bkit-doctor pdca` generates files in `output/pdca/` (outside version control), and is useful for standalone planning documents or team guides that don't belong in the codebase.

---

## Tips

**Naming topics:** Use a short, descriptive phrase. The slug (filename) is auto-generated:
- `"User Auth"` → `user-auth`
- `"Fix Memory Leak #123"` → `fix-memory-leak-123`

**Dry run first:** Use `--dry-run` to preview the output path and first lines before writing:
```bash
bkit-doctor pdca "My Topic" --dry-run
```

**State tracking:** Stage documents (pdca-plan/do/check/report) update `.bkit-doctor/pdca-state.json` automatically. The full guide command (`pdca`) does not create state entries.

**Output directory:** All `output/` files are git-ignored by default. To commit a PDCA guide, use `-o` to write it somewhere inside your repo:
```bash
bkit-doctor pdca "Release Checklist" -o docs/ops/release-checklist.md
```

---

## Reference

| Command | Description |
|---------|-------------|
| `pdca <topic>` | Full PDCA guide (all 4 phases in one file) |
| `pdca-plan <topic>` | Plan document only |
| `pdca-do <topic>` | Do document only |
| `pdca-check <topic>` | Check document only |
| `pdca-report <topic>` | Report document only |
| `pdca-list` | List all generated PDCA documents |

Common options available on all `pdca*` commands:

| Option | Default | Description |
|--------|---------|-------------|
| `--type` | `guideline` | `guideline` / `feature` / `bugfix` / `refactor` |
| `--owner` | `TBD` | Owner name |
| `--priority` | `P1` | `P0` / `P1` / `P2` / `P3` |
| `-o, --output` | auto | Custom output file path |
| `--stdout` | — | Print to terminal instead of file |
| `--dry-run` | — | Preview without writing |
| `--overwrite` | — | Overwrite existing file |
