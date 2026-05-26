import { useState } from 'react'
import { Download } from 'lucide-react'
import { useDonations } from '../../hooks/useDonations'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { StatCard } from '../../components/ui/StatCard'
import { formatINR } from '../../utils/formatCurrency'
import { format } from 'date-fns'
import { DollarSign } from 'lucide-react'

const STATUS_OPTIONS = ['all', 'success', 'pending', 'failed']
const PURPOSE_OPTIONS = ['all', 'general', 'education', 'health', 'marriage', 'sponsor']

export default function Donations() {
  const [statusF,  setStatusF]  = useState('all')
  const [purposeF, setPurposeF] = useState('all')

  const { donations, loading, total, exportCSV } = useDonations({
    status:  statusF  !== 'all' ? statusF  : undefined,
    purpose: purposeF !== 'all' ? purposeF : undefined,
  })

  function downloadCSV() {
    const csv  = exportCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `donations_${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const columns = [
    { key: 'receipt_no',   label: 'Receipt',  render: v => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: 'donor_name',   label: 'Donor',    render: v => <span className="font-medium text-brand-navy">{v || 'Anonymous'}</span> },
    { key: 'donor_email',  label: 'Email',    render: v => <span className="text-xs text-gray-400">{v || '—'}</span> },
    { key: 'amount',       label: 'Amount',   render: v => <span className="font-bold text-status-approved">{formatINR(v)}</span> },
    { key: 'purpose',      label: 'Purpose',  render: v => <Badge label={v} /> },
    { key: 'payment_method', label: 'Method', render: v => <span className="text-xs text-gray-500 capitalize">{v || '—'}</span> },
    { key: 'status',       label: 'Status',   render: v => <Badge label={v} /> },
    { key: 'created_at',   label: 'Date',     render: v => format(new Date(v), 'dd MMM yy, HH:mm') },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Donations</h1>
          <p className="text-gray-500 text-sm">Transaction log</p>
        </div>
        <Button variant="outline" onClick={downloadCSV} icon={<Download className="w-4 h-4" />}>
          Export CSV
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Received" value={formatINR(total, { compact: true })} icon={DollarSign} color="green" loading={loading} />
        <StatCard title="Transactions"   value={donations.length} icon={DollarSign} color="blue"  loading={loading} />
        <StatCard title="Average Donation" value={donations.length ? formatINR(total / donations.length) : '₹0'} icon={DollarSign} color="navy" loading={loading} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          {STATUS_OPTIONS.map(s => (
            <button key={s} onClick={() => setStatusF(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${statusF === s ? 'bg-brand-blue text-white' : 'bg-brand-ice text-gray-600 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {PURPOSE_OPTIONS.map(p => (
            <button key={p} onClick={() => setPurposeF(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${purposeF === p ? 'bg-brand-blue text-white' : 'bg-brand-ice text-gray-600 hover:bg-gray-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={donations} loading={loading} emptyMessage="No donations found." />
      </div>
    </div>
  )
}
