import { Link } from 'react-router-dom'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string | undefined

export function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-habitris-text">문의하기</h1>
        <Link
          to="/"
          className="rounded border border-habitris-border px-3 py-1.5 text-sm text-habitris-muted hover:text-habitris-text"
        >
          ← 홈
        </Link>
      </div>

      <div className="space-y-4 text-sm text-habitris-text">
        <p>
          Habitris 서비스·개인정보처리방침·이용약관에 대한 문의를 보내 주실 수 있습니다.
        </p>
        {CONTACT_EMAIL ? (
          <p>
            이메일:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-habitris-accent underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p className="text-habitris-muted">
            운영자 연락처는 서비스 소개 페이지(GitHub 등)를 참고해 주세요.
            문의 시 사용 중인 환경(브라우저, 기기)을 함께 알려 주시면 답변에 도움이 됩니다.
          </p>
        )}
      </div>
    </article>
  )
}
