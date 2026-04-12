import { IOrder } from '@/types/order.interface'

import { DEMO_MODE, getOrdersUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import { DEMO_ORDERS } from '@/mocks/demo.data'

type TypeData = {
	items: {
		quantity: number
		price: number
		productId: number
	}[]
}

export const OrderService = {
	async getAll() {
		if (DEMO_MODE) return DEMO_ORDERS

		return request<IOrder[]>({
			url: getOrdersUrl(''),
			method: 'GET'
		})
	},

	async getByUserId() {
		if (DEMO_MODE) return DEMO_ORDERS

		return request<IOrder[]>({
			url: getOrdersUrl('/by-user'),
			method: 'GET'
		})
	},

	async place(data: TypeData) {
		if (DEMO_MODE) return { clientSecret: 'demo-client-secret' }

		return request<{ clientSecret: string }>({
			url: getOrdersUrl(''),
			method: 'POST',
			data
		})
	}
}
