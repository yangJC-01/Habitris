import { useState } from 'react'
import { useHabits } from '@/hooks/useHabits'
import { HabitList } from '@/components/HabitList'
import { HabitForm } from '@/components/HabitForm'
import { HabitEditModal } from '@/components/HabitEditModal'

export default function App() {
  const { habits, add, update, remove, toggleToday } = useHabits()
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingHabit = editingId ? habits.find((h) => h.id === editingId) : null

  return (
    <div className="min-h-screen bg-habitris-bg text-habitris-text">
      <header className="border-b border-habitris-border px-4 py-4">
        <h1 className="text-xl font-semibold tracking-tight">Habitris</h1>
        <p className="text-sm text-habitris-muted">습관을 완료하면 테트리스 블록이 쌓여요</p>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {adding ? (
          <div className="mb-6 rounded-xl border border-habitris-border bg-habitris-surface p-4">
            <HabitForm
              onSubmit={(input) => {
                add(input)
                setAdding(false)
              }}
              onCancel={() => setAdding(false)}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mb-6 w-full rounded-lg border border-dashed border-habitris-border py-3 text-habitris-muted transition hover:border-habitris-accent hover:text-habitris-text"
          >
            + 습관 추가
          </button>
        )}

        <HabitList
          habits={habits}
          onToggle={toggleToday}
          onEdit={setEditingId}
          onDelete={remove}
        />
      </main>

      {editingHabit && (
        <HabitEditModal
          habit={editingHabit}
          onSave={(id, input) => update(id, input)}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  )
}
