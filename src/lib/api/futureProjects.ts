import apiClient from './client'
import type { ApiResponse, FutureProjectData } from './types'

export const futureProjectsApi = {
  list: () =>
    apiClient.get<ApiResponse<FutureProjectData[]>>('/future-projects').then((r) => r.data),
  get: (id: string) =>
    apiClient.get<ApiResponse<FutureProjectData>>(`/future-projects/${id}`).then((r) => r.data),
  create: (data: Partial<FutureProjectData>) =>
    apiClient.post<ApiResponse<FutureProjectData>>('/future-projects', data).then((r) => r.data),
  update: (id: string, data: Partial<FutureProjectData>) =>
    apiClient.put<ApiResponse<FutureProjectData>>(`/future-projects/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/future-projects/${id}`).then((r) => r.data),
}
