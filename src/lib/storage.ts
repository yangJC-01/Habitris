const HABITS_KEY = 'habitris_habits'
const GRID_KEY = 'habitris_grid'
const CASTLE_KEY = 'habitris_castle'

export function loadHabits(): string {
  try {
    return localStorage.getItem(HABITS_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

export function saveHabits(json: string): void {
  try {
    localStorage.setItem(HABITS_KEY, json)
  } catch (e) {
    console.error('Failed to save habits', e)
  }
}

export function loadGrid(): string {
  try {
    return localStorage.getItem(GRID_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveGrid(json: string): void {
  try {
    localStorage.setItem(GRID_KEY, json)
  } catch (e) {
    console.error('Failed to save grid', e)
  }
}

export function loadCastle(): string {
  try {
    return localStorage.getItem(CASTLE_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

export function saveCastle(json: string): void {
  try {
    localStorage.setItem(CASTLE_KEY, json)
  } catch (e) {
    console.error('Failed to save castle', e)
  }
}
