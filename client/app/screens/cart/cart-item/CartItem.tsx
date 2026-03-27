import React from 'react'
import { Image, Pressable, View, Text } from 'react-native'

import useTypedNavigation from '@/hooks/useTypedNavigation'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'
import { getMediaSource } from '@/utils/getMediaSource'

import CartActions from './CartActions'

interface ICartItemProps {
	item: ICartItem
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
	const { navigate } = useTypedNavigation()

	return (
		<View className='flex-row mt-5'>
			<Pressable
				onPress={() => navigate('Product', { slug: item.product.slug })}
				className='bg-gray-100 rounded-xl overflow-hidden py-3 px-3 items-center w-28'
			>
				<Image
					width={80}
					height={80}
					source={getMediaSource(item.product.image)}
				/>
			</Pressable>
			<View className='ml-5 mt-2'>
				<Text className='mt-1 font-bold text-xl'>{item.product.name}</Text>
				<Text className='mt-1'>{convertPrice(item.price)}</Text>
				<CartActions item={item} />
			</View>
		</View>
	)
}

export default CartItem
