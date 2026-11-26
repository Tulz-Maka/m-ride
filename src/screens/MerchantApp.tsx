import { cityById, formatRand } from '../store/data'
import { useStore } from '../store/store'

function Nav() {
  const { state, dispatch } = useStore()
  const items: { id: typeof state.merchantScreen; label: string }[] = [
    { id: 'orders', label: 'Orders' },
    { id: 'menu', label: 'Menu' },
    { id: 'hours', label: 'Hours' },
    { id: 'payouts', label: 'Payouts' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map((x) => (
        <button key={x.id} className={state.merchantScreen === x.id ? 'on' : ''} onClick={() => dispatch({ type: 'SET_MERCHANT_SCREEN', screen: x.id })}>
          {x.label}
        </button>
      ))}
    </nav>
  )
}

export function MerchantApp() {
  const { state, dispatch, selectedMerchant } = useStore()
  const merchant =
    selectedMerchant ?? state.merchants.find((m) => m.cityId === state.cityId) ?? state.merchants[0]
  const merchantCity = merchant ? cityById(merchant.cityId) : null
  const foodTrips = [state.trip, ...state.tripsHistory].filter((t) => t && t.type === 'food' && t.merchantId === merchant?.id)

  if (!merchant) {
    return (
      <div className="screen">
        <div className="scroll">
          <div className="title">Merchant</div>
          <div className="card">No merchants loaded.</div>
        </div>
      </div>
    )
  }

  let body: React.ReactNode
  if (state.merchantScreen === 'menu') {
    body = (
      <div className="scroll">
        <div className="title">Menu</div>
        <div className="note">Release 2 · 15% restaurant commission in the pitch model.</div>
        {merchant.menu.map((item) => (
          <button key={item.id} className={`opt ${item.available ? 'sel' : ''}`} onClick={() => dispatch({ type: 'MERCHANT_TOGGLE_ITEM', itemId: item.id })}>
            <span>
              <b>{item.name}</b>
              <small>{item.available ? 'Available' : 'Sold out — tap to toggle'}</small>
            </span>
            <span className="p">{formatRand(item.priceCents)}</span>
          </button>
        ))}
      </div>
    )
  } else if (state.merchantScreen === 'hours') {
    body = (
      <div className="scroll">
        <div className="title">Hours</div>
        <div className="card">
          <b>{merchant.name}</b>
          <span style={{ fontSize: 13, color: 'var(--body)' }}>
            {merchantCity?.name}, Mpumalanga · {merchant.cuisine}
          </span>
        </div>
        <button className="toggle" style={{ background: merchant.open ? 'var(--teal)' : 'var(--amber)', color: '#fff' }} onClick={() => dispatch({ type: 'MERCHANT_TOGGLE_OPEN' })}>
          {merchant.open ? 'Open now' : 'Closed — tap to open'}
        </button>
        <div className="card">
          <div className="row">
            <span>Mon–Thu</span>
            <b>10:00–21:00</b>
          </div>
          <div className="row">
            <span>Fri–Sat</span>
            <b>10:00–23:00</b>
          </div>
          <div className="row">
            <span>Sun</span>
            <b>11:00–20:00</b>
          </div>
        </div>
      </div>
    )
  } else if (state.merchantScreen === 'payouts') {
    body = (
      <div className="scroll">
        <div className="title">Payouts</div>
        <div className="card dark" style={{ padding: 20 }}>
          <span className="muted">Available balance</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{formatRand(merchant.balanceCents)}</span>
          <span className="muted">After {merchant.commissionPct}% M-Ride commission</span>
        </div>
        <div className="card" style={{ padding: '4px 14px', gap: 0 }}>
          <div className="row">
            <span>Weekly payout · pending</span>
            <b>{formatRand(Math.round(merchant.balanceCents * 0.4))}</b>
          </div>
          <div className="row">
            <span>Last payout</span>
            <b>{formatRand(85000)}</b>
          </div>
        </div>
      </div>
    )
  } else {
    body = (
      <div className="scroll">
        <div className="title">Orders</div>
        <div className="note">
          Merchant portal · R2 Food (Mpumalanga). Switch town or kitchen below to view Ehlanzeni, Nkangala &amp; Gert Sibande menus. Place a Food order in the Rider app to feed this queue.
        </div>
        <div className="h">{merchant.name.toUpperCase()}</div>
        {foodTrips.length === 0 ? (
          <div className="card">
            <b>No live orders</b>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>Demo: book Food from the rider app while this merchant is selected.</span>
          </div>
        ) : (
          foodTrips.filter(Boolean).map((t) => (
            <div className="card" key={t!.id}>
              <b>
                {t!.status} · {formatRand(t!.quotedFareCents)}
              </b>
              <span style={{ fontSize: 13, color: 'var(--body)' }}>
                {(t!.foodItems ?? []).map((i) => `${i.qty}× ${i.name}`).join(', ') || 'Food order'}
              </span>
            </div>
          ))
        )}
        <div className="h">MPUMALANGA KITCHENS</div>
        {state.merchants.map((m) => {
          const mc = cityById(m.cityId)
          return (
            <button key={m.id} className={`opt ${m.id === merchant.id ? 'sel' : ''}`} onClick={() => dispatch({ type: 'SET_MERCHANT', id: m.id })}>
              <span>
                <b>{m.name}</b>
                <small>
                  {mc.name} ({mc.district}) · {m.open ? 'Open' : 'Closed'}
                </small>
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="top" style={{ paddingBottom: 16 }}>
        <div className="brand">
          M<span>-</span>Ride <span style={{ fontSize: 16, color: 'inherit' }}>Merchant</span>
        </div>
        <div className="muted">R2 portal · Mpumalanga kitchens · tablet / web</div>
      </div>
      {body}
      <Nav />
    </div>
  )
}
