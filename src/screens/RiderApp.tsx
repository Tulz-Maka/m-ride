import { useMemo, useState } from 'react'
import { GoogleMapView } from '../components/GoogleMap'
import { CONFIRMED_POTHOLES, cityById, formatRand, formatRandSigned, quoteRide, releaseBadge } from '../store/data'
import { cancellationFeeCents, useStore } from '../store/store'
import type { PaymentMethod, RideType } from '../store/types'

const SERVICES: {
  id: RideType
  label: string
  short: string
  color: string
}[] = [
  { id: 'go', label: 'Go', short: 'G', color: '#F2A541' },
  { id: 'share', label: 'Share', short: 'S', color: '#F2A541' },
  { id: 'she', label: 'She', short: 'W', color: '#E9C6D3' },
  { id: 'teen', label: 'Teen', short: 'T', color: '#C9D8D5' },
  { id: 'school', label: 'School', short: 'SR', color: '#C9D8D5' },
  { id: 'exec', label: 'Exec', short: 'E', color: '#DDD6C6' },
  { id: 'parcel', label: 'Parcel', short: 'P', color: '#B9DCD5' },
  { id: 'food', label: 'Food', short: 'F', color: '#B9DCD5' },
]

const PAYS: { id: PaymentMethod; label: (bal: number) => string }[] = [
  { id: 'cash', label: () => 'Cash' },
  { id: 'card', label: () => 'Card' },
  { id: 'wallet', label: (bal) => `Wallet ${formatRand(bal)}` },
  { id: 'business', label: () => 'Business' },
]

function Nav() {
  const { state, dispatch } = useStore()
  const items: { id: typeof state.riderScreen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'trip', label: 'My trip' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'safety', label: 'Safety' },
  ]
  const homeish = ['home', 'choose', 'parcel', 'teen', 'school', 'food', 'saver', 'dependants'].includes(state.riderScreen)
  return (
    <nav className="bottom-nav">
      {items.map((x) => (
        <button
          key={x.id}
          className={state.riderScreen === x.id || (x.id === 'home' && homeish && state.riderScreen !== 'trip' && state.riderScreen !== 'wallet' && state.riderScreen !== 'safety') ? 'on' : ''}
          onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: x.id === 'home' ? 'home' : x.id })}
        >
          {x.label}
        </button>
      ))}
    </nav>
  )
}

function openService(ride: RideType, dispatch: ReturnType<typeof useStore>['dispatch']) {
  dispatch({ type: 'SET_RIDE', ride })
  if (ride === 'parcel') dispatch({ type: 'SET_RIDER_SCREEN', screen: 'parcel' })
  else if (ride === 'teen') dispatch({ type: 'SET_RIDER_SCREEN', screen: 'teen' })
  else if (ride === 'school') dispatch({ type: 'SET_RIDER_SCREEN', screen: 'school' })
  else if (ride === 'food') dispatch({ type: 'SET_RIDER_SCREEN', screen: 'food' })
  else dispatch({ type: 'SET_RIDER_SCREEN', screen: 'choose' })
}

