import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { modules } from '../data/modules';
import { useStore } from '../store/useStore';

export default function Home() {
  const setSelectedModule = useStore((state) => state.setSelectedModule);

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-4">Welcome to Learning App</Text>
      <Text className="text-lg text-gray-600 mb-6">Choose a module to begin</Text>
      
      {Object.entries(modules).map(([key, module]) => (
        <Link
          key={key}
          href={`/module/${key}`}
          asChild
        >
          <TouchableOpacity 
            className="p-4 bg-gray-100 rounded-lg mb-3"
            onPress={() => setSelectedModule(key)}
          >
            <Text className="text-base font-medium">{module.title}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
