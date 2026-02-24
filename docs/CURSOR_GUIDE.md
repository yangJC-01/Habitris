# Habitris · Cursor 가이드

이 프로젝트에서 Cursor의 **Rules**, **Skills**, **Subagent**, **Hooks**, **익스텐션/플러그인**을 어떻게 쓰고, 에이전트 역할을 어떻게 나눌지 정리한 가이드다.

---

## 0. 라이선스 및 환경

- **라이선스**: 이 프로젝트는 **MIT License**를 사용한다. 소스 사용·수정·재배포가 자유롭고, 저작권 표시와 라이선스 문구만 유지하면 된다. `LICENSE` 파일을 수정하지 말고, 새 저장소 포크/복제 시에도 동일 라이선스를 두는 것을 권장한다.
- **Node 버전**: 로컬·CI 동일 버전을 쓰려면 `.nvmrc`에 명시된 버전을 사용한다. (예: `nvm use` 또는 Node 20 LTS)

---

## 1. 디렉터리 구조

```
Habitris/
├── .cursor/
│   ├── rules/          # 프로젝트 규칙 (.mdc)
│   ├── skills/         # 프로젝트 전용 스킬
│   ├── hooks.json      # 훅 설정
│   └── plans/          # Cursor가 저장하는 플랜
├── .vscode/            # launch.json, extensions.json
├── .nvmrc              # Node 버전 (권장)
├── LICENSE             # MIT License
├── docs/
│   ├── PROJECT_SPEC.md
│   ├── PLAN.md
│   ├── CURSOR_GUIDE.md  # 이 파일
│   └── CLOUDFLARE_DEPLOY.md  # Cloudflare Pages Git 연결·배포
└── ...
```

---

## 2. Rules (규칙)

- **위치**: `.cursor/rules/*.mdc`
- **역할**: 파일/작업 유형에 따라 적용할 규칙을 나눈다.
- **에이전트 역할 분리**: 열린 파일(globs)에 따라 **디자이너 에이전트** vs **서버 에이전트** 규칙이 자동 적용되도록 설정해 두었다.

| 규칙 파일 | 적용 대상 (globs) | 용도 |
|-----------|-------------------|------|
| `designer.mdc` | UI/스타일/테트리스 시각 | 디자인·UI·애니메이션·반응형 |
| `server.mdc` | API·DB·백엔드·인프라 | 서버·DB·인증·광고 연동 |
| `habitris-conventions.mdc` | 전체 | 프로젝트 공통 컨벤션 (alwaysApply) |

새 규칙 추가 시: 한 규칙당 한 가지 관심사, 50줄 이내 권장.

---

## 3. Skills (스킬)

- **개인 스킬**: `~/.cursor/skills/` — 내 모든 프로젝트에서 사용
- **프로젝트 스킬**: `.cursor/skills/<skill-name>/` — 이 저장소에서만 사용, 팀과 공유

**Habitris에서 쓸 만한 스킬 예시**

- 습관 트래커/테트리스 도메인 가이드
- Play Store 배포 체크리스트
- 광고 SDK 연동 패턴 (예: AdMob)

스킬은 `SKILL.md` + YAML frontmatter(`name`, `description`) 구조. description에 **무엇을(WHAT)** 하고 **언제(WHEN)** 쓰는지 적어 두면 에이전트가 잘 골라 쓴다.

---

## 4. Subagent (서브에이전트)

- Cursor 2.4+ 에서 복잡한 작업을 **병렬/전문** 처리할 때 사용.
- **용도**: 코드베이스 탐색(explore), 셸 실행(shell), 일반 다단계 작업(generalPurpose) 등.

**사용 예**

- “프론트엔드와 백엔드 동시에 조사해줘” → explore / generalPurpose 병렬 실행
- “이 스크립트 실행하고 결과만 정리해줘” → shell

에이전트에게 “서브에이전트 써서 OO 부분만 맡겨줘”라고 요청하면 된다.

---

## 5. Hooks (훅)

- **위치**: 프로젝트는 `.cursor/hooks.json` (사용자 전역: `~/.cursor/hooks.json`)
- **역할**: 에이전트 워크플로 특정 시점에 커스텀 스크립트 실행 (예: 도구 사용 전/후, 세션 시작/종료)

**훅 타입 예**: `preToolUse`, `postToolUse`, `beforeSubmitPrompt`, `sessionStart`, `sessionEnd`, `stop`  
- Exit code `2` → 해당 액션 차단, `0` → 진행

Claude Code 설정(`.claude/settings.json`)의 훅을 쓰면 Cursor가 이름을 매핑해서 불러올 수 있다.

---

## 6. 익스텐션 / 플러그인

- Cursor는 VS Code 기반이므로 VS Code 익스텐션 사용 가능.
- **권장**: 프로젝트에 `.vscode/extensions.json`에 “권장 익스텐션” 목록을 두고, 팀원/에이전트가 참고하도록 한다.

**앱 실행·디버깅 관련**
- **브레이크포인트 디버깅**: Chrome용은 **내장**이라 익스텐션 불필요. Edge로 디버깅할 때만 “Debugger for Microsoft Edge” 등 Edge 디버거 익스텐션을 쓰면 된다.
- **에이전트가 브라우저로 앱 인식·테스트**: **MCP 서버**가 필요하다. Cursor 설정 > Features > MCP에서 **cursor-ide-browser**를 사용하도록 하면 된다. 별도 브라우저용 익스텐션은 필요하지 않다.

