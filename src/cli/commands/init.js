'use strict';

const path = require('path');
const { buildInitPlan }              = require('../../init/buildInitPlan');
const { applyInitPlan }              = require('../../init/applyInitPlan');
const { validateTargets, suggestTarget, TARGETS } = require('../../init/targetRegistry');
const { computeRecommendations }     = require('../../check/recommendations/computeRecommendations');

/**
 * init 명령 핸들러 — Phase 5-3: --recommended MVP
 *
 * 우선순위:
 *   1. --target / --targets (explicit) — 항상 우선
 *   2. --recommended — explicit 없을 때만 추천 target 계산
 *   3. 둘 다 없으면 전체 scaffold
 */
async function initCommand(options) {
  const projectRoot    = path.resolve(options.path || process.cwd());
  const dryRun         = Boolean(options.dryRun);
  const overwrite      = Boolean(options.overwrite);
  const backup         = Boolean(options.backup);
  const backupDir      = options.backupDir || undefined;
  const useRecommended = Boolean(options.recommended);

  // target 수집: --target 반복 + --targets 쉼표 구분
  let rawTargets = collectTargets(options);
  let fromRecommended = false;

  // --recommended 처리
  if (useRecommended) {
    if (rawTargets.length > 0) {
      // explicit targets가 있으면 recommended 무시 — 명확히 알림
      console.log('[recommended] explicit targets provided — --recommended ignored');
      console.log(`[targets] ${rawTargets.join(', ')}`);
    } else {
      // checks를 실행하여 추천 target 계산
      console.log(`[bkit-doctor] init: ${projectRoot}`);
      console.log('[recommended] running checks to calculate targets...');

      const { recommendations, issueCount, invalidCount } =
        await computeRecommendations(projectRoot);

      if (recommendations.length === 0) {
        console.log('');
        if (issueCount === 0) {
          console.log('no recommended targets — project looks healthy');
        } else {
          console.log('nothing to apply from recommendations');
          if (invalidCount > 0) {
            console.log(`(${invalidCount} target(s) were invalid and excluded)`);
          }
        }
        return;
      }

      rawTargets = recommendations.map(r => r.target);
      fromRecommended = true;

      console.log(`[recommended] ${rawTargets.length} targets: ${rawTargets.join(', ')}`);
    }
  }

  // explicit target validation (--recommended 없거나 explicit이 있는 경우)
  if (rawTargets.length > 0 && !fromRecommended) {
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
    rawTargets = valid;
  }

  // --recommended 없이 실행하는 일반 경로의 헤더 출력
  if (!useRecommended) {
    console.log(`[bkit-doctor] init: ${projectRoot}`);
    if (dryRun) console.log('[dry-run] no files will be changed');
    if (rawTargets.length > 0) console.log(`[targets] ${rawTargets.join(', ')}`);
    console.log('');
  } else {
    if (dryRun) console.log('[dry-run] no files will be changed');
    console.log('');
  }

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
  if (rawTargets.length > 0) {
    const targetLabel = fromRecommended ? 'recommended targets' : 'selected targets';
    console.log(`  ${targetLabel.padEnd(20)}: ${rawTargets.join(', ')}`);
  }
  console.log(`  ${'directories created'.padEnd(20)}: ${mkdirCount}`);
  console.log(`  ${'files created'.padEnd(20)}: ${createCount}`);
  if (overwriteCount > 0)
    console.log(`  ${'files overwritten'.padEnd(20)}: ${overwriteCount}`);
  console.log(`  ${'files skipped'.padEnd(20)}: ${skipCount}`);
  if (backupSession)
    console.log(`  ${'backup'.padEnd(20)}: ${backupSession}`);
  console.log('');

  // 5. 최종 상태
  const suffix = fromRecommended ? ' from recommendations' : '';
  if (dryRun) {
    console.log(`init completed${suffix} (dry-run)`);
    console.log('no files changed');
  } else if (skipCount > 0 && createCount === 0 && mkdirCount === 0) {
    console.log(`init completed${suffix} — nothing to do`);
  } else if (skipCount > 0) {
    console.log(`init completed${suffix} with skipped files`);
  } else {
    console.log(`init completed${suffix}`);
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
