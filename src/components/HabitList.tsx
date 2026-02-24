import type { Habit } from '@/types/habit'
import { BLOCK_TYPE_LABELS } from '@/lib/blockTypes'

interface HabitListProps {
  habits: Habit[]
  onToggle: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const BLOCK_COLORS: Record<Habit['blockType'], string> = {
  i: 'bg-[var(--block-i)]',
  o: 'bg-[var(--block-o)]',
  t: 'bg-[var(--block-t)]',
  s: 'bg-[var(--block-s)]',
  z: 'bg-[var(--block-z)]',
  j: 'bg-[var(--block-j)]',
  l: 'bg-[var(--block-l)]',
}

export function HabitList({ habits, onToggle, onEdit, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="text-habitris-muted text-sm py-8 text-center">
        습관을 추가해 보세요.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {habits.map((h) => (
        <li
          key={h.id}
          className="flex items-center gap-3 rounded-lg border border-habitris-border bg-habitris-surface px-4 py-3"
        >
          <button
            type="button"
            onClick={() => onToggle(h.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-habitris-border transition hover:border-habitris-accent"
            aria-label={h.completedToday ? '완료 취소' : '완료'}
          >
            {h.completedToday && (
              <span className={`h-4 w-4 rounded-sm ${BLOCK_COLORS[h.blockType]}`} />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <span
              className={
                h.completedToday
                  ? 'text-habitris-muted line-through'
                  : 'text-habitris-text'
              }
            >
              {h.title}
            </span>
            <span className="ml-2 text-xs text-habitris-muted">
              {BLOCK_TYPE_LABELS[h.blockType]}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onEdit(h.id)}
            className="text-habitris-muted text-sm hover:text-habitris-text"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => onDelete(h.id)}
            className="text-habitris-muted text-sm hover:text-red-400"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  )
}
