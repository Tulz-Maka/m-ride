import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import {
  CITIES,
  CONFIRMED_POTHOLES,
  DEFAULT_CITY_ID,
  DEFAULT_MERCHANTS,
  DRIVER_SELF_ID,
  SAMPLE_DRIVERS,
  cityById,
  defaultDropoff,
  homePlace,
  makeId,
  makePin,
  placesInCity,
  quoteRide,
} from './data'
import type {
  AppState,
  AppSurface,
  DriverScreen,
  MerchantScreen,
  AdminScreen,
  PaymentMethod,
  Place,
  RideType,
  RiderScreen,
  Trip,
  TripStatus,
  WalletEntry,
} from './types'

const STORAGE_KEY = 'm-ride-demo-v3'

function initialState(): AppState {
  const cityId = DEFAULT_CITY_ID
  const drop = defaultDropoff(cityId)
  return {
    version: 3,
    surface: 'rider',
    cityId,
    riderScreen: 'home',
    driverScreen: 'drive',
    merchantScreen: 'orders',
    adminScreen: 'live',
    safetyReturn: 'home',
    selectedRide: 'go',
    paymentMethod: 'cash',
    destinationId: drop.id,
    bookLater: false,
    scheduledFor: null,
    walletBalanceCents: 12050,
    walletEntries: [
      { id: 'w1', label: 'Change from cash trip', amountCents: 500, at: Date.now() - 86400000, type: 'credit' },
      { id: 'w2', label: "Share ride to i'langa Mall", amountCents: -3600, at: Date.now() - 172800000, type: 'debit' },
      { id: 'w3', label: 'Spaza top-up · Kamagugu', amountCents: 10000, at: Date.now() - 259200000, type: 'topup' },
    ],
    saverPassRemaining: 7,
    trip: null,
    tripsHistory: [],
    driverOnline: false,
    driverOffer: null,
    driverAcceptedTripId: null,
    driverEarningsCents: 67700,
    driverTripsToday: 11,
    dailyFeePaid: true,
    driverOptIns: { she: false, teen: false, school: false },
    potholeReports: [],
    toast: '',
    sosArmed: false,
    cancelPrompt: false,
    searchingStartedAt: null,
    dependants: [
      { id: 'dep-teen', name: 'Thabo Jr', type: 'teen', age: 15, spendingLimitCents: 50000, spentThisMonthCents: 18200 },
      { id: 'dep-child', name: 'Anele', type: 'child', age: 9, spendingLimitCents: 30000, spentThisMonthCents: 9000 },
    ],
    selectedDependantId: 'dep-teen',
    merchants: DEFAULT_MERCHANTS.map((m) => ({ ...m, menu: m.menu.map((i) => ({ ...i })) })),
    selectedMerchantId: 'mch-lowveld-shisa',
    foodCart: [],
    incidents: [
      {
        id: 'inc-1',
        tripId: null,
        type: 'complaint',
        status: 'open',
        cityId: 'mbm',
        at: Date.now() - 3600000,
        notes: "Rider reported delayed pickup near i'langa Mall (R40 roadworks).",
      },
    ],
    waStep: 0,
    ussdStep: 0,
    ussdStack: ['*120*67433#'],
    adminSelectedDriverId: 'drv-thabo',
  }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState()
    const parsed = JSON.parse(raw) as AppState
    if (parsed?.version !== 3) return initialState()
    const validCity = CITIES.some((c) => c.id === parsed.cityId)
    const safeCityId = validCity ? parsed.cityId : DEFAULT_CITY_ID
    const safeDest = placesInCity(safeCityId).some((p) => p.id === parsed.destinationId)
      ? parsed.destinationId
      : defaultDropoff(safeCityId).id
    return {
      ...initialState(),
      ...parsed,
      cityId: safeCityId,
      destinationId: safeDest,
      toast: '',
      cancelPrompt: false,
      sosArmed: false,
      merchants: parsed.merchants?.length ? parsed.merchants : initialState().merchants,
    }
  } catch {
    return initialState()
  }
}

