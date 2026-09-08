import { useState } from 'react'
import { X } from 'lucide-react'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ParallaxBand } from '../../components/effects/Parallax'
import { GALLERY } from '../../data/content'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'medical', label: 'Medical' },
  { id: 'livelihood', label: 'Tailoring' },
  { id: 'education', label: 'Schools' },
  { id: 'tech', label: 'Coding' },
  { id: 'art', label: 'Art' },
  { id: 'community', label: 'Community' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const items = GALLERY.filter((g) => filter === 'all' || g.category === filter)

  return (
    <div className="bg-brand-cream">
      <ParallaxBand src="/field/field-14.jpg" height="min-h-[46vh]" speed={0.2}>
        <div className="container-lg px-6 py-16" data-aos="fade-up">
          <p className="eyebrow eyebrow-light">Gallery</p>
          <h1 className="font-display display-xl text-white">Real work, real photos</h1>
          <p className="text-white/70 mt-3 max-w-xl">Filter by program. Click any photo to view.</p>
        </div>
      </ParallaxBand>

      <section className="section bg-white">
        <div className="container-lg">
          <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up">
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${filter === f.id ? 'bg-brand-coral text-white shadow-coral' : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-sandDark/60'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <SectionHeading eyebrow={`${items.length} photos`} title={FILTERS.find((f) => f.id === filter)?.label + ' — field album'} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((g, i) => (
              <button key={i} onClick={() => setLightbox(g)} className="img-frame aspect-[4/3] text-left group" data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <img src={g.src} alt={g.caption} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-navy/85 to-transparent text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{g.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[80] bg-brand-navy/92 backdrop-blur flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[78vh] object-contain rounded-3xl" />
            <figcaption className="text-white/80 text-sm mt-4 flex justify-between items-center">
              <span>{lightbox.caption}</span>
              <button onClick={() => setLightbox(null)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-coral flex items-center justify-center" aria-label="Close"><X className="w-5 h-5" /></button>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
