import { CaseSubmitForm } from '../../components/forms/CaseSubmitForm'
import { FileText, Clock, CheckCircle } from 'lucide-react'
import educationImg from '../../assets/hero_education.png'

const steps = [
  { icon: FileText,    title: 'Fill the Form',    desc: 'Provide beneficiary details and describe the case clearly.' },
  { icon: Clock,       title: '48-hr Review',     desc: 'Our committee reviews every submission and may request documents.' },
  { icon: CheckCircle, title: 'Decision & Aid',   desc: 'You will be notified via WhatsApp once a decision is made.' },
]

export default function SubmitCase() {
  return (
    <div className="bg-brand-cream">
      {/* Header with image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={educationImg} alt="Submit a case" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Submit a Case</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Anyone can request assistance. Our committee reviews every case with care and urgency.
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-lg max-w-5xl mx-auto">
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass-card p-5 flex gap-4 items-start cause-card-education">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <p className="font-semibold text-brand-green text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="glass-card p-8 max-w-2xl mx-auto cause-card-education">
            <div className="text-center mb-6">
              <p className="section-tag justify-center">Application Form</p>
              <h2 className="font-display text-xl font-bold text-brand-green">Case Submission</h2>
            </div>
            <CaseSubmitForm />
          </div>
        </div>
      </section>
    </div>
  )
}

