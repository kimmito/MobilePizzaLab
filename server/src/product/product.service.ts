import { CategoryService } from './../category/category.service'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from './return-product-object'
import { ProductDto } from './dto/product.dto'
import { slugify } from 'src/utils/generate-slug'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)
		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: { createdAt: 'desc' }
		})
	}

	async search(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{ name: { contains: searchTerm, mode: 'insensitive' } },
					{ description: { contains: searchTerm, mode: 'insensitive' } }
				]
			},
			select: returnProductObject
		})
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: returnProductObject
		})
		if (!product) {
			throw new Error('product not found')
		}
		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: { category: { slug: categorySlug } },
			select: returnProductObject
		})

		if (!products) {
			throw new Error('products not found')
		}

		return products
	}

	async create(dto: ProductDto) {
		const { name, description, image, price, categoryId } = dto
		await this.categoryService.byId(categoryId)
		return await this.prisma.product.create({
			data: {
				name,
				slug: slugify(name),
				image,
				description,
				price,
				category: { connect: { id: categoryId } }
			}
		})
	}

	async update(id: number, dto: ProductDto) {
		const { name, description, image, price, categoryId } = dto

		await this.categoryService.byId(categoryId)
		return await this.prisma.product.update({
			where: { id },
			data: {
				name,
				description,
				image,
				price,
				slug: slugify(name),
				category: { connect: { id: categoryId } }
			}
		})
	}

	async delete(id: number) {
		return await this.prisma.product.delete({
			where: { id }
		})
	}
}
