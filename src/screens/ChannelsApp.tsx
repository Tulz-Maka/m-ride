import { DRIVER_SELF_ID, SAMPLE_DRIVERS, cityById, formatRand, quoteRide } from '../store/data'
import { useStore } from '../store/store'

export function WhatsAppApp() {
  const { state, dispatch, city, pickup, dropoff } = useStore()
  const qGo = quoteRide('go', pickup, dropoff)
  const qShare = quoteRide('share', pickup, dropoff)
  const qShe = quoteRide('she', pickup, dropoff)
  const townShort = city.name.split(' (')[0]
  const pickupShort = pickup.address.split(',')[0]
  const dropoffShort = dropoff.address.split(',')[0]
  const localDriver =
    SAMPLE_DRIVERS.find((d) => d.online && d.cityId === city.id && d.id !== DRIVER_SELF_ID) ??
    SAMPLE_DRIVERS.find((d) => d.online && cityById(d.cityId).district === city.district && d.id !== DRIVER_SELF_ID) ??
    SAMPLE_DRIVERS[0]

  const waSteps = [
    {
      from: 'M-Ride',
      text: `Sawubona! Welcome to M-Ride Mpumalanga (${townShort}). Reply with a number:\n1. Book a ride\n2. Book a parcel\n3. My trips\n4. Help`,
    },
    { from: 'You', text: '1' },
    {
      from: 'M-Ride',
      text: `Where to in ${townShort}? Send a place name or pin.\n(Demo) ${dropoffShort} selected.`,
    },
    { from: 'You', text: dropoffShort },
    {
      from: 'M-Ride',
      text: `${pickupShort} → ${dropoffShort}:\nGo ${formatRand(qGo.fareCents)} · Share ${formatRand(qShare.fareCents)} · She ${formatRand(qShe.fareCents)}\nReply GO, SHARE or SHE.\nPay: CASH / CARD / WALLET`,
    },
    {
      from: 'M-Ride',
      text: `Booked Go · cash. ${localDriver.name.split(' ')[0]} (${localDriver.plate}) is ${qGo.etaMin} min away in ${townShort}. PIN 4821. Share trip: reply SHARETRIP. SOS: reply SOS.`,
    },
  ]

  const visible = waSteps.slice(0, state.waStep + 1)
  return (
    <div className="screen" style={{ background: '#ECE5DD' }}>
      <div className="top" style={{ background: '#075E54' }}>
        <div className="brand" style={{ fontSize: 22 }}>
          WhatsApp booking
        </div>
        <div className="muted">R1 · {townShort}, Mpumalanga · same booking API</div>
      </div>
      <div className="scroll">
        {visible.map((m, i) => (
          <div
            key={i}
            className="card"
            style={{
              alignSelf: m.from === 'You' ? 'flex-end' : 'flex-start',
              maxWidth: '88%',
              background: m.from === 'You' ? '#DCF8C6' : '#fff',
              whiteSpace: 'pre-wrap',
              fontSize: 14,
            }}
          >
            <b style={{ fontSize: 11, color: 'var(--teal)' }}>{m.from}</b>
            {m.text}
          </div>
        ))}
        <button className="cta" onClick={() => dispatch({ type: 'WA_NEXT' })} disabled={state.waStep >= waSteps.length - 1}>
          {state.waStep >= waSteps.length - 1 ? 'Conversation complete' : 'Next message'}
        </button>
        <button className="ghost" onClick={() => dispatch({ type: 'WA_RESET' })}>
          Restart chat
        </button>
        <div className="note">Demo-faithful WhatsApp Business surface for Mpumalanga — not connected to a live provider.</div>
      </div>
    </div>
  )
}

const USSD_MENUS: Record<string, { title: string; options: { key: string; label: string }[] }> = {
  '*120*67433#': {
    title: 'M-Ride Mpumalanga',
    options: [
      { key: '1', label: 'Book ride' },
      { key: '2', label: 'Book parcel' },
      { key: '3', label: 'Wallet balance' },
      { key: '4', label: 'SOS' },
    ],
  },
  '1': {
    title: 'Book ride (MP)',
    options: [
      { key: '1', label: 'Go' },
      { key: '2', label: 'Share' },
      { key: '3', label: 'She' },
      { key: '0', label: 'Back' },
    ],
  },
  '2': {
    title: 'Parcel (MP)',
    options: [
      { key: '1', label: 'Small · COD optional' },
      { key: '0', label: 'Back' },
    ],
  },
  '3': {
    title: 'Wallet',
    options: [
      { key: '1', label: 'Show balance' },
      { key: '0', label: 'Back' },
    ],
  },
  '4': {
    title: 'SOS (Mpumalanga)',
    options: [
      { key: '1', label: 'Alert MP control room' },
      { key: '0', label: 'Back' },
    ],
  },
}

export function UssdApp() {
  const { state, dispatch, city, dropoff } = useStore()
  const townShort = city.name.split(' (')[0]
  const dropoffShort = dropoff.address.split(',')[0]
  const last = state.ussdStack[state.ussdStack.length - 1] ?? '*120*67433#'
  const menu =
    last === '*120*67433#'
      ? { ...USSD_MENUS['*120*67433#'], title: `M-Ride MP · ${townShort}` }
      : USSD_MENUS[last] ?? {
          title: 'Confirmed',
          options: [{ key: '0', label: 'Main menu' }],
        }

  const resultText = (() => {
    if (state.ussdStack.join('>').includes('3>1')) return `Balance ${formatRand(state.walletBalanceCents)}`
    if (state.ussdStack.join('>').includes('4>1')) return `SOS sent to Mpumalanga control room (${townShort}) (demo). Help is coming.`
    if (state.ussdStack.includes('1') && ['1', '2', '3'].includes(last) && state.ussdStack.length > 2)
      return `Ride booked in ${townShort} → ${dropoffShort}. SMS confirmation on the way (demo).`
    if (state.ussdStack.join('>').includes('2>1'))
      return `Parcel booked in ${townShort} → ${dropoffShort}. SMS PIN on the way (demo).`
    return null
  })()

  return (
    <div className="screen dark">
      <div className="scroll">
        <div className="title" style={{ fontSize: 26 }}>
          USSD · R2
        </div>
        <div className="muted">
          Mpumalanga ({townShort}) · *120*67433# (demo code)
        </div>
        <div className="card" style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, lineHeight: 1.5 }}>
          <b>{menu.title}</b>
          {menu.options.map((o) => (
            <div key={o.key}>
              {o.key}. {o.label}
            </div>
          ))}
          {resultText && (
            <>
              <hr style={{ borderColor: '#2E7D74' }} />
              <div>{resultText}</div>
            </>
          )}
        </div>
        <div className="grid4">
          {menu.options.map((o) => (
            <button
              key={o.key}
              className="box"
              style={{ background: 'var(--deep)', color: 'var(--light)', border: 'none' }}
              onClick={() => {
                if (o.key === '0') dispatch({ type: 'USSD_RESET' })
                else dispatch({ type: 'USSD_INPUT', digit: o.key })
              }}
            >
              {o.key}
            </button>
          ))}
        </div>
        <button className="ghost" style={{ borderColor: '#C9D8D5', color: '#F6F4EE' }} onClick={() => dispatch({ type: 'USSD_RESET' })}>
          Hang up / reset
        </button>
        <div className="note" style={{ background: '#183B40', color: '#C9D8D5' }}>
          Tech spec: USSD is Release 2. WhatsApp booking is Release 1. Both call the same Mpumalanga booking API in production.
        </div>
      </div>
    </div>
  )
}
