import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { theme } from '@/config/theme'

import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'
import AuthScreen from '@/screens/auth/Auth'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: theme.colors.pageBackground }
			}}
		>
			{user ? (
				routes.map(route => <Stack.Screen key={route.name} {...route} />)
			) : (
				<Stack.Screen name='Auth' component={AuthScreen} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
