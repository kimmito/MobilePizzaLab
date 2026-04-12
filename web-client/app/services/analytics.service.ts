import { IAnalyticsData, IAnalyticsRequest } from '@/types/analytics.interface'

import { DEMO_MODE, getAnalyticsUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import { DEMO_ANALYTICS } from '@/mocks/demo.data'

export const AnalyticsService = {
	async getAnalytics(data: IAnalyticsRequest) {
		if (DEMO_MODE) {
			return {
				...DEMO_ANALYTICS,
				filters: {
					rangeDays: data.rangeDays ?? DEMO_ANALYTICS.filters.rangeDays,
					top: data.top ?? DEMO_ANALYTICS.filters.top,
					metric: data.metric ?? DEMO_ANALYTICS.filters.metric
				}
			}
		}

		return request<IAnalyticsData>({
			url: getAnalyticsUrl(''),
			method: 'POST',
			data
		})
	}
}
