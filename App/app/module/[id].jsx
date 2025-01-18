import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { modules } from '../../data/modules';

export default function ModuleScreen() {
  const { id } = useLocalSearchParams();
  const module = modules[id];

  if (!module) return <Text>Module not found</Text>;

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-2">{module.title}</Text>
      <Text className="text-base text-gray-600 mb-6">{module.description}</Text>
      
      <View className="mt-6">
        {module.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lesson/${id}/${lesson.id}`}
            asChild
          >
            <TouchableOpacity className="p-3 bg-gray-50 rounded-md mb-2">
              <Text className="text-sm font-medium">{lesson.title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}