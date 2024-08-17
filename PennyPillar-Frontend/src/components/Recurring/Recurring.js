import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Recurring.css';
// import dayjs from 'dayjs';

const Recurring = () => {
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        dueDate: '',
        icon: '',
    });

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

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newSubscription = {
            id: subscriptionsData.length + 1,
            name: formData.name,
            amount: parseFloat(formData.amount),
            dueDate: formData.dueDate,
            icon: formData.icon || 'https://img.icons8.com/color/48/000000/default.png', // Default icon if not provided
            receiptIcon: 'https://img.icons8.com/color/48/000000/receipt-dollar.png',
        };
        setSubscriptionsData([...subscriptionsData, newSubscription]);
        setFormData({
            name: '',
            amount: '',
            dueDate: '',
            icon: '',
        });
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
                                    <div className="amount">{`${subscription.name}: $${subscription.amount.toFixed(2)}`}</div>
                                </div>
                                <img src={subscription.receiptIcon} alt="Receipt Icon" className="receipt" />
                                <button onClick={() => handlePayNowClick(subscription)}>Pay Now</button>
                            </div>
                            <div className="due-date">Due Date: {subscription.dueDate}</div>
                        </li>
                    ))}
                </ul>
                <div className="add-subscription-container">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Subscription Name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleFormChange}
                            required
                        />
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleFormChange}
                            required
                        />
                        <input
                            type="text"
                            name="icon"
                            placeholder="Icon URL (optional)"
                            value={formData.icon}
                            onChange={handleFormChange}
                        />
                        <button type="submit">Add Subscription</button>
                    </form>
                </div>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                />
                <p>Selected Date: {selectedDate.toDateString()}</p>
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
