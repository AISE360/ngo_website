import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { AdminSidebar } from '../components/layout/AdminSidebar'

export function ProtectedRoute() {
  const { session, loading } = useAuthContext()

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
      <AdminSidebar />
      <main className="admin-main flex-1">
        <Outlet />
      </main>
    </div>
  )
}
