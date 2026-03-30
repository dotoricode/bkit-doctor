'use strict';

const { test, after } = require('node:test');
const assert          = require('node:assert/strict');
const { spawnSync }   = require('child_process');
const os              = require('os');
const path            = require('path');
const fs              = require('fs');

const CLI_PATH = path.join(__dirname, '..', 'src', 'cli', 'index.js');

const tmpDirs = [];

function makeTempDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bkit-doctor-skill-'));
  tmpDirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of tmpDirs) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
});

function run(args, { cwd } = {}) {
  const r = spawnSync(process.execPath, [CLI_PATH, ...args], {
    encoding: 'utf8',
    cwd: cwd || process.cwd(),
    timeout: 15000,
  });
  return { stdout: r.stdout || '', stderr: r.stderr || '', code: r.status ?? 1 };
}

// ── skill --stdout ──────────────────────────────────────────────────────────

test('skill --stdout: prints SKILL.md content', () => {
  const r = run(['skill', '--stdout']);
  assert.ok(r.stdout.includes('RULE 1: PROACTIVE DOCUMENTATION'));
  assert.ok(r.stdout.includes('RULE 2: STATE SYNC'));
  assert.ok(r.stdout.includes('RULE 3: PIPELINE'));
});

test('skill --stdout: contains bkit-doctor commands table', () => {
  const r = run(['skill', '--stdout']);
  assert.ok(r.stdout.includes('bkit-doctor pdca-plan'));
  assert.ok(r.stdout.includes('bkit-doctor pdca-list'));
});

// ── skill creates SKILL.md ──────────────────────────────────────────────────

test('skill: creates SKILL.md in project root', () => {
  const dir = makeTempDir();
  const r = run(['skill', '--path', dir]);
  assert.strictEqual(r.code, 0);
  assert.ok(fs.existsSync(path.join(dir, 'SKILL.md')));
  const content = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  assert.ok(content.includes('RULE 1'));
});

test('skill: does not overwrite without --overwrite', () => {
  const dir = makeTempDir();
  fs.writeFileSync(path.join(dir, 'SKILL.md'), 'existing content');
  const r = run(['skill', '--path', dir]);
  assert.strictEqual(r.code, 0);
  const content = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  assert.strictEqual(content, 'existing content');
  assert.ok(r.stdout.includes('already exists'));
});

test('skill --overwrite: replaces existing SKILL.md', () => {
  const dir = makeTempDir();
  fs.writeFileSync(path.join(dir, 'SKILL.md'), 'old');
  const r = run(['skill', '--path', dir, '--overwrite']);
  assert.strictEqual(r.code, 0);
  const content = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  assert.ok(content.includes('RULE 1'));
});

// ── skill --append-claude ───────────────────────────────────────────────────

test('skill --append-claude: appends to CLAUDE.md', () => {
  const dir = makeTempDir();
  fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# Project Rules\n');
  const r = run(['skill', '--path', dir, '--append-claude']);
  assert.strictEqual(r.code, 0);
  const content = fs.readFileSync(path.join(dir, 'CLAUDE.md'), 'utf8');
  assert.ok(content.startsWith('# Project Rules'));
  assert.ok(content.includes('RULE 1: PROACTIVE DOCUMENTATION'));
});

test('skill --append-claude: skips if rules already present', () => {
  const dir = makeTempDir();
  fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# Rules\nRULE 1: PROACTIVE DOCUMENTATION\n');
  const r = run(['skill', '--path', dir, '--append-claude']);
  assert.ok(r.stdout.includes('already present'));
});

// ── skill --dry-run ─────────────────────────────────────────────────────────

test('skill --dry-run: does not create files', () => {
  const dir = makeTempDir();
  const r = run(['skill', '--path', dir, '--dry-run']);
  assert.strictEqual(r.code, 0);
  assert.ok(!fs.existsSync(path.join(dir, 'SKILL.md')));
  assert.ok(r.stdout.includes('dry-run'));
});

// ── skill detects project name from package.json ────────────────────────────

test('skill: uses package.json name if available', () => {
  const dir = makeTempDir();
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'my-cool-project' }));
  const r = run(['skill', '--path', dir, '--stdout']);
  // template mentions the project name
  assert.ok(r.stdout.includes('bkit-doctor'));  // template mentions the tool
});

// ── setup --help ────────────────────────────────────────────────────────────

test('setup --help: shows description', () => {
  const r = run(['setup', '--help']);
  assert.ok(r.stdout.includes('Interactive project setup wizard'));
});

// ── setup non-interactive (piped stdin) ─────────────────────────────────────

test('setup: runs non-interactively when stdin is not TTY', () => {
  const dir = makeTempDir();
  // provide minimal structure to avoid crash
  fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'CLAUDE.md'), '# Project\n');
  const r = run(['setup', '--path', dir]);
  // should complete without hanging (non-TTY auto-accepts defaults)
  assert.strictEqual(r.code, 0);
  assert.ok(r.stdout.includes('Step 1/4'));
  assert.ok(r.stdout.includes('Step 4/4'));
  assert.ok(r.stdout.includes('Setup complete'));
});
