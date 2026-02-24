# Cloudflare Pages 배포 가이드

GitHub 저장소를 Cloudflare Pages에 연결하면 **브랜치에 푸시할 때마다 자동으로 빌드·배포**된다. 로컬에서 서버를 돌리지 않고 배포된 URL로 바로 접속할 수 있다.

---

## 1. 사전 준비

- [Cloudflare](https://dash.cloudflare.com/) 계정
- GitHub에 Habitris 코드가 올라가 있어야 함 (예: `https://github.com/yangJC-01/Habitris`)

---

## 2. Cloudflare Pages에 Git 저장소 연결

### 2.1 Pages 진입

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 로그인
2. 왼쪽 메뉴에서 **Workers & Pages** 선택
3. **Create** → **Pages** → **Connect to Git** 선택

참고: [GitHub 연동 공식 문서](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration)

### 2.2 GitHub 연결

1. **Connect Git provider**에서 **GitHub** 선택
2. (처음이면) GitHub 권한 요청 시 **Authorize**로 허용
3. **Select repository**에서 **yangJC-01/Habitris** 선택 (또는 사용하는 저장소 이름)
4. **Begin configuration** 클릭

### 2.3 빌드 설정

| 항목 | 값 |
|------|-----|
| **Project name** | `habitris` (원하면 변경 가능, URL에 사용됨) |
| **Production branch** | `master` (현재 기본 브랜치. 나중에 `main`으로 바꿨으면 `main`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(비워 둠, 저장소 루트가 프로젝트 루트)* |

- **Framework preset**: **None** 또는 **React (Vite)** 가 있으면 선택해도 된다. 위 값과 맞으면 자동 입력된다.

### 2.4 환경 변수 (선택)

**Node 버전** (빌드 실패 시):

1. **Settings** → **Environment variables**
2. **Add variable** (Production)
   - Variable name: `NODE_VERSION`
   - Value: `20`
3. 저장 후 **Retry deployment** 또는 다시 푸시

**광고(AdSense)** (M4):

- 광고를 켜려면 빌드 시 다음 변수를 넣는다.
- `VITE_ADSENSE_CLIENT`: AdSense 클라이언트 ID (예: `ca-pub-xxxxxxxx`)
- `VITE_ADSENSE_SLOT`: (선택) 광고 슬롯 ID. 비우면 자동 형식만 사용.
- 미설정 시 광고 영역은 "광고 영역" 플레이스홀더만 표시되며, 사용성은 동일하다.

### 2.5 저장 후 배포

1. **Save and Deploy** 클릭
2. 첫 배포가 끝나면 **View your site** 링크로 접속  
   - 예: `https://habitris.pages.dev` (프로젝트 이름에 따라 다름)

---

## 3. 이후 사용 방법

- **Production 배포**: `Production branch`(예: `master`)에 `git push`하면 자동으로 빌드 후 배포된다.
- **프리뷰**: 다른 브랜치에 푸시하거나 PR을 만들면 해당 브랜치용 프리뷰 URL이 생긴다.
- 배포 상태는 Cloudflare 대시보드 **Workers & Pages** → 해당 프로젝트 → **Deployments**에서 확인할 수 있다.

---

## 4. 광고 노출 위치

- **메인 페이지**: 테트리스 보드 **아래** (플레이 영역 밖).
- **Castle 페이지**: Castle 목록 **아래**.
- 메인 플레이 영역(습관 목록·테트리스 그리드) 위에는 배치하지 않는다.

---

## 5. 이 프로젝트에서 해 둔 설정

- **`public/_redirects`**: SPA(React Router 등) 사용 시 모든 경로를 `index.html`로 넘기도록 설정해 두었다.
- **빌드**: `npm run build` → 결과물이 `dist/`에 나오며, Vite가 `public/` 내용을 `dist/`로 복사하므로 `_redirects`도 함께 포함된다.

---

## 6. 문제 해결

| 증상 | 확인·조치 |
|------|-----------|
| **빈 화면(아무것도 안 보임)** | **Build output directory**가 반드시 `dist`인지 확인. Cloudflare 대시보드 → 해당 프로젝트 → **Settings** → **Builds & deployments** → **Build configuration** → **Build output directory** = `dist`로 설정 후 **Save** → **Deployments**에서 **Retry deployment** 또는 새 푸시로 재배포. (또는 Root directory가 비어 있고, 출력 디렉터리가 `dist`인지 확인.) |
| 빌드 실패 (Node 버전) | Environment variables에 `NODE_VERSION=20` 추가 후 재배포 |
| 404 (직접 URL 접속) | `public/_redirects`에 `/* /index.html 200` 있는지 확인, 재빌드 |
| GitHub 연결 안 됨 | Cloudflare에서 GitHub 앱 권한 확인, 저장소 접근 허용 여부 확인 |

---

*문서 버전: 1.0 | 2025-02-24*
