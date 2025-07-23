import React from 'react';

const ResultsScreen = ({ score, totalQuestions, onRestart }) => {
    const percentage = (score / totalQuestions) * 100;

    return (
        <div id="results-screen">
            <h2 className="chalk-title">Quiz beendet!</h2>
            <p className="chalk-text" id="score-display">
                Du hast {score} von {totalQuestions} Fragen richtig beantwortet.
            </p>
            <p className="chalk-text" id="percentage-display">
                Erfolgsquote: {percentage.toFixed(1)}%
            </p>
            <button className="chalk-btn" id="restart-btn" onClick={onRestart}>
                Neu starten
            </button>
        </div>
    );
};

export default ResultsScreen;

