
import React, { useState } from 'react';
import NavBar from './navbar';


const Budget = () => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [filter, setFilter] = useState('');
  const [budgets, setBudgets] = useState([
    { id: 1, name: 'Groceries', amount: 5000 },
    { id: 2, name: 'Utilities', amount: 3000 },
    { id: 3, name: 'Rent', amount: 20000 },
    { id: 4, name: 'Entertainment', amount: 4000 },
    { id: 5, name: 'Transportation', amount: 2500 }
  ]);

  const onDeleteBudget = (id) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!budgetName || !budgetAmount) {
      alert('Please fill in all fields');
      return;
    }
    setBudgets([...budgets, { id: Date.now(), name: budgetName, amount: parseFloat(budgetAmount) }]);
    setBudgetName('');
    setBudgetAmount('');
  };

  const filteredBudgets = budgets.filter(budget =>
    budget.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='body'>
      <NavBar />

      <div className = "table-container">
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
        <div className='Mwenda container'>
        <div className="filter-container">
          <label>Filter Budgets</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter budget name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        </div>

        <div className="budget-list">
          <h3>Budgets</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Budget Name</th>
                <th>Budget Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBudgets.map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.name}</td>
                  <td>Ksh {budget.amount}</td>
                  <td>
                    <button 
                      onClick={() => onDeleteBudget(budget.id)} 
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;
