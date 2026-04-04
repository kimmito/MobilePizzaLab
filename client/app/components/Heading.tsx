import cn from 'clsx'
import React, { FC, PropsWithChildren } from 'react'
import { Text } from 'react-native'

import { theme } from '@/config/theme'

interface IHeading {
	isCenter?: boolean
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({
	children,
	isCenter = false,
	className
}) => {
	return (
		<Text
			className={cn(
				'font-semibold text-2xl',
				isCenter && 'text-center',
				className
			)}
			style={{ color: theme.colors.textPrimary }}
		>
			{children}
		</Text>
	)
}

export default Heading
