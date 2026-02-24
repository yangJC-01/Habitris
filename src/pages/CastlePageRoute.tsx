import { Link } from 'react-router-dom'
import { CastlePage } from '@/components/castle'
import { AdSlot } from '@/components/common'
import type { CastleLine } from '@/types/tetris'

interface CastlePageRouteProps {
  lines: CastleLine[]
}

export function CastlePageRoute({ lines }: CastlePageRouteProps) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Castle</h2>
          <p className="text-sm text-habitris-muted">완성된 줄이 쌓인 곳</p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-habitris-border bg-habitris-surface px-4 py-2 text-sm text-habitris-text hover:border-habitris-accent"
        >
          ← 습관·테트리스
        </Link>
      </div>
      <CastlePage lines={lines} />
      <div className="mt-6">
        <AdSlot />
      </div>
    </>
  )
}
