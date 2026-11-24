import type { City, DriverProfile, Merchant, Place, Province, Quote, RideType } from './types'

export const RIDER_NAME = 'Lerato'
export const DRIVER_SELF_ID = 'drv-self'

export const CITIES: City[] = [
  { id: 'jhb', name: 'Johannesburg', province: 'Gauteng', center: { lat: -26.2041, lng: 28.0473 } },
  { id: 'pta', name: 'Pretoria', province: 'Gauteng', center: { lat: -25.7479, lng: 28.2293 } },
  { id: 'cpt', name: 'Cape Town', province: 'Western Cape', center: { lat: -33.9249, lng: 18.4241 } },
  { id: 'dbn', name: 'Durban', province: 'KwaZulu-Natal', center: { lat: -29.8587, lng: 31.0218 } },
  { id: 'pe', name: 'Gqeberha', province: 'Eastern Cape', center: { lat: -33.9608, lng: 25.6022 } },
  { id: 'bfn', name: 'Bloemfontein', province: 'Free State', center: { lat: -29.0852, lng: 26.1596 } },
  { id: 'pol', name: 'Polokwane', province: 'Limpopo', center: { lat: -23.9045, lng: 29.4689 } },
  { id: 'mbm', name: 'Mbombela', province: 'Mpumalanga', center: { lat: -25.4753, lng: 30.9694 } },
  { id: 'klerks', name: 'Klerksdorp', province: 'North West', center: { lat: -26.8521, lng: 26.6667 } },
  { id: 'kim', name: 'Kimberley', province: 'Northern Cape', center: { lat: -28.7282, lng: 24.7499 } },
]

export const PROVINCES: Province[] = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
]

export const PLACES: Place[] = [
  // Johannesburg
  { id: 'jhb-orlando', label: 'Home · Orlando East', address: 'Orlando East, Soweto, Johannesburg', cityId: 'jhb', lat: -26.2401, lng: 27.9225 },
  { id: 'jhb-sandton', label: 'Work · Sandton City', address: 'Sandton City, Johannesburg', cityId: 'jhb', lat: -26.1086, lng: 28.0547 },
  { id: 'jhb-bara', label: 'Clinic · Chris Hani Baragwanath', address: 'Chris Hani Baragwanath Hospital, Soweto', cityId: 'jhb', lat: -26.2617, lng: 27.9401 },
  { id: 'jhb-morris', label: 'School · Morris Isaacson High', address: 'Morris Isaacson High School, Soweto', cityId: 'jhb', lat: -26.2458, lng: 27.9089 },
  { id: 'jhb-park', label: 'Park Station', address: 'Johannesburg Park Station', cityId: 'jhb', lat: -26.1952, lng: 28.0416 },
  { id: 'jhb-rosebank', label: 'Rosebank Mall', address: 'Rosebank Mall, Johannesburg', cityId: 'jhb', lat: -26.1455, lng: 28.0426 },
  // Pretoria
  { id: 'pta-hatfield', label: 'Hatfield', address: 'Hatfield, Pretoria', cityId: 'pta', lat: -25.7485, lng: 28.2378 },
  { id: 'pta-menlyn', label: 'Menlyn Mall', address: 'Menlyn Park Shopping Centre, Pretoria', cityId: 'pta', lat: -25.7869, lng: 28.2765 },
  { id: 'pta-union', label: 'Union Buildings', address: 'Union Buildings, Pretoria', cityId: 'pta', lat: -25.7402, lng: 28.2119 },
  // Cape Town
  { id: 'cpt-khayelitsha', label: 'Home · Khayelitsha', address: 'Khayelitsha, Cape Town', cityId: 'cpt', lat: -34.0404, lng: 18.6778 },
  { id: 'cpt-cbd', label: 'Cape Town CBD', address: 'Cape Town City Centre', cityId: 'cpt', lat: -33.9249, lng: 18.4241 },
  { id: 'cpt-waterfront', label: 'V&A Waterfront', address: 'V&A Waterfront, Cape Town', cityId: 'cpt', lat: -33.9036, lng: 18.4205 },
  { id: 'cpt-airport', label: 'CPT Airport', address: 'Cape Town International Airport', cityId: 'cpt', lat: -33.9715, lng: 18.6021 },
  // Durban
  { id: 'dbn-umpazi', label: 'Home · Umlazi', address: 'Umlazi, Durban', cityId: 'dbn', lat: -29.966, lng: 30.88 },
  { id: 'dbn-beach', label: 'North Beach', address: 'North Beach, Durban', cityId: 'dbn', lat: -29.849, lng: 31.036 },
  { id: 'dbn-gateway', label: 'Gateway Theatre', address: 'Gateway Theatre of Shopping, Umhlanga', cityId: 'dbn', lat: -29.726, lng: 31.067 },
  // Gqeberha
  { id: 'pe-newbrighton', label: 'New Brighton', address: 'New Brighton, Gqeberha', cityId: 'pe', lat: -33.9, lng: 25.6 },
  { id: 'pe-boardwalk', label: 'Boardwalk', address: 'Boardwalk Casino, Gqeberha', cityId: 'pe', lat: -33.98, lng: 25.66 },
  // Bloemfontein
  { id: 'bfn-mangaung', label: 'Mangaung', address: 'Mangaung, Bloemfontein', cityId: 'bfn', lat: -29.12, lng: 26.22 },
  { id: 'bfn-cbd', label: 'Bloemfontein CBD', address: 'Bloemfontein Central', cityId: 'bfn', lat: -29.0852, lng: 26.1596 },
  // Polokwane
  { id: 'pol-cbd', label: 'Polokwane CBD', address: 'Polokwane Central', cityId: 'pol', lat: -23.9045, lng: 29.4689 },
  { id: 'pol-mall', label: 'Mall of the North', address: 'Mall of the North, Polokwane', cityId: 'pol', lat: -23.87, lng: 29.45 },
  // Mbombela
  { id: 'mbm-cbd', label: 'Mbombela CBD', address: 'Mbombela Central', cityId: 'mbm', lat: -25.4753, lng: 30.9694 },
  { id: 'mbm-riverside', label: 'Riverside Mall', address: 'Riverside Mall, Mbombela', cityId: 'mbm', lat: -25.45, lng: 30.98 },
  // Klerksdorp
  { id: 'klerks-cbd', label: 'Klerksdorp CBD', address: 'Klerksdorp Central', cityId: 'klerks', lat: -26.8521, lng: 26.6667 },
  { id: 'klerks-matlosana', label: 'Matlosana Mall', address: 'Matlosana Mall, Klerksdorp', cityId: 'klerks', lat: -26.87, lng: 26.65 },
  // Kimberley
  { id: 'kim-cbd', label: 'Kimberley CBD', address: 'Kimberley Central', cityId: 'kim', lat: -28.7282, lng: 24.7499 },
  { id: 'kim-big-hole', label: 'The Big Hole', address: 'The Big Hole, Kimberley', cityId: 'kim', lat: -28.738, lng: 24.76 },
]

