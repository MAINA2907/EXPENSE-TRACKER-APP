import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import { useOutletContext } from "react-router-dom";

function Dashboard() {

  const [user, setUser] = useOutletContext()

  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch('https://expense-tracker-api-3-ibzf.onrender.com/expenses')
      .then(response => response.json())
      .then(data => {
        const userdata = data.filter(item => user.id == item.user_id)
        console.log(userdata)
        const formattedData = userdata.map(expense => ({
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
        }));
        setExpenses(formattedData);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  };
  console.log(expenses)

  return (
    <section>
      <NavBar />
      <br />
      <br />
      <section className="container">
        <div className="row">
          <div className="col-3 border shadow-sm">
            <div className="d-flex flex-column">
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/expense-tracker-app')}>
                Dashboard
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/expense-tracker-app/expenses')}>
                Expenses
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/expense-tracker-app/budgets')}>
                Budget
              </button>
              <button className="btn btn-warning m-3" type="button" onClick={() => navigate('/expense-tracker-app/register')}>
                Profile
              </button>
            </div>
          </div>
          <div className="col-9">
            <h2 className="p-3 mb-2 bg-warning-subtle text-warning-emphasis">
              Welcome to {user.name} Expense Tracker
            </h2>
            <div className="row">
              <div className="col-md-12 mb-4">
                <h3>Expense List</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.description}</td>
                        <td>Ksh {expense.amount}</td>
                        <td>{expense.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;