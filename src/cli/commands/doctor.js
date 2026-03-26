'use strict';

/**
 * doctor 명령 핸들러 (Phase 1: stub)
 * Phase 3에서 실제 진단 로직으로 교체 예정
 */
function doctorCommand(options) {
  console.log('[bkit-doctor] doctor: 진단 모듈 준비 중 (Phase 3에서 구현)');
  console.log('  대상 디렉터리:', options.path || process.cwd());
}

module.exports = { doctorCommand };
