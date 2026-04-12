import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import React from 'react'

import { UserService } from '@/services/user.service'

import { useProfile } from '../profile/useProfile'

import ProductButton from './ProductButton'

interface IFavoriteButton {
	productId: number
}

const FavoriteButton: FC<IFavoriteButton> = ({ productId }) => {
	const { profile } = useProfile()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => UserService.toggleFavorite(productId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	if (!profile) return null
	const isExist = profile.favorites.some(favorite => favorite.id === productId)

	return (
		<ProductButton onPress={() => mutate()}>
			{isExist ? (
				<MaterialCommunityIcons name='heart' size={24} color='red' />
			) : (
				<MaterialCommunityIcons
					name='heart-outline'
					size={22}
					color='#DC3F41'
				/>
			)}
		</ProductButton>
	)
}

export default FavoriteButton
