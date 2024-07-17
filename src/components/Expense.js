import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "./navbar";
import { useOutletContext } from "react-router-dom";

const ExpenseSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .positive("Amount must be positive")
    .required("Amount is required"),
  paymode: Yup.string().required("Pay Mode is required"),
  category: Yup.string().required("Category is required"),
});

const ExpenseTracker = () => {
  const [user, setUser] = useOutletContext();

  const [expenses, setExpenses] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedDate, setEditedDate] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedPayMode, setEditedPayMode] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  useEffect(() => {
    fetch("https://expense-tracker-api-3-ibzf.onrender.com/expenses")
      .then((response) => response.json())
      .then((data) => {
        const userdata = data.filter((item) => user.id == item.user_id);
        console.log(userdata);
        if (user.id) {setExpenses(userdata);}
        
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, [user]);

  const addExpense = (expense) => {
    fetch("https://expense-tracker-api-3-ibzf.onrender.com/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...expense, user_id: user.id }),
    })
      .then((response) => response.json())
      .then((newExpense) => {
        setExpenses([...expenses, newExpense]);
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
        alert("Failed to add expense");
      });
  };

  const updateExpense = (updatedExpense) => {
    fetch(
      `https://expense-tracker-api-3-ibzf.onrender.com/expenses/${updatedExpense.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `Failed to update expense: ${response.status} ${response.statusText} - ${text}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        const updatedExpenses = expenses.map((expense) => {
          if (expense.id === updatedExpense.id) {
            return { ...expense, ...updatedExpense };
          }
          return expense;
        });
        setExpenses(updatedExpenses);
        setEditingItem(null); // Clear the editing state
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
        alert(`Failed to update expense: ${error.message}`);
      });
  };

  const deleteItem = (id) => {
    console.log(id)
    fetch(`https://expense-tracker-api-3-ibzf.onrender.com/expenses/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== id));
        } else {
          alert("Failed to delete expense");
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense");
      });
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
    const updatedExpense = {
      id,
      date: editedDate,
      description: editedDescription,
      amount: editedAmount,
      paymode: editedPayMode,
      category: editedCategory,
    };
    updateExpense(updatedExpense);
  };

  const totalExpense = expenses
    .reduce((total, expense) => total + parseFloat(expense.amount), 0)
    .toFixed(2);

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="card">
          <h2></h2>
        </div>
      ))}

      <NavBar />
      <div className="expense-tracker">
        <Formik
          initialValues={{
            date: "",
            description: "",
            amount: "",
            paymode: "",
            category: "",
          }}
          validationSchema={ExpenseSchema}
          onSubmit={(values, { resetForm }) => {
            addExpense(values);
            resetForm();
          }}
        >
          {() => (
            <div className="expense-form-container">
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
                  <Field name="paymode" type="text" />
                  <ErrorMessage name="paymode" component="div" />
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
              {expenses.map(
                ({ id, date, description, amount, paymode, category }) => (
                  <tr key={id}>
                    <td>
                      {editingItem === id ? (
                        <input
                          type="date"
                          value={editedDate}
                          onChange={(e) => setEditedDate(e.target.value)}
                        />
                      ) : (
                        date
                      )}
                    </td>
                    <td>
                      {editingItem === id ? (
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      ) : (
                        description
                      )}
                    </td>
                    <td>
                      {editingItem === id ? (
                        <input
                          type="text"
                          value={editedAmount}
                          onChange={(e) => setEditedAmount(e.target.value)}
                        />
                      ) : (
                        amount
                      )}
                    </td>
                    <td>
                      {editingItem === id ? (
                        <input
                          type="text"
                          value={editedPayMode}
                          onChange={(e) => setEditedPayMode(e.target.value)}
                        />
                      ) : (
                        paymode
                      )}
                    </td>
                    <td>
                      {editingItem === id ? (
                        <input
                          type="text"
                          value={editedCategory}
                          onChange={(e) => setEditedCategory(e.target.value)}
                        />
                      ) : (
                        category
                      )}
                    </td>
                    <td>
                      {editingItem === id ? (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleSave(id)}
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteItem(id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() =>
                              handleEdit(
                                id,
                                date,
                                description,
                                amount,
                                paymode,
                                category
                              )
                            }
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td>
                  <h4>Total</h4>
                </td>
                <td colSpan="4">
                  <h4>{totalExpense}</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
