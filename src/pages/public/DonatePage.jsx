import { useSearchParams } from 'react-router-dom'
import { Shield, Smartphone, CheckCircle } from 'lucide-react'
import { DonationForm } from '../../components/forms/DonationForm'
import donateImg from '../../assets/ngo_donate.png'

const presets = [500, 1000, 2500, 5000, 10000]

export default function DonatePage() {
  const [params] = useSearchParams()
  const defaultAmount  = params.get('amount') ? Number(params.get('amount')) : 1000
  const defaultPurpose = params.get('purpose') ?? 'general'

  return (
    <div className="bg-brand-cream">
      {/* Header with image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={donateImg} alt="Donate" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Make a Donation</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm">
            Every rupee reaches the beneficiary. Safe, transparent, and tax-deductible under 80G.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { icon: Shield,      label: '100% Secure' },
              { icon: Smartphone,  label: 'UPI / Card / Net Banking' },
              { icon: CheckCircle, label: 'Instant Receipt' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-green-100">
                <Icon className="w-3.5 h-3.5 text-brand-gold" /> {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section bg-brand-cream">
        <div className="container-lg max-w-lg mx-auto">
          <div className="glass-card p-8 cause-card-education">
            <div className="text-center mb-6">
              <p className="section-tag justify-center">Support Our Work</p>
              <h2 className="font-display text-xl font-bold text-brand-green">Choose an Amount</h2>
            </div>
            <DonationForm defaultAmount={defaultAmount} defaultPurpose={defaultPurpose} presets={presets} />
          </div>

          {/* UPI direct */}
          <div className="glass-card p-6 mt-6 text-center cause-card-marriage">
            <p className="text-sm font-semibold text-brand-green mb-1">Direct UPI Transfer</p>
            <p className="text-xl font-bold text-brand-gold tracking-wider font-mono">alhuda@upi</p>
            <p className="text-xs text-gray-400 mt-2">Send to this UPI ID and WhatsApp the screenshot to confirm</p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs text-brand-green hover:text-brand-mid underline transition-colors"
            >
              Send screenshot on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

