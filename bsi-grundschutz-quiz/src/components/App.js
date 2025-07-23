
import React, { useState, useEffect } from 'react';
import '../styles/Blackboard.css';
import StartScreen from './StartScreen';
import CategoryScreen from './CategoryScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import quizData from '../data/quizData';

function App() {
  // Zustandsvariablen
  const [screen, setScreen] = useState('start'); // 'start', 'category', 'quiz', 'results'
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Beim ersten Laden Kategorien initialisieren
  useEffect(() => {
    const availableCategories = Object.keys(quizData.quiz);
    setCategories(availableCategories);
  }, []);

  // Hilfsfunktion zum Mischen eines Arrays
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Zur Kategorieauswahl wechseln
  const handleStart = () => {
    setScreen('category');
  };

  // Quiz mit ausgewählter Kategorie starten
  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    let questions = [];

    if (category === 'random') {
      // Zufällige Fragen aus allen Kategorien
      categories.forEach(cat => {
        const categoryQuestions = Object.keys(quizData.quiz[cat]);
        categoryQuestions.forEach(questionId => {
          questions.push({
            category: cat,
            id: questionId,
            ...quizData.quiz[cat][questionId]
          });
        });
      });

      // Mischen und auf 5 Fragen begrenzen
      questions = shuffleArray(questions).slice(0, 5);
    } else {
      // Alle Fragen aus der gewählten Kategorie
      const categoryQuestions = Object.keys(quizData.quiz[category]);
      questions = categoryQuestions.map(questionId => ({
        category: category,
        id: questionId,
        ...quizData.quiz[category][questionId]
      }));

      // Mischen
      questions = shuffleArray(questions);
    }

    setCurrentQuestions(questions);
    setTotalQuestions(questions.length);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setScreen('quiz');
  };

  // Antwort auswählen/abwählen
  const handleAnswerSelect = (letter) => {
    if (!showFeedback) {
      if (selectedAnswers.includes(letter)) {
        // Wenn bereits ausgewählt, Auswahl aufheben
        setSelectedAnswers(prev => prev.filter(item => item !== letter));
      } else {
        // Sonst auswählen
        setSelectedAnswers(prev => [...prev, letter]);
      }
    }
  };

  // Antwort überprüfen
  const handleSubmit = () => {
    setShowFeedback(true);

    const currentQuestion = currentQuestions[currentQuestionIndex];
    const correctAnswerLetters = currentQuestion.right;

    // Prüfen, ob alle richtigen Antworten ausgewählt wurden und keine falschen
    const allCorrectSelected = correctAnswerLetters.every(letter =>
        selectedAnswers.includes(letter));
    const noIncorrectSelected = selectedAnswers.every(letter =>
        correctAnswerLetters.includes(letter));

    if (allCorrectSelected && noIncorrectSelected) {
      setScore(prev => prev + 1);
    }
  };

  // Zur nächsten Frage
  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
    } else {
      setScreen('results');
    }
  };

  // Quiz neu starten
  const handleRestart = () => {
    setScreen('start');
    setCurrentCategory(null);
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setScore(0);
    setTotalQuestions(0);
  };

  // Berechnung des Fortschritts
  const progress = totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  return (
      <div className="blackboard">
        <div className="chalk-dust"></div>

        {screen === 'start' && (
            <StartScreen onStart={handleStart} />
        )}

        {screen === 'category' && (
            <CategoryScreen
                categories={categories}
                onCategorySelect={handleCategorySelect}
                onRandomSelect={() => handleCategorySelect('random')}
            />
        )}

        {screen === 'quiz' && currentQuestions.length > 0 && (
            <QuizScreen
                category={currentQuestions[currentQuestionIndex].category}
                question={currentQuestions[currentQuestionIndex].question}
                answers={currentQuestions[currentQuestionIndex].answers}
                selectedAnswers={selectedAnswers}
                correctAnswers={currentQuestions[currentQuestionIndex].right}
                showFeedback={showFeedback}
                isCorrect={showFeedback &&
                    currentQuestions[currentQuestionIndex].right.every(letter =>
                        selectedAnswers.includes(letter)) &&
                    selectedAnswers.every(letter =>
                        currentQuestions[currentQuestionIndex].right.includes(letter))}
                progress={progress}
                onAnswerSelect={handleAnswerSelect}
                onSubmit={handleSubmit}
                onNext={handleNext}
            />
        )}

        {screen === 'results' && (
            <ResultsScreen
                score={score}
                totalQuestions={totalQuestions}
                onRestart={handleRestart}
            />
        )}
      </div>
  );
}

export default App;

