'use strict';

const os = require('os');
const path = require('path');

/**
 * 현재 OS 플랫폼 반환
 * @returns {'mac' | 'windows' | 'linux' | 'unknown'}
 */
function getPlatform() {
  const p = process.platform;
  if (p === 'darwin') return 'mac';
  if (p === 'win32') return 'windows';
  if (p === 'linux') return 'linux';
  return 'unknown';
}

/**
 * 홈 디렉터리 반환 (크로스플랫폼)
 */
function getHomeDir() {
  return os.homedir();
}

/**
 * 프로젝트 루트 기준 경로 조합 (크로스플랫폼)
 * @param {...string} segments
 */
function resolvePath(...segments) {
  return path.join(...segments);
}

/**
 * .claude 디렉터리 경로 반환
 * @param {string} projectRoot
 */
function getClaudeDir(projectRoot) {
  return path.join(projectRoot, '.claude');
}

module.exports = { getPlatform, getHomeDir, resolvePath, getClaudeDir };
