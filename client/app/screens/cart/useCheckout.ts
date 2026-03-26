import { useStripe } from '@stripe/stripe-react-native'
import { useMutation } from '@tanstack/react-query'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCard'
import useTypedNavigation from '@/hooks/useTypedNavigation'

import { OrderService } from '@/services/order.service'

export const useCheckout = () => {
	const { items, total } = useCart()
	const { user } = useAuth()
	const { reset } = useActions()
	const { navigate } = useTypedNavigation()
	const { initPaymentSheet, presentPaymentSheet } = useStripe()

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
			const { clientSecret } = await placeOrder()
			const { error } = await initPaymentSheet({
				paymentIntentClientSecret: clientSecret,
				merchantDisplayName: 'PizzaLab'
			})

			if (error) {
				console.error('Error initializing payment sheet:', error)
				return
			}

			const { error: paymentError } = await presentPaymentSheet()
			if (paymentError) {
				console.error('Error presenting payment sheet:', paymentError)
				return
			}

			reset()
			navigate('Thanks')
		} catch (error) {
			console.error('Error during checkout:', error)
		}
	}
	return { onCheckout }
}
