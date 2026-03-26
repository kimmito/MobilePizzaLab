export interface IOrder {
	id: number
	reference: string
	totalAmount: number
	status?: string
	paidAt?: Date
	createdAt?: Date
	updatedAt?: Date
	userId?: number
	items?: any[]
}
