# Output Policy — bkit-doctor

## Mandatory Rules
- 응답은 짧고 핵심만. 서술형 설명 최소화.
- 실행 명령어는 요청하지 않으면 출력하지 않는다.
- 이미 설명한 내용을 반복하지 않는다.
- 코드 블록은 변경된 부분만 표시 (전체 파일 출력 금지).
- 에러는 핵심 1~2줄만 인용.

## Real-time Status Format (고정)
```
Phase: {name}
Done: {항목}
In Progress: {항목}
Next: {행동}
```

## Agent Progress Format (고정)
```
Agent: {name} — {현재 태스크 한 줄}
```

## When Long Output Is Acceptable
- 설계 문서 초안 작성 시
- 사용자가 명시적으로 전체 내용 요청 시
- 검증 결과 전체 목록 출력 시
