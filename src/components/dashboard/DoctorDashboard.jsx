import { Users, Calendar, FileText, AlertTriangle, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const patients = [
  { id: 'P001', name: 'Amit Sharma',    age: 42, condition: 'Hypertension',   status: 'Stable',   next: '2024-07-15' },
  { id: 'P002', name: 'Priya Singh',    age: 29, condition: 'Type 2 Diabetes', status: 'Follow-up',next: '2024-07-12' },
  { id: 'P003', name: 'Rajan Mehta',    age: 65, condition: 'COPD',           status: 'Critical', next: '2024-07-10' },
  { id: 'P004', name: 'Anita Verma',    age: 35, condition: 'Migraine',       status: 'Stable',   next: '2024-07-18' },
  { id: 'P005', name: 'Suresh Kumar',   age: 51, condition: 'Heart Disease',  status: 'Monitoring',next:'2024-07-11' },
]

const trend = [
  { day: 'Mon', consultations: 12 }, { day: 'Tue', consultations: 18 },
  { day: 'Wed', consultations: 15 }, { day: 'Thu', consultations: 22 },
  { day: 'Fri', consultations: 20 }, { day: 'Sat', consultations: 8 },
]

const statusColor = { Stable: 'bg-green-100 text-green-700', Critical: 'bg-red-100 text-red-700', 'Follow-up': 'bg-yellow-100 text-yellow-700', Monitoring: 'bg-blue-100 text-blue-700' }

const STATS = [
  { icon: Users,       label: 'Total Patients',         value: '247',  sub: '+12 this week',   color: 'text-blue-600 bg-blue-50' },
  { icon: Calendar,    label: 'Today\'s Appointments',  value: '18',   sub: '3 pending',        color: 'text-teal-600 bg-teal-50' },
  { icon: FileText,    label: 'Pending Prescriptions',  value: '9',    sub: '2 urgent',         color: 'text-orange-600 bg-orange-50' },
  { icon: AlertTriangle,label:'CDSS Alerts',            value: '4',    sub: 'Review needed',    color: 'text-red-600 bg-red-50' },
]

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Doctor Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Dr. Demo User · City General Hospital</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600 font-medium">{label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="card lg:col-span-2">
          <h2 className="section-title">Patient List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Patient</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Condition</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Next Visit</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5">
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-gray-400 text-xs">Age {p.age} · {p.id}</div>
                    </td>
                    <td className="py-2.5 text-gray-600">{p.condition}</td>
                    <td className="py-2.5">
                      <span className={`badge ${statusColor[p.status] || 'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                    </td>
                    <td className="py-2.5 text-gray-500 text-xs">{p.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CDSS Panel */}
        <div className="card">
          <h2 className="section-title">CDSS Recommendations</h2>
          <div className="space-y-3">
            {[
              { patient: 'Rajan Mehta', alert: 'SpO₂ < 92% — consider O₂ supplementation', level: 'critical' },
              { patient: 'Suresh Kumar', alert: 'Review beta-blocker dosage — BPM elevated', level: 'warning' },
              { patient: 'Priya Singh', alert: 'HbA1c overdue by 3 months', level: 'info' },
              { patient: 'Amit Sharma', alert: 'BP medication refill due', level: 'info' },
            ].map((item, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${item.level === 'critical' ? 'bg-red-50 border border-red-200' : item.level === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="font-medium text-gray-800 mb-0.5">{item.patient}</div>
                <div className={`text-xs ${item.level === 'critical' ? 'text-red-700' : item.level === 'warning' ? 'text-yellow-700' : 'text-blue-700'}`}>{item.alert}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation trend */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#0d9488]" />
          <h2 className="section-title mb-0">Weekly Consultation Trend</h2>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trend}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="consultations" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
