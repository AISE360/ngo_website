import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('full_name', { ascending: true })
    if (error) setError(error.message)
    else setMembers(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  async function create(payload) {
    const { data, error } = await supabase.from('members').insert(payload).select().single()
    if (!error) setMembers(prev => [...prev, data].sort((a, b) => a.full_name.localeCompare(b.full_name)))
    return { data, error }
  }

  async function update(id, payload) {
    const { data, error } = await supabase
      .from('members').update(payload).eq('id', id).select().single()
    if (!error) setMembers(prev => prev.map(m => m.id === id ? data : m))
    return { data, error }
  }

  async function remove(id) {
    const { error } = await supabase.from('members').delete().eq('id', id)
    if (!error) setMembers(prev => prev.filter(m => m.id !== id))
    return { error }
  }

  return { members, loading, error, create, update, remove, refetch: fetchMembers }
}
