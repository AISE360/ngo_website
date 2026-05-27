import { Link } from 'react-router-dom'
import { Gem, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { formatINR } from '../../utils/formatCurrency'
import marriageImg from '../../assets/ngo_marriage.webp'

const eligibilityYes = [
  'Must be a registered member for ≥ 1 year',
  'Daughter or sister of an active member',
  'Family income ≤ ₹3 lakh per year',
  'No outstanding dues to the fund',
  'First marriage only',
]

const eligibilityNo = [
  'Second marriages or re-marriages',
  'Families with annual income above ₹3 lakh',
  'Members with unpaid monthly contributions',
]

export default function MarriageFund() {
  return (
    <div className="bg-brand-cream">
      {/* Header with real image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={marriageImg} alt="Marriage fund" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-brand-gold/20 mb-4 border border-brand-gold/30">
            <Gem className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Marriage Fund</h1>
          <div className="inline-block bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/40 rounded-2xl px-10 py-5 mt-6">
            <p className="text-5xl font-display font-bold text-brand-gold">{formatINR(51000)}</p>
            <p className="text-green-200 text-sm mt-1">per eligible member family</p>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="section bg-white">
        <div className="container-lg max-w-3xl mx-auto text-center">
          <p className="section-tag justify-center">About This Fund</p>
          <h2 className="font-display text-2xl font-bold text-brand-green mb-4">Celebrate with Dignity, Not Debt</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our Marriage Assistance Fund provides ₹51,000 to eligible member families to help cover the costs of their daughters' or sisters' weddings. We believe marriages should be joyful celebrations — not sources of debt and stress.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section bg-brand-cream">
        <div className="container-lg max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-tag justify-center">Requirements</p>
            <h2 className="font-display text-2xl font-bold text-brand-green">Eligibility Criteria</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-7 cause-card-health">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-brand-mid" />
                <h3 className="font-semibold text-brand-green">Who Qualifies</h3>
              </div>
              <ul className="space-y-3">
                {eligibilityYes.map((e, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-brand-green font-bold mt-0.5 flex-shrink-0">✓</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-7 border-t-4 border-red-300">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-brand-green">Not Eligible</h3>
              </div>
              <ul className="space-y-3">
                {eligibilityNo.map((e, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="section bg-white">
        <div className="container-lg max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="section-tag justify-center">Process</p>
            <h2 className="font-display text-2xl font-bold text-brand-green">How to Apply</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Submit Application',  desc: 'File the marriage fund application with required documents at least 60 days before the wedding date.' },
              { step: '02', title: 'Committee Review',    desc: 'Our welfare committee verifies eligibility and documents within 2 weeks of submission.' },
              { step: '03', title: 'Disbursement',        desc: `${formatINR(51000)} is transferred directly to the family 15 days before the wedding.` },
            ].map(({ step, title, desc }, i) => (
              <div key={i} className="glass-card p-6 flex gap-5 items-start cause-card-marriage">
                <div className="text-3xl font-display font-bold text-brand-gold/30 flex-shrink-0 w-12">{step}</div>
                <div>
                  <h3 className="font-semibold text-brand-green mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/submit-case">
              <Button variant="gold" size="lg">Apply for Marriage Fund <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

