import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-habitris-text">개인정보처리방침</h1>
        <Link
          to="/"
          className="rounded border border-habitris-border px-3 py-1.5 text-sm text-habitris-muted hover:text-habitris-text"
        >
          ← 홈
        </Link>
      </div>

      <div className="space-y-4 text-sm text-habitris-text">
        <p className="text-habitris-muted">최종 수정일: 2025년 2월 24일</p>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">1. 수집하는 정보</h2>
          <p>
            Habitris는 습관·테트리스·Castle 데이터를 사용자 기기 내 저장소(localStorage)에만 저장하며,
            서버로 개인 정보를 전송하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">2. 쿠키 및 광고(Google 애드센스)</h2>
          <p>
            Google은 광고용 쿠키를 사용합니다. Google의 광고 쿠키 사용으로 Google 및 파트너는 이용자가 본 사이트 및
            인터넷의 다른 사이트를 방문한 정보를 바탕으로 광고를 게재할 수 있습니다.
          </p>
          <p>
            제3자 업체(Google 포함)는 쿠키를 사용하여 이용자가 본 웹사이트 또는 다른 웹사이트를 이전에 방문한 기록을
            바탕으로 광고를 게재합니다. 본 사이트에는 Google 애드센스를 비롯한 제3자 광고 업체·광고 네트워크가
            광고를 게재할 수 있습니다.
          </p>
          <p>
            관련 정책 및 업체 정보:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-habitris-accent underline hover:no-underline"
            >
              Google 광고 정책
            </a>
            ,{' '}
            <a
              href="https://www.networkadvertising.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-habitris-accent underline hover:no-underline"
            >
              Network Advertising Initiative
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">3. 맞춤형 광고 거부(Opt-out)</h2>
          <p>
            맞춤형 광고를 원하지 않으시면 다음에서 설정할 수 있습니다.
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-habitris-accent underline hover:no-underline"
              >
                Google 광고 설정(Ads Settings)
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-habitris-accent underline hover:no-underline"
              >
                www.aboutads.info(선택)
              </a>
              — 일부 제3자 업체의 맞춤형 광고용 쿠키 거부
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">4. 정보 보관</h2>
          <p>
            습관·테트리스·Castle 데이터는 사용자 기기 내에서만 보관되며, 삭제 시 해당 기기에서만 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">5. 문의</h2>
          <p>
            개인정보 처리와 관련한 문의는 <Link to="/contact" className="text-habitris-accent underline hover:no-underline">문의하기</Link>를 이용해 주세요.
          </p>
        </section>
      </div>
    </article>
  )
}
