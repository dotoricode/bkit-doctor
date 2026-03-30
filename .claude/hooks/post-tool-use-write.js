/**
 * post-tool-use-write.js
 * PostToolUse hook: Write | Edit
 *
 * src/ 경로 파일 변경 감지 시:
 *   1. Design 문서 연결 여부 advisory
 *   2. 활성 phase의 task.md 존재 여부 검사 — 없으면 [PDCA REQUIRED] 출력
 *
 * exit(0): 계속 진행 (차단 없음, Claude가 메시지를 읽고 스스로 판단)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { raw += chunk; });

process.stdin.on('end', () => {
  try {
    const event    = JSON.parse(raw);
    const filePath = (event?.tool_input?.file_path || '').replace(/\\/g, '/');

    if (!filePath.includes('/src/')) {
      process.exit(0);
    }

    // ── 1. Design 문서 advisory ─────────────────────────────────────
    process.stderr.write(
      '[bkit-doctor] src/ 변경 — 연결된 Design 문서가 있는지 확인하세요\n'
    );

    // ── 2. task.md 존재 검사 ────────────────────────────────────────
    const projectRoot = findProjectRoot(filePath);
    if (!projectRoot) { process.exit(0); }

    const planDir = path.join(projectRoot, 'docs', '01-plan');
    const taskDir = path.join(projectRoot, 'docs', '03-task');

    if (!fs.existsSync(planDir)) { process.exit(0); }

    const planFiles = fs.readdirSync(planDir).filter(f => f.endsWith('.plan.md'));
    if (planFiles.length === 0) { process.exit(0); }

    const missing = planFiles
      .map(pf => pf.replace('.plan.md', '.task.md'))
      .filter(tf => !fs.existsSync(path.join(taskDir, tf)));

    if (missing.length > 0) {
      process.stderr.write('\n');
      process.stderr.write('[PDCA REQUIRED] task.md 없이 src/ 구현이 감지됐습니다.\n');
      missing.forEach(tf => {
        process.stderr.write(`  missing: docs/03-task/${tf}\n`);
      });
      process.stderr.write('  → phase-do skill을 실행하여 task.md를 먼저 생성하세요.\n');
      process.stderr.write('\n');
    }

  } catch (_) {
    // JSON 파싱 실패: no-op
  }

  process.exit(0);
});

/**
 * 파일 경로에서 프로젝트 루트를 추정한다.
 * /src/ 직전 세그먼트까지를 루트로 간주.
 */
function findProjectRoot(filePath) {
  const idx = filePath.lastIndexOf('/src/');
  if (idx === -1) return null;
  return filePath.slice(0, idx);
}
