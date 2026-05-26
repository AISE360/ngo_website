import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { PublicLayout }   from './routes/PublicRoutes'
import { ProtectedRoute } from './routes/AdminRoutes'

// Public pages
import Home          from './pages/public/Home'
import About         from './pages/public/About'
import Education     from './pages/public/Education'
import HealthFund    from './pages/public/HealthFund'
import MarriageFund  from './pages/public/MarriageFund'
import SponsorAChild from './pages/public/SponsorAChild'
import DonatePage    from './pages/public/DonatePage'
import SubmitCase    from './pages/public/SubmitCase'
import Gallery       from './pages/public/Gallery'
import Contact       from './pages/public/Contact'

// Admin pages
import AdminLogin    from './pages/admin/AdminLogin'
import Dashboard     from './pages/admin/Dashboard'
import Members       from './pages/admin/Members'
import Cases         from './pages/admin/Cases'
import Beneficiaries from './pages/admin/Beneficiaries'
import Sponsors      from './pages/admin/Sponsors'
import Donations     from './pages/admin/Donations'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/"              element={<Home />} />
            <Route path="/about"         element={<About />} />
            <Route path="/education"     element={<Education />} />
            <Route path="/health"        element={<HealthFund />} />
            <Route path="/marriage-fund" element={<MarriageFund />} />
            <Route path="/sponsor"       element={<SponsorAChild />} />
            <Route path="/donate"        element={<DonatePage />} />
            <Route path="/submit-case"   element={<SubmitCase />} />
            <Route path="/gallery"       element={<Gallery />} />
            <Route path="/contact"       element={<Contact />} />
          </Route>

          {/* Admin login (no sidebar) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin"               element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard"     element={<Dashboard />} />
            <Route path="/admin/members"       element={<Members />} />
            <Route path="/admin/cases"         element={<Cases />} />
            <Route path="/admin/beneficiaries" element={<Beneficiaries />} />
            <Route path="/admin/sponsors"      element={<Sponsors />} />
            <Route path="/admin/donations"     element={<Donations />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#27AE60', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#E74C3C', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  )
}
