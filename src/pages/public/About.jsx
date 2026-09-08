import { Link } from 'react-router-dom'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { ORG } from '../../data/content'

export default function About() {
  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-12.jpg" height="min-h-[52vh]" speed={0.22}>
        <div className="container-lg px-6 py-20" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">About Us</p>
          <h1 className="font-display display-xl text-white max-w-3xl">Rooted in Kondhwa, driven by compassion</h1>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-lg grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <SectionHeading eyebrow="Founding story" title="Started with visits. Grew with trust." />
            <p className="text-brand-charcoal/85 leading-relaxed">Thoughtful Hearts Foundation began the way grassroots work always begins — showing up. A hospital visit here, a classroom session there, a sewing machine repaired for a women’s batch, a ration kit for a family waiting on a discharge summary.</p>
            <p className="text-brand-charcoal/85 leading-relaxed mt-4">Today we run five steady programs from Kondhwa Khurd: <b>medical & patient support, women’s tailoring livelihoods, school outreach, a tech & coding lab, and art workshops</b> — all photographed, all field-first, all volunteer-powered.</p>
            <div className="flex gap-3 mt-7">
              <Link to="/programs"><Button variant="coral">Explore programs <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/get-involved"><Button variant="outline">Volunteer</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
            {['/field/field-5.jpg', '/field/field-1.jpg', '/field/field-13.jpg', '/field/field-14.jpg'].map((s, i) => (
              <div key={i} className={`img-frame ${i % 2 ? 'mt-8' : ''} aspect-[3/4]`}><img src={s} alt="work" className="w-full h-full object-cover" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-cream">
        <div className="container-lg">
          <SectionHeading center eyebrow="Leadership" title="Community-led, volunteer-run" lead="Placeholder cards — replace with real trustee / core-team names, photos and roles before launch." />
          <div className="grid sm:grid-cols-3 gap-6">
            {['Founder & Managing Trustee', 'Program Lead — Livelihoods', 'Program Lead — Education & Tech'].map((role, i) => (
              <div key={i} className="card p-8 text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-20 h-20 rounded-full bg-brand-tealSoft mx-auto mb-4 flex items-center justify-center font-display font-bold text-2xl text-brand-tealDeep">TH</div>
                <p className="font-bold">[ Name ]</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-coralDark mt-1">{role}</p>
              </div>
            ))}
          </div>

          <div className="card mt-10 p-7 md:p-9 grid md:grid-cols-3 gap-6" data-aos="fade-up">
            <div><h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate mb-2">Registration</h4><p className="text-sm">[ Trust / Society / Section 8 No. — editable placeholder ]</p></div>
            <div><h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate mb-2">80G / 12A</h4><p className="text-sm">[ 80G & 12A status — editable placeholder ]</p></div>
            <div><h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-slate mb-2">Visit</h4><p className="text-sm flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-coralDark" />{ORG.address}</p><p className="text-sm flex gap-2 mt-2"><Clock className="w-4 h-4 mt-0.5 shrink-0 text-brand-coralDark" />{ORG.hoursNote}</p></div>
          </div>
        </div>
      </section>
    </div>
  )
}
