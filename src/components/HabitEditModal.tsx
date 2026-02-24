import type { Habit } from '@/types/habit'
import { HabitForm } from './HabitForm'

interface HabitEditModalProps {
  habit: Habit
  onSave: (id: string, input: { title: string; blockType: Habit['blockType'] }) => void
  onClose: () => void
}

export function HabitEditModal({ habit, onSave, onClose }: HabitEditModalProps) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="습관 수정"
    >
      <div
        className="w-full max-w-md rounded-xl border border-habitris-border bg-habitris-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-medium text-habitris-text">습관 수정</h2>
        <HabitForm
          initial={{ title: habit.title, blockType: habit.blockType }}
          onSubmit={(input) => {
            onSave(habit.id, input)
            onClose()
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}
