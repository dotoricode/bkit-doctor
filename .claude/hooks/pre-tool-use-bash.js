/**
 * pre-tool-use-bash.js
 * PreToolUse hook: Bash
 *
 * 위험 명령 감지 시 advisory warning 출력.
 * - hard-stop 없음 (항상 exit(0))
 * - stdin JSON 파싱 실패 시 no-op
 */

'use strict';

const ADVISORIES = [
  { pattern: 'push --force', message: 'git push --force 감지 — 의도한 명령인지 확인하세요' },
  { pattern: 'rm -rf',       message: 'rm -rf 감지 — 삭제 경로를 확인하세요' },
  { pattern: 'reset --hard', message: 'git reset --hard 감지 — 되돌릴 수 없습니다' },
  { pattern: 'drop table',   message: 'DROP TABLE 감지 — 데이터 삭제 명령입니다' },
];

let raw = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  raw += chunk;
});

process.stdin.on('end', () => {
  try {
    const event = JSON.parse(raw);
    const cmd = (event?.tool_input?.command || '').toLowerCase();

    for (const { pattern, message } of ADVISORIES) {
      if (cmd.includes(pattern)) {
        process.stderr.write(`[bkit-doctor] WARNING: ${message}\n`);
      }
    }
  } catch (_) {
    // JSON 파싱 실패: no-op
  }

  process.exit(0); // advisory only — 절대 차단하지 않음
});
