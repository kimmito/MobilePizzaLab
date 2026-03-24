import { FC } from 'react'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import Heading from '@/components/Heading'
import Loader from '@/components/ui/Loader'

import useTypedNavigation from '@/hooks/useTypedNavigation'

import { getMediaSource } from '@/utils/getMediaSource'

import { useGetAllCategories } from './useGetAllCategories'

const Categories: FC = () => {
	const { categories, isLoading } = useGetAllCategories()

	const { navigate } = useTypedNavigation()
	return isLoading ? (
		<Loader />
	) : (
		<View className='flex-col flex mb-4 mt-5'>
			<Heading>Категории</Heading>
			<View className='flex-row flex-nowrap gap-1 justify-center mt-5 overflow-x-visible'>
				{categories?.map(category => (
					<Pressable
						onPress={() => navigate('Category', { slug: category.slug })}
						key={category.id}
						className='rounded-xl bg-gray-100 min-w-20 h-20 px-4 py-2'
					>
						<Image
							source={getMediaSource(category.image)}
							className='w-12 h-12 p-2 mx-auto'
							style={{ resizeMode: 'contain' }}
						/>
						<Text className='text-center text-sm text-nowrap font-normal'>
							{category.name}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	)
}

export default Categories
