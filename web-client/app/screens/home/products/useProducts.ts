import { useQuery } from '@tanstack/react-query'
import { ProductsService } from '@/services/products.service'

export const useProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: [`get products`],
		queryFn: () => ProductsService.getAll(),
		select: data => data.slice(0, 4)
	})

  return { products, isLoading }
}
