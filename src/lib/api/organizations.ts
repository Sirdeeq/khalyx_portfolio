import apiClient from './client'
import type { ApiResponse, OrganizationData } from './types'

export const organizationsApi = {
  list: () =>
    apiClient.get<ApiResponse<OrganizationData[]>>('/organizations').then((r) => r.data),
  get: (id: string) =>
    apiClient.get<ApiResponse<OrganizationData>>(`/organizations/${id}`).then((r) => r.data),
  create: (data: Partial<OrganizationData>) =>
    apiClient.post<ApiResponse<OrganizationData>>('/organizations', data).then((r) => r.data),
  update: (id: string, data: Partial<OrganizationData>) =>
    apiClient.put<ApiResponse<OrganizationData>>(`/organizations/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/organizations/${id}`).then((r) => r.data),
}
