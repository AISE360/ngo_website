import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAdminTable } from '../../hooks/useAdminTable'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export default function BlogPosts() {
  const { rows, loading, error, update, create, remove, refetch } = useAdminTable('blog_posts')
  const [form, setForm] = useState({ slug: '', title: '', excerpt: '', tag: 'Update', cover_url: '' })

  async function add(e) {
    e.preventDefault()
    if (!form.slug || !form.title) return
    const { error } = await create({ ...form, published: false })
    if (error) toast.error(error.message)
    else { toast.success('Draft created — toggle Publish to go live'); setForm({ slug: '', title: '', excerpt: '', tag: 'Update', cover_url: '' }) }
  }

  async function toggle(row) {
    const patch = { published: !row.published, published_at: !row.published ? new Date().toISOString() : row.published_at }
    const { error } = await update(row.id, patch)
    if (error) toast.error(error.message)
  }

  async function del(id) {
    if (!confirm('Delete this post?')) return
    const { error } = await remove(id)
    if (error) toast.error(error.message)
    else toast.success('Deleted')
  }

  const columns = [
    { key: 'title', label: 'Post', render: (v, r) => <span><span className="font-medium text-brand-navy block text-sm">{v}</span><span className="text-xs text-gray-400 font-mono">{r.slug}</span></span> },
    { key: 'tag', label: 'Tag', render: (v) => <Badge label={v || 'update'} /> },
    { key: 'published', label: 'Status', render: (v) => <Badge label={v ? 'live' : 'draft'} /> },
    { key: 'id', label: '', render: (v, r) => (
      <span className="flex gap-3">
        <button onClick={() => toggle(r)} className="text-xs font-semibold text-brand-teal hover:text-brand-coralDark">{r.published ? 'Unpublish' : 'Publish'}</button>
        <button onClick={() => del(v)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
      </span>
    ) },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Blog / Updates</h1>
        <p className="text-gray-500 text-sm">Drafts stay hidden until published ({rows.length})</p>
      </div>
      <form onSubmit={add} className="glass-card p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <input className="input-field" placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input-field font-mono text-xs" placeholder="slug-like-this *" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <input className="input-field" placeholder="Tag (Medical / Education …)" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
        <input className="input-field lg:col-span-2" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <input className="input-field font-mono text-xs" placeholder="Cover image URL" value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} />
        <Button type="submit" size="sm" className="lg:col-span-3">+ New draft</Button>
      </form>
      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={rows} loading={loading} error={error} onRetry={refetch} emptyMessage="No posts yet." />
      </div>
    </div>
  )
}
