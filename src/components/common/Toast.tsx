import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, onDismiss, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [onDismiss, duration])

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-habitris-accent/50 bg-habitris-surface px-4 py-3 text-sm text-habitris-text shadow-lg animate-toast-in"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
