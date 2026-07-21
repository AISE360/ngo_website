import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getUserRole } from '../utils/roleGuard'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [user,    setUser]    = useState(null)
  const [role,    setRole]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!mounted) return
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const r = await getUserRole(session.user.id)
          if (mounted) setRole(r)
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const r = await getUserRole(session.user.id)
          if (mounted) setRole(r)
        } else {
          if (mounted) setRole(null)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { session, user, role, loading, signIn, signOut }
}
