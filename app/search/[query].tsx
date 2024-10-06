import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SeachClasses, UserAddClass } from '../lib/appwrite';
import useAppwrite from '../lib/useAppwrite';
import { Ionicons } from '@expo/vector-icons';
import ClassCard from '~/components/ClassCard';
import { useNavigation } from '@react-navigation/native';
import { Link, router } from 'expo-router';
import Button from '~/components/Button';

const search = () => {
  const { query } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: classes, refetch } = useAppwrite(() => 
    SeachClasses(query)
  );

  const handleGoBack = () => {
    router.replace('/home');
  };
  
  const handleAddClass = async (classId: string) => {
    try {
      await UserAddClass(classId); 
    } catch (error) {
      console.error('Error adding class:', error);
      
    }
  };
  return (
    <View className='bg-WmGreen h-full'>
      <SafeAreaView>
        <View className='pb-5 flex-row '>
          <TouchableOpacity  onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className='text-3xl text-center items-center font-bold flex text-white'>Displaying results for "{query}"</Text>
        </View>
        <FlatList
          data={classes}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ClassCard
              item={item}
              onAddClass={handleAddClass} 
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};
  export default search