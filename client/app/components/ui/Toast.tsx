import React, { FC } from 'react'
import RnToast, { BaseToast } from 'react-native-toast-message'

import { theme } from '@/config/theme'

const options = (primaryColor: string, secondaryColor: string) => ({
	style: { backgroundColor: '#080808', borderLeftColor: primaryColor },
	text1Style: {
		color: secondaryColor,
		fontSize: 16,
		fontWeight: 'bold' as const
	},
	text2Style: { color: secondaryColor, fontSize: 14 }
})

const Toast: FC = () => {
	return (
		<RnToast
			topOffset={50}
			config={{
				success: props => (
					<BaseToast {...props} {...options(theme.colors.success, '#fff')} />
				),
				info: props => (
					<BaseToast {...props} {...options(theme.colors.accent, '#fff')} />
				),
				error: props => (
					<BaseToast {...props} {...options(theme.colors.error, '#fff')} />
				)
			}}
		/>
	)
}

export default Toast
