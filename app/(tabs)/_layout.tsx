import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface iconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean; // Updated type to boolean for focused state
}

const TabIcon = ({ icon, color, name, focused }: iconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Ionicons
        name={icon}
        size={24}
        color={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="events"
        
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="calendar" color={color} name="Events" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} name="Home" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
