import apiClient from './client'
import type { ApiResponse, PaginatedResponse, ContactMessageData } from './types'

export const contactApi = {
  send: (data: { name: string; email: string; phone?: string; reason: string; message: string }) =>
    apiClient.post<ApiResponse<ContactMessageData>>('/contact', data).then((r) => r.data),

  list: (params?: { page?: number; limit?: number; isRead?: boolean }) =>
    apiClient.get<PaginatedResponse<ContactMessageData>>('/contact', { params }).then((r) => r.data),

  markRead: (id: string) =>
    apiClient.patch<ApiResponse<ContactMessageData>>(`/contact/${id}/read`).then((r) => r.data),

  reply: (id: string, data: { reply: string }) =>
    apiClient.post<ApiResponse<ContactMessageData>>(`/contact/${id}/reply`, data).then((r) => r.data),
}
