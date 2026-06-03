import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
  Alert, /* Want to display an alert when user wants to quit quiz. */
} from 'react-native';
import questions from '../data/questions';


//TODO: Every SafeAreaView needs to get replaced with another react component. Deprecated next release.

export default function QuizScreen() {
  const [phase, setPhase] = useState('splash');
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const splashAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Splash screen animation
  useEffect(() => {
    if (phase === 'splash') {
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(splashAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(200),
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase]);

  // Question fade in
  useEffect(() => {
    if (phase === 'quiz') {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [currentQ, phase]);

  const handleBegin = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('results');
    }
  };

  const handleQuit = () => {
    Alert.alert(
      'Quiz Quiz?', 
      'Your progress will be lose. Are you sure?'),
      [
        {text: 'Keep Going'},
        {
          text: 'Quit',
          style: 'destructive',
          onPress: () => {
            setPhase('splash');
            setCurrentQ(0);
            setUserAnswers([]);
            setSelectedAnswer(null);
            splashAnim.setValue(0);
            scaleAnim.setValue(0);
            bounceAnim.setValue(0);
          }
        },

      ]
  }
  const handleRetry = () => {
    setPhase('splash');
    setCurrentQ(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    splashAnim.setValue(0);
    scaleAnim.setValue(0.8);
    bounceAnim.setValue(0);
  };

  // ── SPLASH SCREEN ──
  if (phase === 'splash') {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <Animated.Text
          style={[
            styles.splashTitle,
            {
              opacity: splashAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          🚦 QUIZ TIME!
        </Animated.Text>
        <Text style={styles.splashSubtitle}>California DMV Practice Exam</Text>
        <Animated.View
          style={{
            opacity: bounceAnim,
            transform: [{ scale: bounceAnim }],
          }}
        >
          <TouchableOpacity style={styles.beginButton} onPress={handleBegin}>
            <Text style={styles.beginButtonText}>Let's Begin!</Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.splashHint}>{questions.length} questions • No time limit</Text>
      </SafeAreaView>
    );
  }

  // ── RESULTS SCREEN ──
  if (phase === 'results') {
    const score = userAnswers.filter(
      (ans, i) => ans === questions[i].correct
    ).length;
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultsScroll}>
          <Text style={styles.resultsTitle}>
            {passed ? '🎉 You Passed!' : '😅 Keep Practicing!'}
          </Text>
          <View style={[styles.scoreBadge, { backgroundColor: passed ? '#22C55E' : '#EF4444' }]}>
            <Text style={styles.scoreNumber}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>
              {score} / {questions.length} correct
            </Text>
          </View>

          <Text style={styles.reviewTitle}>Question Review</Text>
          {questions.map((q, i) => {
            const isCorrect = userAnswers[i] === q.correct;
            return (
              <View
                key={q.id}
                style={[
                  styles.reviewCard,
                  { borderLeftColor: isCorrect ? '#22C55E' : '#EF4444' },
                ]}
              >
                <Text style={styles.reviewQuestion}>
                  {isCorrect ? '✅' : '❌'} {q.question}
                </Text>
                <Text style={styles.reviewCorrect}>
                  Correct answer: {q.answers[q.correct]}
                </Text>
                {!isCorrect && (
                  <Text style={styles.reviewWrong}>
                    Your answer: {q.answers[userAnswers[i]]}
                  </Text>
                )}
              </View>
            );
          })}

          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>🔁 Try Again</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── QUIZ SCREEN ──
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    /* // NEED TO REPLACE SAFEAREAVIEW since it is deprecated!!*/
    <SafeAreaView style={styles.container}>  
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQ + 1} / {questions.length}
        </Text>
      </View>

      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{question.question}</Text>

        {question.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index && styles.answerSelected,
            ]}
            onPress={() => handleAnswer(index)}
          >
            <View style={[
              styles.answerCircle,
              selectedAnswer === index && styles.answerCircleSelected,
            ]}>
              <Text style={[
                styles.answerCircleText,
                selectedAnswer === index && styles.answerCircleTextSelected,
              ]}>
                {['A', 'B', 'C', 'D'][index]}
              </Text>
            </View>
            <Text style={[
              styles.answerText,
              selectedAnswer === index && styles.answerTextSelected,
            ]}>
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <TouchableOpacity
        style={[styles.nextButton, selectedAnswer === null && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={selectedAnswer === null}
      >
        <Text style={styles.nextButtonText}>
          {currentQ + 1 === questions.length ? 'See Results 🎯' : 'Next Question →'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Shared
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  // Splash
  splashContainer: {
    flex: 1,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#BFDBFE',
    marginBottom: 48,
    textAlign: 'center',
  },
  beginButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  beginButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  splashHint: {
    fontSize: 14,
    color: '#BFDBFE',
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    minWidth: 40,
  },

  // Question
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 28,
    lineHeight: 32,
  },

  // Answers
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  answerSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  answerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  answerCircleSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  answerCircleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748B',
  },
  answerCircleTextSelected: {
    color: '#ffffff',
  },
  answerText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
    lineHeight: 22,
  },
  answerTextSelected: {
    color: '#1E40AF',
    fontWeight: '600',
  },

  // Next button
  nextButton: {
    backgroundColor: '#2563EB',
    margin: 20,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Results
  resultsScroll: {
    padding: 20,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreBadge: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    width: '100%',
    borderLeftWidth: 4,
  },
  reviewQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
    lineHeight: 22,
  },
  reviewCorrect: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '500',
  },
  reviewWrong: {
    fontSize: 13,
    color: '#EF4444',
    marginTop: 2,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 24,
    marginBottom: 40,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});