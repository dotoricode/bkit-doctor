'use strict';

/**
 * initPlanModel.js
 * init 실행 계획의 항목 타입 정의
 *
 * action values:
 *   mkdir            — 디렉터리 생성 예정
 *   mkdir-skip       — 디렉터리 이미 존재
 *   create           — 파일 생성 예정
 *   skip             — 파일 이미 존재, 건너뜀
 *   overwrite        — 파일 존재하나 overwrite 예정 (--overwrite 필요)
 *   overwrite-blocked— overwrite 예정이나 플래그 없어 차단
 */

/**
 * @typedef {Object} PlanItem
 * @property {'mkdir'|'mkdir-skip'|'create'|'skip'|'overwrite'|'overwrite-blocked'} action
 * @property {string}  path            — 상대 경로
 * @property {'dir'|'file'} kind
 * @property {string}  [reason]        — 선택적 설명
 * @property {string}  [initTarget]    — remediationMap 연결 키
 * @property {boolean} [backupRequired]
 */

/**
 * PlanItem 생성 헬퍼
 */
function makeItem(action, kind, relPath, extras = {}) {
  return { action, kind, path: relPath, ...extras };
}

module.exports = { makeItem };
