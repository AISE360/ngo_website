export function SectionHeading({ eyebrow, title, lead, center = false, light = false }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`} data-aos="fade-up">
      {eyebrow && (
        <span className={`eyebrow ${center ? 'eyebrow-center justify-center' : ''} ${light ? 'eyebrow-light' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display display-lg text-balance ${light ? 'text-white' : 'text-brand-tealDeep'}`}>{title}</h2>
      {lead && <p className={`mt-4 text-[1.05rem] leading-relaxed ${light ? 'text-white/70' : 'text-brand-slate'}`}>{lead}</p>}
    </div>
  )
}
