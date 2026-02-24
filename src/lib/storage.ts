const HABITS_KEY = 'habitris_habits'

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
