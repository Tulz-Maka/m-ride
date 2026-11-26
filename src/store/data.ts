import type {
  City,
  DriverProfile,
  Merchant,
  MpumalangaDistrict,
  Place,
  Province,
  Quote,
  RideType,
} from './types'

export const LAUNCH_PROVINCE: Province = 'Mpumalanga'
export const DEFAULT_CITY_ID = 'mbm'
export const RIDER_NAME = 'Lerato'
export const DRIVER_SELF_ID = 'drv-self'

export const DISTRICTS: MpumalangaDistrict[] = ['Ehlanzeni', 'Nkangala', 'Gert Sibande']

export const CITIES: City[] = [
  // Ehlanzeni District
  {
    id: 'mbm',
    name: 'Mbombela (Nelspruit)',
    district: 'Ehlanzeni',
    municipality: 'City of Mbombela',
    province: 'Mpumalanga',
    center: { lat: -25.4753, lng: 30.9694 },
    keyRoads: ['N4', 'R40', 'R104', 'Samora Machel Dr'],
  },
  {
    id: 'wtr',
    name: 'White River',
    district: 'Ehlanzeni',
    municipality: 'City of Mbombela',
    province: 'Mpumalanga',
    center: { lat: -25.3318, lng: 31.0117 },
    keyRoads: ['R40', 'R538', 'R537', 'Chief Mgiyeni Khumalo Dr'],
  },
  {
    id: 'brb',
    name: 'Barberton',
    district: 'Ehlanzeni',
    municipality: 'City of Mbombela',
    province: 'Mpumalanga',
    center: { lat: -25.7884, lng: 31.0532 },
    keyRoads: ['R38', 'R40', 'General St', 'Emjindini Rd'],
  },
  {
    id: 'hzv',
    name: 'Hazyview',
    district: 'Ehlanzeni',
    municipality: 'City of Mbombela',
    province: 'Mpumalanga',
    center: { lat: -25.0468, lng: 31.1277 },
    keyRoads: ['R40', 'R536', 'R535', 'Portia Shabangu Dr'],
  },
  {
    id: 'sab',
    name: 'Sabie',
    district: 'Ehlanzeni',
    municipality: 'Thaba Chweu Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -25.0987, lng: 30.7797 },
    keyRoads: ['R532', 'R536', 'R537', 'Main St'],
  },
  {
    id: 'msh',
    name: 'Mashishing (Lydenburg)',
    district: 'Ehlanzeni',
    municipality: 'Thaba Chweu Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -25.096, lng: 30.4597 },
    keyRoads: ['R36', 'R37', 'R540', 'Voortrekker St'],
  },
  {
    id: 'bbr',
    name: 'Bushbuckridge',
    district: 'Ehlanzeni',
    municipality: 'Bushbuckridge Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -24.835, lng: 31.0672 },
    keyRoads: ['R40', 'R533', 'Maviljan Main Rd', 'Dwarsloop Rd'],
  },
  {
    id: 'kmp',
    name: 'Komatipoort',
    district: 'Ehlanzeni',
    municipality: 'Nkomazi Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -25.4332, lng: 31.9548 },
    keyRoads: ['N4', 'R571', 'R570', 'Rissik St'],
  },

  // Nkangala District
  {
    id: 'eml',
    name: 'eMalahleni (Witbank)',
    district: 'Nkangala',
    municipality: 'Emalahleni Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -25.8728, lng: 29.2332 },
    keyRoads: ['N4', 'N12', 'R555', 'OR Tambo Rd'],
  },
  {
    id: 'mid',
    name: 'Middelburg',
    district: 'Nkangala',
    municipality: 'Steve Tshwete Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -25.7751, lng: 29.4648 },
    keyRoads: ['N4', 'N11', 'R555', 'Cowen Ntuli St'],
  },

  // Gert Sibande District
  {
    id: 'sec',
    name: 'Secunda',
    district: 'Gert Sibande',
    municipality: 'Govan Mbeki Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -26.5162, lng: 29.1806 },
    keyRoads: ['R546', 'R580', 'N17', 'Nelson Mandela Dr'],
  },
  {
    id: 'erm',
    name: 'Ermelo',
    district: 'Gert Sibande',
    municipality: 'Msukaligwa Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -26.5333, lng: 29.9833 },
    keyRoads: ['N2', 'N11', 'N17', 'Kerk St'],
  },
  {
    id: 'std',
    name: 'Standerton',
    district: 'Gert Sibande',
    municipality: 'Lekwa Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -26.9337, lng: 29.2415 },
    keyRoads: ['R23', 'R50', 'R546', 'Walter Sisulu Dr'],
  },
  {
    id: 'emk',
    name: 'eMkhondo (Piet Retief)',
    district: 'Gert Sibande',
    municipality: 'Mkhondo Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -27.0071, lng: 30.8132 },
    keyRoads: ['N2', 'R33', 'R543', 'Mark St'],
  },
  {
    id: 'bth',
    name: 'Bethal',
    district: 'Gert Sibande',
    municipality: 'Govan Mbeki Local Municipality',
    province: 'Mpumalanga',
    center: { lat: -26.4579, lng: 29.4655 },
    keyRoads: ['N17', 'R35', 'R38', 'Chris Hani St'],
  },
]

