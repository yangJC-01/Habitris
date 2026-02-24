import { useState, useEffect, useCallback } from 'react'
import type { Habit, HabitInput } from '@/types/habit'
import { loadHabits, saveHabits } from '@/lib/storage'
import { TETRIS_BLOCK_TYPES } from '@/lib/blockTypes'

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function parseHabits(json: string): Habit[] {
  try {
    const raw = JSON.parse(json) as unknown[]
    return raw.map((item: unknown) => {
      const o = item as Record<string, unknown>
      return {
        id: String(o.id ?? ''),
        title: String(o.title ?? ''),
        blockType: (TETRIS_BLOCK_TYPES.includes((o.blockType as Habit['blockType']) ?? '') ? o.blockType : 'i') as Habit['blockType'],
        completedToday: Boolean(o.completedToday),
        lastCompletedAt: o.lastCompletedAt ? String(o.lastCompletedAt) : null,
        createdAt: String(o.createdAt ?? ''),
        updatedAt: String(o.updatedAt ?? ''),
      } as Habit
    }).filter((h) => h.id && h.title)
  } catch {
    return []
  }
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() =>
    parseHabits(loadHabits())
  )

  const persist = useCallback((next: Habit[]) => {
    setHabits(next)
    saveHabits(JSON.stringify(next))
  }, [])

  useEffect(() => {
    const raw = loadHabits()
    setHabits(parseHabits(raw))
  }, [])

  const add = useCallback(
    (input: HabitInput) => {
      const now = new Date().toISOString()
      const newHabit: Habit = {
        id: genId(),
        title: input.title.trim() || '새 습관',
        blockType: input.blockType ?? 'i',
        completedToday: false,
        lastCompletedAt: null,
        createdAt: now,
        updatedAt: now,
      }
      persist([...habits, newHabit])
      return newHabit
    },
    [habits, persist]
  )

  const update = useCallback(
    (id: string, patch: Partial<Pick<Habit, 'title' | 'blockType'>>) => {
      const next = habits.map((h) =>
        h.id === id
          ? {
              ...h,
              ...patch,
              updatedAt: new Date().toISOString(),
            }
          : h
      )
      persist(next)
    },
    [habits, persist]
  )

  const remove = useCallback(
    (id: string) => {
      persist(habits.filter((h) => h.id !== id))
    },
    [habits, persist]
  )

  const toggleToday = useCallback(
    (id: string) => {
      const today = todayStr()
      const next = habits.map((h) => {
        if (h.id !== id) return h
        const completedToday = !h.completedToday
        return {
          ...h,
          completedToday,
          lastCompletedAt: completedToday ? today : h.lastCompletedAt,
          updatedAt: new Date().toISOString(),
        }
      })
      persist(next)
    },
    [habits, persist]
  )

  return { habits, add, update, remove, toggleToday }
}
