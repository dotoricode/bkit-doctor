'use strict';

const { DIRECTORIES, FILES } = require('./scaffoldManifest');
const { getContent }         = require('./fileTemplates');
const { ensureDir, writeIfMissing } = require('./writeIfMissing');

/**
 * projectRoot 기준으로 기본 구조를 생성한다.
 * @param {string} projectRoot 절대 경로
 * @returns {{ dirs: Array, files: Array }} 처리 결과
 */
function generateScaffold(projectRoot) {
  const dirs  = [];
  const files = [];

  for (const rel of DIRECTORIES) {
    const result = ensureDir(projectRoot, rel);
    dirs.push(result);
  }

  for (const file of FILES) {
    const content = getContent(file);
    const result  = writeIfMissing(projectRoot, file.path, content);
    files.push(result);
  }

  return { dirs, files };
}

module.exports = { generateScaffold };
