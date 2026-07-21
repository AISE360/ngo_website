import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const fetchSponsors = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*, beneficiaries(full_name, category, photo_url)')
        .order('created_at', { ascending: false })
      if (error) {
        setError(error.message)
      } else {
        setError(null)
        setSponsors(data ?? [])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch sponsors')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSponsors()
  }, [fetchSponsors])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchSponsors()
  }, [fetchSponsors])

  async function create(payload) {
    const { data, error } = await supabase.rpc('submit_sponsor', {
      p_donor_name:     payload.donor_name,
      p_donor_email:    payload.donor_email ?? null,
      p_donor_phone:    payload.donor_phone ?? null,
      p_amount_per_year: payload.amount_per_year ?? null,
      p_notes:          payload.notes ?? null,
      p_beneficiary_id: payload.beneficiary_id ?? null,
    })
    if (!error && data) {
      const { data: newRow } = await supabase.from('sponsors').select('*, beneficiaries(full_name, category, photo_url)').eq('id', data.sponsor_id).single()
      if (newRow) setSponsors(prev => [newRow, ...prev])
    }
    return { data, error }
  }

  async function update(id, payload) {
    const { data, error } = await supabase
      .from('sponsors').update(payload).eq('id', id).select().single()
    if (!error && data) setSponsors(prev => prev.map(s => s.id === id ? data : s))
    return { data, error }
  }

  async function toggleActive(id, current) {
    return update(id, { is_active: !current })
  }

  return { sponsors, loading, error, create, update, toggleActive, refetch }
}
