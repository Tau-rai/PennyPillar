import React, { useState } from 'react';
import './UserGuide.css'; // Make sure to create a corresponding CSS file for styling

const slidesData = [
    {
        title: "Getting Started",
        icon: "fas fa-play-circle",
        content: [
            "Create an Account: Sign up with your email and create a password.",
            "Log In: Use your credentials to access the dashboard.",
            "Explore Features: Familiarize yourself with the app's main features."
        ]
    },
    {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt",
        content: [
            "Summary: View key metrics like total income, expenses, and savings.",
            "Graphs: Analyze trends with various charts."
        ]
    },
    {
        title: "Cashflow",
        icon: "fas fa-chart-line",
        content: [
            "Add Transactions: Input new income, expenses, or savings.",
            "Edit Transactions: Modify existing entries.",
            "View Reports: Analyze your cash flow over different periods."
        ]
    },
    {
        title: "Budget",
        icon: "fas fa-wallet",
        content: [
            "Create Budgets: Define your spending limits for various categories.",
            "Track Spending: Monitor how well you adhere to your budget."
        ]
    },
    {
        title: "Save a Penny",
        icon: "fas fa-coins",
        content: [
            "Round-Up Savings: Automatically round up your purchases to the nearest dollar and save the change.",
            "Track Savings: View your accumulated savings over time."
        ]
    },
    {
        title: "Subscription",
        icon: "fas fa-credit-card",
        content: [
            "Add Subscriptions: Enter details of your recurring payments.",
            "View Upcoming Payments: Track your upcoming subscription charges.",
            "Manage Subscriptions: Edit or cancel existing subscriptions."
        ]
    }
];

const UserGuide = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const handleNextSlide = () => {
        if (currentSlide < slidesData.length - 1) setCurrentSlide(currentSlide + 1);
    };

    return (
        <div>
            <header>
                <h1>User Guide</h1>
            </header>
            <div className="title-section">
                <h2>First Time Here? Discover How to Navigate with Ease!</h2>
            </div>
            <main>
                <div className="slide-container">
                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slidesData.map((slide, index) => (
                            <div className="slide" key={index}>
                                <h2><i className={slide.icon}></i> {slide.title}</h2>
                                <p>{slide.content[0]}</p>
                                <ul>
                                    {slide.content.slice(1).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="controls">
                        <button className="control-button" onClick={handlePrevSlide}><i className="fas fa-chevron-left"></i></button>
                        <button className="control-button" onClick={handleNextSlide}><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserGuide;
