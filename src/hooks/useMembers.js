import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

function sanitizeMember(payload) {
  return {
    ...payload,
    join_date: payload.join_date?.trim() ? payload.join_date : null,
    phone: payload.phone?.trim() ? payload.phone : null,
    whatsapp_group: payload.whatsapp_group?.trim() ? payload.whatsapp_group : null,
    notes: payload.notes?.trim() ? payload.notes : null,
  }
}

export function useMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const fetchMembers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('full_name', { ascending: true })
      if (error) {
        setError(error.message)
      } else {
        setError(null)
        setMembers(data ?? [])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch members')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchMembers()
  }, [fetchMembers])

  async function create(payload) {
    const cleanPayload = sanitizeMember(payload)
    const { data, error } = await supabase.from('members').insert(cleanPayload).select().single()
    if (!error && data) {
      setMembers(prev => [...prev, data].sort((a, b) => (a.full_name ?? '').localeCompare(b.full_name ?? '')))
    }
    return { data, error }
  }

  async function update(id, payload) {
    const cleanPayload = sanitizeMember(payload)
    const { data, error } = await supabase
      .from('members').update(cleanPayload).eq('id', id).select().single()
    if (!error && data) {
      setMembers(prev => prev.map(m => m.id === id ? data : m))
    }
    return { data, error }
  }

  async function remove(id) {
    const { error } = await supabase.from('members').delete().eq('id', id)
    if (!error) setMembers(prev => prev.filter(m => m.id !== id))
    return { error }
  }

  return { members, loading, error, create, update, remove, refetch }
}
