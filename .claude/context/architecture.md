# Architecture — bkit-doctor

> 상태: 설계 초안 (Phase 1 시작 전)

## Overall Direction
CLI 본체 + Claude Code plugin wrapper 구조.
- **CLI 본체**: Node.js 기반 커맨드라인 도구 (`bkit-doctor`)
- **Claude Code 연동**: `.claude/` 환경 분석 전용 진단 로직

## Module Structure (초안)

```
bkit-doctor/
├── src/
│   ├── cli/           # 진입점, 커맨드 라우팅
│   ├── checks/        # 진단 항목별 모듈
│   │   ├── structure/ # .claude/ 구조 검사
│   │   ├── config/    # settings.json, hooks.json 검사
│   │   └── docs/      # CLAUDE.md, policy 파일 검사
│   ├── reporter/      # 결과 포맷 및 출력
│   └── utils/         # 경로 해석, OS 감지, 파일 읽기
├── tests/
├── docs/              # PDCA 문서 (plan, design, report)
└── package.json
```

## Key Dependencies (후보, Phase 1 설계 시 확정)
- `commander` 또는 `yargs`: CLI 명령 파싱
- `chalk` 또는 `kleur`: 컬러 출력
- `fs-extra`: 파일 시스템
- `cross-env`: 크로스플랫폼 환경변수

## Data Flow
```
사용자 실행
  → CLI 파싱 (cli/)
  → 진단 항목 순회 (checks/)
  → 각 항목: pass / warn / fail 결과 반환
  → reporter가 결과 취합 및 출력
```

## Extension Direction
- Phase 3+: `bkit-doctor fix` — 자동 수정 모듈 추가
- Phase 4+: `bkit-doctor report` — 진단 결과 문서 저장
- 장기: CI 환경 연동 (exit code로 pass/fail 판정)

## Platform Considerations
- 경로 구분자: `path.join()` 사용 강제 (macOS `/`, Windows `\`)
- 홈 디렉터리: `os.homedir()` 사용
- 셸 감지: `process.env.SHELL` / `process.env.COMSPEC`
