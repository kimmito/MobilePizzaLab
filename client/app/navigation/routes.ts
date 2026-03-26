import Home from '../screens/home/Home'

import { IRoute } from './navigation.types'
import Cart from '@/screens/cart/Cart'
import Category from '@/screens/category/Category'
import Explorer from '@/screens/explorer/Explorer'
import Favorites from '@/screens/favorites/Favorites'
import Product from '@/screens/product/Product'
import Profile from '@/screens/profile/Profile'
import Search from '@/screens/search/Search'
import Thanks from '@/screens/thanks/Thanks'

export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Favorites',
		component: Favorites
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Explorer',
		component: Explorer
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'Cart',
		component: Cart
	},
	{
		name: 'Category',
		component: Category
	},
	{ name: 'Product', component: Product },
	{ name: 'Thanks', component: Thanks }
]
