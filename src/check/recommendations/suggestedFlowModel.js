'use strict';

/**
 * suggestedFlowModel.js
 * check 추천 결과에서 생성한 suggested init 흐름 모델
 *
 * @typedef {Object} SuggestedFlow
 * @property {string[]} targets          — 우선순위 정렬된 target 목록
 * @property {string}   applyCommand     — 실제 실행 명령 문자열
 * @property {string}   previewCommand   — dry-run 명령 문자열
 * @property {string}   reasonSummary    — 추천 이유 요약
 */

/**
 * SuggestedFlow 생성 헬퍼
 * @param {string[]} targets
 * @param {string}   reasonSummary
 * @returns {SuggestedFlow}
 */
function makeSuggestedFlow(targets, reasonSummary) {
  const targetList  = targets.join(',');
  return {
    targets,
    applyCommand:   `bkit-doctor init --targets ${targetList}`,
    previewCommand: `bkit-doctor init --targets ${targetList} --dry-run`,
    reasonSummary,
  };
}

module.exports = { makeSuggestedFlow };
