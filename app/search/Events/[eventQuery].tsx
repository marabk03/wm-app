import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSpecificEvent } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Event = {
  $id: string;
  title: string;
  description: string;
  location: any;
  time: any;
};

const EventQuery = () => {
  const { eventQuery } = useLocalSearchParams<{ eventQuery: string }>();

  const { data: event, refetch, isLoading } = useAppwrite<Event>(() =>
    getSpecificEvent(eventQuery)
  );

  const handleGoBack = () => {
    router.replace('/events');
  };

  return (
    <View className="bg-WmGreen flex-1">
      <SafeAreaView>
        <View className="px-4 py-5 flex-row items-center">
          <TouchableOpacity onPress={handleGoBack} className="pr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          {event && (
            <Text className="text-3xl text-center flex-1 font-bold text-white">
              {event.title}
            </Text>
          )}
        </View>

        {isLoading ? (
          <Text className="text-white text-center mt-5">Loading event...</Text>
        ) : (
          <View className="p-4 space-y-4">
            {event ? (
              <>
                <Text className="text-white text-lg">
                  <Text className="font-bold">Location:</Text> {event.location}
                </Text>
                <Text className="text-white text-lg">
                  <Text className="font-bold">Time:</Text> {event.time}
                </Text>
                <Text className="text-white text-base mt-2">
                  {event.description}
                </Text>
              </>
            ) : (
              <Text className="text-white text-center mt-5">No event found.</Text>
            )}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default EventQuery;
