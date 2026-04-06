import cn from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { theme } from '@/config/theme'

interface ILayout {
	className?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
	const { top, bottom } = useSafeAreaInsets()

	return (
		<View
			className={cn('flex-1 w-full px-4', className)}
			style={{
				backgroundColor: theme.colors.pageBackground,
				paddingTop: top + 3
			}}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: bottom
				}}
			>
				{children}
			</ScrollView>
		</View>
	)
}

export default Layout