function Home() {
  const { state, dispatch, places, city } = useStore()
  const hazards = CONFIRMED_POTHOLES.filter((p) => p.cityId === state.cityId)
  return (
    <div className="screen">
      <div className="top">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="brand">
            M<span>-</span>Ride
          </div>
          <div className="muted">Data saver on</div>
        </div>
        <div style={{ fontSize: 15, color: '#C9D8D5' }}>Sawubona, Lerato · {city.name}, MP</div>
        <label htmlFor="dest" className="muted">
          Where to?
        </label>
        <select
          id="dest"
          className="input"
          value={state.destinationId}
          onChange={(e) => dispatch({ type: 'SET_DEST', id: e.target.value })}
        >
          {places
            .filter((p) => !p.label.toLowerCase().includes('home'))
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.address}
              </option>
            ))}
        </select>
      </div>
      <div className="scroll">
        <div className="h">CHOOSE A SERVICE</div>
        <div className="grid4">
          {SERVICES.map((s) => (
            <button key={s.id} className="tile" onClick={() => openService(s.id, dispatch)}>
              <span className="dot" style={{ background: s.color }}>
                {s.short}
              </span>
              {s.label}
              <span style={{ fontSize: 9, color: 'var(--body)' }}>{releaseBadge(s.id)}</span>
            </button>
          ))}
        </div>
        <div className="note">
          <b>Road alert:</b> {hazards.length} confirmed potholes near {city.name.split(' (')[0]} ({city.keyRoads.slice(0, 2).join(' / ')}). M-Ride routes around them.
        </div>
        <div className="grid2">
          <button className="box" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'saver' })}>
            Saver Pass · {state.saverPassRemaining}/10 left
          </button>
          <button className="box" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'dependants' })}>
            Family · Teen &amp; School
          </button>
        </div>
        <div className="h">SAVED PLACES · {city.name.split(' (')[0].toUpperCase()}, MPUMALANGA</div>
        <div className="list">
          {places.slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                if (!p.label.toLowerCase().includes('home')) dispatch({ type: 'SET_DEST', id: p.id })
                openService('go', dispatch)
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Choose() {
  const { state, dispatch, quotes, pickup, dropoff, city } = useStore()
  const rideQuotes = quotes.filter((q) => ['go', 'share', 'she', 'exec'].includes(q.rideType) || q.rideType === state.selectedRide)
  const selected = quotes.find((q) => q.rideType === state.selectedRide) ?? quotes[1]
  const hazards = CONFIRMED_POTHOLES.filter((p) => p.cityId === state.cityId).map((p) => ({
    lat: p.lat,
    lng: p.lng,
    label: p.road,
  }))
  return (
    <div className="screen">
      <GoogleMapView
        center={{ lat: (pickup.lat + dropoff.lat) / 2, lng: (pickup.lng + dropoff.lng) / 2 }}
        height={230}
        mode="choose"
        route={[pickup, dropoff]}
        markers={[
          { ...pickup, label: 'A' },
          { ...dropoff, label: 'B', color: '#F2A541' },
        ]}
        hazards={hazards}
        cityName={city.name}
        district={city.district}
        roadLabels={city.keyRoads}
        pickupLabel={pickup.address.split(',')[0]}
        dropoffLabel={dropoff.address.split(',')[0]}
        chip={`Avoids potholes · ${city.keyRoads[0]}`}
        onBack={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}
      />
      <div className="scroll">
        <div style={{ fontSize: 13, color: 'var(--body)' }}>
          To {dropoff.address.split(',')[0]} · {selected.distanceKm} km · fixed upfront fare
        </div>
        {rideQuotes.map((o) => (
          <button
            key={o.rideType}
            className={`opt ${o.rideType === state.selectedRide ? 'sel' : ''}`}
            onClick={() => dispatch({ type: 'SET_RIDE', ride: o.rideType })}
          >
            <span>
              <b>
                {o.label} <span style={{ fontSize: 11, color: 'var(--teal)' }}>{o.release}</span>
              </b>
              <small>{o.blurb}</small>
            </span>
            <span className="p">{formatRand(o.fareCents)}</span>
          </button>
        ))}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PAYS.filter((p) => p.id !== 'business' || state.selectedRide === 'exec').map((x) => (
            <button
              key={x.id}
              className={`pill ${x.id === state.paymentMethod ? 'sel' : ''}`}
              onClick={() => dispatch({ type: 'SET_PAY', pay: x.id })}
            >
              {x.label(state.walletBalanceCents)}
            </button>
          ))}
        </div>
        <button className="cta" onClick={() => dispatch({ type: 'BOOK_TRIP' })}>
          Confirm {selected.label} · {formatRand(selected.fareCents)}
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'TOGGLE_LATER' })}>
          {state.bookLater ? 'Pickup: tomorrow 06:30 (tap to change)' : 'Book for later'}
        </button>
      </div>
    </div>
  )
}

