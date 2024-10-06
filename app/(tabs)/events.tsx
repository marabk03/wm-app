import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getEvents } from '../lib/appwrite';
import EventCard from '~/components/EventCard';
import { router } from 'expo-router';

interface EventData {
  $id: string;
  title: string;
  description?: string;
  instructor?: string;
  section?: string;
  meets?: string;
}

const Events = () => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [refreshing, setIsRefreshing] = useState(false);

  const fetchAllEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEventsData(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchAllEvents();
    setIsRefreshing(false);
  };

  const handleCardPress = (eventId: string) => {
    router.push({
      pathname: '/search/Events/[eventQuery]',
      params: { eventQuery: eventId },
    });
  };

  return (
    <View className="bg-WmGreen h-full">
      <SafeAreaView>
        {eventsData.length === 0 ? (
          <Text className="text-bold">No events available</Text>
        ) : (
          <View className="py-5">
            <Text className="text-center text-white text-3xl pb-5">Events</Text>
            <FlatList
              data={eventsData}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <EventCard
                  item={item}
                  onHandlePress={() => handleCardPress(item.$id)}
                />
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

export default Events;
