import apiClient from './client'
import type { ApiResponse, PaginatedResponse, GalleryData } from './types'

export const galleryApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<GalleryData>>('/gallery', { params }).then((r) => r.data),
  create: (data: Partial<GalleryData>) =>
    apiClient.post<ApiResponse<GalleryData>>('/gallery', data).then((r) => r.data),
  update: (id: string, data: Partial<GalleryData>) =>
    apiClient.put<ApiResponse<GalleryData>>(`/gallery/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/gallery/${id}`).then((r) => r.data),
}
