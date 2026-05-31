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
      {/* Header */}
      <div className="bg-brand-green py-20 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A052 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <h1 className="font-display display-xl text-white">About Al-Huda Welfare Society</h1>
          <p className="font-body body-base text-green-200 mt-4 max-w-xl mx-auto font-light">
            A grassroots non-profit born from the belief that communities can lift each other up.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-[0_8px_32px_rgba(26,71,49,0.12)] transition-all border-t-4 border-brand-gold">
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="font-display display-sm text-brand-green mb-2">{title}</h3>
                <p className="font-body body-sm text-gray-500 leading-relaxed">{desc}</p>
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
              <span className="eyebrow">Our journey</span>
              <h2 className="font-display display-lg text-brand-green mb-5">
                From 12 families to 165+ — a decade of service
              </h2>
              <div className="space-y-4 font-body body-base text-gray-600">
                <p>Al-Huda Welfare Society was founded in 2010 by a group of 12 families in Hyderabad who noticed that community members were struggling with educational expenses, unexpected medical bills, and the financial burden of marriages.</p>
                <p>What started as an informal monthly collection of ₹200 per family has grown into a structured welfare organisation supporting 165 member families and hundreds of beneficiaries across Telangana.</p>
                <p>We operate on a <strong className="text-brand-green">zero-overhead model</strong> — every rupee collected goes directly to a beneficiary. Administrative costs are covered by voluntary contributions from founding members.</p>
                <p className="italic text-brand-gold font-semibold">"هدىٌ للإنسان .. عطاءٌ بلا حدود"
                  <span className="block font-body font-normal text-gray-400 not-italic mt-0.5 body-xs">Guidance for humanity, giving without limits.</span>
                </p>
              </div>
            </div>
            <div className="img-frame aspect-[4/3] shadow-[0_4px_32px_rgba(26,71,49,0.1)]">
              <img src={communityImg} alt="Community gathering" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="mb-10">
            <span className="eyebrow">Leadership</span>
            <h2 className="font-display display-lg text-brand-green">Management Committee</h2>
            <p className="font-body body-sm text-gray-400 mt-1">Elected annually by the 165-member community</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-brand-green mx-auto flex items-center justify-center text-white font-semibold text-base mb-3 shadow-sm group-hover:bg-brand-gold transition-colors duration-300">
                  {initials}
                </div>
                <p className="font-body font-semibold text-brand-green body-sm">{name}</p>
                <p className="font-body text-gray-400 body-xs mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
