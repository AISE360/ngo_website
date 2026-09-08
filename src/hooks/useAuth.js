import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getUserRole } from '../utils/roleGuard'

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))
}

export function useAuth() {
  const [session, setSession] = useState(null)
  const [user,    setUser]    = useState(null)
  const [role,    setRole]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    let initialized = false

    // Subscribe to auth changes FIRST.  In supabase-js v2 the
    // onAuthStateChange call fires an INITIAL_SESSION event synchronously,
    // which gives us the session immediately without a network round-trip.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        setSession(session)
        setUser(session?.user ?? null)

        // The first event is INITIAL_SESSION — we can stop loading now.
        if (!initialized) {
          initialized = true
          setLoading(false)
        }

        // Defer getUserRole to next tick to avoid supabase-js auth-lock deadlock
        if (session?.user) {
          const uid = session.user.id
          setTimeout(() => {
            if (!mounted) return
            getUserRole(uid)
              .then(r => { if (mounted) setRole(r) })
              .catch(err => console.error('Role fetch error:', err))
          }, 0)
        } else {
          if (mounted) setRole(null)
        }
      }
    )

    // Fallback: if INITIAL_SESSION never fired (e.g. the client is broken),
    // try getSession() with a short timeout.
    async function fallbackInit() {
      try {
        const { data: { session: stored } } = await Promise.race([
          supabase.auth.getSession(),
          timeout(3000),
        ])
        if (!mounted || initialized) return
        initialized = true
        setSession(stored)
        setUser(stored?.user ?? null)
        if (stored?.user) {
          const uid = stored.user.id
          setTimeout(() => {
            if (!mounted) return
            getUserRole(uid).then(r => { if (mounted) setRole(r) })
          }, 0)
        }
      } catch {
        // getSession() timed out in fallback — INITIAL_SESSION already
        // set the session, so this is harmless.
      } finally {
        if (mounted && !initialized) {
          initialized = true
          setLoading(false)
        }
      }
    }

    fallbackInit()

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
