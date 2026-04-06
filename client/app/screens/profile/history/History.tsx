import React, { FC } from 'react'
import { Text, View } from 'react-native'

import Heading from '@/components/Heading'
import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/layout'

import { convertPrice } from '@/utils/convertPrice'

import { theme } from '@/config/theme'

import { useGetHistory } from './useGetHistory'

const getStatusText = (status?: string) => {
	if (status === 'PAID') return 'Оплачен'
	if (status === 'CANCELED') return 'Отменен'
	return 'В обработке'
}

const getStatusColor = (status?: string) => {
	if (status === 'PAID') return theme.colors.success
	if (status === 'CANCELED') return theme.colors.error
	return theme.colors.accent
}

const History: FC = () => {
	const { orders, isLoading, isError, refetch } = useGetHistory()

	if (isLoading) {
		return (
			<Layout className='px-4 mt-4'>
				<Heading>История заказов</Heading>
				<Text className='mt-3'>Загружаем заказы...</Text>
			</Layout>
		)
	}

	if (isError) {
		return (
			<Layout className='px-4 mt-4'>
				<Heading>История заказов</Heading>
				<Text className='mt-3' style={{ color: theme.colors.error }}>
					Не удалось загрузить историю заказов.
				</Text>
				<Button className='mt-4' onPress={() => refetch()}>
					Повторить
				</Button>
			</Layout>
		)
	}

	return (
		<Layout>
			<Heading>История заказов</Heading>

			{!orders?.length ? (
				<Text className='mt-3' style={{ color: theme.colors.textSecondary }}>
					У вас пока нет заказов.
				</Text>
			) : null}

			{orders?.map(order => (
				<View
					key={order.id}
					className='mt-4 rounded-2xl p-4'
					style={{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
						borderWidth: 1
					}}
				>
					<View className='flex-row items-center justify-between'>
						<Text
							className='font-semibold'
							style={{ color: theme.colors.textPrimary }}
						>
							Заказ #{order.id}
						</Text>
						<Text style={{ color: getStatusColor(order.status) }}>
							{getStatusText(order.status)}
						</Text>
					</View>

					<Text className='mt-2' style={{ color: theme.colors.textSecondary }}>
						{order.createdAt
							? new Date(order.createdAt).toLocaleString('ru-RU')
							: 'Дата не указана'}
					</Text>

					<Text
						className='mt-2 font-semibold'
						style={{ color: theme.colors.textPrimary }}
					>
						Сумма: {convertPrice(order.totalAmount ?? 0)}
					</Text>

					<View className='mt-3'>
						{(order.items ?? []).map(item => (
							<View
								key={item.id}
								className='mb-2 rounded-xl p-3'
								style={{ backgroundColor: theme.colors.accentSoft }}
							>
								<Text style={{ color: theme.colors.textPrimary }}>
									{item.product?.name ?? `Товар #${item.productId}`}
								</Text>
								<Text
									className='mt-1'
									style={{ color: theme.colors.textSecondary }}
								>
									{item.quantity} x {convertPrice(item.unitPrice)}
								</Text>
								<Text
									className='mt-1'
									style={{ color: theme.colors.textPrimary }}
								>
									Итого: {convertPrice(item.lineTotal)}
								</Text>
							</View>
						))}
					</View>
				</View>
			))}
		</Layout>
	)
}

export default History
