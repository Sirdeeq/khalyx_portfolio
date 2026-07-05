import apiClient from './client'
import type { ApiResponse } from './types'

export interface UploadResult {
  url: string
  publicId: string
  originalName: string
  size: number
  mimetype: string
  type: 'image' | 'video'
  thumbnail: string
}

export const uploadApi = {
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const endpoint = file.type.startsWith('video/') ? '/upload/video' : '/upload'
    return apiClient.post<ApiResponse<UploadResult>>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData()
    files.forEach((f) => formData.append('files', f))
    return apiClient.post<ApiResponse<UploadResult[]>>('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
}
