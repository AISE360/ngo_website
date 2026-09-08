import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { PROGRAMS } from '../../data/content'

export default function Programs() {
  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-8.jpg" height="min-h-[52vh]" speed={0.22}>
        <div className="container-lg px-6 py-20" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Our Work</p>
          <h1 className="font-display display-xl text-white max-w-3xl">Five field-first programs in Kondhwa</h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl">Hospitals, stitching halls, classrooms, a coding lab and art tables — this is where your donation works.</p>
        </div>
      </ParallaxBand>

      <section className="section">
        <div className="container-lg">
          <SectionHeading eyebrow="Programs" title="Pick a cause close to your heart" lead="Every program page has real photos, impact numbers and a dedicated support button." />
          <div className="grid md:grid-cols-2 gap-6">
            {PROGRAMS.map((p, i) => (
              <Link key={p.slug} to={`/programs/${p.slug}`} className="card overflow-hidden group grid sm:grid-cols-2" data-aos="fade-up" data-aos-delay={(i % 2) * 100}>
                <div className="h-56 sm:h-full overflow-hidden"><img src={p.hero} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                <div className="p-7 flex flex-col">
                  <h2 className="font-display text-2xl text-brand-tealDeep leading-tight">{p.title}</h2>
                  <p className="text-sm text-brand-slate mt-3 flex-1">{p.short}. {p.description.slice(0, 110)}…</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-coralDark mt-5">Open program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
