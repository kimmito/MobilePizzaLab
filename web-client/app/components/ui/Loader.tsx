import React from 'react'
import { FC } from 'react'
import { ActivityIndicator } from 'react-native'

import { theme } from '@/config/theme'

const Loader: FC = () => {
	return <ActivityIndicator size='large' color={theme.colors.accent} />
}

export default Loader
