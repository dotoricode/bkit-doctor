'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * createBackupSession.js
 * timestamp 기반 백업 세션 디렉터리를 생성한다.
 *
 * 구조: <projectRoot>/.bkit-doctor/backups/<timestamp>/
 *
 * @param {string} projectRoot
 * @param {string} [backupDir]  사용자 지정 백업 루트 (기본: .bkit-doctor/backups)
 * @returns {{ sessionDir: string, timestamp: string }}
 */
function createBackupSession(projectRoot, backupDir) {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, '-')
    .replace(/\..+$/, '');                       // 2026-03-27T10-30-00

  const backupRoot = backupDir
    ? path.resolve(backupDir)
    : path.join(projectRoot, '.bkit-doctor', 'backups');

  const sessionDir = path.join(backupRoot, timestamp);
  fs.mkdirSync(sessionDir, { recursive: true });

  return { sessionDir, timestamp };
}

module.exports = { createBackupSession };
