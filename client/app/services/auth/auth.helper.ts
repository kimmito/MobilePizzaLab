import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import {
	EnumAsyncStorage,
	EnumSecureStore,
	IAuthResponse,
	ITokens
} from '@/types/auth.interface'

export const getAccessToken = async () => {
	const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokensStorage = async (data: ITokens) => {
	await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.accessToken)
	await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refreshToken)
}

export const deleteTokensStorage = async () => {
	await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)
	await deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)
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
