# bkit-doctor

> 用于诊断、初始化和维护 bkit 风格项目环境的 CLI 工具。

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-0.4.2-orange.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wpfhak/bkit-doctor/pulls)

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | **中文** | [Español](README.es.md)

---

## 简介

**bkit-doctor** 是一个命令行工具，帮助您在任何项目中轻松建立和维护 bkit 风格的工作流环境。它可以诊断当前项目结构，报告缺失或错误配置的内容，并以安全、非破坏性的方式自动生成缺失的文件。

这个项目本身就是使用它所推广的阶段式工作流构建的。每个功能都经过 Plan → Design → Do → Check 方法论的计划、设计、实现和验证。

---

## 为什么需要这个项目

采用结构化的 AI 原生开发工作流虽然能带来强大的生产力，但入门可能令人望而却步。手动设置正确的目录结构、代理定义、技能文件、模板和策略文件既繁琐又容易出错。

**bkit-doctor** 的存在就是为了降低这个门槛：

- **诊断** — 立即查看项目中有什么、缺少什么、需要什么
- **初始化** — 在数秒内生成所需结构，而不覆盖任何已有文件
- **选择应用** — 一次只应用所需的部分
- **预览** — 在任何文件被写入之前，查看将会发生什么变化

这个工具源于一个简单的想法：*工作流应该容易进入，而不仅仅是进入后容易使用。*

---

## 功能

| 功能 | 说明 |
|------|------|
| `check` | 诊断项目环境 — 每个项目显示 pass / warn / fail |
| `init` | 非破坏性地生成缺失的目录和文件 |
| `--dry-run` | 不修改文件系统，只输出生成计划 |
| `--target` | 只应用特定目标（可重复使用） |
| `--targets` | 用逗号分隔一次应用多个目标 |
| `--overwrite` | 需要时覆盖现有文件 |
| `--backup` | 覆盖前备份现有文件 |
| 错别字检测 | 提供 `did you mean: docs-report?` 提示 |
| 跨平台 | 支持 macOS 和 Windows |

---

## 工作流哲学

bkit-doctor 围绕**阶段式开发模型**构建：

```
PM → PLAN → DESIGN → DO → CHECK → REPORT
```

每个阶段生成一个文档。每个文档都存放在可预测的位置。每项工作从需求到实现到验证都是可追溯的。

这种结构为 AI 助手和人类开发者提供了稳定的共享上下文。它减少了歧义，提高了可追溯性，使阶段间的交接更加可靠。

---

## 与 bkit 的关系

> **bkit-doctor 是一个独立项目。它不是官方的 bkit 插件，与 bkit 项目没有官方关联。**

bkit-doctor 受到强大的 AI 原生开发工作流工具 **bkit 的启发**而创建。作者通过 bkit 的介绍材料学习了结构化 AI 协作方法论，这些知识直接影响了该工具的设计。

bkit-doctor：

- **不包含** bkit 代码
- 无需 bkit 即可运行
- 未获得 bkit 团队的背书或支持
- 旨在辅助 bkit 风格的工作流，而非替换或扩展 bkit 本身

---

## 致谢

> **特别感谢 bkit 项目。**

观看 bkit 的介绍视频是一个转折点。阶段式工作流的清晰性、Plan → Design → Do → Check 的规律，以及 AI 协作在双方共享结构化上下文时效果最佳的理念——这些都深深影响了 bkit-doctor 的设计。

感谢 bkit，作者得以实现高质量的氛围编程（vibe coding）。这个项目之所以存在，是因为 bkit 让结构化的 AI 原生开发变得触手可及。bkit-doctor 的目标是帮助更多开发者更轻松地获得同样的体验。

---

## 安装

### 要求

- Node.js >= 18.0.0
- npm

### 全局安装

```bash
npm install -g bkit-doctor
```

### 从源码运行

```bash
git clone https://github.com/wpfhak/bkit-doctor.git
cd bkit-doctor
npm install
npm link
```

---

## 使用方法

```bash
bkit-doctor <command> [options]
```

### 快速开始

```bash
# 诊断项目的 bkit 环境
bkit-doctor check

# 预览初始化（不做任何更改）
bkit-doctor init --dry-run

# 初始化完整结构
bkit-doctor init

# 只初始化特定部分
bkit-doctor init --target hooks-json --target skills-core
```

---

## 命令

### `check`

诊断当前（或指定）目录的 bkit 环境。

```bash
bkit-doctor check [options]

Options:
  -p, --path <dir>   目标目录（默认：当前目录）
```

---

### `init`

生成缺失的文件和目录。默认非破坏性——除非明确要求，否则绝不覆盖现有文件。

```bash
bkit-doctor init [options]

Options:
  -p, --path <dir>       目标目录
  --dry-run              只输出计划，不写入任何文件
  --target <name>        只生成特定目标（可重复）
  --targets <list>       逗号分隔的目标列表
  --overwrite            允许覆盖现有文件
  --backup               覆盖前创建备份
  --backup-dir <dir>     备份保存目录
```

---

## 许可证

Apache License 2.0 — 详情请参阅 [LICENSE](LICENSE)。
