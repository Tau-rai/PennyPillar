import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; 
import Carousel from './Carousel'; 
import UserGuide from './UserGuide';
import Header from '../Header';

const Homepage = () => {
  return (
    <div>
      <Header /> 
      
      <div className="main-content">
        <main>
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-logo">
                <img src="/images/logo.png" alt="PennyPillar Logo" />
              </div>
              <h1 className="hero-name">PennyPillar</h1>
              <h2 className="hero-heading">Unlock Your Financial Potential</h2>
              <p className="hero-subheading">Empower yourself with tools and insights to make smarter financial decisions.</p>
              <p className="hero-tagline">Building Wealth, One Step at a Time</p>
              <Link to="/signup" className="hero-button">Get Started</Link>
            </div>
          </section>

          <section className="carousel-section">
            <Carousel />
          </section>

          <section className="user-guide-section">
            <UserGuide />
          </section>

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
              <Link to="/signup" className="cta-button">Start Your Journey</Link>
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="branding">
            <img src="/images/logo.png" alt="App Name Logo" className="footer-logo" />
            <p className="tagline">Building Wealth, One Step at a Time</p>
          </div>
          <div className="footer-nav">
            <h3>Quick Links</h3>
            <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li>
          <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-products">
            <h3>Our Products</h3>
            <ul>
            <li> <Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/cashflow">Cash Flow</Link></li>
            <li><Link to="/budget">Budget</Link></li>
            <li><Link to="/recurring">Recurring Payments</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/challenge">Penny Challenge</Link></li>
        
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
              <li>Phone: <a href="tel:+1234567890">+27 567-890</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom-text">&copy; 2024 PennyPillar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
