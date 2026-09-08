import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, HandHeart, Mail, Images, ArrowRight } from 'lucide-react'
import { StatCard } from '../../components/ui/StatCard'
import { Badge } from '../../components/ui/Badge'
import { supabase } from '../../lib/supabaseClient'
import { formatINR } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, donations: 0, volunteers: 0, messages: 0, programs: 0, gallery: 0 })
  const [recentDonations, setRecentDonations] = useState([])
  const [recentJoins, setRecentJoins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Dashboard query timed out (10s)')), 10000)
        )
        const [dons, vols, msgs, csr, progs, gal] = await Promise.race([
          Promise.all([
            supabase.from('donations').select('id,donor_name,amount,purpose,status,created_at').order('created_at', { ascending: false }).limit(8),
            supabase.from('volunteers').select('id').eq('status', 'new'),
            supabase.from('contact_messages').select('id').eq('status', 'new'),
            supabase.from('csr_inquiries').select('id').eq('status', 'new'),
            supabase.from('programs').select('id').eq('is_active', true),
            supabase.from('gallery').select('id').eq('is_active', true),
          ]),
          timeoutPromise
        ])
        const list = dons.data ?? []
        setRecentDonations(list)
        setStats({
          total: list.filter((d) => d.status === 'success').reduce((a, d) => a + Number(d.amount || 0), 0),
          donations: list.length,
          volunteers: (vols.data ?? []).length,
          messages: (msgs.data ?? []).length + (csr.data ?? []).length,
          programs: (progs.data ?? []).length,
          gallery: (gal.data ?? []).length,
        })
        const [vRecent, mRecent] = await Promise.race([
          Promise.all([
            supabase.from('volunteers').select('name,interest,created_at').order('created_at', { ascending: false }).limit(5),
            supabase.from('contact_messages').select('name,message,created_at').order('created_at', { ascending: false }).limit(5),
          ]),
          timeoutPromise
        ])
        setRecentJoins([
          ...(vRecent.data ?? []).map((v) => ({ who: v.name, what: `Volunteer • ${v.interest || 'general'}`, when: v.created_at })),
          ...(mRecent.data ?? []).map((m) => ({ who: m.name, what: 'Contact message', when: m.created_at })),
        ].sort((a, b) => new Date(b.when) - new Date(a.when)).slice(0, 6))
      } catch (err) {
        console.error('[Dashboard] load error:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Thoughtful Hearts Foundation — at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Donations (recent)" value={loading ? '…' : formatINR(stats.total, { compact: true })} icon={DollarSign} color="green" loading={loading} />
        <StatCard title="New Volunteers" value={loading ? '…' : stats.volunteers} icon={HandHeart} color="orange" loading={loading} subtitle="Need a callback" />
        <StatCard title="New Messages" value={loading ? '…' : stats.messages} icon={Mail} color="blue" loading={loading} subtitle="Contact + CSR" />
        <StatCard title="Gallery Photos" value={loading ? '…' : stats.gallery} icon={Images} color="teal" loading={loading} subtitle={`${stats.programs} live programs`} />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-navy">Recent Donations</h2>
          <Link to="/admin/donations" className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark flex items-center gap-1">All donations <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Donor</th><th>Amount</th><th>Purpose</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {recentDonations.map((d) => (
                <tr key={d.id}>
                  <td className="font-medium text-brand-navy">{d.donor_name || 'Anonymous'}</td>
                  <td className="font-bold text-status-approved">{formatINR(d.amount)}</td>
                  <td><Badge label={d.purpose} /></td>
                  <td><Badge label={d.status} /></td>
                  <td className="text-gray-400 text-xs">{formatDate(d.created_at)}</td>
                </tr>
              ))}
              {!loading && recentDonations.length === 0 && <tr><td colSpan={5} className="text-center text-gray-400 py-6">No donations yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-brand-navy">Latest People Activity</h2>
          <Link to="/admin/volunteers" className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark flex items-center gap-1">Volunteers <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <ul className="divide-y divide-gray-100">
          {recentJoins.map((j, i) => (
            <li key={i} className="px-6 py-3.5 flex items-center justify-between gap-4">
              <div><p className="font-medium text-brand-navy text-sm">{j.who}</p><p className="text-xs text-gray-400">{j.what}</p></div>
              <span className="text-xs text-gray-400 shrink-0">{formatDate(j.when)}</span>
            </li>
          ))}
          {!loading && recentJoins.length === 0 && <li className="px-6 py-6 text-center text-gray-400 text-sm">No volunteer/message activity yet.</li>}
        </ul>
      </div>
    </div>
  )
}
