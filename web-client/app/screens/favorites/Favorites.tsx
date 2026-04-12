import React, { FC } from 'react'

import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/layout'

import { useProfile } from '../profile/useProfile'

const Favorites: FC = () => {
	const { profile } = useProfile()
	return (
		<Layout>
			<Catalog title='Избранное' products={profile?.favorites || []} />
		</Layout>
	)
}

export default Favorites
