import { IProduct } from '@/types/product.interface'

import { DEMO_MODE, getProductsUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import { DEMO_PRODUCTS } from '@/mocks/demo.data'

export const ProductsService = {
	async getAll(searchTerm?: string) {
		if (DEMO_MODE) {
			const term = searchTerm?.trim().toLowerCase()
			if (!term) return DEMO_PRODUCTS
			return DEMO_PRODUCTS.filter(product =>
				product.name.toLowerCase().includes(term)
			)
		}

		return request<IProduct[]>({
			url: getProductsUrl(''),
			method: 'GET',
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async getBySlug(slug: string) {
		if (DEMO_MODE) {
			return (
				DEMO_PRODUCTS.find(product => product.slug === slug) || DEMO_PRODUCTS[0]
			)
		}

		return request<IProduct>({
			url: getProductsUrl(`/by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getByCategory(categorySlug: string) {
		if (DEMO_MODE) {
			return DEMO_PRODUCTS.filter(
				product => product.category?.slug === categorySlug
			)
		}

		return request<IProduct[]>({
			url: getProductsUrl(`/by-category/${categorySlug}`),
			method: 'GET'
		})
	}
}
