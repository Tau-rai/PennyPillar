import React, { useState, useEffect } from 'react'; // Import useState
import './Carousel.css'; // Ensure you create this CSS file for styling
import './UserGuide.css';

const featuresData = [
    {
        title: "Dashboard",
        features: [
            "Overview of financial situation.",
            "Quick access to key financial metrics.",
            "Indications for critical activity.",
             "Financial goal tracking and progress.",
        ],
        imgSrc: "./images/dashboard.jpg" // Replace with actual image paths
    },
    {
        title: "Cashflows",
        features: [
            "Categorize your expenses easily.",
            "Track and review your spending.",
            "Input all your sources of income.",
            "Review total income automatically.",
        ],
        imgSrc: "./images/cashflow.jpg"
    },
    {
        title: "Save A Penny",
        features: [
            "Automatically calculates smallest amount to save.",
            "Automate your savings process.",
            "Track progress of your saving goal.",
            "Manage daily savings towards goals.",

            
        ],
        imgSrc: "./images/penny.jpg"
    },
    {
        title: "Budget",
        features: [
            "Set and manage your budget effectively.",
            "Review budget adherence and adjust as needed.",
            "Track expenses and stay within budget.",
            "Receive alerts when overspending occurs",
        ],
        imgSrc: "./images/budget.jpg"
    },
    {
        title: "Recurring",
        features: [
            "Track your recurring subscriptions.",
            "Get reminders for upcoming payments.",
            "Monitor subscriptions (e.g., streaming services, software)",
            "Identify areas for cost reduction"
            
        ],
        imgSrc: "./images/Subscriptions.jpeg"
    },
    {
        title: "Insights",
        features: [
            "Analyze spending patterns.",
            "Gain insights into healthy financial habits.",
            "Make the most of your money.",
            "Build wealth, not stress, hear what financial experts have to say"
            
        ],
        imgSrc: "./images/insights.jpg"
    }
];





const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentSlide]);

    const handlePrevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    
    const handleNextSlide = () => { setCurrentSlide((currentSlide + 1) % (featuresData.length - 1) + 1); };
    
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div>
            <div className="title-section">
                <h2>Explore the Features That Matter to You</h2>
            </div>
            <div className="carousel-container">
                <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {featuresData.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <img src={feature.imgSrc} alt={`${feature.title} image`} width="700" height="600" />
                            <h3>{feature.title}</h3>
                            <ul>
                                {feature.features.map((item, i) => (
                                    <li key={i}>
                                        <i className="fas fa-check-circle check-icon"></i> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
               
                <div className="carousel-dots">
                    {featuresData.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
