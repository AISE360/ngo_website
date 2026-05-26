import { useState } from 'react'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMembers } from '../../hooks/useMembers'
import { Table } from '../../components/ui/Table'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { format } from 'date-fns'

const schema = z.object({
  full_name:       z.string().min(2, 'Name required'),
  phone:           z.string().optional(),
  whatsapp_group:  z.string().optional(),
  join_date:       z.string().optional(),
  notes:           z.string().optional(),
  is_active:       z.boolean().default(true),
})

export default function Members() {
  const { members, loading, create, update, remove } = useMembers()
  const [search, setSearch]   = useState('')
  const [modal,  setModal]    = useState(null) // null | 'add' | member-obj
  const [delId,  setDelId]    = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { is_active: true },
  })

  const filtered = members.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (m.phone ?? '').includes(search) ||
    (m.whatsapp_group ?? '').toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() { reset({ is_active: true }); setModal('add') }
  function openEdit(m) {
    reset({ ...m, join_date: m.join_date ?? '' })
    setModal(m)
  }

  async function onSubmit(data) {
    if (modal === 'add') {
      const { error } = await create(data)
      error ? toast.error(error.message) : toast.success('Member added!')
    } else {
      const { error } = await update(modal.id, data)
      error ? toast.error(error.message) : toast.success('Member updated!')
    }
    setModal(null)
  }

  async function confirmDelete() {
    const { error } = await remove(delId)
    error ? toast.error(error.message) : toast.success('Member removed')
    setDelId(null)
  }

  const columns = [
    { key: 'full_name', label: 'Name', render: v => <span className="font-medium text-brand-navy">{v}</span> },
    { key: 'phone',         label: 'Phone' },
    { key: 'whatsapp_group',label: 'WA Group' },
    { key: 'join_date',     label: 'Joined', render: v => v ? format(new Date(v), 'dd MMM yyyy') : '—' },
    { key: 'is_active', label: 'Status', render: v => <Badge label={v ? 'active' : 'inactive'} variant={v ? 'approved' : 'inactive'} /> },
    {
      key: 'id', label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-brand-ice text-gray-400 hover:text-brand-blue transition-colors"><Pencil className="w-4 h-4" /></button>
          <button onClick={() => setDelId(row.id)}  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    },
  ]

  const MemberForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">Full Name *</label>
          <input {...register('full_name')} className="input-field" placeholder="Mohammed Ali" />
          {errors.full_name && <p className="error-msg">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="label">Phone</label>
          <input {...register('phone')} className="input-field" type="tel" placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="label">WhatsApp Group</label>
          <input {...register('whatsapp_group')} className="input-field" placeholder="Group A" />
        </div>
        <div>
          <label className="label">Join Date</label>
          <input {...register('join_date')} className="input-field" type="date" />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" id="is_active_cb" {...register('is_active')} className="rounded" />
          <label htmlFor="is_active_cb" className="text-sm text-gray-600">Active Member</label>
        </div>
        <div className="col-span-2">
          <label className="label">Notes</label>
          <textarea {...register('notes')} className="input-field resize-none h-20" placeholder="Optional notes" />
        </div>
      </div>
      <Button type="submit" loading={isSubmitting} className="w-full">
        {modal === 'add' ? 'Add Member' : 'Save Changes'}
      </Button>
    </form>
  )

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Members</h1>
          <p className="text-gray-500 text-sm">Community roster — {members.length} members</p>
        </div>
        <Button onClick={openAdd} icon={<Plus className="w-4 h-4" />}>Add Member</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-9"
          placeholder="Search name, phone, group…"
        />
      </div>

      <div className="glass-card overflow-hidden">
        <Table columns={columns} data={filtered} loading={loading} emptyMessage="No members found." />
      </div>

      {/* Add/Edit modal */}
      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Member' : 'Edit Member'}
      >
        <MemberForm />
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!delId} onClose={() => setDelId(null)} title="Confirm Delete" size="sm">
        <p className="text-sm text-gray-600 mb-5">Are you sure you want to remove this member? This cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setDelId(null)}>Cancel</Button>
          <Button variant="danger" className="flex-1" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
