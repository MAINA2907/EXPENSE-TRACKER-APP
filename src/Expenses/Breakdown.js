import React from 'react';

const Breakdown = ({ expenses, timeframe }) => {
  return (
    <div>
      <h2>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Expenses</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.id}>
              {new Date(expense.date).toLocaleDateString()} - {expense.expenseName}: ${expense.expenseAmount}
            </li>
          ))
        ) : (
          <p>No {timeframe} expenses found.</p>
        )}
      </ul>
    </div>
  );
};

export default Breakdown;
