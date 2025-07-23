import React from 'react';

const StartScreen = ({ onStart }) => {
    return (
        <div id="start-screen">
            <h1 className="chalk-title">BSI-Grundschutz Quiz</h1>
            <p className="chalk-text">Teste dein Wissen zum BSI-Grundschutz</p>
            <button className="chalk-btn" id="start-btn" onClick={onStart}>
                Quiz starten
            </button>
        </div>
    );
};

export default StartScreen;
