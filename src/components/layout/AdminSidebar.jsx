import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, UserCheck, HeartHandshake,
  DollarSign, LogOut, ChevronRight
} from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import logo from '../../assets/logo.webp'

const navItems = [
  { to: '/admin/dashboard',      icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/members',        icon: Users,           label: 'Members' },
  { to: '/admin/cases',          icon: FileText,        label: 'Cases' },
  { to: '/admin/beneficiaries',  icon: UserCheck,       label: 'Beneficiaries' },
  { to: '/admin/sponsors',       icon: HeartHandshake,  label: 'Sponsors' },
  { to: '/admin/donations',      icon: DollarSign,      label: 'Donations' },
]

export function AdminSidebar() {
  const { user, signOut } = useAuthContext()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Al-Huda" className="h-10 w-10 rounded-lg object-contain bg-white p-0.5" />
          <div>
            <p className="font-display font-bold text-white text-sm leading-tight">Al-Huda Admin</p>
            <p className="text-xs text-brand-gold leading-tight">Welfare Society</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group btn-no-flash ${
                isActive
                  ? 'bg-brand-gold text-white shadow-md'
                  : 'text-green-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-xs font-bold text-white">
            {user?.email?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.email ?? 'Admin'}</p>
            <p className="text-xs text-green-300">Staff</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-no-flash w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-green-300 hover:bg-red-500/20 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
