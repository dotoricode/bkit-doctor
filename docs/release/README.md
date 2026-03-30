# Release Documents

버전별 릴리즈 요약 문서. Git 추적됨. **최대 3개 버전**만 유지.

## 구조

```
release/
├── README.md         ← 이 파일
├── v1.0.0/
│   └── pdca-summary.md
├── v1.1.0/           ← 다음 릴리즈 시 추가
│   └── pdca-summary.md
└── v1.2.0/           ← 3개 초과 시 가장 오래된 버전 삭제
    └── pdca-summary.md
```

## 릴리즈 시 워크플로우

1. 현재 `docs/01-plan`, `02-design`, `03-task`, `04-report` → `docs/archive/vX.Y.Z/` 이동
2. `docs/release/vX.Y.Z/pdca-summary.md` 생성 (릴리즈 요약)
3. `docs/release/` 버전 수가 3개 초과 시 가장 오래된 버전 디렉터리 삭제
4. `docs/release/` 변경사항 git commit

> `docs/archive/` 는 gitignore 처리됨 — 로컬에만 보존
