import { useSearchParams, Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { useBeneficiaries } from '../../hooks/useBeneficiaries'
import { Badge } from '../../components/ui/Badge'
import { SponsorForm } from '../../components/forms/SponsorForm'
import sponsorImg from '../../assets/ngo_sponsor.webp'

export default function SponsorAChild() {
  const [params] = useSearchParams()
  const selectedId = params.get('child')
  const { beneficiaries, loading } = useBeneficiaries('education')

  const selected = beneficiaries.find(b => b.id === selectedId) || null

  return (
    <div className="bg-brand-cream">
      {/* Header with image */}
      <div className="relative py-16 text-white overflow-hidden">
        <img src={sponsorImg} alt="Sponsor a Child" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-green/88" />
        <div className="relative z-10 container-lg px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Sponsor a Child</h1>
          <p className="text-green-100 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Your monthly commitment can fund a full academic year for a deserving child.
          </p>
        </div>
      </div>

      <section className="section bg-brand-ice">
        <div className="container-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Child list */}
            <div>
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                Available Children {!loading && `(${beneficiaries.length})`}
              </h2>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {beneficiaries.map(b => (
                    <Link
                      key={b.id}
                      to={`/sponsor?child=${b.id}`}
                      className={`flex items-center gap-4 glass-card p-4 hover:shadow-card-hover transition-all cursor-pointer border-2 ${
                        selectedId === b.id ? 'border-brand-blue' : 'border-transparent'
                      }`}
                    >
                      {b.photo_url ? (
                        <img src={b.photo_url} alt={b.full_name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-cause-education/20 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-7 h-7 text-cause-education" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-navy text-sm">{b.full_name}</p>
                        <p className="text-xs text-gray-400">Age {b.age} · {b.gender}</p>
                      </div>
                      <Badge label={b.status} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sponsor form */}
            <div>
              <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
                {selected ? `Sponsor ${selected.full_name}` : 'Your Details'}
              </h2>
              <SponsorForm beneficiaryId={selected?.id} beneficiaryName={selected?.full_name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

