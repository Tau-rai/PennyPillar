.import React, { useState, useEffect } from 'react';
import './Challenge.css';
import axiosInstance from '../../axiosConfig';
import MainFooter from '../ComponentFooter';
import Topnav from '../TopNav';

const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
numbers.sort(() => Math.random() - 0.5);

const Challenge = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [goalFormVisible, setGoalFormVisible] = useState(false);
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [goalReached, setGoalReached] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null); // Track the current goal
    const [remainingAmount, setRemainingAmount] = useState(null);

    useEffect(() => {
        // Fetch the current savings goal status from the server
        axiosInstance.get('/savings-goal/check_goal_status/')
            .then(response => {
                const { goal_amount, current_savings, is_goal_reached, remaining_amount, goal_date } = response.data;
                setTotalAmount(parseFloat(current_savings));
                setGoalReached(is_goal_reached);
                setCurrentGoal({ goal_amount, goal_date });
                setRemainingAmount(parseFloat(remaining_amount));
            })
            .catch(error => {
                console.error('Error fetching savings goal status:', error);
            });
    }, []);

    const handleNumberClick = (event) => {
        const amount = parseInt(event.target.textContent, 10);
        if (event.target.classList.contains('clicked')) {
            if (window.confirm('Are you sure you want to revert this number?')) {
                event.target.classList.remove('clicked');
                setTotalAmount(totalAmount - amount);
                updateSavings(-amount);
            }
        } else {
            event.target.classList.add('clicked');
            setTotalAmount(totalAmount + amount);
            updateSavings(amount);
        }
    };

    const updateSavings = (amount) => {
        axiosInstance.post('/savings-goal/add_savings/', { savings_amount: amount })
            .then(response => {
                console.log('Savings updated:', amount);
                if (response.data.detail.includes('Goal reached')) {
                    setGoalReached(true);
                    alert('Congratulations! You have reached your savings goal!');
                    setGoalFormVisible(true); // Show the goal form to set a new goal if the current goal is achieved
                }
                fetchGoalStatus(); // Refresh goal status after updating savings
            })
            .catch(error => {
                console.error('Error updating savings:', error);
            });
    };

    const fetchGoalStatus = () => {
        // Refresh goal status data
        axiosInstance.get('/savings-goal/check_goal_status/')
            .then(response => {
                const { goal_amount, current_savings, is_goal_reached, remaining_amount, goal_date } = response.data;
                setTotalAmount(parseFloat(current_savings));
                setGoalReached(is_goal_reached);
                setCurrentGoal({ goal_amount, goal_date });
                setRemainingAmount(parseFloat(remaining_amount));
            })
            .catch(error => {
                console.error('Error fetching savings goal status:', error);
            });
    };

    const handleGoalSubmit = () => {
        if (!targetAmount || !deadline) {
            alert('Please fill in both the target amount and deadline.');
            return;
        }
        const formattedDeadline = new Date(deadline).toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
        axiosInstance.post('/savings-goal/', {
            goal_amount: targetAmount,
            goal_date: formattedDeadline
        })
        .then(response => {
            alert(`Goal set! Save R${targetAmount} by ${formattedDeadline}.`);
            setGoalFormVisible(false);
            fetchGoalStatus(); // Refresh goal status after setting a new goal
        })
        .catch(error => {
            console.error('Error setting goal:', error);
            alert('An error occurred while setting the goal. Please try again.');
        });
    };

    const resetGoalForm = () => {
        setGoalFormVisible(true);
        setTargetAmount('');
        setDeadline('');
    };

    return (
        <Topnav />
        <div className="challenge-content">
            <div className="change-header">
                <div className="challenge-title">Save A Penny Challenge</div>
                <div className="challenge-description">Track your savings and reach your financial goals with this daily challenge.</div>
            </div>
            {/* {currentGoal && (
                <div className="goal-info">
                    <p>Goal: R{currentGoal.goal_amount} by {new Date(currentGoal.goal_date).toLocaleDateString()}</p>
                </div>
            )} */}

            <div className="number-grid">
                {numbers.map((number) => (
                    <div key={number} className="number" onClick={handleNumberClick}>
                        {number}
                    </div>
                ))}
            </div>

            <div className="total-amount">
                Total Saved: R{totalAmount}
            </div>
            <div>
                
                {currentGoal && (
                    <div className="goal-info">
                        <p>Goal: R{currentGoal.goal_amount} by {new Date(currentGoal.goal_date).toLocaleDateString()}</p>
                    </div>
                )}
                {currentGoal && (
                    <div className="goal-info">
                        <p>Remaining Amount: R{remainingAmount}</p>
                    </div>
                )}
            </div>
            


            {goalReached && (
                <div className="goal-message">
                    🎉 Goal Reached! Congratulations! 🎉
                </div>
            )}

            <div className="input-group">
                {!goalFormVisible && (
                    <button onClick={resetGoalForm}>
                        {goalReached ? 'Set New Goal' : 'Set Goal'}
                    </button>
                )}
            </div>

            {goalFormVisible && (
                <div className="input-group">
                    <label htmlFor="targetAmount">Set your saving target (R):</label>
                    <input
                        type="number"
                        id="targetAmount"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        placeholder="Enter target amount"
                    />
                    <label htmlFor="deadline">Set the deadline (YYYY-MM-DD):</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <button onClick={handleGoalSubmit}>Submit Goal</button>
                </div>
            )}

            <MainFooter />
        </div>
    );
};

export default Challenge;
