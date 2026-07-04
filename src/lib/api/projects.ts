import apiClient from './client'
import type { ApiResponse, PaginatedResponse, ProjectData } from './types'

export const projectsApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<ProjectData>>('/projects', { params }).then((r) => r.data),
  get: (id: string) =>
    apiClient.get<ApiResponse<ProjectData>>(`/projects/${id}`).then((r) => r.data),
  create: (data: Partial<ProjectData>) =>
    apiClient.post<ApiResponse<ProjectData>>('/projects', data).then((r) => r.data),
  update: (id: string, data: Partial<ProjectData>) =>
    apiClient.put<ApiResponse<ProjectData>>(`/projects/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/projects/${id}`).then((r) => r.data),
}
