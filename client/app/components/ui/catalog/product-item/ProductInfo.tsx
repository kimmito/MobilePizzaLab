import React from 'react'
import { FC } from 'react'
import { Text, View } from 'react-native'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

interface IProductInfo {
	product: IProduct
}

const ProductInfo: FC<IProductInfo> = ({ product }) => {
	return (
		<View className='my-3'>
			<Text className='text-base font-semibold'>{product.name}</Text>
			<Text className='py-0.5'>{product.category?.name}</Text>
			<Text className='mt-1 text-sm font-extrabold text-center letter-spacing-[2px] tracking-wider py-0.5 w-[70px] rounded-full text-white bg-[#47AA52]'>
				{convertPrice(product.price)}
			</Text>
		</View>
	)
}

export default ProductInfo
