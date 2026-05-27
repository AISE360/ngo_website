import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react'
import { useBeneficiaries } from '../../hooks/useBeneficiaries'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import educationImg from '../../assets/hero_education.webp'
import sponsorImg   from '../../assets/ngo_sponsor.webp'

export default function Education() {
  const { beneficiaries, loading } = useBeneficiaries('education')

  return (
    <div className="bg-brand-cream">
      {/* Header with real image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={educationImg} alt="Education" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/85" />
        <div className="relative z-10 container-lg px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-4">
            <GraduationCap className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Education Support Programme</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Sponsoring bright minds who deserve a chance — from primary school to graduation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['School Fees', 'Textbooks', 'Uniforms', 'Stationery', 'Exam Fees'].map(t => (
              <span key={t} className="px-3 py-1.5 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-xs text-brand-gold font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* How it works + sponsor side section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="group img-frame aspect-[4/3]">
              <img src={sponsorImg} alt="Children studying" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
              <p className="section-tag">How It Works</p>
              <h2 className="font-display text-2xl font-bold text-brand-green mb-6">Three Simple Steps to Sponsor</h2>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Choose a Child', desc: 'Browse verified profiles below and select a child whose story resonates with you.' },
                  { step: '02', title: 'Set Your Amount', desc: 'Contribute ₹500–₹2,000/month based on your capacity and the child\'s needs.' },
                  { step: '03', title: 'Track Progress',  desc: 'Receive annual progress reports and school results directly from our team.' },
                ].map(({ step, title, desc }, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="text-2xl font-display font-bold text-brand-gold/40 w-10 flex-shrink-0">{step}</div>
                    <div>
                      <h3 className="font-semibold text-brand-green mb-1">{title}</h3>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/sponsor" className="block mt-7">
                <Button size="lg">Sponsor a Child <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiary profiles from DB */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="section-tag">Open Profiles</p>
              <h2 className="font-display text-2xl font-bold text-brand-green">Children Awaiting Sponsors</h2>
              <p className="text-gray-500 text-sm mt-1">Verified by our education committee</p>
            </div>
            <Link to="/sponsor">
              <Button>Sponsor a Child <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
            </div>
          ) : beneficiaries.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No education beneficiaries added yet. Add them from the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficiaries.map(b => (
                <div key={b.id} className="glass-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cause-card-education group">
                  {b.photo_url ? (
                    <img src={b.photo_url} alt={b.full_name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-48 bg-brand-green/5 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-brand-green/20" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-bold text-brand-green">{b.full_name}</h3>
                      <Badge label={b.status} />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Age {b.age} · {b.gender} · {b.address || 'Hyderabad'}</p>
                    <Link to={`/sponsor?child=${b.id}`}>
                      <Button size="sm" className="w-full">Sponsor This Child</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

