// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faWallet, faCreditCard, faTrophy, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; // Ensure you create this CSS file

const Footer = () => {
    return (
        <footer>
            <nav>
                <ul>
                    <li className="active">
                        <Link to="/dashboard">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cashflow">
                            <FontAwesomeIcon icon={faChartLine} />
                            <span>Cash Flow</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/budget">
                            <FontAwesomeIcon icon={faWallet} />
                            <span>Budget</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/subscriptions">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span>Subscriptions</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/challenge">
                            <FontAwesomeIcon icon={faTrophy} />
                            <span>Challenge</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/insights">
                            <FontAwesomeIcon icon={faLightbulb} />
                            <span>Insights</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
