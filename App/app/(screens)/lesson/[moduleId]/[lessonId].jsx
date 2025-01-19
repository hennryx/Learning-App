import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { modules } from '../../../../data/modules';
import { useStore } from '../../../../store/useStore';
import { useEffect } from 'react';
import SpaceBackground from '@/components/SpaceBackground';

export default function LessonScreen() {
    const { moduleId, lessonId } = useLocalSearchParams();
    const setSelectedModule = useStore((state) => state.setSelectedModule);
    const module = modules[moduleId];
    const lesson = module?.lessons.find(l => l.id === lessonId);

    useEffect(() => {
        setSelectedModule(moduleId);
    }, [moduleId]);

    if (!lesson) return <Text>Lesson not found</Text>;

    return (
        <ScrollView className="flex-1" style={styles.container}>
            <SpaceBackground />
            <View style={styles.contentContainer}>
                <View style={styles.section}>
                    <Markdown
                        style={{...markdownStyles}}
                    >
                        {lesson.title}
                    </Markdown>
                </View>
                
                <View style={[styles.section, styles.sectionHeight]}>
                    <Markdown
                        style={{...markdownStyles}}
                    >
                        {lesson.content}
                    </Markdown>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15026B',
    },
    contentContainer: {
        gap: 10,
    },
    section: {
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        borderRadius: 8,
        padding: 16,
    },

    sectionHeight: {
        height: '100%'
    }
});

const markdownStyles = StyleSheet.create({
    body: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        backgroundColor: 'transparent',
    },
    heading1: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        backgroundColor: 'transparent',
    },
    heading2: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
    heading3: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 6,
        backgroundColor: 'transparent',
    },
    heading4: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4,
        backgroundColor: 'transparent',
    },
    heading5: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 2,
        backgroundColor: 'transparent',
    },
    heading6: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 2,
        backgroundColor: 'transparent',
    },
    paragraph: {
        color: '#fff',
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
    listItem: {
        color: '#fff',
        marginLeft: 20,
        backgroundColor: 'transparent',
    },
    link: {
        color: '#E06900',
        textDecorationLine: 'underline',
    },
    blockquote: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderLeftColor: '#E06900',
        borderLeftWidth: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    code_inline: {
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    code_block: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 4,
        color: '#fff',
        fontFamily: 'monospace',
    },
    table: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
    },
    tr: {
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1,
    },
    th: {
        color: '#fff',
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    td: {
        color: '#fff',
        padding: 8,
    },
    hr: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 1,
        marginVertical: 10,
    },
    bullet_list: {
        color: '#fff',
    },
    ordered_list: {
        color: '#fff',
    },
    em: {
        color: '#fff',
        fontStyle: 'italic',
    },
    strong: {
        color: '#fff',
        fontWeight: 'bold',
    },
    del: {
        color: '#fff',
        textDecorationLine: 'line-through',
    },
    image: {
        maxWidth: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});