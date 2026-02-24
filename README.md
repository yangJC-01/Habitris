# Habitris

습관을 테트리스 형태로 쌓는 미니멀 습관 트래커. 기획은 [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md), 개발 계획은 [docs/PLAN.md](docs/PLAN.md) 참고.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기.

## 빌드

```bash
npm run build
```

산출물은 `dist/`에 생성됨.

## 마일스톤

- **M1** (현재): Phase 0 + 습관 CRUD — 습관 추가·수정·삭제·완료 체크, localStorage 저장, 습관 ↔ 테트리스 블록 타입 매핑
