import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, HeartHandshake } from 'lucide-react'
import { PROGRAMS } from '../../data/content'
import { ParallaxBand } from '../../components/effects/Parallax'
import { Button } from '../../components/ui/Button'

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = PROGRAMS.find((p) => p.slug === slug)

  if (!program) {
    return (
      <div className="section text-center">
        <h1 className="font-display display-lg text-brand-tealDeep">Program not found</h1>
        <Link to="/programs" className="inline-block mt-6"><Button variant="coral">Back to programs</Button></Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-cream">
      <ParallaxBand src={program.hero} height="min-h-[56vh]" speed={0.22}>
        <div className="container-lg px-6 py-20" data-aos="fade-up">
          <Link to="/programs" className="text-white/60 text-sm hover:text-white">← All programs</Link>
          <h1 className="font-display display-xl text-white max-w-3xl mt-3">{program.title}</h1>
          <p className="text-white/75 text-lg mt-3 max-w-2xl">{program.short}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link to={`/donate?program=${program.slug}`}><Button variant="coral" size="lg"><HeartHandshake className="w-4 h-4" /> Support this program</Button></Link>
            <Link to="/gallery"><Button variant="outline-white" size="lg">See field photos</Button></Link>
          </div>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-lg grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2" data-aos="fade-up">
            <span className="eyebrow">About this program</span>
            <p className="text-lg text-brand-charcoal leading-relaxed">{program.description}</p>
            <ul className="mt-7 space-y-3">
              {program.points.map((pt, i) => (
                <li key={i} className="flex gap-3 items-start bg-brand-cream rounded-2xl px-5 py-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-coralDark shrink-0 mt-0.5" />
                  <span className="text-[15px]">{pt}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {program.stats.map((s, i) => (
                <div key={i} className="card p-5 text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-brand-tealDeep">{s.value}{s.suffix}</p>
                  <p className="text-xs text-brand-slate mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-brand-slate mt-4">* All impact metrics are audited and updated through our live dashboard.</p>
          </div>
          <aside className="space-y-5" data-aos="fade-left">
            <div className="card p-7 !bg-brand-tealDeep !border-0">
              <h3 className="font-display text-xl text-white">Support this program</h3>
              <p className="text-white/60 text-sm mt-2">100% routed to {program.title.toLowerCase()}. Receipt + 80G note (placeholder).</p>
              <Link to={`/donate?program=${program.slug}`} className="block mt-5"><Button variant="coral" className="w-full" size="lg">Donate <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/get-involved" className="block mt-3"><Button variant="outline-white" className="w-full">Volunteer here</Button></Link>
            </div>
            <div className="card p-6">
              <h4 className="font-bold text-sm uppercase tracking-[0.16em] text-brand-slate">Other programs</h4>
              <ul className="mt-3 space-y-2">
                {PROGRAMS.filter((p) => p.slug !== program.slug).map((p) => (
                  <li key={p.slug}><Link to={`/programs/${p.slug}`} className="text-sm font-semibold text-brand-teal hover:text-brand-coralDark">{p.title} →</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-brand-cream">
        <div className="container-lg">
          <h2 className="font-display display-md text-brand-tealDeep mb-8" data-aos="fade-up">From this program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {program.images.map((src, i) => (
              <div key={i} className="img-frame aspect-[4/3]" data-aos="fade-up" data-aos-delay={i * 100}>
                <img src={src} alt={program.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
