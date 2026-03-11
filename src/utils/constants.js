export const ROLES = {
  doctor:     { label: 'Doctor',             color: 'bg-blue-100 text-blue-800' },
  nurse:      { label: 'Nurse',              color: 'bg-green-100 text-green-800' },
  lab_tech:   { label: 'Lab Technician',     color: 'bg-yellow-100 text-yellow-800' },
  pharmacist: { label: 'Pharmacist',         color: 'bg-purple-100 text-purple-800' },
  admin:      { label: 'Hospital Admin',     color: 'bg-red-100 text-red-800' },
  government: { label: 'Government Official',color: 'bg-orange-100 text-orange-800' },
  patient:    { label: 'Patient',            color: 'bg-teal-100 text-teal-800' },
}

export const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Dashboard',           icon: 'LayoutDashboard' },
  { path: '/health-card',  label: 'Health Card',         icon: 'CreditCard' },
  { path: '/surveillance', label: 'Disease Surveillance',icon: 'Activity' },
  { path: '/cdss',         label: 'CDSS / AI',           icon: 'Brain' },
  { path: '/analytics',    label: 'Analytics',           icon: 'BarChart2' },
  { path: '/privacy',      label: 'Privacy & FL',        icon: 'Shield' },
  { path: '/integration',  label: 'FHIR Integration',    icon: 'Link' },
  { path: '/streaming',    label: 'Live Streaming',      icon: 'Radio' },
  { path: '/security',     label: 'Security',            icon: 'Lock' },
  { path: '/business-model', label: 'Business Model',   icon: 'TrendingUp' },
]

export const DISEASE_LIST = [
  'COVID-19', 'Dengue', 'Malaria', 'Tuberculosis', 'Influenza',
  'Cholera', 'Typhoid', 'Hepatitis B', 'Hepatitis C', 'Nipah Virus',
]

export const MOCK_FACILITIES = [
  'City General Hospital', 'Apollo Medical Center', 'AIIMS Delhi',
  'Fortis Healthcare', 'Max Super Specialty Hospital',
]

export const API_BASE = import.meta.env.VITE_API_BASE || '/api'
