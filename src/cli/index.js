#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const { versionCommand } = require('./commands/version');
const { doctorCommand } = require('./commands/doctor');
const { initCommand } = require('./commands/init');
const pkg = require('../../package.json');

const program = new Command();

program
  .name('bkit-doctor')
  .description('bkit 운영 환경 진단 CLI')
  .version(pkg.version, '-v, --version', '버전 출력');

program
  .command('version')
  .description('버전 및 플랫폼 정보 출력')
  .action(versionCommand);

program
  .command('doctor')
  .description('bkit 운영 환경 진단 실행')
  .option('-p, --path <dir>', '진단 대상 디렉터리', process.cwd())
  .action(doctorCommand);

program
  .command('init')
  .description('bkit .claude/ 환경 초기화')
  .option('-p, --path <dir>', '초기화 대상 디렉터리', process.cwd())
  .action(initCommand);

program.parse(process.argv);
