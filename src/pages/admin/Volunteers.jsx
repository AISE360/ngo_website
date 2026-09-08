import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { formatDate } from '../../utils/formatDate'

const STATUS = ['all', 'new', 'contacted', 'active', 'inactive']

export default function Volunteers() {
  const [filter, setFilter] = useState('all')
  const { rows, loading, error, update, remove, refetch } = useAdminTable('volunteers')

  const list = rows.filter((r) => filter === 'all' || r.status === filter)

  async function setStatus(id, status) {
    const { error } = await update(id, { status })
    if (error) toast.error(error.message)
    else toast.success(`Marked ${status}`)
  }

  async function del(id, name) {
    if (!confirm(`Delete volunteer ${name}?`)) return
    const { error } = await remove(id)
    if (error) toast.error(error.message)
    else toast.success('Deleted')
  }

  const columns = [
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-brand-navy">{v}</span> },
    { key: 'phone', label: 'Phone', render: (v) => <span className="text-xs">{v}</span> },
    { key: 'email', label: 'Email', render: (v) => <span className="text-xs text-gray-400">{v || '—'}</span> },
    { key: 'interest', label: 'Interest', render: (v) => <Badge label={v || 'general'} /> },
    { key: 'message', label: 'Note', render: (v) => <span className="text-xs text-gray-500 max-w-[220px] block truncate">{v || '—'}</span> },
    { key: 'status', label: 'Status', render: (v, row) => (
      <select value={v} onChange={(e) => setStatus(row.id, e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
        {STATUS.filter((s) => s !== 'all').map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    ) },
    { key: 'created_at', label: 'Date', render: (v) => <span className="text-xs text-gray-400">{formatDate(v)}</span> },
    { key: 'id', label: '', render: (v, row) => <button onClick={() => del(v, row.name)} className="text-xs text-red-400 hover:text-red-600">Delete</button> },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Volunteers</h1>
        <p className="text-gray-500 text-sm">{rows.length} sign-ups from Get Involved form</p>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {STATUS.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${filter === s ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
        ))}
      </div>
      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={list} loading={loading} error={error} onRetry={refetch} emptyMessage="No volunteer sign-ups yet." />
      </div>
    </div>
  )
}