function Parcel() {
  const { state, dispatch, pickup, dropoff } = useStore()
  const [receiver, setReceiver] = useState('Thandi Mokoena')
  const [phone, setPhone] = useState('082 555 0199')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('small')
  const [cod, setCod] = useState(0)
  const q = quoteRide('parcel', pickup, dropoff)
  return (
    <div className="screen">
      <div className="top">
        <div className="brand">
          M<span>-</span>Ride
        </div>
        <div style={{ fontSize: 15 }}>Parcel · R1 · same-day</div>
      </div>
      <div className="scroll">
        <div className="card">
          <div style={{ fontSize: 14 }}>
            <b>Pickup</b> · {pickup.address}
          </div>
          <div style={{ fontSize: 14 }}>
            <b>Drop-off</b> · {dropoff.address}
          </div>
          <div style={{ fontSize: 13, color: 'var(--body)' }}>
            {q.distanceKm} km · {formatRand(q.fareCents)} · PIN on delivery
          </div>
        </div>
        <input className="input" value={receiver} onChange={(e) => setReceiver(e.target.value)} aria-label="Receiver" />
        <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
        <div style={{ display: 'flex', gap: 8 }}>
          {(['small', 'medium', 'large'] as const).map((s) => (
            <button key={s} className={`pill ${size === s ? 'sel' : ''}`} onClick={() => setSize(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="h">CASH ON DELIVERY</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 5000, 15000].map((c) => (
            <button key={c} className={`pill ${cod === c ? 'sel' : ''}`} onClick={() => setCod(c)}>
              {c === 0 ? 'None' : formatRand(c)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {PAYS.slice(0, 3).map((x) => (
            <button key={x.id} className={`pill ${x.id === state.paymentMethod ? 'sel' : ''}`} onClick={() => dispatch({ type: 'SET_PAY', pay: x.id })}>
              {x.label(state.walletBalanceCents)}
            </button>
          ))}
        </div>
        <button
          className="cta"
          onClick={() =>
            dispatch({
              type: 'BOOK_TRIP',
              extra: { type: 'parcel', receiverName: receiver, receiverPhone: phone, parcelSize: size, codCents: cod },
            })
          }
        >
          Book parcel · {formatRand(q.fareCents)}
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
          Back
        </button>
      </div>
    </div>
  )
}

function Teen() {
  const { state, dispatch, quotes } = useStore()
  const teen = state.dependants.find((d) => d.type === 'teen')
  const q = quotes.find((x) => x.rideType === 'teen')!
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Teen · R2</div>
        <div className="note">Ages 13–17, linked to a parent, with a PIN and live tracking.</div>
        {teen && (
          <div className="card">
            <b>{teen.name} · {teen.age}</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>
              Spent {formatRand(teen.spentThisMonthCents)} of {formatRand(teen.spendingLimitCents)} this month
            </span>
          </div>
        )}
        <div className="card">
          <b>{q.label} · {formatRand(q.fareCents)}</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>{q.blurb}</span>
        </div>
        <button
          className="cta"
          onClick={() => {
            dispatch({ type: 'SET_RIDE', ride: 'teen' })
            dispatch({ type: 'SET_DEPENDANT', id: teen?.id ?? 'dep-teen' })
            dispatch({ type: 'BOOK_TRIP', extra: { type: 'teen', dependantId: teen?.id } })
          }}
        >
          Book Teen ride
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
          Back
        </button>
      </div>
    </div>
  )
}

function School() {
  const { state, dispatch, quotes } = useStore()
  const child = state.dependants.find((d) => d.type === 'child')
  const q = quotes.find((x) => x.rideType === 'school')!
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">School Run · R2</div>
        <div className="note">Children under 13 travel only on scheduled School Runs with adult PIN handover at both ends.</div>
        {child && (
          <div className="card">
            <b>{child.name} · age {child.age}</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>Approved adults: Mama, Gogo · pickup tomorrow 06:30</span>
          </div>
        )}
        <div className="card">
          <b>{formatRand(q.fareCents)} · fixed</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>Start PIN + end PIN required. Control room alerted if no adult in 10 min.</span>
        </div>
        <button
          className="cta"
          onClick={() => {
            if (!state.bookLater) dispatch({ type: 'TOGGLE_LATER' })
            dispatch({ type: 'SET_RIDE', ride: 'school' })
            dispatch({ type: 'SET_DEPENDANT', id: child?.id ?? 'dep-child' })
            dispatch({ type: 'BOOK_TRIP', extra: { type: 'school', dependantId: child?.id } })
          }}
        >
          Schedule School Run
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
          Back
        </button>
      </div>
    </div>
  )
}

function Food() {
  const { state, dispatch, pickup, selectedMerchant, city } = useStore()
  const exactCityMerchants = state.merchants.filter((m) => m.cityId === state.cityId)
  const districtMerchants = state.merchants.filter((m) => cityById(m.cityId).district === city.district)
  const visibleMerchants = exactCityMerchants.length
    ? exactCityMerchants
    : districtMerchants.length
      ? districtMerchants
      : state.merchants
  const showingDistrictFallback = exactCityMerchants.length === 0
  const merchant =
    selectedMerchant && visibleMerchants.some((m) => m.id === selectedMerchant.id)
      ? selectedMerchant
      : visibleMerchants[0]
  if (!merchant) {
    return (
      <div className="screen">
        <div className="scroll">
          <div className="title">Food · R2</div>
          <div className="card">No sample Mpumalanga kitchens loaded yet.</div>
          <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
            Back
          </button>
        </div>
      </div>
    )
  }
  const items = state.foodCart
    .map((c) => {
      const item = merchant.menu.find((m) => m.id === c.itemId)
      return item ? { name: item.name, priceCents: item.priceCents, qty: c.qty } : null
    })
    .filter(Boolean) as { name: string; priceCents: number; qty: number }[]
  const foodTotal = items.reduce((s, i) => s + i.priceCents * i.qty, 0)
  const delivery = quoteRide('food', pickup, { ...pickup, lat: pickup.lat + 0.02, lng: pickup.lng + 0.02 })
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Food · R2</div>
        {showingDistrictFallback && (
          <div className="note">
            Showing nearby {city.district} District kitchens in Mpumalanga (e.g. Mbombela, Hazyview, eMalahleni, Secunda, Ermelo).
          </div>
        )}
        <div className="h">MPUMALANGA EATERIES · {city.district.toUpperCase()}</div>
        {visibleMerchants.map((m) => (
          <button key={m.id} className={`opt ${m.id === merchant.id ? 'sel' : ''}`} onClick={() => dispatch({ type: 'SET_MERCHANT', id: m.id })}>
            <span>
              <b>{m.name}</b>
              <small>
                {cityById(m.cityId).name.split(' (')[0]} · {m.cuisine} · {m.open ? 'Open' : 'Closed'} · {m.commissionPct}% commission
              </small>
            </span>
          </button>
        ))}
        <div className="h">MENU</div>
        {merchant.menu.map((item) => (
          <button key={item.id} className="opt" disabled={!item.available} onClick={() => dispatch({ type: 'FOOD_ADD', itemId: item.id })}>
            <span>
              <b>{item.name}</b>
              <small>{item.available ? 'Tap to add' : 'Sold out'}</small>
            </span>
            <span className="p">{formatRand(item.priceCents)}</span>
          </button>
        ))}
        {items.length > 0 && (
          <div className="card">
            <b>
              Cart · {formatRand(foodTotal)} + delivery ~{formatRand(delivery.fareCents)}
            </b>
            {items.map((i) => (
              <span key={i.name} style={{ fontSize: 13 }}>
                {i.qty}× {i.name}
              </span>
            ))}
            <button
              className="cta"
              onClick={() =>
                dispatch({
                  type: 'BOOK_TRIP',
                  extra: { type: 'food', merchantId: merchant.id, foodItems: items },
                })
              }
            >
              Place order
            </button>
          </div>
        )}
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
          Back
        </button>
      </div>
    </div>
  )
}

function Saver() {
  const { state, dispatch } = useStore()
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Saver Pass</div>
        <div className="card dark" style={{ padding: 20 }}>
          <span className="muted">Shared work trips left</span>
          <span style={{ fontSize: 38, fontWeight: 700 }}>{state.saverPassRemaining} / 10</span>
          <span className="muted">Budget like a taxi coupon · no surge on pass trips</span>
        </div>
        <div className="note">Weekly or monthly bundles of shared trips. Demo pass: R280 for 10 Share rides.</div>
        <button className="cta" onClick={() => dispatch({ type: 'BUY_SAVER_PASS' })}>
          Buy / renew Saver Pass · R280
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'wallet' })}>
          Open wallet
        </button>
      </div>
    </div>
  )
}

