import apiClient from './client'
import type { ApiResponse, TechStackData } from './types'

export const techStackApi = {
  list: () => apiClient.get<ApiResponse<TechStackData[]>>('/tech-stack').then((r) => r.data),
  create: (data: Partial<TechStackData>) =>
    apiClient.post<ApiResponse<TechStackData>>('/tech-stack', data).then((r) => r.data),
  update: (id: string, data: Partial<TechStackData>) =>
    apiClient.put<ApiResponse<TechStackData>>(`/tech-stack/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/tech-stack/${id}`).then((r) => r.data),
}
