import { useEffect, useRef } from 'react'

/** index.html에 삽입한 AdSense 스크립트의 client와 동일하게 사용 (env로 덮어쓰기 가능) */
const ADSENSE_CLIENT =
  (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) ?? 'ca-pub-1773477789542936'
const ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT as string | undefined

/** 광고 영역. VITE_ADSENSE_CLIENT 설정 시 AdSense 노출, 미설정 시 플레이스홀더. 메인 플레이 영역 제외 위치에만 사용. */
export function AdSlot() {
  const pushedRef = useRef(false)

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushedRef.current) return

    const runPush = () => {
      try {
        ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []
        ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({})
        pushedRef.current = true
      } catch {
        // ignore
      }
    }

    if (typeof (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle !== 'undefined') {
      runPush()
      return
    }

    // index.html에 넣은 스크립트가 로드될 때까지 대기 후 push
    const existing = document.querySelector('script[src*="adsbygoogle"]')
    if (existing) {
      let attempts = 0
      const id = setInterval(() => {
        if (typeof (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle !== 'undefined') {
          clearInterval(id)
          runPush()
        } else if (++attempts > 200) {
          clearInterval(id)
        }
      }, 50)
      return () => clearInterval(id)
    }

    const script = document.createElement('script')
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = runPush
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  if (!ADSENSE_CLIENT) {
    return (
      <div
        className="flex items-center justify-center rounded border border-dashed border-habitris-border bg-habitris-surface/50 py-4 text-xs text-habitris-muted"
        style={{ minHeight: 90 }}
        aria-hidden
      >
        광고 영역
      </div>
    )
  }

  return (
    <div className="flex justify-center overflow-hidden rounded border border-habitris-border/50 bg-habitris-surface/30 py-2" style={{ minHeight: 90 }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
