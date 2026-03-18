import React, { FC } from 'react'
import { Text, View } from 'react-native'

import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/layout'

import { useGetAllProducts } from './useGetAllProducts'

const Explorer: FC = () => {
	const { products, isLoading } = useGetAllProducts()
	return (
		<Layout>
			{isLoading ? (
				<Loader />
			) : (
				<Catalog title='Explorer' products={products || []} />
			)}
		</Layout>
	)
}

export default Explorer
