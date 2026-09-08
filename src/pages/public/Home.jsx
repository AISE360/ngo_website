import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, Users, MapPin, Sparkles, Stethoscope, Scissors, GraduationCap, Code2, Palette } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import CountUpModule from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Button } from '../../components/ui/Button'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { PROGRAMS, IMPACT_STATS, TESTIMONIALS, POSTS, ORG } from '../../data/content'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const CountUp = CountUpModule.default || CountUpModule

const U = (id, w = 1920) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

const HERO_SLIDES = [
  { img: U('photo-1576091160399-112ba8d25d1d'), kicker: 'Medical & Patient Support', title: 'Standing beside patients when it matters most', sub: 'Hospital visits, treatment aid and follow-up care in Kondhwa, Pune.' },
  { img: U('photo-1584992236310-6edddc08acff'), kicker: 'Women’s Livelihood', title: 'Stitching skills that become income', sub: 'Tailoring, block-printing & embroidery for women’s independence.' },
  { img: U('photo-1509062522246-3755977927d7'), kicker: 'Youth & Education', title: 'From classrooms to coding labs', sub: 'School outreach, computer skills and art for brighter tomorrows.' },
]

// High-quality homepage imagery (Unsplash). Real field photos live on /gallery + program pages.
const HOME_PROGRAM_IMAGES = {
  'medical-support': U('photo-1579684385127-1ef15d508118', 1200),
  'vocational-training': U('photo-1558769132-cb1aea458c5e', 1200),
  'school-outreach': U('photo-1427504494785-3a9ca7044f45', 1200),
  'tech-coding': U('photo-1517694712202-14dd9538aa97', 1200),
  'art-workshops': U('photo-1513364776144-60967b0f800f', 1200),
}

const HOME_GALLERY_PREVIEW = [
  U('photo-1593113598332-cd288d649433', 900),
  U('photo-1503676260728-1c00da094a0b', 900),
  U('photo-1531482615713-2afd69097998', 900),
  U('photo-1542810634-71277d95dcbb', 900),
  U('photo-1488521787991-ed7bbaae773c', 900),
  U('photo-1559027615-cd4628902d4a', 900),
]

const HOME_POST_IMAGES = [
  U('photo-1558769132-cb1aea458c5e', 900),
  U('photo-1497486751825-1233686d5d80', 900),
  U('photo-1576091160399-112ba8d25d1d', 900),
]

const ICONS = { medical: Stethoscope, livelihood: Scissors, education: GraduationCap, tech: Code2, art: Palette }

