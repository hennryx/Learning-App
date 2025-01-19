import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { modules } from '../data/modules';
import { useStore } from '../store/useStore';
import { Ionicons } from '@expo/vector-icons';

export function CustomDrawerContent(props) {
    const selectedModule = useStore((state) => state.selectedModule);
    const setSelectedModule = useStore((state) => state.setSelectedModule);
    const router = useRouter();
    const currentPath = usePathname();

    const isLessonActive = (moduleKey, lessonId) => {
        return currentPath === `/lesson/${moduleKey}/${lessonId}`;
    };

    const isModuleActive = (moduleKey) => {
        return currentPath === `/module/${moduleKey}` || currentPath.startsWith(`/lesson/${moduleKey}/`);
    };

    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.flexView}>
                <Text style={styles.headerText}>EL</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                    style={styles.closeButton}
                >
                    <Ionicons name="close" size={35} color="#E06900" />
                </TouchableOpacity>
            </View>

            {Object.entries(modules).map(([moduleKey, moduleData]) => (
                <View key={moduleKey}>
                    <TouchableOpacity
                        style={[
                            styles.moduleButton,
                            isModuleActive(moduleKey) && styles.activeModuleButton
                        ]}
                        onPress={() => {
                            setSelectedModule(
                                selectedModule === moduleKey ? null : moduleKey
                            );
                            router.push(`/module/${moduleKey}`);
                        }}
                    >
                        <Text style={[
                            styles.moduleText,
                            isModuleActive(moduleKey) && styles.activeText
                        ]}>
                            {moduleData.title}
                        </Text>
                    </TouchableOpacity>

                    {selectedModule === moduleKey && (
                        <View style={styles.lessonContainer}>
                            {moduleData.lessons.map((lesson) => (
                                <TouchableOpacity
                                    key={lesson.id}
                                    style={[
                                        styles.lessonButton,
                                        isLessonActive(moduleKey, lesson.id) && styles.activeLessonButton
                                    ]}
                                    onPress={() => router.push(`/lesson/${moduleKey}/${lesson.id}`)}
                                >
                                    <Text style={[
                                        styles.lessonText,
                                        isLessonActive(moduleKey, lesson.id) && styles.activeText
                                    ]}>
                                        {lesson.title.split("# ")[1]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#15026B',
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    closeButton: {
        padding: 8,
    },
    moduleButton: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeModuleButton: {
        backgroundColor: 'rgba(224, 105, 0, 0.1)', // Slight orange tint for active module
    },
    moduleText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    lessonContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    lessonButton: {
        padding: 16,
        paddingLeft: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeLessonButton: {
        backgroundColor: 'rgba(224, 105, 0, 0.1)', // Slight orange tint for active lesson
    },
    lessonText: {
        fontSize: 14,
        color: '#fff',
    },
    activeText: {
        color: '#E06900', // Orange color for active text
        fontWeight: '600',
    },
});