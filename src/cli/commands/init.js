'use strict';

const path = require('path');
const { buildInitPlan }              = require('../../init/buildInitPlan');
const { applyInitPlan }              = require('../../init/applyInitPlan');
const { validateTargets, suggestTarget, TARGETS } = require('../../init/targetRegistry');

/**
 * init 명령 핸들러 — Phase 4-3: selective apply + remediation
 */
function initCommand(options) {
  const projectRoot = path.resolve(options.path || process.cwd());
  const dryRun      = Boolean(options.dryRun);
  const overwrite   = Boolean(options.overwrite);
  const backup      = Boolean(options.backup);
  const backupDir   = options.backupDir || undefined;

  // target 수집: --target 반복 + --targets 쉼표 구분
  const rawTargets = collectTargets(options);

  // target validation
  if (rawTargets.length > 0) {
    const { valid, unknown } = validateTargets(rawTargets);
    if (unknown.length > 0) {
      console.error('[bkit-doctor] unknown targets:');
      for (const u of unknown) {
        const hint = suggestTarget(u);
        const hintStr = hint ? `  (did you mean: ${hint}?)` : '';
        console.error(`  - ${u}${hintStr}`);
      }
      console.error('');
      console.error('available targets:');
      for (const [k, v] of Object.entries(TARGETS)) {
        console.error(`  ${k.padEnd(20)} ${v}`);
      }
      if (valid.length === 0) {
        process.exitCode = 1;
        return;
      }
      console.error('');
      console.error(`continuing with valid targets: ${valid.join(', ')}`);
      console.error('');
    }
    // valid만 사용
    rawTargets.length = 0;
    rawTargets.push(...valid);
  }

  console.log(`[bkit-doctor] init: ${projectRoot}`);
  if (dryRun) console.log('[dry-run] no files will be changed');
  if (rawTargets.length > 0) console.log(`[targets] ${rawTargets.join(', ')}`);
  console.log('');

  // 1. 계획 계산
  const plan = buildInitPlan(projectRoot, { overwrite, targets: rawTargets });

  // 2. 계획 출력 (상세)
  for (const item of plan) {
    const label = formatLabel(item);
    console.log(`  ${label} ${item.path}`);
  }

  // 3. 실행
  const { applied, skipped, backupSession } =
    applyInitPlan(projectRoot, plan, { dryRun, backup, backupDir });

  // 4. 요약
  const mkdirCount     = applied.filter(i => i.kind === 'dir').length;
  const createCount    = applied.filter(i => i.kind === 'file' && i.action === 'create').length;
  const overwriteCount = applied.filter(i => i.action === 'overwrite').length;
  const skipCount      = skipped.filter(i => i.kind === 'file').length;

  console.log('');
  console.log('요약');
  if (rawTargets.length > 0)
    console.log(`  selected targets     : ${rawTargets.join(', ')}`);
  console.log(`  directories created  : ${mkdirCount}`);
  console.log(`  files created        : ${createCount}`);
  if (overwriteCount > 0)
    console.log(`  files overwritten    : ${overwriteCount}`);
  console.log(`  files skipped        : ${skipCount}`);
  if (backupSession)
    console.log(`  backup               : ${backupSession}`);
  console.log('');

  // 5. 최종 상태
  if (dryRun) {
    console.log('init completed (dry-run)');
    console.log('no files changed');
  } else if (skipCount > 0 && createCount === 0 && mkdirCount === 0) {
    console.log('init completed — nothing to do');
  } else if (skipCount > 0) {
    console.log('init completed with skipped files');
  } else {
    console.log('init completed');
  }
}

/**
 * --target (반복) + --targets (쉼표) 옵션을 합쳐 배열로 반환
 */
function collectTargets(options) {
  const result = [];
  if (options.target) {
    if (Array.isArray(options.target)) result.push(...options.target);
    else result.push(options.target);
  }
  if (options.targets) {
    result.push(...options.targets.split(',').map(t => t.trim()).filter(Boolean));
  }
  return result;
}

function formatLabel(item) {
  switch (item.action) {
    case 'mkdir':     return '[MKDIR]   ';
    case 'mkdir-skip':return '[DIR-OK]  ';
    case 'create':    return '[CREATE]  ';
    case 'skip':      return '[SKIP]    ';
    case 'overwrite': return '[OVERWRITE]';
    default:          return '[?]       ';
  }
}

module.exports = { initCommand };
