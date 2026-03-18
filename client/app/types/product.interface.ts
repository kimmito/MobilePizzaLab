import { ICategory } from './category.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	price: number
	image: string
	category?: ICategory
	description: string
	createdAt: string
}
