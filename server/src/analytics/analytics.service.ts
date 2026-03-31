import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { GetAnalyticsDto } from './dto/get-analytics.dto'

type SalesBucket = {
	date: string
	orders: number
	revenue: number
}

type ProductSales = {
	productId: number
	name: string
	slug: string
	price: number
	image: string
	quantitySold: number
	revenue: number
	ordersCount: number
}

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaService) {}

	private startDate(days: number) {
		const date = new Date()
		date.setHours(0, 0, 0, 0)
		date.setDate(date.getDate() - (days - 1))
		return date
	}

	private buildDailyBuckets(days: number) {
		const buckets = new Map<string, SalesBucket>()

		for (let i = days - 1; i >= 0; i--) {
			const date = new Date()
			date.setHours(0, 0, 0, 0)
			date.setDate(date.getDate() - i)
			const key = date.toISOString().slice(0, 10)

			buckets.set(key, {
				date: key,
				orders: 0,
				revenue: 0
			})
		}

		return buckets
	}

	private toProductSalesMap(
		products: Array<{
			id: number
			name: string
			slug: string
			price: number
			image: string
		}>,
		salesStats: Array<{
			productId: number
			quantitySold: number
			revenue: number
			ordersCount: number
		}>
	) {
		const salesByProductId = new Map(
			salesStats.map(item => [item.productId, item])
		)

		return products.map(product => {
			const sale = salesByProductId.get(product.id)

			return {
				productId: product.id,
				name: product.name,
				slug: product.slug,
				price: product.price,
				image: product.image,
				quantitySold: sale?.quantitySold ?? 0,
				revenue: sale?.revenue ?? 0,
				ordersCount: sale?.ordersCount ?? 0
			}
		})
	}

	private sortProducts(
		products: ProductSales[],
		metric: GetAnalyticsDto['metric']
	) {
		switch (metric) {
			case 'revenue':
				return [...products].sort((a, b) => b.revenue - a.revenue)
			case 'orders':
				return [...products].sort((a, b) => b.ordersCount - a.ordersCount)
			default:
				return [...products].sort((a, b) => b.quantitySold - a.quantitySold)
		}
	}

	async getAnalytics(user: User, dto: GetAnalyticsDto) {
		if (!this.checkIsAdmin(user)) {
			throw new ForbiddenException('Unauthorized')
		}

		const rangeDays = dto.rangeDays ?? 30
		const top = dto.top ?? 5
		const metric = dto.metric ?? 'quantity'
		const fromDate = this.startDate(rangeDays)

		const [orders, statuses, salesAgg, products] = await Promise.all([
			this.prisma.order.findMany({
				where: {
					createdAt: {
						gte: fromDate
					}
				},
				select: {
					createdAt: true,
					totalAmount: true
				}
			}),
			this.prisma.order.groupBy({
				by: ['status'],
				where: {
					createdAt: {
						gte: fromDate
					}
				},
				_count: {
					_all: true
				}
			}),
			this.prisma.orderItem.groupBy({
				by: ['productId'],
				where: {
					order: {
						createdAt: {
							gte: fromDate
						}
					}
				},
				_sum: {
					quantity: true,
					lineTotal: true
				},
				_count: {
					orderId: true
				}
			}),
			this.prisma.product.findMany({
				select: {
					id: true,
					name: true,
					slug: true,
					price: true,
					image: true
				}
			})
		])

		const summary = orders.reduce(
			(acc, order) => {
				acc.orders += 1
				acc.revenue += order.totalAmount
				return acc
			},
			{
				orders: 0,
				revenue: 0
			}
		)

		const dailyBuckets = this.buildDailyBuckets(rangeDays)

		for (const order of orders) {
			const key = order.createdAt.toISOString().slice(0, 10)
			const bucket = dailyBuckets.get(key)

			if (!bucket) {
				continue
			}

			bucket.orders += 1
			bucket.revenue += order.totalAmount
		}

		const statusChart = statuses.map(item => ({
			status: item.status,
			count: item._count._all
		}))

		const salesStats = salesAgg.map(item => ({
			productId: item.productId,
			quantitySold: item._sum.quantity ?? 0,
			revenue: item._sum.lineTotal ?? 0,
			ordersCount: item._count.orderId
		}))

		const productSales = this.toProductSalesMap(products, salesStats)
		const sortedProducts = this.sortProducts(productSales, metric)
		const topProducts = sortedProducts.slice(0, top)
		const worstProducts = [...sortedProducts].reverse().slice(0, top)

		return {
			filters: {
				rangeDays,
				top,
				metric
			},
			summary: {
				orders: summary.orders,
				revenue: summary.revenue,
				averageCheck:
					summary.orders > 0 ? Math.round(summary.revenue / summary.orders) : 0
			},
			charts: {
				revenueByDay: [...dailyBuckets.values()],
				ordersByStatus: statusChart,
				topProducts,
				worstProducts
			}
		}
	}

	private checkIsAdmin(user: User) {
		const authUser = user as User & { isAdmin?: boolean }
		return authUser.isAdmin === true
	}
}
