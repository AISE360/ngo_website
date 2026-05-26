import { useState } from 'react'
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCases } from '../../hooks/useCases'
import { useAuthContext } from '../../context/AuthContext'
import { Table } from '../../components/ui/Table'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatINR } from '../../utils/formatCurrency'
import { format } from 'date-fns'

const STATUS_OPTIONS = ['all', 'submitted', 'under_review', 'approved', 'disbursed', 'rejected']

export default function Cases() {
  const [filter,  setFilter]  = useState('all')
  const [search,  setSearch]  = useState('')
  const [detail,  setDetail]  = useState(null)
  const { cases, loading, updateStatus } = useCases(filter === 'all' ? null : filter)
  const { user } = useAuthContext()

  const filtered = cases.filter(c =>
    (c.beneficiaries?.full_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  async function handleApprove(c) {
    const { error } = await updateStatus(c.id, 'approved', user?.id)
    error ? toast.error(error.message) : toast.success('Case approved!')
    setDetail(null)
  }

  async function handleReject(c) {
    const { error } = await updateStatus(c.id, 'rejected', user?.id)
    error ? toast.error(error.message) : toast.success('Case rejected')
    setDetail(null)
  }

  const columns = [
    { key: 'beneficiaries', label: 'Beneficiary',
      render: (v) => <span className="font-medium text-brand-navy">{v?.full_name ?? '—'}</span> },
    { key: 'case_type', label: 'Type', render: v => <Badge label={v} /> },
    { key: 'amount_requested', label: 'Requested', render: v => v ? formatINR(v) : '—' },
    { key: 'amount_approved',  label: 'Approved',  render: v => v ? formatINR(v) : '—' },
    { key: 'status', label: 'Status', render: v => <Badge label={v} /> },
    { key: 'submitted_at', label: 'Date', render: v => format(new Date(v), 'dd MMM yyyy') },
    {
      key: 'id', label: 'Actions',
      render: (_, row) => (
        <button onClick={() => setDetail(row)} className="p-1.5 rounded-lg hover:bg-brand-ice text-gray-400 hover:text-brand-blue transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      )
    },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Cases</h1>
        <p className="text-gray-500 text-sm">Review and manage aid requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'bg-brand-blue text-white'
                : 'bg-brand-ice text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" placeholder="Search beneficiary…" />
      </div>

      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={filtered} loading={loading} emptyMessage="No cases found for this filter." />
      </div>

      {/* Case detail modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title="Case Details" size="lg">
        {detail && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Beneficiary', detail.beneficiaries?.full_name],
                ['Type', detail.case_type],
                ['Status', detail.status],
                ['Requested', formatINR(detail.amount_requested)],
                ['Approved', detail.amount_approved ? formatINR(detail.amount_approved) : 'Not yet'],
                ['Submitted', format(new Date(detail.submitted_at), 'dd MMM yyyy, HH:mm')],
              ].map(([k, v], i) => (
                <div key={i}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{k}</p>
                  <p className="font-medium text-brand-navy mt-0.5">{v || '—'}</p>
                </div>
              ))}
            </div>

            {detail.description && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Description</p>
                <p className="text-sm text-gray-600 bg-brand-ice rounded-xl p-4">{detail.description}</p>
              </div>
            )}

            {(detail.status === 'submitted' || detail.status === 'under_review') && (
              <div className="flex gap-3 pt-2">
                <Button variant="success" className="flex-1" onClick={() => handleApprove(detail)}>
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button variant="danger" className="flex-1" onClick={() => handleReject(detail)}>
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
