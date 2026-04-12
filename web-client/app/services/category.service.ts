import { DEMO_MODE, getCategoriesUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import { ICategory } from './../types/category.interface'
import { DEMO_CATEGORIES } from '@/mocks/demo.data'

export const CategoryService = {
	async getAll() {
		if (DEMO_MODE) return DEMO_CATEGORIES

		return request<ICategory[]>({
			url: getCategoriesUrl(''),
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		if (DEMO_MODE) {
			return (
				DEMO_CATEGORIES.find(category => category.slug === slug) ||
				DEMO_CATEGORIES[0]
			)
		}

		return request<ICategory>({
			url: getCategoriesUrl(`/by-slug/${slug}`),
			method: 'GET'
		})
	}
}
