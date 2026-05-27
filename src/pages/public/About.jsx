import { Target, Eye, Users, Award } from 'lucide-react'
import communityImg from '../../assets/ngo_community.webp'

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

export default function About() {
  return (
    <div className="bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-green py-16 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A052 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <p className="section-tag text-brand-gold justify-center">Who We Are</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">About Al-Huda Welfare Society</h1>
          <p className="text-green-200 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            A grassroots non-profit born from the belief that communities can lift each other up.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-card-hover transition-all animate-slide-up border-t-4 border-brand-gold" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-display font-bold text-brand-green mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + image */}
      <section className="section bg-brand-cream">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-tag">Our Journey</p>
              <h2 className="font-display text-3xl font-bold text-brand-green mb-5">
                From 12 Families to 165+ — A Decade of Service
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>Al-Huda Welfare Society was founded in 2010 by a group of 12 families in Hyderabad who noticed that community members were struggling with educational expenses, unexpected medical bills, and the financial burden of marriages.</p>
                <p>What started as an informal monthly collection of ₹200 per family has grown into a structured welfare organisation supporting 165 member families and hundreds of beneficiaries across Telangana.</p>
                <p>We operate on a <strong className="text-brand-green">zero-overhead model</strong> — every rupee collected goes directly to a beneficiary. Administrative costs are covered by voluntary contributions from founding members.</p>
                <p className="italic text-brand-gold font-semibold">"هدىٌ للإنسان .. عطاءٌ بلا حدود" — Guidance for humanity, giving without limits.</p>
              </div>
            </div>
            <div className="group img-frame aspect-[4/3]">
              <img src={communityImg} alt="Community gathering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <p className="section-tag justify-center">Leadership</p>
            <h2 className="font-display text-3xl font-bold text-brand-green">Management Committee</h2>
            <p className="text-gray-500 mt-2 text-sm">Elected annually by the 165-member community</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <div key={i} className="text-center animate-fade-in group" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-brand-green mx-auto flex items-center justify-center text-white font-bold text-lg mb-3 shadow-card group-hover:bg-brand-gold transition-colors duration-300">
                  {initials}
                </div>
                <p className="font-semibold text-brand-green text-sm">{name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

