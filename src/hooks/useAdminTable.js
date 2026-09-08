import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

// Generic admin table hook: list / update / remove / toggle / create
export function useAdminTable(table, { orderBy = 'created_at', ascending = false } = {}) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRows = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending })
      if (error) throw error
      setRows(data ?? [])
      setError(null)
    } catch (err) {
      setError(err.message || `Failed to load ${table}`)
    } finally {
      setLoading(false)
    }
  }, [table, orderBy, ascending])

  useEffect(() => { fetchRows() }, [fetchRows])

  const update = useCallback(async (id, patch) => {
    const { data, error } = await supabase.from(table).update(patch).eq('id', id).select().single()
    if (!error && data) setRows((prev) => prev.map((r) => (r.id === id ? data : r)))
    return { data, error }
  }, [table])

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (!error) setRows((prev) => prev.filter((r) => r.id !== id))
    return { error }
  }, [table])

  const create = useCallback(async (payload) => {
    const { data, error } = await supabase.from(table).insert(payload).select().single()
    if (!error && data) setRows((prev) => [data, ...prev])
    return { data, error }
  }, [table])

  return { rows, loading, error, refetch: fetchRows, update, remove, create }
}