type Action =
  | { type: 'SET_SURFACE'; surface: AppSurface }
  | { type: 'SET_CITY'; cityId: string }
  | { type: 'SET_RIDER_SCREEN'; screen: RiderScreen }
  | { type: 'SET_DRIVER_SCREEN'; screen: DriverScreen }
  | { type: 'SET_MERCHANT_SCREEN'; screen: MerchantScreen }
  | { type: 'SET_ADMIN_SCREEN'; screen: AdminScreen }
  | { type: 'SET_RIDE'; ride: RideType }
  | { type: 'SET_PAY'; pay: PaymentMethod }
  | { type: 'SET_DEST'; id: string }
  | { type: 'TOGGLE_LATER' }
  | { type: 'SET_TOAST'; toast: string }
  | { type: 'SET_CANCEL_PROMPT'; open: boolean }
  | { type: 'SET_SOS'; armed: boolean }
  | { type: 'TOGGLE_DRIVER_ONLINE' }
  | { type: 'TOGGLE_OPT_IN'; key: 'she' | 'teen' | 'school' }
  | { type: 'ACCEPT_OFFER' }
  | { type: 'SKIP_OFFER' }
  | { type: 'DRIVER_ARRIVED' }
  | { type: 'DRIVER_START_TRIP' }
  | { type: 'DRIVER_COMPLETE' }
  | { type: 'REPORT_POTHOLE' }
  | { type: 'BOOK_TRIP'; extra?: Partial<Trip> }
  | { type: 'ADVANCE_SEARCH' }
  | { type: 'ADVANCE_TRIP' }
  | { type: 'CANCEL_TRIP'; confirm: boolean }
  | { type: 'SHARE_TRIP' }
  | { type: 'TOP_UP'; amountCents: number; label: string }
  | { type: 'BUY_SAVER_PASS' }
  | { type: 'SET_DEPENDANT'; id: string }
  | { type: 'SET_MERCHANT'; id: string }
  | { type: 'FOOD_ADD'; itemId: string }
  | { type: 'FOOD_CLEAR' }
  | { type: 'MERCHANT_TOGGLE_ITEM'; itemId: string }
  | { type: 'MERCHANT_TOGGLE_OPEN' }
  | { type: 'ADMIN_ACK_INCIDENT'; id: string }
  | { type: 'ADMIN_SELECT_DRIVER'; id: string }
  | { type: 'WA_NEXT' }
  | { type: 'WA_RESET' }
  | { type: 'USSD_INPUT'; digit: string }
  | { type: 'USSD_RESET' }
  | { type: 'RESET_DEMO' }

function pushEvent(trip: Trip, status: TripStatus, note?: string): Trip {
  return { ...trip, status, events: [...trip.events, { status, at: Date.now(), note }] }
}

function ledger(
  entries: WalletEntry[],
  label: string,
  amountCents: number,
  type: WalletEntry['type'],
  reference?: string,
): WalletEntry[] {
  return [{ id: makeId('w'), label, amountCents, at: Date.now(), type, reference }, ...entries]
}

function pickDriver(ride: RideType, pay: PaymentMethod, cityId: string, optIns?: AppState['driverOptIns']) {
  void optIns
  const filterPool = (drivers: typeof SAMPLE_DRIVERS) => {
    let pool = drivers.filter((d) => d.online && d.id !== DRIVER_SELF_ID)
    if (ride === 'she') pool = pool.filter((d) => d.sheEligible)
    if (ride === 'teen') pool = pool.filter((d) => d.teenEligible && d.rating >= 4.8)
    if (ride === 'school') pool = pool.filter((d) => d.schoolEligible && d.rating >= 4.8)
    if (pay === 'cash') pool = pool.filter((d) => d.acceptsCash)
    return pool.sort((a, b) => b.rating - a.rating)
  }
  const local = filterPool(SAMPLE_DRIVERS.filter((d) => d.cityId === cityId))
  if (local[0]) return local[0]
  const district = cityById(cityId).district
  const inDistrict = filterPool(SAMPLE_DRIVERS.filter((d) => cityById(d.cityId).district === district))
  if (inDistrict[0]) return inDistrict[0]
  return filterPool(SAMPLE_DRIVERS)[0] ?? null
}

