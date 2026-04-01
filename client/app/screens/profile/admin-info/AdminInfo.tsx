import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import { convertPrice } from '@/utils/convertPrice'
import Loader from '@/components/ui/Loader'
import { useAnalytics } from '@/screens/profile/admin-info/useAnalytics'


type AdminInfoProps = {
  isAdmin: boolean | undefined
}

const AdminInfo: FC<AdminInfoProps> = ({ isAdmin }) => {
	const {
		data: analytics,
		isLoading,
		isError,
		refetch,
		filters,
		setRangeDays,
		setMetric
	} = useAnalytics({ enabled: Boolean(isAdmin) })

	if (!isAdmin) {
		return null
	}

	return (
		<View className='mt-6 rounded-xl border border-neutral-700 p-4'>
			<Text className='text-lg font-semibold text-white'>Панель администратора</Text>

			<View className='mt-4 flex-row gap-2'>
				{[7, 30, 90].map(days => (
					<Pressable
						key={days}
						onPress={() => setRangeDays(days)}
						className={`rounded-md px-3 py-2 ${filters.rangeDays === days ? 'bg-orange-500' : 'bg-neutral-800'}`}
					>
						<Text className='text-white'>{days}д</Text>
					</Pressable>
				))}
			</View>

			<View className='mt-2 flex-row gap-2'>
				{(['quantity', 'revenue', 'orders'] as const).map(item => (
					<Pressable
						key={item}
						onPress={() => setMetric(item)}
						className={`rounded-md px-3 py-2 ${filters.metric === item ? 'bg-blue-500' : 'bg-neutral-800'}`}
					>
						<Text className='text-white'>{item}</Text>
					</Pressable>
				))}
			</View>

			{isLoading && <Loader />}
			{isError ? (
				<Pressable onPress={() => refetch()}>
					<Text className='mt-4 text-red-400'>Ошибка загрузки. Нажми, чтобы повторить.</Text>
				</Pressable>
			) : null}

			{analytics ? (
				<View className='mt-4 gap-2'>
					<Text className='text-white'>Заказов: {analytics.summary.orders}</Text>
					<Text className='text-white'>Выручка: {convertPrice(analytics.summary.revenue)}</Text>
					<Text className='text-white'>Средний чек: {convertPrice(analytics.summary.averageCheck)}</Text>

					<Text className='mt-2 text-white font-semibold'>Топ товаров</Text>
					{analytics.charts.topProducts.slice(0, 3).map(item => (
						<Text key={item.productId} className='text-neutral-200'>
							{item.name}: {item.quantitySold} шт
						</Text>
					))}

					<Text className='mt-2 text-white font-semibold'>Антитоп товаров</Text>
					{analytics.charts.worstProducts.slice(0, 3).map(item => (
						<Text key={item.productId} className='text-neutral-200'>
							{item.name}: {item.quantitySold} шт
						</Text>
					))}
				</View>
			) : null}
		</View>
	)
}

export default AdminInfo
