import React, { useState } from 'react'; // Import useState
import './Carousel.css'; // Ensure you create this CSS file for styling
import './UserGuide.css';

const featuresData = [
    {
        title: "Income",
        features: [
            "Input all your sources of income.",
            "Review total income automatically.",
        ],
        imgSrc: "./images/budget.jpg" // Replace with actual image paths
    },
    {
        title: "Expenses",
        features: [
            "Categorize your expenses easily.",
            "Track and review your spending.",
        ],
        imgSrc: "./images/savings.jpg"
    },
    {
        title: "Savings",
        features: [
            "Monitor your savings goals.",
            "Automate your savings process.",
        ],
        imgSrc: "./images/savings.jpg"
    },
    {
        title: "Budget",
        features: [
            "Set and manage your budget effectively.",
            "Review budget adherence and adjust as needed.",
        ],
        imgSrc: "./images/budget.jpg"
    },
    {
        title: "Recurring",
        features: [
            "Track your recurring subscriptions.",
            "Get reminders for upcoming payments.",
        ],
        imgSrc: "./images/recurring.jpg"
    },
    {
        title: "Insights",
        features: [
            "Analyze spending patterns.",
            "Gain insights into your financial habits.",
        ],
        imgSrc: "./images/insights.jpg"
    }
];






const featuresData = [
    // Your featuresData array here
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentSlide]);

    const handlePrevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const handleNextSlide = () => {
        if (currentSlide < featuresData.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            setCurrentSlide(0); // Loop back to the first slide
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div>
            <div className="title-section">
                <h2>Explore Our Features</h2>
            </div>
            <div className="carousel-container">
                <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {featuresData.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <img src={feature.imgSrc} alt={`${feature.title} image`} width="400" height="400" />
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
                <div className="carousel-controls">
                    <button className="control-button" onClick={handlePrevSlide}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="control-button" onClick={handleNextSlide}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
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

  
