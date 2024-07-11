import React, { useState } from 'react';

const AddExpense = ({ onAddExpense }) => {
    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [payMode, setPayMode] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !expenseName || !expenseAmount || !payMode ||!category) {
            alert('Please fill in all fields');
            return;
        }
        onAddExpense({ date, expenseName, expenseAmount, payMode, category });
        setDate('');
        setExpenseName('');
        setExpenseAmount('');
        setPayMode('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-expense-form">
            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="form-group mb-4">
                <label>Expense Name </label>
                <input
                    type="text"
                    className="form-control"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                />
            </div>

            <div className="form-group mb-4">
                <label>Expense Amount </label>
                <input
                    type="text"
                    className="form-control"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
            </div>

            <div className="form-group mb-4">
                <label>Pay Mode </label>
                <input
                    type="text"
                    className="form-control"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
    );
};

export default AddExpense;