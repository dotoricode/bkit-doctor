'use strict';

const { makeSuggestedFlow } = require('./suggestedFlowModel');

/**
 * buildSuggestedFlow.js
 * Recommendation[] → SuggestedFlow
 *
 * recommendations는 이미 priority 정렬된 상태로 들어온다.
 *
 * @param {Recommendation[]} recommendations
 * @param {number}           issueCount  — warn + fail 총 수
 * @returns {SuggestedFlow|null}         — 추천 없으면 null
 */
function buildSuggestedFlow(recommendations, issueCount) {
  if (recommendations.length === 0) return null;

  const targets       = recommendations.map(r => r.target);
  const reasonSummary = `${recommendations.length} recommended targets from ${issueCount} issue(s)`;

  return makeSuggestedFlow(targets, reasonSummary);
}

module.exports = { buildSuggestedFlow };
