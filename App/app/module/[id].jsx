import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { modules } from '../../data/modules';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModuleScreen() {
    const { id } = useLocalSearchParams();
    const module = modules[id];
    const router = useRouter()

    if (!module) return <Text>Module not found</Text>;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#15026B' }}>
            <View style={{ flex: 1, padding: 5, backgroundColor: '#15026B', height: "100%" }}>
                <Text className="text-2xl font-bold mb-2 text-white" style={{ color: "#fff" }} >{module.title}</Text>
                <Text className="text-base text-white mb-6" >{module.description}</Text>

                <View className="mt-6">
                    {module.lessons.map((lesson) => (
                        <TouchableOpacity
                            key={lesson.id}
                            onPress={() => router.push(`/lesson/${id}/${lesson.id}`)}
                            className="p-3 bg-white/10 rounded-md mb-2"
                        >
                            <Text className="text-sm font-medium text-white" style={{ color: "#fff" }}>
                                {lesson.title.split("# ")[1]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}