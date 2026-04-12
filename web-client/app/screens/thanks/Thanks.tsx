import { FontAwesome } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Text, View } from 'react-native'

const Thanks: FC = () => {
	return (
		<View className='justify-center items-center mt-40'>
			<FontAwesome name='check-circle' size={100} color='#61ab2c' />
			<Text className='text-5xl font-bold mt-10'>Спасибо за заказ!</Text>
		</View>
	)
}
export default Thanks
