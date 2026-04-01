import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { AnalyticsService } from '@/services/analytics.service'
import { TAnalyticsMetric } from '@/types/analytics.interface'

type UseAnalyticsOptions = {
	enabled?: boolean
	initialRangeDays?: number
	initialMetric?: TAnalyticsMetric
	initialTop?: number
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
	const {
		enabled = true,
		initialRangeDays = 30,
		initialMetric = 'quantity',
		initialTop = 5
	} = options

	const [rangeDays, setRangeDays] = useState(initialRangeDays)
	const [metric, setMetric] = useState<TAnalyticsMetric>(initialMetric)
	const [top, setTop] = useState(initialTop)

	const queryKey = useMemo(
		() => ['admin analytics', rangeDays, metric, top],
		[rangeDays, metric, top]
	)

	const query = useQuery({
		queryKey,
		queryFn: () => AnalyticsService.getAnalytics({ rangeDays, metric, top }),
		enabled
	})

	return {
		...query,
		filters: {
			rangeDays,
			metric,
			top
		},
		setRangeDays,
		setMetric,
		setTop
	}
}