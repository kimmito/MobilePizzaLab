import * as SplashScreen from 'expo-splash-screen'
import React, {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'
import { View } from 'react-native'

import { IUser } from '@/types/user.interface'

import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'

import { TypeUserState } from './auth-provider.interface'
import { IContext } from './auth-provider.interface'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()
const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let isMounted = true
		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken()
				if (accessToken) {
					const user = await getUserFromStorage()
					if (isMounted) setUser(user ?? null)
				} else if (isMounted) {
					setUser(null)
				}
			} catch (e) {
				if (isMounted) setUser(null)
			} finally {
				await SplashScreen.hideAsync()
			}
		}
		let ignore = checkAccessToken()
		return () => {
			isMounted = false
		}
	}, [])
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
