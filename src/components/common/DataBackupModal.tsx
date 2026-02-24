import { useRef, useState } from 'react'
import { downloadBackup, importBackup } from '@/lib/backup'

interface DataBackupModalProps {
  onClose: () => void
  onImportSuccess: () => void
}

export function DataBackupModal({ onClose, onImportSuccess }: DataBackupModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleExport = () => {
    downloadBackup()
    onClose()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError(null)
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      const result = importBackup(text)
      if (result.ok) {
        onImportSuccess()
        onClose()
        window.location.reload()
      } else {
        setImportError(result.error)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="데이터 백업·복원"
    >
      <div
        className="w-full max-w-sm rounded-xl border border-habitris-border bg-habitris-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-medium text-habitris-text">데이터 백업·복원</h2>
        <p className="mb-4 text-sm text-habitris-muted">
          습관, 테트리스 그리드, Castle을 JSON 파일로 내보내거나 가져와요. 가져오면 현재 데이터가 대체돼요.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-habitris-border bg-habitris-bg py-2.5 text-sm text-habitris-text hover:border-habitris-accent"
          >
            내보내기 (JSON 다운로드)
          </button>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-lg border border-habitris-border bg-habitris-bg py-2.5 text-sm text-habitris-text hover:border-habitris-accent"
            >
              가져오기 (JSON 파일 선택)
            </button>
            {importError && (
              <p className="mt-2 text-sm text-red-400">{importError}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg py-2 text-sm text-habitris-muted hover:text-habitris-text"
        >
          닫기
        </button>
      </div>
    </div>
  )
}
