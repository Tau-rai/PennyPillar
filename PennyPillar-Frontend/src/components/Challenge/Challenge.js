// Challenge.js
import React, { useState } from 'react';
import './Challenge.css';

const numbers = [5, 12, 25, 8, 17, 30, 23, 10, 45, 50, 18, 29, 35, 40, 22, 15, 27, 42, 33, 19,
    28, 14, 31, 24, 21, 48, 11, 38, 26, 7, 43, 16, 20, 41, 32, 49, 6, 39, 44, 13,
    34, 47, 46, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
    68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

const Challenge = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [goalFormVisible, setGoalFormVisible] = useState(false);
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleNumberClick = (event) => {
        const amount = parseInt(event.target.textContent, 10);
        if (event.target.classList.contains('clicked')) {
            if (window.confirm('Are you sure you want to revert this number?')) {
                event.target.classList.remove('clicked');
                setTotalAmount(totalAmount - amount);
            }
        } else {
            event.target.classList.add('clicked');
            setTotalAmount(totalAmount + amount);
        }
    };

    const handleGoalSubmit = () => {
        if (!targetAmount || !deadline) {
            alert('Please fill in both the target amount and deadline.');
            return;
        }
        alert(`Goal set! Save R${targetAmount} by ${deadline}.`);
        setGoalFormVisible(false);
    };

    return (
        <div className="challenge-content">
            <header className="challenge-header">
                <div className="logo">PennyPillar</div>
            </header>

            <div className="change-header">
                <div className="challenge-title">Save A Penny Challenge</div>
                <div className="challenge-description">Track your savings and reach your financial goals with this daily challenge.</div>
            </div>

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

            <div className="input-group">
                <button onClick={() => setGoalFormVisible(!goalFormVisible)}>
                    Set Goal
                </button>
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

            <footer className="challenge-footer">
                <p>&copy; 2024 PennyPillar - Empowering Financial Wellness</p>
            </footer>
        </div>
    );
};

export default Challenge;

