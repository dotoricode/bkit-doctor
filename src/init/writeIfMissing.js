'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * 디렉터리가 없으면 생성, 있으면 skip
 * @returns {{ action: 'create'|'skip', dirPath: string }}
 */
function ensureDir(root, relDir) {
  const full = path.join(root, relDir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    return { action: 'create', dirPath: relDir };
  }
  return { action: 'skip', dirPath: relDir };
}

/**
 * 파일이 없으면 content로 생성, 있으면 skip
 * @returns {{ action: 'create'|'skip', filePath: string }}
 */
function writeIfMissing(root, relFile, content) {
  const full = path.join(root, relFile);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, 'utf8');
    return { action: 'create', filePath: relFile };
  }
  return { action: 'skip', filePath: relFile };
}

module.exports = { ensureDir, writeIfMissing };
