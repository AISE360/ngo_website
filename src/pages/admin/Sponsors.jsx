import { useSponsors } from '../../hooks/useSponsors'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatINR } from '../../utils/formatCurrency'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export default function Sponsors() {
  const { sponsors, loading, toggleActive } = useSponsors()

  async function handleToggle(s) {
    const { error } = await toggleActive(s.id, s.is_active)
    error ? toast.error(error.message) : toast.success(s.is_active ? 'Sponsor deactivated' : 'Sponsor activated')
  }

  const columns = [
    { key: 'donor_name',  label: 'Donor', render: v => <span className="font-medium text-brand-navy">{v}</span> },
    { key: 'donor_email', label: 'Email' },
    { key: 'donor_phone', label: 'Phone' },
    {
      key: 'beneficiaries', label: 'Child',
      render: v => v ? <span className="text-brand-blue text-sm">{v.full_name}</span> : '—'
    },
    { key: 'amount_per_year', label: 'Amount/yr', render: v => v ? formatINR(v) : '—' },
    { key: 'start_date', label: 'Since', render: v => v ? format(new Date(v), 'MMM yyyy') : '—' },
    {
      key: 'is_active', label: 'Status',
      render: (v, row) => (
        <button onClick={() => handleToggle(row)}>
          <Badge label={v ? 'active' : 'inactive'} variant={v ? 'approved' : 'inactive'} className="cursor-pointer hover:opacity-80" />
        </button>
      )
    },
    { key: 'notes', label: 'Notes', render: v => <span className="text-xs text-gray-400 truncate max-w-[120px] block">{v || '—'}</span> },
  ]

  const active   = sponsors.filter(s => s.is_active).length
  const inactive = sponsors.length - active

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Sponsors</h1>
          <p className="text-gray-500 text-sm">{active} active · {inactive} inactive</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={sponsors} loading={loading} emptyMessage="No sponsors yet." />
      </div>
    </div>
  )
}
