'use strict';

/**
 * init 명령 핸들러 (Phase 1: stub)
 * Phase 2에서 .claude/ 초기화 로직으로 교체 예정
 */
function initCommand(options) {
  console.log('[bkit-doctor] init: 초기화 모듈 준비 중 (Phase 2에서 구현)');
  console.log('  대상 디렉터리:', options.path || process.cwd());
}

module.exports = { initCommand };
