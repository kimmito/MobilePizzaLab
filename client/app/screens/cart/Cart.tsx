import React from 'react'
import { Text, View } from 'react-native'

import Heading from '@/components/Heading'
import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/layout'

import { useCart } from '@/hooks/useCard'

import { convertPrice } from '@/utils/convertPrice'
import CartItem from './cart-item/CartItem'

const Cart: React.FC = () => {
	const { items, total } = useCart()
	return (
		<>
			<Layout>
				<Heading>Cart</Heading>

				{items.length ? (
					items.map(item => <CartItem key={item.id} item={item} />)
				) : (
					<Text className='mt-2'>Корзина пуста</Text>
				)}
			</Layout>
			{items.length ? (
				<View className='bottom-8 absolute w-[90%] mx-5'>
					<Text className='font-bold text-xl'>
						Всего: {convertPrice(total)}
					</Text>
					<Button className='mt-4' onPress={() => {}}>
						Оформить заказ
					</Button>
				</View>
			) : null}
		</>
	)
}

export default Cart