export const PLACES: Place[] = [
  // Mbombela (Nelspruit)
  { id: 'mbm-kamagugu', label: 'Home · Kamagugu', address: 'Kamagugu, Mbombela', cityId: 'mbm', lat: -25.4695, lng: 31.0135 },
  { id: 'mbm-ilanga', label: "Mall · i'langa Mall", address: "i'langa Mall, West Acres, Mbombela", cityId: 'mbm', lat: -25.4658, lng: 30.9535 },
  { id: 'mbm-riverside', label: 'Work · Riverside Mall', address: 'Riverside Mall, R40, Mbombela', cityId: 'mbm', lat: -25.4426, lng: 30.9665 },
  { id: 'mbm-ump', label: 'Campus · University of Mpumalanga', address: 'University of Mpumalanga, R40, Mbombela', cityId: 'mbm', lat: -25.4368, lng: 30.9814 },
  { id: 'mbm-rob', label: 'Hospital · Rob Ferreira Hospital', address: 'Rob Ferreira Hospital, Mbombela', cityId: 'mbm', lat: -25.4767, lng: 30.9776 },
  { id: 'mbm-kmia', label: 'Airport · KMIA (Kruger Mpumalanga)', address: 'Kruger Mpumalanga International Airport (KMIA)', cityId: 'mbm', lat: -25.3832, lng: 31.1056 },
  { id: 'mbm-lowveld-high', label: 'School · Lowveld High School', address: 'Lowveld High School, Mbombela', cityId: 'mbm', lat: -25.4836, lng: 30.9718 },
  { id: 'mbm-kanyamazane', label: 'KaNyamazane Plaza', address: 'KaNyamazane, Mbombela', cityId: 'mbm', lat: -25.4806, lng: 31.1558 },

  // eMalahleni (Witbank)
  { id: 'eml-kwaguqa', label: 'Home · KwaGuqa', address: 'KwaGuqa, eMalahleni', cityId: 'eml', lat: -25.8878, lng: 29.1575 },
  { id: 'eml-highveld', label: 'Work · Highveld Mall', address: 'Highveld Mall, N4, eMalahleni', cityId: 'eml', lat: -25.8869, lng: 29.2547 },
  { id: 'eml-hosp', label: 'Hospital · Witbank Hospital', address: 'Witbank Provincial Hospital, eMalahleni', cityId: 'eml', lat: -25.8732, lng: 29.2225 },
  { id: 'eml-tut', label: 'Campus · TUT eMalahleni', address: 'TUT eMalahleni Campus, OR Tambo Rd', cityId: 'eml', lat: -25.8756, lng: 29.2371 },
  { id: 'eml-cbd', label: 'eMalahleni CBD', address: 'eMalahleni Central, Nkangala', cityId: 'eml', lat: -25.8728, lng: 29.2332 },

  // Middelburg
  { id: 'mid-mhluzi', label: 'Home · Mhluzi', address: 'Mhluzi, Middelburg', cityId: 'mid', lat: -25.7524, lng: 29.4352 },
  { id: 'mid-mall', label: 'Work · Middelburg Mall', address: 'Middelburg Mall, N11, Middelburg', cityId: 'mid', lat: -25.7885, lng: 29.4765 },
  { id: 'mid-hosp', label: 'Hospital · Middelburg Hospital', address: 'Middelburg Provincial Hospital', cityId: 'mid', lat: -25.7689, lng: 29.4612 },
  { id: 'mid-cbd', label: 'Middelburg CBD', address: 'Middelburg Central, Nkangala', cityId: 'mid', lat: -25.7751, lng: 29.4648 },
  { id: 'mid-columbus', label: 'Industrial · Columbus Corridor', address: 'Hendrina Rd Industrial Park, Middelburg', cityId: 'mid', lat: -25.782, lng: 29.5015 },

  // Secunda
  { id: 'sec-embalenhle', label: 'Home · eMbalenhle', address: 'eMbalenhle, Secunda', cityId: 'sec', lat: -26.5453, lng: 29.0835 },
  { id: 'sec-sasol', label: 'Work · Sasol Secunda', address: 'Sasol Secunda Operations, R546', cityId: 'sec', lat: -26.5446, lng: 29.1665 },
  { id: 'sec-mall', label: 'Secunda Mall', address: 'Secunda Mall, Nelson Mandela Dr', cityId: 'sec', lat: -26.5067, lng: 29.1873 },
  { id: 'sec-evander', label: 'Hospital · Evander Hospital', address: 'Evander Provincial Hospital, Secunda', cityId: 'sec', lat: -26.473, lng: 29.1105 },
  { id: 'sec-graceland', label: 'Lake Umuzi & Graceland', address: 'Lake Umuzi Waterfront, Secunda', cityId: 'sec', lat: -26.523, lng: 29.193 },

  // Ermelo
  { id: 'erm-wesselton', label: 'Home · Wesselton', address: 'Wesselton, Ermelo', cityId: 'erm', lat: -26.5198, lng: 29.9612 },
  { id: 'erm-mall', label: 'Work · Ermelo Mall', address: 'Ermelo Mall, N11, Ermelo', cityId: 'erm', lat: -26.5284, lng: 29.9889 },
  { id: 'erm-hosp', label: 'Hospital · Ermelo Hospital', address: 'Ermelo Provincial Hospital', cityId: 'erm', lat: -26.527, lng: 29.9742 },
  { id: 'erm-cbd', label: 'Ermelo CBD & Rank', address: 'Kerk St, Ermelo Central', cityId: 'erm', lat: -26.5333, lng: 29.9833 },

  // White River
  { id: 'wtr-kabokweni', label: 'Home · Kabokweni', address: 'Kabokweni, White River', cityId: 'wtr', lat: -25.3355, lng: 31.148 },
  { id: 'wtr-crossing', label: 'Work · White River Crossing', address: 'White River Crossing, R40', cityId: 'wtr', lat: -25.338, lng: 31.011 },
  { id: 'wtr-casterbridge', label: 'Casterbridge Centre', address: 'Casterbridge Lifestyle Centre, R40', cityId: 'wtr', lat: -25.3135, lng: 31.0285 },
  { id: 'wtr-kmia', label: 'Airport · KMIA Terminal', address: 'Kruger Mpumalanga Int. Airport (KMIA)', cityId: 'wtr', lat: -25.3832, lng: 31.1056 },

  // Barberton
  { id: 'brb-emjindini', label: 'Home · Emjindini', address: 'Emjindini, Barberton', cityId: 'brb', lat: -25.7685, lng: 31.0315 },
  { id: 'brb-cbd', label: 'Work · Barberton CBD', address: 'Heritage Square, Barberton', cityId: 'brb', lat: -25.7884, lng: 31.0532 },
  { id: 'brb-hosp', label: 'Hospital · Barberton Hospital', address: 'Barberton General Hospital', cityId: 'brb', lat: -25.792, lng: 31.0455 },
  { id: 'brb-geotrail', label: 'Makhonjwa Geotrail Hub', address: 'R38 / R40 Geotrail Gateway, Barberton', cityId: 'brb', lat: -25.7965, lng: 31.064 },

  // Sabie
  { id: 'sab-simile', label: 'Home · Simile', address: 'Simile, Sabie', cityId: 'sab', lat: -25.0865, lng: 30.768 },
  { id: 'sab-cbd', label: 'Work · Sabie Town Centre', address: 'Main St, R532, Sabie', cityId: 'sab', lat: -25.0987, lng: 30.7797 },
  { id: 'sab-hosp', label: 'Hospital · Sabie Hospital', address: 'Sabie Provincial Hospital', cityId: 'sab', lat: -25.095, lng: 30.785 },
  { id: 'sab-lonecreek', label: 'Lone Creek Falls Rd', address: 'R536 / Lone Creek Turnoff, Sabie', cityId: 'sab', lat: -25.1025, lng: 30.713 },

  // Hazyview
  { id: 'hzv-shabalala', label: 'Home · Shabalala', address: 'Shabalala, Hazyview', cityId: 'hzv', lat: -25.06, lng: 31.158 },
  { id: 'hzv-junction', label: 'Work · Hazyview Junction', address: 'Hazyview Junction Mall, R40', cityId: 'hzv', lat: -25.0468, lng: 31.1277 },
  { id: 'hzv-perrys', label: "Perry's Bridge (R40/R536)", address: "Perry's Bridge Trading Post, Hazyview", cityId: 'hzv', lat: -25.0395, lng: 31.131 },
  { id: 'hzv-phabeni', label: 'Kruger · Phabeni Gate', address: 'Phabeni Gate, R536, Hazyview', cityId: 'hzv', lat: -25.025, lng: 31.241 },

  // Standerton
  { id: 'std-sakhile', label: 'Home · Sakhile', address: 'Sakhile, Standerton', cityId: 'std', lat: -26.9565, lng: 29.2165 },
  { id: 'std-cbd', label: 'Work · Monument Mall & CBD', address: 'Standerton Central, R23', cityId: 'std', lat: -26.9337, lng: 29.2415 },
  { id: 'std-hosp', label: 'Hospital · Standerton Hospital', address: 'Standerton Provincial Hospital', cityId: 'std', lat: -26.942, lng: 29.239 },
  { id: 'std-meyerville', label: 'Meyerville Junction', address: 'Meyerville, R23, Standerton', cityId: 'std', lat: -26.924, lng: 29.256 },

  // eMkhondo (Piet Retief)
  { id: 'emk-ethandu', label: 'Home · eThandukukhanya', address: 'eThandukukhanya, eMkhondo', cityId: 'emk', lat: -26.989, lng: 30.802 },
  { id: 'emk-cbd', label: 'Work · eMkhondo N2 Plaza', address: 'N2 / Mark St, eMkhondo', cityId: 'emk', lat: -27.0071, lng: 30.8132 },
  { id: 'emk-hosp', label: 'Hospital · Piet Retief Hospital', address: 'Piet Retief Hospital, eMkhondo', cityId: 'emk', lat: -27.001, lng: 30.817 },
  { id: 'emk-kempville', label: 'Kempville Timber Hub', address: 'Kempville, eMkhondo', cityId: 'emk', lat: -27.0185, lng: 30.824 },

  // Mashishing (Lydenburg)
  { id: 'msh-ext4', label: 'Home · Mashishing Ext 4', address: 'Mashishing Ext 4, Lydenburg', cityId: 'msh', lat: -25.084, lng: 30.431 },
  { id: 'msh-heads', label: 'Work · The Heads Centre', address: 'The Heads Shopping Centre, R36', cityId: 'msh', lat: -25.102, lng: 30.4525 },
  { id: 'msh-hosp', label: 'Hospital · Lydenburg Hospital', address: 'Lydenburg Provincial Hospital', cityId: 'msh', lat: -25.0975, lng: 30.464 },
  { id: 'msh-cbd', label: 'Mashishing CBD', address: 'Voortrekker St, Mashishing', cityId: 'msh', lat: -25.096, lng: 30.4597 },

  // Bushbuckridge
  { id: 'bbr-maviljan', label: 'Home · Maviljan', address: 'Maviljan, Bushbuckridge', cityId: 'bbr', lat: -24.822, lng: 31.076 },
  { id: 'bbr-twincity', label: 'Work · Twin City Mall (R40)', address: 'Twin City Mall, R40, Bushbuckridge', cityId: 'bbr', lat: -24.835, lng: 31.0672 },
  { id: 'bbr-mapulaneng', label: 'Hospital · Mapulaneng Hospital', address: 'Mapulaneng Hospital, Bushbuckridge', cityId: 'bbr', lat: -24.853, lng: 31.054 },
  { id: 'bbr-dwarsloop', label: 'Dwarsloop Mall', address: 'Dwarsloop, Bushbuckridge', cityId: 'bbr', lat: -24.805, lng: 31.092 },

  // Komatipoort
  { id: 'kmp-tonga', label: 'Home · Kamhlushwa Rd', address: 'Nkomazi / Kamhlushwa Rd, Komatipoort', cityId: 'kmp', lat: -25.458, lng: 31.912 },
  { id: 'kmp-cbd', label: 'Work · Komatipoort CBD (N4)', address: 'Rissik St, N4, Komatipoort', cityId: 'kmp', lat: -25.4332, lng: 31.9548 },
  { id: 'kmp-lebombo', label: 'Lebombo Border Post', address: 'Lebombo Border Control, N4', cityId: 'kmp', lat: -25.4435, lng: 31.9865 },
  { id: 'kmp-croc', label: 'Kruger · Crocodile Bridge', address: 'Crocodile Bridge Gate, Komatipoort', cityId: 'kmp', lat: -25.3586, lng: 31.8935 },

  // Bethal
  { id: 'bth-emzinoni', label: 'Home · eMzinoni', address: 'eMzinoni, Bethal', cityId: 'bth', lat: -26.473, lng: 29.439 },
  { id: 'bth-cbd', label: 'Work · Bethal Plaza (N17)', address: 'Bethal Central, N17 / R35', cityId: 'bth', lat: -26.4579, lng: 29.4655 },
  { id: 'bth-hosp', label: 'Hospital · Bethal Hospital', address: 'Bethal Provincial Hospital', cityId: 'bth', lat: -26.462, lng: 29.457 },
  { id: 'bth-milan', label: 'Milan Park Freight Stop', address: 'Milan Park, N17, Bethal', cityId: 'bth', lat: -26.449, lng: 29.476 },
]

