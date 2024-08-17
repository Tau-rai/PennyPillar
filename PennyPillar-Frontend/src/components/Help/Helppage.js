// HelpPage.js
import React, { useState } from 'react';
import './Helppage.css';
import PillarFooter from '../PillarFooter';

const HelpPage = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(prevShowNav => !prevShowNav);
    };

    return (
        <div className="wrapper">
            <header className={`header ${showNav ? 'show-nav' : ''}`}>
                <div className="logo">PennyPillar</div>
                <nav className="nav-links">
                    <a href="#home" className="text-white">Home</a>
                    <a href="#dashboard" className="text-white">Dashboard</a>
                    <a href="#login" className="text-white">Logout</a>
                    <a href="#signup" className="text-white">Sign Up</a>
                    <a href="#about" className="text-white">About Us</a>
                    <a href="#contact" className="text-white">Contact</a>
                    <a href="#help" className="text-white">Help</a>
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
                            <p>To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How do I update my account information?</h3>
                            <p>You can update your account information by logging into your account, going to the "Account Settings" section, and making the necessary changes.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How do I contact customer support?</h3>
                            <p>You can reach our customer support team by filling out the contact form below or by emailing us at support@pennypillar.com.</p>
                        </div>
                    </div>

                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>If you have any other questions or need further assistance, please contact us using one of the methods below:</p>

                        <div className="contact-method">
                            <i className="fas fa-phone"></i> Phone: +1 800 123 4567
                        </div>
                        <div className="contact-method">
                            <i className="fas fa-envelope"></i> Email: support@pennypillar.com
                        </div>

                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" name="message" className="form-control"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </main>

            <PillarFooter />
        </div>
    );
};

export default HelpPage;
