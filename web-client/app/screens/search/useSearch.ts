import { useQuery } from '@tanstack/react-query'

import { ProductsService } from '@/services/products.service'

import { useSearchForm } from './useSearchForm'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()

	const { data: products, isLoading } = useQuery({
		queryKey: ['search products', debouncedSearch],
		queryFn: () => ProductsService.getAll(debouncedSearch),
		enabled: !!debouncedSearch
	})

	return { products, isLoading, control, searchTerm }
}
