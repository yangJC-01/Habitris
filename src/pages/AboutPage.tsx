import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-habitris-text">소개</h1>
        <Link
          to="/"
          className="rounded border border-habitris-border px-3 py-1.5 text-sm text-habitris-muted hover:text-habitris-text"
        >
          ← 홈
        </Link>
      </div>

      <div className="space-y-4 text-sm text-habitris-text">
        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">Habitris란?</h2>
          <p>
            Habitris는 습관을 테트리스 블록으로 쌓아 보는 미니멀 습관 트래커입니다.
            매일 습관을 완료하면 해당 블록이 테트리스 보드에 떨어지고, 한 줄을 채우면 Castle에 기록됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">특징</h2>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>습관 추가·수정·삭제, 완료 체크</li>
            <li>10×20 테트리스 그리드에 블록 자동 낙하·쌓기</li>
            <li>줄 완성 시 Castle에 저장·조회</li>
            <li>데이터는 사용자 기기 내에만 저장(백업·복원 지원)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">이용 안내</h2>
          <p>
            <Link to="/" className="text-habitris-accent underline hover:no-underline">홈</Link>에서 습관을 관리하고,
            <Link to="/castle" className="text-habitris-accent underline hover:no-underline">Castle</Link>에서 완성한 줄 기록을 볼 수 있습니다.
            이용약관·개인정보처리방침은 하단 링크에서 확인해 주세요.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-medium text-habitris-text">문의</h2>
          <p>
            서비스 관련 문의는 <Link to="/contact" className="text-habitris-accent underline hover:no-underline">문의하기</Link>를 이용해 주세요.
          </p>
        </section>
      </div>
    </article>
  )
}
