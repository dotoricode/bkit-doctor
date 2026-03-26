/**
 * post-tool-use-write.js
 * PostToolUse hook: Write | Edit
 *
 * src/ 경로 파일 변경 감지 시 Design 문서 확인 advisory 출력.
 * - stdin으로 전달된 Claude Code 이벤트 JSON을 파싱
 * - JSON 파싱 실패 또는 대상 외 경로: no-op
 * - 항상 exit(0) — hard-stop 없음
 */

'use strict';

let raw = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  raw += chunk;
});

process.stdin.on('end', () => {
  try {
    const event = JSON.parse(raw);
    const filePath = (event?.tool_input?.file_path || '').replace(/\\/g, '/');

    if (filePath.includes('/src/')) {
      process.stderr.write(
        '[bkit-doctor] src/ 변경 — 연결된 Design 문서가 있는지 확인하세요\n'
      );
    }
  } catch (_) {
    // JSON 파싱 실패: no-op
  }

  process.exit(0);
});
