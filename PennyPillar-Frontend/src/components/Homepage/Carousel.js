import React from 'react';
import './Carousel.css'; // Ensure you create this CSS file for styling

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

const Carousel = () => {
    return (
        <div>
            <div className="title-section">
                <h2>Explore Our Features</h2>
            </div>
            <div className="features-container">
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
        </div>
    );
};

export default Carousel;
