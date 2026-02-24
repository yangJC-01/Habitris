import { useEffect, useState, useRef } from 'react'
import type { CastleLine } from '@/types/tetris'
import type { TetrisBlockType } from '@/types/habit'
import { GRID_COLS } from '@/types/tetris'

const CELL_SIZE = 14
const BLOCK_COLORS: Record<TetrisBlockType, string> = {
  i: 'var(--block-i)',
  o: 'var(--block-o)',
  t: 'var(--block-t)',
  s: 'var(--block-s)',
  z: 'var(--block-z)',
  j: 'var(--block-j)',
  l: 'var(--block-l)',
}

interface CastlePageProps {
  lines: CastleLine[]
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export function CastlePage({ lines }: CastlePageProps) {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null)
  const prevLengthRef = useRef(0)

  useEffect(() => {
    if (lines.length > prevLengthRef.current) {
      setAnimateIndex(lines.length - 1)
      const t = setTimeout(() => setAnimateIndex(null), 500)
      prevLengthRef.current = lines.length
      return () => clearTimeout(t)
    }
    prevLengthRef.current = lines.length
  }, [lines.length])

  if (lines.length === 0) {
    return (
      <div className="rounded-xl border border-habitris-border bg-habitris-surface p-8 text-center">
        <p className="text-habitris-muted">완성된 줄이 없어요.</p>
        <p className="mt-2 text-sm text-habitris-muted">테트리스에서 한 줄을 채우면 여기에 쌓여요.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-habitris-muted">
        완성된 줄 {lines.length}개가 성처럼 쌓였어요.
      </p>
      <div className="flex flex-col-reverse gap-1 rounded-xl border border-habitris-border bg-habitris-surface p-4">
        {lines.map((line, index) => (
          <div
            key={`${line.completedAt}-${index}`}
            className={`flex items-center gap-2 rounded border border-habitris-border/50 bg-habitris-bg/50 px-2 py-1 ${animateIndex === index ? 'castle-line-new' : ''}`}
          >
            <div className="flex gap-0.5" style={{ width: GRID_COLS * CELL_SIZE }}>
              {line.cells.map((cell, c) => (
                <div
                  key={c}
                  className="rounded-sm flex-shrink-0"
                  style={{
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    backgroundColor: BLOCK_COLORS[cell],
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-habitris-muted whitespace-nowrap">
              {formatDate(line.completedAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
