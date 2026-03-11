import { useState } from 'react'
import { FlaskConical, FileText, CheckCircle, Clock } from 'lucide-react'

const orders = [
  { id: 'LAB001', patient: 'Amit Sharma',  test: 'CBC + LFT',        priority: 'Routine', status: 'Pending',    ordered: '09:15' },
  { id: 'LAB002', patient: 'Rajan Mehta',  test: 'ABG + D-Dimer',    priority: 'Urgent',  status: 'In Progress',ordered: '09:30' },
  { id: 'LAB003', patient: 'Priya Singh',  test: 'HbA1c + FBS',      priority: 'Routine', status: 'Complete',   ordered: '08:00' },
  { id: 'LAB004', patient: 'Suresh Kumar', test: 'Troponin I',        priority: 'Stat',    status: 'Pending',    ordered: '10:00' },
  { id: 'LAB005', patient: 'Anita Verma',  test: 'MRI Brain - order', priority: 'Routine', status: 'Pending',    ordered: '10:20' },
]

const priorityColor = { Routine: 'bg-blue-100 text-blue-700', Urgent: 'bg-orange-100 text-orange-700', Stat: 'bg-red-100 text-red-700' }
const statusColor   = { Pending: 'bg-yellow-100 text-yellow-700', 'In Progress': 'bg-purple-100 text-purple-700', Complete: 'bg-green-100 text-green-700' }

export default function LabTechDashboard() {
  const [result, setResult] = useState({ orderId: 'LAB001', findings: '', value: '' })
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // TODO: POST /api/lab-results
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Lab Technician Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Pathology Lab — Today's Orders</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Tests',  value: orders.filter(o => o.status === 'Pending').length,      Icon: Clock,       color: 'bg-yellow-50 text-yellow-600' },
          { label: 'In Progress',    value: orders.filter(o => o.status === 'In Progress').length,  Icon: FlaskConical,color: 'bg-purple-50 text-purple-600' },
          { label: 'Completed',      value: orders.filter(o => o.status === 'Complete').length,     Icon: CheckCircle, color: 'bg-green-50 text-green-600' },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="text-2xl font-bold">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Orders Table */}
        <div className="card md:col-span-3">
          <h2 className="section-title">Test Orders Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Order ID', 'Patient', 'Test', 'Priority', 'Status', 'Time'].map(h => (
                    <th key={h} className="text-left py-2 px-1 text-gray-400 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-1 font-mono text-xs text-gray-500">{o.id}</td>
                    <td className="py-2 px-1 font-medium text-gray-800">{o.patient}</td>
                    <td className="py-2 px-1 text-gray-600">{o.test}</td>
                    <td className="py-2 px-1"><span className={`badge ${priorityColor[o.priority]}`}>{o.priority}</span></td>
                    <td className="py-2 px-1"><span className={`badge ${statusColor[o.status]}`}>{o.status}</span></td>
                    <td className="py-2 px-1 text-gray-400 text-xs">{o.ordered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Result Entry */}
        <div className="card md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Enter Results</h2>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Order ID</label>
              <select className="input-field" value={result.orderId} onChange={e => setResult(r => ({ ...r, orderId: e.target.value }))}>
                {orders.filter(o => o.status !== 'Complete').map(o => (
                  <option key={o.id} value={o.id}>{o.id} — {o.patient}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Result Value</label>
              <input className="input-field" placeholder="e.g. Hb: 11.2 g/dL" value={result.value}
                onChange={e => setResult(r => ({ ...r, value: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Clinical Findings</label>
              <textarea className="input-field h-20 resize-none" placeholder="Enter detailed findings..."
                value={result.findings} onChange={e => setResult(r => ({ ...r, findings: e.target.value }))} />
            </div>
            <button type="submit" className="btn-accent w-full py-2">
              {submitted ? '✓ Submitted' : 'Submit Results'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