function Dependants() {
  const { state, dispatch } = useStore()
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Family</div>
        <div className="note">Parent account links Teen (13–17) and child (under 13) profiles with spending limits.</div>
        {state.dependants.map((d) => (
          <button key={d.id} className={`opt ${state.selectedDependantId === d.id ? 'sel' : ''}`} onClick={() => dispatch({ type: 'SET_DEPENDANT', id: d.id })}>
            <span>
              <b>
                {d.name} · {d.type}
              </b>
              <small>
                Age {d.age} · {formatRand(d.spentThisMonthCents)} / {formatRand(d.spendingLimitCents)}
              </small>
            </span>
          </button>
        ))}
        <button className="cta" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'teen' })}>
          Book Teen
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'school' })}>
          Schedule School Run
        </button>
      </div>
    </div>
  )
}

function Trip() {
  const { state, dispatch, activeDriver, pickup, dropoff, city } = useStore()
  const trip = state.trip
  const feePreview = useMemo(() => (trip ? cancellationFeeCents(trip, Date.now()) : 0), [trip])
  if (!trip) {
    return (
      <div className="screen">
        <div className="scroll">
          <div className="title">My trip</div>
          <div className="card">No active trip — pick a service on Home.</div>
          <button className="cta" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'home' })}>
            Go home
          </button>
        </div>
      </div>
    )
  }
  const banner = (() => {
    switch (trip.status) {
      case 'scheduled':
        return 'Scheduled · driver assigned 30 min before'
      case 'searching':
        return 'Searching nearby drivers…'
      case 'arriving':
      case 'assigned':
        return `${activeDriver?.name.split(' ')[0] ?? 'Driver'} is on the way`
      case 'arrived':
        return 'Driver arrived — share your PIN'
      case 'in_progress':
        return 'On the way'
      case 'completed':
        return 'Trip completed'
      case 'cancelled_rider':
        return 'Cancelled'
      case 'no_driver':
        return 'No driver found'
      default:
        return 'Trip update'
    }
  })()
  const active = !['completed', 'cancelled_rider', 'cancelled_driver', 'no_driver', 'no_show'].includes(trip.status)
  return (
    <div className="screen">
      <GoogleMapView
        center={{ lat: (pickup.lat + dropoff.lat) / 2, lng: (pickup.lng + dropoff.lng) / 2 }}
        height={290}
        mode="trip"
        route={[pickup, dropoff]}
        markers={[
          { ...pickup, label: 'A' },
          { ...dropoff, label: 'B', color: '#F2A541' },
        ]}
        cityName={city.name}
        district={city.district}
        roadLabels={city.keyRoads}
        pickupLabel={trip.pickup.address.split(',')[0]}
        dropoffLabel={trip.dropoff.address.split(',')[0]}
        banner={banner}
      />
      <div className="scroll">
        {trip.status === 'searching' && (
          <div className="card">
            <b className="pulse">Matching within 3 km…</b>
            <div className="progress-bar">
              <span style={{ width: '55%' }} />
            </div>
          </div>
        )}
        {activeDriver && trip.status !== 'searching' && trip.status !== 'scheduled' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                background: 'var(--teal)',
                color: '#F6F4EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {activeDriver.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>
                {activeDriver.name} · {activeDriver.rating}
              </div>
              <div style={{ fontSize: 13, color: 'var(--body)' }}>
                {activeDriver.vehicle} · {activeDriver.plate}
              </div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--soft)', borderRadius: 10, padding: '6px 10px' }}>
              <div style={{ fontSize: 11 }}>PIN</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>{trip.pin}</div>
              {trip.pinEnd && <div style={{ fontSize: 10 }}>End {trip.pinEnd}</div>}
            </div>
          </div>
        )}
        <div style={{ fontSize: 13, color: 'var(--body)' }}>
          {trip.type} · {formatRand(trip.quotedFareCents)} · {trip.paymentMethod}
          {trip.receiverName ? ` · ${trip.receiverName}` : ''}
        </div>
        {active && (
          <div className="grid3">
            <button className="box" onClick={() => dispatch({ type: 'SHARE_TRIP' })}>
              {trip.shared ? 'Shared ✓' : 'Share trip'}
            </button>
            <button className="box">Call</button>
            <button className="box sos" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'safety' })}>
              SOS
            </button>
          </div>
        )}
        {active && trip.status !== 'scheduled' && (
          <button className="ghost" onClick={() => dispatch({ type: 'CANCEL_TRIP', confirm: false })}>
            Cancel
          </button>
        )}
        {state.cancelPrompt && (
          <div className="card">
            <b>{feePreview === 0 ? 'Cancel for free?' : `Cancel for ${formatRand(feePreview)}?`}</b>
            <div style={{ fontSize: 13, color: 'var(--body)' }}>
              Spec: free within 2 min or before assign; R10 after; R15 no-show / late scheduled cancel.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ghost" style={{ background: 'var(--dark)', color: 'var(--light)' }} onClick={() => dispatch({ type: 'CANCEL_TRIP', confirm: true })}>
                Yes, cancel
              </button>
              <button className="ghost" onClick={() => dispatch({ type: 'SET_CANCEL_PROMPT', open: false })}>
                Keep
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Safety() {
  const { state, dispatch } = useStore()
  return (
    <div className="screen dark">
      <div className="scroll">
        <button
          className="ghost"
          style={{ width: 'auto', padding: '0 16px', borderColor: '#C9D8D5', color: '#F6F4EE', alignSelf: 'flex-start' }}
          onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: state.safetyReturn === 'safety' ? 'home' : state.safetyReturn })}
        >
          Back
        </button>
        <div className="title">Safety centre</div>
        <button className="sos" style={{ height: 150, borderRadius: 20, fontSize: 28 }} onClick={() => dispatch({ type: 'SET_SOS', armed: true })}>
          SOS
          <div style={{ fontSize: 13, fontWeight: 400, padding: '8px 20px' }}>Alert Mpumalanga control room + armed response (demo)</div>
        </button>
        {state.sosArmed && <div className="toast">Alert raised — see Admin → Incidents</div>}
        <div className="card">
          <b>Trip shared live</b>
          <span className="muted">Trusted contacts follow on WhatsApp</span>
        </div>
        <div className="card">
          <b>Route check on</b>
          <span className="muted">Deviation / long-stop alerts</span>
        </div>
        <div className="card">
          <b>No data? *120*XXXX#</b>
          <span className="muted">SOS via USSD / SMS (demo surfaces available)</span>
        </div>
      </div>
    </div>
  )
}

