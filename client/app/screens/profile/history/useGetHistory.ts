import { useQuery } from '@tanstack/react-query'

import { OrderService } from '@/services/order.service'

import { useProfile } from '../useProfile'

export const useGetHistory = () => {
	const { profile } = useProfile()
	const { data: orders } = useQuery({
		queryKey: ['get orders by user id', profile?.id],
		queryFn: () => OrderService.getByUserId(profile?.id)
	})

	return { orders }
}