function Stat({ end, suffix, label, delay }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <div ref={ref} className="text-center" data-aos="fade-up" data-aos-delay={delay}>
      <div className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)' }}>
        {inView ? <CountUp end={end} duration={2.4} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="text-white/60 text-sm mt-1 max-w-[180px] mx-auto">{label}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-brand-cream">
      {/* ── HERO slider (Antara-style full-bleed) ── */}
      <section className="relative h-[86vh] min-h-[560px] overflow-hidden bg-brand-navy">
        <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" speed={900}
          autoplay={{ delay: 5200, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="h-full">
          {HERO_SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[86vh] min-h-[560px]">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/35 to-brand-navy/30" />
                <div className="absolute inset-0 flex items-end pb-28 md:pb-32">
                  <div className="container-lg px-6 w-full">
                    <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase text-brand-coralLight bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/15 mb-5">
                      <Sparkles className="w-3.5 h-3.5" /> {s.kicker}
                    </p>
                    <h1 className="font-display display-xl text-white max-w-3xl text-balance">{s.title}</h1>
                    <p className="text-white/70 text-lg mt-4 max-w-xl">{s.sub}</p>
                    <div className="flex flex-wrap gap-3 mt-8">
                      <Link to="/donate"><Button variant="coral" size="lg">Donate Now <ArrowRight className="w-4 h-4" /></Button></Link>
                      <Link to="/get-involved"><Button variant="outline-white" size="lg">Volunteer</Button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── Mission strip ── */}
      <section className="bg-white border-b border-brand-sandDark/60">
        <div className="container-lg px-6 py-10 text-center">
          <p className="font-display text-xl md:text-2xl text-brand-tealDeep leading-relaxed max-w-4xl mx-auto" data-aos="fade-up">
            <span className="text-brand-coralDark font-semibold">Thoughtful Hearts Foundation</span> delivers grassroots care at scale in Kondhwa, Pune —
            in hospitals, classrooms, labs and livelihood halls — <em>with the community, for the community.</em>
          </p>
          <p className="text-xs tracking-[0.22em] font-bold text-brand-slate/60 mt-4 uppercase" data-aos="fade-up" data-aos-delay="100">{ORG.tagline}</p>
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section className="bg-brand-tealDeep relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl" />
        <div className="container-lg px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {IMPACT_STATS.map((s, i) => <Stat key={i} {...s} delay={i * 100} />)}
        </div>
      </section>

      {/* ── Vision / Mission (Antara homage) ── */}
      <section className="section bg-white">
        <div className="container-lg grid md:grid-cols-2 gap-6">
          <div className="card !rounded-3xl p-8 md:p-10 bg-brand-cream !border-0" data-aos="fade-right">
            <p className="eyebrow">Our Vision</p>
            <h2 className="font-display display-md text-brand-tealDeep">Every family deserves an equal start to a healthy, skilled life.</h2>
            <p className="text-brand-slate mt-4">Health, learning and livelihood — without debt, without distance, without despair.</p>
          </div>
          <div className="card !rounded-3xl p-8 md:p-10 bg-brand-tealDeep !border-0" data-aos="fade-left">
            <p className="eyebrow eyebrow-light">Our Mission</p>
            <h2 className="font-display display-md text-white">To support patients, students, women & youth through hands-on programs.</h2>
            <p className="text-white/65 mt-4">Partnering with schools, hospitals and neighbourhood mentors in Kondhwa Khurd.</p>
          </div>
        </div>

        {/* Who / What / Where — Antara 3-card pattern */}
        <div className="container-lg grid md:grid-cols-3 gap-6 mt-6">
          {[
            { img: U('photo-1593113598332-cd288d649433', 900), tag: 'Who we are', text: 'A Kondhwa-based social service team of volunteers, mentors & field workers.', to: '/about' },
            { img: U('photo-1427504494785-3a9ca7044f45', 900), tag: 'What we do', text: '5 programs: medical aid, tailoring, schools, coding & art — all field-first.', to: '/programs' },
            { img: U('photo-1488521787991-ed7bbaae773c', 900), tag: 'Where we work', text: 'Shivneri Nagar–Kondhwa Khurd, partner schools & hospitals across Pune.', to: '/contact' },
          ].map((c, i) => (
            <Link key={i} to={c.to} className="card overflow-hidden group" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="h-52 overflow-hidden"><img src={c.img} alt={c.tag} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
              <div className="p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-coralDark">{c.tag}</p>
                <p className="text-brand-charcoal mt-2 leading-relaxed">{c.text}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal mt-4">Know More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Parallax 1 ── */}
      <ParallaxBand src={U('photo-1579684385127-1ef15d508118')} height="min-h-[62vh]" speed={0.24}>
        <div className="container-lg px-6 py-20 max-w-3xl" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Field diaries</p>
          <h2 className="font-display display-lg text-white text-balance">Care is a knock on the door, a visit to the ward, a follow-up call.</h2>
          <p className="text-white/70 mt-4 text-lg">See real field photos in our gallery — hospital visits and ration support for families in distress.</p>
          <Link to="/programs/medical-support" className="inline-block mt-7"><Button variant="white" size="lg">Support patients <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </ParallaxBand>

      {/* ── Programs grid ── */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <SectionHeading center eyebrow="Our Work" title="Five programs, one promise — show up" lead="Each program has its own page with photos, impact numbers and a dedicated donate button." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p, i) => {
              const Icon = ICONS[p.category] || Sparkles
              return (
                <Link key={p.slug} to={`/programs/${p.slug}`} className="card overflow-hidden group" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                  <div className="h-56 overflow-hidden relative">
                    <img src={HOME_PROGRAM_IMAGES[p.slug] || p.hero} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.16em] bg-white/92 backdrop-blur px-3 py-1.5 rounded-full text-brand-tealDeep">{p.short}</span>
                  </div>
                  <div className="p-6">
                    <span className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${p.color}18`, color: p.color }}><Icon className="w-5 h-5" /></span>
                    <h3 className="font-display text-xl text-brand-tealDeep leading-snug">{p.title}</h3>
                    <p className="text-sm text-brand-slate mt-2 line-clamp-2">{p.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-coralDark mt-4">Explore program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </Link>
              )
            })}
            {/* 6th tile: CTA */}
            <div className="card !bg-brand-coral p-8 flex flex-col justify-center !border-0" data-aos="fade-up" data-aos-delay="200">
              <HeartHandshake className="w-10 h-10 text-white/90 mb-4" />
              <h3 className="font-display text-2xl text-white">Not sure where to give?</h3>
              <p className="text-white/75 mt-2 text-sm">Give to the general fund — we route it to the most urgent case.</p>
              <Link to="/donate" className="mt-6"><Button variant="white" size="md" className="w-full">Donate to general fund</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parallax 2 ── */}
      <ParallaxBand src={U('photo-1556905055-8f358a7a47b2')} height="min-h-[58vh]" scrim="parallax-scrim-coral" speed={0.2}>
        <div className="container-lg px-6 py-20 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between" data-aos="fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light">Livelihoods</p>
            <h2 className="font-display display-lg text-white">A sewing machine can rewrite a household’s future.</h2>
          </div>
          <Link to="/programs/vocational-training"><Button variant="white" size="lg">See the tailoring unit</Button></Link>
        </div>
      </ParallaxBand>

      {/* ── Gallery preview ── */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10" data-aos="fade-up">
            <div><span className="eyebrow">Gallery</span><h2 className="font-display display-lg text-brand-tealDeep">Impact in high definition</h2></div>
            <Link to="/gallery"><Button variant="outline" size="md">Open real field photos <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {HOME_GALLERY_PREVIEW.map((src, i) => (
              <Link key={i} to="/gallery" className="img-frame aspect-[4/3]" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <img src={src} alt="field work" className="w-full h-full object-cover" loading="lazy" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section bg-brand-sand/60">
        <div className="container-md">
          <SectionHeading center eyebrow="Voices" title="What the neighbourhood says" />
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5500 }} pagination={{ clickable: true }} spaceBetween={20} className="pb-12">
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <figure className="card p-8 md:p-10 text-center !rounded-3xl">
                  <blockquote className="font-display text-xl md:text-2xl text-brand-tealDeep leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-6"><p className="font-bold text-sm">{t.name}</p><p className="text-xs text-brand-coralDark font-bold uppercase tracking-[0.18em] mt-1">{t.role}</p></figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── Donation CTA parallax ── */}
      <ParallaxBand src={U('photo-1559027615-cd4628902d4a')} height="min-h-[64vh]" speed={0.26}>
        <div className="container-md px-6 py-20 text-center" data-aos="fade-up">
          <p className="eyebrow eyebrow-light eyebrow-center justify-center">Support our work</p>
          <h2 className="font-display display-lg text-white">Your ₹500 can keep a patient, student or trainee going.</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[500, 1100, 2500, 5100].map((a) => (
              <Link key={a} to={`/donate?amount=${a}`} className="px-6 py-3 rounded-full bg-white/10 hover:bg-brand-coral border border-white/20 text-white font-bold text-sm transition-all hover:-translate-y-0.5">₹{a.toLocaleString('en-IN')}</Link>
            ))}
          </div>
          <Link to="/donate" className="inline-block mt-8"><Button variant="coral" size="lg">Donate now <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </ParallaxBand>

      {/* ── Updates ── */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10" data-aos="fade-up">
            <div><span className="eyebrow">Latest Updates</span><h2 className="font-display display-lg text-brand-tealDeep">Stories from the field</h2></div>
            <Link to="/blog"><Button variant="ghost" size="md">All updates <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map((p, i) => (
              <Link key={p.slug} to={`/blog#${p.slug}`} className="card overflow-hidden group" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="h-52 overflow-hidden"><img src={HOME_POST_IMAGES[i % HOME_POST_IMAGES.length]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coralDark">{p.tag} • {p.date}</p>
                  <h3 className="font-display text-lg text-brand-tealDeep mt-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-brand-slate mt-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Visit strip */}
          <div className="card mt-10 p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between !bg-brand-tealDeep !border-0" data-aos="fade-up">
            <div className="flex gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-brand-coralLight" /></span>
              <div><p className="text-white font-display text-lg">Visit us in Kondhwa, Pune</p><p className="text-white/60 text-sm">{ORG.address}</p></div>
            </div>
            <div className="flex gap-3">
              <Link to="/contact"><Button variant="white" size="md"><Users className="w-4 h-4" /> Plan a visit</Button></Link>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.mapsQuery)}`} target="_blank" rel="noreferrer"><Button variant="outline-white" size="md">Open map</Button></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
