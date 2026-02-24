import { useState, useCallback, useEffect } from 'react'
import type { TetrisBlockType } from '@/types/habit'
import type { Grid, CastleLine, CurrentPiece } from '@/types/tetris'
import { GRID_COLS, GRID_ROWS } from '@/types/tetris'
import { loadGrid, saveGrid, loadCastle, saveCastle } from '@/lib/storage'
import { TETROMINO_SHAPES } from '@/lib/tetris'
import { TETRIS_BLOCK_TYPES } from '@/lib/blockTypes'

function emptyGrid(): Grid {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => null)
  )
}

function parseGrid(json: string): Grid | null {
  try {
    if (!json) return null
    const raw = JSON.parse(json) as unknown
    if (!Array.isArray(raw) || raw.length !== GRID_ROWS) return null
    const grid: Grid = []
    for (let r = 0; r < GRID_ROWS; r++) {
      const row = raw[r]
      if (!Array.isArray(row) || row.length !== GRID_COLS) return null
      grid.push(
        row.map((c: unknown) =>
          c !== null && TETRIS_BLOCK_TYPES.includes(c as TetrisBlockType)
            ? (c as TetrisBlockType)
            : null
        )
      )
    }
    return grid
  } catch {
    return null
  }
}

function parseCastle(json: string): CastleLine[] {
  try {
    const raw = JSON.parse(json) as unknown[]
    return raw.map((line: unknown) => {
      const o = line as { cells?: unknown[]; completedAt?: string }
      const cells = Array.isArray(o.cells)
        ? o.cells
            .slice(0, GRID_COLS)
            .map((c) =>
              TETRIS_BLOCK_TYPES.includes(c as TetrisBlockType) ? c : 'i'
            ) as TetrisBlockType[]
        : []
      return {
        cells: cells.length === GRID_COLS ? cells : Array(GRID_COLS).fill('i'),
        completedAt: typeof o.completedAt === 'string' ? o.completedAt : new Date().toISOString(),
      }
    })
  } catch {
    return []
  }
}

function cloneGrid(grid: Grid): Grid {
  return grid.map((row) => [...row])
}

function canPlace(
  grid: Grid,
  _blockType: TetrisBlockType,
  shape: readonly [number, number][],
  row: number,
  col: number
): boolean {
  for (const [dr, dc] of shape) {
    const r = row + dr
    const c = col + dc
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return false
    if (grid[r][c] !== null) return false
  }
  return true
}

function mergePiece(
  grid: Grid,
  blockType: TetrisBlockType,
  shape: readonly [number, number][],
  row: number,
  col: number
): Grid {
  const next = cloneGrid(grid)
  for (const [dr, dc] of shape) {
    const r = row + dr
    const c = col + dc
    if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS) next[r][c] = blockType
  }
  return next
}

function findDropRow(
  grid: Grid,
  blockType: TetrisBlockType,
  shape: readonly [number, number][],
  startCol: number
): number {
  let row = 0
  while (row < GRID_ROWS && canPlace(grid, blockType, shape, row, startCol)) row++
  return Math.max(0, row - 1)
}

function getFullRows(grid: Grid): number[] {
  const full: number[] = []
  for (let r = 0; r < GRID_ROWS; r++) {
    if (grid[r].every((c) => c !== null)) full.push(r)
  }
  return full
}

function removeRows(grid: Grid, rows: number[]): { grid: Grid; removedLines: TetrisBlockType[][] } {
  const removedLines: TetrisBlockType[][] = rows
    .sort((a, b) => a - b)
    .map((r) => grid[r].slice() as TetrisBlockType[])
  const set = new Set(rows)
  const kept = grid.filter((_, r) => !set.has(r))
  const emptyRows = Array.from({ length: rows.length }, () =>
    Array(GRID_COLS).fill(null) as Grid[0]
  )
  return { grid: [...emptyRows, ...kept], removedLines }
}

interface PlacementCandidate {
  grid: Grid
  removedLines: TetrisBlockType[][]
  rotationIndex: number
  col: number
}

function evaluatePlacement(
  grid: Grid,
  blockType: TetrisBlockType,
  rotationIndex: number,
  shape: readonly [number, number][],
  col: number
): PlacementCandidate | null {
  const row = findDropRow(grid, blockType, shape, col)
  // 유효한 위치가 없으면 스킵
  if (row < 0 || !canPlace(grid, blockType, shape, row, col)) return null

  const placed = mergePiece(grid, blockType, shape, row, col)
  const full = getFullRows(placed)
  const { grid: after, removedLines } =
    full.length > 0 ? removeRows(placed, full) : { grid: placed, removedLines: [] }

  // 간단한 평가 지표: 줄 개수, 전체 높이, 구멍 수
  let aggregateHeight = 0
  let holes = 0
  for (let c = 0; c < GRID_COLS; c++) {
    let seenBlock = false
    for (let r = 0; r < GRID_ROWS; r++) {
      const cell = after[r][c]
      if (cell) {
        if (!seenBlock) {
          aggregateHeight += GRID_ROWS - r
          seenBlock = true
        }
      } else if (seenBlock) {
        holes++
      }
    }
  }

  ;(after as any)._score = { lines: full.length, aggregateHeight, holes }

  return { grid: after, removedLines, rotationIndex, col }
}

export interface UseTetrisOptions {
  onLinesCleared?: (count: number) => void
}

