import React from 'react';

const AnswerOption = ({ letter, text, selected, correct, incorrect, onClick }) => {
    const classes = ['answer-option'];
    if (selected) classes.push('selected');
    if (correct) classes.push('correct');
    if (incorrect) classes.push('incorrect');

    return (
        <div className={classes.join(' ')} onClick={onClick} data-option={letter}>
            <div className="option-letter">{letter}</div>
            <div className="option-text">{text}</div>
        </div>
    );
};

export default AnswerOption;