export const SAMPLE_DRIVERS: DriverProfile[] = [
  { id: 'drv-thabo', name: 'Thabo M.', initials: 'TM', rating: 4.9, vehicle: 'White Toyota Etios', plate: 'GP 482 XYZ', cityId: 'jhb', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Mar 2027' },
  { id: 'drv-nomsa', name: 'Nomsa K.', initials: 'NK', rating: 4.95, vehicle: 'Silver VW Polo', plate: 'GP 117 ABC', cityId: 'jhb', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'selfie_due', licenceUntil: 'Mar 2027' },
  { id: 'drv-ayanda', name: 'Ayanda D.', initials: 'AD', rating: 4.8, vehicle: 'Grey Hyundai i20', plate: 'GP 903 DEF', cityId: 'jhb', gender: 'female', sheEligible: true, teenEligible: false, schoolEligible: false, acceptsCash: false, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Jan 2028' },
  { id: 'drv-self', name: 'Sipho N.', initials: 'SN', rating: 4.9, vehicle: 'White Toyota Etios', plate: 'GP 482 XYZ', cityId: 'jhb', gender: 'male', sheEligible: false, teenEligible: false, schoolEligible: false, acceptsCash: true, feePlan: 'daily', online: false, checkStatus: 'selfie_due', licenceUntil: 'Mar 2027' },
  { id: 'drv-fatima', name: 'Fatima S.', initials: 'FS', rating: 4.92, vehicle: 'White Corolla', plate: 'CA 221 JKL', cityId: 'cpt', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Aug 2027' },
  { id: 'drv-jabu', name: 'Jabu Z.', initials: 'JZ', rating: 4.7, vehicle: 'Blue Polo Vivo', plate: 'ND 448 MNO', cityId: 'dbn', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: false, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Nov 2026' },
  { id: 'drv-lerato-d', name: 'Palesa M.', initials: 'PM', rating: 4.88, vehicle: 'Black Ballade', plate: 'GP 550 PQR', cityId: 'pta', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Jun 2027' },
]

export const DEFAULT_MERCHANTS: Merchant[] = [
  {
    id: 'mch-shisa',
    name: 'Soweto Shisanyama',
    cityId: 'jhb',
    cuisine: 'Shisanyama',
    open: true,
    commissionPct: 15,
    balanceCents: 428500,
    menu: [
      { id: 'm1', name: 'Pap & vleis', priceCents: 6500, available: true },
      { id: 'm2', name: 'Chicken dust', priceCents: 5500, available: true },
      { id: 'm3', name: 'Boerewors roll', priceCents: 3500, available: true },
      { id: 'm4', name: 'Mogodu special', priceCents: 7000, available: false },
    ],
  },
  {
    id: 'mch-gatsby',
    name: 'Khayelitsha Gatsby Corner',
    cityId: 'cpt',
    cuisine: 'Cape takeaways',
    open: true,
    commissionPct: 15,
    balanceCents: 192000,
    menu: [
      { id: 'g1', name: 'Full Gatsby', priceCents: 8500, available: true },
      { id: 'g2', name: 'Half Gatsby', priceCents: 4500, available: true },
      { id: 'g3', name: 'Salomie', priceCents: 3000, available: true },
    ],
  },
  {
    id: 'mch-bunny',
    name: 'Umlazi Bunny Chow',
    cityId: 'dbn',
    cuisine: 'Durban Indian',
    open: true,
    commissionPct: 15,
    balanceCents: 267400,
    menu: [
      { id: 'b1', name: 'Mutton quarter', priceCents: 7500, available: true },
      { id: 'b2', name: 'Beans quarter', priceCents: 4000, available: true },
      { id: 'b3', name: 'Chicken half', priceCents: 9000, available: true },
    ],
  },
]

export const CONFIRMED_POTHOLES: { road: string; lat: number; lng: number; cityId: string; count: number }[] = [
  { road: 'Main Reef Rd', lat: -26.208, lng: 27.98, cityId: 'jhb', count: 3 },
  { road: 'Soweto Highway', lat: -26.235, lng: 27.93, cityId: 'jhb', count: 4 },
  { road: 'Commissioner St', lat: -26.204, lng: 28.04, cityId: 'jhb', count: 3 },
  { road: 'N2 near Khayelitsha', lat: -34.01, lng: 18.65, cityId: 'cpt', count: 5 },
  { road: 'Umgeni Rd', lat: -29.81, lng: 31.01, cityId: 'dbn', count: 3 },
]

const BASE_RATES: Record<RideType, { base: number; perKm: number; perMin: number; min: number; release: 'R1' | 'R2' }> = {
  go: { base: 1200, perKm: 350, perMin: 40, min: 3500, release: 'R1' },
  share: { base: 800, perKm: 180, perMin: 20, min: 2200, release: 'R1' },
  she: { base: 1200, perKm: 350, perMin: 40, min: 3500, release: 'R1' },
  teen: { base: 1200, perKm: 350, perMin: 40, min: 3500, release: 'R2' },
  school: { base: 1500, perKm: 300, perMin: 35, min: 4000, release: 'R2' },
  exec: { base: 4500, perKm: 900, perMin: 120, min: 15000, release: 'R2' },
  parcel: { base: 1500, perKm: 280, perMin: 30, min: 2800, release: 'R1' },
  food: { base: 1200, perKm: 250, perMin: 25, min: 2500, release: 'R2' },
}

const BOOKING_FEE = 200

export function cityById(id: string): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0]
}

export function placesInCity(cityId: string): Place[] {
  return PLACES.filter((p) => p.cityId === cityId)
}

export function homePlace(cityId: string): Place {
  const places = placesInCity(cityId)
  return places.find((p) => p.label.toLowerCase().includes('home')) ?? places[0]
}

export function defaultDropoff(cityId: string): Place {
  const places = placesInCity(cityId)
  return places.find((p) => !p.label.toLowerCase().includes('home')) ?? places[places.length - 1]
}

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 10) / 10
}

export function quoteRide(type: RideType, pickup: Place, dropoff: Place): Quote {
  const km = Math.max(1, haversineKm(pickup, dropoff))
  const mins = Math.max(8, Math.round(km * 2.2))
  const rates = BASE_RATES[type]
  let fare = rates.base + Math.round(km * rates.perKm) + mins * rates.perMin + BOOKING_FEE
  fare = Math.max(fare, rates.min)
  if (type === 'share') fare = Math.round(fare * 0.55)
  const labels: Record<RideType, { label: string; blurb: string }> = {
    go: { label: 'Go', blurb: `Your own ride · ${Math.max(3, Math.round(mins / 4))} min` },
    share: { label: 'Share', blurb: 'Up to 3 riders · save 40–50%' },
    she: { label: 'She', blurb: `Woman driver · ${Math.max(5, Math.round(mins / 3.5))} min` },
    teen: { label: 'Teen', blurb: 'Parent-linked · PIN + live tracking' },
    school: { label: 'School Run', blurb: 'Child handover with PIN at both ends' },
    exec: { label: 'Executive', blurb: `Premium sedan · ${Math.max(4, Math.round(mins / 4))} min` },
    parcel: { label: 'Parcel', blurb: `Same-day delivery · ${km} km` },
    food: { label: 'Food', blurb: 'Township eateries · 15% merchant fee' },
  }
  return {
    rideType: type,
    label: labels[type].label,
    blurb: labels[type].blurb,
    fareCents: fare,
    etaMin: Math.max(3, Math.round(mins / 4)),
    distanceKm: km,
    release: rates.release,
  }
}

export function formatRand(cents: number): string {
  const abs = Math.abs(cents)
  const whole = Math.floor(abs / 100)
  const frac = abs % 100
  const body = frac ? `R${whole}.${frac.toString().padStart(2, '0')}` : `R${whole}`
  return cents < 0 ? `– ${body}` : body
}

export function formatRandSigned(cents: number): string {
  const prefix = cents >= 0 ? '+ ' : '– '
  return `${prefix}${formatRand(Math.abs(cents))}`
}

export function makePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function releaseBadge(type: RideType): 'R1' | 'R2' {
  return BASE_RATES[type].release
}
