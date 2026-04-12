import { FC } from 'react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Text, View } from 'react-native'

import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from '@/screens/auth/email.regex'

interface IAuthFields {
	control: Control<IAuthFormData>
}

const AuthFields: FC<IAuthFields> = ({ control }) => {
	return (
		<>
			<Field<IAuthFormData>
				control={control}
				name='email'
				placeholder='Введите email'
				rules={{
					required: 'Email обязателен',
					pattern: {
						value: validEmail,
						message: 'Введите корректный email'
					}
				}}
				keyboardType='email-address'
			/>
			<Field<IAuthFormData>
				control={control}
				name='password'
				placeholder='Введите пароль'
        secureTextEntry
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Пароль должен содержать минимум 6 символов'
					}
				}}
			/>
		</>
	)
}

export default AuthFields