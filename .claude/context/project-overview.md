# Project Overview — bkit-doctor

## One-line Description
bkit-doctor는 Claude Code 기반 개발 환경의 설정 상태를 진단하고, bkit 운영 환경의 이상·누락·충돌을 자동으로 탐지하여 수정 가이드를 제공하는 CLI 도구다.

## Problem to Solve
- bkit 운영 환경(`.claude/`, `CLAUDE.md`, hooks, agents, skills)의 설정 오류는 조용히 실패한다.
- 문제가 발생해도 어디서 무엇이 잘못됐는지 파악하기 어렵다.
- 현재는 수동 점검에 의존하고 있으며, 반복적이고 시간이 많이 걸린다.

## Current Goal
**Phase 1 목표:** 프로젝트 구조 + CLI 진입점 + 기본 진단 루프 구현

## In Scope
- `.claude/` 디렉터리 구조 진단
- `CLAUDE.md` / `settings.local.json` / `hooks.json` 존재 여부 및 기본 유효성 검사
- 진단 결과 CLI 출력 (경고 / 오류 / 통과)
- macOS / Windows 양쪽에서 동작하는 크로스플랫폼 CLI

## Out of Scope (현재)
- 자동 수정 기능 (Phase 3 이후)
- Web UI / GUI
- 클라우드 연동
- bkit 외 다른 Claude Code 플러그인 진단

## Success Criteria
- `bkit-doctor check` 실행 시 진단 항목별 pass/warn/fail 결과 출력
- macOS, Windows 양쪽 동작 확인
- 핵심 진단 항목 최소 10개 이상 구현
