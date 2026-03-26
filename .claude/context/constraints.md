# Constraints — bkit-doctor

## Hard Constraints
| 항목 | 규칙 |
|------|------|
| 자동 배포 | 절대 금지. 모든 배포는 수동 승인 필요 |
| 코드 유출 | 프로젝트 외부로 소스 코드 전송 금지 |
| 구현 선행 | Plan 또는 Design 없이 코드 작성 불가 |
| 변경 기록 | 모든 구현 변경은 Why를 문서에 기록 |

## Platform Constraints
- **macOS**: `~/01_private/bkit-doctor` 기준
- **Windows**: `D:\00_work\bkit-doctor` 기준
- 경로는 반드시 `path.join()` 사용 (하드코딩 금지)
- Windows PowerShell + macOS zsh 양쪽 동작 필수

## Claude Code Operating Principles
- 항상 팀 모드 사용
- planner-orchestrator가 모든 작업의 진입점
- 구현은 implementer만 담당
- 응답은 짧고 핵심만

## Testing Constraints
- 자동 테스트 스크립트 작성 전, 수동 검증 선행
- CI 연동은 Phase 4 이후
