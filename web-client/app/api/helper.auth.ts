import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { EnumSecureStore, IAuthResponse } from '@/types/auth.interface'

import { saveToStorage } from '@/services/auth/auth.helper'

import { API_URL, DEMO_MODE, getAuthUrl } from '@/config/api.config'

export const getNewTokens = async () => {
	try {
		if (DEMO_MODE) return

		const refreshToken = await AsyncStorage.getItem(
			EnumSecureStore.REFRESH_TOKEN
		)

		const response = await axios.post<string, { data: IAuthResponse }>(
			API_URL + getAuthUrl('/login/access-token'),
			{ refreshToken },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		if (response.data.accessToken) await saveToStorage(response.data)
	} catch (e) {
		console.log(e)
	}
}
