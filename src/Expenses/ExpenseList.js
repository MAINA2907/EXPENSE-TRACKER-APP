import React, { useState } from 'react';

function ExpenseList({ items, deleteItem, updateExpense }) {
    const [editingItem, setEditingItem] = useState(null);
    const [editedDate, setEditedDate] = useState('');
    const [editedExpenseName, setEditedExpenseName] = useState('');
    const [editedExpenseAmount, setEditedExpenseAmount] = useState('');
    const [editedPayMode, setEditedPayMode] = useState('');
    const [editedCategory, setEditedCategory] = useState('');

    const handleEdit = (id, date, expenseName, expenseAmount, payMode, category) => {
        setEditingItem(id);
        setEditedDate(date);
        setEditedExpenseName(expenseName);
        setEditedExpenseAmount(expenseAmount);
        setEditedPayMode(payMode);
        setEditedCategory(category);
    };

    const handleSave = (id) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    date: editedDate,
                    expenseName: editedExpenseName,
                    expenseAmount: editedExpenseAmount,
                    payMode: editedPayMode,
                    category: editedCategory,
                };
            }
            return item;
        });
        updateExpense(updatedItems);

        // Reset editing state
        setEditingItem(null);
        setEditedDate('');
        setEditedExpenseName('');
        setEditedExpenseAmount('');
        setEditedPayMode('');
        setEditedCategory('');
    };

    // Calculate total expense
    const totalExpense = items.reduce((total, item) => total + parseFloat(item.expenseAmount), 0).toFixed(2);

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Expense Name</th>
                        <th scope="col">Expense Amount</th>
                        <th scope="col">Pay Mode</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, date, expenseName, expenseAmount, payMode, category }) => (
                        <tr key={id}>
                            <td>{editingItem === id ? <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} /> : date}</td>
                            <td>{editingItem === id ? <input type="text" value={editedExpenseName} onChange={(e) => setEditedExpenseName(e.target.value)} /> : expenseName}</td>
                            <td>{editingItem === id ? <input type="text" value={editedExpenseAmount} onChange={(e) => setEditedExpenseAmount(e.target.value)} /> : expenseAmount}</td>
                            <td>{editingItem === id ? <input type="text" value={editedPayMode} onChange={(e) => setEditedPayMode(e.target.value)} /> : payMode}</td>
                            <td>{editingItem === id ? <input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} /> : category}</td>
                            <td>
                                
                                {editingItem === id ? (
                                    <button className="btn btn-outline-success" onClick={() => handleSave(id)}>Save</button>
                                ) : (
                                    <>
                                        <button className="btn btn-outline-danger" onClick={() => deleteItem(id)}>Delete</button>
                                        <button className="btn btn-outline-primary" onClick={() => handleEdit(id, date, expenseName, expenseAmount, payMode, category)}>Edit</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td><h4>Total</h4></td>
                        <td colSpan="4"><h4>{totalExpense}</h4></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ExpenseList;