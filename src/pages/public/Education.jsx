import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react'
import { useBeneficiaries } from '../../hooks/useBeneficiaries'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import educationImg from '../../assets/hero_education.webp'
import sponsorImg   from '../../assets/ngo_sponsor.webp'

export default function Education() {
  const { beneficiaries, loading } = useBeneficiaries('education')

  return (
    <div className="bg-brand-cream">
      {/* Cinematic Header */}
      <div className="relative py-28 text-white overflow-hidden">
        <img src={educationImg} alt="Education" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 page-header-overlay" />
        <div className="relative z-10 container-lg px-4 text-center" data-aos="fade-up">
          <span className="section-label justify-center text-brand-gold/70 before:bg-brand-gold/40">Education Programme</span>
          <h1 className="font-display display-xl text-white mt-2">Education Support</h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed font-light">
            Sponsoring bright minds who deserve a chance — from primary school to graduation.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8" data-aos="fade-up" data-aos-delay="200">
            {['School Fees', 'Textbooks', 'Uniforms', 'Stationery', 'Exam Fees'].map(t => (
              <span key={t} className="px-4 py-2 bg-white/8 border border-white/15 rounded-full text-xs text-white/80 font-medium backdrop-blur-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="img-frame aspect-[4/3] shadow-elevated rounded-3xl" data-aos="fade-right">
              <img src={sponsorImg} alt="Children studying" className="w-full h-full object-cover" />
            </div>
            <div data-aos="fade-left">
              <span className="section-label">How It Works</span>
              <h2 className="font-display display-md text-brand-green mb-8">Three Simple Steps to Sponsor</h2>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Choose a Child', desc: 'Browse verified profiles below and select a child whose story resonates with you.' },
                  { step: '02', title: 'Set Your Amount', desc: 'Contribute ₹500–₹2,000/month based on your capacity and the child\'s needs.' },
                  { step: '03', title: 'Track Progress',  desc: 'Receive annual progress reports and school results directly from our team.' },
                ].map(({ step, title, desc }, i) => (
                  <div key={i} className="flex gap-5 items-start group" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="w-12 h-12 rounded-2xl bg-brand-green/8 group-hover:bg-brand-green flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <span className="text-sm font-display font-bold text-brand-green group-hover:text-white transition-colors">{step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-green mb-1">{title}</h3>
                      <p className="text-sm text-brand-slate leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/sponsor" className="block mt-8">
                <Button size="lg">Sponsor a Child <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiary profiles from DB */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4" data-aos="fade-up">
            <div>
              <span className="section-label">Open Profiles</span>
              <h2 className="font-display display-md text-brand-green mt-2">Children Awaiting Sponsors</h2>
              <p className="text-brand-slate text-sm mt-2">Verified by our education committee</p>
            </div>
            <Link to="/sponsor">
              <Button>Sponsor a Child <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-72 rounded-2xl" />)}
            </div>
          ) : beneficiaries.length === 0 ? (
            <div className="text-center py-20 text-brand-slate/40" data-aos="fade-up">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No education beneficiaries added yet. Add them from the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficiaries.map((b, i) => (
                <div key={b.id} className="card overflow-hidden group cause-card-education" data-aos="fade-up" data-aos-delay={i * 80}>
                  {b.photo_url ? (
                    <img src={b.photo_url} alt={b.full_name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-48 bg-brand-green/5 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-brand-green/15" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-bold text-brand-green">{b.full_name}</h3>
                      <Badge label={b.status} />
                    </div>
                    <p className="text-sm text-brand-slate mb-4">Age {b.age} · {b.gender} · {b.address || 'Hyderabad'}</p>
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
