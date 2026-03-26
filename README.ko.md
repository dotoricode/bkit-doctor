# bkit-doctor

> ⚠️ **작업 진행 중** — 이 프로젝트는 현재 활발하게 개발되고 있습니다.

> bkit 스타일 프로젝트 환경을 진단하고, 초기화하고, 유지하는 CLI 도구.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-0.4.2-orange.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wpfhak/bkit-doctor/pulls)

[English](README.md) | **한국어** | [日本語](README.ja.md) | [中文](README.zh.md) | [Español](README.es.md)

---

## 소개

**bkit-doctor**는 어떤 프로젝트에서도 bkit 스타일 워크플로 환경을 쉽게 구축하고 유지할 수 있도록 돕는 CLI 도구입니다. 현재 프로젝트 구조를 진단하고, 누락되거나 잘못 설정된 항목을 보고하며, 안전하고 비파괴적인 방식으로 누락된 파일을 자동으로 생성할 수 있습니다.

이 프로젝트 자체가 bkit-doctor가 지원하는 단계 기반 워크플로를 사용해 만들어졌습니다. 모든 기능은 Plan → Design → Do → Check 방법론으로 계획, 설계, 구현, 검증되었습니다.

---

## 왜 이 프로젝트가 필요한가

구조화된 AI 네이티브 개발 워크플로를 도입하면 강력한 생산성을 얻을 수 있지만, 시작이 어렵습니다. 올바른 디렉터리 구조, 에이전트 정의, 스킬 파일, 템플릿, 정책 파일을 손으로 설정하는 것은 번거롭고 오류가 발생하기 쉽습니다.

**bkit-doctor**는 그 진입 장벽을 낮추기 위해 만들어졌습니다:

- **진단** — 현재 프로젝트에 무엇이 있고, 무엇이 없으며, 무엇이 필요한지 즉시 확인
- **초기화** — 이미 존재하는 파일을 건드리지 않고 필요한 구조를 수 초 안에 생성
- **선택 적용** — 필요한 것만 하나씩 선택해서 적용
- **미리보기** — 실제로 파일이 쓰이기 전에 무엇이 변경될지 확인

이 도구는 단순한 아이디어에서 출발했습니다: *워크플로는 일단 진입하기 쉬워야 한다.*

---

## 기능

| 기능 | 설명 |
|------|------|
| `check` | 프로젝트 환경 진단 — 항목별 pass / warn / fail |
| `init` | 누락된 디렉터리와 파일을 비파괴적으로 생성 |
| `--dry-run` | 파일 시스템을 변경하지 않고 생성 계획만 출력 |
| `--target` | 특정 target만 선택 적용 (반복 사용 가능) |
| `--targets` | 쉼표로 구분해 여러 target을 한 번에 적용 |
| `--overwrite` | 필요 시 기존 파일 덮어쓰기 |
| `--backup` | 덮어쓰기 전 기존 파일 백업 |
| 오타 감지 | `did you mean: docs-report?` 힌트 제공 |
| 크로스플랫폼 | macOS 및 Windows 동작 |

---

## 워크플로 철학

bkit-doctor는 **단계 기반 개발 모델**을 중심으로 설계되었습니다:

```
PM → PLAN → DESIGN → DO → CHECK → REPORT
```

각 단계는 문서를 생성합니다. 각 문서는 예측 가능한 위치에 있습니다. 모든 작업은 요구사항부터 구현, 검증까지 추적 가능합니다.

이 구조는 AI 어시스턴트와 인간 개발자 모두에게 안정적인 공유 컨텍스트를 제공합니다. 모호함을 줄이고, 추적성을 높이며, 단계 간 인계를 신뢰할 수 있게 만듭니다.

bkit-doctor는 이 구조를 다음 방식으로 지원합니다:

1. **확인** — 필요한 파일과 디렉터리가 존재하는지 검사
2. **보고** — 누락되거나 잘못된 항목을 실행 가능한 힌트와 함께 출력
3. **생성** — 없는 구조를 안전하게 스캐폴딩
4. **연결** — 진단 결과를 `initTarget` 시스템으로 init 도구와 연결

---

## bkit과의 관계

> **bkit-doctor는 독립 프로젝트입니다. 공식 bkit 플러그인이 아니며, bkit 프로젝트와 공식적인 제휴 관계가 없습니다.**

bkit-doctor는 강력한 AI 네이티브 개발 워크플로 도구인 **bkit에서 영감을 받아** 만들어졌습니다. 저자는 bkit의 소개 자료를 통해 구조화된 AI 협업 방법론을 배웠고, 그 지식이 이 도구의 설계에 직접적인 영향을 주었습니다.

