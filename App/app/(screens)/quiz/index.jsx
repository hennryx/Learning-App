import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { scienceQuiz } from '@/data/questions';
import { useRouter } from 'expo-router';

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

    if (quizState === 'initial') {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
                    <Text style={styles.startButtonText}>Start Quiz</Text>
                </TouchableOpacity>
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
                <Text style={styles.resultText}>Quiz Complete!</Text>
                <Text style={styles.scoreText}>
                    Your Score: {score} out of {questions.length}
                </Text>
                <Text style={styles.percentageText}>
                    Percentage: {((score / questions.length) * 100).toFixed(1)}%
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push("/")
                        setQuizState('initial')
                    }}
                >
                    <Text>Go back Home</Text>
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
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    scoreText: {
        fontSize: 20,
        marginBottom: 10,
    },
    percentageText: {
        fontSize: 18,
        color: '#666',
    },
});

export default Quiz;