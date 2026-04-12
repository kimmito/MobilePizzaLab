import axios from 'axios'

import {
	deleteTokensStorage,
	getAccessToken
} from '@/services/auth/auth.helper'

import { API_URL } from '@/config/api.config'

import { errorCatch } from './error.api'
import { getNewTokens } from './helper.auth'

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		const isAuthEndpoint = originalRequest?.url?.includes('/auth/')

		const is401 = error.response?.status === 401
		const isJwtError =
			errorCatch(error) === 'jwt expired' ||
			errorCatch(error) === 'jwt must be provided'

		if (
			(is401 || isJwtError) &&
			!isAuthEndpoint &&
			!originalRequest?._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return instance.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') await deleteTokensStorage()
			}
		}

		return Promise.reject(error)
	}
)

export default instance
