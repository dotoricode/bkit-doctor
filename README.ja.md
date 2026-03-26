# bkit-doctor

> bkitスタイルのプロジェクト環境を診断・初期化・維持するCLIツール。

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-0.4.2-orange.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wpfhak/bkit-doctor/pulls)

[English](README.md) | [한국어](README.ko.md) | **日本語** | [中文](README.zh.md) | [Español](README.es.md)

---

## はじめに

**bkit-doctor** は、あらゆるプロジェクトで bkit スタイルのワークフロー環境を構築・維持するための CLI ツールです。現在のプロジェクト構造を診断し、不足しているものや誤設定を報告し、安全かつ非破壊的な方法で不足ファイルを自動生成できます。

このプロジェクト自体が、bkit-doctor が推奨するフェーズベースのワークフローで構築されています。すべての機能は Plan → Design → Do → Check の手法で計画・設計・実装・検証されています。

---

## なぜこのプロジェクトが必要か

構造化された AI ネイティブ開発ワークフローを導入すると強力な生産性が得られますが、始めることが難しい場合があります。適切なディレクトリ構造、エージェント定義、スキルファイル、テンプレート、ポリシーファイルを手動で設定するのは手間がかかり、ミスが起きやすいです。

**bkit-doctor** はその参入障壁を下げるために作られました:

- **診断** — 何が存在し、何が不足していて、何が必要かを即座に確認
- **初期化** — 既存ファイルを変更せずに必要な構造を数秒で生成
- **選択適用** — 必要なものだけを一つずつ選んで適用
- **プレビュー** — 実際にファイルが書き込まれる前に何が変わるかを確認

このツールはシンプルなアイデアから生まれました: *ワークフローは、使い始めることが簡単でなければならない。*

---

## 機能

| 機能 | 説明 |
|------|------|
| `check` | プロジェクト環境の診断 — 項目ごとに pass / warn / fail |
| `init` | 不足しているディレクトリとファイルを非破壊的に生成 |
| `--dry-run` | ファイルシステムを変更せずに生成計画だけを出力 |
| `--target` | 特定のターゲットのみ選択適用（繰り返し使用可能） |
| `--targets` | カンマ区切りで複数のターゲットを一度に適用 |
| `--overwrite` | 必要に応じて既存ファイルを上書き |
| `--backup` | 上書き前に既存ファイルをバックアップ |
| タイポ検出 | `did you mean: docs-report?` ヒントを提供 |
| クロスプラットフォーム | macOS および Windows で動作 |

---

## ワークフロー哲学

bkit-doctor は**フェーズベース開発モデル**を中心に設計されています:

```
PM → PLAN → DESIGN → DO → CHECK → REPORT
```

各フェーズはドキュメントを生成します。各ドキュメントは予測可能な場所に存在します。すべての作業は要件から実装、検証まで追跡可能です。

この構造は AI アシスタントと人間の開発者の両方に安定した共有コンテキストを提供します。曖昧さを減らし、追跡可能性を高め、フェーズ間の引き継ぎを信頼できるものにします。

---

## bkit との関係

> **bkit-doctor は独立したプロジェクトです。公式の bkit プラグインではなく、bkit プロジェクトとの公式な提携関係もありません。**

bkit-doctor は、強力な AI ネイティブ開発ワークフローツールである **bkit からインスピレーションを受けて** 作られました。作者は bkit の紹介資料を通じて構造化された AI コラボレーションの方法論を学び、その知識がこのツールの設計に直接的な影響を与えました。

bkit-doctor は:

- bkit のコードを**含みません**
- bkit なしでも動作します
- bkit チームによる保証やサポートはありません
- bkit 自体を置き換えたり拡張したりするものではなく、bkit スタイルのワークフローを補助するために設計されています

---

## 謝辞

> **bkit プロジェクトに特別な感謝を捧げます。**

bkit の紹介動画を見たことが一つの転機となりました。フェーズベースワークフローの明確さ、Plan → Design → Do → Check の規律、そして AI コラボレーションは両者が構造化されたコンテキストを共有するときに最もうまく機能するというアイデア — これらすべてが bkit-doctor の設計に深く影響しました。

bkit のおかげで、作者は高品質なバイブコーディングを実現することができました。このプロジェクトは、bkit が構造化された AI ネイティブ開発を可能にしてくれたことで存在します。bkit-doctor の目標は、より多くの開発者が同じ体験をより簡単に得られるよう支援することです。

---

## インストール

### 必要条件

- Node.js >= 18.0.0
- npm

### グローバルインストール

```bash
npm install -g bkit-doctor
```

### ソースから実行

```bash
git clone https://github.com/wpfhak/bkit-doctor.git
cd bkit-doctor
npm install
npm link
```

---

## 使い方

```bash
bkit-doctor <command> [options]
```

### クイックスタート

```bash
# プロジェクトの bkit 環境を診断
bkit-doctor check

# 初期化のプレビュー（変更なし）
bkit-doctor init --dry-run

# 全体構造を初期化
bkit-doctor init

# 特定の項目のみ初期化
bkit-doctor init --target hooks-json --target skills-core
```

---

## コマンド

### `check`

現在（または指定した）ディレクトリの bkit 環境を診断します。

```bash
bkit-doctor check [options]

Options:
  -p, --path <dir>   対象ディレクトリ（デフォルト: カレントディレクトリ）
```

---

### `init`

不足しているファイルとディレクトリを生成します。デフォルトで非破壊的 — 明示的に要求しない限り、既存ファイルは上書きされません。

```bash
bkit-doctor init [options]

Options:
  -p, --path <dir>       対象ディレクトリ
  --dry-run              変更なしで計画のみ出力
  --target <name>        特定ターゲットのみ生成（繰り返し可）
  --targets <list>       カンマ区切りターゲットリスト
  --overwrite            既存ファイルの上書きを許可
  --backup               上書き前にバックアップを作成
  --backup-dir <dir>     バックアップ保存ディレクトリ
```

---

## ライセンス

Apache License 2.0 — 詳細は [LICENSE](LICENSE) を参照してください。
