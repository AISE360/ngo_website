import { Target, Eye, Users, Award } from 'lucide-react'
import communityImg from '../../assets/ngo_community.png'
import heroBg from '../../assets/ngo_hero_main.png'

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To uplift underprivileged families through transparent, community-driven education, health, and welfare programmes.' },
  { icon: Eye,    title: 'Our Vision',  desc: 'A society where every child has access to education, every family has healthcare, and no one faces life events alone.' },
  { icon: Users,  title: 'Community',   desc: '165 active members from the Hyderabad region who contribute monthly and volunteer their time and skills.' },
  { icon: Award,  title: 'Since 2010',  desc: 'Over a decade of consistent service, building trust with donors and beneficiaries across Telangana.' },
]

const team = [
  { name: 'Mohammed Farooq', role: 'President',       initials: 'MF' },
  { name: 'Abdul Rahman',    role: 'Secretary',       initials: 'AR' },
  { name: 'Khalid Hussain',  role: 'Treasurer',       initials: 'KH' },
  { name: 'Naseema Begum',   role: 'Welfare Head',    initials: 'NB' },
  { name: 'Imran Sheikh',    role: 'Education Head',  initials: 'IS' },
  { name: 'Saba Fatima',     role: 'Health Co-ord.',  initials: 'SF' },
]

const milestones = [
  { year: '2010', text: 'Founded by 12 families with a ₹200/month collection' },
  { year: '2014', text: 'Grew to 50 member families, launched education programme' },
  { year: '2017', text: 'Health fund established after community medical emergencies' },
  { year: '2019', text: 'Marriage assistance programme launched with ₹51,000 per family' },
  { year: '2024', text: '165+ member families, 480+ children educated to date' },
]

export default function About() {
  return (
    <div className="bg-brand-cream">
      {/* Cinematic Header */}
      <div className="relative py-28 text-white overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 page-header-overlay" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A052 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center px-4" data-aos="fade-up">
          <span className="section-label justify-center text-brand-gold/70 before:bg-brand-gold/40">About Us</span>
          <h1 className="font-display display-xl text-white mt-2">Al-Huda Welfare Society</h1>
          <p className="font-body body-base text-white/60 mt-4 max-w-xl mx-auto font-light">
            A grassroots non-profit born from the belief that communities can lift each other up.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="card p-7 border-t-4 border-brand-gold/30 hover:border-brand-gold transition-colors" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-12 h-12 rounded-2xl bg-brand-green/8 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-green mb-2">{title}</h3>
                <p className="font-body body-sm text-brand-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + image */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7" data-aos="fade-right">
              <span className="section-label">Our journey</span>
              <h2 className="font-display display-lg text-brand-green mb-6">
                From 12 families to 165+ — a decade of service
              </h2>
              <div className="space-y-4 font-body body-base text-brand-slate">
                <p>Al-Huda Welfare Society was founded in 2010 by a group of 12 families in Hyderabad who noticed that community members were struggling with educational expenses, unexpected medical bills, and the financial burden of marriages.</p>
                <p>What started as an informal monthly collection of ₹200 per family has grown into a structured welfare organisation supporting 165 member families and hundreds of beneficiaries across Telangana.</p>
                <p>We operate on a <strong className="text-brand-green">zero-overhead model</strong> — every rupee collected goes directly to a beneficiary. Administrative costs are covered by voluntary contributions from founding members.</p>
              </div>
            </div>
            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="img-frame aspect-[3/4] shadow-elevated rounded-3xl">
                <img src={communityImg} alt="Community gathering" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-lg max-w-3xl">
          <div className="text-center mb-14" data-aos="fade-up">
            <span className="section-label justify-center">Milestones</span>
            <h2 className="font-display display-lg text-brand-green mt-2">Our Journey Through The Years</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-gold/40 via-brand-green/20 to-transparent hidden sm:block" />
            <div className="space-y-8">
              {milestones.map(({ year, text }, i) => (
                <div key={i} className="flex gap-6 items-start" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white font-display font-bold text-sm shadow-sm relative z-10">
                    {year.slice(2)}
                  </div>
                  <div className="card-flat p-5 flex-1">
                    <p className="font-body text-xs text-brand-gold font-semibold mb-1">{year}</p>
                    <p className="font-body body-sm text-brand-slate">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="text-center mb-12" data-aos="fade-up">
            <span className="section-label justify-center">Leadership</span>
            <h2 className="font-display display-lg text-brand-green mt-2">Management Committee</h2>
            <p className="font-body body-sm text-brand-slate mt-2">Elected annually by the 165-member community</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <div key={i} className="text-center group" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="w-16 h-16 rounded-2xl bg-brand-green mx-auto flex items-center justify-center text-white font-semibold text-lg mb-3 shadow-sm group-hover:bg-brand-gold group-hover:shadow-gold group-hover:-translate-y-1 transition-all duration-400">
                  {initials}
                </div>
                <p className="font-body font-semibold text-brand-green body-sm">{name}</p>
                <p className="font-body text-brand-slate/50 body-xs mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
