import { View, ScrollView, Modal, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { modules } from '../../../../data/modules';
import { useStore } from '../../../../store/useStore';
import { useEffect, useRef, useState } from 'react';
import SpaceBackground from '@/components/SpaceBackground';
import { Ionicons } from '@expo/vector-icons';

const imageMap = {
    'figure1.png': require('@/assets/science/figure1.png'),
    'figure2.png': require('@/assets/science/figure2.png'),
    'figure3.png': require('@/assets/science/figure3.png'),
    'figure4.png': require('@/assets/science/figure4.png'),
    'figure5.png': require('@/assets/science/figure5.png'),
    'figure6.png': require('@/assets/science/figure6.png'),
    'figure7.png': require('@/assets/science/figure7.png'),
    'mountain.png': require('@/assets/science/mountain.png'),
    'earthquake.png': require('@/assets/science/earthquake.png'),
    'boundaries.png': require('@/assets/science/boundaries.png'),
};

export default function LessonScreen() {
    const { moduleId, lessonId } = useLocalSearchParams();
    const setSelectedModule = useStore((state) => state.setSelectedModule);
    const module = modules[moduleId];
    const lesson = module?.lessons.find(l => l.id === lessonId);
    const router = useRouter();
    const scrollViewRef = useRef(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedModule(moduleId);
    }, [moduleId]);

    if (!lesson) return <Text>Lesson not found</Text>;

    const currentLessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    const previousLesson = module.lessons[currentLessonIndex - 1];
    const nextLesson = module.lessons[currentLessonIndex + 1];

    const navigateToLesson = (targetLesson) => {
        if (targetLesson) {
            router.push(`/lesson/${moduleId}/${targetLesson.id}`);
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    };

    const handleImagePress = (source) => {
        console.log(source);
        setSelectedImage(source);  // Set the selected image when pressed
        setModalVisible(true);  // Show the modal
    };

    const handleCloseModal = () => {
        setModalVisible(false);  // Close the modal
        setSelectedImage(null);  // Reset the selected image
    };

    const markdownRules = {
        image: (node) => {
            const imageName = node.attributes.src.split('/').pop();
            const source = imageMap[imageName] || { uri: node.attributes.src };

            return (
                <TouchableOpacity
                    key={node.key}
                    onPress={() => {
                        console.log('Image pressed');
                        handleImagePress(source);
                    }}
                    style={styles.lessonImage}

                >
                    <Image
                        source={source}
                        style={styles.lessonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
                <SpaceBackground />
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Markdown style={{ ...markdownStyles }}>
                            {lesson.title}
                        </Markdown>
                    </View>

                    <View style={[styles.section, styles.sectionHeight]}>
                        <Markdown
                            style={{ ...markdownStyles }}
                            rules={markdownRules}
                        >
                            {lesson.content}
                        </Markdown>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={styles.modalOverlay}>
                        <Image
                            source={selectedImage}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    style={[
                        styles.navigationButton,
                        !previousLesson && styles.navigationButtonDisabled
                    ]}
                    onPress={() => navigateToLesson(previousLesson)}
                    disabled={!previousLesson}
                >
                    <Ionicons name="chevron-back" size={24} color={previousLesson ? "#E06900" : "#666"} />
                    <Text style={[
                        styles.navigationText,
                        !previousLesson && styles.navigationTextDisabled
                    ]}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navigationButton,
                        !nextLesson && styles.navigationButtonDisabled
                    ]}
                    onPress={() => navigateToLesson(nextLesson)}
                    disabled={!nextLesson}
                >
                    <Text style={[
                        styles.navigationText,
                        !nextLesson && styles.navigationTextDisabled
                    ]}>Next</Text>
                    <Ionicons name="chevron-forward" size={24} color={nextLesson ? "#E06900" : "#666"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15026B',
    },
    contentContainer: {
        paddingBottom: 80,
    },
    section: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        borderRadius: 8,
        padding: 16,
    },

    sectionHeight: {
        height: '100%'
    },
    lessonImage: {
        width: '100%',
        height: 250,
        marginVertical: 10,
        borderRadius: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    navigationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'rgba(21, 2, 107, 0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    navigationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(224, 105, 0, 0.1)',
        minWidth: 120,
        justifyContent: 'center',
    },
    navigationButtonDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    navigationText: {
        color: '#E06900',
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 8,
    },
    navigationTextDisabled: {
        color: '#666',
    },
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
    /* strong: {
        color: '#fff',
        fontWeight: 'bold',
    },
    blockquote: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderLeftColor: '#E06900',
        borderLeftWidth: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
    }, */
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
    del: {
        color: '#fff',
        textDecorationLine: 'line-through',
    },
    image: {
        maxWidth: '100%',
        height: 200,
        resizeMode: 'contain',
    }
});