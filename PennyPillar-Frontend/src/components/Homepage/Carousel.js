import React, { useState } from 'react';
import './Carousel.css'; // Create and import a corresponding CSS file for styles

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            title: 'Income',
            features: [
                'Input all your sources of income.',
                'Review total income automatically.',
            ],
            imgSrc: 'income.jpg',
        },
        {
            title: 'Expenses',
            features: [
                'Enter all your expenses.',
                'Track spending against your income.',
            ],
            imgSrc: 'expenses.jpg',
        },
        {
            title: 'Savings',
            features: [
                'Set your savings goals.',
                'Review your progress towards savings.',
            ],
            imgSrc: 'savings.jpg',
        },
    ];

    const showSlide = (index) => {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            setCurrentIndex(0);
        } else if (index < 0) {
            setCurrentIndex(totalSlides - 1);
        } else {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="carousel-item"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        <div className="infographic">
                            <div className="infographic-header">
                                <h2 className="feature-title">{slide.title}</h2>
                            </div>
                            <ul className="feature-list">
                                {slide.features.map((feature, i) => (
                                    <li key={i}>
                                        <svg className="check-icon" viewBox="0 0 24 24">
                                            <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <img src={slide.imgSrc} alt={`${slide.title} Screenshot`} className="feature-screenshot" />
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-nav prev" onClick={() => showSlide(currentIndex - 1)}>&#10094;</button>
            <button className="carousel-nav next" onClick={() => showSlide(currentIndex + 1)}>&#10095;</button>
        </div>
    );
};

export default Carousel;
