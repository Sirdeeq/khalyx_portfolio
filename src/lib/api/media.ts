import apiClient from './client'
import type { ApiResponse, MediaData } from './types'

export const mediaApi = {
  get: () => apiClient.get<ApiResponse<MediaData>>('/media').then((r) => r.data),
  update: (data: Partial<MediaData>) => apiClient.put<ApiResponse<MediaData>>('/media', data).then((r) => r.data),
}
