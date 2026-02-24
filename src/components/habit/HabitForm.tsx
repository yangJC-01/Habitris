import { useState, useEffect } from 'react'
import type { HabitInput } from '@/types/habit'
import { TETRIS_BLOCK_TYPES, BLOCK_TYPE_LABELS } from '@/lib/blockTypes'

interface HabitFormProps {
  initial?: HabitInput | null
  onSubmit: (input: HabitInput) => void
  onCancel?: () => void
}

const BLOCK_COLORS: Record<string, string> = {
  i: 'var(--block-i)',
  o: 'var(--block-o)',
  t: 'var(--block-t)',
  s: 'var(--block-s)',
  z: 'var(--block-z)',
  j: 'var(--block-j)',
  l: 'var(--block-l)',
}

export function HabitForm({
  initial,
  onSubmit,
  onCancel,
}: HabitFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [blockType, setBlockType] = useState(initial?.blockType ?? 'i')

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setBlockType(initial.blockType)
    }
  }, [initial])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    onSubmit({ title: t, blockType: blockType as HabitInput['blockType'] })
    setTitle('')
    setBlockType('i')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="habit-title" className="mb-1 block text-sm text-habitris-muted">
          습관 이름
        </label>
        <input
          id="habit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 아침 물 마시기"
          className="w-full rounded-lg border border-habitris-border bg-habitris-surface px-3 py-2 text-habitris-text placeholder:text-habitris-muted focus:border-habitris-accent focus:outline-none"
          autoFocus
        />
      </div>
      <div>
        <span className="mb-2 block text-sm text-habitris-muted">블록 타입 (테트리스 색)</span>
        <div className="flex flex-wrap gap-2">
          {TETRIS_BLOCK_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBlockType(t)}
              className="flex h-9 w-9 items-center justify-center rounded border-2 transition"
              style={{
                borderColor: blockType === t ? 'var(--habitris-accent)' : 'var(--habitris-border)',
                backgroundColor: BLOCK_COLORS[t],
              }}
              title={BLOCK_TYPE_LABELS[t]}
            >
              <span className="text-xs font-medium text-black/70">
                {BLOCK_TYPE_LABELS[t]}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-habitris-accent px-4 py-2 text-sm font-medium text-habitris-bg hover:opacity-90"
        >
          {initial ? '저장' : '추가'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-habitris-border px-4 py-2 text-sm text-habitris-muted hover:text-habitris-text"
          >
            취소
          </button>
        )}
      </div>
    </form>
  )
}
