import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'

import Heading from '@/components/Heading'
import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/layout'

import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import { useProfile } from './useProfile'
import AdminInfo from './admin-info/AdminInfo'

const Profile: FC = () => {
	const { setUser } = useAuth()
	const { profile } = useProfile()
	return (
		<Layout className='px-4 mt-4'>
			<Heading isCenter={true}>Профиль</Heading>
			<View className='my-6 items-center justify-center'>
				<Image
					source={{ uri: profile?.avatarPath }}
					className='w-40 h-40 rounded-full'
				/>
				<Text className='mt-4'>{profile?.name}</Text>
			</View>
			<AdminInfo isAdmin={profile?.isAdmin} />
			<Button
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='mt-6 bg-red-500 w-full'
			>
				Выйти
			</Button>
		</Layout>
	)
}

export default Profile
