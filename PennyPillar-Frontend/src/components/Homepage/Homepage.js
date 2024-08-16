import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file

// Define the Homepage component
const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle navigation toggle
  const toggleNav = () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('nav-open');
  };

  // Function to show the next carousel item
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  // Function to show the previous carousel item
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">PennyPillar</div>
        <div className="hamburger" onClick={toggleNav}>☰</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cashflow">Cash Flow/Budget</Link>
          <Link to="/recurring">Recurring Payments</Link>
          <Link to="/challenge">Penny Challenge</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="main-content">
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-logo">
                <img src="/images/logo.png" alt="PennyPillar Logo" />
              </div>
              <h1 className="hero-name">PennyPillar</h1>
              <h2 className="hero-heading">Unlock Your Financial Potential</h2>
              <p className="hero-subheading">Empower yourself with tools and insights to make smarter financial decisions.</p>
              <p className="hero-tagline">Building Wealth, One Step at a Time</p>
              <a href="#get-started" className="hero-button">Get Started</a>
            </div>
          </section>

          {/* Infographic Section */}
          <section>
            <div className="page-container">
              <section className="infographic-container">
                <div className="carousel-container">
                  <h2 className="section-title">Explore the Features That Matter to You</h2>
                  <div className="carousel">
                    {/* Carousel Items */}
                    <div className={`carousel-item ${currentIndex === 0 ? 'active' : ''}`}>
                      <div className="infographic">
                        <div className="infographic-header">
                          <h2 className="feature-title">Budget Tracking: Set limits, track expenses, and stay on top of your budget</h2>
                        </div>
                        <ul className="feature-list">
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Track all your expenses easily.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Set and manage budget limits.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Receive notifications for overspending.
                          </li>
                        </ul>
                        <img src="/images/budget.jpg" alt="Budget Tracking Screenshot" className="feature-screenshot" />
                      </div>
                    </div>

                    {/* Add additional carousel items here */}

                    {/* Carousel Navigation */}
                    <button className="carousel-nav prev" onClick={prevSlide}>❮</button>
                    <button className="carousel-nav next" onClick={nextSlide}>❯</button>
                  </div>
                </div>
              </section>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="value-proposition">
            <div className="container">
              <h2 className="section-title">Reasons to Choose PennyPillar For Your Financial Future</h2>
              <div className="value-proposition-content">
                <div className="value-item">
                  <div className="icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3 className="value-heading">For Every Stage of Wealth</h3>
                  <p className="value-text">Whether you're just starting to manage your finances or looking to optimize your wealth, our app caters to all stages of financial growth...</p>
                </div>
                <div className="value-item">
                  <div className="icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <h3 className="value-heading">Secure and Private</h3>
                  <p className="value-text">Your financial data is encrypted and secure, ensuring that your privacy is always protected.</p>
                </div>
                <div className="value-item">
                  <div className="icon">
                    <i className="fas fa-sync"></i>
                  </div>
                  <h3 className="value-heading">Seamless Integration</h3>
                  <p className="value-text">Easily connect with your bank accounts and financial services for a unified experience.</p>
                </div>
              </div>
              <a href="#get-started" className="cta-button">Start Your Journey</a>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer-container">
            <div className="branding">
              <img src="/images/logo.jpg" alt="App Name Logo" className="footer-logo" />
              <p className="tagline">Building Wealth, One Step at a Time</p>
            </div>
            <div className="footer-nav">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#cashflow">Cash Flow/Budget</a></li>
                <li><a href="#recurring">Recurring Payments</a></li>
                <li><a href="#challenge">Penny Challenge</a></li>
                <li><a href="#login">Login</a></li>
                <li><a href="#signup">Sign Up</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#help">Help</a></li>
              </ul>
            </div>
            <div className="footer-products">
              <h3>Our Products</h3>
              <ul>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#cashflow">Cash Flow/Budget</a></li>
                <li><a href="#recurring">Recurring Payments</a></li>
                <li><a href="#challenge">Penny Challenge</a></li>
              </ul>
            </div>
            <div className="footer-legal">
              <h3>Legal</h3>
              <ul>
                <li><a href="#privacy-policy">Privacy Policy</a></li>
                <li><a href="#terms-of-service">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <ul>
                <li>Email: <a href="mailto:support@pennypillar.com">support@pennypillar.com</a></li>
                <li>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></li>
              </ul>
            </div>
          </div>
          <p className="footer-bottom-text">&copy; 2024 PennyPillar. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
