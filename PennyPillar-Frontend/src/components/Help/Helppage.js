import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Helppage.css';

const Help = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <>
            <header className={`header ${showNav ? 'show-nav' : ''}`}>
                <div className="logo">PennyPillar</div>
                <nav className="nav-links">
                    <Link to="/home" className="text-white">Home</Link>
                    <Link to="/dashboard" className="text-white">Dashboard</Link>
                    <Link to="/logout" className="text-white">Logout</Link>
                    <Link to="/signup" className="text-white">Sign Up</Link>
                    <Link to="/about" className="text-white">About Us</Link>
                    <Link to="/contact" className="text-white">Contact</Link>
                    <Link to="/help" className="text-white">Help</Link>
                </nav>
                <div className="hamburger d-block d-md-none" onClick={toggleNav}>☰</div>
            </header>

            <main className="content">
                <div className="container">
                    <div className="help-header">
                        <h1>Help Center</h1>
                        <p>We're here to assist you with any questions or issues you may have. Browse our FAQs or contact us directly for support.</p>
                    </div>

                    <div className="faq">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-item">
                            <h3>How do I reset my password?</h3>
                            <p>You can reset your password by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your email to reset your password.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How do I contact customer support?</h3>
                            <p>You can contact our customer support team via email at support@pennypillar.com or call us at +1-800-123-4567.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How do I update my payment information?</h3>
                            <p>To update your payment information, log in to your account, go to the "Account Settings" section, and select "Payment Methods" to make changes.</p>
                        </div>
                    </div>

                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>If you need further assistance, please reach out to us through the following methods:</p>
                        <div className="contact-method">
                            <i className="fas fa-envelope"></i>
                            <span>Email: <a href="mailto:support@pennypillar.com">support@pennypillar.com</a></span>
                        </div>
                        <div className="contact-method">
                            <i className="fas fa-phone"></i>
                            <span>Phone: +1-800-123-4567</span>
                        </div>
                        <div className="contact-method">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Address: 123 Financial St, Moneyville, NY 10001</span>
                        </div>
                        <form action="#" method="post">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" name="message" required></textarea>
                            </div>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2024 PennyPillar - All Rights Reserved</p>
            </footer>
        </>
    );
};

export default Help;
