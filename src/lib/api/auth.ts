import apiClient from './client'
import type { ApiResponse } from './types'

export interface LoginPayload {
  email: string
  password: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  isActive: boolean
}

export interface AuthData {
  user: User
  token: string
}

export const authApi = {
  login: (data: LoginPayload) =>
    apiClient.post<ApiResponse<AuthData>>('/auth/login', data).then((r) => r.data),
  getMe: () =>
    apiClient.get<ApiResponse<User>>('/auth/me').then((r) => r.data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.put<ApiResponse<null>>('/auth/change-password', data).then((r) => r.data),
}
