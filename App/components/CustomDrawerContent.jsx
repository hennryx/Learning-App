import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { modules } from '../data/modules';
import { useStore } from '../store/useStore';

export function CustomDrawerContent(props) {
  const selectedModule = useStore((state) => state.selectedModule);
  const setSelectedModule = useStore((state) => state.setSelectedModule);
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <View className="p-5 border-b border-gray-200">
        <Text className="text-xl font-bold">Learning Modules</Text>
      </View>
      
      {Object.entries(modules).map(([moduleKey, moduleData]) => (
        <View key={moduleKey}>
          <TouchableOpacity
            className={`p-4 border-b border-gray-100 ${
              selectedModule === moduleKey ? 'bg-blue-50' : ''
            }`}
            onPress={() => {
              setSelectedModule(
                selectedModule === moduleKey ? null : moduleKey
              );
              router.push(`/module/${moduleKey}`);
            }}
          >
            <Text className="text-base font-medium">{moduleData.title}</Text>
          </TouchableOpacity>

          {selectedModule === moduleKey && (
            <View className="bg-gray-50">
              {moduleData.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lesson/${moduleKey}/${lesson.id}`}
                  asChild
                >
                  <TouchableOpacity className="p-4 pl-8 border-b border-gray-100">
                    <Text className="text-sm">{lesson.title}</Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          )}
        </View>
      ))}
    </DrawerContentScrollView>
  );
}
