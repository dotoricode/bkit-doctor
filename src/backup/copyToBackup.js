'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * copyToBackup.js
 * 단일 파일을 백업 세션 디렉터리로 복사한다.
 * 디렉터리 구조를 그대로 유지한다.
 *
 * @param {string} projectRoot   프로젝트 루트 (절대)
 * @param {string} relFile       상대 파일 경로
 * @param {string} sessionDir    백업 세션 디렉터리 (절대)
 * @returns {{ src: string, dest: string }}
 */
function copyToBackup(projectRoot, relFile, sessionDir) {
  const src  = path.join(projectRoot, relFile);
  const dest = path.join(sessionDir, relFile);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);

  return { src, dest };
}

module.exports = { copyToBackup };
