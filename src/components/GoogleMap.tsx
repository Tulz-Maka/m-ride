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
  cityName?: string
  district?: string
  roadLabels?: string[]
  pickupLabel?: string
  dropoffLabel?: string
  onBack?: () => void
}

function shortText(text: string | undefined, max = 18): string {
  if (!text) return ''
  const trimmed = text.trim()
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed
}

function FallbackMap({
  height,
  mode,
  hazards,
  cityName = 'Mbombela',
  district = 'Ehlanzeni',
  roadLabels = ['N4', 'R40', 'R38', 'R536'],
  pickupLabel,
  dropoffLabel,
}: {
  height: number
  mode: Props['mode']
  hazards?: MapPoint[]
  cityName?: string
  district?: string
  roadLabels?: string[]
  pickupLabel?: string
  dropoffLabel?: string
}) {
  const h = height
  const r0 = roadLabels[0] ?? 'N4'
  const r1 = roadLabels[1] ?? 'R40'
  const r2 = roadLabels[2] ?? 'N11'
  const showRoute = mode !== 'road' && mode !== 'live'
  const startX = mode === 'trip' ? 148 : 66
  const startY = mode === 'trip' ? h * 0.72 : h - 54
  const endX = mode === 'trip' ? 290 : 302
  const endY = mode === 'trip' ? 62 : 42

  return (
    <svg
      width="390"
      height={h}
      viewBox={`0 0 390 ${h}`}
      role="img"
      aria-label={`${cityName}, Mpumalanga map placeholder — add VITE_GOOGLE_MAPS_API_KEY for Google Maps`}
    >
      <rect width="390" height={h} fill="#E7E2D3" />
      <path d={`M0 ${h * 0.18} Q 190 ${h * 0.08}, 390 ${h * 0.28} L390 0 L0 0 Z`} fill="#DDE3D2" opacity="0.65" />
      <path d={`M0 ${h * 0.78} Q 160 ${h * 0.86}, 390 ${h * 0.7} L390 ${h} L0 ${h} Z`} fill="#DFE5D5" opacity="0.55" />

      {/* Mpumalanga arterial roads */}
      <path d={`M0 ${h * 0.28} Q 195 ${h * 0.24}, 390 ${h * 0.34}`} stroke="#FFFDF8" strokeWidth="14" fill="none" />
      <path d={`M0 ${h * 0.62} Q 200 ${h * 0.56}, 390 ${h * 0.64}`} stroke="#FFFDF8" strokeWidth="11" fill="none" />
      <path d={`M96 0 L96 ${h}`} stroke="#FFFDF8" strokeWidth="12" />
      <path d={`M264 0 Q 254 ${h * 0.5}, 278 ${h}`} stroke="#FFFDF8" strokeWidth="11" fill="none" />

      {/* Highway / route shields */}
      <g fontFamily="Public Sans, sans-serif" fontSize="9.5" fontWeight="700">
        <rect x="14" y={Math.max(12, h * 0.28 - 10)} width="36" height="18" rx="4" fill="#0F2A2E" />
        <text x="32" y={Math.max(24, h * 0.28 + 2)} textAnchor="middle" fill="#F2A541">
          {shortText(r0, 6)}
        </text>
        <rect x="78" y={Math.max(52, h * 0.44)} width="36" height="18" rx="4" fill="#2E7D74" />
        <text x="96" y={Math.max(64, h * 0.44 + 12)} textAnchor="middle" fill="#FFFDF8">
          {shortText(r1, 6)}
        </text>
        <rect x="246" y={Math.max(76, h * 0.62 - 9)} width="42" height="18" rx="4" fill="#0F2A2E" opacity="0.88" />
        <text x="267" y={Math.max(88, h * 0.62 + 3)} textAnchor="middle" fill="#F6F4EE">
          {shortText(r2, 7)}
        </text>
      </g>

      {/* Active city / Mpumalanga label */}
      <g fontFamily="Public Sans, sans-serif">
        <rect x="218" y="12" width="158" height="24" rx="8" fill="rgba(15,42,46,0.82)" />
        <text x="297" y="28" textAnchor="middle" fill="#F6F4EE" fontSize="10.5" fontWeight="700">
          {shortText(`${cityName.split(' (')[0]} · MP`, 24)}
        </text>
        <text x="195" y={h * 0.49} textAnchor="middle" fill="rgba(15,42,46,0.22)" fontSize="12" fontWeight="700" letterSpacing="1.6">
          {`${district.toUpperCase()} · MPUMALANGA`}
        </text>
      </g>

      {showRoute && (
        <path
          d={
            mode === 'trip'
              ? `M${endX} ${endY} L${endX} ${startY} L${startX} ${startY}`
              : `M${startX} ${startY} L96 ${startY} L96 ${h * 0.28} L${endX} ${h * 0.28} L${endX} ${endY}`
          }
          stroke="#2E7D74"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={mode === 'trip' ? '2 9' : undefined}
        />
      )}

      {mode === 'trip' && <rect x={endX - 12} y={endY + 12} width="24" height="15" rx="4" fill="#0F2A2E" />}

      {showRoute && (
        <>
          <circle cx={startX} cy={startY} r="7.5" fill="#0F2A2E" />
          <circle cx={endX} cy={endY} r="7.5" fill="#F2A541" stroke="#0F2A2E" strokeWidth="2" />
          {pickupLabel && (
            <g fontFamily="Public Sans, sans-serif" fontSize="10" fontWeight="700">
              <rect x={Math.max(10, startX - 46)} y={startY - 26} width="108" height="17" rx="5" fill="#FFFDF8" stroke="#DDD6C6" />
              <text x={Math.max(64, startX + 8)} y={startY - 14} textAnchor="middle" fill="#0F2A2E">
                {shortText(pickupLabel, 17)}
              </text>
            </g>
          )}
          {dropoffLabel && (
            <g fontFamily="Public Sans, sans-serif" fontSize="10" fontWeight="700">
              <rect x={Math.min(266, endX - 58)} y={Math.max(38, endY + 10)} width="114" height="17" rx="5" fill="#FFFDF8" stroke="#F2A541" />
              <text x={Math.min(323, endX - 1)} y={Math.max(50, endY + 22)} textAnchor="middle" fill="#0F2A2E">
                {shortText(dropoffLabel, 18)}
              </text>
            </g>
          )}
        </>
      )}

      {mode === 'live' && (
        <g>
          {[
            { x: 118, y: h * 0.36 },
            { x: 222, y: h * 0.44 },
            { x: 170, y: h * 0.66 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="10" fill="#2E7D74" stroke="#FFFDF8" strokeWidth="2" />
              <circle cx={pt.x} cy={pt.y} r="3" fill="#F2A541" />
            </g>
          ))}
        </g>
      )}

      {(hazards ?? []).slice(0, 3).map((hz, i) => {
        const hx = 148 + i * 76
        const hy = Math.min(h - 74, 86 + i * 24)
        return (
          <g key={i}>
            <path d={`M${hx} ${hy}l9 16h-18z`} fill="#C2410C" />
            {hz.label && mode === 'road' && (
              <text x={hx} y={hy + 26} textAnchor="middle" fill="#7C2D12" fontSize="9" fontWeight="700" fontFamily="Public Sans, sans-serif">
                {shortText(hz.label, 14)}
              </text>
            )}
          </g>
        )
      })}

      <rect x="14" y={h - 46} width="246" height="28" rx="8" fill="rgba(15,42,46,0.86)" />
      <text x="24" y={h - 28} fill="#F6F4EE" fontSize="10.5" fontFamily="Public Sans, sans-serif">
        Mpumalanga map · set VITE_GOOGLE_MAPS_API_KEY
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
  cityName,
  district,
  roadLabels,
  pickupLabel,
  dropoffLabel,
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
        <FallbackMap
          height={height}
          mode={mode}
          hazards={hazards}
          cityName={cityName}
          district={district}
          roadLabels={roadLabels}
          pickupLabel={pickupLabel}
          dropoffLabel={dropoffLabel}
        />
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
