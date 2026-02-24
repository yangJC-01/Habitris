import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-habitris-border px-4 py-4">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-habitris-muted">
        <Link to="/privacy" className="hover:text-habitris-text">
          개인정보처리방침
        </Link>
        <Link to="/terms" className="hover:text-habitris-text">
          이용약관
        </Link>
        <Link to="/contact" className="hover:text-habitris-text">
          문의하기
        </Link>
        <Link to="/about" className="hover:text-habitris-text">
          소개
        </Link>
      </nav>
    </footer>
  )
}
