import React from 'react'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import useTypedNavigation from '@/hooks/useTypedNavigation'

import { theme } from '@/config/theme'

const Banner: FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View
			className='mt-5 w-full px-5 py-5 rounded-2xl justify-between flex-row'
			style={{ backgroundColor: theme.colors.accentStrong }}
		>
			<View>
				<Text className='text-white font-medium text-xl w-52'>
					Скидка 15% на все пиццы!
				</Text>

				<Pressable
					onPress={() => navigate('Explorer')}
					className='py-4 text-3xl rounded-full w-44 mt-4'
					style={{ backgroundColor: theme.colors.textPrimary }}
				>
					<Text className='text-white text-center font-medium'>
						Заказать сейчас
					</Text>
				</Pressable>
			</View>
			<View className='absolute bottom-0 right-6 w-32 h-32'>
				<Image
					source={require('../../../../assets/images/banner.png')}
					className='w-full h-full'
				/>
			</View>
		</View>
	)
}

export default Banner
