import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTetris } from '@/hooks/useTetris'
import { MainPage } from '@/pages/MainPage'
import { CastlePageRoute } from '@/pages/CastlePageRoute'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { TermsPage } from '@/pages/TermsPage'
import { ContactPage } from '@/pages/ContactPage'
import { AboutPage } from '@/pages/AboutPage'
import { Toast, DataBackupModal, Footer } from '@/components/common'

export default function App() {
  const [toast, setToast] = useState<string | null>(null)
  const [lineClearFlash, setLineClearFlash] = useState(false)
  const [dataModalOpen, setDataModalOpen] = useState(false)

  const handleLinesCleared = useCallback((count: number) => {
    setToast(
      count === 1
        ? '한 줄 완성! Castle에 쌓였어요'
        : `${count}줄 완성! Castle에 쌓였어요`
    )
    setLineClearFlash(true)
    setTimeout(() => setLineClearFlash(false), 450)
  }, [])

  const tetris = useTetris({ onLinesCleared: handleLinesCleared })

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-habitris-bg text-habitris-text">
        <header className="border-b border-habitris-border px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Habitris</h1>
            <p className="text-sm text-habitris-muted">습관을 완료하면 테트리스 블록이 쌓여요</p>
          </div>
          <button
            type="button"
            onClick={() => setDataModalOpen(true)}
            className="shrink-0 rounded border border-habitris-border px-3 py-1.5 text-xs text-habitris-muted hover:border-habitris-accent hover:text-habitris-text"
          >
            데이터
          </button>
        </div>
      </header>

        <main className="mx-auto flex min-h-[calc(100vh-8rem)] min-w-0 max-w-6xl flex-col overflow-x-hidden px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  grid={tetris.grid}
                  currentPiece={tetris.currentPiece}
                  lineClearFlash={lineClearFlash}
                  addPieceFromHabit={tetris.addPieceFromHabit}
                  moveLeft={() => tetris.moveCurrent(-1)}
                  moveRight={() => tetris.moveCurrent(1)}
                  moveDown={tetris.moveDownCurrent}
                  rotate={tetris.rotateCurrent}
                  drop={tetris.dropCurrent}
                  spawnPiece={tetris.spawnPiece}
                />
              }
            />
            <Route
              path="/castle"
              element={<CastlePageRoute lines={tetris.castle} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />

        {toast && (
          <Toast message={toast} onDismiss={() => setToast(null)} />
        )}

        {dataModalOpen && (
          <DataBackupModal
            onClose={() => setDataModalOpen(false)}
            onImportSuccess={() => {}}
          />
        )}
      </div>
    </BrowserRouter>
  )
}