export function cancellationFeeCents(trip: Trip, now: number): number {
  if (trip.status === 'requested' || trip.status === 'searching' || trip.status === 'scheduled') {
    if (trip.scheduledFor) {
      const minsBefore = (trip.scheduledFor - now) / 60000
      if (minsBefore > 60) return 0
      return trip.assignedAt ? 1500 : 0
    }
    return 0
  }
  if (!trip.assignedAt) return 0
  if (trip.scheduledFor) {
    const minsBefore = (trip.scheduledFor - now) / 60000
    if (minsBefore > 60) return 0
    return 1500
  }
  const minsSinceAssign = (now - trip.assignedAt) / 60000
  if (minsSinceAssign <= 2) return 0
  return 1000
}

function seedOffer(state: AppState): Trip {
  const pickup = homePlace(state.cityId)
  const dropoff = placesInCity(state.cityId).find((p) => p.id === state.destinationId) ?? defaultDropoff(state.cityId)
  const q = quoteRide('go', pickup, dropoff)
  return {
    id: makeId('offer'),
    type: 'go',
    status: 'assigned',
    pickup,
    dropoff,
    paymentMethod: 'cash',
    quotedFareCents: q.fareCents,
    finalFareCents: q.fareCents,
    pin: makePin(),
    driverId: DRIVER_SELF_ID,
    scheduledFor: null,
    bookedAt: Date.now(),
    assignedAt: Date.now(),
    arrivedAt: null,
    events: [],
    shared: false,
    cancellationFeeCents: 0,
    cityId: state.cityId,
  }
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SURFACE':
      return { ...state, surface: action.surface }
    case 'SET_CITY': {
      const targetCity = cityById(action.cityId)
      const drop = defaultDropoff(targetCity.id)
      const merchants = state.merchants
      const localMerchant =
        merchants.find((m) => m.cityId === targetCity.id) ??
        merchants.find((m) => cityById(m.cityId).district === targetCity.district) ??
        merchants[0]
      return {
        ...state,
        cityId: targetCity.id,
        destinationId: drop.id,
        selectedMerchantId: localMerchant?.id ?? state.selectedMerchantId,
        foodCart: [],
        toast: `Town set to ${targetCity.name}, Mpumalanga`,
      }
    }
    case 'SET_RIDER_SCREEN': {
      const safetyReturn =
        action.screen === 'safety'
          ? state.riderScreen === 'safety'
            ? state.safetyReturn
            : state.riderScreen
          : state.safetyReturn
      return { ...state, riderScreen: action.screen, safetyReturn, cancelPrompt: action.screen === 'trip' ? state.cancelPrompt : false }
    }
    case 'SET_DRIVER_SCREEN':
      return { ...state, driverScreen: action.screen }
    case 'SET_MERCHANT_SCREEN':
      return { ...state, merchantScreen: action.screen }
    case 'SET_ADMIN_SCREEN':
      return { ...state, adminScreen: action.screen }
    case 'SET_RIDE':
      return { ...state, selectedRide: action.ride }
    case 'SET_PAY':
      return { ...state, paymentMethod: action.pay }
    case 'SET_DEST':
      return { ...state, destinationId: action.id }
    case 'TOGGLE_LATER': {
      const next = !state.bookLater
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(6, 30, 0, 0)
      return { ...state, bookLater: next, scheduledFor: next ? tomorrow.getTime() : null }
    }
    case 'SET_TOAST':
      return { ...state, toast: action.toast }
    case 'SET_CANCEL_PROMPT':
      return { ...state, cancelPrompt: action.open }
    case 'SET_SOS': {
      const incidents = action.armed
        ? [
            {
              id: makeId('inc'),
              tripId: state.trip?.id ?? null,
              type: 'panic' as const,
              status: 'open' as const,
              cityId: state.cityId,
              at: Date.now(),
              notes: `SOS from rider app in ${cityById(state.cityId).name} — Mpumalanga control room + armed response (demo).`,
            },
            ...state.incidents,
          ]
        : state.incidents
      return {
        ...state,
        sosArmed: action.armed,
        incidents,
        toast: action.armed ? 'SOS sent to control room and armed response (demo).' : state.toast,
      }
    }
    case 'TOGGLE_DRIVER_ONLINE': {
      const online = !state.driverOnline
      let offer = state.driverOffer
      if (!online) offer = null
      else if (!state.driverAcceptedTripId && state.trip && ['searching', 'requested'].includes(state.trip.status)) {
        offer = { ...state.trip, status: 'assigned' }
      } else if (!state.driverAcceptedTripId && !state.trip) {
        offer = seedOffer(state)
      }
      return { ...state, driverOnline: online, driverOffer: online ? offer : null }
    }
    case 'TOGGLE_OPT_IN':
      return { ...state, driverOptIns: { ...state.driverOptIns, [action.key]: !state.driverOptIns[action.key] } }
    case 'ACCEPT_OFFER': {
      if (!state.driverOffer) return state
      const offer = pushEvent(
        { ...state.driverOffer, status: 'arriving', assignedAt: Date.now(), driverId: DRIVER_SELF_ID },
        'arriving',
        'Driver accepted',
      )
      let trip = state.trip
      if (trip && (['searching', 'requested', 'assigned'].includes(trip.status) || trip.id === offer.id)) {
        trip = {
          ...trip,
          status: 'arriving',
          driverId: DRIVER_SELF_ID,
          assignedAt: Date.now(),
          events: [...trip.events, { status: 'arriving', at: Date.now(), note: 'Driver accepted' }],
        }
      } else {
        trip = offer
      }
      return {
        ...state,
        driverOffer: null,
        driverAcceptedTripId: offer.id,
        trip,
        toast: 'Trip accepted. Head to pickup.',
      }
    }
    case 'SKIP_OFFER':
      return { ...state, driverOffer: null }
    case 'DRIVER_ARRIVED': {
      if (!state.trip || !state.driverAcceptedTripId) return state
      return { ...state, trip: pushEvent({ ...state.trip, arrivedAt: Date.now() }, 'arrived', 'Driver at pickup'), toast: 'Arrived at pickup.' }
    }
    case 'DRIVER_START_TRIP': {
      if (!state.trip) return state
      return { ...state, trip: pushEvent(state.trip, 'in_progress', 'Trip started with PIN'), toast: 'Trip in progress.' }
    }
    case 'DRIVER_COMPLETE': {
      if (!state.trip) return state
      const fare = state.trip.finalFareCents
      const earnings = state.dailyFeePaid ? fare : Math.round(fare * 0.85)
      let wallet = state.walletBalanceCents
      let entries = state.walletEntries
      let saver = state.saverPassRemaining
      if (state.trip.paymentMethod === 'wallet') {
        wallet -= fare
        entries = ledger(entries, `${state.trip.type} ride`, -fare, 'debit', state.trip.id)
      } else if (state.trip.paymentMethod === 'cash') {
        wallet += 500
        entries = ledger(entries, 'Change from cash trip', 500, 'credit', state.trip.id)
      }
      if (state.trip.type === 'share' && saver > 0) saver -= 1
      const trip = pushEvent({ ...state.trip, status: 'completed' }, 'completed')
      let merchants = state.merchants
      if (trip.merchantId && trip.foodItems) {
        const foodTotal = trip.foodItems.reduce((s, i) => s + i.priceCents * i.qty, 0)
        const merchantCut = Math.round(foodTotal * 0.85)
        merchants = merchants.map((m) =>
          m.id === trip.merchantId ? { ...m, balanceCents: m.balanceCents + merchantCut } : m,
        )
      }
      return {
        ...state,
        trip,
        tripsHistory: [trip, ...state.tripsHistory].slice(0, 20),
        driverAcceptedTripId: null,
        driverEarningsCents: state.driverEarningsCents + earnings,
        driverTripsToday: state.driverTripsToday + 1,
        walletBalanceCents: wallet,
        walletEntries: entries,
        saverPassRemaining: saver,
        merchants,
        foodCart: [],
        toast: `Trip complete. Driver kept ${state.dailyFeePaid ? '100%' : '85%'} of fare.`,
      }
    }
    case 'REPORT_POTHOLE': {
      const spots = CONFIRMED_POTHOLES.filter((p) => p.cityId === state.cityId)
      const spot = spots[state.potholeReports.length % Math.max(spots.length, 1)] ?? CONFIRMED_POTHOLES[0]
      return {
        ...state,
        potholeReports: [
          { id: makeId('ph'), lat: spot.lat, lng: spot.lng, road: spot.road, cityId: state.cityId, at: Date.now(), confirmed: false },
          ...state.potholeReports,
        ],
        toast: 'Pothole reported. Confirmed after 3 drivers report the same spot.',
      }
    }
    case 'BOOK_TRIP': {
      const pickup = homePlace(state.cityId)
      const dropoff = placesInCity(state.cityId).find((p) => p.id === state.destinationId) ?? defaultDropoff(state.cityId)
      const ride = action.extra?.type ?? state.selectedRide
      let fareCents = quoteRide(ride, pickup, dropoff).fareCents
      if (ride === 'share' && state.saverPassRemaining > 0 && state.paymentMethod === 'wallet') {
        // Saver Pass still books at share price; remaining decremented on complete
      }
      if (ride === 'food' && action.extra?.foodItems?.length) {
        const food = action.extra.foodItems.reduce((s, i) => s + i.priceCents * i.qty, 0)
        fareCents = food + quoteRide('food', pickup, dropoff).fareCents
      }
      const scheduled = state.bookLater || ride === 'school' ? state.scheduledFor ?? (() => {
        const t = new Date()
        t.setDate(t.getDate() + 1)
        t.setHours(6, 30, 0, 0)
        return t.getTime()
      })() : null
      const trip: Trip = {
        id: makeId('trip'),
        type: ride,
        status: scheduled ? 'scheduled' : 'searching',
        pickup,
        dropoff,
        paymentMethod: state.paymentMethod,
        quotedFareCents: fareCents,
        finalFareCents: fareCents,
        pin: makePin(),
        pinEnd: ride === 'school' || ride === 'teen' ? makePin() : undefined,
        driverId: null,
        scheduledFor: scheduled,
        bookedAt: Date.now(),
        assignedAt: null,
        arrivedAt: null,
        events: [{ status: scheduled ? 'scheduled' : 'searching', at: Date.now() }],
        shared: false,
        cancellationFeeCents: 0,
        cityId: state.cityId,
        dependantId: state.selectedDependantId ?? undefined,
        ...action.extra,
      }
      let driverOffer = state.driverOffer
      if (state.driverOnline && !state.driverAcceptedTripId && !scheduled) {
        driverOffer = { ...trip, status: 'assigned' }
      }
      return {
        ...state,
        trip,
        searchingStartedAt: scheduled ? null : Date.now(),
        riderScreen: 'trip',
        cancelPrompt: false,
        driverOffer,
        toast: scheduled ? 'Scheduled. Driver assigned 30 min before pickup.' : 'Looking for a nearby driver…',
      }
    }
    case 'ADVANCE_SEARCH': {
      if (!state.trip || state.trip.status !== 'searching') return state
      const elapsed = Date.now() - (state.searchingStartedAt ?? state.trip.bookedAt)
      if (elapsed < 2500) return state
      if (state.driverOnline && !state.driverAcceptedTripId) {
        return { ...state, driverOffer: { ...state.trip, status: 'assigned' }, toast: 'Driver found — waiting for accept…' }
      }
      const driver = pickDriver(state.trip.type, state.trip.paymentMethod, state.cityId)
      if (!driver) {
        if (elapsed > 12000) {
          return { ...state, trip: pushEvent(state.trip, 'no_driver', 'No driver found'), toast: 'No driver found. Try another service or city.' }
        }
        return state
      }
      return {
        ...state,
        trip: {
          ...state.trip,
          status: 'arriving',
          driverId: driver.id,
          assignedAt: Date.now(),
          events: [
            ...state.trip.events,
            { status: 'assigned', at: Date.now(), note: `Matched ${driver.name}` },
            { status: 'arriving', at: Date.now(), note: 'Driver en route' },
          ],
        },
        searchingStartedAt: null,
        toast: `${driver.name.split(' ')[0]} is on the way`,
      }
    }
    case 'ADVANCE_TRIP': {
      if (!state.trip || state.trip.driverId === DRIVER_SELF_ID) return state
      if (state.trip.status === 'arriving') {
        const since = Date.now() - (state.trip.assignedAt ?? Date.now())
        if (since > 4000) return { ...state, trip: pushEvent({ ...state.trip, arrivedAt: Date.now() }, 'arrived'), toast: 'Your driver has arrived' }
      }
      if (state.trip.status === 'arrived') {
        const since = Date.now() - (state.trip.arrivedAt ?? Date.now())
        if (since > 3500) return { ...state, trip: pushEvent(state.trip, 'in_progress', 'Trip started'), toast: 'Trip started' }
      }
      if (state.trip.status === 'in_progress') {
        const start = state.trip.events.find((e) => e.status === 'in_progress')?.at ?? Date.now()
        if (Date.now() - start > 6000) {
          let wallet = state.walletBalanceCents
          let entries = state.walletEntries
          let saver = state.saverPassRemaining
          const fare = state.trip.finalFareCents
          if (state.trip.paymentMethod === 'wallet') {
            wallet -= fare
            entries = ledger(entries, `${state.trip.type} ride`, -fare, 'debit', state.trip.id)
          }
          if (state.trip.type === 'share' && saver > 0) saver -= 1
          const trip = pushEvent(state.trip, 'completed')
          return {
            ...state,
            trip,
            tripsHistory: [trip, ...state.tripsHistory].slice(0, 20),
            walletBalanceCents: wallet,
            walletEntries: entries,
            saverPassRemaining: saver,
            toast: 'You have arrived. Thanks for riding M-Ride.',
          }
        }
      }
      return state
    }
    case 'CANCEL_TRIP': {
      if (!state.trip) return state
      if (!action.confirm) return { ...state, cancelPrompt: true }
      const fee = cancellationFeeCents(state.trip, Date.now())
      let wallet = state.walletBalanceCents
      let entries = state.walletEntries
      if (fee > 0) {
        wallet -= fee
        entries = ledger(entries, 'Cancellation fee (to driver)', -fee, 'fee', state.trip.id)
      }
      const trip = pushEvent({ ...state.trip, status: 'cancelled_rider', cancellationFeeCents: fee }, 'cancelled_rider')
      return {
        ...state,
        trip,
        tripsHistory: [trip, ...state.tripsHistory].slice(0, 20),
        cancelPrompt: false,
        driverOffer: null,
        driverAcceptedTripId: state.driverAcceptedTripId === state.trip.id ? null : state.driverAcceptedTripId,
        walletBalanceCents: wallet,
        walletEntries: entries,
        riderScreen: 'home',
        toast: fee ? `Cancelled. ${fee / 100} rand fee to driver.` : 'Cancelled for free.',
      }
    }
    case 'SHARE_TRIP':
      if (!state.trip) return state
      return { ...state, trip: { ...state.trip, shared: true }, toast: 'Trip shared live with trusted contacts (demo).' }
    case 'TOP_UP':
      return {
        ...state,
        walletBalanceCents: state.walletBalanceCents + action.amountCents,
        walletEntries: ledger(state.walletEntries, action.label, action.amountCents, 'topup'),
        toast: `Wallet topped up (demo).`,
      }
    case 'BUY_SAVER_PASS':
      return {
        ...state,
        saverPassRemaining: 10,
        walletBalanceCents: state.walletBalanceCents - 28000,
        walletEntries: ledger(state.walletEntries, 'Saver Pass · 10 Share trips', -28000, 'debit'),
        toast: 'Saver Pass activated: 10 shared work trips.',
        riderScreen: 'wallet',
      }
    case 'SET_DEPENDANT':
      return { ...state, selectedDependantId: action.id }
    case 'SET_MERCHANT':
      return { ...state, selectedMerchantId: action.id, foodCart: [] }
    case 'FOOD_ADD': {
      const existing = state.foodCart.find((c) => c.itemId === action.itemId)
      const foodCart = existing
        ? state.foodCart.map((c) => (c.itemId === action.itemId ? { ...c, qty: c.qty + 1 } : c))
        : [...state.foodCart, { itemId: action.itemId, qty: 1 }]
      return { ...state, foodCart }
    }
    case 'FOOD_CLEAR':
      return { ...state, foodCart: [] }
    case 'MERCHANT_TOGGLE_ITEM':
      return {
        ...state,
        merchants: state.merchants.map((m) =>
          m.id === state.selectedMerchantId
            ? { ...m, menu: m.menu.map((i) => (i.id === action.itemId ? { ...i, available: !i.available } : i)) }
            : m,
        ),
      }
    case 'MERCHANT_TOGGLE_OPEN':
      return {
        ...state,
        merchants: state.merchants.map((m) =>
          m.id === state.selectedMerchantId ? { ...m, open: !m.open } : m,
        ),
      }
    case 'ADMIN_ACK_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map((i) => (i.id === action.id ? { ...i, status: 'acknowledged' } : i)),
        toast: 'Incident acknowledged by control room.',
      }
    case 'ADMIN_SELECT_DRIVER':
      return { ...state, adminSelectedDriverId: action.id }
    case 'WA_NEXT':
      return { ...state, waStep: Math.min(state.waStep + 1, 5) }
    case 'WA_RESET':
      return { ...state, waStep: 0 }
    case 'USSD_INPUT': {
      const stack = [...state.ussdStack, action.digit]
      return { ...state, ussdStack: stack, ussdStep: stack.length - 1 }
    }
    case 'USSD_RESET':
      return { ...state, ussdStack: ['*120*67433#'], ussdStep: 0 }
    case 'RESET_DEMO':
      return { ...initialState(), surface: state.surface, cityId: state.cityId }
    default:
      return state
  }
}

