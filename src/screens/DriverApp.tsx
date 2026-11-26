import { GoogleMapView } from '../components/GoogleMap'
import { CONFIRMED_POTHOLES, formatRand } from '../store/data'
import { useStore } from '../store/store'

function Nav() {
  const { state, dispatch } = useStore()
  const items: { id: typeof state.driverScreen; label: string }[] = [
    { id: 'drive', label: 'Drive' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'roadmap', label: 'Road map' },
    { id: 'settings', label: 'Settings' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((x) => (
        <button key={x.id} className={state.driverScreen === x.id ? 'on' : ''} onClick={() => dispatch({ type: 'SET_DRIVER_SCREEN', screen: x.id })}>
          {x.label}
        </button>
      ))}
    </nav>
  )
}

function Drive() {
  const { state, dispatch, city } = useStore()
  const online = state.driverOnline
  const trip = state.trip && state.driverAcceptedTripId === state.trip.id ? state.trip : null
  const offer = state.driverOffer
  return (
    <div className={`screen ${online ? '' : 'dark'}`}>
      <div className="scroll">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="brand">
            M<span>-</span>Ride <span style={{ color: 'inherit', fontSize: 16 }}>Driver</span>
          </div>
          <div style={{ fontSize: 13 }}>
            {city.name.split(' (')[0]}, MP · {online ? 'Online' : 'Offline'}
          </div>
        </div>
        <div className="card" style={online ? undefined : { background: '#183B40', border: 'none' }}>
          <span style={{ fontSize: 13 }}>Today</span>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{formatRand(state.driverEarningsCents)}</span>
          <span style={{ fontSize: 13 }}>
            {state.driverTripsToday} trips · Daily fee R35 {state.dailyFeePaid ? 'paid' : 'due'} · keep 100% of fares
          </span>
        </div>
        <button
          className="toggle"
          style={{ background: online ? '#183B40' : 'var(--amber)', color: online ? '#F6F4EE' : 'var(--dark)' }}
          onClick={() => dispatch({ type: 'TOGGLE_DRIVER_ONLINE' })}
        >
          {online ? 'Go offline' : 'Go online'}
        </button>
        {online && offer && (
          <div className="card" style={{ border: '2px solid var(--dark)', background: 'var(--soft)' }}>
            <b style={{ fontSize: 17 }}>
              New trip · {offer.type} · {offer.paymentMethod}
            </b>
            <span style={{ fontSize: 14 }}>
              {offer.pickup.address.split(',')[0]} → {offer.dropoff.address.split(',')[0]} · {formatRand(offer.quotedFareCents)}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="cta" style={{ flex: 1 }} onClick={() => dispatch({ type: 'ACCEPT_OFFER' })}>
                Accept
              </button>
              <button className="ghost" style={{ flex: 1 }} onClick={() => dispatch({ type: 'SKIP_OFFER' })}>
                Skip
              </button>
            </div>
          </div>
        )}
        {online && trip?.status === 'arriving' && (
          <div className="card">
            <b>Heading to pickup · 4 min</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>Ask for PIN {trip.pin}</span>
            <button className="cta" onClick={() => dispatch({ type: 'DRIVER_ARRIVED' })}>
              I&apos;ve arrived
            </button>
          </div>
        )}
        {online && trip?.status === 'arrived' && (
          <div className="card">
            <b>At pickup</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>Confirm PIN {trip.pin}. No-show R15 after 5 min.</span>
            <button className="cta" onClick={() => dispatch({ type: 'DRIVER_START_TRIP' })}>
              Start with PIN
            </button>
          </div>
        )}
        {online && trip?.status === 'in_progress' && (
          <div className="card">
            <b>In progress</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>
              To {trip.dropoff.address.split(',')[0]} · {formatRand(trip.quotedFareCents)}
            </span>
            <button className="cta" onClick={() => dispatch({ type: 'DRIVER_COMPLETE' })}>
              Complete trip
            </button>
          </div>
        )}
        {online && (
          <>
            <button className="pot" onClick={() => dispatch({ type: 'REPORT_POTHOLE' })}>
              Pothole
              <span style={{ fontSize: 13, fontWeight: 400 }}>One tap while driving</span>
            </button>
            <div className="card">
              <b>Your road reports</b>
              <span style={{ fontSize: 13, color: 'var(--body)' }}>{state.potholeReports.length} today · confirmed after 3 reports</span>
            </div>
          </>
        )}
        {!online && (
          <div className="card" style={{ background: '#183B40', border: 'none' }}>
            <b>Mpumalanga licence check</b>
            <span style={{ fontSize: 13, color: '#C9D8D5' }}>MP operating licence valid until Mar 2027 · Selfie check due today</span>
          </div>
        )}
      </div>
    </div>
  )
}

