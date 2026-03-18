import React, { FC } from 'react'
import { Text, View } from 'react-native'

import Heading from '@/components/Heading'
import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'
import Field from '@/components/ui/field/Field'
import Layout from '@/components/ui/layout/layout'

import { ISearchFormData } from './search.interface'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { searchTerm, isLoading, control, products } = useSearch()
	return (
		<Layout>
			<Heading>Search</Heading>
			<View className='mt-3'>
				<Field<ISearchFormData>
					control={control}
					name='searchTerm'
					placeholder='Поиск...'
					keyboardType='web-search'
				/>
			</View>
			{!!searchTerm ? (
				<View className='mt-2'>
					{isLoading ? <Loader /> : <Catalog products={products || []} />}
				</View>
			) : null}
		</Layout>
	)
}

export default Search
