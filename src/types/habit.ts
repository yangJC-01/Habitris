/** 테트리스 블록 타입 (습관 ↔ 블록 매핑) */
export type TetrisBlockType = 'i' | 'o' | 't' | 's' | 'z' | 'j' | 'l'

export interface Habit {
  id: string
  title: string
  /** 블록 타입 → 테트리스 색/모양 매핑 */
  blockType: TetrisBlockType
  /** 오늘 완료 여부 */
  completedToday: boolean
  /** 마지막 완료 날짜 (YYYY-MM-DD) */
  lastCompletedAt: string | null
  createdAt: string
  updatedAt: string
}

export type HabitInput = Pick<Habit, 'title' | 'blockType'>
