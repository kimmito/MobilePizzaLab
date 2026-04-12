import { useMutation } from '@tanstack/react-query'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCard'
import useTypedNavigation from '@/hooks/useTypedNavigation'

import { OrderService } from '@/services/order.service'

export const useCheckout = () => {
	const { items } = useCart()
	const { reset } = useActions()
	const { navigate } = useTypedNavigation()

	const { mutateAsync: placeOrder } = useMutation({
		mutationKey: ['place-order'],
		mutationFn: () => {
			return OrderService.place({
				items: items.map(item => ({
					price: item.price,
					productId: item.product.id,
					quantity: item.quantity
				}))
			})
		}
	})

	const onCheckout = async () => {
		try {
			await placeOrder()

			reset()
			navigate('Thanks')
		} catch (error) {
			console.error('Error during checkout:', error)
		}
	}
	return { onCheckout }
}
