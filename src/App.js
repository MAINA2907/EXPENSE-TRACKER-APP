import './App.css';
import React, { useState } from 'react';
import ExpenseList from './Expenses/ExpenseList';
import ExpenseFilter from './Expenses/ExpenseFilter';
import AddExpense from './Expenses/AddExpense';
import Breakdown from './Expenses/Breakdown';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2024-07-10", expenseName: "Pizza", expenseAmount: 2000, payMode: "cash", category: "Food" },
    { id: 2, date: "2024-07-08", expenseName: "Trench Coat", expenseAmount: 1500, payMode: "mpesa", category: "Clothing" },
    { id: 3, date: "2024-07-06", expenseName: "Dstv", expenseAmount: 4800, payMode: "mpesa", category: "Entertainment" },
    { id: 4, date: "2024-07-04", expenseName: "Groceries", expenseAmount: 5000, payMode: "cash", category: "Food" },
    { id: 5, date: "2024-07-02", expenseName: "Rent", expenseAmount: 20000, payMode: "credit card", category: "Utilities" },
  ]);

  const [view, setView] = useState('all'); // 'all', 'daily', 'monthly', 'yearly'

  const deleteItem = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  }

  const updateExpense = (updatedItems) => {
    setExpenses(updatedItems);
  };

  const filterItem = (categ) => {
    setExpenses(expenses.filter(expense => expense.category === categ));
  }

  const addExpense = (newExpense) => {
    const newId = expenses.length + 1; // Assuming id should be auto-incremented
    const expenseWithId = { ...newExpense, id: newId };
    setExpenses([...expenses, expenseWithId]);
  };

  const filterExpenses = (timeframe) => {
    const now = new Date();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (timeframe === 'daily') {
        return expenseDate.toDateString() === now.toDateString();
      } else if (timeframe === 'monthly') {
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      } else if (timeframe === 'yearly') {
        return expenseDate.getFullYear() === now.getFullYear();
      } else {
        return true;
      }
    });
  };

  return (
    <div className="App">
      <AddExpense onAddExpense={addExpense} />
      <ExpenseFilter filterItem={filterItem} />
      <ExpenseList items={expenses} deleteItem={deleteItem} updateExpense={updateExpense} />
      <div>
        <button onClick={() => setView('daily')}>Daily Expenses</button>
        <button onClick={() => setView('monthly')}>Monthly Expenses</button>
        <button onClick={() => setView('yearly')}>Yearly Expenses</button>
      </div>
      {view !== 'all' && (
        <Breakdown expenses={filterExpenses(view)} timeframe={view} />
      )}
    </div>
  );
}

export default App;
