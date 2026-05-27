import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Heart, Gem, Users, HandHeart, BookOpen, Stethoscope } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { StatCard } from '../../components/ui/StatCard'

// Images
import heroBg          from '../../assets/ngo_hero_main.webp'
import educationImg    from '../../assets/hero_education.webp'
import healthImg       from '../../assets/ngo_health.webp'
import marriageImg     from '../../assets/ngo_marriage.webp'
import communityImg    from '../../assets/ngo_community.webp'
import donateImg       from '../../assets/ngo_donate.webp'
import sponsorImg      from '../../assets/ngo_sponsor.webp'

const stats = [
  { title: 'Community Members',  value: '165+',  subtitle: 'Registered families',      icon: Users,        color: 'navy' },
  { title: 'Children Educated',  value: '480+',  subtitle: 'Scholarships disbursed',   icon: GraduationCap,color: 'blue' },
  { title: 'Health Cases',       value: '320+',  subtitle: 'Medical aid provided',      icon: Heart,        color: 'teal' },
  { title: 'Marriage Fund',      value: '₹51K',  subtitle: 'Per eligible family',       icon: Gem,          color: 'purple' },
]

const testimonials = [
  {
    name: 'Aisha Begum',
    role: 'Mother, Beneficiary',
    text: 'My daughter received a full scholarship through Al-Huda. She is now in college — something I never thought possible for our family.',
    initials: 'AB',
  },
  {
    name: 'Mohammed Rafi',
    role: 'Community Member',
    text: 'When my father was hospitalised, Al-Huda covered the entire bill within 48 hours. They are a true blessing for our community.',
    initials: 'MR',
  },
  {
    name: 'Fatima Khatoon',
    role: 'Beneficiary',
    text: 'The marriage fund helped us celebrate our daughter\'s wedding with full dignity and without taking a single loan. Alhamdulillah.',
    initials: 'FK',
  },
]

