import React, {FC} from 'react'
import { Text, View } from 'react-native'


type AdminInfoProps = {
  isAdmin: boolean | undefined
}

const AdminInfo: FC<AdminInfoProps> = ({ isAdmin }) => {
	if (isAdmin) {
		return (
			<View>
				<View className='my-6 items-center justify-center'>
					<Text className='mt-4'>Панель администратора</Text>
				</View>
				<View>
					<Text>Статистика продаж</Text>
				</View>
			</View>
		)
	}
}

export default AdminInfo
