import cn from 'clsx'
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'

import { theme } from '@/config/theme'

interface ILayout {
	className?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
	return (
		<View
			className={cn('h-full w-full mt-24 px-4', className)}
			style={{ backgroundColor: theme.colors.pageBackground }}
		>
			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	)
}

export default Layout
