import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '../../../lib/api/projects'
import ProjectForm from './ProjectForm'

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.get(id!),
    enabled: !!id,
  })

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>
  if (!data?.data) return <p className="text-[#D7E2EA]/50">Project not found</p>

  return <ProjectForm initialData={data.data} />
}
