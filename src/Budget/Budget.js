import React, { useState } from 'react';

const Budget = ({ budgets, onAddBudget, onDeleteBudget }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!budgetName || !budgetAmount) {
      alert('Please fill in all fields');
      return;
    }
    onAddBudget({ budgetName, budgetAmount });
    setBudgetName('');
    setBudgetAmount('');
  };

  return (
    <div className="budget-container">
      <form onSubmit={handleAddBudget} className="budget-form">
        <div className="form-group">
          <label>Budget Name</label>
          <input
            type="text"
            className="form-control"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Budget Amount</label>
          <input
            type="number"
            className="form-control"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Add Budget</button>
      </form>
      <div className="budget-list">
        <h3>Budgets</h3>
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              {budget.budgetName}: ${budget.budgetAmount}
              <button onClick={() => onDeleteBudget(budget.id)} className="btn btn-delete">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Budget;
