import apiClient from './client'
import type { ApiResponse, ServiceData } from './types'

export const servicesApi = {
  list: () => apiClient.get<ApiResponse<ServiceData[]>>('/services').then((r) => r.data),
  create: (data: Partial<ServiceData>) =>
    apiClient.post<ApiResponse<ServiceData>>('/services', data).then((r) => r.data),
  update: (id: string, data: Partial<ServiceData>) =>
    apiClient.put<ApiResponse<ServiceData>>(`/services/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/services/${id}`).then((r) => r.data),
}
