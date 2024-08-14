import React from 'react';
import {Link} from 'react-router-dom'


import './Homepage.css'; // Import your CSS file

// Define the Homepage component
const Homepage = () => {
  // Function to handle navigation toggle
  const toggleNav = () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('nav-open');
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">PennyPillar</div>
        <div className="hamburger" onClick={toggleNav}>☰</div>
        <nav className="nav-links">
          <a to="#home">Home</a>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cashflow">Cash Flow/Budget</Link>
          <Link to="/recurring">Recurring Payments</Link>
          <Link to="/challenge">Penny Challenge</Link>
          <Link to="/SignIn">Sign in</Link>
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
                    {/* Carousel Item 1 */}
                    <div className="carousel-item">
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
                    
                    {/* Carousel Item 2 */}
                    <div className="carousel-item">
                      <div className="infographic">
                        <div className="infographic-header">
                          <h2 className="feature-title">Savings Goals: Visualize your savings progress and achieve financial milestones.</h2>
                        </div>
                        <ul className="feature-list">
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Set and track savings goals.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Monitor your progress visually.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Get reminders for saving milestones.
                          </li>
                        </ul>
                        <img src="/images/savings.png" alt="Savings Goals Screenshot" className="feature-screenshot" />
                      </div>
                    </div>

                    {/* Carousel Item 3 */}
                    <div className="carousel-item">
                      <div className="infographic">
                        <div className="infographic-header">
                          <h2 className="feature-title">Subscription Management: Track your subscriptions and set payment reminders</h2>
                        </div>
                        <ul className="feature-list">
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Monitor all your active subscriptions.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Set and manage payment reminders.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Get notifications for upcoming payments.
                          </li>
                        </ul>
                        <img src="/images/subscriptions.jpg" alt="Subscription Management Screenshot" className="feature-screenshot" />
                      </div>
                    </div>

                    {/* Carousel Item 4 */}
                    <div className="carousel-item">
                      <div className="infographic">
                        <div className="infographic-header">
                          <h2 className="feature-title">Insights: Discover tips and strategies to improve your financial habits</h2>
                        </div>
                        <ul className="feature-list">
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Get personalized financial tips based on your spending habits.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Access strategies to save money and manage your budget effectively.
                          </li>
                          <li>
                            <svg className="check-icon" viewBox="0 0 24 24">
                              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z"></path>
                            </svg>
                            Receive updates on the latest financial trends.
                          </li>
                        </ul>
                        <img src="/images/insights.jpg" alt="Financial Insights Screenshot" className="feature-screenshot" />
                      </div>
                    </div>
                    {/* Carousel navigation */}
                    <button className="carousel-nav prev">&#10094;</button>
                    <button className="carousel-nav next">&#10095;</button>
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
                <li>Email: <a href="mailto:support@appname.com">support@pennypillar.com</a></li>
                <li>Phone: +123 456 7890</li>
              </ul>
              <div className="social-media">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