export default function Home() {
  return (
    <div className="bg-brand-cream">

      {/* ══════════════════════════════════════
          HERO — full-bleed image + overlay
      ══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src={heroBg}
          alt="Al-Huda hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 container-lg px-4 sm:px-6 pt-8">
          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-brand-gold rounded-full" />
              <span className="text-brand-gold text-xs font-semibold tracking-wider uppercase">Serving Hyderabad since 2010</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 animate-slide-up">
              Guidance for Humanity,<br />
              <span className="text-brand-gold">Giving Without Limits</span>
            </h1>

            <p className="text-green-100 text-lg max-w-xl mb-8 leading-relaxed animate-slide-up animate-delay-100">
              Al-Huda Welfare Society supports 165+ families through education scholarships, 
              emergency health aid, and marriage assistance — because no family should face 
              life's hardships alone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-200">
              <Link to="/donate">
                <Button variant="gold" size="lg" className="shadow-gold">
                  Donate Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/sponsor">
                <Button variant="outline-white" size="lg">
                  Sponsor a Child
                </Button>
              </Link>
            </div>

            {/* Quick impact numbers inline */}
            <div className="flex flex-wrap gap-6 mt-10 animate-slide-up animate-delay-300">
              {[
                { n: '165+', l: 'Families' },
                { n: '480+', l: 'Children' },
                { n: '₹51K', l: 'Marriage Aid' },
                { n: '100%', l: 'Transparent' },
              ].map(({ n, l }) => (
                <div key={l} className="text-center">
                  <p className="text-brand-gold text-2xl font-bold font-display">{n}</p>
                  <p className="text-green-200 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════ */}
      <div className="bg-brand-gold py-3 overflow-hidden">
        <div className="flex gap-8 text-white text-sm font-semibold whitespace-nowrap animate-[marquee_25s_linear_infinite]"
          style={{ animation: 'marquee 25s linear infinite' }}>
          {[...Array(4)].flatMap(() => [
            '📚 Education Support', '❤️ Health Fund', '💍 Marriage Assistance',
            '🌱 Sponsor a Child', '🤝 Community Welfare', '🕌 Serving Hyderabad',
          ]).map((item, i) => (
            <span key={i} className="flex-shrink-0 mx-6">{item}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ══════════════════════════════════════
          THREE PILLARS (with images)
      ══════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-14">
            <p className="section-tag">What We Do</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green">
              Three Pillars of Our Mission
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-3 text-sm">
              Every rupee donated goes directly to one of our three core programmes — 
              transparently tracked and accountable to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Education */}
            <div className="group glass-card cause-card-education overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={educationImg} alt="Education support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-7">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Education Support</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  School fees, textbooks, uniforms, and exam costs for underprivileged children. 
                  Your ₹500/month can fund a child's full academic year.
                </p>
                <Link to="/education">
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Health */}
            <div className="group glass-card cause-card-health overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={healthImg} alt="Health fund" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-7">
                <div className="w-12 h-12 rounded-xl bg-brand-mid/10 flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-brand-mid" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Emergency Health Fund</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Hospitalisation, medicines, surgeries, and post-care covered for families 
                  facing sudden medical crises.
                </p>
                <Link to="/health">
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-brand-mid group-hover:text-white group-hover:border-brand-mid transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Marriage */}
            <div className="group glass-card cause-card-marriage overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <img src={marriageImg} alt="Marriage fund" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-7">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
                  <Gem className="w-6 h-6 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-green mb-2">Marriage Fund</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  ₹51,000 disbursed to eligible families — celebrating marriages with dignity 
                  and without taking on debt.
                </p>
                <Link to="/marriage-fund">
                  <Button variant="outline-gold" size="sm" className="w-full group-hover:bg-brand-gold group-hover:text-white transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT / COMMUNITY IMAGE SECTION
      ══════════════════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="group img-frame aspect-[4/3]">
              <img src={communityImg} alt="Al-Huda community gathering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
              <p className="section-tag">Our Story</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green mb-5">
                A Community Built on Compassion
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Al-Huda Welfare Society began in 2010 when 12 families in Hyderabad noticed 
                  their neighbours struggling with school fees, hospital bills, and marriage costs. 
                  What started as an informal monthly collection has grown into a structured 
                  organisation serving <strong className="text-brand-green">165+ member families.</strong>
                </p>
                <p>
                  We operate on a <strong className="text-brand-green">zero-overhead model</strong> — 
                  every rupee donated reaches a beneficiary. Administrative costs are borne 
                  voluntarily by our founding members.
                </p>
                <p>
                  <em className="text-brand-gold font-semibold">هدىٌ للإنسان .. عطاءٌ بلا حدود</em><br />
                  <span className="text-xs text-gray-400">Guidance for humanity, giving without limits.</span>
                </p>
              </div>
              <div className="mt-7 flex gap-4">
                <Link to="/about">
                  <Button size="md">Our Story <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="md">Get In Touch</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SPONSOR CTA — image + text side by side
      ══════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-card-hover">
            <div className="relative h-72 lg:h-auto min-h-[300px]">
              <img src={sponsorImg} alt="Sponsor a child" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-green/40" />
            </div>
            <div className="bg-brand-green p-10 flex flex-col justify-center">
              <p className="section-tag text-brand-gold">Make a Difference</p>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Sponsor a Child's Education
              </h2>
              <p className="text-green-200 text-sm leading-relaxed mb-6">
                Just ₹500 per month funds school fees, textbooks, and uniforms for one child 
                for an entire year. Track their progress. Change their future.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[500, 1000, 2000].map(a => (
                  <Link key={a} to={`/sponsor?amount=${a}`}>
                    <button className="px-4 py-2 bg-white/10 hover:bg-brand-gold border border-white/30 hover:border-brand-gold rounded-xl text-white text-sm font-semibold transition-all duration-200 btn-no-flash">
                      ₹{a}/mo
                    </button>
                  </Link>
                ))}
              </div>
              <Link to="/sponsor">
                <Button variant="gold" size="lg" className="self-start">
                  Sponsor Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DONATE CTA — full-width image banner
      ══════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <img src={donateImg} alt="Donate" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/85" />
        <div className="relative z-10 container-lg text-center text-white">
          <p className="section-tag text-brand-gold justify-center">Support Our Work</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Your Donation Changes a Life Today
          </h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            100% of your donation reaches the beneficiary. Zero deductions. 
            Instant receipt. Tax-deductible under 80G.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[500, 1000, 2500, 5000].map(amount => (
              <Link key={amount} to={`/donate?amount=${amount}`}>
                <button className="px-5 py-2.5 bg-white/15 hover:bg-brand-gold border border-white/30 hover:border-brand-gold rounded-xl text-white font-semibold text-sm transition-all duration-200 btn-no-flash">
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              </Link>
            ))}
          </div>
          <Link to="/donate">
            <Button variant="gold" size="lg" className="shadow-gold mx-auto">
              Donate Now <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="text-center mb-12">
            <p className="section-tag justify-center">Real Stories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green">
              Lives We've Touched
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, initials }, i) => (
              <div
                key={i}
                className="glass-card p-7 border-l-4 border-brand-gold hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-brand-gold text-4xl font-display mb-3 leading-none">"</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-green text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section className="bg-brand-green py-14 px-4">
        <div className="container-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: '165+',  l: 'Member Families',       icon: Users },
              { n: '480+',  l: 'Children Educated',      icon: BookOpen },
              { n: '320+',  l: 'Health Cases Supported', icon: Heart },
              { n: '100%',  l: 'Donations Reach Cause',  icon: HandHeart },
            ].map(({ n, l, icon: Icon }, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-brand-gold" />
                </div>
                <p className="font-display text-3xl font-bold text-white">{n}</p>
                <p className="text-green-300 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

