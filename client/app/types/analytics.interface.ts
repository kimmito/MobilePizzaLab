export type TAnalyticsMetric = 'quantity' | 'revenue' | 'orders'

export interface IAnalyticsRequest {
	rangeDays?: number
	top?: number
	metric?: TAnalyticsMetric
}

export interface IRevenueByDayItem {
	date: string
	orders: number
	revenue: number
}

export interface IOrdersByStatusItem {
	status: 'PENDING' | 'PAID' | 'CANCELED'
	count: number
}

export interface IAnalyticsProductItem {
	productId: number
	name: string
	slug: string
	price: number
	image: string
	quantitySold: number
	revenue: number
	ordersCount: number
}

export interface IAnalyticsData {
	filters: {
		rangeDays: number
		top: number
		metric: TAnalyticsMetric
	}
	summary: {
		orders: number
		revenue: number
		averageCheck: number
	}
	charts: {
		revenueByDay: IRevenueByDayItem[]
		ordersByStatus: IOrdersByStatusItem[]
		topProducts: IAnalyticsProductItem[]
		worstProducts: IAnalyticsProductItem[]
	}
}
