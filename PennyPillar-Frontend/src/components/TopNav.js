import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css'; // Import your CSS file

const Topnav = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/logout/', { method: 'POST' });
            if (response.ok) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <header className="top-nav">
            <div className="logo">PennyPillar</div>
            <div className="profile-link">
                <Link to="/profile">
                    <img src="/path/to/profile-pic.jpg" alt="Profile" className="profile-pic" />
                </Link>
            </div>
            <div className="hamburger" onClick={toggleNav}>☰</div>
            <nav className={`nav-links ${navOpen ? 'show-nav' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/cashflow">Cash Flow/Budget</Link>
                <Link to="/recurring">Recurring Payments</Link>
                <Link to="/challenge">Penny Challenge</Link>
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/about">About Us</Link>
                <Link to="/help">Help</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Topnav;
