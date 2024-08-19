import React, { useState } from 'react';
import './Carousel.css'; 
import './UserGuide.css';

const slidesData = [
    {
        title: "Income",
        features: [
            "Input all your sources of income.",
            "Review total income automatically.",
        ],
        imgSrc: "./images/income.jpg"
    },
    {
        title: "Expenses",
        features: [
            "Enter all your expenses.",
            "Track spending against your income.",
        ],
        imgSrc: "./images/budget.jpg"
    },
    {
        title: "Savings",
        features: [
            "Set your savings goals.",
            "Review your progress towards savings.",
        ],
        imgSrc: "./image/savings.jpg"
    }
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? slidesData.length - 1 : prevSlide - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slidesData.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <div className="carousel-container">
            <header>
                <h2>Key Features</h2>
            </header>
            <main>
                <div className="carousel-content">
                    {slidesData.map((slide, index) => (
                        <div
                            className="carousel-slide"
                            key={index}
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                transition: 'transform 0.5s ease-in-out',
                                opacity: currentSlide === index ? 1 : 0,
                                visibility: currentSlide === index ? 'visible' : 'hidden',
                            }}
                        >
                            <h3>{slide.title}</h3>
                            <ul>
                                {slide.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                            <img src={slide.imgSrc} alt={`${slide.title} illustration`} />
                        </div>
                    ))}
                </div>
                <div className="carousel-controls">
                    <button onClick={handlePrevSlide}>&#10094;</button>
                    <button onClick={handleNextSlide}>&#10095;</button>
                </div>
            </main>
        </div>
    );
};

export default Carousel;
