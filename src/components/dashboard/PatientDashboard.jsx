import { Link } from 'react-router-dom'
import { Heart, Calendar, FileText, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const healthMetrics = [
  { date: 'Jun 1', bp: 122, hr: 74 }, { date: 'Jun 8', bp: 118, hr: 72 },
  { date: 'Jun 15', bp: 124, hr: 78 }, { date: 'Jun 22', bp: 120, hr: 71 },
  { date: 'Jul 1', bp: 116, hr: 69 },
]

const visits = [
  { date: '2024-06-15', doctor: 'Dr. Ananya Desai', type: 'Follow-up',    summary: 'BP controlled. Continue current meds.' },
  { date: '2024-05-10', doctor: 'Dr. Vikram Rao',   type: 'Consultation', summary: 'Chest X-ray normal. Echo scheduled.' },
  { date: '2024-04-02', doctor: 'Dr. Ananya Desai', type: 'Routine',      summary: 'Annual health checkup — all normal.' },
]

const appointments = [
  { date: '2024-07-15', time: '10:30 AM', doctor: 'Dr. Ananya Desai', dept: 'Cardiology' },
  { date: '2024-07-28', time: '02:00 PM', doctor: 'Dr. Neha Gupta',   dept: 'Endocrinology' },
]

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">My Health Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">ABHA ID: ABHA-12345-67890</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { Icon: Heart,     label: 'View Health Card', to: '/health-card', color: 'bg-red-50 text-red-600' },
          { Icon: Calendar,  label: 'Appointments',     to: '#',            color: 'bg-blue-50 text-blue-600' },
          { Icon: FileText,  label: 'Reports',          to: '#',            color: 'bg-purple-50 text-purple-600' },
          { Icon: Activity,  label: 'Vitals',           to: '#',            color: 'bg-green-50 text-green-600' },
        ].map(({ Icon, label, to, color }) => (
          <Link key={label} to={to}
            className="stat-card flex flex-col items-center gap-2 text-center hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Health Metrics */}
        <div className="card">
          <h2 className="section-title">Blood Pressure Trend</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={healthMetrics}>
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[100, 140]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#0d9488" strokeWidth={2} name="Systolic BP" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <h2 className="section-title">Upcoming Appointments</h2>
          <div className="space-y-3">
            {appointments.map((a, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#1e3a5f]">{a.doctor}</div>
                    <div className="text-xs text-gray-500">{a.dept}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{a.date}</div>
                    <div className="text-xs text-gray-500">{a.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="card">
        <h2 className="section-title">Recent Visits</h2>
        <div className="space-y-3">
          {visits.map((v, i) => (
            <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-400 w-20 shrink-0 pt-0.5">{v.date}</div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{v.doctor}</div>
                <div className="text-xs text-gray-500 mb-1">{v.type}</div>
                <p className="text-sm text-gray-600">{v.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
