import { useEffect } from 'react'
import type { Grid, CurrentPiece } from '@/types/tetris'
import type { TetrisBlockType } from '@/types/habit'
import { GRID_COLS, GRID_ROWS } from '@/types/tetris'
import { TETRIS_BLOCK_TYPES, BLOCK_TYPE_LABELS } from '@/lib/blockTypes'

const CELL_SIZE = 18
const BLOCK_COLORS: Record<TetrisBlockType, string> = {
  i: 'var(--block-i)',
  o: 'var(--block-o)',
  t: 'var(--block-t)',
  s: 'var(--block-s)',
  z: 'var(--block-z)',
  j: 'var(--block-j)',
  l: 'var(--block-l)',
}

interface TetrisBoardProps {
  grid: Grid
  currentPiece: CurrentPiece | null
  lineClearFlash?: boolean
  onMoveLeft: () => void
  onMoveRight: () => void
  onRotate: () => void
  onDrop: () => void
  onSpawn: (blockType: TetrisBlockType) => void
}

export function TetrisBoard({
  grid,
  currentPiece,
  lineClearFlash,
  onMoveLeft,
  onMoveRight,
  onRotate,
  onDrop,
  onSpawn,
}: TetrisBoardProps) {
  const width = GRID_COLS * CELL_SIZE
  const height = GRID_ROWS * CELL_SIZE

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!currentPiece) return
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          onMoveLeft()
          break
        case 'ArrowRight':
          e.preventDefault()
          onMoveRight()
          break
        case 'ArrowUp':
          e.preventDefault()
          onRotate()
          break
        case ' ':
          e.preventDefault()
          onDrop()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentPiece, onMoveLeft, onMoveRight, onRotate, onDrop])

  return (
    <div className="flex flex-col items-center gap-3 max-w-full overflow-x-auto">
      <div
        className={`relative flex-shrink-0 rounded border-2 border-habitris-border bg-habitris-surface transition-shadow ${lineClearFlash ? 'line-clear-flash' : ''}`}
        style={{ width: width + 4, height: height + 4 }}
      >
        {/* 그리드 */}
        <div
          className="absolute inset-0 grid gap-px p-px"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
            left: 2,
            top: 2,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className="rounded-sm"
                style={{
                  width: CELL_SIZE - 1,
                  height: CELL_SIZE - 1,
                  backgroundColor: cell ? BLOCK_COLORS[cell] : 'var(--habitris-border)',
                  opacity: cell ? 1 : 0.3,
                }}
              />
            ))
          )}
        </div>
        {/* 현재 피스 오버레이 */}
        {currentPiece &&
          currentPiece.shape.map(([dr, dc], i) => {
            const r = currentPiece.row + dr
            const c = currentPiece.col + dc
            if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return null
            return (
              <div
                key={i}
                className="absolute rounded-sm border border-white/30"
                style={{
                  left: 2 + c * CELL_SIZE + 1,
                  top: 2 + r * CELL_SIZE + 1,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  backgroundColor: BLOCK_COLORS[currentPiece.blockType],
                }}
              />
            )
          })}
      </div>

      {/* 조작 버튼 */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onMoveLeft}
          className="rounded bg-habitris-surface px-3 py-1.5 text-sm text-habitris-text border border-habitris-border hover:border-habitris-accent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onMoveRight}
          className="rounded bg-habitris-surface px-3 py-1.5 text-sm text-habitris-text border border-habitris-border hover:border-habitris-accent"
        >
          →
        </button>
        <button
          type="button"
          onClick={onRotate}
          className="rounded bg-habitris-surface px-3 py-1.5 text-sm text-habitris-text border border-habitris-border hover:border-habitris-accent"
        >
          ↻
        </button>
        <button
          type="button"
          onClick={onDrop}
          className="rounded bg-habitris-accent px-3 py-1.5 text-sm text-habitris-bg font-medium"
        >
          낙하
        </button>
      </div>

      {/* 직접 배치: 블록 선택 */}
      <div className="flex flex-wrap justify-center gap-1">
        <span className="w-full text-center text-xs text-habitris-muted">직접 배치</span>
        {TETRIS_BLOCK_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onSpawn(t)}
            className="h-8 w-8 rounded border border-habitris-border hover:border-habitris-accent"
            style={{ backgroundColor: BLOCK_COLORS[t] }}
            title={BLOCK_TYPE_LABELS[t]}
          >
            <span className="text-[10px] font-bold text-black/70">{BLOCK_TYPE_LABELS[t]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
