import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsApi } from '../../../lib/api/projects'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function ProjectListPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: () => projectsApi.list({ limit: 50 }) })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectsApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['projects'] }); toast.success('Project deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed to delete'),
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Projects</h2>
        <Link to="/admin/projects/create">
          <Button size="sm">Add Project</Button>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-[#D7E2EA]/50">Loading...</p>
      ) : (
        <div className="space-y-4">
          {(data?.data ?? []).map((project) => (
            <div key={project._id} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#D7E2EA]/20">{project.num}</span>
                    <div>
                      <h3 className="text-[#D7E2EA] font-bold">{project.name}</h3>
                      <span className="text-[#D7E2EA]/50 text-xs uppercase tracking-wider">{project.category}</span>
                    </div>
                  </div>
                  <p className="text-[#D7E2EA]/60 text-sm mt-2">{project.features}</p>
                  <p className="text-[#D7E2EA]/40 text-xs mt-1">{project.role}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/admin/projects/edit/${project._id}`}>
                    <button className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                  </Link>
                  <button onClick={() => setDeleteId(project._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-[#D7E2EA]/30 text-center py-12">No projects yet</p>}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        message="Delete this project?"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}
