import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDonations(filters = {}) {
  const [donations, setDonations] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [total,     setTotal]     = useState(0)

  const fetchDonations = useCallback(async () => {
    setLoading(true)
    setError(null)
    let query = supabase
      .from('donations')
      .select('*, cases(case_type, status)')
      .order('created_at', { ascending: false })

    if (filters.status)  query = query.eq('status', filters.status)
    if (filters.purpose) query = query.eq('purpose', filters.purpose)

    const { data, error } = await query
    if (error) {
      setError(error.message)
    } else {
      setDonations(data ?? [])
      const sum = (data ?? [])
        .filter(d => d.status === 'success')
        .reduce((acc, d) => acc + Number(d.amount), 0)
      setTotal(sum)
    }
    setLoading(false)
  }, [filters.status, filters.purpose])

  useEffect(() => { fetchDonations() }, [fetchDonations])

  async function create(payload) {
    const { data, error } = await supabase.from('donations').insert(payload).select().single()
    if (!error) setDonations(prev => [data, ...prev])
    return { data, error }
  }

  async function updateStatus(id, status, razorpay_payment_id = null) {
    const patch = { status }
    if (razorpay_payment_id) patch.razorpay_payment_id = razorpay_payment_id
    const { data, error } = await supabase
      .from('donations').update(patch).eq('id', id).select().single()
    if (!error) setDonations(prev => prev.map(d => d.id === id ? data : d))
    return { data, error }
  }

  /** Export donations as CSV string */
  function exportCSV() {
    const headers = ['Receipt No','Donor','Email','Amount','Purpose','Method','Status','Date']
    const rows = donations.map(d => [
      d.receipt_no, d.donor_name, d.donor_email,
      d.amount, d.purpose, d.payment_method, d.status,
      new Date(d.created_at).toLocaleDateString('en-IN')
    ])
    return [headers, ...rows].map(r => r.join(',')).join('\n')
  }

  return { donations, loading, error, total, create, updateStatus, exportCSV, refetch: fetchDonations }
}
