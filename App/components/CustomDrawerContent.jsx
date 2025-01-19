import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { modules } from '../data/modules';
import { useStore } from '../store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

export function CustomDrawerContent(props) {
    const selectedModule = useStore((state) => state.selectedModule);
    const setSelectedModule = useStore((state) => state.setSelectedModule);

    const [openDropdowns, setOpenDropdowns] = useState({});
    const router = useRouter();
    const currentPath = usePathname();

    const isLessonActive = (moduleKey, lessonId) => {
        return currentPath === `/lesson/${moduleKey}/${lessonId}`;
    };

    const isModuleActive = (moduleKey) => {
        return currentPath === `/module/${moduleKey}` || currentPath.startsWith(`/lesson/${moduleKey}/`);
    };

    const isQuizActive = () => {
        return currentPath === `/quiz`;
    }

    const dropdownHeights = useRef({}).current;
    const toggleDropdown = (moduleKey, moduleData) => {
        const isCurrentlyOpen = openDropdowns[moduleKey];

        setOpenDropdowns((prev) => ({
            ...prev,
            [moduleKey]: !isCurrentlyOpen,
        }));

        if (!isCurrentlyOpen) {
            dropdownHeights[moduleKey] = new Animated.Value(0);
            Animated.timing(dropdownHeights[moduleKey], {
                toValue: moduleData.lessons.length * 50,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(dropdownHeights[moduleKey], {
                toValue: 0,
                duration: 300,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.flexView}>
                <TouchableOpacity onPress={() => router.push("/")}>
                    <Text style={styles.headerText}>EL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                    style={styles.closeButton}
                >
                    <Ionicons name="close" size={35} color="#E06900" />
                </TouchableOpacity>
            </View>

            {Object.entries(modules).map(([moduleKey, moduleData]) => (
                <View key={moduleKey}>
                    <View style={styles.flexView}>
                        <TouchableOpacity
                            style={[
                                styles.moduleButton,
                                isModuleActive(moduleKey) && styles.activeModuleButton,
                            ]}
                            onPress={() => toggleDropdown(moduleKey, moduleData)}
                        >
                            <Text
                                style={[
                                    styles.moduleText,
                                    isModuleActive(moduleKey) && styles.activeText,
                                ]}
                            >
                                {moduleData.title}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleDropdown(moduleKey, moduleData)}>
                            <Ionicons name={openDropdowns[moduleKey] ? "chevron-down" : "chevron-up"} size={20} color="#E06900" />
                        </TouchableOpacity>
                    </View>

                    {openDropdowns[moduleKey] && (
                        <Animated.View style={{ height: dropdownHeights[moduleKey], overflow: "hidden" }}>
                            <View style={styles.lessonContainer}>
                                {moduleData.lessons.map((lesson) => (
                                    <TouchableOpacity
                                        key={lesson.id}
                                        style={[
                                            styles.lessonButton,
                                            isLessonActive(moduleKey, lesson.id) &&
                                            styles.activeLessonButton,
                                        ]}
                                        onPress={() =>
                                            router.push(
                                                `/lesson/${moduleKey}/${lesson.id}`
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.lessonText,
                                                isLessonActive(moduleKey, lesson.id) &&
                                                styles.activeText,
                                            ]}
                                        >
                                            {lesson.title.split("# ")[1]}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Animated.View>
                    )}
                </View>
            ))}
            <View style={styles.flexView}>
                <TouchableOpacity
                    style={[
                        styles.lessonButton,
                        isQuizActive() && styles.activeModuleButton,
                    ]}
                    onPress={() => router.push("/quiz")}
                >
                    <Text
                        style={[
                            styles.moduleText,
                            isQuizActive() && styles.activeText,
                        ]}
                    >
                        Quiz
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#15026B",
    },
    flexView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    closeButton: {
        padding: 8,
    },
    moduleButton: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    activeModuleButton: {
        backgroundColor: "rgba(224, 105, 0, 0.1)", // Slight orange tint for active module
    },
    moduleText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    lessonContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    lessonButton: {
        padding: 16,
        paddingLeft: 32,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    activeLessonButton: {
        backgroundColor: "rgba(224, 105, 0, 0.1)", // Slight orange tint for active lesson
    },
    lessonText: {
        fontSize: 14,
        color: "#fff",
    },
    activeText: {
        color: "#E06900", // Orange color for active text
        fontWeight: "600",
    },
});