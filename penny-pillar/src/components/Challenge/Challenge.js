// Challenge.js
import React, { useState, useEffect } from 'react';
import './Challenge.css'; // Import the CSS file
import '../Footer';

const Challenge = () => {
  // Initialize state
  const [totalAmount, setTotalAmount] = useState(0);
  const [numbers, setNumbers] = useState([]);

  // Array of predefined numbers
  const predefinedNumbers = [5, 12, 25, 8, 17, 30, 23, 10, 45, 50, 18, 29, 35, 40, 22, 15, 27, 42, 33, 19,
    28, 14, 31, 24, 21, 48, 11, 38, 26, 7, 43, 16, 20, 41, 32, 49, 6, 39, 44, 13,
    34, 47, 46, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
    68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

  // Populate numbers
  useEffect(() => {
    setNumbers(predefinedNumbers);
  }, []);

  // Handle number click
  const handleNumberClick = (number) => {
    setTotalAmount(prevAmount => {
      const newAmount = prevAmount + (number.clicked ? -number.value : number.value);
      return newAmount;
    });
    number.clicked = !number.clicked;
  };

  // Render numbers
  const renderNumbers = () => {
    return numbers.map((number, index) => (
      <div
        key={index}
        className={`number ${number.clicked ? 'clicked' : ''}`}
        onClick={() => handleNumberClick({ value: number, clicked: number.clicked })}
      >
        {number}
      </div>
    ));
  };

  return (
    <div className="challenge-container">
      <header>
        <div className="logo">PennyPillar</div>
      </header>

      <div className="main-content">
        <div className="challenge-header">
          <div className="challenge-title">Save A Penny Challenge</div>
          <div className="challenge-description">Track your savings and reach your financial goals with this daily challenge.</div>
        </div>

        <div className="number-grid" id="numberGrid">
          {renderNumbers()}
        </div>

        <div className="total-amount">
          Total Saved: R{totalAmount}
        </div>
      </div>

           <footer />
    </div>
  );
}

export default Challenge;
