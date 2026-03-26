'use strict';

/**
 * fileTemplates.js
 * 각 파일 타입별 최소 내용 생성
 * MVP 원칙: 제목 + purpose + placeholder 섹션
 */

function getContent(file) {
  switch (file.type) {
    case 'json-hooks':
      return JSON.stringify({ hooks: [] }, null, 2) + '\n';

    case 'json-settings':
      return JSON.stringify({ env: {}, permissions: [] }, null, 2) + '\n';

    case 'agent':
      return [
        `# ${file.name}`,
        '',
        '## Purpose',
        `${file.name} agent — placeholder.`,
        '',
        '## Triggers',
        '<!-- When to invoke this agent -->',
        '',
        '## Responsibilities',
        '<!-- What this agent does -->',
        '',
        '## Output',
        '<!-- Expected output format -->',
      ].join('\n') + '\n';

    case 'skill':
      return [
        `# ${file.name}`,
        '',
        '## Purpose',
        `${file.name} skill — placeholder.`,
        '',
        '## Usage',
        `\`/${file.name}\``,
        '',
        '## Steps',
        '<!-- Step-by-step instructions -->',
      ].join('\n') + '\n';

    case 'template':
      return [
        `# ${file.name} Template`,
        '',
        '## Status',
        '<!-- draft | in-progress | done -->',
        '',
        '## Summary',
        '<!-- Brief summary -->',
        '',
        '## Details',
        '<!-- Fill in here -->',
      ].join('\n') + '\n';

    case 'policy':
      return [
        `# ${file.name} Policy`,
        '',
        '## Purpose',
        `${file.name} policy — placeholder.`,
        '',
        '## Rules',
        '<!-- Define rules here -->',
      ].join('\n') + '\n';

    case 'doc':
      return [
        `# ${file.name}`,
        '',
        '## Status',
        '<!-- draft | in-progress | done -->',
        '',
        '## Summary',
        '<!-- Brief summary -->',
      ].join('\n') + '\n';

    case 'changelog':
      return [
        '# Changelog',
        '',
        '## Unreleased',
        '<!-- List changes here -->',
      ].join('\n') + '\n';

    default:
      return `# ${file.path}\n\n<!-- placeholder -->\n`;
  }
}

module.exports = { getContent };
