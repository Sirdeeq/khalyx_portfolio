import apiClient from './client'
import type { ApiResponse, PaginatedResponse, ContactMessageData } from './types'

export const contactApi = {
  list: (params?: { page?: number; limit?: number; isRead?: boolean }) =>
    apiClient.get<PaginatedResponse<ContactMessageData>>('/contact', { params }).then((r) => r.data),
  markRead: (id: string) =>
    apiClient.patch<ApiResponse<ContactMessageData>>(`/contact/${id}/read`).then((r) => r.data),
}
