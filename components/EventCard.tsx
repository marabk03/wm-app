import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EventData {
  $id: string;
  title: string;
  description?: string;
  location?: string;
  time?: string;
}

interface EventCardProps {
  item: EventData;
  onHandlePress?: (classId: string) => void;
}

const EventCard = ({ item, onHandlePress }: EventCardProps) => {
  return (
    <TouchableOpacity
      className="bg-white min-h-50 w-full px-5 py-3 rounded-lg mb-4"
      onPress={() => onHandlePress?.(item.$id)}
    >
      <View className="flex-row justify-between items-center text-center pb-3">
        <Text className="text-2xl">{item.title || 'No title available'}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-base">{item.description || 'No description available'}</Text>
        <Text className="px-5 text-base">{item.location || 'No location available'}</Text>
        <Text className="text-base">{item.time || 'No time available'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
