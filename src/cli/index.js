#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const { versionCommand } = require('./commands/version');
const { checkCommand }   = require('./commands/check');
const { initCommand }    = require('./commands/init');
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
  .command('check')
  .description('bkit 운영 환경 진단 실행')
  .option('-p, --path <dir>', '진단 대상 디렉터리', process.cwd())
  .action(checkCommand);

program
  .command('init')
  .description('bkit .claude/ 환경 초기화')
  .option('-p, --path <dir>',        '초기화 대상 디렉터리', process.cwd())
  .option('--dry-run',               '파일 변경 없이 계획만 출력')
  .option('--overwrite',             '기존 파일 덮어쓰기 허용')
  .option('--backup',                'overwrite 전 백업 수행')
  .option('--backup-dir <dir>',      '백업 저장 디렉터리 (기본: .bkit-doctor/backups)')
  .option('--target <name>',         '특정 target만 생성 (반복 사용 가능)', collect, [])
  .option('--targets <list>',        '쉼표 구분 target 목록 (예: hooks-json,skills-core)')
  .option('--recommended',           '현재 프로젝트 상태 기반 추천 target 자동 적용')
  .action(initCommand);

function collect(val, prev) { return prev.concat([val]); }

program.parse(process.argv);
