import { View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { modules } from '../../../data/modules';
import { useStore } from '../../../store/useStore';
import { useEffect } from 'react';

export default function LessonScreen() {
    const { moduleId, lessonId } = useLocalSearchParams();
    const setSelectedModule = useStore((state) => state.setSelectedModule);
    const module = modules[moduleId];
    const lesson = module?.lessons.find(l => l.id === lessonId);

    // Set selected module when navigating directly to a lesson
    useEffect(() => {
        setSelectedModule(moduleId);
    }, [moduleId]);

    if (!lesson) return <Text>Lesson not found</Text>;

    return (
        <ScrollView className="flex-1 p-5">
            <Markdown
                className="text-base"
                style={{
                    heading1: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
                    heading2: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
                }}
            >
                {lesson.title}
            </Markdown>
            <Markdown
                className="text-base"
                style={{
                    body: { fontSize: 16, lineHeight: 24 },
                    heading1: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
                    heading2: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
                    paragraph: { marginVertical: 8 },
                    listItem: { marginLeft: 20 },
                }}
            >
                {lesson.content}
            </Markdown>
        </ScrollView>
    );
}