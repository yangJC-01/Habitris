import type { TetrisBlockType } from '@/types/habit'

/** 습관에 사용 가능한 블록 타입 목록 (순환 매핑용) */
export const TETRIS_BLOCK_TYPES: TetrisBlockType[] = [
  'i', 'o', 't', 's', 'z', 'j', 'l',
]

export const BLOCK_TYPE_LABELS: Record<TetrisBlockType, string> = {
  i: 'I',
  o: 'O',
  t: 'T',
  s: 'S',
  z: 'Z',
  j: 'J',
  l: 'L',
}
