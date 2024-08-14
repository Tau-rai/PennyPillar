import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <>
            <header className={`header ${showNav ? 'show-nav' : ''}`}>
                <div className="logo">PennyPillar</div>
                <nav className="nav-links">
                    <Link to="/" className="text-white">Home</Link>
                    <Link to="/dashboard" className="text-white">Dashboard</Link>
                    <Link to="/login" className="text-white">Logout</Link>
                    <Link to="/signup" className="text-white">Sign Up</Link>
                    <Link to="/about" className="text-white">About Us</Link>
                    <Link to="/contact" className="text-white">Contact</Link>
                    <Link to="/help" className="text-white">Help</Link>
                </nav>
                <div className="hamburger d-block d-md-none" onClick={toggleNav}>☰</div>
            </header>

            <main className="content">
                <div className="container about-us mt-5">
                    <h1>About Us</h1>
                    <p>Welcome to PennyPillar, Your Trusted Financial Companion</p>

                    <div className="mission">
                        <i className="fas fa-bullseye icon"></i>
                        <h2>Our Mission</h2>
                        <p>Our mission is to provide a secure, user-friendly, and comprehensive financial management platform that helps our users achieve financial stability, freedom, and success.</p>
                    </div>

                    <div className="story">
                        <i className="fas fa-book icon"></i>
                        <h2>Our Story</h2>
                        <p>PennyPillar was founded in 2024 by a team of finance and tech enthusiasts who were frustrated with the complexity and expense of traditional financial management solutions.</p>
                        <img src="https://source.unsplash.com/800x600/?finance,technology" alt="Our Story Image" />
                    </div>

                    <div className="values">
                        <i className="fas fa-hand-holding-heart icon"></i>
                        <h2>Our Values</h2>
                        <ul className="list-unstyled">
                            <li><i className="fas fa-shield-alt icon"></i> Security: We prioritize the security and privacy of our users' financial data.</li>
                            <li><i className="fas fa-lightbulb icon"></i> Innovation: We continuously innovate and improve our app to meet the evolving needs of our users.</li>
                            <li><i className="fas fa-check-circle icon"></i> Simplicity: We believe that financial management should be easy, not complicated.</li>
                            <li><i className="fas fa-users icon"></i> Expertise: We're committed to providing expert financial guidance and support.</li>
                        </ul>
                    </div>

                    <div className="team-member">
                        <div className="member">
                            <img src="https://photos.app.goo.gl/joYhBCZ5JNADqqmj6" alt="Team Member 1" />
                            <h5>Avumile Ndlovu</h5>
                            <p>Front-End Developer</p>
                        </div>
                        
                        <div className="member">
                            <img src="https://photos.app.goo.gl/qeCekr5BwyL3x4dY9" alt="Team Member 3" />
                            <h5>Taurai Masaire</h5>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2024 PennyPillar - All Rights Reserved</p>
                <nav>
                    <Link to="/privacy">Privacy Policy</Link> |
                    <Link to="/terms">Terms of Service</Link> |
                    <Link to="/contact">Contact Us</Link>
                </nav>
            </footer>
        </>
    );
};

export default AboutUs;
