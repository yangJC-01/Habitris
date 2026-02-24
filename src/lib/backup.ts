import { loadHabits, saveHabits, loadGrid, saveGrid, loadCastle, saveCastle } from './storage'

export interface HabitrisBackup {
  version: 1
  exportedAt: string
  habits: string
  grid: string
  castle: string
}

export function exportBackup(): HabitrisBackup {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    habits: loadHabits(),
    grid: loadGrid(),
    castle: loadCastle(),
  }
}

export function downloadBackup(): void {
  const data = exportBackup()
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const name = `habitris-backup-${new Date().toISOString().slice(0, 10)}.json`
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

function isBackupShape(obj: unknown): obj is HabitrisBackup {
  if (!obj || typeof obj !== 'object') return false
  const o = obj as Record<string, unknown>
  return (
    o.version === 1 &&
    typeof o.habits === 'string' &&
    typeof o.grid === 'string' &&
    typeof o.castle === 'string'
  )
}

export function importBackup(json: string): { ok: true } | { ok: false; error: string } {
  try {
    const data = JSON.parse(json) as unknown
    if (!isBackupShape(data)) {
      return { ok: false, error: '올바른 백업 형식이 아니에요.' }
    }
    saveHabits(data.habits)
    saveGrid(data.grid)
    saveCastle(data.castle)
    return { ok: true }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : '가져오기 실패',
    }
  }
}
