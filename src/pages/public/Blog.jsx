import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { POSTS } from '../../data/content'

export default function Blog() {
  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-10.jpg" height="min-h-[44vh]" speed={0.2}>
        <div className="container-lg px-6 py-16" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Blog / Updates</p>
          <h1 className="font-display display-xl text-white">News & field notes</h1>
          <p className="text-white/70 mt-3">Event recaps, batch showcases, campaign updates. (CMS-lite: move to Supabase `blog_posts` when ready.)</p>
        </div>
      </ParallaxBand>
      <section className="section bg-white">
        <div className="container-lg">
          <SectionHeading eyebrow="All stories" title="Credibility, one update at a time" />
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map((p, i) => (
              <article key={p.slug} id={p.slug} className="card overflow-hidden scroll-mt-32" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="h-52 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coralDark">{p.tag} • {p.date}</p>
                  <h2 className="font-display text-xl text-brand-tealDeep mt-2 leading-snug">{p.title}</h2>
                  <p className="text-sm text-brand-slate mt-2">{p.excerpt}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal mt-4">Ask about this work <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
