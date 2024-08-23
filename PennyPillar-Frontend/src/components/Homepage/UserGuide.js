import React, { useState } from 'react';
import './UserGuide.css'; // Make sure to create a corresponding CSS file for styling

const slidesData = [
    {
        title: "Getting Started",
        icon: "fas fa-play-circle",
        content: [
            "Create an Account: Sign up with your email and create a password.",
            "Log In: Use your credentials to access the dashboard.",
            "Explore Features: Familiarize yourself with the  main features."
        ],
        
    },
    {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt",
        content: [
            "Summary: View key metrics like total income, expenses, and savings.",
            "Graphs: Analyze trends with various charts."
        ],
        
    },
    {
        title: "Cashflow",
        icon: "fas fa-chart-line",
        content: [
            "Add Transactions: Click '+' enter the description and the amount",
            "Edit Transactions: Modify existing entries by clicking the pencil icon.",
            "Delete :Click the trash icon to remove the transaction",
            "Automatic Cash Flow Update: calculatr will instantly reflect changes."
        ],

    },
    {
        title: "Budget",
        icon: "fas fa-wallet",
        content: [
            "Create Budgets: Define your spending limits for various categories.",
            "Set Your Budget: Enter your budgeted amounts. ",
            "Track Spending: Monitor how well you adhere to your budget.",
            "Reach Your Goals: Make conscious finacial decisions to archieve your objectives."
        ],
       
    },
    {
        title: "Save a Penny",
        icon: "fas fa-coins",
        content: [
            "Set Goal: click 'Set Goal' enter your targetted savings amount. ",
            "Coose Daily Savings: Select a daily amount (e.g R0.50 , R1 , R50) that fits your budget for the day",
            "Start Saving: Begin your penny saving challenge and track your progress to stay maotivated.",
            "Track Savings Metrics: View your accumulated savings over time on dashboard."
        ],
        
    },
    {
        title: "Subscription",
        icon: "fas fa-credit-card",
        content: [
            "Add Subscriptions: Enter details of your recurring payments.",
            "View Upcoming Payments: Track your upcoming subscription charges.",
            "Reminder Alerts: Get notified before the payments are due .",
            "Recurring Subscriptions: Easily access thhe subscription details and manage all subscription payments."
        ],
       
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
            <div className="title-section">
                <h2>First Time Here? Discover How to Navigate with Ease!</h2>
            </div>
            <main>
                <div className="slide-container">
                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slidesData.map((slide, index) => (
                            <div
                                className="slide"
                                key={index}
                                style={{
                                    backgroundImage: slide.backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
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
