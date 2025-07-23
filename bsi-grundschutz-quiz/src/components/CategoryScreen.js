import React from 'react';

const CategoryScreen = ({ categories, onCategorySelect, onRandomSelect }) => {
    return (
        <div id="category-screen">
            <h2 className="chalk-subtitle">Wähle eine Kategorie:</h2>
            <div className="categories-list" id="categories-container">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="category-btn"
                        onClick={() => onCategorySelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button
                className="chalk-btn"
                id="random-category-btn"
                onClick={onRandomSelect}
            >
                Zufällige Fragen
            </button>
        </div>
    );
};

export default CategoryScreen;
