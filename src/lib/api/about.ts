import apiClient from './client'
import type { ApiResponse, AboutData } from './types'

export const aboutApi = {
  get: () => apiClient.get<ApiResponse<AboutData>>('/about').then((r) => r.data),
  update: (data: Partial<AboutData>) => apiClient.put<ApiResponse<AboutData>>('/about', data).then((r) => r.data),
}