bkit-doctor는:

- bkit 코드를 **포함하지 않습니다**
- bkit 없이도 동작합니다
- bkit 팀의 보증이나 지원을 받지 않습니다
- bkit 자체를 대체하거나 확장하는 것이 아니라, bkit 스타일 워크플로를 보조하기 위해 설계되었습니다

---

## 감사의 말

> **bkit 프로젝트에 특별히 감사드립니다.**

bkit 소개 영상을 보는 것이 하나의 전환점이 되었습니다. 단계 기반 워크플로의 명확함, Plan → Design → Do → Check의 규율, 그리고 AI 협업은 양쪽이 구조화된 컨텍스트를 공유할 때 가장 잘 작동한다는 아이디어 — 이 모든 것이 bkit-doctor의 설계에 깊은 영향을 미쳤습니다.

bkit 덕분에 저자는 높은 품질의 바이브 코딩을 실현할 수 있었습니다. 이 프로젝트는 bkit이 구조화된 AI 네이티브 개발을 가능하게 해준 덕분에 존재합니다. bkit-doctor의 목표는 더 많은 개발자들이 같은 경험을 더 쉽게 누릴 수 있도록 돕는 것입니다.

---

## 설치

### 요구사항

- Node.js >= 18.0.0
- npm

### 전역 설치

```bash
npm install -g bkit-doctor
```

### 소스에서 실행

```bash
git clone https://github.com/wpfhak/bkit-doctor.git
cd bkit-doctor
npm install
npm link
```

---

## 사용법

```bash
bkit-doctor <command> [options]
```

### 빠른 시작

```bash
# 프로젝트 bkit 환경 진단
bkit-doctor check

# 초기화 미리보기 (변경 없음)
bkit-doctor init --dry-run

# 전체 구조 초기화
bkit-doctor init

# 특정 항목만 초기화
bkit-doctor init --target hooks-json --target skills-core
```

---

## 명령어

### `check`

현재(또는 지정한) 디렉터리의 bkit 환경을 진단합니다.

```bash
bkit-doctor check [options]

Options:
  -p, --path <dir>   진단 대상 디렉터리 (기본: 현재 디렉터리)
```

---

### `init`

누락된 파일과 디렉터리를 생성합니다. 기본적으로 비파괴적 — 명시적으로 요청하지 않으면 기존 파일은 절대 덮어쓰지 않습니다.

```bash
bkit-doctor init [options]

Options:
  -p, --path <dir>       대상 디렉터리 (기본: 현재 디렉터리)
  --dry-run              파일 변경 없이 계획만 출력
  --target <name>        특정 target만 생성 (반복 사용 가능)
  --targets <list>       쉼표 구분 target 목록
  --overwrite            기존 파일 덮어쓰기 허용
  --backup               덮어쓰기 전 백업 수행
  --backup-dir <dir>     백업 저장 디렉터리
```

#### 사용 가능한 init target

| Target | 생성 대상 |
|--------|----------|
| `claude-root` | `.claude/` 루트 디렉터리 |
| `hooks-json` | `.claude/hooks.json` |
| `settings-local` | `.claude/settings.local.json` |
| `agents-core` | `.claude/agents/` 에이전트 파일 4종 |
| `skills-core` | `.claude/skills/` SKILL.md 6종 |
| `templates-core` | `.claude/templates/` 템플릿 4종 |
| `policies-core` | `.claude/policies/` 정책 파일 4종 |
| `docs-plan` | `docs/plan.md` |
| `docs-design` | `docs/design.md` |
| `docs-task` | `docs/task.md` |
| `docs-report` | `docs/report.md` |
| `docs-changelog` | `docs/changelog.md` |
| `docs-core` | 모든 docs (docs-* target 전체의 alias) |

---

## 예시

```bash
# 특정 target만 초기화
bkit-doctor init --target docs-report

# 복수 target
bkit-doctor init --targets hooks-json,agents-core

# 백업과 함께 덮어쓰기
bkit-doctor init --overwrite --backup

# 오타 감지
bkit-doctor init --target docs-reprot
# [bkit-doctor] unknown targets:
#   - docs-reprot  (did you mean: docs-report?)
```

---

## 기여

기여를 환영합니다. 풀 리퀘스트를 제출하기 전에 이슈를 먼저 열어 변경 사항을 논의해주세요.

---

## 라이선스

Apache License 2.0 — 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.
