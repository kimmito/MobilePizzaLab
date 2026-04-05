import { IOrder } from '@/types/order.interface'

import { getOrdersUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

type TypeData = {
	items: {
		quantity: number
		price: number
		productId: number
	}[]
}

export const OrderService = {
	async getAll() {
		return request<IOrder[]>({
			url: getOrdersUrl(''),
			method: 'GET'
		})
	},

	async getByUserId(id: number | undefined) {
		return request<IOrder[]>({
			url: getOrdersUrl(`/by-user/${id}`),
			method: 'GET'
		})
	},

	async place(data: TypeData) {
		return request<{ clientSecret: string }>({
			url: getOrdersUrl(''),
			method: 'POST',
			data
		})
	}
}
