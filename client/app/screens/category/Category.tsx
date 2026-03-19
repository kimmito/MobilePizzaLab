import React, { FC } from 'react'
import { Text } from 'react-native'

import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/layout'

import { useCategory } from './useCategory'

const Category: FC = () => {
	const { category, products, isLoading } = useCategory()
	if (isLoading) return <Loader />
	return (
		<Layout>
			{category ? (
				<Catalog
					title={category.name}
					products={Array.isArray(products) ? products : []}
				/>
			) : (
				<Text>Категория не найдена</Text>
			)}
		</Layout>
	)
}

export default Category
