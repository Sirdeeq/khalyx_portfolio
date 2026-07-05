import apiClient from './client'
import type { ApiResponse, PaginatedResponse, BlogData } from './types'

export const blogApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<BlogData>>('/blog', { params }).then((r) => r.data),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<BlogData>>(`/blog/slug/${slug}`).then((r) => r.data),
  get: (id: string) =>
    apiClient.get<ApiResponse<BlogData>>(`/blog/${id}`).then((r) => r.data),
  create: (data: Partial<BlogData>) =>
    apiClient.post<ApiResponse<BlogData>>('/blog', data).then((r) => r.data),
  update: (id: string, data: Partial<BlogData>) =>
    apiClient.put<ApiResponse<BlogData>>(`/blog/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/blog/${id}`).then((r) => r.data),
}
