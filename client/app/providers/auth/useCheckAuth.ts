import { getItemAsync } from 'expo-secure-store'
import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { EnumSecureStore } from '@/types/auth.interface'

import { getAccessToken } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

import { getNewTokens } from '@/api/helper.auth'

export const useCheckAuth = (currentRoute?: string | undefined) => {
	const { user, setUser } = useAuth()

	useEffect(() => {
		const checkAccessToken = async () => {
			const accessToken = await getAccessToken()
			if (accessToken) {
				try {
					await getNewTokens()
				} catch (e) {
					await AuthService.logout()
					setUser(null)
				}
			}
		}
		let ignore = checkAccessToken()
	}, [])

	useEffect(() => {
		const checkRefreshToken = async () => {
			const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)
			if (!refreshToken && user) {
				await AuthService.logout()
				setUser(null)
			}
		}
		let ignore = checkRefreshToken()
	}, [user])
}
