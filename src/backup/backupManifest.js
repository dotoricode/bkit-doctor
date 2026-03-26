'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * backupManifest.js
 * 백업 세션에 manifest.json을 기록한다.
 * 복구 시 어떤 파일이 백업되었는지 추적 가능하게 한다.
 *
 * @param {string}   sessionDir  백업 세션 디렉터리
 * @param {string}   timestamp
 * @param {string[]} files       백업된 상대 경로 목록
 */
function writeBackupManifest(sessionDir, timestamp, files) {
  const manifest = {
    timestamp,
    createdAt: new Date().toISOString(),
    files,
  };
  const dest = path.join(sessionDir, 'manifest.json');
  fs.writeFileSync(dest, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

module.exports = { writeBackupManifest };
