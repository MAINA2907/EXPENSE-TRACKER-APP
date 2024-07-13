import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NavBar from './navbar';

const ExpenseSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
    payMode: Yup.string().required('Pay Mode is required'),
    category: Yup.string().required('Category is required'),
});


const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            date: '2024-07-01',
            description: 'Groceries',
            amount: 50.25,
            payMode: 'Credit Card',
            category: 'Food',
        },
        {
            id: 2,
            date: '2024-07-05',
            description: 'Movie Night',
            amount: 25.00,
            payMode: 'Cash',
            category: 'Entertainment',
        },
        {
            id: 3,
            date: '2024-07-10',
            description: 'Electricity Bill',
            amount: 80.00,
            payMode: 'Online Banking',
            category: 'Utilities',
        },
    ]);
    const [editingItem, setEditingItem] = useState(null);

    const addExpense = (expense) => {
        setExpenses([...expenses, { id: Date.now(), ...expense }]);
    };

    const updateExpense = (updatedExpenses) => {
        setExpenses(updatedExpenses);
    };

    const deleteItem = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const handleEdit = (id, date, description, amount, payMode, category) => {
        setEditingItem(id);
        setEditedDate(date);
        setEditedDescription(description);
        setEditedAmount(amount);
        setEditedPayMode(payMode);
        setEditedCategory(category);
    };

    const handleSave = (id) => {
        const updatedExpenses = expenses.map((expense) => {
            if (expense.id === id) {
                return {
                    ...expense,
                    date: editedDate,
                    description: editedDescription,
                    amount: editedAmount,
                    payMode: editedPayMode,
                    category: editedCategory,
                };
            }
            return expense;
        });
        updateExpense(updatedExpenses);

        setEditingItem(null);
        setEditedDate('');
        setEditedDescription('');
        setEditedAmount('');
        setEditedPayMode('');
        setEditedCategory('');
    };

    const [editedDate, setEditedDate] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedAmount, setEditedAmount] = useState('');
    const [editedPayMode, setEditedPayMode] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [showBudget, setShowBudget] = useState(false);


    const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);

    return (
        <div>
            <NavBar/>
        <div className="expense-tracker">

           
            <Formik
                initialValues={{ date: '', description: '', amount: '', payMode: '', category: '' }}
                validationSchema={ExpenseSchema}
                onSubmit={(values, { resetForm }) => {
                    addExpense(values);
                    resetForm();
                }}
            >
                {() => (
                    <div className='expense-form-container'>
                    <Form className="expense-form">
                        <div>
                            <label>Date</label>
                            <Field name="date" type="date" />
                            <ErrorMessage name="date" component="div" />
                        </div>
                        <div>
                            <label>Description</label>
                            <Field name="description" type="text" />
                            <ErrorMessage name="description" component="div" />
                        </div>
                        <div>
                            <label>Amount</label>
                            <Field name="amount" type="number" step="0.01" />
                            <ErrorMessage name="amount" component="div" />
                        </div>
                        <div>
                            <label>Pay Mode</label>
                            <Field name="payMode" type="text" />
                            <ErrorMessage name="payMode" component="div" />
                        </div>
                        <div>
                            <label>Category</label>
                            <Field name="category" as="select">
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Clothing">Clothing</option>
                            </Field>
                            <ErrorMessage name="category" component="div" />
                        </div>
                        <button type="submit">Add Expense</button>
                    </Form>
                    </div>
                )}
            </Formik>

            <div className="budget-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Pay Mode</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(({ id, date, description, amount, payMode, category }) => (
                            <tr key={id}>
                                <td>{editingItem === id ? <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} /> : date}</td>
                                <td>{editingItem === id ? <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} /> : description}</td>
                                <td>{editingItem === id ? <input type="text" value={editedAmount} onChange={(e) => setEditedAmount(e.target.value)} /> : amount}</td>
                                <td>{editingItem === id ? <input type="text" value={editedPayMode} onChange={(e) => setEditedPayMode(e.target.value)} /> : payMode}</td>
                                <td>{editingItem === id ? <input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} /> : category}</td>
                                <td>
                                    {editingItem === id ? (
                                        <button className="btn btn-outline-success" onClick={() => handleSave(id)}>Save</button>
                                    ) : (
                                        <>
                                            <button className="btn btn-outline-danger" onClick={() => deleteItem(id)}>Delete</button>
                                            <button className="btn btn-outline-primary" onClick={() => handleEdit(id, date, description, amount, payMode, category)}>Edit</button>
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
        </div>
        </div>
    );
};

export default ExpenseTracker;