기타: React/TypeScript, 린트/포맷터, 테스트, 디자인 시스템 관련 익스텐션 등.  
권장 목록은 `.vscode/extensions.json`에 두었으며, 스택 결정 후 항목 추가하면 된다.

---

## 7. 에이전트 역할 나누기 (디자이너 vs 서버)

- **Rules로 분리**: `designer.mdc`는 UI/프론트/테트리스 시각 관련 파일(`globs`)에, `server.mdc`는 API·서버·DB 관련 파일에 적용.
- **채팅에서 명시**: “지금은 디자인/UI만 손봐줘”, “이건 서버/API 관점으로만 봐줘”처럼 역할을 지정하면 해당 규칙과 맥락이 잘 맞춰진다.
- **Subagent 활용**: 한 번에 “디자인 쪽 조사” + “서버 쪽 조사”를 각각 서브에이전트로 돌리면 역할이 더 분리된 결과를 얻을 수 있다.

---

## 8. 앱 실행 및 디버깅 (Run & Debug)

Cursor는 **에이전트가 앱을 실행하고 브라우저에서 인식·동작 확인**하는 흐름과, **브레이크포인트 디버깅**을 둘 다 지원한다.

### 8.1 에이전트가 앱 실행 후 브라우저로 인식·테스트 (MCP Browser)

- **역할**: Composer(에이전트)가 dev 서버를 띄우고, 브라우저로 localhost에 접속한 뒤 DOM을 읽고 클릭/입력으로 동작을 확인·디버깅할 수 있다.
- **조건**: Cursor에 **cursor-ide-browser** MCP 서버가 켜져 있어야 한다. (설정 > Features > MCP에서 확인)
- **흐름**  
  1. 에이전트에게 예: “지금 앱 실행해서 브라우저로 열고, 습관 추가 버튼 눌러봐” 요청  
  2. 에이전트가 터미널에서 `npm run dev` 실행  
  3. `browser_navigate`로 `http://localhost:5173` 이동  
  4. `browser_snapshot`으로 페이지 구조·요소 인식  
  5. `browser_click`, `browser_type` 등으로 상호작용 후 동작 확인  
- **주의**:  
  - 먼저 `browser_navigate` → 그 다음 `browser_lock` → 작업 후 `browser_unlock` 순서 지키기  
  - 상호작용 전에 `browser_snapshot`으로 요소 참조를 얻은 뒤 사용  
- **프로파일링**: `browser_profile_start` / `browser_profile_stop`으로 CPU 프로파일을 떼서 성능 이슈 분석 가능 (결과는 `~/.cursor/browser-logs/`)

즉, “Cursor가 스스로 어플 실행하고 인식해서 디버깅”하는 기능은 **MCP Browser(cursor-ide-browser)** 로 가능하다. 에이전트가 dev 서버 실행 → 브라우저로 접속 → 스냅샷·클릭·입력으로 화면을 인식하고 동작을 검증한다.

### 8.2 브레이크포인트 디버깅 (VS Code 디버거)

- **역할**: 코드에 breakpoint를 걸고, 브라우저에서 앱을 띄운 뒤 변수·호출 스택을 보면서 디버깅.
- **설정**: 프로젝트에 `.vscode/launch.json`이 있으면 **F5** 또는 **Run and Debug** 패널에서 “Launch Habitris”로 실행한다.
- **사용 순서**  
  1. 터미널에서 `npm run dev` 실행 (이미 떠 있어도 됨)  
  2. 소스에 breakpoint 설정  
  3. F5로 “Launch Habitris” 실행 → Chrome/Edge가 localhost:5173으로 열리며 디버거가 붙음  
- **Chrome** 디버깅은 VS Code/Cursor **내장 디버거**로 동작해 별도 익스텐션 없이 사용 가능하다. **Edge**로 띄우려면 “Launch Habitris (Edge)”를 쓰면 되며, `msedge` 타입이 동작하지 않으면 익스텐션 “Debugger for Microsoft Edge” 설치를 고려한다.

### 8.3 정리

| 방식 | 용도 | 필요 설정 |
|------|------|-----------|
| **MCP Browser** | 에이전트가 앱 실행 후 브라우저에서 화면 인식·클릭·입력으로 테스트·디버깅 | cursor-ide-browser MCP 활성화 |
| **launch.json** | 개발자가 브레이크포인트로 코드 단계 실행·변수 확인 | `.vscode/launch.json` (프로젝트에 포함됨) |

---

## 9. 빠른 체크리스트

- [x] `.cursor/rules/`에 designer / server / habitris-conventions 적용 여부 확인
- [x] 앱 실행·디버깅: MCP Browser 가이드 및 `.vscode/launch.json` 정리
- [x] 필요 시 `.cursor/skills/`에 Habitris 전용 스킬 추가
- [x] 훅 쓰려면 `.cursor/hooks.json` 작성
- [x] 익스텐션은 `.vscode/extensions.json`에 권장 목록 기재
- [ ] 작업할 때 “디자이너/서버 중 어떤 역할로?” 한 번만 말해 주면 규칙이 맞춰 적용됨 *(사용 시 참고)*

---

*문서 버전: 1.0 | 2025-02-24*
