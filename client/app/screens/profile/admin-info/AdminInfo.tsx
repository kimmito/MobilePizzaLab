import React, { FC } from 'react'
import { Pressable, Text, View, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

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
			<Text className='text-lg font-semibold text-black'>Панель администратора</Text>

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
						<Text className='text-white'>{item === 'quantity' ? 'Количество' : item === 'revenue' ? 'Выручка' : 'Заказы'}</Text>
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
					<Text className='text-black'>Заказов: {analytics.summary.orders}</Text>
					<Text className='text-black'>Выручка: {convertPrice(analytics.summary.revenue)}</Text>
					<Text className='text-black'>Средний чек: {convertPrice(analytics.summary.averageCheck)}</Text>

					<Text className='mt-2 text-black font-semibold'>
						Динамика {filters.metric === 'revenue' ? 'выручки' : 'заказов'}
					</Text>
					{analytics.charts.revenueByDay && analytics.charts.revenueByDay.length > 0 && (
						<View className='mt-2 overflow-hidden rounded-xl'>
							{/* @ts-ignore */}
							<LineChart
								data={{
									labels: analytics.charts.revenueByDay.map((item, index) => 
										index === 0 || index === analytics.charts.revenueByDay.length - 1 || index % Math.ceil(analytics.charts.revenueByDay.length / 5) === 0
											? item.date.slice(5)
											: ''
									),
									datasets: [
										{
											data: analytics.charts.revenueByDay.map(item => 
												filters.metric === 'revenue' ? item.revenue : item.orders
											)
										}
									]
								}}
								width={Dimensions.get('window').width - 64}
								height={220}
								yAxisLabel={filters.metric === 'revenue' ? '₽' : ''}
								yAxisSuffix=''
								chartConfig={{
									backgroundColor: '#262626',
									backgroundGradientFrom: '#262626',
									backgroundGradientTo: '#171717',
									decimalPlaces: 0,
									color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
									labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
									style: {
										borderRadius: 16
									},
									propsForDots: {
										r: '4',
										strokeWidth: '2',
										stroke: '#f97316'
									}
								}}
								bezier
								style={{
									marginVertical: 8,
									borderRadius: 16
								}}
							/>
						</View>
					)}

					<Text className='mt-4 text-black font-semibold'>Топ товаров</Text>
					{analytics.charts.topProducts.slice(0, 3).map(item => (
						<Text key={item.productId} className='text-gray-500'>
							{item.name}:{' '}
							{filters.metric === 'quantity' && `${item.quantitySold} шт`}
							{filters.metric === 'revenue' && convertPrice(item.revenue)}
							{filters.metric === 'orders' && `${item.ordersCount} заказов`}
						</Text>
					))}

					<Text className='mt-2 text-black font-semibold'>Антитоп товаров</Text>
					{analytics.charts.worstProducts.slice(0, 3).map(item => (
						<Text key={item.productId} className='text-gray-500'>
							{item.name}:{' '}
							{filters.metric === 'quantity' && `${item.quantitySold} шт`}
							{filters.metric === 'revenue' && convertPrice(item.revenue)}
							{filters.metric === 'orders' && `${item.ordersCount} заказов`}
						</Text>
					))}
				</View>
			) : null}
		</View>
	)
}

export default AdminInfo
