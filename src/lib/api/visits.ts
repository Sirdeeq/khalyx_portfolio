import apiClient from './client'

export const visitsApi = {
  track: () =>
    apiClient.post('/visits/track').then((r) => r.data).catch(() => {}),
  stats: () =>
    apiClient.get<{ success: boolean; data: { totalVisits: number; todayVisits: number; weekVisits: number; daily: Array<{ date: string; count: number }> } }>('/visits/stats').then((r) => r.data),
}
