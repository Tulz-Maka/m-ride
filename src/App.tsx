import { AdminApp } from './screens/AdminApp'
import { UssdApp, WhatsAppApp } from './screens/ChannelsApp'
import { DriverApp } from './screens/DriverApp'
import { MerchantApp } from './screens/MerchantApp'
import { RiderApp } from './screens/RiderApp'
import { CITIES, DISTRICTS, LAUNCH_PROVINCE } from './store/data'
import { StoreProvider, useStore } from './store/store'
import type { AppSurface } from './store/types'
import { hasGoogleMapsKey } from './lib/maps'

const SURFACES: { id: AppSurface; label: string }[] = [
  { id: 'rider', label: 'Rider' },
  { id: 'driver', label: 'Driver' },
  { id: 'merchant', label: 'Merchant' },
  { id: 'admin', label: 'Admin' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'ussd', label: 'USSD' },
]

function Shell() {
  const { state, dispatch, city } = useStore()
  const mapsOk = hasGoogleMapsKey()

  const phone =
    state.surface === 'driver' ? (
      <DriverApp />
    ) : state.surface === 'merchant' ? (
      <MerchantApp />
    ) : state.surface === 'admin' ? (
      <AdminApp />
    ) : state.surface === 'whatsapp' ? (
      <WhatsAppApp />
    ) : state.surface === 'ussd' ? (
      <UssdApp />
    ) : (
      <RiderApp />
    )

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>
          M<span>-</span>Ride
        </h1>
        <p>
          Affordable, safe rides and deliveries launching in <strong>{LAUNCH_PROVINCE} Province</strong>. Full product
          demo: rider &amp; driver apps, merchant portal, admin console, WhatsApp and USSD booking — across Ehlanzeni,
          Nkangala and Gert Sibande with a simulated backend (trip lifecycle, fees, wallet ledger, matching).
        </p>
        <div className="role-switch">
          {SURFACES.map((s) => (
            <button
              key={s.id}
              className={state.surface === s.id ? 'on' : ''}
              onClick={() => dispatch({ type: 'SET_SURFACE', surface: s.id })}
            >
              {s.label}
            </button>
          ))}
          <button onClick={() => dispatch({ type: 'RESET_DEMO' })}>Reset</button>
        </div>
        <div className="city-bar">
          <span className="province-badge" title="Initial launch province">
            Launch Province: {LAUNCH_PROVINCE}
          </span>
          <label>
            Mpumalanga city / town
            <select value={state.cityId} onChange={(e) => dispatch({ type: 'SET_CITY', cityId: e.target.value })}>
              {DISTRICTS.map((dist) => (
                <optgroup key={dist} label={`${dist} District`}>
                  {CITIES.filter((c) => c.district === dist).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <span className="sample-tag">
            {city.name} · {city.district} District, {city.province}
            {mapsOk ? ' · Google Maps on' : ' · Maps placeholder (set VITE_GOOGLE_MAPS_API_KEY)'}
          </span>
        </div>
      </header>

      <div className="phones">
        <div className="phone-col focused">
          <div className="phone-label">{SURFACES.find((s) => s.id === state.surface)?.label} · demo</div>
          <div className="phone">
            {phone}
            {state.toast && (
              <div className="toast" style={{ position: 'absolute', left: 16, right: 16, bottom: 80, zIndex: 5 }}>
                {state.toast}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        Concept owner: Tulani Maka · Mukutsuri Consulting Engineering &amp; Supply · Sample data only — not live
        payments, SMS or OTP
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
