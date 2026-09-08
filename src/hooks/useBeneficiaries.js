import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useBeneficiaries(category = null) {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)

  const fetchBeneficiaries = useCallback(async () => {
    try {
      let query = supabase
        .from('beneficiaries')
        .select('*')
        .order('created_at', { ascending: false })

      if (category) query = query.eq('category', category)

      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setError(null)
        setBeneficiaries(data ?? [])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch beneficiaries')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchBeneficiaries()
  }, [fetchBeneficiaries])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchBeneficiaries()
  }, [fetchBeneficiaries])

  async function create(payload) {
    const { data, error } = await supabase.from('beneficiaries').insert(payload).select().single()
    if (!error && data) setBeneficiaries(prev => [data, ...prev])
    return { data, error }
  }

  async function update(id, payload) {
    const { data, error } = await supabase
      .from('beneficiaries').update(payload).eq('id', id).select().single()
    if (!error && data) setBeneficiaries(prev => prev.map(b => b.id === id ? data : b))
    return { data, error }
  }

  async function remove(id) {
    const { error } = await supabase.from('beneficiaries').delete().eq('id', id)
    if (!error) setBeneficiaries(prev => prev.filter(b => b.id !== id))
    return { error }
  }

  async function uploadPhoto(file, beneficiaryId) {
    const ext  = file.name.split('.').pop()
    const path = `${beneficiaryId}/photo.${ext}`
    const { error: upErr } = await supabase.storage
      .from('beneficiary-photos')
      .upload(path, file, { upsert: true })
    if (upErr) return { url: null, error: upErr }
    const { data: { publicUrl } } = supabase.storage
      .from('beneficiary-photos')
      .getPublicUrl(path)
    return { url: publicUrl, error: null }
  }

  return { beneficiaries, loading, error, create, update, remove, uploadPhoto, refetch }
}
