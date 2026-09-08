import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDonations(filters = {}) {
  const [donations, setDonations] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [total,     setTotal]     = useState(0)

  const filterStatus  = filters.status ?? null
  const filterPurpose = filters.purpose ?? null

  const fetchDonations = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })

      if (filterStatus)  query = query.eq('status', filterStatus)
      if (filterPurpose) query = query.eq('purpose', filterPurpose)

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database query timed out (10s). Check Supabase database connection and active locks.')), 10000)
      )

      const { data, error } = await Promise.race([query, timeoutPromise])
      if (error) {
        console.error('[useDonations] Supabase query error:', error)
        setError(error.message)
      } else {
        setError(null)
        const list = data ?? []
        setDonations(list)
        const sum = list
          .filter(d => d.status === 'success')
          .reduce((acc, d) => acc + Number(d.amount || 0), 0)
        setTotal(sum)
      }
    } catch (err) {
      console.error('[useDonations] Fetch caught error:', err)
      setError(err.message || 'Failed to fetch donations')
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPurpose])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchDonations()
  }, [fetchDonations])

  async function create(payload) {
    const { data, error } = await supabase.rpc('submit_donation', {
      p_amount:        payload.amount,
      p_donor_name:    payload.donor_name ?? null,
      p_donor_email:   payload.donor_email ?? null,
      p_purpose:       payload.purpose ?? 'general',
      p_payment_method: payload.payment_method ?? 'other',
      p_status:        payload.status ?? 'pending',
      p_currency:      payload.currency ?? 'INR',
    })
    if (!error && data) {
      const { data: newRow } = await supabase.from('donations').select('*').eq('id', data.id).single()
      if (newRow) setDonations(prev => [newRow, ...prev])
    }
    return { data, error }
  }

  async function updateStatus(id, status, note = null) {
    const patch = { status }
    if (note) patch.notes = note
    const { data, error } = await supabase
      .from('donations').update(patch).eq('id', id).select().single()
    if (!error && data) setDonations(prev => prev.map(d => d.id === id ? data : d))
    return { data, error }
  }

  /** Export donations as CSV string */
  function exportCSV() {
    const headers = ['Receipt No','Donor','Email','Amount','Purpose','Method','Status','Date']
    const rows = donations.map(d => [
      d.receipt_no, d.donor_name, d.donor_email,
      d.amount, d.purpose, d.payment_method, d.status,
      d.created_at ? new Date(d.created_at).toLocaleDateString('en-IN') : ''
    ])
    return [headers, ...rows].map(r => r.join(',')).join('\n')
  }

  return { donations, loading, error, total, create, updateStatus, exportCSV, refetch }
}
