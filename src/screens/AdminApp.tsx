import { GoogleMapView } from '../components/GoogleMap'
import { CONFIRMED_POTHOLES, SAMPLE_DRIVERS, cityById, mpumalangaMunicipalities } from '../store/data'
import { useStore } from '../store/store'

function Nav() {
  const { state, dispatch } = useStore()
  const items: { id: typeof state.adminScreen; label: string }[] = [
    { id: 'live', label: 'Live map' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'fares', label: 'Fares' },
    { id: 'reports', label: 'Reports' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((x) => (
        <button key={x.id} className={state.adminScreen === x.id ? 'on' : ''} onClick={() => dispatch({ type: 'SET_ADMIN_SCREEN', screen: x.id })}>
          {x.label}
        </button>
      ))}
    </nav>
  )
}

export function AdminApp() {
  const { state, dispatch, city } = useStore()
  const cityDrivers = SAMPLE_DRIVERS.filter((d) => d.cityId === state.cityId)
  const districtDrivers = SAMPLE_DRIVERS.filter((d) => cityById(d.cityId).district === city.district)
  const mapDrivers = cityDrivers.length ? cityDrivers : districtDrivers
  const selected = SAMPLE_DRIVERS.find((d) => d.id === state.adminSelectedDriverId) ?? mapDrivers[0]
  const onlineCount = SAMPLE_DRIVERS.filter((d) => d.online).length
  const localOnlineCount = cityDrivers.filter((d) => d.online).length
  const districtOnlineCount = districtDrivers.filter((d) => d.online).length
  const municipalities = mpumalangaMunicipalities()
  const cityPotholes = CONFIRMED_POTHOLES.filter((p) => p.cityId === state.cityId).length + state.potholeReports.filter((p) => p.cityId === state.cityId).length

  let body: React.ReactNode
  if (state.adminScreen === 'drivers') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Mpumalanga Drivers
        </div>
        <div className="note">Mpumalanga onboarding: ID, PrDP, MP operating licence, roadworthy, background check, selfie re-checks.</div>
        {SAMPLE_DRIVERS.map((d) => {
          const dc = cityById(d.cityId)
          return (
            <button key={d.id} className={`opt ${d.id === selected?.id ? 'sel' : ''}`} onClick={() => dispatch({ type: 'ADMIN_SELECT_DRIVER', id: d.id })}>
              <span>
                <b>
                  {d.name} · {dc.name.split(' (')[0]}
                </b>
                <small>
                  {d.plate} · {dc.district} · {d.checkStatus} · {d.sheEligible ? 'She' : '—'} · licence {d.licenceUntil}
                </small>
              </span>
              <span className="p">{d.rating}</span>
            </button>
          )
        })}
      </div>
    )
  } else if (state.adminScreen === 'incidents') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Incidents
        </div>
        <div className="note">Mpumalanga panic alerts must reach control room &lt;10s and be acknowledged &lt;60s (demo).</div>
        {state.incidents.map((inc) => (
          <div className="card" key={inc.id}>
            <b>
              {inc.type} · {inc.status}
            </b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>
              {inc.notes} · {cityById(inc.cityId).name}, MP
            </span>
            {inc.status === 'open' && (
              <button className="cta" onClick={() => dispatch({ type: 'ADMIN_ACK_INCIDENT', id: inc.id })}>
                Acknowledge
              </button>
            )}
          </div>
        ))}
      </div>
    )
  } else if (state.adminScreen === 'fares') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Mpumalanga Fares
        </div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          <div className="row">
            <span>Launch province</span>
            <b>Mpumalanga (3 districts)</b>
          </div>
          <div className="row">
            <span>Go base + /km + /min</span>
            <b>R12 + R3.50/km + R0.40/m</b>
          </div>
          <div className="row">
            <span>Booking fee</span>
            <b>R2</b>
          </div>
          <div className="row">
            <span>Surge cap</span>
            <b>1.5×</b>
          </div>
          <div className="row">
            <span>Share discount</span>
            <b>40–50%</b>
          </div>
          <div className="row">
            <span>Driver cut</span>
            <b>15% or R35/day</b>
          </div>
          <div className="row">
            <span>Cancel &gt;2 min assigned</span>
            <b>R10 → driver</b>
          </div>
        </div>
        <div className="note">Mpumalanga launch fare tables for Ehlanzeni, Nkangala &amp; Gert Sibande — demo uses starting values from the tech spec.</div>
      </div>
    )
  } else if (state.adminScreen === 'reports') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Mpumalanga Reports
        </div>
        <div className="card">
          <b>Mpumalanga Transport Authority / NPTR pack</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            Weekly exports stub for Mpumalanga Dept. of Public Works, Roads &amp; Transport (demo).
          </span>
        </div>
        <div className="card">
          <b>Pothole GeoJSON · {city.municipality}</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            {cityPotholes} road hazard records ready for {city.municipality} ({city.district} District) / Vala Zonke handoff (demo).
          </span>
        </div>
        <div className="h">MPUMALANGA MUNICIPALITY EXPORTS</div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          {municipalities.map((m) => (
            <div className="row" key={m.municipality}>
              <span>
                <b>{m.municipality}</b>
                <small style={{ display: 'block', color: 'var(--body)' }}>
                  {m.district} · {m.towns.map((t) => t.split(' (')[0]).join(', ')}
                </small>
              </span>
              <b>{m.confirmedPotholes} hazards</b>
            </div>
          ))}
        </div>
        <div className="card">
          <b>Trips today (Mpumalanga sample)</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            History rows: {state.tripsHistory.length} · Wallet ledger: {state.walletEntries.length} entries · Online MP drivers:{' '}
            {onlineCount}
          </span>
        </div>
      </div>
    )
  } else {
    body = (
      <>
        <GoogleMapView
          center={city.center}
          height={240}
          mode="live"
          cityName={city.name}
          district={city.district}
          roadLabels={city.keyRoads}
          markers={mapDrivers.map((d, i) => ({
            lat: city.center.lat + ((i % 3) - 1) * 0.03,
            lng: city.center.lng + (Math.floor(i / 3) - 0.5) * 0.04,
            label: d.initials,
            color: d.online ? '#2E7D74' : '#999',
          }))}
          chip={
            localOnlineCount > 0
              ? `${localOnlineCount} online in ${city.name.split(' (')[0]} · ${districtOnlineCount} in ${city.district}`
              : `${districtOnlineCount} online in ${city.district} District`
          }
        />
        <div className="scroll">
          <div className="title" style={{ fontSize: 26 }}>
            Control room
          </div>
          <div className="grid2">
            <div className="card">
              <b>{onlineCount}</b>
              <span style={{ fontSize: 12 }}>MP drivers online (sample)</span>
            </div>
            <div className="card">
              <b>{state.incidents.filter((i) => i.status === 'open').length}</b>
              <span style={{ fontSize: 12 }}>Open incidents</span>
            </div>
          </div>
          <div className="note">
            Mpumalanga live map centered on {city.name} ({city.district} District). Staff 2FA and audit log are out of band for this demo.
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="screen">
      <div className="top" style={{ paddingBottom: 16 }}>
        <div className="brand">
          M<span>-</span>Ride <span style={{ fontSize: 16, color: 'inherit' }}>Admin</span>
        </div>
        <div className="muted">
          Mpumalanga console · {city.name} ({city.district})
        </div>
      </div>
      {body}
      <Nav />
    </div>
  )
}
