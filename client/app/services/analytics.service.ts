import { request } from '@/api/request.api'
import { getAnalyticsUrl } from '@/config/api.config'
import { IAnalyticsData, IAnalyticsRequest } from '@/types/analytics.interface'

export const AnalyticsService = {
  async getAnalytics(data: IAnalyticsRequest) {
    return request<IAnalyticsData>({
      url: getAnalyticsUrl(''),
      method: 'POST',
      data
    })
  }
}