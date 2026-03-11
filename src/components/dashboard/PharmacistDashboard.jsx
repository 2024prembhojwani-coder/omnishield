import { Pill, AlertTriangle, Package, CheckCircle } from 'lucide-react'

const prescriptions = [
  { id: 'Rx001', patient: 'Amit Sharma',  drug: 'Amlodipine 5mg', qty: 30, doctor: 'Dr. Desai',   status: 'Pending' },
  { id: 'Rx002', patient: 'Priya Singh',  drug: 'Metformin 500mg', qty: 60, doctor: 'Dr. Rao',    status: 'Ready' },
  { id: 'Rx003', patient: 'Rajan Mehta',  drug: 'Salbutamol Inhaler', qty: 2, doctor: 'Dr. Desai',status: 'Dispensed' },
  { id: 'Rx004', patient: 'Suresh Kumar', drug: 'Aspirin 75mg',    qty: 30, doctor: 'Dr. Khan',   status: 'Pending' },
]

const inventory = [
  { drug: 'Paracetamol 500mg', stock: 2400, min: 500, expiry: '2025-12' },
  { drug: 'Amoxicillin 250mg', stock: 180,  min: 200, expiry: '2025-06' },
  { drug: 'Metformin 500mg',   stock: 960,  min: 300, expiry: '2025-11' },
  { drug: 'Amlodipine 5mg',    stock: 45,   min: 100, expiry: '2025-09' },
  { drug: 'Atorvastatin 10mg', stock: 600,  min: 200, expiry: '2026-01' },
]

const alerts = [
  { drug1: 'Warfarin', drug2: 'Aspirin',    severity: 'High',   note: 'Increased bleeding risk' },
  { drug1: 'Lisinopril', drug2: 'Spironolactone', severity: 'Medium', note: 'Hyperkalemia risk' },
]

const statusColor = { Pending: 'bg-yellow-100 text-yellow-700', Ready: 'bg-blue-100 text-blue-700', Dispensed: 'bg-green-100 text-green-700' }

export default function PharmacistDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Pharmacist Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Outpatient Pharmacy — Today</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Rx',   value: prescriptions.filter(p => p.status === 'Pending').length,   color: 'bg-yellow-50 text-yellow-600', Icon: Pill },
          { label: 'Ready',        value: prescriptions.filter(p => p.status === 'Ready').length,     color: 'bg-blue-50 text-blue-600',    Icon: CheckCircle },
          { label: 'Low Stock',    value: inventory.filter(i => i.stock < i.min).length,              color: 'bg-red-50 text-red-600',      Icon: Package },
          { label: 'DDI Alerts',   value: alerts.length,                                              color: 'bg-orange-50 text-orange-600',Icon: AlertTriangle },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="text-2xl font-bold">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prescription Queue */}
        <div className="card">
          <h2 className="section-title">Prescription Queue</h2>
          <div className="space-y-2">
            {prescriptions.map(rx => (
              <div key={rx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm text-gray-800">{rx.patient}</div>
                  <div className="text-xs text-gray-500">{rx.drug} × {rx.qty} · {rx.doctor}</div>
                </div>
                <span className={`badge ${statusColor[rx.status]}`}>{rx.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drug Inventory */}
        <div className="card">
          <h2 className="section-title">Drug Inventory</h2>
          <div className="space-y-2">
            {inventory.map(item => (
              <div key={item.drug} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-gray-800">{item.drug}</div>
                  <div className="text-xs text-gray-400">Exp: {item.expiry}</div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${item.stock < item.min ? 'text-red-600' : 'text-green-600'}`}>{item.stock}</div>
                  <div className="text-xs text-gray-400">Min: {item.min}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DDI Alerts */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <h2 className="section-title mb-0">Drug-Drug Interaction Alerts</h2>
        </div>
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className={`p-3 rounded-lg border ${a.severity === 'High' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-800">{a.drug1}</span>
                <span className="text-gray-400">+</span>
                <span className="text-gray-800">{a.drug2}</span>
                <span className={`badge ml-auto ${a.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.severity}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
