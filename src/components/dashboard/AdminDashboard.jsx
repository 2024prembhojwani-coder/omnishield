import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Bed, Users, IndianRupee, ShieldCheck } from 'lucide-react'

const bedData = [
  { ward: 'ICU', total: 20, occupied: 17 },
  { ward: 'General', total: 80, occupied: 62 },
  { ward: 'Pediatric', total: 30, occupied: 22 },
  { ward: 'Maternity', total: 25, occupied: 18 },
  { ward: 'Emergency', total: 15, occupied: 14 },
]

const revenueData = [
  { month: 'Jan', revenue: 42 }, { month: 'Feb', revenue: 48 },
  { month: 'Mar', revenue: 45 }, { month: 'Apr', revenue: 52 },
  { month: 'May', revenue: 61 }, { month: 'Jun', revenue: 58 },
]

const staff = [
  { name: 'Dr. Ananya Desai', role: 'Cardiologist',  status: 'On Duty' },
  { name: 'Dr. Vikram Rao',   role: 'Pulmonologist', status: 'On Duty' },
  { name: 'Sr. Neha Sharma',  role: 'Head Nurse',    status: 'On Duty' },
  { name: 'Dr. Rohan Khan',   role: 'General Surgeon',status:'Off Duty' },
]

const compliance = [
  { item: 'Fire Safety Audit',       due: '2024-07-30', status: 'Complete' },
  { item: 'NABH Accreditation',      due: '2024-08-15', status: 'In Progress' },
  { item: 'HIPAA Training',          due: '2024-07-20', status: 'Overdue' },
  { item: 'Equipment Calibration',   due: '2024-07-25', status: 'Complete' },
]

const statusColor = { Complete: 'text-green-600', 'In Progress': 'text-blue-600', Overdue: 'text-red-600' }

export default function AdminDashboard() {
  const totalBeds = bedData.reduce((a, b) => a + b.total, 0)
  const occupied = bedData.reduce((a, b) => a + b.occupied, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Hospital Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">City General Hospital</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Bed,         label: 'Bed Occupancy',     value: `${occupied}/${totalBeds}`, color: 'bg-blue-50 text-blue-600' },
          { Icon: Users,       label: 'Active Staff',       value: '84',   color: 'bg-teal-50 text-teal-600' },
          { Icon: IndianRupee, label: 'Revenue (₹ Lakh)',   value: '58.4', color: 'bg-green-50 text-green-600' },
          { Icon: ShieldCheck, label: 'Compliance Score',   value: '91%',  color: 'bg-purple-50 text-purple-600' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
            <div><div className="text-2xl font-bold">{value}</div><div className="text-sm text-gray-500">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bed occupancy */}
        <div className="card">
          <h2 className="section-title">Bed Occupancy by Ward</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bedData} barCategoryGap="30%">
              <XAxis dataKey="ward" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#e2e8f0" name="Total" radius={[4,4,0,0]} />
              <Bar dataKey="occupied" fill="#0d9488" name="Occupied" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="card">
          <h2 className="section-title">Monthly Revenue (₹ Lakh)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Staff */}
        <div className="card">
          <h2 className="section-title">Staff On Duty</h2>
          <div className="space-y-2">
            {staff.map(s => (
              <div key={s.name} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm text-gray-800">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.role}</div>
                </div>
                <span className={`badge ${s.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="card">
          <h2 className="section-title">Compliance Checklist</h2>
          <div className="space-y-2">
            {compliance.map(c => (
              <div key={c.item} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm text-gray-800">{c.item}</div>
                  <div className="text-xs text-gray-400">Due: {c.due}</div>
                </div>
                <span className={`text-sm font-semibold ${statusColor[c.status]}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
