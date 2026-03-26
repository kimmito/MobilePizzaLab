import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from 'src/product/return-product-object'
import { OrderDto } from './dto/order.dto'

@Injectable()
export class OrderService {
	private stripe: Stripe
	constructor(private prisma: PrismaService) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
	}

	async getAll() {
		return this.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async getByUserId(userId: number) {
		return this.prisma.order.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const total = dto.items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		)

		if (total < 300) {
			throw new Error(`Минимальная сумма заказа 300 руб.`)
		}
		const order = await this.prisma.order.create({
			data: {
				reference: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
				items: {
					create: dto.items.map(item => ({
						quantity: item.quantity,
						unitPrice: item.price,
						lineTotal: item.price * item.quantity,
						product: {
							connect: { id: item.productId }
						}
					}))
				},
				totalAmount: total,
				user: {
					connect: { id: userId }
				}
			}
		})

		const paymentIntent = await this.stripe.paymentIntents.create({
			amount: total * 100,
			currency: 'rub',
			automatic_payment_methods: {
				enabled: true
			},
			description: `Оплата заказа №${order.id}`
		})

		return { clientSecret: paymentIntent.client_secret }
	}
}
