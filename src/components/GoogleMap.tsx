import { useEffect, useRef, useState } from 'react'
import { hasGoogleMapsKey, loadGoogleMaps } from '../lib/maps'

export interface MapPoint {
  lat: number
  lng: number
  label?: string
  color?: string
}

interface Props {
  center: { lat: number; lng: number }
  zoom?: number
  height?: number
  route?: MapPoint[]
  markers?: MapPoint[]
  hazards?: MapPoint[]
  mode?: 'choose' | 'trip' | 'road' | 'live'
  banner?: string
  chip?: string
  onBack?: () => void
}

function FallbackMap({ height, mode, hazards }: { height: number; mode: Props['mode']; hazards?: MapPoint[] }) {
  const h = height
  return (
    <svg width="390" height={h} viewBox={`0 0 390 ${h}`} role="img" aria-label="Map placeholder — add VITE_GOOGLE_MAPS_API_KEY for Google Maps">
      <rect width="390" height={h} fill="#E9E4D6" />
      <path d={`M0 ${h * 0.25}H390M0 ${h * 0.55}H390M90 0V${h}M250 0V${h}`} stroke="#FFFDF8" strokeWidth="14" />
      {mode !== 'road' && (
        <path
          d={mode === 'trip' ? `M280 50L280 ${h * 0.72}L160 ${h * 0.72}` : `M60 ${h - 40}L90 ${h - 40}L90 ${h * 0.26}L300 ${h * 0.26}L300 30`}
          stroke="#2E7D74"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={mode === 'trip' ? '2 9' : undefined}
        />
      )}
      {mode === 'trip' && <rect x="268" y="60" width="24" height="16" rx="4" fill="#0F2A2E" />}
      {mode !== 'road' && (
        <>
          <circle cx={mode === 'trip' ? 160 : 60} cy={mode === 'trip' ? h * 0.72 : h - 40} r="8" fill="#0F2A2E" />
          <circle cx={mode === 'trip' ? 280 : 300} cy={mode === 'trip' ? 50 : 30} r="8" fill="#F2A541" stroke="#0F2A2E" strokeWidth="2" />
        </>
      )}
      {(hazards ?? []).slice(0, 3).map((_, i) => (
        <path key={i} d={`M${140 + i * 70} ${90 + i * 20}l10 18h-20z`} fill="#C2410C" />
      ))}
      <rect x="16" y={h - 48} width="220" height="32" rx="8" fill="rgba(15,42,46,0.85)" />
      <text x="28" y={h - 27} fill="#F6F4EE" fontSize="11" fontFamily="Public Sans, sans-serif">
        Maps placeholder · set VITE_GOOGLE_MAPS_API_KEY
      </text>
    </svg>
  )
}

export function GoogleMapView({
  center,
  zoom = 12,
  height = 230,
  route = [],
  markers = [],
  hazards = [],
  mode = 'choose',
  banner,
  chip,
  onBack,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(!hasGoogleMapsKey())

  const markersKey = JSON.stringify(markers)
  const routeKey = JSON.stringify(route)
  const hazardsKey = JSON.stringify(hazards)

  useEffect(() => {
    if (!hasGoogleMapsKey()) {
      setFailed(true)
      return
    }
    let cancelled = false
    loadGoogleMaps()
      .then(() => {
        if (cancelled || !ref.current || !window.google?.maps) return
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'simplified' }] },
          ],
        })
        const bounds = new window.google.maps.LatLngBounds()
        const pts = [...markers, ...route, ...hazards]
        if (pts.length === 0) bounds.extend(center)
        pts.forEach((p) => bounds.extend(p))
        const g = window.google.maps
        markers.forEach((m, i) => {
          new g.Marker({
            map,
            position: m,
            label: m.label,
            title: m.label,
            icon:
              i === 0
                ? undefined
                : {
                    path: g.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: m.color ?? '#F2A541',
                    fillOpacity: 1,
                    strokeColor: '#0F2A2E',
                    strokeWeight: 2,
                  },
          })
        })
        hazards.forEach((h) => {
          new g.Marker({
            map,
            position: h,
            title: h.label ?? 'Pothole',
            label: '!',
          })
        })
        if (route.length >= 2) {
          new g.Polyline({
            map,
            path: route,
            strokeColor: '#2E7D74',
            strokeOpacity: 0.95,
            strokeWeight: 5,
          })
        }
        if (pts.length > 1) map.fitBounds(bounds)
        else map.setCenter(center)
        setReady(true)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed via JSON snapshots
  }, [center.lat, center.lng, zoom, markersKey, routeKey, hazardsKey])

  return (
    <div className="map" style={{ height }}>
      {failed ? (
        <FallbackMap height={height} mode={mode} hazards={hazards} />
      ) : (
        <div ref={ref} style={{ width: '100%', height, background: '#E9E4D6' }} aria-label="Google Map" />
      )}
      {!failed && !ready && (
        <div className="chip" style={{ top: 14, bottom: 'auto' }}>
          Loading map…
        </div>
      )}
      {onBack && (
        <button className="back" aria-label="Back" onClick={onBack}>
          ‹
        </button>
      )}
      {banner && <div className="banner">{banner}</div>}
      {chip && <div className="chip">{chip}</div>}
    </div>
  )
}
