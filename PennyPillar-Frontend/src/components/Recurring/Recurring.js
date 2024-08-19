import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Recurring.css';
import '../Dashboard/Dashboard.css';
import axiosInstance from '../../axiosConfig';

const Recurring = () => {
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        frequency: 'monthly', // Default frequency
        payment_method: '',
        due_date: '', // Ensure the date is in 'YYYY-MM-DD' format
        icon: '',
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false); // State to toggle the form visibility

    useEffect(() => {
        // Fetch existing subscriptions when the component loads
        const fetchSubscriptions = async () => {
            try {
                const activeMonth = new Date(); // Define the activeMonth variable
                const response = await axiosInstance.get('/subscriptions/', {
                    params: {
                        month: activeMonth.getMonth() + 1, // Month is zero-based
                        year: activeMonth.getFullYear()
                    }
                });
                setSubscriptionsData(response.data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };
        
    
        fetchSubscriptions();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({
            ...formData,
            due_date: date.toISOString().split('T')[0], // Convert date to 'YYYY-MM-DD' format
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const newSubscription = {
                name: formData.name,
                amount: parseFloat(formData.amount),
                frequency: formData.frequency,
                payment_method: formData.payment_method,
                due_date: formData.due_date, // Ensure date is in 'YYYY-MM-DD' format
                icon: formData.icon || 'https://img.icons8.com/color/48/000000/default.png', // Default icon if not provided
            };
            const response = await axiosInstance.post('/subscriptions/', newSubscription);
            setSubscriptionsData([...subscriptionsData, response.data]); // Add the new subscription to the list
            setFormData({
                name: '',
                amount: '',
                frequency: 'monthly', // Reset to default
                payment_method: '',
                due_date: '',
                icon: '',
            });
            setSelectedDate(new Date()); // Reset the calendar to the current date
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error('Error adding subscription:', error);
        }
    };

    const handleMarkAsPaid = async (subscription) => {
        try {
            const response = await axiosInstance.post(`/subscriptions/${subscription.id}/mark_as_paid/`);
            const updatedSubscription = { ...subscription, is_paid: !subscription.is_paid };
            setSubscriptionsData(subscriptionsData.map((sub) =>
                sub.id === subscription.id ? updatedSubscription : sub
            ));
            alert(`Subscription marked as ${response.data.status}`);
        } catch (error) {
            console.error('Error updating subscription status:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm); // Toggle form visibility
    };

    // Mark due dates on the calendar
    const markDueDates = ({ date }) => {
        const dueDates = subscriptionsData.map((sub) => new Date(sub.due_date).toDateString());
        if (dueDates.includes(date.toDateString())) {
            return <div className="due-date-marker">📅</div>;
        }
        return null;
    };

    return (
        <div>
            <div className="subscription-container">
                <h2>Subscriptions</h2>
                <p>Track your recurring expenses and never miss a payment!</p>
                <div className="calendar-container">
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    tileContent={markDueDates} // Mark dates with subscription due dates
                                /></div>
                <ul id="subscription-list">
                    {subscriptionsData.map(subscription => {
                        const amount = Number(subscription.amount) || 0;
                        return (
                            <li key={subscription.id} className="expense-description">
                                <div className="icon-amount">
                                    <div className="left-side">
                                        <img src={subscription.icon} alt={subscription.name} />
                                        <div className="amount">{`${subscription.name}: $${amount.toFixed(2)}`}</div>
                                    </div>
                                    <img src={subscription.receiptIcon} alt="Receipt Icon" className="receipt" />
                                    <button onClick={() => handleMarkAsPaid(subscription)}>
                                        {subscription.is_paid ? 'Paid' : 'Mark as Paid'}
                                    </button>
                                </div>
                                <div className="due-date">Due Date: {subscription.due_date}</div>
                                <div className="frequency">Frequency: {subscription.frequency}</div>
                                <div className="payment-method">Payment Method: {subscription.payment_method}</div>
                            </li>
                        );
                    })}
                </ul>
                <button onClick={toggleForm} className="toggle-form-button">
                    {showForm ? 'Hide Form' : 'Add Subscription'}
                </button>
                {showForm && (
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
                            <select
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            <input
                                type="text"
                                name="payment_method"
                                placeholder="Payment Method"
                                value={formData.payment_method}
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
                )}
            </div>
        </div>
    );
};

export default Recurring;
