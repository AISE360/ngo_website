import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Heart, HandHeart } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import CountUpModule from 'react-countup'
const CountUp = CountUpModule.default || CountUpModule
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Typed from 'typed.js'
import 'swiper/css'
import 'swiper/css/pagination'

import heroBg       from '../../assets/ngo_hero_main.webp'
import educationImg from '../../assets/hero_education.webp'
import healthImg    from '../../assets/ngo_health.webp'
import marriageImg  from '../../assets/ngo_marriage.webp'
import communityImg from '../../assets/ngo_community.webp'
import donateImg    from '../../assets/ngo_donate.webp'
import sponsorImg   from '../../assets/ngo_sponsor.webp'

const testimonials = [
  {
    name: 'Aisha Begum',
    role: 'Mother — Education beneficiary',
    text: 'My daughter received a full scholarship through Al-Huda. She is now in college — something I never thought possible for our family.',
    initials: 'AB',
  },
  {
    name: 'Mohammed Rafi',
    role: 'Community member',
    text: 'When my father was hospitalised, Al-Huda covered the entire bill within 48 hours. They are a true blessing for our community.',
    initials: 'MR',
  },
  {
    name: 'Fatima Khatoon',
    role: 'Marriage fund recipient',
    text: 'The marriage fund helped us celebrate our daughter\'s wedding with full dignity and without taking a single loan. Alhamdulillah.',
    initials: 'FK',
  },
]

