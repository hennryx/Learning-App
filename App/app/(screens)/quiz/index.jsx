import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import { scienceQuiz } from '@/data/questions';
import { useRouter } from 'expo-router';
import SpaceBackground from '@/components/SpaceBackground'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const Quiz = () => {
    const [quizState, setQuizState] = useState('initial');
    const [countdown, setCountdown] = useState(5);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const shuffledQuestions = [...scienceQuiz].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
    }, []);

    useEffect(() => {
        if (quizState === 'countdown' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (quizState === 'countdown' && countdown === 0) {
            setQuizState('question');
        }
    }, [countdown, quizState]);

    const isAnswerCorrect = () => {
        const currentQuestion = questions[currentQuestionIndex];

        switch (currentQuestion.type) {
            case 'True or False':
                return selectedAnswer === currentQuestion.correctAnswer;
            case 'Multiple Choice':
            case 'Vocabulary Word List':
            case 'Fill in the Blanks':
                return selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
            default:
                return false;
        }
    };

    const getCorrectAnswerDisplay = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.type === 'True or False'
            ? currentQuestion.correctAnswer.toString()
            : currentQuestion.correctAnswer;
    };

    const isAnswerValid = () => {
        if (selectedAnswer === null) return false;

        const currentQuestion = questions[currentQuestionIndex];

        switch (currentQuestion.type) {
            case 'Multiple Choice':
            case 'True or False':
                return selectedAnswer !== null;
            case 'Vocabulary Word List':
            case 'Fill in the Blanks':
                return selectedAnswer.trim() !== '';
            default:
                return false;
        }
    };

    const startQuiz = () => {
        setQuizState('countdown');
    };

    const handleAnswer = (answer) => {
        if (!isAnswerSubmitted) {
            setSelectedAnswer(answer);
        }
    };

    const checkAnswer = () => {
        if (isAnswerCorrect()) {
            setScore(score + 1);
        }
        setShowFeedback(true);
        setIsAnswerSubmitted(true);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setIsAnswerSubmitted(false);
        } else {
            setQuizState('result');
        }
    };

    const renderQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];

        switch (currentQuestion.type) {
            case 'Multiple Choice':
                return (
                    <View>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedAnswer === option && styles.selectedOption,
                                    isAnswerSubmitted && selectedAnswer === option &&
                                    (option === currentQuestion.correctAnswer ? styles.correctAnswer : styles.wrongAnswer)
                                ]}
                                onPress={() => handleAnswer(option)}
                                disabled={isAnswerSubmitted}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            case 'True or False':
                return (
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedAnswer === true && styles.selectedOption,
                                isAnswerSubmitted && selectedAnswer === true &&
                                (currentQuestion.correctAnswer === true ? styles.correctAnswer : styles.wrongAnswer)
                            ]}
                            onPress={() => handleAnswer(true)}
                            disabled={isAnswerSubmitted}
                        >
                            <Text style={styles.optionText}>True</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedAnswer === false && styles.selectedOption,
                                isAnswerSubmitted && selectedAnswer === false &&
                                (currentQuestion.correctAnswer === false ? styles.correctAnswer : styles.wrongAnswer)
                            ]}
                            onPress={() => handleAnswer(false)}
                            disabled={isAnswerSubmitted}
                        >
                            <Text style={styles.optionText}>False</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 'Vocabulary Word List':
            case 'Fill in the Blanks':
                return (
                    <TextInput
                        style={[
                            styles.input,
                            isAnswerSubmitted &&
                            (selectedAnswer?.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
                                ? styles.correctAnswer
                                : styles.wrongAnswer)
                        ]}
                        value={selectedAnswer || ''}
                        onChangeText={handleAnswer}
                        placeholder="Type your answer"
                        editable={!isAnswerSubmitted}
                    />
                );
        }
    };

    const renderInitialScreen = () => {
        return (
            <>
                <Image
                    source={require('@/assets/homeAssets/atom.png')}
                    style={{
                        position: "absolute",
                        height: screenWidth * 0.15,
                        width: screenWidth * 0.15,
                        objectFit: "contain",
                        top: "10%",
                        left: "25%",
                    }}
                />

                <View style={styles.circleContainer}>

                    <Image
                        source={require('@/assets/homeAssets/hidding-boy.png')}
                        style={{
                            position: "absolute",
                            height: screenHeight * 0.25,
                            width: screenHeight * 0.2,
                            objectFit: "contain",
                            top: "0%",
                            left: "-5%",
                        }}
                    />
                    <Text style={styles.titleText}>Quiz Time!</Text>
                </View>

                <TouchableOpacity
                    key='science101'
                    style={styles.button}
                    onPress={startQuiz}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: screenWidth * 0.05,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        Start
                    </Text>

                </TouchableOpacity>

                <Image
                    source={require('@/assets/homeAssets/space-boy.png')}
                    style={{
                        position: "absolute",
                        height: screenWidth * 0.5,
                        width: screenWidth * 0.5,
                        bottom: "12%",
                        right: "0%",
                        transform: "scaleX(-1)",
                        rotate: '-30deg',
                        zIndex: "-10"
                    }}
                />

                <Image
                    source={require('@/assets/homeAssets/red-double-ring-plannet.png')}
                    style={{
                        position: "absolute",
                        height: screenWidth * 0.2,
                        width: screenWidth * 0.2,
                        objectFit: "contain",
                        bottom: "5%",
                        right: "25%",
                    }}
                />

                <Image
                    source={require('@/assets/homeAssets/yellow-ring-plannet.png')}
                    style={{
                        position: "absolute",
                        height: screenWidth * 0.3,
                        width: screenWidth * 0.3,
                        objectFit: "contain",
                        bottom: "0",
                        left: "10%",
                    }}
                />
            </>
        )
    }

    if (quizState === 'initial') {
        return (
            <View style={styles.containerInitial}>
                <SpaceBackground />
                {renderInitialScreen()}
            </View>
        );
    }

    if (quizState === 'countdown') {
        return (
            <View style={styles.container}>
                <Text style={styles.countdownText}>{countdown}</Text>
            </View>
        );
    }

    if (quizState === 'result') {
        return (
            <View style={styles.container}>
                <SpaceBackground />
                <Text style={styles.resultText}>Quiz Complete!</Text>
                <Text style={styles.scoreText}>
                    Your Score: {score} out of {questions.length}
                </Text>
                <Text style={[styles.percentageText, { color: `${((score / questions.length) * 100).toFixed(1) > 75 ? '#13EB2C' : '#EB1316'}` }]}>
                    Percentage: {((score / questions.length) * 100).toFixed(1)}%
                </Text>
                <TouchableOpacity
                    style={[styles.button, {
                        marginTop: '1rem'
                    }]}
                    onPress={() => {
                        router.push("/")
                        setQuizState('initial')
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: screenWidth * 0.04,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                    >
                        Go back Home
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.questionNumber}>
                Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.questionText}>
                {questions[currentQuestionIndex]?.question}
            </Text>

            {renderQuestion()}

            {showFeedback && (
                <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackText}>
                        {isAnswerCorrect()
                            ? "Correct!"
                            : `Incorrect. The correct answer is: ${getCorrectAnswerDisplay()}`}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={[
                    styles.nextButton,
                    (!isAnswerValid() && !showFeedback) && styles.disabledButton
                ]}
                disabled={!isAnswerValid() && !showFeedback}
                onPress={showFeedback ? nextQuestion : checkAnswer}
            >
                <Text style={styles.nextButtonText}>
                    {showFeedback ? "Next Question" : "Submit Answer"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#15026B",
    },
    startButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    countdownText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#333',
    },
    questionNumber: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        width: '100%',
    },
    selectedOption: {
        backgroundColor: '#90CAF9',
    },
    correctAnswer: {
        backgroundColor: '#A5D6A7',  // Light green
    },
    wrongAnswer: {
        backgroundColor: '#EF9A9A',  // Light red
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    nextButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    feedbackContainer: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
    },
    feedbackText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#fff"
    },
    scoreText: {
        fontSize: 20,
        marginBottom: 10,
        color: "#fff"
    },
    percentageText: {
        fontSize: 18,
    },
    titleText: {
        color: "#fff",
        fontSize: screenWidth * 0.07,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: '20%',
        marginLeft: '10%',
        textShadow: '2px 2px 5px black'
    },
    circleContainer: {
        position: "relative",
        borderRadius: "50%",
        height: screenHeight / 3,
        width: screenHeight / 3,
        backgroundColor: "#280BA7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#E06900",
        paddingVertical: screenHeight * 0.015,
        paddingHorizontal: screenWidth * 0.12,
        borderRadius: screenWidth * 0.02,
        boxShadow: '0 8px 10px rgba(0, 0, 0, 0.25)'
    },
    containerInitial: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#15026B",
        position: "relative",
        gap: 20
    },
});

export default Quiz;