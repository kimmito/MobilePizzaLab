import { IAnalyticsData } from '@/types/analytics.interface'
import { IAuthResponse } from '@/types/auth.interface'
import { ICategory } from '@/types/category.interface'
import { IOrder } from '@/types/order.interface'
import { IProduct } from '@/types/product.interface'
import { IUser } from '@/types/user.interface'

export const DEMO_CATEGORIES: ICategory[] = [
	{
		id: 1,
		name: 'Классика',
		slug: 'classic',
		image: '/uploads/images/categories/popular.png'
	},
	{
		id: 2,
		name: 'Мясные',
		slug: 'meat',
		image: '/uploads/images/categories/meat.png'
	},
	{
		id: 3,
		name: 'Острая',
		slug: 'spicy',
		image: '/uploads/images/categories/spicy.png'
	},
	{
		id: 4,
		name: 'Грибные',
		slug: 'mushroom',
		image: '/uploads/images/categories/mushroom.png'
	},
	{
		id: 5,
		name: 'Вегетарианские',
		slug: 'vegetarian',
		image: '/uploads/images/categories/vegetarian.png'
	}
]

export const DEMO_PRODUCTS: IProduct[] = [
	{
		id: 101,
		name: 'Маргарита',
		slug: 'margarita',
		price: 499,
		image: '/uploads/images/products/italian.png',
		description: 'Классический томатный соус, моцарелла и базилик.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[0]
	},
	{
		id: 102,
		name: 'Пепперони',
		slug: 'pepperoni',
		price: 629,
		image: '/uploads/images/products/carbonara.png',
		description: 'Пикантная пепперони и двойной сыр.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[1]
	},
	{
		id: 103,
		name: 'BBQ Чикен',
		slug: 'bbq-chicken',
		price: 699,
		image: '/uploads/images/products/venecia.png',
		description: 'Курица, соус BBQ, красный лук и моцарелла.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[1]
	},
	{
		id: 104,
		name: 'Диабло',
		slug: 'diablo',
		price: 749,
		image: '/uploads/images/products/argentina.png',
		description: 'Острый соус, халапеньо и острые колбаски.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[2]
	},
	{
		id: 105,
		name: '4 Сыра',
		slug: 'four-cheese',
		price: 689,
		image: '/uploads/images/products/italiano.png',
		description: 'Моцарелла, дорблю, чеддер и пармезан.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[4]
	},
	{
		id: 106,
		name: 'Ветчина и грибы',
		slug: 'ham-mushrooms',
		price: 579,
		image: '/uploads/images/products/gribnaya.png',
		description: 'Ветчина, шампиньоны и сыр на сливочной основе.',
		createdAt: new Date().toISOString(),
		category: DEMO_CATEGORIES[3]
	}
]

export const DEMO_USER: IUser = {
	id: 1,
	email: 'demo@pizzalab.dev',
	name: 'Demo User',
	password: 'demo',
	avatarPath: '/uploads/images/categories/other.png',
	phone: '+7 (999) 000-00-00',
	favorites: [DEMO_PRODUCTS[1], DEMO_PRODUCTS[4]],
	isAdmin: false
}

export const DEMO_AUTH_RESPONSE: IAuthResponse = {
	accessToken: 'demo-access-token',
	refreshToken: 'demo-refresh-token',
	user: DEMO_USER
}

