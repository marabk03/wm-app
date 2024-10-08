import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

const ScheduleSearch = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); 

  const handleSearchPress = () => {
    if (!query) {
      return Alert.alert('Missing query', 'Please input something');
    }
    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="flex-row items-center space-x-4 pb-3">
      {!isExpanded && (
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Ionicons name="add" size={36} color="black" />
        </TouchableOpacity>
      )}

      {isExpanded && (
        <View className="border-2 w-full h-16 px-4 bg-white flex-row items-center space-x-4">
          <TextInput
            className="flex-1 text-base text-black"
            value={query}
            onChangeText={(e) => setQuery(e)}
            placeholder="Add a class"
            placeholderTextColor="#CDCDE0"
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search" size={36} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsExpanded(false)}>
            <Ionicons name="close" size={36} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScheduleSearch;