interface StoreApi {
  state: AppState
  dispatch: React.Dispatch<Action>
  city: ReturnType<typeof cityById>
  places: Place[]
  pickup: Place
  dropoff: Place
  quotes: ReturnType<typeof quoteRide>[]
  activeDriver: (typeof SAMPLE_DRIVERS)[0] | null
  selectedMerchant: (typeof DEFAULT_MERCHANTS)[0] | null
}

const StoreContext = createContext<StoreApi | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const ready = useRef(false)
  useEffect(() => {
    ready.current = true
  }, [])
  useEffect(() => {
    if (!ready.current) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])
  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch({ type: 'ADVANCE_SEARCH' })
      dispatch({ type: 'ADVANCE_TRIP' })
    }, 800)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    if (!state.toast) return
    const t = window.setTimeout(() => dispatch({ type: 'SET_TOAST', toast: '' }), 3500)
    return () => clearTimeout(t)
  }, [state.toast])

  const city = cityById(state.cityId)
  const places = placesInCity(state.cityId)
  const pickup = homePlace(state.cityId)
  const dropoff = places.find((p) => p.id === state.destinationId) ?? defaultDropoff(state.cityId)
  const quotes = useMemo(
    () => (['share', 'go', 'she', 'teen', 'school', 'exec'] as RideType[]).map((t) => quoteRide(t, pickup, dropoff)),
    [pickup, dropoff],
  )
  const activeDriver = useMemo(() => {
    if (!state.trip?.driverId) return null
    return SAMPLE_DRIVERS.find((d) => d.id === state.trip!.driverId) ?? null
  }, [state.trip])
  const selectedMerchant = state.merchants.find((m) => m.id === state.selectedMerchantId) ?? null

  const api = useMemo(
    () => ({ state, dispatch, city, places, pickup, dropoff, quotes, activeDriver, selectedMerchant }),
    [state, city, places, pickup, dropoff, quotes, activeDriver, selectedMerchant],
  )
  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore outside provider')
  return ctx
}
