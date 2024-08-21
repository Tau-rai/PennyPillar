import React, { useState, useEffect } from 'react';
import './Recurring.css';
import '../Dashboard/Dashboard.css';
import axiosInstance from '../../axiosConfig';
import MainFooter from '../ComponentFooter';
import Topnav from '../TopNav';

const Recurring = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        frequency: 'monthly',
        payment_method: '',
        due_date: '',
        icon: '',
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axiosInstance.get('/subscriptions/', {
                    params: {
                        month: month + 1, // Month is zero-based
                        year: year,
                    }
                });
                setSubscriptionsData(response.data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
        renderCalendar();
    }, [month, year]);

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
                frequency: formData.frequency,
                payment_method: formData.payment_method,
                due_date: formData.due_date,
                icon: formData.icon || 'https://img.icons8.com/color/48/000000/default.png',
            };
            const response = await axiosInstance.post('/subscriptions/', newSubscription);
            setSubscriptionsData([...subscriptionsData, response.data]);
            setFormData({
                name: '',
                amount: '',
                frequency: 'monthly',
                payment_method: '',
                due_date: '',
                icon: '',
            });
            setShowForm(false);
            renderCalendar(); // Re-render the calendar after adding a new subscription
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
            // alert(`Subscription marked as ${response.data.status}`);
        } catch (error) {
            console.error('Error updating subscription status:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const renderCalendar = () => {
        const calendarDays = document.getElementById('calendar-days');
        if (calendarDays) {
            calendarDays.innerHTML = '';

            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            // Add blank days for the first week
            for (let i = 0; i < firstDay; i++) {
                const blankDay = document.createElement('div');
                blankDay.className = 'calendar-day blank-day';
                calendarDays.appendChild(blankDay);
            }

            // Add the actual days
            for (let i = 1; i <= lastDate; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;

                // Mark due dates
                const dueDates = subscriptionsData.map((sub) => new Date(sub.due_date).getDate());
                if (dueDates.includes(i)) {
                    const dueDateMarker = document.createElement('div');
                    dueDateMarker.className = 'due-date-marker';
                    dueDateMarker.textContent = '📅';
                    day.appendChild(dueDateMarker);
                }

                calendarDays.appendChild(day);
            }
        }
    };

    const changeMonth = (direction) => {
        setMonth((prevMonth) => (prevMonth + direction + 12) % 12);
        if (direction === -1 && month === 0) {
            setYear((prevYear) => prevYear - 1);
        } else if (direction === 1 && month === 11) {
            setYear((prevYear) => prevYear + 1);
        }
    };

    return (
        <div>
	    <Topnav />
            <div className="subscription-container">
                <h2>Subscriptions</h2>
                <p>Track your recurring expenses and never miss a payment!</p>

                <div className="calendar-container">
                    <div className="calendar-controls">
                        <button onClick={() => changeMonth(-1)}>Previous</button>
                        <span>{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</span>
                        <button onClick={() => changeMonth(1)}>Next</button>
                    </div>
                    <div id="calendar-days" className="calendar-days"></div>
                </div>

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
                            <label><strong>Subscription Name : </strong>
                            <input
                                type="text"
                                name="name"
                                placeholder="Subscription Name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                            </label>
                            <label><strong>Amount : </strong>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleFormChange}
                                required
                            />
                            </label>
                            <label><strong>Frequency : </strong>
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
                            </label>
                                <label><strong>Payment Method : </strong> 
                            <select
                                name="payment_method"
                                placeholder="Payment Method"
                                value={formData.payment_method}
                                onChange={handleFormChange}
                                required
                                >
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="cash">Cash</option>
                                </select>
                                </label>
                            <label><strong>Due Date : </strong>
                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleFormChange}
                                required
                            />
                            </label>
                            
                            <button type="submit">Add Subscription</button>
                        </form>
                    </div>
                )}
            </div>
		<MainFooter />
        </div>
    );
};

export default Recurring;
