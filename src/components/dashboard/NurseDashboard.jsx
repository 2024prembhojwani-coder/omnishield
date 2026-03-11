import { useState } from 'react'
import { ClipboardList, Heart, Thermometer, CheckSquare } from 'lucide-react'

const tasks = [
  { id: 1, task: 'Administer insulin to Patient P002 — Priya Singh', due: '08:00', done: true },
  { id: 2, task: 'Check vitals for Patient P003 — Rajan Mehta', due: '09:00', done: false },
  { id: 3, task: 'Wound dressing — Room 12B', due: '10:30', done: false },
  { id: 4, task: 'Shift handover notes — Ward 3', due: '14:00', done: false },
  { id: 5, task: 'Discharge paperwork — Patient P007', due: '15:00', done: false },
]

export default function NurseDashboard() {
  const [vitals, setVitals] = useState({ bp: '', hr: '', temp: '', spo2: '', patient: 'P003 - Rajan Mehta' })
  const [taskList, setTaskList] = useState(tasks)
  const [saved, setSaved] = useState(false)

  const toggle = (id) => setTaskList(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const saveVitals = (e) => {
    e.preventDefault()
    // TODO: POST /api/vitals
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Nurse Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Ward 3 — Morning Shift</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { Icon: ClipboardList, label: 'Tasks Remaining', value: taskList.filter(t => !t.done).length, color: 'bg-yellow-50 text-yellow-600' },
          { Icon: Heart,         label: 'Vitals Logged Today', value: 14, color: 'bg-red-50 text-red-600' },
          { Icon: CheckSquare,   label: 'Tasks Completed',     value: taskList.filter(t => t.done).length, color: 'bg-green-50 text-green-600' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="stat-card flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vitals Entry */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-[#0d9488]" />
            <h2 className="section-title mb-0">Log Patient Vitals</h2>
          </div>
          <form onSubmit={saveVitals} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select className="input-field" value={vitals.patient} onChange={e => setVitals(v => ({ ...v, patient: e.target.value }))}>
                <option>P003 - Rajan Mehta</option>
                <option>P001 - Amit Sharma</option>
                <option>P005 - Suresh Kumar</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Blood Pressure</label>
                <input className="input-field" placeholder="120/80 mmHg" value={vitals.bp} onChange={e => setVitals(v => ({ ...v, bp: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Heart Rate</label>
                <input className="input-field" placeholder="72 bpm" value={vitals.hr} onChange={e => setVitals(v => ({ ...v, hr: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Temperature</label>
                <input className="input-field" placeholder="98.6°F" value={vitals.temp} onChange={e => setVitals(v => ({ ...v, temp: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">SpO₂</label>
                <input className="input-field" placeholder="98%" value={vitals.spo2} onChange={e => setVitals(v => ({ ...v, spo2: e.target.value }))} />
              </div>
            </div>
            <button type="submit" className="btn-accent w-full py-2">
              {saved ? '✓ Saved!' : 'Log Vitals'}
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="card">
          <h2 className="section-title">Shift Tasks</h2>
          <div className="space-y-2">
            {taskList.map(t => (
              <div key={t.id} className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${t.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="mt-0.5 accent-[#0d9488]" />
                <div className="flex-1">
                  <p className={`text-sm ${t.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t.task}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Due: {t.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shift Handover */}
      <div className="card">
        <h2 className="section-title">Shift Handover Notes</h2>
        <textarea
          className="input-field h-24 resize-none"
          placeholder="Enter handover notes for next shift..."
          defaultValue="P003 Rajan Mehta — SpO₂ fluctuating, monitor closely every 2h. IV drip running at 60ml/hr. Dr. Desai to review at 15:00."
        />
        <button className="btn-primary mt-3">Submit Handover</button>
      </div>
    </div>
  )
}
