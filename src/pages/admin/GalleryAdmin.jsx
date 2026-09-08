import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

const CATS = ['all', 'medical', 'livelihood', 'education', 'tech', 'art', 'community']

export default function GalleryAdmin() {
  const { rows, loading, error, update, create, remove, refetch } = useAdminTable('gallery', { orderBy: 'sort_order', ascending: true })
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ image_url: '', category: 'community', caption: '' })
  const [saving, setSaving] = useState(false)

  const list = rows.filter((r) => filter === 'all' || r.category === filter)

  async function add(e) {
    e.preventDefault()
    if (!form.image_url) return
    setSaving(true)
    const { error } = await create({ image_url: form.image_url, category: form.category, caption: form.caption || null, sort_order: rows.length })
    setSaving(false)
    if (error) toast.error(error.message)
    else { toast.success('Photo added'); setForm({ image_url: '', category: 'community', caption: '' }) }
  }

  async function toggle(row) {
    const { error } = await update(row.id, { is_active: !row.is_active })
    if (error) toast.error(error.message)
  }

  async function del(id) {
    if (!confirm('Delete this photo?')) return
    const { error } = await remove(id)
    if (error) toast.error(error.message)
    else toast.success('Deleted')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Gallery</h1>
        <p className="text-gray-500 text-sm">Category-tagged photos for /gallery ({rows.length})</p>
      </div>

      <form onSubmit={add} className="glass-card p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input className="input-field font-mono text-xs" placeholder="Image URL (/field/field-3.jpg …)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
        <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATS.filter((c) => c !== 'all').map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input-field" placeholder="Caption" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
        <Button type="submit" loading={saving} size="sm">+ Add photo</Button>
      </form>

      <div className="flex gap-1.5 flex-wrap">
        {CATS.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${filter === c ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
        ))}
        <button onClick={refetch} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600">↻ Refresh</button>
      </div>

      {loading && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <div key={i} className="skeleton aspect-[4/3]" />)}</div>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {list.map((g) => (
          <figure key={g.id} className={`card-flat overflow-hidden ${g.is_active ? '' : 'opacity-50'}`}>
            <div className="aspect-[4/3] bg-gray-100"><img src={g.image_url} alt={g.caption || ''} className="w-full h-full object-cover" loading="lazy" /></div>
            <figcaption className="p-3">
              <div className="flex items-center justify-between gap-2">
                <Badge label={g.category} />
                <Badge label={g.is_active ? 'live' : 'hidden'} />
              </div>
              <p className="text-xs text-gray-500 mt-1.5 truncate">{g.caption || '—'}</p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => toggle(g)} className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark">{g.is_active ? 'Hide' : 'Show'}</button>
                <button onClick={() => del(g.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {!loading && list.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No photos in this category.</p>}
    </div>
  )
}
