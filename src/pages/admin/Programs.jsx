import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'

const empty = { title: '', slug: '', short: '', description: '', hero_url: '', sort_order: 0, is_active: true }

export default function Programs() {
  const { rows, loading, error, update, create, refetch } = useAdminTable('programs', { orderBy: 'sort_order', ascending: true })
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  function openNew() { setForm(empty); setEditing('new') }
  function openEdit(row) { setForm({ ...row }); setEditing(row.id) }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 }
      if (editing === 'new') {
        const { error } = await create(payload)
        if (error) throw error
        toast.success('Program added')
      } else {
        const { id, created_at, updated_at, ...patch } = payload
        void id; void created_at; void updated_at
        const { error } = await update(editing, patch)
        if (error) throw error
        toast.success('Program updated')
      }
      setEditing(null)
    } catch (err) {
      toast.error(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function toggle(row) {
    const { error } = await update(row.id, { is_active: !row.is_active })
    if (error) toast.error(error.message)
  }

  const columns = [
    { key: 'title', label: 'Program', render: (v, r) => <span><span className="font-medium text-brand-navy block">{v}</span><span className="text-xs text-gray-400 font-mono">{r.slug}</span></span> },
    { key: 'short', label: 'Tagline', render: (v) => <span className="text-xs text-gray-500 max-w-[240px] block truncate">{v}</span> },
    { key: 'is_active', label: 'Live', render: (v) => <Badge label={v ? 'live' : 'hidden'} /> },
    { key: 'sort_order', label: 'Order', render: (v) => <span className="text-xs">{v}</span> },
    { key: 'id', label: '', render: (v, r) => (
      <span className="flex gap-3">
        <button onClick={() => openEdit(r)} className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark">Edit</button>
        <button onClick={() => toggle(r)} className="text-xs text-gray-400 hover:text-gray-600">{r.is_active ? 'Hide' : 'Show'}</button>
      </span>
    ) },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Programs</h1>
          <p className="text-gray-500 text-sm">CMS-lite — edits reflect wherever programs are read from Supabase ({rows.length})</p>
        </div>
        <Button variant="outline" size="sm" onClick={openNew}>+ New program</Button>
      </div>
      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={rows} loading={loading} error={error} onRetry={refetch} emptyMessage="No programs. Run 002 migration seed." />
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={editing === 'new' ? 'New program' : 'Edit program'} size="lg">
        <form onSubmit={save} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Title *</label><input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div><label className="label">Slug *</label><input className="input-field font-mono" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required disabled={editing !== 'new'} /></div>
          </div>
          <div><label className="label">Short tagline</label><input className="input-field" value={form.short || ''} onChange={(e) => setForm({ ...form, short: e.target.value })} /></div>
          <div><label className="label">Description</label><textarea className="input-field h-28 resize-none" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Hero image URL</label><input className="input-field font-mono text-xs" value={form.hero_url || ''} onChange={(e) => setForm({ ...form, hero_url: e.target.value })} placeholder="/field/field-3.jpg" /></div>
            <div><label className="label">Sort order</label><input type="number" className="input-field" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded" /> Live on site</label>
          <Button type="submit" loading={saving} className="w-full">{editing === 'new' ? 'Add program' : 'Save changes'}</Button>
        </form>
      </Modal>
    </div>
  )
}
