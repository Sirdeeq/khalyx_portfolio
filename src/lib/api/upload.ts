import apiClient from './client'
import type { ApiResponse } from './types'

export interface UploadResult {
  url: string
  publicId: string
  originalName: string
  size: number
  mimetype: string
}

export const uploadApi = {
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return apiClient.post<ApiResponse<UploadResult>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData()
    files.forEach((f) => formData.append('images', f))
    return apiClient.post<ApiResponse<UploadResult[]>>('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
}
