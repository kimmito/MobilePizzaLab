import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TypeNavigate } from './menu.interface'
import { menuItems } from './menu.data'
import MenuItem from './MenuItem'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = ( props ) => {
	const { bottom } = useSafeAreaInsets()
	return (
		<View
			className='pt-4 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#bbbbbb] bg-white'
			style={{ paddingBottom: bottom }}
		>
			{menuItems.map((item) => (
        <MenuItem key={item.path} item={item} {...props} />
      ))}
		</View>
	)
}

export default BottomMenu
