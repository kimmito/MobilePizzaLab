import AsyncStorage from '@react-native-async-storage/async-storage'

import {
	EnumAsyncStorage,
	EnumSecureStore,
	IAuthResponse,
	ITokens
} from '@/types/auth.interface'

export const getAccessToken = async () => {
	const accessToken = await AsyncStorage.getItem(EnumSecureStore.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokensStorage = async (data: ITokens) => {
	await AsyncStorage.setItem(EnumSecureStore.ACCESS_TOKEN, data.accessToken)
	await AsyncStorage.setItem(EnumSecureStore.REFRESH_TOKEN, data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await AsyncStorage.removeItem(EnumSecureStore.ACCESS_TOKEN)
	await AsyncStorage.removeItem(EnumSecureStore.REFRESH_TOKEN)
}

export const getUserFromStorage = async () => {
	try {
		const rawUser = await AsyncStorage.getItem(EnumAsyncStorage.USER)
		if (!rawUser) return null

		const parsedUser = JSON.parse(rawUser)
		if (!parsedUser || typeof parsedUser !== 'object') return null
		if (!('id' in parsedUser) || !('email' in parsedUser)) return null

		return parsedUser
	} catch (e) {
		console.log(e)
		return null
	}
}

export const saveToStorage = async (data: IAuthResponse) => {
	await saveTokensStorage(data)
	try {
		await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(data.user))
	} catch (e) {
		console.log(e)
	}
}
