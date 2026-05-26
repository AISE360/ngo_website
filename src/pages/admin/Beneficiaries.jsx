import { useState } from 'react'
import { Search, Plus, Eye, GraduationCap, Heart, Gem } from 'lucide-react'
import { useBeneficiaries } from '../../hooks/useBeneficiaries'
import { Table } from '../../components/ui/Table'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const categoryIcons = { education: GraduationCap, health: Heart, marriage: Gem }

export default function Beneficiaries() {
  const [catFilter, setCatFilter] = useState(null)
  const [search,    setSearch]    = useState('')
  const [detail,    setDetail]    = useState(null)
  const { beneficiaries, loading, update } = useBeneficiaries(catFilter)

  const filtered = beneficiaries.filter(b =>
    b.full_name.toLowerCase().includes(search.toLowerCase())
  )

  async function changeStatus(id, status) {
    const { error } = await update(id, { status })
    error ? toast.error(error.message) : toast.success(`Status updated to ${status}`)
    setDetail(d => d ? { ...d, status } : null)
  }

  const columns = [
    {
      key: 'full_name', label: 'Name',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          {row.photo_url
            ? <img src={row.photo_url} alt={v} className="w-9 h-9 rounded-lg object-cover" />
            : <div className="w-9 h-9 rounded-lg bg-brand-ice flex items-center justify-center">
                {(() => { const I = categoryIcons[row.category] ?? GraduationCap; return <I className="w-4 h-4 text-brand-blue" /> })()}
              </div>
          }
          <span className="font-medium text-brand-navy">{v}</span>
        </div>
      )
    },
    { key: 'age',      label: 'Age' },
    { key: 'gender',   label: 'Gender' },
    { key: 'category', label: 'Category', render: v => <Badge label={v} /> },
    { key: 'status',   label: 'Status',   render: v => <Badge label={v} /> },
    { key: 'created_at', label: 'Added', render: v => format(new Date(v), 'dd MMM yyyy') },
    {
      key: 'id', label: 'View',
      render: (_, row) => (
        <button onClick={() => setDetail(row)} className="p-1.5 rounded-lg hover:bg-brand-ice text-gray-400 hover:text-brand-blue transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      )
    },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Beneficiaries</h1>
          <p className="text-gray-500 text-sm">All registered aid recipients</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {[null, 'education', 'health', 'marriage'].map(c => (
          <button
            key={c ?? 'all'}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              catFilter === c
                ? 'bg-brand-blue text-white'
                : 'bg-brand-ice text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c ?? 'All'}
          </button>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" placeholder="Search name…" />
      </div>

      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={filtered} loading={loading} emptyMessage="No beneficiaries found." />
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title="Beneficiary Profile" size="lg">
        {detail && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              {detail.photo_url
                ? <img src={detail.photo_url} alt={detail.full_name} className="w-20 h-20 rounded-2xl object-cover" />
                : <div className="w-20 h-20 rounded-2xl bg-brand-ice flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-brand-blue/30" />
                  </div>
              }
              <div>
                <h3 className="font-display text-xl font-bold text-brand-navy">{detail.full_name}</h3>
                <div className="flex gap-2 mt-1"><Badge label={detail.category} /><Badge label={detail.status} /></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Age', detail.age], ['Gender', detail.gender],
                ['Guardian', detail.guardian], ['Guardian Phone', detail.guardian_phone],
                ['Address', detail.address],
              ].map(([k, v], i) => (
                <div key={i} className={k === 'Address' ? 'col-span-2' : ''}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{k}</p>
                  <p className="font-medium text-brand-navy mt-0.5">{v || '—'}</p>
                </div>
              ))}
            </div>

            {detail.doc_urls?.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Documents</p>
                <div className="flex flex-wrap gap-2">
                  {detail.doc_urls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue underline">Doc {i + 1}</a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-wrap pt-2">
              {['pending','verified','active','rejected'].map(s => (
                <Button key={s} size="sm" variant={detail.status === s ? 'primary' : 'outline'}
                  onClick={() => changeStatus(detail.id, s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
