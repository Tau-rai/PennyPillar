import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Recurring.css';
import axiosInstance from '../../axiosConfig';

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

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await axiosInstance.get('/subscriptions/');
            setSubscriptionsData(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    const handlePayNowClick = (subscription) => {
        setSelectedSubscription(subscription);
        setModalVisible(true);
    };

    const handleMarkAsPaid = async (event) => {
        event.preventDefault();
        try {
            await axiosInstance.post(`/subscriptions/${selectedSubscription.id}/mark_as_paid/`);
            setModalVisible(false);
            alert('Subscription marked as paid!');
            fetchSubscriptions(); // Refresh the subscriptions list
        } catch (error) {
            console.error('Error marking subscription as paid:', error);
        }
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const newSubscription = {
                name: formData.name,
                amount: parseFloat(formData.amount),
                due_date: formData.dueDate,
                icon: formData.icon || 'https://img.icons8.com/color/48/000000/default.png', // Default icon if not provided
            };
            await axiosInstance.post('/subscriptions/', newSubscription);
            fetchSubscriptions(); // Refresh the subscriptions list
            setFormData({
                name: '',
                amount: '',
                dueDate: '',
                icon: '',
            });
        } catch (error) {
            console.error('Error adding subscription:', error);
        }
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
                                <img src="https://img.icons8.com/color/48/000000/receipt-dollar.png" alt="Receipt Icon" className="receipt" />
                                {!subscription.is_paid && (
                                    <button onClick={() => handlePayNowClick(subscription)}>Pay Now</button>
                                )}
                            </div>
                            <div className="due-date">Due Date: {subscription.due_date}</div>
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
                            <input
                                type="text"
                                id="subscription-details"
                                value={selectedSubscription ? `${selectedSubscription.name} - $${selectedSubscription.amount} due on ${selectedSubscription.due_date}` : ''}
                                readOnly
                            />
                            <button id="mark-as-paid-btn" onClick={handleMarkAsPaid}>Mark as Paid</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Recurring;
