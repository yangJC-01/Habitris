import { useState } from 'react'
import type { Habit } from '@/types/habit'
import type { Grid, CurrentPiece } from '@/types/tetris'
import { useHabits } from '@/hooks/useHabits'
import { HabitList, HabitForm, HabitEditModal } from '@/components/habit'
import { TetrisBoard } from '@/components/tetris'
import { AdSlot } from '@/components/common'
import { Link } from 'react-router-dom'

interface MainPageProps {
  grid: Grid
  currentPiece: CurrentPiece | null
  lineClearFlash?: boolean
  addPieceFromHabit: (blockType: Habit['blockType']) => void
  moveLeft: () => void
  moveRight: () => void
  moveDown: () => void
  rotate: () => void
  drop: () => void
  spawnPiece: (blockType: Habit['blockType']) => void
}

export function MainPage({
  grid,
  currentPiece,
  lineClearFlash,
  addPieceFromHabit,
  moveLeft,
  moveRight,
  moveDown,
  rotate,
  drop,
  spawnPiece,
}: MainPageProps) {
  const { habits, add, update, remove, toggleToday } = useHabits()
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const editingHabit = editingId ? habits.find((h) => h.id === editingId) : null

  const handleToggle = (id: string) => {
    const habit = habits.find((h) => h.id === id)
    if (habit && !habit.completedToday) addPieceFromHabit(habit.blockType)
    toggleToday(id)
  }

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* 좌측: 습관 영역 (데스크톱에서 고정 폭) */}
        <div className="min-w-0 shrink-0 lg:w-80">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">습관 · 테트리스</h2>
              <p className="text-sm text-habitris-muted">완료하면 블록이 쌓이고, 한 줄을 채우면 Castle로</p>
            </div>
            <Link
              to="/castle"
              className="shrink-0 rounded-lg border border-habitris-border bg-habitris-surface px-4 py-2 text-sm text-habitris-text hover:border-habitris-accent"
            >
              Castle
            </Link>
          </div>

          {adding ? (
            <div className="mb-4 rounded-xl border border-habitris-border bg-habitris-surface p-4">
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
              className="mb-4 w-full rounded-lg border border-dashed border-habitris-border py-3 text-habitris-muted transition hover:border-habitris-accent hover:text-habitris-text"
            >
              + 습관 추가
            </button>
          )}

          <HabitList
            habits={habits}
            onToggle={handleToggle}
            onEdit={setEditingId}
            onDelete={remove}
          />
        </div>

        {/* 우측: 테트리스 (데스크톱에서 나머지 공간) */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-center">
            <TetrisBoard
              grid={grid}
              currentPiece={currentPiece}
              lineClearFlash={lineClearFlash}
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onMoveDown={moveDown}
              onRotate={rotate}
              onDrop={drop}
              onSpawn={spawnPiece}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <AdSlot />
      </div>

      {editingHabit && (
        <HabitEditModal
          habit={editingHabit}
          onSave={(id, input) => update(id, input)}
          onClose={() => setEditingId(null)}
        />
      )}
    </>
  )
}
