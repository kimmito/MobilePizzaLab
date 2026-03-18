import { useQuery } from '@tanstack/react-query'

import useTypedRoute from '@/hooks/useTypedRoute'

import { CategoryService } from '@/services/category.service'
import { ProductsService } from '@/services/products.service'

export const useCategory = () => {
	const { params } = useTypedRoute<'Category'>()

	const { isLoading: isCategoryLoading, data: category } = useQuery({
		queryKey: ['get category by slug', params.slug],
		queryFn: () => CategoryService.getBySlug(params.slug)
	})

	const categoryId = category?.id || ''

	const { isLoading: isProductsLoading, data: product } = useQuery({
		queryKey: ['get products by category', params.slug],
		queryFn: () => ProductsService.getByCategory(params.slug),
		enabled: !!categoryId
	})

	return {
		category,
		product,
		isLoading: isCategoryLoading || isProductsLoading
	}
}