function Earnings() {
  const { state } = useStore()
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Earnings</div>
        <div className="card dark" style={{ padding: 20 }}>
          <span className="muted">Today</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{formatRand(state.driverEarningsCents)}</span>
          <span className="muted">{state.driverTripsToday} trips · daily fee plan</span>
        </div>
        <div className="card">
          <b>15% commission vs R35/day</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            On commission you would keep ~{formatRand(Math.round(state.driverEarningsCents * 0.85))}. Daily fee keeps 100% of fares.
          </span>
        </div>
      </div>
    </div>
  )
}

function RoadMap() {
  const { state, city } = useStore()
  const hazards = CONFIRMED_POTHOLES.filter((p) => p.cityId === state.cityId)
  return (
    <div className="screen">
      <GoogleMapView
        center={city.center}
        height={220}
        mode="road"
        hazards={hazards.map((h) => ({ lat: h.lat, lng: h.lng, label: h.road }))}
        cityName={city.name}
        district={city.district}
        roadLabels={city.keyRoads}
        chip={`${hazards.length} confirmed · ${city.name.split(' (')[0]}, MP`}
      />
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          Road intelligence
        </div>
        <div className="note">
          3+ reports in 14 days → confirmed for {city.municipality} &amp; Mpumalanga Vala Zonke. 20+ clean passes → expired. R2 adds shortcut learning.
        </div>
        <div className="h">CONFIRMED · {city.name.split(' (')[0].toUpperCase()}</div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          {(hazards.length ? hazards : CONFIRMED_POTHOLES.slice(0, 3)).map((h) => (
            <div className="row" key={h.road}>
              <span>{h.road}</span>
              <b>{h.count} reports</b>
            </div>
          ))}
        </div>
        <div className="h">YOUR REPORTS</div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          {state.potholeReports.length === 0 ? (
            <div className="row">
              <span>None yet</span>
            </div>
          ) : (
            state.potholeReports.map((r) => (
              <div className="row" key={r.id}>
                <span>{r.road}</span>
                <b>Pending</b>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Settings() {
  const { state, dispatch } = useStore()
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Settings</div>
        <div className="card">
          <b>Cash trips</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>On until 20:00</span>
        </div>
        {(['she', 'teen', 'school'] as const).map((key) => (
          <button key={key} className={`opt ${state.driverOptIns[key] ? 'sel' : ''}`} onClick={() => dispatch({ type: 'TOGGLE_OPT_IN', key })}>
            <span>
              <b>{key === 'she' ? 'She rides' : key === 'teen' ? 'Teen (R2)' : 'School Run (R2)'}</b>
              <small>{state.driverOptIns[key] ? 'Opted in' : 'Tap to apply / opt in'}</small>
            </span>
          </button>
        ))}
        <div className="card">
          <b>Shortcuts (R2)</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>Suggested after 30+ trips save ≥2 min — never through unsafe zones.</span>
        </div>
      </div>
    </div>
  )
}

export function DriverApp() {
  const { state } = useStore()
  const body =
    state.driverScreen === 'earnings' ? (
      <Earnings />
    ) : state.driverScreen === 'roadmap' ? (
      <RoadMap />
    ) : state.driverScreen === 'settings' ? (
      <Settings />
    ) : (
      <Drive />
    )
  return (
    <>
      {body}
      <Nav />
    </>
  )
}
