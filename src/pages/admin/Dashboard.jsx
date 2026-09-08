import { Users, HeartHandshake, DollarSign, Clock, RefreshCw, AlertCircle } from 'lucide-react'
import { StatCard } from '../../components/ui/StatCard'
import { Badge } from '../../components/ui/Badge'
import { useCases } from '../../hooks/useCases'
import { useDonations } from '../../hooks/useDonations'
import { useSponsors } from '../../hooks/useSponsors'
import { useMembers } from '../../hooks/useMembers'
import { formatINR } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

export default function Dashboard() {
  const { cases,    loading: lc,    error: ec,    refetch: refetchCases } = useCases()
  const { donations, loading: ld,   error: ed,    total,    refetch: refetchDons }  = useDonations({ status: 'success' })
  const { sponsors,  loading: ls,   error: es,    refetch: refetchSponsors } = useSponsors()
  const { members,   loading: lm,   error: em,    refetch: refetchMembers } = useMembers()

  const errors = [ec, ed, es, em].filter(Boolean)

  const pending  = cases.filter(c => c.status === 'submitted').length
  const active   = sponsors.filter(s => s.is_active).length
  const recent   = cases.slice(0, 8)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of all welfare activities</p>
      </div>

      {/* Error banner */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-700">Some data failed to load</p>
            <ul className="mt-1 text-xs text-red-600 space-y-0.5">
              {ec && <li>Cases: {ec}</li>}
              {ed && <li>Donations: {ed}</li>}
              {es && <li>Sponsors: {es}</li>}
              {em && <li>Members: {em}</li>}
            </ul>
          </div>
          <button
            onClick={() => { refetchCases(); refetchDons(); refetchSponsors(); refetchMembers(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-medium transition-colors flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry All
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Members"     value={lm ? '…' : members.length}  icon={Users}         color="navy"   loading={lm} />
        <StatCard title="Pending Cases"     value={lc ? '…' : pending}          icon={Clock}         color="orange" loading={lc} subtitle="Need review" />
        <StatCard title="Active Sponsors"   value={ls ? '…' : active}           icon={HeartHandshake} color="teal"  loading={ls} />
        <StatCard title="Total Donations"   value={ld ? '…' : formatINR(total, { compact: true })} icon={DollarSign} color="green" loading={ld} />
      </div>

      {/* Recent cases */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-navy">Recent Cases</h2>
          <span className="text-xs text-gray-400">{cases.length} total</span>
        </div>
        {lc ? (
          <div className="p-6 space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-10 w-full" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Beneficiary</th>
                  <th>Type</th>
                  <th>Amount Req.</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(c => (
                  <tr key={c.id}>
                    <td className="font-medium text-brand-navy">{c.beneficiaries?.full_name ?? '—'}</td>
                    <td><Badge label={c.case_type} /></td>
                    <td>{c.amount_requested ? formatINR(c.amount_requested) : '—'}</td>
                    <td><Badge label={c.status} /></td>
                    <td className="text-gray-400 text-xs">{formatDate(c.submitted_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent donations */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-navy">Recent Donations</h2>
          <Badge label="success" variant="success" />
        </div>
        {ld ? (
          <div className="p-6 space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-10 w-full" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.slice(0, 6).map(d => (
                  <tr key={d.id}>
                    <td className="font-medium text-brand-navy">{d.donor_name || 'Anonymous'}</td>
                    <td className="font-bold text-status-approved">{formatINR(d.amount)}</td>
                    <td><Badge label={d.purpose} /></td>
                    <td className="text-gray-400 text-xs">{formatDate(d.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
