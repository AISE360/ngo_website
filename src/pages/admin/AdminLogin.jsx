import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import logo from '../../assets/logo.webp'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function AdminLogin() {
  const { signIn, session, loading } = useAuthContext()
  const [showPwd, setShowPwd] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  if (!loading && session) return <Navigate to="/admin/dashboard" replace />

  async function onSubmit({ email, password }) {
    const { error } = await signIn(email, password)
    if (error) {
      toast.error(error.message || 'Invalid credentials')
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <div className="min-h-screen bg-brand-green flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Al-Huda" className="h-20 w-20 rounded-2xl object-contain bg-white p-1 mx-auto mb-4 shadow-lg" />
          <h1 className="font-display text-2xl font-bold text-white">Staff Login</h1>
          <p className="text-brand-gold text-sm mt-1">Al-Huda Welfare Society Admin</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="admin-login-form">
            <div>
              <label className="label">Email Address</label>
              <input
                {...register('email')}
                className="input-field"
                type="email"
                placeholder="admin@alhudawelfare.org"
                autoComplete="email"
                id="login-email"
              />
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  className="input-field pr-10"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  id="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full" size="lg" id="login-submit-btn">
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-green-300 text-xs mt-6">
          Access restricted to authorised staff only.
        </p>
      </div>
    </div>
  )
}
