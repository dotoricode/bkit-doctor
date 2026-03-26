'use strict';

const { getPlatform } = require('../../utils/platform');

/**
 * version 명령 핸들러
 */
function versionCommand() {
  const pkg = require('../../../package.json');
  console.log(`bkit-doctor v${pkg.version} [${getPlatform()}]`);
}

module.exports = { versionCommand };
