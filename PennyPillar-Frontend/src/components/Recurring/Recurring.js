// Subscriptions.js
import React, { useState } from 'react';
import './Recurring.css';
import dayjs from 'dayjs';

const subscriptionsData = [
    { id: 1, name: 'Netflix', amount: 15.99, dueDate: '2024-08-15', icon: 'https://img.icons8.com/color/48/000000/netflix.png', receiptIcon: 'https://img.icons8.com/color/48/000000/receipt-dollar.png' },
    { id: 2, name: 'Spotify', amount: 9.99, dueDate: '2024-08-20', icon: 'https://img.icons8.com/color/48/000000/spotify.png', receiptIcon: 'https://img.icons8.com/color/48/000000/receipt-dollar.png' },
];

const Recurring = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    const handlePayNowClick = (subscription) => {
        setSelectedSubscription(subscription);
        setModalVisible(true);
    };

    const handleMarkAsPaid = (event) => {
        event.preventDefault();
        setModalVisible(false);
        alert('Subscription marked as paid!');
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <div className="subscription-container">
                <h2>Subscriptions</h2>
                <ul id="subscription-list">
                    {subscriptionsData.map(subscription => (
                        <li key={subscription.id} className="expense-description">
                            <div className="icon-amount">
                                <div className="left-side">
                                    <img src={subscription.icon} alt={subscription.name} />
                                    <div className="amount">{`${subscription.name}: $${subscription.amount}`}</div>
                                </div>
                                <img src={subscription.receiptIcon} alt="Receipt Icon" className="receipt" />
                                <button onClick={() => handlePayNowClick(subscription)}>Pay Now</button>
                            </div>
                            <div className="due-date">Due Date: {subscription.dueDate}</div>
                        </li>
                    ))}
                </ul>
                <div className="add-subscription-container">
                    <button id="add-subscription-btn">Add Subscription</button>
                </div>
            </div>

            {modalVisible && (
                <>
                    <div id="overlay" onClick={handleCloseModal}></div>
                    <div id="pay-now-modal">
                        <h2>Pay Now</h2>
                        <form>
                            <label htmlFor="subscription-details">Subscription Details:</label>
                            <input type="text" id="subscription-details" value={selectedSubscription ? `${selectedSubscription.name} - $${selectedSubscription.amount} due on ${selectedSubscription.dueDate}` : ''} readOnly />
                            <button id="mark-as-paid-btn" onClick={handleMarkAsPaid}>Mark as Paid</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Recurring;

