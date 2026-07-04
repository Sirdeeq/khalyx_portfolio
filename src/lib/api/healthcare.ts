import apiClient from './client'
import type { ApiResponse, HealthcareData } from './types'

export const healthcareApi = {
  list: () => apiClient.get<ApiResponse<HealthcareData[]>>('/healthcare').then((r) => r.data),
  create: (data: Partial<HealthcareData>) =>
    apiClient.post<ApiResponse<HealthcareData>>('/healthcare', data).then((r) => r.data),
  update: (id: string, data: Partial<HealthcareData>) =>
    apiClient.put<ApiResponse<HealthcareData>>(`/healthcare/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/healthcare/${id}`).then((r) => r.data),
}
