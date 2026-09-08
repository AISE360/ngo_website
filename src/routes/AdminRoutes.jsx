import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { AdminSidebar } from '../components/layout/AdminSidebar'
import { Menu, X } from 'lucide-react'

export function ProtectedRoute() {
  const { session, loading } = useAuthContext()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-brand-blue" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-blue-200 text-sm">Authenticating…</p>
        </div>
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile hamburger */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-brand-green text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-brand-green text-white z-40 flex flex-col
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <AdminSidebar onMobileClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="admin-main flex-1 min-w-0 pt-16 md:pt-0">
        {/* Close button for mobile */}
        {sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white/80 text-brand-navy md:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <Outlet />
      </main>
    </div>
  )
}

