import useTypedNavigation from "@/hooks/useTypedNavigation";
import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useProfile } from "../profile/useProfile";
import { Pressable, View, Text } from "react-native";

const Header: FC = () => {
  const { navigate } = useTypedNavigation()
  const {profile} = useProfile()

  return(
    <View className='flex-row justify-between items-center'>
      <Text className="text-2xl font-medium">Привет, {profile?.name}!</Text>
      <Pressable onPress={() => navigate('Cart')}>
        <Ionicons name="cart" size={28} color="#374151" className="mr-2"/>
      </Pressable>
    </View>
  )
}

export default Header