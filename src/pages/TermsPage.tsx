import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-habitris-text">이용약관</h1>
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
          <h2 className="mb-2 text-base font-medium text-habitris-text">1. 서비스의 이용</h2>
          <p>
            Habitris(이하 “서비스”)는 습관 추적 및 테트리스 형태의 기록 기능을 제공합니다.
            이용자는 서비스를 무료로 이용할 수 있으며, 서비스 내 광고가 노출될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">2. 데이터</h2>
          <p>
            습관·테트리스·Castle 데이터는 이용자 기기 내에만 저장됩니다. 데이터 백업·복원은 이용자 책임 하에 진행해 주세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">3. 변경 및 중단</h2>
          <p>
            서비스 내용·정책은 사전 공지 없이 변경될 수 있으며, 서비스 제공이 일시적 또는 영구적으로 중단될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">4. 문의</h2>
          <p>
            이용약관 관련 문의는 <Link to="/contact" className="text-habitris-accent underline hover:no-underline">문의하기</Link>를 이용해 주세요.
          </p>
        </section>
      </div>
    </article>
  )
}
