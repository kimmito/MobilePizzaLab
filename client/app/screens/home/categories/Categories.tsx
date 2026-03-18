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
			<View className='flex-row flex-wrap gap-2 justify-center mt-5'>
				{categories?.map(category => (
					<Pressable
						onPress={() => navigate('Category', { slug: category.slug })}
						key={category.id}
						className='rounded-xl bg-gray-100 w-20'
					>
						<Image
							source={getMediaSource(category.image)}
							className='w-14 h-14 p-3 mx-auto'
							style={{ resizeMode: 'contain' }}
						/>
						<Text className='text-center text-xs font-normal'>
							{category.name}
						</Text>
					</Pressable>
				))}
			</View>
		</View>
	)
}

export default Categories
