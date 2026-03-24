import React from 'react'
import { FC } from 'react'
import { Image, View } from 'react-native'

import Loader from '@/components/ui/Loader'
import Layout from '@/components/ui/layout/layout'

import { getMediaSource } from '@/utils/getMediaSource'

import ProductHeader from './productHeader'
import { useProduct } from './useProduct'
import ProductInfo from './product-info/ProductInfo'
import AddToCartButton from './product-info/AddToCartButton'

const Product: FC = () => {
	const { isLoading, product } = useProduct()

	if (isLoading) return <Loader />
	if (!product) return null

	return (
		<Layout>
			<ProductHeader product={product} />
			<View>
				<Image
					source={getMediaSource(product.image)}
					width={260}
					height={260}
				/>
			</View>
      <ProductInfo product={product} />
      <AddToCartButton product={product} />
		</Layout>
	)
}

export default Product
