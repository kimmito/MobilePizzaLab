import { useQuery } from '@tanstack/react-query'

import useTypedRoute from '@/hooks/useTypedRoute'

import { ProductsService } from '@/services/products.service'

export const useProduct = () => {
	const { params } = useTypedRoute<'Product'>()
	const { isLoading, data: product } = useQuery({
		queryKey: ['get product by slug', params.slug],
		queryFn: () => ProductsService.getBySlug(params.slug)
	})
	return { isLoading, product }
}
