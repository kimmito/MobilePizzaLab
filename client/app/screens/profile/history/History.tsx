import React, { FC } from 'react'
import { Text, View } from 'react-native'

import { useGetHistory } from './useGetHistory'

const History: FC = () => {
	const { orders } = useGetHistory()

	return (
		<View>
			<Text>История заказов</Text>
			{orders?.map(order => (
				<View key={order.id}>
					<Text>Заказ #{order.id}</Text>
					<Text>
						Дата:{' '}
						{order.createdAt
							? new Date(order.createdAt).toLocaleDateString()
							: 'Дата не указана'}
					</Text>
					<Text>
						Сумма:{' '}
						{(order.items ?? []).reduce(
							(sum, item) => sum + Number(item.price) * item.quantity,
							0
						)}{' '}
						руб.
					</Text>
					<Text>Статус: {order.status}</Text>
					<Text>Товары:</Text>
					{(order.items ?? []).map(item => (
						<View key={item.productId}>
							<Text>
								{' '}
								- {item.quantity} x {item.price} руб.
							</Text>
						</View>
					))}
				</View>
			))}
		</View>
	)
}

export default History
