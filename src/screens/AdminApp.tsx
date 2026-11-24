import { GoogleMapView } from '../components/GoogleMap'
import { SAMPLE_DRIVERS, cityById } from '../store/data'
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
  const drivers = SAMPLE_DRIVERS.filter((d) => d.cityId === state.cityId)
  const selected = SAMPLE_DRIVERS.find((d) => d.id === state.adminSelectedDriverId) ?? drivers[0]
  const onlineCount = SAMPLE_DRIVERS.filter((d) => d.online).length

  let body: React.ReactNode
  if (state.adminScreen === 'drivers') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Drivers
        </div>
        <div className="note">Onboarding: ID, PrDP, operating licence, roadworthy, background check, selfie re-checks.</div>
        {SAMPLE_DRIVERS.map((d) => (
          <button key={d.id} className={`opt ${d.id === selected?.id ? 'sel' : ''}`} onClick={() => dispatch({ type: 'ADMIN_SELECT_DRIVER', id: d.id })}>
            <span>
              <b>
                {d.name} · {cityById(d.cityId).name}
              </b>
              <small>
                {d.checkStatus} · {d.sheEligible ? 'She' : '—'} · licence {d.licenceUntil}
              </small>
            </span>
            <span className="p">{d.rating}</span>
          </button>
        ))}
      </div>
    )
  } else if (state.adminScreen === 'incidents') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Incidents
        </div>
        <div className="note">Panic alerts must reach control room &lt;10s and be acknowledged &lt;60s (demo).</div>
        {state.incidents.map((inc) => (
          <div className="card" key={inc.id}>
            <b>
              {inc.type} · {inc.status}
            </b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>
              {inc.notes} · {cityById(inc.cityId).name}
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
          Fares
        </div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          <div className="row">
            <span>Go base + /km + /min</span>
            <b>Admin tables</b>
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
        <div className="note">Rates live in admin tables, not hard-coded for production — demo uses starting values from the tech spec.</div>
      </div>
    )
  } else if (state.adminScreen === 'reports') {
    body = (
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Reports
        </div>
        <div className="card">
          <b>NPTR / regulator pack</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>Weekly exports stub for demo.</span>
        </div>
        <div className="card">
          <b>Pothole GeoJSON · {city.name}</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>Ready for municipality / Vala Zonke handoff (demo).</span>
        </div>
        <div className="card">
          <b>Trips today (sample)</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            History rows: {state.tripsHistory.length} · Wallet ledger: {state.walletEntries.length} entries · Online drivers:{' '}
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
          markers={drivers.map((d, i) => ({
            lat: city.center.lat + ((i % 3) - 1) * 0.03,
            lng: city.center.lng + (Math.floor(i / 3) - 0.5) * 0.04,
            label: d.initials,
            color: d.online ? '#2E7D74' : '#999',
          }))}
          chip={`${drivers.filter((d) => d.online).length} online in ${city.name}`}
        />
        <div className="scroll">
          <div className="title" style={{ fontSize: 26 }}>
            Control room
          </div>
          <div className="grid2">
            <div className="card">
              <b>{onlineCount}</b>
              <span style={{ fontSize: 12 }}>Drivers online (sample)</span>
            </div>
            <div className="card">
              <b>{state.incidents.filter((i) => i.status === 'open').length}</b>
              <span style={{ fontSize: 12 }}>Open incidents</span>
            </div>
          </div>
          <div className="note">Live map feeds from location service (demo positions). Staff 2FA and audit log are out of band for this demo.</div>
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
        <div className="muted">Safety console · {city.name}, {city.province}</div>
      </div>
      {body}
      <Nav />
    </div>
  )
}