function Wallet() {
  const { state, dispatch } = useStore()
  return (
    <div className="screen">
      <div className="scroll">
        <div className="title">Wallet</div>
        <div className="card dark" style={{ padding: 20 }}>
          <span className="muted">Balance</span>
          <span style={{ fontSize: 38, fontWeight: 700 }}>{formatRand(state.walletBalanceCents)}</span>
          <span className="muted">Saver Pass: {state.saverPassRemaining} of 10 shared trips left</span>
        </div>
        <div className="h">TOP UP</div>
        <div className="grid2">
          <button className="box" onClick={() => dispatch({ type: 'TOP_UP', amountCents: 10000, label: 'Spaza / supermarket top-up' })}>
            Spaza / supermarket
          </button>
          <button className="box" onClick={() => dispatch({ type: 'TOP_UP', amountCents: 5000, label: '1Voucher / OTT' })}>
            1Voucher / OTT
          </button>
          <button className="box" onClick={() => dispatch({ type: 'TOP_UP', amountCents: 20000, label: 'Card top-up' })}>
            Card
          </button>
          <button className="box" onClick={() => dispatch({ type: 'TOP_UP', amountCents: 15000, label: 'Instant EFT' })}>
            Instant EFT
          </button>
        </div>
        <button className="ghost" onClick={() => dispatch({ type: 'SET_RIDER_SCREEN', screen: 'saver' })}>
          Manage Saver Pass
        </button>
        <div className="h">LEDGER</div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          {state.walletEntries.slice(0, 8).map((e) => (
            <div className="row" key={e.id}>
              <span>
                {e.label}
                <small style={{ display: 'block', color: 'var(--body)' }}>{e.type}</small>
              </span>
              <b>{formatRandSigned(e.amountCents)}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function RiderApp() {
  const { state } = useStore()
  const map: Record<string, React.ReactNode> = {
    home: <Home />,
    choose: <Choose />,
    parcel: <Parcel />,
    teen: <Teen />,
    school: <School />,
    food: <Food />,
    saver: <Saver />,
    dependants: <Dependants />,
    trip: <Trip />,
    safety: <Safety />,
    wallet: <Wallet />,
  }
  return (
    <>
      {map[state.riderScreen] ?? <Home />}
      <Nav />
    </>
  )
}
