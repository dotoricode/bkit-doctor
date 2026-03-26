# Product Goals — bkit-doctor

## Product Objective
bkit 사용자가 운영 환경의 문제를 즉시 파악하고, 빠르게 수정 방향을 얻을 수 있도록 한다.

## User Value
- 환경 진단 시간: 수동 30분 → CLI 1분
- 설정 오류를 조용히 넘기지 않고 명확하게 표면화
- 신규 프로젝트 온보딩 시 체크리스트 역할

## This Phase (Phase 1) Focus
- CLI 진입점 및 기본 구조 확립
- 핵심 진단 모듈 설계 및 최소 구현
- 크로스플랫폼 동작 확인

## Not Doing Now
- 자동 수정 (fix 기능)
- 네트워크 기반 진단
- 플러그인 마켓플레이스 연동
- GUI

## Definition of Done (Phase 1)
- `bkit-doctor check` 명령이 동작함
- 진단 결과가 항목별로 출력됨
- Windows + macOS 모두 테스트 통과