export const SAMPLE_DRIVERS: DriverProfile[] = [
  // Ehlanzeni drivers
  { id: 'drv-thabo', name: 'Thabo Mdluli', initials: 'TM', rating: 4.91, vehicle: 'White Toyota Etios', plate: 'FBC 482 MP', cityId: 'mbm', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Mar 2027' },
  { id: 'drv-nomsa', name: 'Nomsa Khoza', initials: 'NK', rating: 4.95, vehicle: 'Silver VW Polo', plate: 'KMP 117 MP', cityId: 'mbm', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'selfie_due', licenceUntil: 'Mar 2027' },
  { id: 'drv-ayanda', name: 'Ayanda Dlamini', initials: 'AD', rating: 4.86, vehicle: 'Grey Hyundai i20', plate: 'HJV 903 MP', cityId: 'mbm', gender: 'female', sheEligible: true, teenEligible: false, schoolEligible: false, acceptsCash: false, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Jan 2028' },
  { id: 'drv-self', name: 'Sipho Nkosi', initials: 'SN', rating: 4.9, vehicle: 'White Toyota Etios', plate: 'JMB 482 MP', cityId: 'mbm', gender: 'male', sheEligible: false, teenEligible: false, schoolEligible: false, acceptsCash: true, feePlan: 'daily', online: false, checkStatus: 'selfie_due', licenceUntil: 'Mar 2027' },
  { id: 'drv-zanele', name: 'Zanele Maseko', initials: 'ZM', rating: 4.92, vehicle: 'White Toyota Corolla', plate: 'KWT 221 MP', cityId: 'wtr', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Aug 2027' },
  { id: 'drv-bongani', name: 'Bongani Shabangu', initials: 'BS', rating: 4.84, vehicle: 'Silver Suzuki Dzire', plate: 'HBR 614 MP', cityId: 'brb', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'May 2027' },
  { id: 'drv-sindi', name: 'Sindi Lubisi', initials: 'SL', rating: 4.89, vehicle: 'White Polo Vivo', plate: 'KHZ 308 MP', cityId: 'hzv', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Sep 2027' },
  { id: 'drv-lucky', name: 'Lucky Mathebula', initials: 'LM', rating: 4.82, vehicle: 'Blue Honda Amaze', plate: 'JBB 741 MP', cityId: 'bbr', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: false, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Jul 2027' },
  { id: 'drv-precious', name: 'Precious Mnisi', initials: 'PM', rating: 4.9, vehicle: 'White Toyota Starlet', plate: 'KMS 512 MP', cityId: 'msh', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Oct 2027' },
  { id: 'drv-derrick', name: 'Derrick Nyalungu', initials: 'DN', rating: 4.85, vehicle: 'Grey Corolla Quest', plate: 'JNK 839 MP', cityId: 'kmp', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Dec 2027' },

  // Nkangala drivers
  { id: 'drv-palesa', name: 'Palesa Mahlangu', initials: 'PM', rating: 4.93, vehicle: 'Black Honda Ballade', plate: 'KWL 550 MP', cityId: 'eml', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Jun 2027' },
  { id: 'drv-mandla', name: 'Mandla Skhosana', initials: 'MS', rating: 4.88, vehicle: 'White Toyota Quest', plate: 'JEM 294 MP', cityId: 'eml', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Apr 2027' },
  { id: 'drv-naledi', name: 'Naledi Masango', initials: 'NM', rating: 4.91, vehicle: 'Silver VW Polo Vivo', plate: 'KMD 184 MP', cityId: 'mid', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Nov 2027' },

  // Gert Sibande drivers
  { id: 'drv-jabu', name: 'Jabu Zwane', initials: 'JZ', rating: 4.85, vehicle: 'Blue VW Polo Vivo', plate: 'JSC 448 MP', cityId: 'sec', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Feb 2027' },
  { id: 'drv-thulisile', name: 'Thulisile Nkambule', initials: 'TN', rating: 4.94, vehicle: 'White Suzuki Swift', plate: 'KSC 763 MP', cityId: 'sec', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'ok', licenceUntil: 'Aug 2027' },
  { id: 'drv-musa', name: 'Musa Mthetwa', initials: 'MM', rating: 4.87, vehicle: 'White Toyota Etios', plate: 'HER 319 MP', cityId: 'erm', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Sep 2027' },
  { id: 'drv-lindiwe', name: 'Lindiwe Khumalo', initials: 'LK', rating: 4.9, vehicle: 'Silver Hyundai Grand i10', plate: 'KST 920 MP', cityId: 'std', gender: 'female', sheEligible: true, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'commission', online: true, checkStatus: 'docs_expiring', licenceUntil: 'Jan 2027' },
  { id: 'drv-sibusiso', name: 'Sibusiso Nhlabathi', initials: 'SN', rating: 4.86, vehicle: 'Grey Corolla Quest', plate: 'JMK 605 MP', cityId: 'emk', gender: 'male', sheEligible: false, teenEligible: true, schoolEligible: true, acceptsCash: true, feePlan: 'daily', online: true, checkStatus: 'ok', licenceUntil: 'Oct 2027' },
]

export const DEFAULT_MERCHANTS: Merchant[] = [
  {
    id: 'mch-lowveld-shisa',
    name: 'KaNyamazane Shisanyama & Grill',
    cityId: 'mbm',
    cuisine: 'Lowveld shisanyama',
    open: true,
    commissionPct: 15,
    balanceCents: 428500,
    menu: [
      { id: 'm1', name: 'Pap & braai vleis', priceCents: 6800, available: true },
      { id: 'm2', name: 'Lowveld chicken dust', priceCents: 5500, available: true },
      { id: 'm3', name: 'Boerewors roll & chakalaka', priceCents: 3800, available: true },
      { id: 'm4', name: 'Mogodu special', priceCents: 7200, available: false },
    ],
  },
  {
    id: 'mch-kamagugu-kota',
    name: 'Kamagugu Kota & Chesa',
    cityId: 'mbm',
    cuisine: 'Township takeaways',
    open: true,
    commissionPct: 15,
    balanceCents: 214000,
    menu: [
      { id: 'k1', name: 'Full-house Lowveld kota', priceCents: 4500, available: true },
      { id: 'k2', name: 'Grilled wings & pap', priceCents: 6000, available: true },
      { id: 'k3', name: 'Russian, chips & atchar', priceCents: 3500, available: true },
    ],
  },
  {
    id: 'mch-kwaguqa',
    name: 'KwaGuqa Chesanyama',
    cityId: 'eml',
    cuisine: 'Nkangala shisanyama',
    open: true,
    commissionPct: 15,
    balanceCents: 312000,
    menu: [
      { id: 'e1', name: 'Beef chuck, pap & chakalaka', priceCents: 7500, available: true },
      { id: 'e2', name: 'Quarter leg & pap', priceCents: 5200, available: true },
      { id: 'e3', name: 'Coal-town kota', priceCents: 4000, available: true },
    ],
  },
  {
    id: 'mch-mhluzi',
    name: 'Mhluzi Pot & Grill',
    cityId: 'mid',
    cuisine: 'Home-style kitchen',
    open: true,
    commissionPct: 15,
    balanceCents: 198400,
    menu: [
      { id: 'd1', name: 'Stewed beef & dombolo', priceCents: 7000, available: true },
      { id: 'd2', name: 'Flame chicken half', priceCents: 8500, available: true },
      { id: 'd3', name: 'Wors & pap combo', priceCents: 4800, available: true },
    ],
  },
  {
    id: 'mch-embalenhle',
    name: 'eMbalenhle Flame Kitchen',
    cityId: 'sec',
    cuisine: 'Highveld takeaways',
    open: true,
    commissionPct: 15,
    balanceCents: 274600,
    menu: [
      { id: 's1', name: 'Shift-worker braai combo', priceCents: 7800, available: true },
      { id: 's2', name: 'Chicken dust & pap', priceCents: 5600, available: true },
      { id: 's3', name: 'Spicy giblets & pap', priceCents: 4200, available: true },
    ],
  },
  {
    id: 'mch-wesselton',
    name: 'Wesselton Corner Grill',
    cityId: 'erm',
    cuisine: 'Shisanyama',
    open: true,
    commissionPct: 15,
    balanceCents: 165200,
    menu: [
      { id: 'w1', name: 'Highveld braai platter', priceCents: 9500, available: true },
      { id: 'w2', name: 'Pap & boerewors', priceCents: 5000, available: true },
      { id: 'w3', name: 'Wesselton special kota', priceCents: 3800, available: true },
    ],
  },
  {
    id: 'mch-hazyview',
    name: 'Hazyview Sabie River Grill',
    cityId: 'hzv',
    cuisine: 'Lowveld kitchen',
    open: true,
    commissionPct: 15,
    balanceCents: 229000,
    menu: [
      { id: 'h1', name: 'Peri-peri chicken & pap', priceCents: 6500, available: true },
      { id: 'h2', name: 'Mango atchar kota', priceCents: 4200, available: true },
      { id: 'h3', name: 'Lowveld braai plate', priceCents: 8200, available: true },
    ],
  },
]

export const CONFIRMED_POTHOLES: { road: string; lat: number; lng: number; cityId: string; count: number }[] = [
  // Mbombela
  { road: 'R40 near Riverside', lat: -25.448, lng: 30.968, cityId: 'mbm', count: 5 },
  { road: 'N4 Karino Interchange', lat: -25.468, lng: 31.088, cityId: 'mbm', count: 4 },
  { road: 'Samora Machel Dr', lat: -25.473, lng: 30.962, cityId: 'mbm', count: 3 },
  { road: 'KaNyamazane Main Rd', lat: -25.478, lng: 31.132, cityId: 'mbm', count: 4 },
  // White River
  { road: 'R40 White River–KMIA', lat: -25.352, lng: 31.045, cityId: 'wtr', count: 4 },
  { road: 'R538 Kabokweni Rd', lat: -25.334, lng: 31.095, cityId: 'wtr', count: 3 },
  // Barberton
  { road: 'R38 Kaapmuiden Rd', lat: -25.774, lng: 31.069, cityId: 'brb', count: 4 },
  { road: 'R40 Emjindini Approach', lat: -25.778, lng: 31.041, cityId: 'brb', count: 3 },
  // Hazyview
  { road: 'R536 Kruger Gate Rd', lat: -25.036, lng: 31.182, cityId: 'hzv', count: 5 },
  { road: 'R40 Hazyview North', lat: -25.028, lng: 31.124, cityId: 'hzv', count: 3 },
  // Sabie
  { road: 'R532 Panorama Route', lat: -25.091, lng: 30.782, cityId: 'sab', count: 3 },
  { road: 'R536 Sabie–Hazyview', lat: -25.089, lng: 30.822, cityId: 'sab', count: 4 },
  // Mashishing
  { road: 'R36 Mashishing Bypass', lat: -25.091, lng: 30.448, cityId: 'msh', count: 4 },
  { road: 'R37 Long Tom Approach', lat: -25.106, lng: 30.482, cityId: 'msh', count: 3 },
  // Bushbuckridge
  { road: 'R40 Maviljan Stretch', lat: -24.828, lng: 31.071, cityId: 'bbr', count: 5 },
  { road: 'R533 Graskop Link', lat: -24.844, lng: 31.052, cityId: 'bbr', count: 3 },
  // Komatipoort
  { road: 'N4 Lebombo Freight Lane', lat: -25.439, lng: 31.971, cityId: 'kmp', count: 4 },
  { road: 'R571 Tonga Access', lat: -25.451, lng: 31.928, cityId: 'kmp', count: 3 },
  // eMalahleni
  { road: 'N4 Schoongezicht Off-ramp', lat: -25.881, lng: 29.245, cityId: 'eml', count: 5 },
  { road: 'OR Tambo Rd (KwaGuqa)', lat: -25.883, lng: 29.188, cityId: 'eml', count: 4 },
  { road: 'R555 Old Middelburg Rd', lat: -25.864, lng: 29.261, cityId: 'eml', count: 3 },
  // Middelburg
  { road: 'N11 Hendrina Rd', lat: -25.786, lng: 29.484, cityId: 'mid', count: 4 },
  { road: 'Cowen Ntuli St (Mhluzi)', lat: -25.761, lng: 29.448, cityId: 'mid', count: 3 },
  // Secunda
  { road: 'R546 eMbalenhle Link', lat: -26.544, lng: 29.124, cityId: 'sec', count: 5 },
  { road: 'R580 Evander Corridor', lat: -26.492, lng: 29.145, cityId: 'sec', count: 3 },
  // Ermelo
  { road: 'N11 Camden Approach', lat: -26.539, lng: 29.998, cityId: 'erm', count: 4 },
  { road: 'N2 / Kerk St Junction', lat: -26.529, lng: 29.979, cityId: 'erm', count: 3 },
  // Standerton
  { road: 'R23 Sakhile Bridge', lat: -26.946, lng: 29.228, cityId: 'std', count: 4 },
  { road: 'R50 Bethal Approach', lat: -26.922, lng: 29.254, cityId: 'std', count: 3 },
  // eMkhondo
  { road: 'N2 Piet Retief Corridor', lat: -27.004, lng: 30.819, cityId: 'emk', count: 4 },
  { road: 'R33 eThandukukhanya Rd', lat: -26.995, lng: 30.807, cityId: 'emk', count: 3 },
  // Bethal
  { road: 'N17 eMzinoni Turnoff', lat: -26.468, lng: 29.449, cityId: 'bth', count: 4 },
  { road: 'R35 Middelburg Rd', lat: -26.448, lng: 29.469, cityId: 'bth', count: 3 },
]

export interface MunicipalityExportSummary {
  municipality: string
  district: MpumalangaDistrict
  towns: string[]
  confirmedPotholes: number
}

export function mpumalangaMunicipalities(): MunicipalityExportSummary[] {
  const map = new Map<string, MunicipalityExportSummary>()
  for (const city of CITIES) {
    const existing = map.get(city.municipality)
    const count = CONFIRMED_POTHOLES.filter((p) => p.cityId === city.id).length
    if (existing) {
      existing.towns.push(city.name)
      existing.confirmedPotholes += count
    } else {
      map.set(city.municipality, {
        municipality: city.municipality,
        district: city.district,
        towns: [city.name],
        confirmedPotholes: count,
      })
    }
  }
  return Array.from(map.values())
}

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
    food: { label: 'Food', blurb: 'Mpumalanga eateries · 15% merchant fee' },
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
