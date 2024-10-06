import { View, Text, FlatList, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScheduleSearch from '~/components/ScheduleSearch';
import { getCurrentUser, getUserClasses, RemoveUserClass, signOut } from '../lib/appwrite';
import ClassCard from '~/components/ClassCard';
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from 'expo-router';
import images from '../../assets/images.png'; 

interface ClassData {
  $id: string;
  title: string;
  description: string;
  instructor: string;
  section: string;
  meets: string;
}

const Home = () => {
  const [userClasses, setUserClasses] = useState<ClassData[]>([]);
  const [refreshing, setIsRefreshing] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  const fetchUserClasses = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.classes) {
        const fullClassDetails: ClassData[] = await getUserClasses();
        setUserClasses(fullClassDetails);
      }
    } catch (error) {
      console.error('Error fetching user classes:', error);
    }
  };

  useEffect(() => {
    fetchUserClasses();
  }, []);

  const handleRemoveClass = async (classId: string) => {
    try {
      await RemoveUserClass(classId);
      fetchUserClasses();
    } catch (error) {
      console.error('Error removing class:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchUserClasses();
    setIsRefreshing(false);
  };

  return (
    <View className='bg-WmGreen h-full'>

      <SafeAreaView>
        <View className='flex-row justify-center'>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out" size={36} color="black" />
          </TouchableOpacity>
          <Text className='text-center font-bold text-white text-3xl pb-5 flex-1 items-start'>Schedule</Text>
          <ScheduleSearch />
        </View>
        {userClasses.length === 0 ? (
          <View className='flex-1 justify-center items-center'>
            <View className="flex-1 justify-center items-center py-[25vh]">
              <Image source={images} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }} />
            </View>
          </View>
        ) : (
          <View className='py-5'>
            <FlatList
              data={userClasses}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <ClassCard item={item} onRemoveClass={() => handleRemoveClass(item.$id)} />
              )}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        )}

      </SafeAreaView>
    </View>
  );
};

export default Home;
