# Design: phase-01-cli-foundation

**Date:** 2026-03-26
**Status:** approved
**Plan Ref:** `docs/01-plan/phase-01-cli-foundation.plan.md`

---

## 1. Background
CLI 진입점이 없으면 어떤 명령도 실행 불가. Phase 1은 구조 확립이 목적 — 기능보다 뼈대 우선.

## 2. Changed Structure

```
bkit-doctor/           (신규)
├── package.json
├── src/
│   ├── cli/
│   │   ├── index.js          # 진입점: commander 설정, 명령 등록
│   │   └── commands/
│   │       ├── version.js    # version 명령
│   │       ├── doctor.js     # doctor 명령 (stub)
│   │       └── init.js       # init 명령 (stub)
│   └── utils/
│       └── platform.js       # OS 감지, 경로 유틸
└── docs/                     # 이미 존재
```

## 3. Impact Scope
신규 파일만 생성. 기존 파일 영향 없음.

## 4. Alternatives Compared

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| A. commander.js | 가볍고 CJS/ESM 모두 지원, 문서 풍부 | 외부 의존성 1개 추가 | ✓ |
| B. yargs | 기능 풍부 | 무겁고 Phase 1 불필요 | ✗ |
| C. 직접 process.argv 파싱 | 의존성 없음 | 반복 구현 비용 큼 | ✗ |

## 5. Decision
**선택: commander.js**
**Why:** 가장 가볍고 CJS 모드에서 안정적으로 동작. Windows npm 환경에서도 추가 설정 없이 bin 연결 가능. Phase 3의 check 확장도 명령 추가만으로 대응 가능한 구조.

## 6. Verification
- `node src/cli/index.js --version` → 버전 문자열 출력
- `node src/cli/index.js doctor` → stub 메시지 출력
- `node src/cli/index.js init` → stub 메시지 출력
- `node src/cli/index.js --help` → 명령 목록 출력
- `node src/utils/platform.js` → OS 정보 출력 (수동 확인)
