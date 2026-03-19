import React, { FC } from 'react'

import Button from '@/components/ui/button/Button'

interface IAddToCartButton {
	productId: number
}

const AddToCartButton: FC<IAddToCartButton> = ({ productId }) => {
	return <Button className='mt-6'>Добавить в корзину</Button>
}

export default AddToCartButton
