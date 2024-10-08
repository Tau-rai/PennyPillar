// components/MainFooter.js
import React from 'react';
import './ComponentFooter.css'; // Ensure this CSS file exists and matches the style needs
import { Link } from 'react-router-dom';

const MainFooter = () => {
    return (
        <footer className="sub-footer">
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cashflow">
                            <i className="fas fa-chart-line"></i>
                            <span>Cashflow</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/budget">
                            <i className="fas fa-wallet"></i>
                            <span>Budget</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/recurring">
                            <i className="fas fa-credit-card"></i>
                            <span>Recurring</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/challenge">
                            <i className="fas fa-coins"></i>
                            <span>Penny</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default MainFooter;
