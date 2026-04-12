import { SERVER_URL } from '@/config/api.config'

import { DEMO_ASSETS } from '@/mocks/demo.assets'

export const getMediaSource = (path: string) => {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	const localDemoAsset = DEMO_ASSETS[normalizedPath]
	if (localDemoAsset) return localDemoAsset

	const isAbsolute = /^https?:\/\//i.test(path)
	return {
		uri: isAbsolute ? path : `${SERVER_URL || ''}${normalizedPath}`
	}
}
