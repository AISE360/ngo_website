import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

// Homepage impact counters — these numbers feed the stats strip on Home.
export default function ImpactStats() {
  const { rows, loading, error, update, create, remove, refetch } = useAdminTable('impact_stats', { orderBy: 'sort_order', ascending: true })
  const [form, setForm] = useState({ label: '', value: 0, suffix: '+', sort_order: 99 })
  const [editId, setEditId] = useState(null)
  const [edit, setEdit] = useState({})

  async function add(e) {
    e.preventDefault()
    if (!form.label) return
    const { error } = await create({ ...form, value: Number(form.value) || 0 })
    if (error) toast.error(error.message)
    else { toast.success('Counter added'); setForm({ label: '', value: 0, suffix: '+', sort_order: 99 }) }
  }

  function startEdit(row) { setEditId(row.id); setEdit({ label: row.label, value: row.value, suffix: row.suffix, sort_order: row.sort_order }) }
  async function saveEdit(id) {
    const { error } = await update(id, { ...edit, value: Number(edit.value) || 0, sort_order: Number(edit.sort_order) || 0 })
    if (error) toast.error(error.message)
    else { toast.success('Saved'); setEditId(null) }
  }

  async function toggle(row) {
    const { error } = await update(row.id, { is_active: !row.is_active })
    if (error) toast.error(error.message)
  }
  async function del(id) {
    if (!confirm('Delete this counter?')) return
    const { error } = await remove(id)
    if (error) toast.error(error.message)
    else toast.success('Deleted')
  }

  const columns = [
    { key: 'label', label: 'Label', render: (v, r) => editId === r.id
      ? <input className="input-field !py-1.5 text-xs" value={edit.label} onChange={(e) => setEdit({ ...edit, label: e.target.value })} />
      : <span className="font-medium text-brand-navy text-sm">{v}</span> },
    { key: 'value', label: 'Number', render: (v, r) => editId === r.id
      ? <input type="number" className="input-field !py-1.5 text-xs w-24" value={edit.value} onChange={(e) => setEdit({ ...edit, value: e.target.value })} />
      : <span className="font-display font-bold text-lg text-brand-tealDeep">{v}{r.suffix}</span> },
    { key: 'suffix', label: 'Suffix', render: (v, r) => editId === r.id
      ? <input className="input-field !py-1.5 text-xs w-16" value={edit.suffix} onChange={(e) => setEdit({ ...edit, suffix: e.target.value })} />
      : <span className="text-xs font-mono">{v}</span> },
    { key: 'sort_order', label: 'Order', render: (v, r) => editId === r.id
      ? <input type="number" className="input-field !py-1.5 text-xs w-16" value={edit.sort_order} onChange={(e) => setEdit({ ...edit, sort_order: e.target.value })} />
      : <span className="text-xs">{v}</span> },
    { key: 'is_active', label: 'Live', render: (v) => <Badge label={v ? 'live' : 'hidden'} /> },
    { key: 'id', label: '', render: (v, r) => editId === r.id
      ? <span className="flex gap-2"><button onClick={() => saveEdit(v)} className="text-xs font-bold text-status-approved">Save</button><button onClick={() => setEditId(null)} className="text-xs text-gray-400">Cancel</button></span>
      : <span className="flex gap-3"><button onClick={() => startEdit(r)} className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark">Edit</button><button onClick={() => toggle(r)} className="text-xs text-gray-400">{r.is_active ? 'Hide' : 'Show'}</button><button onClick={() => del(v)} className="text-xs text-red-400">Delete</button></span> },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Impact Counters</h1>
        <p className="text-gray-500 text-sm">Numbers on the homepage stats strip — edit without redeploying</p>
      </div>
      <form onSubmit={add} className="glass-card p-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <input className="input-field lg:col-span-2" placeholder="Label (e.g. Patients supported)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
        <input type="number" className="input-field" placeholder="Number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <input className="input-field" placeholder="Suffix (+ or %)" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} />
        <Button type="submit" size="sm">+ Add counter</Button>
      </form>
      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={rows} loading={loading} error={error} onRetry={refetch} emptyMessage="No counters. Run 002 migration seed." />
      </div>
    </div>
  )
}
