'use strict';

const { CheckerRunner }      = require('../../core/checker');
const { DEFAULT_CHECKERS }   = require('../../checkers/index');
const { buildRecommendations } = require('./buildRecommendations');
const { groupRecommendations } = require('./groupRecommendations');

/**
 * computeRecommendations.js
 * projectRoot → checks 실행 → recommendation 모델 반환
 *
 * init --recommended의 내부 흐름:
 *   projectRoot → run checks → buildRecommendations → { recommendations, ... }
 *
 * formatter / console 출력 책임 없음.
 *
 * @param {string} projectRoot
 * @returns {Promise<{
 *   recommendations: import('./recommendationModel').Recommendation[],
 *   unmappedCount: number,
 *   invalidCount: number,
 *   issueCount: number,
 * }>}
 */
async function computeRecommendations(projectRoot) {
  const runner = new CheckerRunner();
  DEFAULT_CHECKERS.forEach(c => runner.register(c));

  const results = await runner.run(projectRoot);

  const warn = results.filter(r => r.status === 'warn').length;
  const fail = results.filter(r => r.status === 'fail').length;

  const { recommendations, unmappedCount, invalidCount } = buildRecommendations(results);
  const { finalRecommendations }                         = groupRecommendations(recommendations);

  return {
    recommendations: finalRecommendations,
    unmappedCount,
    invalidCount,
    issueCount: warn + fail,
  };
}

module.exports = { computeRecommendations };
