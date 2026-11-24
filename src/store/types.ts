export type RideType =
  | 'go'
  | 'share'
  | 'she'
  | 'teen'
  | 'school'
  | 'exec'
  | 'parcel'
  | 'food'

export type PaymentMethod = 'cash' | 'card' | 'wallet' | 'business'
export type AppSurface =
  | 'rider'
  | 'driver'
  | 'merchant'
  | 'admin'
  | 'whatsapp'
  | 'ussd'

export type TripStatus =
  | 'requested'
  | 'searching'
  | 'assigned'
  | 'arriving'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled_rider'
  | 'cancelled_driver'
  | 'no_driver'
  | 'no_show'
  | 'scheduled'

export type RiderScreen =
  | 'home'
  | 'choose'
  | 'trip'
  | 'safety'
  | 'wallet'
  | 'parcel'
  | 'teen'
  | 'school'
  | 'food'
  | 'saver'
  | 'dependants'

export type DriverScreen = 'drive' | 'earnings' | 'roadmap' | 'help' | 'settings'
export type MerchantScreen = 'orders' | 'menu' | 'payouts' | 'hours'
export type AdminScreen = 'live' | 'drivers' | 'incidents' | 'fares' | 'reports'

export type Province =
  | 'Gauteng'
  | 'Western Cape'
  | 'KwaZulu-Natal'
  | 'Eastern Cape'
  | 'Free State'
  | 'Limpopo'
  | 'Mpumalanga'
  | 'North West'
  | 'Northern Cape'

export interface City {
  id: string
  name: string
  province: Province
  center: { lat: number; lng: number }
}

export interface Place {
  id: string
  label: string
  address: string
  cityId: string
  lat: number
  lng: number
}

export interface DriverProfile {
  id: string
  name: string
  initials: string
  rating: number
  vehicle: string
  plate: string
  cityId: string
  gender: 'female' | 'male'
  sheEligible: boolean
  teenEligible: boolean
  schoolEligible: boolean
  acceptsCash: boolean
  feePlan: 'commission' | 'daily'
  online: boolean
  checkStatus: 'ok' | 'selfie_due' | 'docs_expiring'
  licenceUntil: string
}

export interface Quote {
  rideType: RideType
  label: string
  blurb: string
  fareCents: number
  etaMin: number
  distanceKm: number
  release: 'R1' | 'R2'
}

export interface TripEvent {
  status: TripStatus
  at: number
  note?: string
}

export interface Trip {
  id: string
  type: RideType
  status: TripStatus
  pickup: Place
  dropoff: Place
  paymentMethod: PaymentMethod
  quotedFareCents: number
  finalFareCents: number
  pin: string
  pinEnd?: string
  driverId: string | null
  scheduledFor: number | null
  bookedAt: number
  assignedAt: number | null
  arrivedAt: number | null
  events: TripEvent[]
  shared: boolean
  cancellationFeeCents: number
  dependantId?: string
  receiverName?: string
  receiverPhone?: string
  parcelSize?: 'small' | 'medium' | 'large'
  codCents?: number
  merchantId?: string
  foodItems?: { name: string; priceCents: number; qty: number }[]
  cityId: string
}

export interface WalletEntry {
  id: string
  label: string
  amountCents: number
  at: number
  type: 'credit' | 'debit' | 'fee' | 'topup' | 'refund'
  reference?: string
}

export interface PotholeReport {
  id: string
  lat: number
  lng: number
  road: string
  cityId: string
  at: number
  confirmed: boolean
}

export interface Dependant {
  id: string
  name: string
  type: 'teen' | 'child'
  age: number
  spendingLimitCents: number
  spentThisMonthCents: number
}

export interface Merchant {
  id: string
  name: string
  cityId: string
  cuisine: string
  open: boolean
  commissionPct: number
  balanceCents: number
  menu: { id: string; name: string; priceCents: number; available: boolean }[]
}

export interface Incident {
  id: string
  tripId: string | null
  type: 'panic' | 'deviation' | 'complaint' | 'no_show'
  status: 'open' | 'acknowledged' | 'closed'
  cityId: string
  at: number
  notes: string
}

export interface AppState {
  version: 2
  surface: AppSurface
  cityId: string
  riderScreen: RiderScreen
  driverScreen: DriverScreen
  merchantScreen: MerchantScreen
  adminScreen: AdminScreen
  safetyReturn: RiderScreen
  selectedRide: RideType
  paymentMethod: PaymentMethod
  destinationId: string
  bookLater: boolean
  scheduledFor: number | null
  walletBalanceCents: number
  walletEntries: WalletEntry[]
  saverPassRemaining: number
  trip: Trip | null
  tripsHistory: Trip[]
  driverOnline: boolean
  driverOffer: Trip | null
  driverAcceptedTripId: string | null
  driverEarningsCents: number
  driverTripsToday: number
  dailyFeePaid: boolean
  driverOptIns: { she: boolean; teen: boolean; school: boolean }
  potholeReports: PotholeReport[]
  toast: string
  sosArmed: boolean
  cancelPrompt: boolean
  searchingStartedAt: number | null
  dependants: Dependant[]
  selectedDependantId: string | null
  merchants: Merchant[]
  selectedMerchantId: string | null
  foodCart: { itemId: string; qty: number }[]
  incidents: Incident[]
  waStep: number
  ussdStep: number
  ussdStack: string[]
  adminSelectedDriverId: string | null
}
