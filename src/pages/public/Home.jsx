import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Stethoscope, Gem, Users, BookOpen, Heart, HandHeart } from 'lucide-react'
import { Button } from '../../components/ui/Button'

import heroBg       from '../../assets/ngo_hero_main.png'
import educationImg from '../../assets/hero_education.png'
import healthImg    from '../../assets/ngo_health.png'
import marriageImg  from '../../assets/ngo_marriage.png'
import communityImg from '../../assets/ngo_community.png'
import donateImg    from '../../assets/ngo_donate.png'
import sponsorImg   from '../../assets/ngo_sponsor.png'

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

export default function Home() {
  return (
    <div className="bg-brand-cream">

      {/* ═══════════════════════════
          HERO
      ═══════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 container-lg px-6 pt-8">
          <div className="max-w-xl">
            <span className="eyebrow text-brand-gold/90">Hyderabad · Est. 2010</span>

            <h1 className="font-display font-semibold text-white display-xl mb-5">
              Guidance for humanity,<br />
              <em className="text-brand-gold not-italic">giving without limits.</em>
            </h1>

            <p className="font-body text-green-100 body-lg max-w-md mb-8 font-light">
              Al-Huda Welfare Society supports 165+ families through education
              scholarships, emergency health aid, and marriage assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
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
      </section>




      {/* ═══════════════════════════
          WHAT WE DO
      ═══════════════════════════ */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="mb-12">
            <span className="eyebrow">What we do</span>
            <h2 className="font-display display-lg text-brand-green">
              Three pillars of our mission
            </h2>
            <p className="font-body body-base text-gray-500 mt-3 max-w-lg">
              Every rupee donated goes directly to one of our three programmes — transparently
              tracked and accountable to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="group glass-card cause-card-education overflow-hidden hover:shadow-[0_8px_32px_rgba(26,71,49,0.14)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={educationImg} alt="Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <h3 className="font-display display-sm text-brand-green">Education</h3>
                </div>
                <p className="font-body body-sm text-gray-500 mb-5 leading-relaxed">
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

            <div className="group glass-card cause-card-health overflow-hidden hover:shadow-[0_8px_32px_rgba(26,71,49,0.14)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={healthImg} alt="Health" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Stethoscope className="w-5 h-5 text-brand-mid flex-shrink-0" />
                  <h3 className="font-display display-sm text-brand-green">Health Fund</h3>
                </div>
                <p className="font-body body-sm text-gray-500 mb-5 leading-relaxed">
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

            <div className="group glass-card cause-card-marriage overflow-hidden hover:shadow-[0_8px_32px_rgba(201,160,82,0.18)] transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={marriageImg} alt="Marriage fund" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Gem className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <h3 className="font-display display-sm text-brand-green">Marriage Fund</h3>
                </div>
                <p className="font-body body-sm text-gray-500 mb-5 leading-relaxed">
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
          ABOUT / COMMUNITY
      ═══════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className="img-frame aspect-[4/3] shadow-[0_4px_32px_rgba(26,71,49,0.1)]">
              <img src={communityImg} alt="Community gathering" className="w-full h-full object-cover" />
            </div>

            <div>
              <span className="eyebrow">Our story</span>
              <h2 className="font-display display-lg text-brand-green mb-5">
                A community built on<br />compassion since 2010
              </h2>
              <p className="font-body body-base text-gray-600 mb-4">
                Al-Huda Welfare Society began when 12 families in Hyderabad noticed
                their neighbours struggling with school fees, hospital bills, and
                wedding costs. What started as an informal monthly collection has grown
                into a structured organisation serving <strong className="text-brand-green font-semibold">165+ member families.</strong>
              </p>
              <p className="font-body body-base text-gray-600 mb-4">
                We operate on a <strong className="text-brand-green font-semibold">zero-overhead model</strong> — every rupee
                donated reaches a beneficiary. Administrative costs are borne
                voluntarily by our founding members.
              </p>
              <p className="font-body body-sm text-brand-gold italic mb-7">
                "هدىٌ للإنسان .. عطاءٌ بلا حدود"
                <span className="block text-gray-400 not-italic mt-0.5">Guidance for humanity, giving without limits.</span>
              </p>
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
          IMPACT NUMBERS
      ═══════════════════════════ */}
      <section className="bg-brand-green py-16 px-4">
        <div className="container-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: '165+',  l: 'Member families',        icon: Users },
              { n: '480+',  l: 'Children educated',       icon: BookOpen },
              { n: '320+',  l: 'Health cases supported',  icon: Heart },
              { n: '100%',  l: 'Donations reach beneficiary', icon: HandHeart },
            ].map(({ n, l, icon: Icon }, i) => (
              <div key={i}>
                <Icon className="w-5 h-5 text-brand-gold mx-auto mb-3 opacity-80" />
                <p className="font-display text-white font-semibold" style={{ fontSize: '2.4rem', lineHeight: 1.1 }}>{n}</p>
                <p className="font-body text-green-300 mt-1.5" style={{ fontSize: '0.8rem' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          SPONSOR SPLIT
      ═══════════════════════════ */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-[0_4px_40px_rgba(26,71,49,0.12)]">
            <div className="relative h-72 lg:h-auto min-h-[320px]">
              <img src={sponsorImg} alt="Sponsor a child" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-green/35" />
            </div>
            <div className="bg-brand-green px-8 py-12 flex flex-col justify-center">
              <span className="eyebrow text-brand-gold/90">Make a difference</span>
              <h2 className="font-display display-md text-white mb-4">
                Sponsor a child's education
              </h2>
              <p className="font-body body-base text-green-200 mb-6 font-light">
                Just ₹500 per month funds school fees, textbooks, and uniforms for
                one child for an entire year.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {[500, 1000, 2000].map(a => (
                  <Link key={a} to={`/sponsor?amount=${a}`}>
                    <button className="btn-no-flash px-4 py-2 bg-white/10 hover:bg-brand-gold border border-white/20 hover:border-brand-gold rounded-xl text-white font-body text-sm font-medium transition-all duration-200">
                      ₹{a}/mo
                    </button>
                  </Link>
                ))}
              </div>
              <Link to="/sponsor">
                <Button variant="gold" size="lg" className="self-start">
                  Sponsor now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          TESTIMONIALS
      ═══════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="mb-10">
            <span className="eyebrow">Real stories</span>
            <h2 className="font-display display-lg text-brand-green">Lives we've touched</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, initials }, i) => (
              <div key={i} className="glass-card p-7 border-l-4 border-brand-gold">
                <div className="quote-mark mb-1">"</div>
                <p className="font-body body-base text-gray-600 italic mb-6 mt-1">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-brand-green body-sm">{name}</p>
                    <p className="font-body text-gray-400 body-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════
          DONATE CTA
      ═══════════════════════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <img src={donateImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg max-w-2xl text-center text-white">
          <span className="eyebrow text-brand-gold/90 justify-center">Support our work</span>
          <h2 className="font-display display-lg text-white mb-4">
            Your donation changes a life today
          </h2>
          <p className="font-body body-base text-green-200 mb-8 font-light">
            100% of your donation reaches the beneficiary. Zero deductions.
            Instant receipt. Tax-deductible under 80G.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[500, 1000, 2500, 5000].map(amount => (
              <Link key={amount} to={`/donate?amount=${amount}`}>
                <button className="btn-no-flash px-5 py-2.5 bg-white/10 hover:bg-brand-gold border border-white/25 hover:border-brand-gold rounded-xl text-white font-body font-medium text-sm transition-all duration-200">
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              </Link>
            ))}
          </div>
          <Link to="/donate">
            <Button variant="gold" size="lg">
              Donate now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}

