import { Link } from 'react-router-dom'
import { ArrowRight, Stethoscope, Pill, Activity, Heart } from 'lucide-react'
import { useCases } from '../../hooks/useCases'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatINR } from '../../utils/formatCurrency'
import healthImg from '../../assets/ngo_health.png'

const covered = [
  { icon: Stethoscope, label: 'Hospitalization',  desc: 'Room, ICU, surgery costs' },
  { icon: Pill,        label: 'Medicines',         desc: 'Chronic & acute medication' },
  { icon: Activity,    label: 'Diagnostics',       desc: 'Scans, tests, lab reports' },
  { icon: Heart,       label: 'Post-care',         desc: 'Physiotherapy & follow-ups' },
]

export default function HealthFund() {
  const { cases, loading } = useCases('approved')
  const healthCases = cases.filter(c => c.case_type === 'health').slice(0, 6)

  const totalRaised = 2_45_000
  const totalNeeded = 5_00_000
  const progress    = Math.min((totalRaised / totalNeeded) * 100, 100)

  return (
    <div className="bg-brand-cream">
      {/* Header with real image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={healthImg} alt="Health fund" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/85" />
        <div className="relative z-10 container-lg px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-4">
            <Heart className="w-8 h-8 text-brand-gold fill-brand-gold/30" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Emergency Health Fund</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Because a medical crisis should never become a financial catastrophe for any family.
          </p>
        </div>
      </div>

      {/* Fund progress */}
      <section className="section bg-white">
        <div className="container-lg max-w-2xl mx-auto text-center">
          <p className="section-tag justify-center">Current Status</p>
          <h2 className="font-display text-2xl font-bold text-brand-green mb-2">Quarterly Fund Goal</h2>
          <p className="text-gray-500 text-sm mb-6">Updated monthly based on contributions and disbursements</p>
          <div className="glass-card p-8 border-t-4 border-brand-green">
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
              <span>Raised: <strong className="text-brand-green">{formatINR(totalRaised)}</strong></span>
              <span>Goal: <strong className="text-brand-green">{formatINR(totalNeeded)}</strong></span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 bg-brand-green rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{progress.toFixed(0)}% of quarterly goal reached</p>
            <Link to="/donate?purpose=health" className="mt-6 block">
              <Button className="w-full" size="lg">
                Donate to Health Fund <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="text-center mb-10">
            <p className="section-tag justify-center">Coverage</p>
            <h2 className="font-display text-2xl font-bold text-brand-green">What the Fund Covers</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {covered.map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="glass-card p-6 text-center hover:shadow-card-hover transition-all cause-card-health">
                <div className="w-12 h-12 rounded-xl bg-brand-mid/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-brand-mid" />
                </div>
                <p className="font-semibold text-brand-green text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent approved cases */}
      {!loading && healthCases.length > 0 && (
        <section className="section bg-white">
          <div className="container-lg">
            <p className="section-tag">Recent Work</p>
            <h2 className="font-display text-2xl font-bold text-brand-green mb-6">Recently Supported Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {healthCases.map(c => (
                <div key={c.id} className="glass-card p-5 cause-card-health">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-brand-green text-sm">{c.beneficiaries?.full_name ?? 'Beneficiary'}</h3>
                    <Badge label={c.status} />
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{c.description || 'Medical aid provided'}</p>
                  <p className="text-sm font-bold text-brand-green">{formatINR(c.amount_approved ?? c.amount_requested)} supported</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Submit CTA */}
      <section className="bg-brand-green py-16 px-4 text-center">
        <div className="container-lg max-w-xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Need Medical Assistance?</h2>
          <p className="text-green-200 text-sm mb-6">Submit a case and our committee will review it within 48 hours.</p>
          <Link to="/submit-case">
            <Button variant="gold" size="lg">Submit a Health Case <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

