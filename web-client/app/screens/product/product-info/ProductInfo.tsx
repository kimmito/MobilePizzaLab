import { FC } from 'react'
import React from 'react'
import { Text, View } from 'react-native'

import { convertPrice } from '@/utils/convertPrice'

import { theme } from '@/config/theme'

import { IProductComponent } from '../product-page.interface'

const ProductInfo: FC<IProductComponent> = ({ product }) => {
	return (
		<View className='mt-7'>
			<Text className='text-2xl font-bold'>{product.name}</Text>
			<Text className='mt-2 text-base opacity-70'>{product.description}</Text>
			<Text
				className='mt-6 text-3xl font-semibold'
				style={{ color: theme.colors.accent }}
			>
				{convertPrice(product.price)}
			</Text>
		</View>
	)
}

export default ProductInfo
