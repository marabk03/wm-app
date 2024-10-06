import { View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ClassData {
  $id: string;
  code: string;
  title: string;
  instructor: string;
  meets: string;
  section: string;
}

interface ClassCardProps {
  item: ClassData;
  onAddClass?: (classId: string) => void;
  onRemoveClass?: (classId: string) => void;
}

const ClassCard = ({ item, onAddClass, onRemoveClass }: ClassCardProps) => {
  const handleAddClass = (classId: string) => {
    Alert.alert(
      "Class Added",
      `You have added ${item.title || 'this class'} to your schedule.`,
      [{ text: "OK" }]
    );
    if (onAddClass) {
      onAddClass(classId);
    }
  };

  return (
    <View className='bg-white min-h-50 max-w-85 w-full px-5 py-3 rounded-lg mb-4'>
      <View className='flex-row justify-between items-center pb-3'>
        <View className='flex-1 flex-row items-center'>
          <Text className='text-2xl pr-5'>{item.code || 'No code available'}</Text>
          <Text className='text-xl truncate flex-1'>{item.title || 'No title available'}</Text>
        </View>

        <View className='flex-row items-center'>
          {onAddClass && (
            <Ionicons
              name="add"
              size={24}
              color="black"
              onPress={() => handleAddClass(item.$id)}
              className='mr-4'
            />
          )}
          {onRemoveClass && (
            <Ionicons
              name="remove"
              size={24}
              color="black"
              onPress={() => onRemoveClass(item.$id)} 
            />
          )}
        </View>
      </View>

      <View className='flex-row justify-between items-center'>
        <Text className='text-base'>Section: {item.section || 'No section available'}</Text>
        <Text className='px-5 text-base'>{item.instructor || 'No instructor available'}</Text>
        <Text className='text-base'>{item.meets || 'No meeting times available'}</Text>
      </View>
    </View>
  );
};

export default ClassCard;
