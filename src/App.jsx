import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { PublicLayout } from './routes/PublicRoutes'
import { ProtectedRoute } from './routes/AdminRoutes'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Programs from './pages/public/Programs'
import ProgramDetail from './pages/public/ProgramDetail'
import Gallery from './pages/public/Gallery'
import GetInvolved from './pages/public/GetInvolved'
import DonatePage from './pages/public/DonatePage'
import Blog from './pages/public/Blog'
import Contact from './pages/public/Contact'

import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import Members from './pages/admin/Members'
import Cases from './pages/admin/Cases'
import Beneficiaries from './pages/admin/Beneficiaries'
import Sponsors from './pages/admin/Sponsors'
import Donations from './pages/admin/Donations'

function Legal({ title }) {
  return (
    <div className="section bg-white">
      <div className="container-md">
        <h1 className="font-display display-lg text-brand-tealDeep">{title}</h1>
        <p className="text-brand-slate mt-4">Editable placeholder — replace with your actual {title.toLowerCase()} before launch. Contact hello@thoughtfulhearts.org.in for queries.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/volunteer" element={<Navigate to="/get-involved" replace />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal title="Privacy Policy" />} />
            <Route path="/terms" element={<Legal title="Terms of Use" />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/members" element={<Members />} />
            <Route path="/admin/cases" element={<Cases />} />
            <Route path="/admin/beneficiaries" element={<Beneficiaries />} />
            <Route path="/admin/sponsors" element={<Sponsors />} />
            <Route path="/admin/donations" element={<Donations />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '14px', fontSize: '14px' } }} />
    </AuthProvider>
  )
}
