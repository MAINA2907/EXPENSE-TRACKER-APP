import React, { useState, useEffect } from 'react';
import NavBar from './navbar';

const Budget = () => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [filter, setFilter] = useState('');
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    fetch('https://expense-tracker-api-3-ibzf.onrender.com/budgets')
      .then(response => response.json())
      .then(data => setBudgets(data))
      .catch(error => console.error('Error fetching budgets:', error));
  };

  const addBudget = () => {
    if (!budgetName || !budgetAmount) {
      alert('Please fill in all fields');
      return;
    }

    const newBudget = {
      name: budgetName,
      amount: parseFloat(budgetAmount)
    };

    fetch('https://expense-tracker-api-3-ibzf.onrender.com/budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudget)
    })
      .then(response => response.json())
      .then(data => {
        setBudgets([...budgets, data]);
        setBudgetName('');
        setBudgetAmount('');
      })
      .catch(error => {
        console.error('Error adding budget:', error);
        alert('Failed to add budget');
      });
  };

  const deleteBudget = (id) => {
    fetch(`https://expense-tracker-api-3-ibzf.onrender.com/budgets/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setBudgets(budgets.filter(budget => budget.id !== id));
        } else {
          alert('Failed to delete budget');
        }
      })
      .catch(error => {
        console.error('Error deleting budget:', error);
        alert('Failed to delete budget');
      });
  };

  const filteredBudgets = budgets.filter(budget =>
    budget.name && budget.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='body'>
      <NavBar />

      <div className="table-container">
        <form onSubmit={(e) => { e.preventDefault(); addBudget(); }} className="budget-form">
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
                      onClick={() => deleteBudget(budget.id)}
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
