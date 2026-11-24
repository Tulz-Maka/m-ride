/** Client-side Maps key. Prefer env; never hardcode a real key. */
export function getGoogleMapsApiKey(): string {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  return typeof key === 'string' ? key.trim() : ''
}

export function hasGoogleMapsKey(): boolean {
  return getGoogleMapsApiKey().length > 0
}

let loadPromise: Promise<void> | null = null

export function loadGoogleMaps(): Promise<void> {
  if (!hasGoogleMapsKey()) return Promise.reject(new Error('missing_key'))
  if (typeof window !== 'undefined' && (window as unknown as { google?: { maps?: unknown } }).google?.maps) {
    return Promise.resolve()
  }
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('mride-google-maps')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('load_failed')))
      return
    }
    const script = document.createElement('script')
    script.id = 'mride-google-maps'
    script.async = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(getGoogleMapsApiKey())}`
    script.onload = () => resolve()
    script.onerror = () => {
      loadPromise = null
      reject(new Error('load_failed'))
    }
    document.head.appendChild(script)
  })
  return loadPromise
}

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (
          el: HTMLElement,
          opts: Record<string, unknown>,
        ) => {
          setCenter: (c: { lat: number; lng: number }) => void
          fitBounds: (b: unknown) => void
        }
        Marker: new (opts: Record<string, unknown>) => unknown
        Polyline: new (opts: Record<string, unknown>) => unknown
        LatLngBounds: new () => { extend: (c: { lat: number; lng: number }) => void }
        SymbolPath: { CIRCLE: unknown }
      }
    }
  }
}
