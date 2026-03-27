import useTypedNavigation from "@/hooks/useTypedNavigation";
import { FC } from "react";
import Button from "@/components/ui/button/Button";
import { useCart } from "@/hooks/useCard";
import React from "react";


export const GoToCartButton: FC = () => {

  const {navigate} = useTypedNavigation()
  const {total} = useCart()
  return((total >= 1) ? <Button className='w-[300px] mt-20 bg-green-950' onPress={() => navigate('Cart')}>Перейти в корзину</Button> : null)
  
}

export default GoToCartButton