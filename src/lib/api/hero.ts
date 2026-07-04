import apiClient from './client'
import type { ApiResponse, HeroData } from './types'

export const heroApi = {
  get: () => apiClient.get<ApiResponse<HeroData>>('/hero').then((r) => r.data),
  update: (data: Partial<HeroData>) => apiClient.put<ApiResponse<HeroData>>('/hero', data).then((r) => r.data),
}
