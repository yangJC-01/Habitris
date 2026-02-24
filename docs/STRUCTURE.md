# Habitris 폴더 구조

소스는 기능·역할별로 나누어 두었다.

---

## `src/`

```
src/
├── components/       # UI 컴포넌트 (기능별)
│   ├── habit/        # 습관 목록·폼·수정 모달
│   ├── tetris/       # 테트리스 그리드·조작
│   ├── castle/       # Castle 페이지 뷰
│   └── common/       # 공용: Toast, AdSlot, DataBackupModal
├── pages/            # 라우트별 페이지
├── hooks/            # useHabits, useTetris
├── lib/              # 유틸·상수
│   ├── tetris/       # 테트로미노 형태 데이터
│   ├── storage.ts    # localStorage 읽기/쓰기
│   ├── backup.ts     # 백업·복원
│   └── blockTypes.ts # 블록 타입 목록·라벨
├── types/            # 타입 정의 (habit, tetris)
├── App.tsx
├── main.tsx
└── index.css
```

---

## import 규칙

- 컴포넌트: `@/components/habit`, `@/components/tetris`, `@/components/castle`, `@/components/common`
- 훅: `@/hooks/useHabits`, `@/hooks/useTetris`
- lib: `@/lib/storage`, `@/lib/backup`, `@/lib/blockTypes`, `@/lib/tetris`
- 타입: `@/types/habit`, `@/types/tetris`

---

*문서 버전: 1.0 | 2025-02-24*
