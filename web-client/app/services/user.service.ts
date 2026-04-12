import AsyncStorage from '@react-native-async-storage/async-storage'

import { EnumAsyncStorage } from '@/types/auth.interface'
import { IUser } from '@/types/user.interface'

import { DEMO_MODE, getUsersUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import { DEMO_PRODUCTS, DEMO_USER } from '@/mocks/demo.data'

export const UserService = {
	async getProfile() {
		if (DEMO_MODE) {
			const rawUser = await AsyncStorage.getItem(EnumAsyncStorage.USER)
			if (rawUser) {
				const storedUser = JSON.parse(rawUser) as IUser
				const favoriteIds =
					storedUser.favorites?.map(product => product.id) || []
				const normalizedUser: IUser = {
					...DEMO_USER,
					...storedUser,
					avatarPath: storedUser.avatarPath || DEMO_USER.avatarPath,
					favorites: DEMO_PRODUCTS.filter(product =>
						favoriteIds.includes(product.id)
					)
				}

				await AsyncStorage.setItem(
					EnumAsyncStorage.USER,
					JSON.stringify(normalizedUser)
				)
				return normalizedUser
			}

			await AsyncStorage.setItem(
				EnumAsyncStorage.USER,
				JSON.stringify(DEMO_USER)
			)
			return DEMO_USER
		}

		return request<IUser>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
	},
	async toggleFavorite(productId: number) {
		if (DEMO_MODE) {
			const rawUser = await AsyncStorage.getItem(EnumAsyncStorage.USER)
			const currentUser = rawUser ? (JSON.parse(rawUser) as IUser) : DEMO_USER

			const exists = currentUser.favorites.some(
				product => product.id === productId
			)
			const updatedFavorites = exists
				? currentUser.favorites.filter(product => product.id !== productId)
				: [
						...currentUser.favorites,
						...(DEMO_PRODUCTS.filter(product => product.id === productId) || [])
					]

			const updatedUser: IUser = {
				...currentUser,
				favorites: updatedFavorites
			}

			await AsyncStorage.setItem(
				EnumAsyncStorage.USER,
				JSON.stringify(updatedUser)
			)
			return updatedUser
		}

		return request<IUser>({
			url: getUsersUrl(`/profile/favorites/${productId}`),
			method: 'PATCH'
		})
	}
}
