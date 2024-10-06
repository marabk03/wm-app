import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React from 'react'

interface ButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const Button = ({ title, handlePress, containerStyles = '', textStyles = '', isLoading = false }: ButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-slate-500 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : '' }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button;
