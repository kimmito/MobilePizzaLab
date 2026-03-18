import { Prisma } from '@prisma/client'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	slug: true,
	image: true,
	description: true,
	price: true,
	createdAt: true,
	category: {
		select: {
			id: true,
			name: true,
			slug: true,
			image: true,
			createdAt: true,
			updatedAt: true
		}
	}
}
