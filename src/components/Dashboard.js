import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import Register from "../Register";


function Dashboard() {
const navigate = useNavigate()

  const expenses = [
    { name: "Groceries", amount: 1000, category: "Food" },
    { name: "Electricity Bill", amount: 500, category: "Utilities" },
    { name: "Gym Membership", amount: 3000, category: "Health" },
    { name: "Internet Bill", amount: 4000, category: "Utilities" },
    { name: "Dining Out", amount: 6000, category: "Food" },
  ];

  return (
    <section>

         <NavBar/>
     
     

      <br></br>
      <br></br>

      <section className="container ">
        <div className="row ">
          <div className="col-3  border shadow-sm">
            <div className="d-flex flex-column">
              <button class="btn btn-warning m-3" type="button" onClick={() => navigate('/')}>
                Dashboard
              </button>
              <button class="btn btn-warning m-3 " type="button" onClick={() => navigate('/expenses')}>
                Expenses
              </button>
              <button class="btn btn-warning m-3" type="button" onClick={() => navigate('/budget')}>
                Budget
              </button>
              <button class="btn btn-warning m-3" type="button" onClick={() => navigate('/register')}>
                Profile
              </button>
            </div>
          </div>

          <div className=" col-9">
            <h2 className="p-3 mb-2 bg-warning-subtle text-warning-emphasis">
              Welcome to Group 8 Expense tracker
            </h2>

            <div class="row">
              <div className="col-md-12 mb-4">
                <h3>Expense List</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.name}</td>
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
