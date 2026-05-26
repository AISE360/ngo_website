import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  const fetchSponsors = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('sponsors')
      .select('*, beneficiaries(full_name, category, photo_url)')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setSponsors(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchSponsors() }, [fetchSponsors])

  async function create(payload) {
    const { data, error } = await supabase.from('sponsors').insert(payload).select().single()
    if (!error) setSponsors(prev => [data, ...prev])
    return { data, error }
  }

  async function update(id, payload) {
    const { data, error } = await supabase
      .from('sponsors').update(payload).eq('id', id).select().single()
    if (!error) setSponsors(prev => prev.map(s => s.id === id ? data : s))
    return { data, error }
  }

  async function toggleActive(id, current) {
    return update(id, { is_active: !current })
  }

  return { sponsors, loading, error, create, update, toggleActive, refetch: fetchSponsors }
}
