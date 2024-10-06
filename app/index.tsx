import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '~/components/Button';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router'; 
import { useGlobalContext } from './context/GlobalProvider';
import wmlogo from '../assets/wmlogo.png'; 

const Index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/home');  
    }
  }, [isLoading, isLoggedIn]);

  return (
    <View className='bg-WmGreen h-full py-40'>
        <SafeAreaView className='bg-red-500 flex-1'>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
            <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
                WM Campus App
            </Text>
            <Image 
                source={wmlogo} 
                style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }}
                resizeMode='contain' 
            />
            <Button 
                title="Click Here To Continue"
                handlePress={() => router.push('/sign-in')}
                containerStyles='w-full mt-7'
            />
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    </View>
  );
};

export default Index;
