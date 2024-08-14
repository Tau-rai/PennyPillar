import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">PennyPillar</div>
            <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>☰</div>
            <nav className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/cashflow">Cash Flow/Budget</Link>
                <Link to="/recurring">Recurring Payments</Link>
                <Link to="/challenge">Penny Challenge</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/help">Help</Link>
            </nav>
        </header>
    );
};

export default Header;
