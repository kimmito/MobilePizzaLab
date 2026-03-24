import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma } from '@prisma/client'
import { returnUserObject } from './return-user-object'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService
	) {}

	private isAdminEmail(email: string) {
		const adminEmails = (this.configService.get<string>('ADMIN_EMAILS') || '')
			.split(',')
			.map(item => item.trim().toLowerCase())
			.filter(Boolean)

		return adminEmails.includes(email.toLowerCase())
	}

	async getById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						slug: true,
						image: true,
						category: {
							select: {
								name: true
							}
						}
					}
				},
				...selectObject
			}
		})
		if (!user) throw new NotFoundException('User not found')

		if (this.isAdminEmail(user.email)) {
			return {
				...user,
				isAdmin: true
			}
		}

		return user
	}

	async toggleFavorite(userId: number, productId: number) {
		const user = await this.getById(userId)
		if (!user) throw new NotFoundException('User not found')

		const isExist = user.favorites.some(product => product.id === productId)
		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExist ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})

		return {
			message: isExist
				? 'Product removed from favorites'
				: 'Product added to favorites'
		}
	}
}
