import "./App.css";
import Register from "./Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ExpenseTracker from "./Expenses/ExpenseList";
import Budget from "./Budget/Budget";
import { useState } from "react";



function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-07-10",
      expenseName: "Pizza",
      expenseAmount: 2000,
      payMode: "cash",
      category: "Food",
    },
    {
      id: 2,
      date: "2024-07-08",
      expenseName: "Trench Coat",
      expenseAmount: 1500,
      payMode: "mpesa",
      category: "Clothing",
    },
    {
      id: 3,
      date: "2024-07-06",
      expenseName: "Dstv",
      expenseAmount: 4800,
      payMode: "mpesa",
      category: "Entertainment",
    },
    {
      id: 4,
      date: "2024-07-04",
      expenseName: "Groceries",
      expenseAmount: 5000,
      payMode: "cash",
      category: "Food",
    },
    {
      id: 5,
      date: "2024-07-02",
      expenseName: "Rent",
      expenseAmount: 20000,
      payMode: "credit card",
      category: "Utilities",
    },
  ]);

  const [budgets, setBudgets] = useState([]);
  const [view, setView] = useState("all");
  const [showBudget, setShowBudget] = useState(true);

  const deleteItem = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateExpense = (updatedItems) => {
    setExpenses(updatedItems);
  };

  const filterItem = (categ) => {
    setExpenses(expenses.filter((expense) => expense.category === categ));
  };

  const addExpense = (newExpense) => {
    const newId = expenses.length + 1;
    const expenseWithId = { ...newExpense, id: newId };
    setExpenses([...expenses, expenseWithId]);
  };

  const filterExpenses = (timeframe) => {
    const now = new Date();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (timeframe === "daily") {
        return expenseDate.toDateString() === now.toDateString();
      } else if (timeframe === "monthly") {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      } else if (timeframe === "yearly") {
        return expenseDate.getFullYear() === now.getFullYear();
      } else {
        return true;
      }
    });
  };

  const addBudget = (newBudget) => {
    const newId = budgets.length + 1;
    const budgetWithId = { ...newBudget, id: newId };
    setBudgets([...budgets, budgetWithId]);
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  return (
    <div className="App">
      <Login />

      <Register />

      <Dashboard />

      <ExpenseTracker />

      <Budget />



      
    </div>
  );
}

export default App;