/* Animated stat counter */
function StatItem({ end, suffix = '', label, icon: Icon, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <div ref={ref} className="text-center" data-aos="fade-up" data-aos-delay={delay}>
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-5 h-5 text-brand-gold" />
      </div>
      <div className="font-display text-white font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
        {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <p className="font-body text-white/50 mt-2 text-sm">{label}</p>
    </div>
  )
}

export default function Home() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'giving without limits.',
        'building brighter futures.',
        'lifting communities.',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    })
    return () => typed.destroy()
  }, [])

  return (
    <div className="bg-brand-cream">

      {/* ═══════════════════════════
          HERO — Cinematic Parallax
      ═══════════════════════════ */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
        <div className="absolute inset-0 hero-overlay" />

        {/* Floating organic shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 container-lg px-6 pt-8">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs text-white/80 font-medium tracking-wide">Hyderabad · Serving since 2010</span>
            </div>

            <h1
              className="font-display font-bold text-white display-xl mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Guidance for humanity,<br />
              <span className="text-gradient-gold" ref={typedRef}></span>
            </h1>

            <p
              className="font-body text-white/70 body-lg max-w-lg mb-10 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Al-Huda Welfare Society supports 165+ families through education
              scholarships, emergency health aid, and marriage assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="500">
              <Link to="/donate">
                <Button variant="gold" size="lg">
                  Donate Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/sponsor">
                <Button variant="outline-white" size="lg">
                  Sponsor a Child
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
      </section>




      {/* ═══════════════════════════
          WHAT WE DO — Bento Grid
      ═══════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
            <span className="section-label justify-center">What we do</span>
            <h2 className="font-display display-lg text-brand-green mt-2">
              Three pillars of our mission
            </h2>
            <p className="font-body body-base text-brand-slate mt-4">
              Every rupee donated goes directly to one of our programmes — transparently
              tracked and accountable to the community.
            </p>
          </div>

          {/* Bento-style asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Education — Large card */}
            <div className="card overflow-hidden group lg:row-span-1" data-aos="fade-up" data-aos-delay="0">
              <div className="h-56 overflow-hidden relative">
                <img src={educationImg} alt="Education" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-brand-green/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Education
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Education Support</h3>
                <p className="font-body body-sm text-brand-slate mb-5 leading-relaxed">
                  School fees, textbooks, uniforms, and exam costs. ₹500/month sponsors
                  a child's full academic year.
                </p>
                <Link to="/education">
                  <Button variant="outline" size="sm" className="w-full">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Health */}
            <div className="card overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
              <div className="h-56 overflow-hidden relative">
                <img src={healthImg} alt="Health" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-brand-mid/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Health Fund
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Health Fund</h3>
                <p className="font-body body-sm text-brand-slate mb-5 leading-relaxed">
                  Hospitalisation, medicines, and surgery costs for families facing
                  sudden medical crises.
                </p>
                <Link to="/health">
                  <Button variant="outline" size="sm" className="w-full">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Marriage */}
            <div className="card overflow-hidden group" data-aos="fade-up" data-aos-delay="200">
              <div className="h-56 overflow-hidden relative">
                <img src={marriageImg} alt="Marriage fund" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Marriage Fund
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Marriage Fund</h3>
                <p className="font-body body-sm text-brand-slate mb-5 leading-relaxed">
                  ₹51,000 disbursed to eligible families — celebrating marriages
                  with dignity, not debt.
                </p>
                <Link to="/marriage-fund">
                  <Button variant="outline-gold" size="sm" className="w-full">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          ABOUT / COMMUNITY — Magazine Layout
      ═══════════════════════════ */}
      <section className="section bg-white relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1A4731 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-5 relative" data-aos="fade-right">
              <div className="img-frame aspect-[3/4] shadow-elevated rounded-3xl">
                <img src={communityImg} alt="Community gathering" className="w-full h-full object-cover" />
              </div>
              {/* Floating accent card */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 bg-brand-gold text-white p-5 rounded-2xl shadow-gold z-10" data-aos="scale-in" data-aos-delay="400">
                <p className="font-display text-3xl font-bold">15+</p>
                <p className="text-xs mt-1 text-white/80">Years of service</p>
              </div>
            </div>

            <div className="lg:col-span-7" data-aos="fade-left">
              <span className="section-label">Our story</span>
              <h2 className="font-display display-lg text-brand-green mb-6">
                A community built on<br />compassion since 2010
              </h2>
              <p className="font-body body-base text-brand-slate mb-4 leading-relaxed">
                Al-Huda Welfare Society began when 12 families in Hyderabad noticed
                their neighbours struggling with school fees, hospital bills, and
                wedding costs. What started as an informal monthly collection has grown
                into a structured organisation serving <strong className="text-brand-green font-semibold">165+ member families.</strong>
              </p>
              <p className="font-body body-base text-brand-slate mb-6 leading-relaxed">
                We operate on a <strong className="text-brand-green font-semibold">zero-overhead model</strong> — every rupee
                donated reaches a beneficiary. Administrative costs are borne
                voluntarily by our founding members.
              </p>

              <div className="flex items-center gap-4 mb-8 p-4 bg-brand-cream rounded-xl border border-brand-gold/10">
                <div className="w-1 h-12 bg-brand-gold rounded-full flex-shrink-0" />
                <div>
                  <p className="font-body text-brand-gold italic text-sm font-medium">
                    "هدىٌ للإنسان .. عطاءٌ بلا حدود"
                  </p>
                  <p className="text-brand-slate/60 text-xs mt-0.5">Guidance for humanity, giving without limits.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link to="/about">
                  <Button size="md">Our story <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="md">Get in touch</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          IMPACT NUMBERS — Animated CountUp
      ═══════════════════════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-brand-green" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(201,160,82,0.5) 0%, transparent 50%)' }} />

        <div className="container-lg relative z-10">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="section-label justify-center text-brand-gold/70 before:bg-brand-gold/40">Our impact</span>
            <h2 className="font-display display-md text-white mt-2">Numbers that tell our story</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem end={165} suffix="+"  label="Member families"          icon={Users}     delay={0} />
            <StatItem end={480} suffix="+"  label="Children educated"        icon={BookOpen}  delay={100} />
            <StatItem end={320} suffix="+"  label="Health cases supported"   icon={Heart}     delay={200} />
            <StatItem end={100} suffix="%"  label="Donations reach beneficiary" icon={HandHeart} delay={300} />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          SPONSOR SPLIT — Diagonal
      ═══════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-elevated"
            data-aos="fade-up"
          >
            <div className="relative h-72 lg:h-auto min-h-[360px] group">
              <img src={sponsorImg} alt="Sponsor a child" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-green/60 to-transparent" />
            </div>
            <div className="bg-brand-green px-8 lg:px-12 py-14 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full" />

              <span className="section-label text-brand-gold/80 before:bg-brand-gold/40">Make a difference</span>
              <h2 className="font-display display-md text-white mb-4 relative">
                Sponsor a child's education
              </h2>
              <p className="font-body body-base text-white/60 mb-8 font-light relative">
                Just ₹500 per month funds school fees, textbooks, and uniforms for
                one child for an entire year.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 relative">
                {[500, 1000, 2000].map(a => (
                  <Link key={a} to={`/sponsor?amount=${a}`}>
                    <button className="btn-no-flash px-5 py-2.5 bg-white/8 hover:bg-brand-gold border border-white/15 hover:border-brand-gold rounded-xl text-white font-body text-sm font-medium transition-all duration-300 hover:-translate-y-0.5">
                      ₹{a}/mo
                    </button>
                  </Link>
                ))}
              </div>
              <Link to="/sponsor" className="relative">
                <Button variant="gold" size="lg" className="self-start">
                  Sponsor now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          TESTIMONIALS — Swiper Carousel
      ═══════════════════════════ */}
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1A4731 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container-lg relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12" data-aos="fade-up">
            <div>
              <span className="section-label">Real stories</span>
              <h2 className="font-display display-lg text-brand-green mt-2">Lives we've touched</h2>
            </div>
            <p className="font-body text-brand-slate text-sm max-w-sm">
              Hear from the families and community members whose lives have been transformed.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
              className="pb-14"
            >
              {testimonials.map(({ name, role, text, initials }, i) => (
                <SwiperSlide key={i}>
                  <div className="card-flat p-7 h-full flex flex-col border-l-4 border-brand-gold/30 hover:border-brand-gold transition-colors duration-300">
                    <div className="mb-4">
                      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-brand-gold/20">
                        <path d="M0 24V14.4C0 6.4 5.6 1.6 12.8 0l1.6 3.2C8 5.6 6.4 9.6 6.4 12h5.6v12H0zm18 0V14.4C18 6.4 23.6 1.6 30.8 0l1.2 3.2C25.6 5.6 24.4 9.6 24.4 12H30v12H18z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="font-body body-base text-brand-slate italic mb-6 flex-1 leading-relaxed">{text}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-body font-semibold text-brand-green text-sm">{name}</p>
                        <p className="font-body text-brand-slate/50 text-xs">{role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-custom-pagination flex justify-center gap-2 mt-2" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          DONATE CTA — Cinematic
      ═══════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden">
        <img src={donateImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-green/90" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(201,160,82,0.6) 0%, transparent 50%)' }} />

        <div className="relative z-10 container-lg max-w-2xl text-center text-white">
          <span className="section-label justify-center text-brand-gold/70 before:bg-brand-gold/40" data-aos="fade-up">Support our work</span>
          <h2 className="font-display display-lg text-white mb-5 mt-2" data-aos="fade-up" data-aos-delay="100">
            Your donation changes<br />a life today
          </h2>
          <p className="font-body body-base text-white/60 mb-10 font-light" data-aos="fade-up" data-aos-delay="200">
            100% of your donation reaches the beneficiary. Zero deductions.
            Instant receipt. Tax-deductible under 80G.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="300">
            {[500, 1000, 2500, 5000].map(amount => (
              <Link key={amount} to={`/donate?amount=${amount}`}>
                <button className="btn-no-flash px-6 py-3 bg-white/8 hover:bg-brand-gold border border-white/15 hover:border-brand-gold rounded-xl text-white font-body font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold">
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              </Link>
            ))}
          </div>
          <div data-aos="fade-up" data-aos-delay="400">
            <Link to="/donate">
              <Button variant="gold" size="lg">
                Donate now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
