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

## 배포 (Cloudflare Pages)

GitHub 저장소를 Cloudflare Pages에 연결하면 브랜치 푸시 시 자동 빌드·배포된다.  
**연결 방법과 빌드 설정**: [docs/CLOUDFLARE_DEPLOY.md](docs/CLOUDFLARE_DEPLOY.md) 참고.

## 마일스톤

- **M1**: Phase 0 + 습관 CRUD — 습관 추가·수정·삭제·완료 체크, localStorage 저장, 습관 ↔ 테트리스 블록 타입 매핑
- **M2**: 테트리스 10×20 그리드, 습관 완료 시 블록 자동 낙하·쌓기, 직접 조작, 줄 완성 → Castle, 네비게이션
- **M3** (현재): UX(줄 제거·Castle 애니메이션, 토스트 피드백), 반응형, 데이터 백업·복원(JSON), 핵심 플로우 테스트 문서([docs/TEST_FLOW.md](docs/TEST_FLOW.md))
