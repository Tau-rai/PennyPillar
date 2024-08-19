import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import your CSS file

const Homepage = () => {
  // Slide component to display each slide with title, icon, and content
  const Slide = ({ title, icon, content }) => (
    <div className="slide">
      <h2><i className={`fas ${icon}`}></i> {title}</h2>
      <p>{content.text}</p>
      <ul>
        {content.list.map((item, index) => (
          <li key={index}>
            <svg className="check-icon" viewBox="0 0 24 24">
              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const FeatureSlide = ({ title, description, items, imgSrc }) => (
    <div className="slide">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <svg className="check-icon" viewBox="0 0 24 24">
              <path d="M10 15l-3-3 1.4-1.4L10 12.2l7.6-7.6L19 7l-9 9z" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <img src={imgSrc} alt={`${title} Screenshot`} className="feature-screenshot" />
    </div>
  );

  const slidesData = [
    // Slide data for the user guide section
    {
      title: 'Getting Started',
      icon: 'fa-play-circle',
      content: {
        text: 'Welcome to the user guide for our app. Follow these steps to get started:',
        list: [
          'Create an Account: Sign up with your email and create a password.',
          'Log In: Use your credentials to access the dashboard.',
          'Explore Features: Familiarize yourself with the app\'s main features.'
        ]
      }
    },
    {
      title: 'Dashboard',
      icon: 'fa-tachometer-alt',
      content: {
        text: 'The Dashboard provides an overview of your financial status:',
        list: [
          'Summary: View key metrics like total income, expenses, and savings.',
          'Graphs: Analyze trends with various charts.'
        ]
      }
    },
    {
      title: 'Cashflow',
      icon: 'fa-chart-line',
      content: {
        text: 'The Cashflow section helps you track and manage your transactions:',
        list: [
          'Add Transactions: Input new income, expenses, or savings.',
          'Edit Transactions: Modify existing entries.',
          'View Reports: Analyze your cash flow over different periods.'
        ]
      }
    },
    {
      title: 'Budget',
      icon: 'fa-wallet',
      content: {
        text: 'The Budget feature helps you set and manage financial goals:',
        list: [
          'Create Budgets: Define your spending limits for various categories.',
          'Track Spending: Monitor how well you adhere to your budget.'
        ]
      }
    },
    {
      title: 'Save a Penny',
      icon: 'fa-coins',
      content: {
        text: 'The Save a Penny feature encourages saving by rounding up transactions:',
        list: [
          'Round-Up Savings: Automatically round up your purchases to the nearest dollar and save the change.',
          'Track Savings: View your accumulated savings over time.'
        ]
      }
    },
    {
      title: 'Subscription',
      icon: 'fa-credit-card',
      content: {
        text: 'Manage your recurring payments with the Subscription feature:',
        list: [
          'Add Subscriptions: Enter details of your recurring payments.',
          'View Upcoming Payments: Track your upcoming subscription charges.',
          'Manage Subscriptions: Edit or cancel existing subscriptions.'
        ]
      }
    }
  ];

  const featureSlides = [
    // Feature slide data
    {
      title: 'Budget Tracking',
      description: 'Set limits, track expenses, and stay on top of your budget',
      items: [
        'Track all your expenses easily.',
        'Set and manage budget limits.',
        'Receive notifications for overspending.',
      ],
      imgSrc: '/images/budget.jpg',
    },
    {
      title: 'Savings Goals',
      description: 'Save towards your financial goals effortlessly',
      items: [
        'Set and track savings goals.',
        'Automate savings transfers.',
        'Monitor your progress with ease.',
      ],
      imgSrc: '/images/savings.jpg',
    },
    {
      title: 'Investment Insights',
      description: 'Make informed investment decisions',
      items: [
        'Analyze investment options.',
        'Track your portfolio performance.',
        'Get insights and recommendations.',
      ],
      imgSrc: '/images/investment.jpg',
    },
    {
      title: 'Expense Tracking',
      description: 'Keep track of your spending',
      items: [
        'Categorize and track your expenses.',
        'View spending trends over time.',
        'Set spending limits and alerts.',
      ],
      imgSrc: '/images/expenses.jpg',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide transition effect for user guide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slidesData.length]);

  // Slide transition effect for features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featureSlides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [featureSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length);
  };

  const nextIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featureSlides.length);
  };

  const prevIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featureSlides.length) % featureSlides.length);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">PennyPillar</div>
        <div className="hamburger" onClick={() => document.querySelector('.nav-links').classList.toggle('nav-open')}>☰</div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cashflow">Cash Flow</Link>
          <Link to="/budget">Budget</Link>
          <Link to="/recurring">Recurring Payments</Link>
          <Link to="/challenge">Penny Challenge</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout" onClick={() => {
            fetch('/logout/', {
              method: 'POST'
            })
            .then(response => {
              if (response.ok) {
                window.location.href = '/';
              }
            })
            .catch(error => {
              console.error('Logout failed:', error.message);
            });
          }}>Logout</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
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
              <a href="#get-started" className="hero-button">Get Started</a>
            </div>
          </section>

          <section>
            <div className="page-container">
              <section className="infographic-container">
                <div className="carousel-container">
                  <h2 className="section-title">Explore the Features That Matter to You</h2>
                  <div className="carousel">
                    <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                      {featureSlides.map((slide, index) => (
                        <FeatureSlide
                          key={index}
                          title={slide.title}
                          description={slide.description}
                          items={slide.items}
                          imgSrc={slide.imgSrc}
                        />
                      ))}
                    </div>
                    <div className="carousel-buttons">
                      <button className="carousel-prev" onClick={prevIndex}>Prev</button>
                      <button className="carousel-next" onClick={nextIndex}>Next</button>
                    </div>
                  </div>
                </div>

                <h2 className="section-title">How to Get Started</h2>
                <div className="carousel">
                  <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slidesData.map((slide, index) => (
                      <Slide
                        key={index}
                        title={slide.title}
                        icon={slide.icon}
                        content={slide.content}
                      />
                    ))}
                  </div>
                  <div className="carousel-buttons">
                    <button className="carousel-prev" onClick={prevSlide}>Prev</button>
                    <button className="carousel-next" onClick={nextSlide}>Next</button>
                  </div>
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
            </div>
          </section>
        </main>
      </div>

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
  );
};

export default Homepage;
