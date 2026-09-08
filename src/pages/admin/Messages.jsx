import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { formatDate } from '../../utils/formatDate'

function Panel({ table, title, subtitle, columns }) {
  const { rows, loading, error, update, remove, refetch } = useAdminTable(table)

  async function setStatus(id, status) {
    const { error } = await update(id, { status })
    if (error) toast.error(error.message)
    else toast.success(`Marked ${status}`)
  }
  async function del(id) {
    if (!confirm('Delete this entry?')) return
    const { error } = await remove(id)
    if (error) toast.error(error.message)
    else toast.success('Deleted')
  }

  const cols = columns(setStatus, del)
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-brand-navy">{title}</h2>
        <p className="text-gray-500 text-xs">{subtitle} ({rows.length})</p>
      </div>
      <div className="glass-card overflow-hidden">
        <Table columns={cols} data={rows} loading={loading} error={error} onRetry={refetch} emptyMessage="Nothing here yet." />
      </div>
    </div>
  )
}

const STATUS = ['new', 'replied', 'closed']
const CSR_STATUS = ['new', 'contacted', 'partner', 'closed']

export default function Messages() {
  const [tab, setTab] = useState('contact')

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Messages</h1>
        <p className="text-gray-500 text-sm">Contact form + CSR/partnership inquiries</p>
      </div>
      <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[{ id: 'contact', label: 'Contact' }, { id: 'csr', label: 'CSR Inquiries' }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-5 py-2 rounded-lg text-sm font-semibold ${tab === t.id ? 'bg-white shadow text-brand-tealDeep' : 'text-gray-500'}`}>{t.label}</button>
        ))}
      </div>

      {tab === 'contact' ? (
        <Panel table="contact_messages" title="Contact messages" subtitle="From /contact form"
          columns={(setStatus, del) => [
            { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-brand-navy">{v}</span> },
            { key: 'phone', label: 'Phone', render: (v) => <span className="text-xs">{v}</span> },
            { key: 'message', label: 'Message', render: (v) => <span className="text-xs text-gray-500 max-w-[300px] block">{v}</span> },
            { key: 'status', label: 'Status', render: (v, r) => (
              <select value={v} onChange={(e) => setStatus(r.id, e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ) },
            { key: 'created_at', label: 'Date', render: (v) => <span className="text-xs text-gray-400">{formatDate(v)}</span> },
            { key: 'id', label: '', render: (v) => <button onClick={() => del(v)} className="text-xs text-red-400 hover:text-red-600">Delete</button> },
          ]} />
      ) : (
        <Panel table="csr_inquiries" title="CSR / Partnership inquiries" subtitle="From Get Involved → CSR tab"
          columns={(setStatus, del) => [
            { key: 'org_name', label: 'Organisation', render: (v) => <span className="font-medium text-brand-navy">{v}</span> },
            { key: 'contact_person', label: 'Contact', render: (v) => <span className="text-xs">{v}</span> },
            { key: 'email', label: 'Email', render: (v) => <span className="text-xs text-gray-400">{v}</span> },
            { key: 'phone', label: 'Phone', render: (v) => <span className="text-xs">{v}</span> },
            { key: 'status', label: 'Status', render: (v, r) => (
              <select value={v} onChange={(e) => setStatus(r.id, e.target.value)} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                {CSR_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ) },
            { key: 'created_at', label: 'Date', render: (v) => <span className="text-xs text-gray-400">{formatDate(v)}</span> },
            { key: 'id', label: '', render: (v) => <button onClick={() => del(v)} className="text-xs text-red-400 hover:text-red-600">Delete</button> },
          ]} />
      )}
    </div>
  )
}
