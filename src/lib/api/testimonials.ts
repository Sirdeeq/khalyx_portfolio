import apiClient from './client'
import type { ApiResponse, TestimonialData } from './types'

export const testimonialsApi = {
  list: () =>
    apiClient.get<ApiResponse<TestimonialData[]>>('/testimonials').then((r) => r.data),
  get: (id: string) =>
    apiClient.get<ApiResponse<TestimonialData>>(`/testimonials/${id}`).then((r) => r.data),
  create: (data: Partial<TestimonialData>) =>
    apiClient.post<ApiResponse<TestimonialData>>('/testimonials', data).then((r) => r.data),
  update: (id: string, data: Partial<TestimonialData>) =>
    apiClient.put<ApiResponse<TestimonialData>>(`/testimonials/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/testimonials/${id}`).then((r) => r.data),
}
