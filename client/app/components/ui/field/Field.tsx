import { JSX } from 'react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

import { theme } from '@/config/theme'

import { IField } from './field.interface'

const Field = <T extends Record<string, any>>({
	control,
	name,
	rules,
	className,
	...rest
}: IField<T>): JSX.Element => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<>
					<View
						className='w-full rounded-lg pb-4 pt-2.5 px-4 my-1.5 border'
						style={{
							backgroundColor: theme.colors.surface,
							borderColor: error ? '#ef4444' : theme.colors.border
						}}
					>
						<TextInput
							autoCapitalize='none'
							value={value?.toString() || ''}
							onChangeText={onChange}
							onBlur={onBlur}
							className='text-base'
							style={{ color: theme.colors.textPrimary }}
							placeholderTextColor='#6A6A6A'
							{...rest}
						/>
					</View>
					{error && (
						<Text className='text-red-500 text-sm mt-1 ml-4'>
							{error.message}
						</Text>
					)}
				</>
			)}
		/>
	)
}

export default Field
