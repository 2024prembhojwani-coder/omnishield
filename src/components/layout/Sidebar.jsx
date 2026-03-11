import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, CreditCard, Activity, Brain, BarChart2,
  Shield, Link, Radio, Lock, TrendingUp, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { path: '/dashboard',     label: 'Dashboard',        Icon: LayoutDashboard },
  { path: '/health-card',   label: 'Health Card',       Icon: CreditCard },
  { path: '/surveillance',  label: 'Surveillance',      Icon: Activity },
  { path: '/cdss',          label: 'CDSS / AI',         Icon: Brain },
  { path: '/analytics',     label: 'Analytics',         Icon: BarChart2 },
  { path: '/privacy',       label: 'Privacy & FL',      Icon: Shield },
  { path: '/integration',   label: 'FHIR Integration',  Icon: Link },
  { path: '/streaming',     label: 'Live Streaming',    Icon: Radio },
  { path: '/security',      label: 'Security',          Icon: Lock },
  { path: '/business-model',label: 'Business Model',    Icon: TrendingUp },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`relative bg-[#152a45] text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'} min-h-full shrink-0`}>
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute -right-3 top-6 bg-[#0d9488] text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10 hover:bg-[#0f766e] transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive
                ? 'bg-[#0d9488] text-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-3 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">OmniShield v1.0.0</p>
        </div>
      )}
    </aside>
  )
}
