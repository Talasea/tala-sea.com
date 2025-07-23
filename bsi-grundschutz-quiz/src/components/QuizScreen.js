import React from 'react';
import AnswerOption from './AnswerOption';

const QuizScreen = ({
                        category,
                        question,
                        answers,
                        selectedAnswers,
                        correctAnswers,
                        showFeedback,
                        isCorrect,
                        progress,
                        onAnswerSelect,
                        onSubmit,
                        onNext
                    }) => {
    const letters = Object.keys(answers);

    return (
        <div id="quiz-screen">
            <div id="progress-container">
                <div id="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <h2 className="chalk-subtitle" id="category-display">{category}</h2>

            <div className="chalk-question" id="question-container">
                {question}
            </div>

            <div className="chalk-answers" id="answers-container">
                {letters.map(letter => (
                    <AnswerOption
                        key={letter}
                        letter={letter}
                        text={answers[letter]}
                        selected={selectedAnswers.includes(letter)}
                        correct={showFeedback && correctAnswers.includes(letter)}
                        incorrect={showFeedback && selectedAnswers.includes(letter) && !correctAnswers.includes(letter)}
                        onClick={() => onAnswerSelect(letter)}
                    />
                ))}
            </div>

            {!showFeedback ? (
                <div id="submit-container">
                    <button className="chalk-btn" id="submit-btn" onClick={onSubmit}>
                        Antwort prüfen
                    </button>
                </div>
            ) : (
                <div id="feedback-container" className="chalk-feedback">
                    <p id="feedback-message">
                        {isCorrect ? "Richtig! Alle korrekten Antworten wurden ausgewählt." : "Falsch!"}
                    </p>
                    {!isCorrect && (
                        <div id="correct-answers" className="chalk-correct">
                            Die richtigen Antworten sind: {correctAnswers.map(letter =>
                            `${letter}: ${answers[letter]}`
                        ).join(', ')}
                        </div>
                    )}
                    <button className="chalk-btn" id="next-btn" onClick={onNext}>
                        Nächste Frage
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizScreen;
