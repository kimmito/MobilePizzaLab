import { IsArray, IsNumber } from 'class-validator'

export class OrderItemDto {
	@IsNumber()
	price: number

	@IsNumber()
	productId: number

	@IsNumber()
	quantity: number
}

export class OrderDto {
	@IsArray()
	items: OrderItemDto[]
}
