import { FC } from 'react'
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

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
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className='mt-5'
				contentContainerStyle={{ gap: 8, paddingRight: 40 }}
			>
				{categories?.map(category => (
					<Pressable
						onPress={() => navigate('Category', { slug: category.slug })}
						key={category.id}
						className='rounded-xl bg-gray-100 min-w-[5rem] h-20 px-2 py-2 items-center justify-center'
					>
						<Image
							source={getMediaSource(category.image)}
							style={{
								width: 40,
								height: 40,
								marginBottom: 4,
								resizeMode: 'contain'
							}}
						/>
						<Text className='text-center text-xs font-normal' numberOfLines={1}>
							{category.name}
						</Text>
					</Pressable>
				))}
			</ScrollView>
		</View>
	)
}

export default Categories
