interface IOrderProduct {
	id: number
	name: string
	price: number
	image?: string
	slug?: string
}

export interface IOrderItem {
	id: number
	orderId: number
	productId: number
	quantity: number
	unitPrice: number
	lineTotal: number
	product?: IOrderProduct
}

export interface IOrder {
	id: number
	reference?: string
	totalAmount: number
	status?: string
	paidAt?: string | Date
	createdAt?: string | Date
	updatedAt?: string | Date
	userId?: number
	items?: IOrderItem[]
}
