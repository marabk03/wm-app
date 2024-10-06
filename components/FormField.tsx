import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: TextInputProps['keyboardType'];
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base'>{title}</Text>
      <View className='border-2 w-full h-16 px-4 bg-white flex-row items-center'>
        <TextInput
          className="flex-1 text-black"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title.toLowerCase() === 'password' && !showPassword} 
          placeholder={`Enter your ${title.toLowerCase()}`}
          placeholderTextColor="#aaa" 
          keyboardType={props.keyboardType}
        />
        {title.toLowerCase() === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text className="text-white">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