export function useTetris(options?: UseTetrisOptions) {
  const onLinesCleared = options?.onLinesCleared
  const [grid, setGrid] = useState<Grid>(() => {
    const saved = parseGrid(loadGrid())
    return saved ?? emptyGrid()
  })
  const [castle, setCastle] = useState<CastleLine[]>(() =>
    parseCastle(loadCastle())
  )
  const [currentPiece, setCurrentPiece] = useState<CurrentPiece | null>(null)

  useEffect(() => {
    saveGrid(JSON.stringify(grid))
  }, [grid])
  useEffect(() => {
    saveCastle(JSON.stringify(castle))
  }, [castle])

  const addClearedLinesToCastle = useCallback((lines: TetrisBlockType[][]) => {
    const now = new Date().toISOString()
    setCastle((prev) => [
      ...prev,
      ...lines.map((cells) => ({ cells, completedAt: now })),
    ])
  }, [])

  /** 습관 완료 시 호출: 해당 블록을 그리드에 자동 배치 후 줄 완성 시 Castle 반영 */
  const addPieceFromHabit = useCallback(
    (blockType: TetrisBlockType) => {
      const rotations = TETROMINO_SHAPES[blockType]
      let best: PlacementCandidate | null = null
      let bestScore:
        | {
            lines: number
            aggregateHeight: number
            holes: number
          }
        | null = null

      for (let ri = 0; ri < rotations.length; ri++) {
        const shape = rotations[ri]
        for (let col = 0; col < GRID_COLS; col++) {
          const candidate = evaluatePlacement(grid, blockType, ri, shape, col)
          if (!candidate) continue

          const score = (candidate.grid as any)._score as {
            lines: number
            aggregateHeight: number
            holes: number
          }

          if (!best || !bestScore) {
            best = candidate
            bestScore = score
          } else {
            // 우선순위: 줄 많이 → 높이 낮게 → 구멍 적게
            if (score.lines > bestScore.lines) {
              best = candidate
              bestScore = score
            } else if (score.lines === bestScore.lines) {
              if (score.aggregateHeight < bestScore.aggregateHeight) {
                best = candidate
                bestScore = score
              } else if (
                score.aggregateHeight === bestScore.aggregateHeight &&
                score.holes < bestScore.holes
              ) {
                best = candidate
                bestScore = score
              }
            }
          }
        }
      }

      if (!best) {
        // 더 이상 놓을 곳이 없으면 아무 것도 하지 않음
        return
      }

      setGrid(best.grid)
      if (best.removedLines.length > 0) {
        addClearedLinesToCastle(best.removedLines)
        onLinesCleared?.(best.removedLines.length)
      }
    },
    [grid, addClearedLinesToCastle, onLinesCleared]
  )

  /** 현재 피스 왼쪽/오른쪽 이동 */
  const moveCurrent = useCallback(
    (dcol: number) => {
      if (!currentPiece) return
      const { blockType, shape, row, col } = currentPiece
      const newCol = col + dcol
      if (canPlace(grid, blockType, shape, row, newCol))
        setCurrentPiece({ ...currentPiece, col: newCol })
    },
    [grid, currentPiece]
  )

  /** 현재 피스 회전 */
  const rotateCurrent = useCallback(() => {
    if (!currentPiece) return
    const rotations = TETROMINO_SHAPES[currentPiece.blockType]
    const nextIndex = (currentPiece.rotationIndex + 1) % rotations.length
    const shape = rotations[nextIndex]
    if (canPlace(grid, currentPiece.blockType, shape, currentPiece.row, currentPiece.col))
      setCurrentPiece({ ...currentPiece, rotationIndex: nextIndex, shape })
  }, [grid, currentPiece])

  /** 현재 피스 즉시 낙하(고정) */
  const dropCurrent = useCallback(() => {
    if (!currentPiece) return
    const { blockType, shape, col } = currentPiece
    const row = findDropRow(grid, blockType, shape, col)
    let nextGrid = mergePiece(grid, blockType, shape, row, col)
    setCurrentPiece(null)
    const full = getFullRows(nextGrid)
    if (full.length > 0) {
      const { grid: after, removedLines } = removeRows(nextGrid, full)
      nextGrid = after
      addClearedLinesToCastle(removedLines)
      onLinesCleared?.(full.length)
    }
    setGrid(nextGrid)
  }, [grid, currentPiece, addClearedLinesToCastle, onLinesCleared])

  /** 현재 피스를 한 칸 아래로 (막히면 낙하 처리) */
  const moveDownCurrent = useCallback(() => {
    if (!currentPiece) return
    const { blockType, shape, row, col } = currentPiece
    const newRow = row + 1
    if (canPlace(grid, blockType, shape, newRow, col)) {
      setCurrentPiece({ ...currentPiece, row: newRow })
    } else {
      dropCurrent()
    }
  }, [grid, currentPiece, dropCurrent])

  /** 직접 조작: 새 피스 스폰 (블록 타입 선택) */
  const spawnPiece = useCallback((blockType: TetrisBlockType) => {
    const rotations = TETROMINO_SHAPES[blockType]
    const shape = rotations[0]
    const col = Math.floor((GRID_COLS - 4) / 2)
    if (canPlace(grid, blockType, shape, 0, col))
      setCurrentPiece({ blockType, rotationIndex: 0, shape, row: 0, col })
  }, [grid])

  return {
    grid,
    castle,
    currentPiece,
    addPieceFromHabit,
    moveCurrent,
    rotateCurrent,
    dropCurrent,
    moveDownCurrent,
    spawnPiece,
  }
}