export const DEMO_ORDERS: IOrder[] = [
	{
		id: 5001,
		reference: 'DEMO-5001',
		totalAmount: 1128,
		status: 'PAID',
		createdAt: new Date().toISOString(),
		items: [
			{
				id: 1,
				orderId: 5001,
				productId: DEMO_PRODUCTS[0].id,
				quantity: 1,
				unitPrice: DEMO_PRODUCTS[0].price,
				lineTotal: DEMO_PRODUCTS[0].price,
				product: {
					id: DEMO_PRODUCTS[0].id,
					name: DEMO_PRODUCTS[0].name,
					price: DEMO_PRODUCTS[0].price,
					image: DEMO_PRODUCTS[0].image,
					slug: DEMO_PRODUCTS[0].slug
				}
			},
			{
				id: 2,
				orderId: 5001,
				productId: DEMO_PRODUCTS[1].id,
				quantity: 1,
				unitPrice: DEMO_PRODUCTS[1].price,
				lineTotal: DEMO_PRODUCTS[1].price,
				product: {
					id: DEMO_PRODUCTS[1].id,
					name: DEMO_PRODUCTS[1].name,
					price: DEMO_PRODUCTS[1].price,
					image: DEMO_PRODUCTS[1].image,
					slug: DEMO_PRODUCTS[1].slug
				}
			}
		]
	}
]

export const DEMO_ANALYTICS: IAnalyticsData = {
	filters: {
		rangeDays: 30,
		top: 5,
		metric: 'revenue'
	},
	summary: {
		orders: 42,
		revenue: 36840,
		averageCheck: 877
	},
	charts: {
		revenueByDay: [
			{ date: '2026-03-15', orders: 3, revenue: 2490 },
			{ date: '2026-03-20', orders: 4, revenue: 3380 },
			{ date: '2026-03-25', orders: 6, revenue: 5410 },
			{ date: '2026-03-30', orders: 5, revenue: 4690 },
			{ date: '2026-04-05', orders: 8, revenue: 7320 },
			{ date: '2026-04-10', orders: 7, revenue: 6350 }
		],
		ordersByStatus: [
			{ status: 'PENDING', count: 2 },
			{ status: 'PAID', count: 38 },
			{ status: 'CANCELED', count: 2 }
		],
		topProducts: [
			{
				productId: DEMO_PRODUCTS[1].id,
				name: DEMO_PRODUCTS[1].name,
				slug: DEMO_PRODUCTS[1].slug,
				price: DEMO_PRODUCTS[1].price,
				image: DEMO_PRODUCTS[1].image,
				quantitySold: 19,
				revenue: 11951,
				ordersCount: 14
			},
			{
				productId: DEMO_PRODUCTS[0].id,
				name: DEMO_PRODUCTS[0].name,
				slug: DEMO_PRODUCTS[0].slug,
				price: DEMO_PRODUCTS[0].price,
				image: DEMO_PRODUCTS[0].image,
				quantitySold: 17,
				revenue: 8483,
				ordersCount: 12
			},
			{
				productId: DEMO_PRODUCTS[3].id,
				name: DEMO_PRODUCTS[3].name,
				slug: DEMO_PRODUCTS[3].slug,
				price: DEMO_PRODUCTS[3].price,
				image: DEMO_PRODUCTS[3].image,
				quantitySold: 11,
				revenue: 8239,
				ordersCount: 9
			}
		],
		worstProducts: [
			{
				productId: DEMO_PRODUCTS[5].id,
				name: DEMO_PRODUCTS[5].name,
				slug: DEMO_PRODUCTS[5].slug,
				price: DEMO_PRODUCTS[5].price,
				image: DEMO_PRODUCTS[5].image,
				quantitySold: 5,
				revenue: 2895,
				ordersCount: 4
			},
			{
				productId: DEMO_PRODUCTS[2].id,
				name: DEMO_PRODUCTS[2].name,
				slug: DEMO_PRODUCTS[2].slug,
				price: DEMO_PRODUCTS[2].price,
				image: DEMO_PRODUCTS[2].image,
				quantitySold: 6,
				revenue: 4194,
				ordersCount: 5
			},
			{
				productId: DEMO_PRODUCTS[4].id,
				name: DEMO_PRODUCTS[4].name,
				slug: DEMO_PRODUCTS[4].slug,
				price: DEMO_PRODUCTS[4].price,
				image: DEMO_PRODUCTS[4].image,
				quantitySold: 7,
				revenue: 4823,
				ordersCount: 6
			}
		]
	}
}
