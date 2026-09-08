import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useCases(status = null) {
  const [cases,   setCases]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchCases = useCallback(async () => {
    try {
      let query = supabase
        .from('cases')
        .select('*, beneficiaries(full_name, category, photo_url)')
        .order('submitted_at', { ascending: false })

      if (status) query = query.eq('status', status)

      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setError(null)
        setCases(data ?? [])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch cases')
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchCases()
  }, [fetchCases])

  async function updateStatus(id, newStatus, verifiedBy) {
    const { error } = await supabase
      .from('cases')
      .update({ status: newStatus, verified_by: verifiedBy, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) {
      setCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
    }
    return { error }
  }

  async function createCase(payload) {
    const { data, error } = await supabase.from('cases').insert(payload).select().single()
    if (!error && data) setCases(prev => [data, ...prev])
    return { data, error }
  }

  return { cases, loading, error, updateStatus, createCase, refetch }
}
