import React, { useState } from 'react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Pressable } from 'react-native'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'

import useTypedNavigation from '@/hooks/useTypedNavigation'

import { IAuthFormData } from '@/types/auth.interface'

import { theme } from '@/config/theme'

import AuthFields from './AuthFields'
import { useAuthMutation } from './useAuthMutation'

export const Auth: FC = () => {
	const { navigate } = useTypedNavigation()
	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { loginSync, registerSync, isLoading } = useAuthMutation(reset)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	const [isReg, setIsReg] = useState(false)

	return (
		<View
			className='mx-2 items-center justify-center h-full'
			style={{ backgroundColor: theme.colors.pageBackground }}
		>
			<View className='w-9/12'>
				<Text
					className='text-center text-3xl font-medium mb-8'
					style={{ color: theme.colors.textPrimary }}
				>
					{isReg ? 'Регистрация' : 'Авторизация'}
				</Text>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control} />

						<Button className='w-full' onPress={handleSubmit(onSubmit)}>
							{isReg ? 'Зарегистрироваться' : 'Войти'}
						</Button>

						<Pressable onPress={() => setIsReg(!isReg)}>
							<Text
								className='text-center text-base mt-6'
								style={{ color: theme.colors.textPrimary }}
							>
								{isReg ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
								<Text style={{ color: theme.colors.accent }}>
									{isReg ? 'Войти' : 'Зарегистрироваться'}
								</Text>
							</Text>
						</Pressable>
					</>
				)}
			</View>
		</View>
	)
}

export default Auth
