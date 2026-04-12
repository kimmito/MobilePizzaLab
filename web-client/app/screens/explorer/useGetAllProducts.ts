import { useQuery } from '@tanstack/react-query'
import { ProductsService } from '@/services/products.service'

export const useGetAllProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: [`get all products`],
		queryFn: () => ProductsService.getAll(),
		select: data => data
	})

  return { products, isLoading }
}
