import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import Footer from '../PillarFooter';
import Header from '../Header';


const AboutUs = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className="wrapper">
            <Header isloggedin={false} />

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
                            <img src="https://yourimageurl.com/team-member-1.jpg" alt="Avumile Ndlovu" />
                            <h5>Avumile Ndlovu</h5>
                            <p>Front-End Developer</p>
                        </div>
                        
                        <div className="member">
                            <img src="https://yourimageurl.com/team-member-2.jpg" alt="Taurai Masaire" />
                            <h5>Taurai Masaire</h5>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer />
                
        </div>
    );
};

export default AboutUs;
