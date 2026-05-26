import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Image, X, ZoomIn } from 'lucide-react'

export default function Gallery() {
  const [images,    setImages]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [lightbox,  setLightbox]  = useState(null)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.storage.from('ngo-assets').list('gallery', {
        limit: 50,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (!error && data) {
        const urls = data
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => ({
            name: f.name,
            url: supabase.storage.from('ngo-assets').getPublicUrl(`gallery/${f.name}`).data.publicUrl,
          }))
        setImages(urls)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <div className="bg-hero-gradient py-16 text-white text-center px-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Our Gallery</h1>
        <p className="text-blue-100 mt-4 max-w-xl mx-auto">
          Moments of impact — events, beneficiary visits, and community gatherings.
        </p>
      </div>

      <section className="section bg-brand-ice">
        <div className="container-lg">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="skeleton aspect-square rounded-xl" />)}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Image className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-sm">No gallery images yet. Upload to the <code className="bg-gray-100 px-1 rounded">ngo-assets/gallery/</code> bucket.</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map(({ name, url }, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer relative group shadow-card hover:shadow-card-hover transition-all"
                  onClick={() => setLightbox(url)}
                >
                  <img src={url} alt={name} className="w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </>
  )
}

