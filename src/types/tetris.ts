import type { TetrisBlockType } from './habit'

/** 그리드 한 셀: 블록 타입 또는 빈칸 */
export type GridCell = TetrisBlockType | null

/** 10×20 그리드 (row 0 = 맨 위) */
export type Grid = GridCell[][]

/** Castle에 쌓인 한 줄 (완성된 줄의 10칸) */
export interface CastleLine {
  cells: TetrisBlockType[]
  completedAt: string
}

/** 현재 조작 중인 피스 */
export interface CurrentPiece {
  blockType: TetrisBlockType
  /** 회전 인덱스 (0~3) */
  rotationIndex: number
  /** 피스의 각 셀의 상대 위치 [dr, dc][] */
  shape: readonly [number, number][]
  /** 그리드 상 왼쪽 상단 기준 (row, col) */
  row: number
  col: number
}

export const GRID_COLS = 10
export const GRID_ROWS = 20
