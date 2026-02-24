import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from '@/components/common'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML =
    '<div style="min-height:100vh;background:#0f0f12;color:#e8e8ec;padding:2rem;font-family:system-ui,sans-serif"><p>앱을 불러올 수 없습니다. (root 없음)</p></div>'
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
}
