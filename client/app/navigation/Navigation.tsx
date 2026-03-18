import {
	NavigationContainer,
	useNavigation,
	useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

import BottomMenu from '@/components/ui/layout/bottom-menu/bottomMenu'

import { useAuth } from '@/hooks/useAuth'

import { useCheckAuth } from '@/providers/auth/useCheckAuth'

import PrivateNavigator from './PrivateNavigator'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation: FC = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)
		const listener = navRef.addListener('state', () => {
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		})

		return () => navRef.removeListener('state', listener)
	}, [])

	useCheckAuth(currentRoute)

	const navRef = useNavigationContainerRef()
	return (
		<>
			<NavigationContainer ref={navRef}>
				<PrivateNavigator />
			</NavigationContainer>
			{user && currentRoute && (
				<BottomMenu currentRoute={currentRoute} nav={navRef.navigate} />
			)}
		</>
	)
}

export default Navigation
